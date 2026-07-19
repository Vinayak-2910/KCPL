# Product screen videos

Drop one looping video per laptop here. Each plays inside that laptop's
on-screen display in the Products section. Until a file exists, the photo
simply shows its own screen (the panel stays hidden), so missing files
never break the layout.

Expected filenames (referenced in `lib/site-content.ts`):

| Laptop              | File                 |
| ------------------- | -------------------- |
| Dell Latitude 5450  | `latitude-5450.mp4`  |
| ASUS ExpertBook B5  | `expertbook-b5.mp4`  |
| Dell Precision 3591 | `precision-3591.mp4` |

Tips for a seamless blend:

- Use a **16:10 / 16:9** clip that loops cleanly (no hard cut at the seam).
- `.mp4` (H.264 + AAC/none) plays everywhere; `.webm` also works if you
  update the path in `lib/site-content.ts`.
- The video is `object-cover`, so it fills the whole screen with no black
  bars - center the important action.
- If a video doesn't line up with a laptop's screen, tweak that product's
  `screen: { left, top, width, height }` percentages in
  `lib/site-content.ts` (values are % of the photo's box).
