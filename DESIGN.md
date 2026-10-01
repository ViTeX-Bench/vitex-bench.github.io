---
name: ViTeX-Bench
description: The project page for a video scene text editing benchmark, set in the leaderboard's monochrome world with one lavender accent taken from the ViTeX logo.
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
  field-accent: "#A99DF6"
  field-accent-ink: "#0E0A24"
  field-accent-soft: "rgba(169, 157, 246, 0.14)"
  field-plate: "#F2F2F2"
  desk-paper: "#E8E8E8"
  desk-paper-raised: "#F0F0F0"
  desk-ink: "#161616"
  desk-ink-dim: "#404040"
  desk-ink-faint: "#5C5C5C"
  desk-hairline: "rgba(0, 0, 0, 0.1)"
  desk-hairline-strong: "rgba(0, 0, 0, 0.22)"
  desk-wash-hover: "rgba(0, 0, 0, 0.035)"
  desk-wash-selected: "rgba(0, 0, 0, 0.06)"
  desk-accent: "#5242C2"
  desk-accent-ink: "#FFFFFF"
  desk-accent-soft: "rgba(82, 66, 194, 0.1)"
  desk-plate: "#F7F7F7"
  video-letterbox: "#000000"
  on-video-light: "#FFFFFF"
  on-video-scrim: "rgba(0, 0, 0, 0.55)"
typography:
  title:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 4.9vw, 4rem)"
    fontWeight: 300
    lineHeight: 1.04
    letterSpacing: "-0.024em"
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
  authors:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
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
  venue:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.005em"
  badge:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11.5px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.01em"
  display-word:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, sans-serif"
    fontSize: "min(184px, 12vw)"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.03em"
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
  button-gap: "10px"
  media-pair-gap: "12px"
  item: "14px"
  column-pad: "28px"
  column: "32px"
  row: "40px"
  gutter: "clamp(20px, 5vw, 56px)"
  hero-top: "clamp(44px, 7vh, 96px)"
  section: "clamp(88px, 12vw, 152px)"
  section-tight: "clamp(64px, 9vw, 112px)"
  footer: "clamp(96px, 13vw, 168px)"
  max-width: "1200px"
  header-height: "60px"
components:
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.field-starlight}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "46px"
  button-ghost-hover:
    backgroundColor: "transparent"
    textColor: "{colors.field-starlight}"
    rounded: "{rounded.pill}"
  button-small:
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "36px"
  venue-badge:
    backgroundColor: "{colors.field-accent}"
    textColor: "{colors.field-accent-ink}"
    typography: "{typography.venue}"
    rounded: "{rounded.pill}"
    padding: "8px 14px 8px 12px"
  venue-track:
    backgroundColor: "transparent"
    textColor: "{colors.field-starlight}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
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
    backgroundColor: "{colors.field-accent-soft}"
    textColor: "{colors.field-accent}"
    typography: "{typography.metric-key}"
    rounded: "{rounded.pill}"
    padding: "7px 10px"
  metric-chip-primary:
    backgroundColor: "{colors.field-accent-soft}"
    textColor: "{colors.field-accent}"
    typography: "{typography.metric-key}"
    rounded: "{rounded.pill}"
    padding: "7px 10px"
  badge-pill:
    backgroundColor: "{colors.field-accent}"
    textColor: "{colors.field-accent-ink}"
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

This page lives in the same world as the ViTeX-Bench Leaderboard (`/home/xh/PJ/ViTeX/ViTeX-Bench-Leaderboard/DESIGN.md`, "Stars in a Dark Universe"). The shared tokens are the same: Field (dark) and Desk (light), one foreground stepped down by alpha, hairlines instead of panels, full pills that invert when active, Atkinson Hyperlegible Next for words and Atkinson Hyperlegible Mono for figures, and the rotatable 3-D Pareto star space. Where the two sites share a component, the leaderboard's specification governs. This file records what the project page adds.

The one deliberate departure is colour. The leaderboard stays strictly monochrome under its No Hue Rule. The project page adds a single lavender accent derived from the ViTeX logo (#9C90F0), tuned per theme. This is a homepage-level extension (approved 2026-09-26), not a change to the shared world. The accent marks a short list of things: the venue, the Pareto front, the target string of an edit, the metric that catches a failure, each axis's primary metric, and interaction affordances. Everything else stays monochrome. The clip behind the teaser now casts its own colour, blurred, and paper figures appear in full colour on a light plate.

The page opens on the paper, set as an editorial title block: a large left-aligned thin title with the bold project name, authors, affiliations, the venue badge and five equal release buttons led by Paper, and a lab credit (TACO Group, Texas A&M University) behind a hairline on the right. Below that is one gesture: a vertical line sweeping across a real clip with the edit on the left and the source on the right, while a display word beside it turns from the source string into the target string, in the accent, as the line crosses the text. The same wipe returns in the comparator. Everything else is quiet reading space in hairline columns. Density is low, and sections open with a lot of top space.

**Key Characteristics:**
- Inherits the leaderboard's Field/Desk neutrals, type pairing, hairlines, pills and 3-D Pareto star space.
- One lavender accent per theme, used sparingly for a fixed set of roles. Status never depends on the hue alone.
- A title-first, left-aligned editorial first viewport with a lab credit aside, then the one-minute overview video as the feature of the fold.
- The glyph stage (display word left, wipe right, over the clip's own blurred colour) opens the first section, "Change the word, keep the scene".
- A draggable, keyboard-operable wipe over real video as the signature interaction, shared by the teaser and the comparator.
- Chrome over video uses fixed white-on-black scrims in both themes.

## Colors

Two lightings of one monochrome object (inherited), one lavender accent tuned to each lighting, and a small fixed set of on-video values that do not change with the theme.

### Primary
- **Starlight / Ink** (`field-starlight` / `desk-ink`): text, active segments, scene chips and method rows (inverted), the focus outline, the ideal star. Structural emphasis still comes from inversion or weight.

### Secondary
- **Logo Lavender** (`field-accent` / `desk-accent`): the page's only authored hue. The pale lavender is for Field and the deep violet for Desk, both taken from the logo lavender so each keeps text contrast on its own background. It fills the NeurIPS 2026 venue badge and the "Pareto front" pill. It colours the front's stars, mesh, glow, legend symbol and method-list symbol; the target string in the teaser caption, failure task codes and the grid's pair tile; the "caught" chips and the ≠ sign in failure titles; primary-metric chips and the "Primary:" value in the axes; ghost-button icons and ghost-button hover borders; the link hover underline; and text selection.
- **Accent Ink** (`*-accent-ink`): text and icons on a filled accent (venue badge, front pill, selection). It is near-black violet in Field and white in Desk.
- **Accent Wash** (`*-accent-soft`): the fill behind accent-bordered metric chips (caught and primary), and nowhere else.

### Neutral
- **Deep Space / Paper** (`field-space` / `desk-paper`): the page background. It also fills the all-methods grid canvas behind its tiles.
- **Raised Space / Light Sheet** (`field-space-raised` / `desk-paper-raised`): inherited. The page does not currently use it.
- **Dim / Grey Ink** (`*-dim`): secondary copy, affiliations, nav links, inactive segments and method rows, abstract body, captions, the source string in the grid's pair tile.
- **Faint** (`*-faint`): tertiary metadata, author superscripts, failure meta lines, metric keys in readouts, method group labels, footer links, arrows between strings.
- **Hairline** (`*-hairline`): row rules, column dividers, the ring around video frames, resting scene chips and the BibTeX border.
- **Strong Hairline** (`*-hairline-strong`): the top rule of the axes and release strips, ghost button and icon button borders at rest.
- **Hover wash** (`*-wash-hover`): method row hover.
- **Figure plate** (`field-plate` / `desk-plate`): the light matte behind a paper figure in both themes, and nothing else.

### On-video
- **Letterbox Black** (`video-letterbox`): the ground under every video canvas (wipe frames, grid, failure videos) in both themes.
- **Line White** (`on-video-light`): the 2px wipe line, handle ring and icon, text on video tags, the grid tile hover ring and focus ring, and the inverted "Source + mask" tile label.
- **Video Scrim** (`on-video-scrim`): tags on video (55% black with a 6px blur). Grid tile labels use 58%. The wipe handle uses near-black at 50%, rising to 70% on hover or drag.

### Named Rules
**The One Lavender Rule.** The accent is the only authored hue. It is reserved for the roles listed under Secondary: venue, Pareto front, edit target, catching metric, primary metric, and affordances (ghost icons, hover borders, link hover, selection). It never marks a method family, a severity, a heading, a resting body link or a generic emphasis. A new use has to name which of those roles it serves.

**The Hue Is Never Alone Rule.** Every accent-marked status also reads without the colour. Caught and primary chips carry a border, the front carries its ring-and-core symbol and its pill, and the target string sits after an arrow. Removing the accent must not remove information.

**The Video's Own Colour Rule.** Anything derived from video is shown in its own colour, never desaturated or tinted. The teaser ambient is the current frame drawn to a 48×27 canvas, set 20% oversize and filtered `blur(60px) saturate(1.15) brightness(0.8)` in Field and `blur(64px) saturate(1.1) brightness(1.3) contrast(0.6)` in Desk, both at 0.5 opacity. A vertical mask fades it in from 0% to 20% and out from 52% to 80%.

**The Light Plate Rule.** Paper figures are shown in full colour on a light plate in both themes, so the raster reads as it was drawn. In Field only, the raster is dimmed to `brightness(0.94)`. The plate links to the full-size figure.

**The On-Video Chrome Rule.** Controls and labels that sit on a video frame use fixed white on translucent black in both themes. They never take the page foreground or the accent, because the frame underneath does not change with the theme.

## Typography

**Display Font:** Atkinson Hyperlegible Next (with ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif), self-hosted variable woff2, 200–800
**Body Font:** Atkinson Hyperlegible Next
**Label/Mono Font:** Atkinson Hyperlegible Mono (with ui-monospace, SF Mono, Menlo, Consolas, monospace), self-hosted variable woff2

**Character:** The leaderboard's pairing. One humanist sans, thin and large for headings and plain for reading, with its mono sibling for every figure, metric key and edited string.

### Hierarchy
- **Title** (300, `clamp(2.3rem, 4.9vw, 4rem)`, 1.04, −0.024em, max 22ch): the paper title, left-aligned, with "ViTeX-Bench:" at 500.
- **Display word** (300, fitted, line-height 1, −0.03em): the glyph stage's source/target string, in the sans. Script scales the wider string to fill the 5/12 word column, capped at min(184px, 12vw) on desktop, 136px below 1000px and 104px below 600px. The target string is set in the accent.
- **Display subtitle** (300, `clamp(1.45rem, 2.9vw, 2.35rem)`, 1.06, −0.022em): the paper subtitle under the name, in full foreground, balanced.
- **Headline** (300, `clamp(1.9rem, 3.2vw, 2.6rem)`, 1.1): every section title, including the Pareto space heading. Section intros under them are dim and capped at 640px.
- **Side headline** (300, `clamp(1.5rem, 2.2vw, 1.9rem)`): the left-column heading in 3/9 splits (Abstract, Cite).
- **Failure title** (400, `clamp(1.45rem, 2.3vw, 1.85rem)`, 1.15): "A ≠ B" claims, with the ≠ in accent at 300.
- **Lede** (300, `clamp(1.25rem, 1.9vw, 1.5rem)`, 1.4): the abstract's first sentence, in full foreground. The paragraphs after it are dim at 16.5px, capped at 68ch.
- **Authors** (400, 18px; 16px below 600px): the author list, with mono faint superscripts at 0.68em. Affiliations are 14.5px dim.
- **Title** (500, 19px): axis names, calibration and readout method name. Release column names use 500 at 21px.
- **Body** (400, 16px, 1.6; 15.5px below 600px): running copy. Failure copy is 15.5px, capped at 52ch.
- **Label** (500, 13–14.5px): buttons (14.5px), segments and tabs (13px), nav (14px), captions (12.5–14px).
- **Venue** (600, 15px, +0.005em): the NeurIPS 2026 badge. The track name beside it is 400.
- **Badge** (500, 11.5px, +0.01em): the "Pareto front" pill.
- **Figure** (mono 400, tabular numerals): readout values at 20px (17px below 600px), selected-star row at 17px, calibration values at 19px, release facts at 13.5px.
- **Metric key** (mono 400, 12.5–13px): readout and pick keys, metric chips, axis chips. Subscripts are 0.72em.
- **Edit string** (mono 400, 12.5–13.5px): scene chips (`First → Last`), failure task codes (`NEW → OLD`).

### Named Rules
**The Words Sans, Numbers Mono Rule** (inherited). Every measurement and rank is set in the mono with tabular figures. This page extends it to edited strings: a source or target string is always set in the mono, in the scene chips, failure task codes and the grid pair tile. The one exception is the glyph stage's display word, which shows the string at display size in the sans.

**The Thin Display Rule** (inherited, with one exception). Headlines, the subtitle and the lede use weight 300 with negative tracking. The project name is the single 600 display setting. Emphasis in running text is 500 in the foreground colour, never italic.

## Layout

The page uses the leaderboard's 1200px column, `clamp(20px, 5vw, 56px)` gutter and sticky 60px header. Sections open with `clamp(88px, 12vw, 152px)` of top space (the abstract uses the tight step, `clamp(64px, 9vw, 112px)`), and the footer opens with `clamp(96px, 13vw, 168px)`.

**First viewport.** Title-first and left-aligned, then the overview video. On desktops at least 1101px wide and 560px tall, the title block and the video together fill exactly one screen (`clamp(560px, 100svh − 60px, 1000px)`). The video takes the height that remains and is sized `min(100cqw, 100cqh × 16/9)` of it (container units), centred, so it is never cut off at the fold. Narrower or shorter screens scroll normally. The title spans the full column on one or two balanced lines (`High-Fidelity` never breaks), then a `1fr : 280px` grid: authors (18px), affiliations, the venue badge row and five equal ghost buttons (Paper, Dataset, Code, ViTeX-Edit-14B, Leaderboard) on the left, in one row where the column is at least 730px wide and otherwise as a 3 + 2 grid of equal-width pills (a container query on the column, so no button is left alone on a row), and the lab credit on the right behind a strong-hairline left rule, bottom-aligned.

**Overview video.** A 16:9 frame with a 14px radius and a strong-hairline ring on black, over a soft blur of its own poster. Before playing it shows the poster (the promo's title card at 2 s) with a bottom-left play control: an accent disc (72px desktop, 42px phone) with a halo ring, "Watch the overview" and a mono "1:06 · with sound" on a bottom scrim. Clicking plays with sound and native controls; the overlay fades out and returns as "Watch again" at the end. Phones (≤800px) load the 720p file, larger screens the 1080p original; nothing loads before the click.

**Share panel.** A circular share icon button sits beside the theme toggle in the header, and a ghost "Share this page" pill sits beside Copy BibTeX. Both open one panel: a 440px popover under the header on desktop, a bottom sheet with a dim scrim on phones (≤600px). It holds the URL with a Copy link pill, then two five-column grids of 42px hairline icon discs with labels: Global (X, LinkedIn, Facebook, Reddit, Bluesky, Threads, WhatsApp, Telegram, Hacker News, Email) and China (WeChat, Weibo, QQ, Douban, RedNote, Zhihu, Bilibili), all labelled and shared in English. Icons are monochrome Simple Icons paths (CC0) in the foreground; hover turns the disc border and glyph to the accent. Every web-share platform is a plain link to its official share endpoint. WeChat reveals an inline QR code (white plate) with a scan-then-share instruction; Xiaohongshu, Zhihu and Bilibili, which have no web share endpoint, copy the English title plus the URL and say so. A system "More apps" button appears only where the Web Share API exists. Escape or the scrim closes it and returns focus to the opener.

**Glyph stage.** Opens the first section under a standard section head. A 5/12 : 7/12 grid with the display word bottom-left, the scene chips and caption under it, and the wipe on the right spanning both rows, over the full-bleed coloured ambient.

**Recurring splits.**
- **5/7**: failure rows (text left, a two-up source/output video pair right).
- **3/9**: abstract and cite (side headline left, body right), with a hairline across the top of the row.
- **7/5**: the narrow figure plate and its caption. Wide figures span the full column.
- **Equal thirds** between vertical hairlines under a strong top rule: protocol axes and release columns (28px column padding). Calibration uses thirds with a strong top rule per item.
- **250px + fluid**: the comparator's method list beside the wipe.

**Breakpoints.**
- **1000px**: the comparator's method list becomes one horizontally scrolling row of outlined pills with the group labels dropped. Failure rows stack, and the readout and pick rows go to three columns.
- **860px**: the nav hides, keeping only the Leaderboard link. Axes, release columns, notes, calibration, abstract, cite and figures collapse to one column, with horizontal hairlines replacing vertical ones.
- **600px**: the five release buttons form a 2-column grid of equal pills, Paper first; the fifth (Leaderboard) sits in the first column, at the same width as the others. The venue stacks: the badge stays a pill and the track name sits under it in dim text, without the outer border. The glyph stage stacks at 1000px (wipe, word, chips) and the credit moves under the title with a top rule. The comparator bar stacks, and the view switch becomes a full-width 2-column grid with a 20px track. The wipe radius drops to 10px and on-video tags shrink.

## Elevation & Depth

The page is flat, as the leaderboard is. There are no cast shadows. Depth comes from translucency over video or over the page (the header at 82% with a 12px blur, the wipe handle and tags with a 6–8px blur), from the coloured ambient behind the teaser, and from perspective, opacity and the Field-only accent glow inside the star space.

### Shadow Vocabulary
- **Hairline ring** (`box-shadow: 0 0 0 1px var(--line)`): the edge of the wipe frames and failure videos. It is a border drawn outside the clip, not elevation.
- **Line knockout** (`box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.18)`): keeps the white wipe line legible over bright frames.
- **Tile ring** (`box-shadow: inset 0 0 0 1.5px #fff`): hover on an all-methods grid tile.

### Named Rules
**The Light Is the Depth Rule** (inherited). Surfaces are separated by a hairline, translucency or the ambient, never by a cast shadow.

## Shapes

The form language is the circle, the pill and the hairline (inherited). The page adds a small ladder of rectangle radii for media:
- **12px**: the teaser and comparator wipe frames, the grid canvas and figure plates (10px wipes below 600px).
- **8px**: failure videos in their two-up pair.
- **6px**: grid tile hit areas.
- **10px**: the BibTeX block.
- **4px**: inline code, the skip link, and the raster inside a plate.

Every control and every tag is a full pill, including the venue badge, segments, scene chips, method rows, metric chips, buttons, video tags and the front pill. A control group that wraps uses a 22px track, or 20px as a 2-column grid. The wipe handle and icon button are circles. Borders are always 1px, and the focus outline is 1.5px at a 3px offset in the foreground (white on video).

## Components

### Buttons
Outlined pills, all equal.
- **Shape:** full pill, 46px tall; the small size is 36px at 13px (Copy BibTeX).
- **Ghost (the only release button):** transparent, 500 at 14.5px, 22px sides, strong-hairline border, foreground text, and a leading 17px stroke icon in the accent. On hover the border turns accent. Paper, Dataset, Code, ViTeX-Edit-14B and Leaderboard all use it, and so do "Open the full leaderboard" and Copy BibTeX.
- **Text link button:** "Watch its output" and release links. Foreground 500 at 13–14px with a trailing 15px stroke arrow, underlined on hover (accent underline on anchors).

### Venue badge
A two-part pill with a 1px accent border: a filled accent segment with a 15px star icon and "NeurIPS 2026" (600, 15px, accent ink), then the track name in foreground, 400. Below 600px the two parts stack and the border drops.

### Segmented controls, scene chips, method rows
- **Segment track:** a 4px-inset hairline pill with 4px gaps. Items are 500 13px dim, and the active item inverts. Used for Compare / All methods and the star-space views.
- **Scene chips:** mono 12.5px edit strings with a 12px stroke arrow (`SOC → COC`). In the teaser they are separate hairline pills on a 60% background mix. The active chip inverts and carries a 2px accent progress bar along its bottom edge that fills over the scene's two sweeps. In the comparator they sit in a single non-wrapping track that scrolls sideways with a hidden scrollbar.
- **Method rows:** full-width pills in the comparator's list, grouped by family under faint 12.5px labels. Each carries its star-space symbol at 12px; front members' ring-and-core is in the accent. Hover shows the wash, and the active row inverts. Below 1000px they become outlined pills in one scrolling row.

### Chips
- **Metric chips:** mono 12.5–13px, 7px × 10px, hairline pill border, dim text.
- **Caught / primary chips:** a failure's catching metrics and each axis's primary metric take an accent border, accent text and the accent wash.
- **Front pill:** accent fill, accent ink, 11.5px 500, with the ring-and-core symbol. It appears next to a front member's name in the readout and in the selected-star row.

### Glyph stage (signature)
The wipe (below) in the 7/12 column over the coloured ambient, with the display word, scene chips and caption in the 5/12 column.
- **Display word:** two stacked spans (source in foreground, target in the accent), each split into per-glyph spans. When the line passes the string's x-position in the frame, source glyphs fade, blur 12px and rise 0.14em, and target glyphs arrive from below. Opacity and filter change over 520ms and transform over 620ms, on `cubic-bezier(0.16, 1, 0.3, 1)`, staggered 38ms per glyph. The pair is also announced as visually hidden text.
- **Sweep:** auto-sweeps from 3% to 97% and back: hold 1100ms, move 2600ms (cubic in-out), hold 1800ms, move 2600ms.
- **Rotation:** after two full sweeps the teaser moves to the next scene. Time off screen does not count. Picking a chip by hand stops the rotation but keeps the sweep. Dragging the line stops both for good. Reduced motion parks the line at 50% and does not rotate.

### Wipe
A 16:9 canvas frame on letterbox black with a hairline ring and a 12px radius. The edit is drawn left of the line and the source plus mask right of it, both cropped live from one composite video. The 2px white line carries a 42px circular handle (blurred near-black, white ring, double-chevron stroke icon). The handle is a `role="slider"` with arrow-key control, and the whole frame is draggable (`ew-resize`, `pan-y` touch). Pill tags top-left and top-right name the two sides. In the comparator there is no sweep, and the left tag names the selected method.

### All-methods grid
Four columns of 16:9 tiles with a 6px gap, drawn on one canvas from the composite video so every method plays in sync. Each tile has a pill label top-left (white on 58% black; the Source tile inverts to black on white) and is a button that returns to the wipe with that method. One tile is a hairline-bordered pair card: the source string dim, a rotated faint arrow, the target string in the accent, all in the mono.

### Readout
Below the comparator, behind a top hairline: the method name (500, 19px) with its front pill and a faint family line, then three mono metric cells (12.5px key, 20px value, 12px faint rank), and a faint note that scores are split means.

### Failure rows
A numbered list of 5/7 rows between hairlines with 40px vertical padding. Text side: the "A ≠ B" title with an accent ≠, a faint meta line (method · family), mono task codes joined by an arrow with the target code in accent (its border a 45% accent mix), dim copy capped at 52ch, and the metric-chip signature with the caught chips in accent. Media side: a two-up source/output pair of 8px-radius videos with 12.5px faint captions. The videos load when scrolled into view.

### Release columns
Three equal columns under a strong top rule, divided by vertical hairlines. Each has a 21px 500 name, dim copy, a key/value list between hairlines (faint 13.5px sans key, right-aligned 13.5px mono value) and a text link pinned to the bottom.

### Figure plates
A light plate with a 12px radius and fluid padding, holding the full-colour raster. The caption (14px dim, 72ch) sits beside or below it with a bold lead-in and ends with a "Full-size figure" link. Wide figures span the column. The narrow plate is capped at 560px on small screens.

### Cite
A 3/9 split. The BibTeX block is a hairline-bordered 10px pre, mono 12.5px/1.7 in dim text, wrapped rather than scrolled, with continuation lines hang-indented 18ch (4ch below 600px). A small ghost button copies it. The contact line (14px dim) sits under the button.

### Navigation
The leaderboard's header: sticky, 60px, 82% background mix, 12px blur, bottom hairline. The wordmark is 600 at 16px. Section links are 14px dim: Comparison, Failures, Protocol, Release, Cite. A hairline-separated "Leaderboard ↗" link and a 36px circular theme toggle sit at the right. Below 860px only the Leaderboard link and the toggle remain.

### Footer
A top hairline, then the credit (14.5px dim, with foreground links to the TACO Group and Texas A&M University) and a row of faint 14px release links.

### Star Space
The leaderboard's signature (same symbols, ideal star, Delaunay front mesh, 1100ms view tweens, face views, drift at rest), fed by the leaderboard's live `submissions.jsonl`. On this page the front is drawn in the accent: front stars (4.4px core, 8.5px ring at 60%), the mesh (10–12% fill, 60–70% edges) and, in Field only, a 20px radial glow. Other stars, the ideal star and all labels stay in the foreground. It sits in the flow with a `clamp(420px, 44vw, 580px)` stage, the legend and note below, and a selected-star row (mono figures with ranks, plus "Watch its output", which opens that method in the comparator).

## Do's and Don'ts

### Do:
- **Do** follow the leaderboard's DESIGN.md for every shared token and component. This page extends that world with one accent; it does not fork it.
- **Do** use the theme's accent token (`#A99DF6` Field, `#5242C2` Desk) for the venue, the Pareto front, edit targets, caught and primary metrics, ghost-button icons and hover borders, link hover and selection, and for nothing else.
- **Do** keep every accent-marked status readable without colour: a border on chips, the ring-and-core symbol and pill for the front, the arrow before a target.
- **Do** let video and paper figures show their own colour: the blurred ambient behind the teaser, and figures on a light plate in both themes.
- **Do** use the wipe for any before/after comparison: edit left, source right, a white line and a slider handle operable by keyboard.
- **Do** set edited strings, metric keys and every figure in Atkinson Hyperlegible Mono with tabular numerals.
- **Do** separate content with hairlines and the 5/7, 3/9 and equal-thirds splits instead of boxes.
- **Do** keep chrome on video fixed white on translucent black in both themes.
- **Do** stop auto-motion for reduced motion (line parked at 50%, no scene rotation, no camera drift).

### Don't:
- **Don't** author a second hue, or use the accent for method families, failure severity, headings, resting links or general emphasis.
- **Don't** give any release link a filled button. The five release links (Paper, Dataset, Code, ViTeX-Edit-14B, Leaderboard) are equal ghost pills.
- **Don't** desaturate, tint or grade video or figures to match the page.
- **Don't** give page chrome a filled panel or a cast shadow. The figure plate, which mats a raster, is the only filled surface besides the accent badge and pill.
- **Don't** draw the Pareto front as a 2-D line or staircase, and don't show an aggregate score or an overall #1.
- **Don't** use script, handwritten or italic display faces, or a second sans.
