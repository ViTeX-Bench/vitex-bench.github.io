# ViTeX-Bench project page

Source of https://vitex-bench.github.io/, the project page for **ViTeX-Bench: Benchmarking High-Fidelity Video Scene Text Editing** (NeurIPS 2026, Track on Evaluations and Datasets). A TACO Group project at Texas A&M University.

The site is static, with no build step: `index.html`, `static/css/site.css` and `static/js/site.js`. Fonts (Atkinson Hyperlegible Next and Mono) are self-hosted in `static/fonts/`. It shares its look with the [leaderboard](https://vitex-bench.github.io/ViTeX-Bench-Leaderboard/) and reads the leaderboard's `data/submissions.jsonl` at runtime for the 3-D Pareto space and the method scores. The paper's numbers are embedded as a fallback.

Preview locally with `python3 -m http.server` and open http://localhost:8000/.

## Media

- `static/videos/promo/ViTeX-Bench_promo_1080p.mp4`: the 66 s overview video, copied unchanged from the promo project; `ViTeX-Bench_promo_720p.mp4` is a smaller encode served to phones (`ffmpeg -i ..._1080p.mp4 -vf scale=1280:-2 -c:v libx264 -crf 23 -preset slow -c:a copy -movflags +faststart ..._720p.mp4`). Poster: `static/images/posters/promo.jpg` (frame at 20.6 s).
- `static/videos/showcase_v2/<clip>.mp4`: 4×3 composite grids (source and every method) rendered by `scripts/render_showcase_grid.py`. The page crops individual methods from these on a canvas, so one decode drives the comparator and the grid view.
- `static/videos/hero/<clip>.mp4`: the source cell stacked over the ViTeX-Edit-14B cell (430×484), cut from the composites for the glyph stage in the "Change the word, keep the scene" section:

  ```bash
  ffmpeg -i static/videos/showcase_v2/<clip>.mp4 \
    -filter_complex "[0:v]crop=430:242:25:28[s];[0:v]crop=430:242:505:28[e];[s][e]vstack" \
    -an -c:v libx264 -crf 20 -preset slow -pix_fmt yuv420p -movflags +faststart static/videos/hero/<clip>.mp4
  ```

- `static/videos/failures/`: source/output pairs for the four diagnosed failures (paper Fig. 4).
- `static/images/posters/`: first frames of the above, shown before the videos load.
- `static/images/social.jpg`: the link preview, a capture of the first viewport.

To add a scene, render its composite, cut the hero clip and posters as above, and add an entry to `SCENES` in `static/js/site.js` (`x` is the horizontal position of the text in the frame, from 0 to 1, where the big word flips).
