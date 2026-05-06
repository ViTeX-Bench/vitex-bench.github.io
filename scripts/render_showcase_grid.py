"""Render the composite showcase videos for the project page carousel.

For each chosen clip, produce ONE mp4 that lays the eleven methods plus
a text-replacement panel out as a 4 x 3 grid baked into the frame, with
each cell's method label drawn in its top-left corner. The bottom-right
cell is a text panel showing s_src -> s_tgt for that scene.

Outputs go to static/videos/showcase_v2/<clip_id>.mp4.

Usage:
    python scripts/render_showcase_grid.py                 # default 5 scenes
    python scripts/render_showcase_grid.py --clip 0006286_00000
    python scripts/render_showcase_grid.py --clips 0004547_00000,0001942_00000
"""

import argparse
import glob
import json
import os
import subprocess
import sys

import cv2
import numpy as np


# Cell layout (4 columns, 3 rows). Each entry is the method directory under
# data/baseline_outputs/, the public label drawn in the cell, and a family tag
# used to colour the badge.
GRID = [
    # row 0
    [("__source_mask",  "Source + mask",          "src"),
     ("ViTeX-14B",      "ViTeX-14B",              "ours"),
     ("ViTeX-14B_Corp", "ViTeX-14B (Composite)",  "ours"),
     ("anytext2",       "AnyText2",               "A")],
    # row 1
    [("text_ctrl",        "TextCtrl",               "A"),
     ("fluxtext",         "FLUX-Text",              "A"),
     ("re-ste",           "RS-STE",                 "A"),
     ("text_ctrl+anyv2v", "TextCtrl + AnyV2V",      "B")],
    # row 2
    [("wan2.2vace14b", "Wan2.1-VACE-14B",        "C"),
     ("videopainter",  "VideoPainter",           "C"),
     ("kling",         "Kling Video 3.0 Omni",   "D"),
     ("__text_panel",  "",                       "tgt")],
]

# Cell badge background colours (BGR), tuned to match the page palette.
BADGE_BG = {
    "src":  (88, 18, 125),     # purple-ish, matches page src tag
    "ours": (64, 37, 10),      # navy (vt-navy)
    "A":    (40, 110, 60),     # green
    "B":    (40, 80, 145),     # amber/orange
    "C":    (90, 60, 175),     # rose
    "D":    (180, 110, 60),    # blue-violet
    "tgt":  (245, 245, 245),   # neutral light
}
BADGE_FG = {
    "src":  (255, 255, 255),
    "ours": (255, 255, 255),
    "A":    (255, 255, 255),
    "B":    (255, 255, 255),
    "C":    (255, 255, 255),
    "D":    (255, 255, 255),
    "tgt":  (60, 30, 12),
}

DEFAULT_CLIPS = [
    "0004547_00000",  # First -> Last
    "0006286_00000",  # COLLIER -> WASHING
    "0005186_00000",  # ONLY -> STOP
    "0001942_00000",  # BULB? -> LAMP?
    "0000229_00000",  # SOC -> COC
]


def find_one(pattern):
    matches = sorted(glob.glob(pattern))
    if not matches:
        sys.exit(f"no match: {pattern}")
    return matches[0]


def read_video(path, size, max_frames=120):
    cap = cv2.VideoCapture(path)
    if not cap.isOpened():
        sys.exit(f"could not open {path}")
    fps = cap.get(cv2.CAP_PROP_FPS) or 24.0
    out = []
    while len(out) < max_frames:
        ok, frame = cap.read()
        if not ok:
            break
        if size is not None:
            frame = cv2.resize(frame, size, interpolation=cv2.INTER_AREA)
        out.append(frame)
    cap.release()
    return out, fps


def overlay_mask(src_frame, mask_frame, alpha=0.45):
    """Translucent red wash inside the dilated text mask."""
    s = src_frame.astype(np.float32)
    m = cv2.cvtColor(mask_frame, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255.0
    m = m[..., None]
    red = np.zeros_like(s)
    red[..., 2] = 255.0
    blended = s * (1 - m * alpha) + red * (m * alpha)
    return np.clip(blended, 0, 255).astype(np.uint8)


def draw_badge(frame, label, family, font_scale=0.42, pad_x=7, pad_y=4):
    """Draw a rounded label pill in the top-left corner of `frame`."""
    if not label:
        return frame
    font = cv2.FONT_HERSHEY_DUPLEX
    (tw, th), baseline = cv2.getTextSize(label, font, font_scale, 1)
    box_w = tw + 2 * pad_x
    box_h = th + 2 * pad_y + 2
    x0, y0 = 6, 6
    bg = BADGE_BG.get(family, (60, 60, 60))
    fg = BADGE_FG.get(family, (255, 255, 255))
    overlay = frame.copy()
    cv2.rectangle(overlay, (x0, y0), (x0 + box_w, y0 + box_h), bg, -1, cv2.LINE_AA)
    cv2.addWeighted(overlay, 0.92, frame, 0.08, 0, dst=frame)
    cv2.putText(frame, label, (x0 + pad_x, y0 + pad_y + th),
                font, font_scale, fg, 1, cv2.LINE_AA)
    return frame


def render_text_panel(cell_w, cell_h, src_text, tgt_text, clip_id):
    """Render the bottom-right text-replacement cell.

    Plain black background, three centered rows: source string, a down
    arrow, target string. No tags, no clip ID, no pills.
    """
    img = np.zeros((cell_h, cell_w, 3), dtype=np.uint8)
    font = cv2.FONT_HERSHEY_DUPLEX
    white = (255, 255, 255)

    def fit_scale(text, max_w, base_scale):
        """Shrink the requested scale so `text` still fits in max_w pixels."""
        scale = base_scale
        while scale > 0.4:
            (tw, _), _ = cv2.getTextSize(text, font, scale, 2)
            if tw <= max_w:
                return scale
            scale -= 0.05
        return scale

    word_max_w = int(cell_w * 0.86)
    word_base = max(0.9, min(1.6, cell_w / 320.0))
    src_scale = fit_scale(src_text, word_max_w, word_base)
    tgt_scale = fit_scale(tgt_text, word_max_w, word_base)
    arrow_scale = max(src_scale, tgt_scale) * 1.05

    def centered(text, y_center, scale, thickness=2):
        (tw, th), _ = cv2.getTextSize(text, font, scale, thickness)
        x = (cell_w - tw) // 2
        y = y_center + th // 2
        cv2.putText(img, text, (x, y), font, scale, white, thickness, cv2.LINE_AA)

    centered(src_text, int(cell_h * 0.27), src_scale)
    centered("v",      int(cell_h * 0.50), arrow_scale)
    centered(tgt_text, int(cell_h * 0.75), tgt_scale)
    return img


def write_mp4(frames_iter, out_path, fps, size):
    w, h = size
    cmd = [
        "ffmpeg", "-y", "-loglevel", "error",
        "-f", "rawvideo", "-vcodec", "rawvideo", "-pix_fmt", "bgr24",
        "-s", f"{w}x{h}", "-r", str(fps), "-i", "-",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "veryfast",
        "-crf", "20", "-movflags", "+faststart",
        out_path,
    ]
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    n = 0
    for f in frames_iter:
        p.stdin.write(f.tobytes())
        n += 1
    p.stdin.close()
    p.wait()
    if p.returncode != 0:
        sys.exit(f"ffmpeg failed for {out_path}")
    return n


def render_one_clip(clip_id, data_root, out_dir,
                    cell_w=320, cell_h=180, fps=24.0, max_frames=120):
    grid_w = cell_w * 4
    grid_h = cell_h * 3

    # Per-cell frame buffers
    cell_videos = {}   # (row, col) -> list[np.ndarray]
    n_frames = max_frames

    src_path = os.path.join(data_root, "source_videos", f"{clip_id}.mp4")
    mask_path = find_one(os.path.join(data_root, "text_masks", f"{clip_id}_*.mp4"))

    src_frames, _ = read_video(src_path, size=(cell_w, cell_h))
    mask_frames, _ = read_video(mask_path, size=(cell_w, cell_h))
    n_frames = min(n_frames, len(src_frames), len(mask_frames))

    # Pull per-clip text from the eval results (cached on disk).
    eval_all_path = os.path.join(data_root, "..", "outputs", "eval_all.json")
    src_text, tgt_text = clip_id, clip_id
    try:
        with open(eval_all_path) as f:
            ea = json.load(f)
        rec = ea["baselines"]["ViTeX-14B"]["per_clip"].get(clip_id) \
            or ea["baselines"]["identity"]["per_clip"].get(clip_id) \
            or {}
        src_text = rec.get("source_text", clip_id)
        tgt_text = rec.get("target_text", clip_id)
    except Exception as e:
        print(f"  warn: could not read text for {clip_id} ({e})")

    # Cell (0, 0): source + mask
    cell_videos[(0, 0)] = [
        overlay_mask(src_frames[i], mask_frames[i]) for i in range(n_frames)
    ]
    # All method cells
    for r, row in enumerate(GRID):
        for c, (method_dir, _label, _fam) in enumerate(row):
            if method_dir.startswith("__"):
                continue
            method_path = find_one(os.path.join(
                data_root, "baseline_outputs", method_dir, f"{clip_id}*.mp4"))
            frames, _ = read_video(method_path, size=(cell_w, cell_h),
                                   max_frames=n_frames)
            # Pad short outputs by holding the last frame.
            while len(frames) < n_frames:
                frames.append(frames[-1].copy() if frames else
                              np.zeros((cell_h, cell_w, 3), dtype=np.uint8))
            cell_videos[(r, c)] = frames

    # Bottom-right cell: static text panel reused on every frame
    panel = render_text_panel(cell_w, cell_h, src_text, tgt_text, clip_id)
    cell_videos[(2, 3)] = [panel] * n_frames

    # Now compose every frame.
    def frames_iter():
        for i in range(n_frames):
            canvas = np.zeros((grid_h, grid_w, 3), dtype=np.uint8)
            for r, row in enumerate(GRID):
                for c, (_method_dir, label, fam) in enumerate(row):
                    cell = cell_videos[(r, c)][i].copy()
                    if label:
                        draw_badge(cell, label, fam)
                    canvas[r * cell_h:(r + 1) * cell_h,
                           c * cell_w:(c + 1) * cell_w] = cell
            yield canvas

    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, f"{clip_id}.mp4")
    n = write_mp4(frames_iter(), out_path, fps, (grid_w, grid_h))
    print(f"  wrote {out_path}  ({n} frames, {grid_w}x{grid_h})")
    return out_path


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    ap = argparse.ArgumentParser()
    ap.add_argument("--clip",
                    help="Render a single clip (overrides --clips and --default).")
    ap.add_argument("--clips",
                    help="Comma-separated list of clip IDs to render.")
    ap.add_argument("--data_root",
                    default=os.path.normpath(os.path.join(here, "..", "..", "data")),
                    help="Root containing source_videos/, text_masks/, baseline_outputs/<method>/.")
    ap.add_argument("--out_dir",
                    default=os.path.normpath(os.path.join(here, "..", "static", "videos", "showcase_v2")))
    ap.add_argument("--cell_w", type=int, default=480)
    ap.add_argument("--cell_h", type=int, default=270)
    ap.add_argument("--fps", type=float, default=24.0)
    args = ap.parse_args()

    if args.clip:
        clips = [args.clip]
    elif args.clips:
        clips = [c.strip() for c in args.clips.split(",") if c.strip()]
    else:
        clips = DEFAULT_CLIPS

    print(f"Rendering {len(clips)} clip(s) into {args.out_dir}")
    for cid in clips:
        print(f"[{cid}]")
        render_one_clip(cid, args.data_root, args.out_dir,
                        cell_w=args.cell_w, cell_h=args.cell_h, fps=args.fps)


if __name__ == "__main__":
    main()
