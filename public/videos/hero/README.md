# Hero scrub film

The cinematic single-take film scrubbed by scroll in the hero
(`components/sections/Hero.tsx`, paths in `lib/site-content.ts`).

| File              | Purpose                                        |
| ----------------- | ---------------------------------------------- |
| `hero-scrub.mp4`  | The film - H.264, silent, dense keyframes      |
| `hero-poster.jpg` | First frame - poster / reduced-motion fallback |

## Encoding rules (why this file is special)

Scroll-scrubbing seeks `video.currentTime` dozens of times per second.
A normally-encoded mp4 has a keyframe every ~2s, so every seek decodes
up to 60 frames → visible stutter. This film must be re-encoded with a
keyframe every few frames and no B-frames:

```bash
ffmpeg -i raw.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset slow \
  -crf 21 -g 4 -bf 0 -movflags +faststart hero-scrub.mp4

ffmpeg -i hero-scrub.mp4 -frames:v 1 -q:v 2 hero-poster.jpg
```

- `-g 4` → keyframe every 4 frames (instant seeks, sane file size;
  use `-g 1` for all-intra if size allows)
- `-bf 0` → no B-frames (decoder never waits on future frames)
- `-an` → silent (scrub heroes are muted anyway; saves weight)
- `-movflags +faststart` → metadata up front for instant first frame

Until the files exist the hero still works - dark studio backdrop,
copy stages and white-out all run; the film simply stays black.
