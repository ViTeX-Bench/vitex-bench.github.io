# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Readers and reviewers** arriving from the NeurIPS 2026 Evaluations & Datasets paper, a talk, or a social post. They want to grasp in a minute what ViTeX-Bench is, what is released, and why its protocol is shaped the way it is.
- **Method authors** working on video scene text editing who want the dataset, the evaluation code, the reference model, and the leaderboard, and to see where methods currently land.
- **Practitioners** choosing an editor, who want to see real edited videos and the trade-offs between method families.

All audiences use desktop and phone, in light and dark themes.

## Product Purpose

The project homepage for **ViTeX-Bench: Benchmarking High-Fidelity Video Scene Text Editing** (NeurIPS 2026 Track on Evaluations and Datasets, accepted). It presents a coordinated three-part release: **ViTeX-Dataset** (387 real-world 720p videos: 230 paired training, 157 frozen evaluation), the **ViTeX-Bench** evaluation protocol (13 metrics on three axes), and **ViTeX-Edit-14B** (an open reference editor). Success means a visitor understands the task, the protocol, and the headline finding (accurate text, temporal stability and scene preservation remain hard to achieve together), sees convincing video evidence, and reaches the dataset, code, model, leaderboard and citation without friction.

## Positioning

ViTeX-Bench is OCR-anchored: it measures whether the edited region reads as the target string over time, alongside temporal quality and edit locality. It deliberately has **no weighted aggregate**. One primary metric per axis (SeqAcc ↑, Warp<sub>c</sub> ↓, DreamSim<sub>loc</sub> ↓) and a **three-dimensional Pareto comparison** replace a single score. The earlier "triangle" framing of the three axes is retired; the Pareto front is the current framing.

## Operating Context

- Static site on GitHub Pages at `https://vitex-bench.github.io/` (repo `ViTeX-Bench/vitex-bench.github.io`, branch `master`).
- Sister site: the leaderboard at `https://vitex-bench.github.io/ViTeX-Bench-Leaderboard/` (repo `/home/xh/PJ/ViTeX/ViTeX-Bench-Leaderboard`). Its `data/submissions.jsonl` is the live source of leaderboard rows; the homepage may read it at runtime. The leaderboard's `leaderboard.js` API need not be preserved.
- Release links: dataset `https://huggingface.co/datasets/ViTeX-Bench/ViTeX-Dataset`, evaluation code `https://github.com/ViTeX-Bench/ViTeX-Bench`, model `https://huggingface.co/ViTeX-Bench/ViTeX-Edit-14B`.
- Paper source: `/home/xh/PJ/ViTeX/ViTeX_arxiv/build/paper.pdf` (September 26, 2026 revision).

## Capabilities and Constraints

- Plain static HTML/CSS/JS, no build step.
- **No public paper link yet** (confirmed 2026-09-26): no Paper/arXiv button until one exists.
- Protocol rules inherited from the leaderboard: no overall #1 or aggregate; post-processed (Composite) and Source video rows are shown but unranked; VideoPainter temporal scores are † and excluded from temporal comparison and from the Pareto set.
- Pareto front on the three primaries (paper Table 11): FLUX-Text, TextCtrl, RS-STE, ViTeX-Edit-14B, Wan2.1-VACE-14B. Wan2.1-VACE-14B is on the front at SeqAcc 0, so front membership alone does not mean a successful edit.
- Baseline families: A per-frame image editing (AnyText2, TextCtrl, FLUX-Text, RS-STE); B first-frame editing + propagation (TextCtrl + AnyV2V); C mask-conditioned video inpainting (Wan2.1-VACE-14B, VideoPainter); D instruction-guided video editing (Kling Video 3.0 Omni).

## Brand Commitments

- Names exactly: **ViTeX-Bench**, **ViTeX-Dataset**, **ViTeX-Edit-14B**.
- Authors: Xinghao Chen¹, Xiangbo Gao¹, Jiongze Yu¹, Yuheng Wu², Zhengzhong Tu¹. ¹ Texas A&M University, ² KAIST. Contact: Xinghao Chen (cxh4242@gmail.com), Zhengzhong Tu.
- The work is credited to the **TACO Group** (`https://taco-group.github.io/`) at **Texas A&M University**, as typeset text with links, no logos (confirmed 2026-09-26). KAIST stays in the author affiliations but not in the footer credit.
- The user asked for the homepage to stay close to or consistent with the leaderboard's look (see that repo's DESIGN.md): elegant and minimal, clearly legible type, light/dark toggle, comfortable on phone and desktop.
- Revisions the user asked for on 2026-09-26, after the first redesign:
  - The page must not be purely black and white; use colour sparingly to accent and emphasise.
  - The first viewport leads with the paper title, authors and venue, then the teaser video. The teaser advances to the next scene on its own after a while.
  - NeurIPS 2026 should stand out.
  - Paper figures are shown in colour.
  - No single release link is visually privileged over the others.
  - The comparison section is not called "Methods", because in a paper that word means the authors' own method.
- Voice: scholarly and precise; states what is measured and what is not; never overclaims.
- Existing assets: `static/images/vitex_icon.png`, `favicon.ico`, `favicon-256.png`.

## Evidence on Hand

- Figures: `static/images/teaser.jpg` (paper Fig. 1), `pipeline.png` (Fig. 2), `arch.png` (Fig. 3).
- Videos: `static/videos/showcase_v2/*.mp4` (five 4×3 composite comparisons, source + all methods per scene); `static/videos/failures/*.mp4` (source/output pairs for the four diagnosed failures in paper Fig. 4); `banner_video.mp4`, `carousel*.mp4` (template leftovers, unused).
- Numbers: paper Table 2 (all 13 metric means for 11 rows), calibration (Spearman ρ = 0.95 human vs. OCR ranking; rater correlations +0.71 / −0.40 / −0.53; bootstrap Kendall τ = 0.936), dataset coverage (Table 1).
- Absent, must not be fabricated: public paper URL, per-row confidence intervals on the site, user-submitted leaderboard rows, logos for TAMU/TACO.

## Product Principles

1. **Evidence first**: show real edited video and real numbers; every claim traces to the paper.
2. **Protocol integrity**: never imply a single winner; the Pareto front is three-dimensional and front membership is not success.
3. **Release is the payload**: dataset, code, model, leaderboard and citation are always one tap away.
4. **One family with the leaderboard**: the homepage and leaderboard read as the same project.
5. **Equal on phone and desktop**.

## Accessibility & Inclusion

- WCAG 2.1 AA contrast in both themes; status never by colour alone.
- Respect `prefers-reduced-motion` (no autoplaying motion when reduced) and `prefers-color-scheme`.
- Videos muted, with controls, and never required to understand the text.
