"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  laptopController,
  type LaptopScreenRect,
} from "@/lib/laptop-controller";
import {
  renderScreen,
  SCREEN_VIEW,
  type ScreenState,
} from "@/lib/screen-scenes";

/**
 * Renders public/model/laptop.glb into a transparent WebGL canvas that
 * takes the place of the old SVG laptop inside the flight rig.
 *
 * The rig's CSS transforms still own translation, 2D tilt, scale and
 * opacity (so the laptop "moves the same way as the SVG"); this component
 * owns the *3D* swivel (rotationY) and the live screen, both pushed in via
 * `laptopController`.
 *
 * The screen data is drawn onto an offscreen 2D canvas (see
 * lib/screen-scenes.ts) and mapped as a texture onto a plane pinned to the
 * model's Screen mesh — so the section scenes are truly painted onto the
 * 3D laptop's display.
 */

/** Canvas aspect kept identical to the old SVG viewBox (560 x 400). */
const BOX_ASPECT = 560 / 400;
/** Texture resolution for the screen (matches the display rect aspect). */
const TEX_W = 1024;
const TEX_H = Math.round((TEX_W * SCREEN_VIEW.h) / SCREEN_VIEW.w);
/** Shrink the display plane inside the lid so the screen bezel stays visible. */
const SCREEN_INSET = 0.86;
/** Fraction of canvas height the laptop should fill. */
const FIT = 0.9;
/**
 * Fine-tune where the screen content sits, as a fraction of the display
 * size. Positive X nudges content right, positive Y nudges it down. If the
 * content still sits slightly off on the screen, bump these ~0.01 at a time.
 */
const SCREEN_OFFSET_X = 0;
const SCREEN_OFFSET_Y = 0;

export default function LaptopCanvas({
  className = "",
}: {
  className?: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;

    // Defensive: a previous mount whose cleanup didn't fully run (React
    // Fast Refresh / rapid client navigation) can leave a stale <canvas>
    // here. Remove any leftovers so we never stack a frozen frame over the
    // live render.
    while (mount.firstChild) mount.removeChild(mount.firstChild);

    // --- renderer -------------------------------------------------------
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    // --- scene / camera / lights ---------------------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, BOX_ASPECT, 0.01, 100);

    scene.add(new THREE.AmbientLight(0xffffff, 1.15));
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(0.4, 0.8, 1.2);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xbcd0ff, 0.6);
    rim.position.set(-0.8, 0.4, -0.6);
    scene.add(rim);

    // Pivot the whole model so rotationY swivels about its vertical centre.
    const pivot = new THREE.Group();
    scene.add(pivot);

    // --- live screen texture -------------------------------------------
    const texCanvas = document.createElement("canvas");
    texCanvas.width = TEX_W;
    texCanvas.height = TEX_H;
    const texCtx = texCanvas.getContext("2d")!;
    const screenTexture = new THREE.CanvasTexture(texCanvas);
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    screenTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    let screenState: ScreenState = { from: "hero", to: "hero", t: 0 };
    let screenDirty = true;
    const paintScreen = () => {
      renderScreen(texCtx, TEX_W, TEX_H, screenState);
      screenTexture.needsUpdate = true;
      screenDirty = false;
    };

    // --- render-on-demand ----------------------------------------------
    let needsRender = true;
    const invalidate = () => {
      needsRender = true;
    };

    let screenRect: LaptopScreenRect | null = null;
    let screenPlane: THREE.Mesh | null = null;
    let targetRotationY = 0;
    // While > now, swivel updates snap instead of easing (used briefly
    // around (re)load so the laptop shows its real angle immediately).
    let snapUntil = 0;

    // --- load the model -------------------------------------------------
    const loader = new GLTFLoader();
    loader.load(
      "/model/laptop.glb",
      (gltf) => {
        if (disposed) return;
        const model = gltf.scene;

        // Find the display mesh (named "Screen*") to pin our plane to.
        let screenMesh: THREE.Mesh | null = null;
        model.traverse((o) => {
          if ((o as THREE.Mesh).isMesh) {
            const m = o as THREE.Mesh;
            if (/screen/i.test(m.name)) screenMesh = m;
          }
        });

        pivot.add(model);
        model.updateWorldMatrix(true, true);

        // Recentre the model on the pivot so the swivel axis is centred.
        const box = new THREE.Box3().setFromObject(model);
        const centre = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        model.position.sub(centre); // model centre now at pivot origin
        model.updateWorldMatrix(true, true);

        // Build the display plane from the Screen mesh's bounds.
        let planeW: number;
        let planeH: number;
        let planeCx: number;
        let planeCy: number;
        let planeZ: number;
        if (screenMesh) {
          const sm = screenMesh as THREE.Mesh;
          const sBox = new THREE.Box3().setFromObject(sm);
          const sSize = sBox.getSize(new THREE.Vector3());
          const sCentre = sBox.getCenter(new THREE.Vector3());
          planeW = sSize.x * SCREEN_INSET;
          planeH = sSize.y * SCREEN_INSET;
          planeCx = sCentre.x;
          planeCy = sCentre.y;
          planeZ = sBox.max.z + sSize.z * 0.05 + 0.0005;
          // Mute the model's own screen texture so nothing peeks through.
          const mat = new THREE.MeshBasicMaterial({ color: 0x0b1220 });
          if (Array.isArray(sm.material)) sm.material = [mat];
          else sm.material = mat;
        } else {
          // Fallback to SVG-derived proportions if the mesh isn't found.
          planeW = size.x * 0.66;
          planeH = size.y * 0.55;
          planeCx = 0;
          planeCy = size.y * 0.18;
          planeZ = box.max.z - centre.z + 0.002;
        }

        const planeGeo = new THREE.PlaneGeometry(planeW, planeH);
        const planeMat = new THREE.MeshBasicMaterial({
          map: screenTexture,
          toneMapped: false,
        });
        screenPlane = new THREE.Mesh(planeGeo, planeMat);
        screenPlane.position.set(
          planeCx + planeW * SCREEN_OFFSET_X,
          planeCy + planeH * SCREEN_OFFSET_Y,
          planeZ,
        );
        pivot.add(screenPlane);

        paintScreen();
        fitCamera();
        invalidate();
        // Tell the flight the model is measured so it can re-align to the
        // real 3D screen rect (first load and every navigation back).
        // Open a short window so the swivel the flight sets (synchronously,
        // via onReady) snaps to the current pose rather than animating in.
        snapUntil = performance.now() + 400;
        laptopController.markReady();
        pivot.rotation.y = targetRotationY;
        // Custom fonts may still be loading on a cold visit; repaint the
        // screen once they're ready so text metrics are correct.
        if (typeof document !== "undefined" && document.fonts?.ready) {
          document.fonts.ready.then(() => {
            if (!disposed) {
              screenDirty = true;
              invalidate();
            }
          });
        }
      },
      undefined,
      (err) => {
        // eslint-disable-next-line no-console
        console.error("[LaptopCanvas] failed to load laptop.glb", err);
      },
    );

    // --- camera framing + screen-rect projection -----------------------
    const fitCamera = () => {
      const box = new THREE.Box3().setFromObject(pivot);
      const size = box.getSize(new THREE.Vector3());
      const halfH = size.y / 2 / FIT;
      const halfW = size.x / 2 / FIT;
      const vFov = (camera.fov * Math.PI) / 180;
      const distH = halfH / Math.tan(vFov / 2);
      const distW = halfW / camera.aspect / Math.tan(vFov / 2);
      const dist = Math.max(distH, distW) + size.z;
      camera.position.set(0, 0, dist);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      measureScreenRect();
    };

    // Project the display plane corners (at rotationY = 0) to canvas
    // fractions, so the flight code can pin its DOM hand-off overlay.
    const measureScreenRect = () => {
      if (!screenPlane) return;
      const prevY = pivot.rotation.y;
      pivot.rotation.y = 0;
      pivot.updateWorldMatrix(true, true);

      const geo = screenPlane.geometry as THREE.PlaneGeometry;
      geo.computeBoundingBox();
      const bb = geo.boundingBox!;
      const corners = [
        new THREE.Vector3(bb.min.x, bb.min.y, 0),
        new THREE.Vector3(bb.max.x, bb.min.y, 0),
        new THREE.Vector3(bb.max.x, bb.max.y, 0),
        new THREE.Vector3(bb.min.x, bb.max.y, 0),
      ];
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (const c of corners) {
        c.applyMatrix4(screenPlane.matrixWorld);
        c.project(camera);
        const fx = (c.x + 1) / 2;
        const fy = (1 - c.y) / 2;
        minX = Math.min(minX, fx);
        maxX = Math.max(maxX, fx);
        minY = Math.min(minY, fy);
        maxY = Math.max(maxY, fy);
      }
      screenRect = {
        left: minX,
        top: minY,
        width: maxX - minX,
        height: maxY - minY,
      };

      pivot.rotation.y = prevY;
      pivot.updateWorldMatrix(true, true);
    };

    // --- sizing ---------------------------------------------------------
    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = w / BOX_ASPECT;
      renderer.setSize(w, h, false);
      renderer.domElement.style.height = `${h}px`;
      camera.aspect = BOX_ASPECT;
      camera.updateProjectionMatrix();
      invalidate();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // --- controller wiring ---------------------------------------------
    const unregister = laptopController.register({
      setRotationY: (deg) => {
        targetRotationY = (deg * Math.PI) / 180;
        // Snap straight to the flight's pose during the load window so the
        // screen appears at its real alignment instead of swivelling in from
        // a centred/straight-on position; ease normally afterwards.
        if (performance.now() < snapUntil) pivot.rotation.y = targetRotationY;
        invalidate();
      },
      setScreen: (state) => {
        if (
          state.from !== screenState.from ||
          state.to !== screenState.to ||
          state.t !== screenState.t
        ) {
          screenState = state;
          screenDirty = true;
          invalidate();
        }
      },
      getScreenRect: () => screenRect,
    });

    // --- animation loop -------------------------------------------------
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      // Smoothly ease the swivel toward its scroll target.
      const cur = pivot.rotation.y;
      if (Math.abs(cur - targetRotationY) > 0.0002) {
        pivot.rotation.y = cur + (targetRotationY - cur) * 0.18;
        needsRender = true;
      } else if (cur !== targetRotationY) {
        pivot.rotation.y = targetRotationY;
        needsRender = true;
      }
      if (screenDirty) paintScreen();
      if (needsRender) {
        needsRender = false;
        renderer.render(scene, camera);
      }
    };
    tick();

    // --- cleanup --------------------------------------------------------
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      unregister();
      ro.disconnect();
      screenTexture.dispose();
      renderer.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) {
          m.geometry?.dispose();
          const mat = m.material;
          if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
          else mat?.dispose();
        }
      });
      // Release the actual WebGL context so it is not leaked across
      // navigations. Browsers cap live contexts (~16); leaking them makes a
      // later mount render into a lost context — a garbled/misaligned screen
      // that only a full reload cleared. This is the missing piece.
      try {
        renderer.forceContextLoss();
      } catch {
        // no-op: some environments lack the lose_context extension
      }
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ width: "100%", aspectRatio: `${BOX_ASPECT}` }}
    />
  );
}
