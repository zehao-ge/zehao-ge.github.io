# Media manifest

Place owner-supplied WebP files at the exact paths below. Keep every file at or below 200 KB.

| Path | Recommended size | Source |
|---|---:|---|
| `public/media/portrait.webp` | 400 × 400 | New photo supplied by owner |
| `public/media/work/foot-interface.webp` | 1120 × 630 | `~/Desktop/GPT images/Frame 3.png` |
| `public/media/work/folding-wheel.webp` | 1120 × 630 | `~/Desktop/Frame 121.png` |
| `public/media/work/neuroware.webp` | 1120 × 630 | Owner-supplied export from old site `/untitled/neuroware` |
| `public/media/work/neuro-ui.webp` | 1120 × 630 | Owner-supplied export from old site `/untitled/neuro-ui` |
| `public/media/work/spatial-capstone.webp` | 1120 × 630 | Owner supplied; no public page |
| `public/media/work/pipeline.webp` | 1120 × 630 | New rig photograph supplied by owner |
| `public/media/work/xiaomi-ai.webp` | 1120 × 630 | Owner-supplied export from old site `/untitled/xiaomi-ai` |
| `public/media/work/seb.webp` | 1120 × 630 | Owner-supplied export from old site `/untitled/seb` |
| `public/media/work/skynomad.webp` | 1120 × 630 | Xiaomi official Skynomad interior image; credit `Image: Xiaomi` |
| `public/media/work/yu7-hypervision.webp` | 1120 × 630 | Xiaomi official YU7 panoramic-display image; credit `Image: Xiaomi` |
| `public/media/work/su7-duct.webp` | 1120 × 630 | Xiaomi official SU7 Ultra front three-quarter image; keep the engineering-connection caption in `src/content/site.ts` |
| `public/media/work/midea.webp` | 1120 × 630 | Owner-supplied export from old site `/untitled/midea` |
| `public/media/work/parageta.webp` | 1120 × 630 | Owner-supplied export from old site `/untitled/parageta` |
| `public/media/work/agile-charge.webp` | 1120 × 630 | Owner-supplied export from old site `/untitled/agile-charge` |

Do not hotlink these files. Images that are not photographs of physical objects must keep the visible `Concept visualization` caption in `src/content/site.ts`.

Imported case-study galleries live at `public/media/work/<slug>/01.webp`, `02.webp`, and so on. Gallery images keep their original aspect ratio, are no wider than 1600 px, and are capped at 300 KB each. Selection order, captions, dimensions, and source links are defined in each work entry's `detail` object in `src/content/site.ts`.
