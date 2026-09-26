---
name: ViTeX-Bench
description: The project page for a video scene text editing benchmark, set in the leaderboard's monochrome world, where edited video is the only colour.
colors:
  field-space: "#050505"
  field-space-raised: "#0F0F0F"
  field-starlight: "#F4F4F4"
  field-starlight-dim: "#A8A8A8"
  field-starlight-faint: "#7E7E7E"
  field-hairline: "rgba(255, 255, 255, 0.1)"
  field-hairline-strong: "rgba(255, 255, 255, 0.22)"
  field-wash-hover: "rgba(255, 255, 255, 0.045)"
  field-wash-selected: "rgba(255, 255, 255, 0.075)"
  field-plate: "#191919"
  desk-paper: "#E8E8E8"
  desk-paper-raised: "#F0F0F0"
  desk-ink: "#161616"
  desk-ink-dim: "#404040"
  desk-ink-faint: "#5C5C5C"
  desk-hairline: "rgba(0, 0, 0, 0.1)"
  desk-hairline-strong: "rgba(0, 0, 0, 0.22)"
  desk-wash-hover: "rgba(0, 0, 0, 0.035)"
  desk-wash-selected: "rgba(0, 0, 0, 0.06)"
  desk-plate: "#F6F6F6"
  video-letterbox: "#000000"
  on-video-light: "#FFFFFF"
  on-video-scrim: "rgba(0, 0, 0, 0.55)"
typography:
  display-word:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, sans-serif"
    fontSize: "min(184px, 12vw)"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.03em"
  display:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)"
    fontWeight: 300
    lineHeight: 1.06
    letterSpacing: "-0.022em"
  headline:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline-side:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.2vw, 1.9rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  failure-title:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.45rem, 2.3vw, 1.85rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  lede:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.9vw, 1.5rem)"
    fontWeight: 300
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1
  badge:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11.5px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.01em"
  figure:
    fontFamily: "Atkinson Hyperlegible Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1
    fontFeature: "tnum"
  metric-key:
    fontFamily: "Atkinson Hyperlegible Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.2
  edit-string:
    fontFamily: "Atkinson Hyperlegible Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1
  bibtex:
    fontFamily: "Atkinson Hyperlegible Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  hairline-box: "4px"
  grid-cell: "6px"
  media-small: "8px"
  pre: "10px"
  media: "12px"
  group-grid: "20px"
  group: "22px"
  pill: "999px"
spacing:
  control-inset: "4px"
  grid-gap: "6px"
  tight: "8px"
  media-pair-gap: "12px"
  item: "14px"
  column-pad: "28px"
  column: "32px"
  row: "40px"
  gutter: "clamp(20px, 5vw, 56px)"
  section: "clamp(88px, 12vw, 152px)"
  section-tight: "clamp(64px, 9vw, 112px)"
  footer: "clamp(96px, 13vw, 168px)"
  max-width: "1200px"
  header-height: "60px"
components:
  button-primary:
    backgroundColor: "{colors.field-starlight}"
    textColor: "{colors.field-space}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "46px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.field-starlight}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "46px"
  button-small:
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "36px"
  segment:
    backgroundColor: "transparent"
    textColor: "{colors.field-starlight-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "9px 14px"
  segment-active:
    backgroundColor: "{colors.field-starlight}"
    textColor: "{colors.field-space}"
    rounded: "{rounded.pill}"
  scene-chip:
    backgroundColor: "transparent"
    textColor: "{colors.field-starlight-dim}"
    typography: "{typography.edit-string}"
    rounded: "{rounded.pill}"
    padding: "9px 14px"
  scene-chip-active:
    backgroundColor: "{colors.field-starlight}"
    textColor: "{colors.field-space}"
    rounded: "{rounded.pill}"
  method-row:
    backgroundColor: "transparent"
    textColor: "{colors.field-starlight-dim}"
    rounded: "{rounded.pill}"
    padding: "9px 12px"
  method-row-active:
    backgroundColor: "{colors.field-starlight}"
    textColor: "{colors.field-space}"
    rounded: "{rounded.pill}"
  metric-chip:
    backgroundColor: "transparent"
    textColor: "{colors.field-starlight-dim}"
    typography: "{typography.metric-key}"
    rounded: "{rounded.pill}"
    padding: "7px 10px"
  metric-chip-caught:
    textColor: "{colors.field-starlight}"
    rounded: "{rounded.pill}"
  badge-pill:
    backgroundColor: "{colors.field-starlight}"
    textColor: "{colors.field-space}"
    typography: "{typography.badge}"
    rounded: "{rounded.pill}"
    padding: "4px 10px 4px 8px"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.field-starlight-dim}"
    rounded: "{rounded.pill}"
    size: "36px"
  wipe-frame:
    backgroundColor: "{colors.video-letterbox}"
    rounded: "{rounded.media}"
    width: "100%"
  wipe-handle:
    backgroundColor: "rgba(8, 8, 8, 0.5)"
    textColor: "{colors.on-video-light}"
    rounded: "{rounded.pill}"
    size: "42px"
  video-tag:
    backgroundColor: "{colors.on-video-scrim}"
    textColor: "{colors.on-video-light}"
    rounded: "{rounded.pill}"
    padding: "6px 10px"
  figure-plate:
    backgroundColor: "{colors.field-plate}"
    rounded: "{rounded.media}"
    padding: "clamp(12px, 2.4vw, 28px)"
  bibtex-block:
    backgroundColor: "transparent"
    textColor: "{colors.field-starlight-dim}"
    typography: "{typography.bibtex}"
    rounded: "{rounded.pre}"
    padding: "18px 20px"
---

# Design System: ViTeX-Bench

## Overview

**Creative North Star: "The Word Under the Line"**

This page lives in the same world as the ViTeX-Bench Leaderboard (`/home/xh/PJ/ViTeX/ViTeX-Bench-Leaderboard/DESIGN.md`, "Stars in a Dark Universe"). The tokens are the same: monochrome Field (dark) and Desk (light), one foreground stepped down by alpha, hairlines instead of panels, full pills that invert when active, Atkinson Hyperlegible Next for words and Atkinson Hyperlegible Mono for figures, and the rotatable 3-D Pareto star space. Where the two sites share a component, the leaderboard's specification governs. This file records what the project page adds.

The leaderboard is built around a space of points. This page is built around one gesture: a vertical line sweeping across a real clip, with the edit on the left and the source on the right, while the same word, set huge in the page's thin display weight, turns from the source string into the target string. The same wipe comes back in the all-methods comparator. Everything else is quiet reading space in hairline columns. The four failure rows, the three protocol axes, the release columns, the figure plates and the BibTeX block all sit between rules, not inside cards.

The page has no hue of its own. Edited video is the only colour on it, and even the ambient wash that video casts behind the hero is greyscale. Density is low. Sections open with a lot of top space, and structure comes from 5/7 and 3/9 column splits and hairlines.

**Key Characteristics:**
- Inherits the leaderboard's Field/Desk monochrome, type pairing, hairlines, pills and 3-D Pareto star space unchanged.
- A draggable, keyboard-operable wipe over real video as the signature interaction, shared by the hero and the comparator.
- A display word fitted to its column that crossfades glyph by glyph from source to target as the line passes the text.
- Video is the only colour. Backdrops derived from video are greyscale, and paper figures are shown greyscale on a plate.
- Chrome over video uses fixed white-on-black scrims in both themes.

## Colors

Two lightings of one monochrome object (inherited), plus a small fixed set of on-video values that do not change with the theme.

### Primary
- **Starlight / Ink** (`field-starlight` / `desk-ink`): text, the primary button fill, active segments, scene chips and method rows, the venue and "Pareto front" badge pills, the "caught" metric chip border, the focus outline and text selection. Emphasis comes from inversion or weight, never from colour.

### Neutral
- **Deep Space / Paper** (`field-space` / `desk-paper`): the page background. It also fills the all-methods grid canvas behind its tiles.
- **Raised Space / Light Sheet** (`field-space-raised` / `desk-paper-raised`): inherited. The page does not currently use it.
- **Dim / Grey Ink** (`*-dim`): secondary copy, nav links, inactive segments and method rows, abstract body, captions.
- **Faint** (`*-faint`): tertiary metadata, failure meta lines, metric keys in readouts, method group labels, footer links.
- **Hairline** (`*-hairline`): row rules between failures, release list rows, column dividers, the hairline ring around video frames, and the BibTeX border.
- **Strong Hairline** (`*-hairline-strong`): the top rule of the axes and release strips, ghost button and icon button borders, the lab credit's left rule.
- **Hover wash** (`*-wash-hover`): method row hover.
- **Figure plate** (`field-plate` / `desk-plate`): the matte behind a raster paper figure, and nothing else.

### On-video
- **Letterbox Black** (`video-letterbox`): the ground under every video canvas (wipe frames, grid, failure videos) in both themes.
- **Line White** (`on-video-light`): the 2px wipe line, handle ring and icon, the text on video tags, the grid tile hover ring and focus ring, and the inverted "Source + mask" tile label.
- **Video Scrim** (`on-video-scrim`): tags on video (55% black with a 6px blur). Grid tile labels use 58%, and the wipe handle uses near-black at 50%, rising to 70% on hover or drag.

### Named Rules
**The Video Is the Only Colour Rule.** No hue is authored anywhere on the page. The colour a visitor sees comes from edited video frames and nothing else. Links, status, failures and the "caught" metric are all monochrome.

**The Greyscale Ambient Rule.** Anything derived from video but outside the frame is desaturated. The hero ambient is the current frame drawn to a 48×27 canvas, set full-bleed and filtered `grayscale(1) blur(56px) brightness(0.75)` at 0.42 opacity in Field, and `grayscale(1) blur(64px) brightness(1.45) contrast(0.55)` at 0.55 in Desk. It fades out downward with a mask from 40% to 96%.

**The Plate Rule.** Paper figures (colour rasters) are shown `grayscale(1)` on the figure plate, dimmed to `brightness(0.8)` in Field. Colour stays one click away: the plate links to the full-size figure, and the caption ends with "Full-size figure, in colour."

**The On-Video Chrome Rule.** Controls and labels that sit on a video frame use fixed white on translucent black in both themes. They never take the page foreground, because the frame underneath does not change with the theme.

## Typography

**Display Font:** Atkinson Hyperlegible Next (with ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif), self-hosted variable woff2, 200–800
**Body Font:** Atkinson Hyperlegible Next
**Label/Mono Font:** Atkinson Hyperlegible Mono (with ui-monospace, SF Mono, Menlo, Consolas, monospace), self-hosted variable woff2

**Character:** The leaderboard's pairing. One humanist sans, thin and large for display and plain for reading, with its mono sibling for every figure, metric key and edited string.

### Hierarchy
- **Display word** (300, fitted, line-height 1, −0.03em): the hero's source/target word. Script measures the wider of the two strings at 100px and scales it to fill the word column, capped at min(184px, 12vw) on desktop, 136px below 1000px and 104px below 600px. The display word is always a real string from the clip on screen.
- **Display** (300, `clamp(2.1rem, 4.4vw, 3.6rem)`, 1.06, −0.022em): the paper title, capped at 25ch. The name "ViTeX-Bench:" is set at 500 inside it.
- **Headline** (300, `clamp(1.9rem, 3.2vw, 2.6rem)`, 1.1): section titles. Section intros under them are dim and capped at 640px.
- **Side headline** (300, `clamp(1.5rem, 2.2vw, 1.9rem)`): the left-column heading in 3/9 splits (Abstract, Cite).
- **Failure title** (400, `clamp(1.45rem, 2.3vw, 1.85rem)`, 1.15): "A ≠ B" claims, with the ≠ in faint 300.
- **Lede** (300, `clamp(1.25rem, 1.9vw, 1.5rem)`, 1.4): the abstract's first sentence, in full foreground. The paragraphs after it are dim at 16.5px, capped at 68ch.
- **Title** (500, 19px): axis names, calibration and star-space subheads, the readout method name. Release column names use 500 at 21px, and the lab credit uses 500 at 22px.
- **Body** (400, 16px, 1.6; 15.5px below 600px): running copy. Failure copy is 15.5px, capped at 52ch.
- **Label** (500, 13–14.5px): buttons (14.5px), segments and tabs (13px), nav (14px), captions (12.5–14px).
- **Badge** (500, 11.5px, +0.01em; 13px for the venue pill): inverted pills.
- **Figure** (mono 400, tabular numerals): comparator readout values at 20px (17px below 600px), selected-star row at 17px, calibration values at 19px, release facts at 13.5px.
- **Metric key** (mono 400, 12.5–13px): readout and pick keys, metric chips, axis chips. Subscripts are 0.72em.
- **Edit string** (mono 400, 12.5–13.5px): scene chips (`First → Last`), failure task codes (`NEW → OLD`), the grid's pair tile.

### Named Rules
**The Words Sans, Numbers Mono Rule** (inherited). Every measurement and rank is set in the mono with tabular figures. This page extends it to edited strings. A source or target string quoted as data is set in the mono, and only the hero display word shows the string in the sans.

**The Thin Display Rule** (inherited). Display, headline and lede sizes use weight 300 with negative tracking. Emphasis is 500 in the foreground colour, never italic.

## Layout

The page uses the leaderboard's 1200px column, `clamp(20px, 5vw, 56px)` gutter and sticky 60px header. Sections open with `clamp(88px, 12vw, 152px)` of top space (the abstract uses the tight step, `clamp(64px, 9vw, 112px)`), and the footer opens with `clamp(96px, 13vw, 168px)`.

**First viewport.** The glyph stage runs full-bleed, with the greyscale ambient behind it. Inside the column, a 5/12 : 7/12 grid puts the display word bottom-left, the scene chips and caption below it, and the hero wipe on the right, spanning both rows. The title block follows immediately: the title, authors, affiliations, venue pill and release buttons on the left, and a 280px lab credit on the right behind a strong-hairline left rule. At 1440×900 the title and release buttons stay in view.

**Recurring splits.**
- **5/7**: the hero, and the failure rows (text left, a two-up source/output video pair right).
- **3/9**: abstract and cite (side headline left, body right), with a hairline across the top of the row.
- **7/5**: the narrow figure plate and its caption. Wide figures span the full column.
- **Equal thirds** between vertical hairlines under a strong top rule: protocol axes and release columns (28px column padding). Calibration uses thirds with a strong top rule per item.
- **250px + fluid**: the comparator's method list beside the wipe.

**Breakpoints.**
- **1000px**: the hero stacks (wipe, word, chips), and the credit moves under the title with a top rule. The comparator's method list becomes one horizontally scrolling row of outlined pills with the group labels dropped. Failure rows stack, and the readout and pick rows go to three columns.
- **860px**: the nav hides, keeping only the Leaderboard link. Axes, release columns, notes, calibration, abstract, cite and figures collapse to one column, with horizontal hairlines replacing the vertical ones.
- **600px**: release buttons form a 2-column grid. The comparator bar stacks, and the view switch becomes a full-width 2-column grid with a 20px track. Wipe radius drops to 10px and on-video tags shrink.

## Elevation & Depth

The page is flat, as the leaderboard is. There are no cast shadows. Depth comes from translucency over video or over the page (the header at 82% with a 12px blur, the wipe handle and tags with a 6–8px blur), from the greyscale ambient behind the hero, and from perspective and opacity inside the star space.

### Shadow Vocabulary
- **Hairline ring** (`box-shadow: 0 0 0 1px var(--line)`): the edge of the wipe frames and failure videos. It is a border drawn outside the clip, not elevation.
- **Line knockout** (`box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.18)`): keeps the white wipe line legible over bright frames.
- **Tile ring** (`box-shadow: inset 0 0 0 1.5px #fff`): hover on an all-methods grid tile.

### Named Rules
**The Light Is the Depth Rule** (inherited). Surfaces are separated by a hairline, translucency or the ambient, never by a cast shadow.

## Shapes

The form language is the circle, the pill and the hairline (inherited). The page adds a small ladder of rectangle radii for media:
- **12px**: the hero and comparator wipe frames, the grid canvas and figure plates (10px wipes below 600px).
- **8px**: failure videos in their two-up pair.
- **6px**: grid tile hit areas.
- **10px**: the BibTeX block.
- **4px**: inline code, the skip link, and the raster inside a plate.

Every control and every tag is a full pill, including segments, scene chips, method rows, metric chips, buttons, video tags and badge pills. A control group that wraps uses a 22px track, or 20px as a 2-column grid. The wipe handle and icon button are circles. Borders are always 1px, and the focus outline is 1.5px at a 3px offset (white on video).

## Components

### Buttons
Solid or outlined pills (inherited).
- **Shape:** full pill, 46px tall; the small size is 36px (Copy BibTeX).
- **Primary:** foreground fill with background-colour text, 500 at 14.5px, 22px sides, a 17px stroke icon leading. Only Dataset is primary. Hover lowers opacity to 0.86.
- **Ghost:** transparent with a strong-hairline border. The border goes to full foreground on hover.
- **Text link button:** "Watch its output" and release links. Foreground 500 at 13–14px with a trailing 15px stroke arrow, underlined on hover.

### Segmented controls, scene chips, method rows
- **Segment track:** a 4px-inset hairline pill with 4px gaps. Items are 500 13px dim, and the active item inverts. Used for Compare / All methods and the star-space views.
- **Scene chips:** mono 12.5px edit strings with a 12px stroke arrow (`SOC → COC`). In the hero they are separate outlined pills on a 55% background mix. In the comparator they sit in a single non-wrapping track that scrolls sideways with a hidden scrollbar. The active chip inverts.
- **Method rows:** full-width pills in the comparator's list, grouped by family under faint 12.5px labels. Each carries its star-space symbol (ring-and-core, point or hollow ring) at 12px. Hover shows the wash, and the active row inverts. Below 1000px they become outlined pills in one scrolling row.

### Chips
- **Metric chips:** mono 12.5–13px, 7px × 10px, hairline pill border, dim text. The axis primary and a failure's catching metric ("caught") take a foreground border and text. Status is shown by the border, never by colour.
- **Badge pill:** inverted, 11.5px 500. It carries two meanings only: "Pareto front" membership (with the ring-and-core symbol), and the venue ("NeurIPS 2026", 13px).

### Wipe (signature)
A 16:9 canvas frame on letterbox black with a hairline ring and a 12px radius. The edit is drawn left of the line and the source plus mask right of it, both cropped live from one composite video. The 2px white line carries a 42px circular handle (blurred near-black, white ring, double-chevron stroke icon). The handle is a `role="slider"` with arrow-key control, and the whole frame is draggable (`ew-resize`, `pan-y` touch). Pill tags top-left and top-right name the two sides.
- **Hero motion:** auto-sweeps from 3% to 97% and back: hold 1100ms, move 2600ms (cubic in-out), hold 1800ms, move 2600ms. It stops for good once the visitor takes the line. Reduced motion parks it at 50%.
- **Comparator:** the same wipe, with no sweep. The left tag names the selected method.

### Display word
The hero's word is two stacked spans (source and target), each split into per-glyph spans. When the line passes the string's x-position in the frame, source glyphs fade, blur 12px and rise 0.14em, and target glyphs arrive from below. The transitions are opacity and filter over 520ms and transform over 620ms, on `cubic-bezier(0.16, 1, 0.3, 1)`, staggered 38ms per glyph. Reduced motion swaps instantly without blur. The pair is repeated as visually hidden text for screen readers.

### All-methods grid
Four columns of 16:9 tiles with a 6px gap, drawn on one canvas from the composite video so every method plays in sync. Each tile has a pill label top-left (white on 58% black; the Source tile inverts to black on white) and is a button that returns to the wipe with that method. One tile is a hairline-bordered pair card showing the source string, a rotated arrow and the target string in the mono.

### Readout
Below the comparator, behind a top hairline: the method name (500, 19px) with its badge pill and a faint family line, then three mono metric cells (12.5px key, 20px value, 12px faint rank), and a faint note that scores are split means.

### Failure rows
A numbered list of 5/7 rows between hairlines with 40px vertical padding. Text side: the "A ≠ B" title, a faint meta line (method · family), mono task codes joined by an arrow, dim copy capped at 52ch, and the metric-chip signature with the catching chips in foreground. Media side: a two-up source/output pair of 8px-radius videos with 12.5px faint captions. The videos load when scrolled into view.

### Release columns
Three equal columns under a strong top rule, divided by vertical hairlines. Each has a 21px 500 name, dim copy, a key/value list between hairlines (faint 13.5px sans key, right-aligned 13.5px mono value) and a text link pinned to the bottom.

### Figure plates
A plate-coloured matte with a 12px radius and fluid padding, holding the greyscale raster. The caption (14px dim, 72ch) sits beside or below it with a bold lead-in. Wide figures span the column. The narrow plate is capped at 560px on small screens.

### BibTeX block
A hairline-bordered 10px pre, mono 12.5px/1.7 in dim text, wrapped rather than scrolled. Continuation lines hang-indent 14ch (4ch below 600px). A small ghost button copies it.

### Navigation
The leaderboard's header: sticky, 60px, 82% background mix, 12px blur, bottom hairline. The wordmark is 600 at 16px, and section links are 14px dim. A hairline-separated "Leaderboard ↗" link and a 36px circular theme toggle sit at the right. Below 860px only the Leaderboard link and the toggle remain.

### Star Space
Identical to the leaderboard's signature (same symbols, ideal star, Delaunay front mesh, 1100ms view tweens, face views, drift at rest), fed by the leaderboard's live `submissions.jsonl`. Here it sits in the flow with a `clamp(420px, 44vw, 580px)` stage, the legend and note below, and a selected-star row (mono figures with ranks, plus "Watch its output", which opens that method in the comparator).

## Do's and Don'ts

### Do:
- **Do** follow the leaderboard's DESIGN.md for every shared token and component. This page adds to that world. It does not fork it.
- **Do** let edited video carry all the colour on the page, and desaturate anything derived from it (ambient, figures).
- **Do** use the wipe for any before/after comparison: edit left, source right, a white line and a slider handle operable by keyboard.
- **Do** set edited strings, metric keys and every figure in Atkinson Hyperlegible Mono with tabular numerals.
- **Do** separate content with hairlines and the 5/7, 3/9 and equal-thirds splits instead of boxes.
- **Do** keep chrome on video fixed white on translucent black in both themes.
- **Do** make the Dataset link the only primary button. Other release links are ghost pills or text links.
- **Do** stop auto-motion for reduced motion (wipe parked at 50%, instant glyph swap, no camera drift).

### Don't:
- **Don't** author any hue. That rules out coloured links, red failure marks and tinted families.
- **Don't** show a paper raster in colour inline. Mat it on the plate in greyscale and link the colour original.
- **Don't** give page chrome a filled panel or a cast shadow. The figure plate, which mats a raster, is the only filled surface.
- **Don't** draw the Pareto front as a 2-D line or staircase, and don't show an aggregate score or an overall #1.
- **Don't** use script, handwritten or italic display faces, or a second sans.
