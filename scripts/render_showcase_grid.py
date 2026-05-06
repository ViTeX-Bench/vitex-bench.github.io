"""Render the 4x3 showcase grid videos for the project page.

Picks one clip ID and produces 11 separate mp4s, one per cell:
  cell 1 (top-left): source video with the dilated text mask drawn as a
                     translucent red tint, so reviewers can see exactly
                     which region is being edited.
  cells 2..11      : raw output from each baseline / our two models, at
                     the same scale and duration as cell 1.

The 12th cell of the grid is a static HTML text panel showing the source
and target strings, rendered directly in index.html — no video needed.

Each cell is encoded at 480 x 270 (16:9, four cells across at 1920px wide
or three cells across at 1440px wide). Output goes to
static/videos/showcase_grid/.

Usage:
    python scripts/render_showcase_grid.py --clip 0006286_00000
"""

import argparse
import glob
import os
import subprocess
import sys
import tempfile

import cv2
import numpy as np


METHODS = [
    # (cell label, baseline output dir)
    ("identity",         "identity"),
    ("anytext2",         "anytext2"),
    ("textctrl",         "text_ctrl"),
    ("fluxtext",         "fluxtext"),
    ("rs_ste",           "re-ste"),
    ("textctrl_anyv2v",  "text_ctrl+anyv2v"),
    ("wan_vace",         "wan2.2vace14b"),
    ("videopainter",     "videopainter"),
    ("kling",            "kling"),
    ("vitex_14b",        "ViTeX-14B"),
    ("vitex_composite",  "ViTeX-14B_Corp"),
]


def write_mp4(frames_iter, out_path, fps, size):
    """Write H.264 mp4 by piping rawvideo to ffmpeg (avoids OpenCV's
    fragile internal encoder selection)."""
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


def find_one(pattern):
    matches = sorted(glob.glob(pattern))
    if not matches:
        sys.exit(f"no match: {pattern}")
    return matches[0]


def render_source_with_mask(src_path, mask_path, size, alpha=0.45):
    """Source frames with a translucent red wash inside the dilated mask."""
    src, fps = read_video(src_path, size=size)
    mask_full, _ = read_video(mask_path, size=size)
    n = min(len(src), len(mask_full))
    out = []
    for i in range(n):
        s = src[i].astype(np.float32)
        m = cv2.cvtColor(mask_full[i], cv2.COLOR_BGR2GRAY).astype(np.float32) / 255.0
        m = m[..., None]  # (h, w, 1)
        red = np.zeros_like(s)
        red[..., 2] = 255.0  # BGR red channel
        blended = s * (1 - m * alpha) + red * (m * alpha)
        out.append(np.clip(blended, 0, 255).astype(np.uint8))
    return out, fps


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--clip", default="0006286_00000")
    here = os.path.dirname(os.path.abspath(__file__))
    ap.add_argument("--data_root",
                    default=os.path.normpath(os.path.join(here, "..", "..", "data")),
                    help="Root containing source_videos/, text_masks/, baseline_outputs/<method>/.")
    ap.add_argument("--out_dir",
                    default=os.path.normpath(os.path.join(here, "..", "static", "videos", "showcase_grid")))
    ap.add_argument("--width", type=int, default=480)
    ap.add_argument("--height", type=int, default=270)
    ap.add_argument("--fps", type=float, default=24.0)
    args = ap.parse_args()

    os.makedirs(args.out_dir, exist_ok=True)
    size = (args.width, args.height)

    # Cell 1: source + mask overlay
    src_path = os.path.join(args.data_root, "source_videos", f"{args.clip}.mp4")
    mask_path = find_one(os.path.join(args.data_root, "text_masks", f"{args.clip}_*.mp4"))
    print(f"[source+mask] {os.path.basename(src_path)} + mask")
    src_frames, fps = render_source_with_mask(src_path, mask_path, size=size)
    n = write_mp4(iter(src_frames), os.path.join(args.out_dir, "source_mask.mp4"),
                  fps=args.fps, size=size)
    print(f"  -> source_mask.mp4 ({n} frames)")

    # Cells 2..11: per-method outputs
    for label, method_dir in METHODS:
        method_path = find_one(
            os.path.join(args.data_root, "baseline_outputs", method_dir, f"{args.clip}*.mp4"))
        frames, _ = read_video(method_path, size=size)
        out_path = os.path.join(args.out_dir, f"{label}.mp4")
        n = write_mp4(iter(frames), out_path, fps=args.fps, size=size)
        print(f"[{label:18s}] {os.path.basename(method_path)} -> {os.path.basename(out_path)} ({n} frames)")

    print(f"\nDone. {args.out_dir}")


if __name__ == "__main__":
    main()
