"""
Extract individual icons from a single icon-sheet image.

Two modes:
  1. Auto mode (default): finds connected non-background regions and crops each
     one out, ordered top-to-bottom then left-to-right. Best when the source
     image has a flat / transparent background and icons are visually separated.
  2. Grid mode: splits the image into a fixed rows x cols grid. Use this when
     auto-detection merges icons or misses some.

Usage examples (run from the repo root):
  python tools/extract_icons.py \
    --src "public/images/icons/icon-sheet.png" \
    --out public/images/icons \
    --names installations springs openers cables maintenance smart-kits

  # Force a 2-row x 3-col grid split:
  python tools/extract_icons.py --src icon-sheet.png --out public/images/icons \
    --grid 2x3 --names installations springs openers cables maintenance smart-kits

The output filenames are prefixed with "help-" by default to match the
HowCanWeHelp component (public/images/icons/help-<name>.png).
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageChops


# ---------- helpers ----------------------------------------------------------

def detect_background(img: Image.Image) -> tuple[int, int, int, int]:
    """Sample the four corners and return the most common pixel as the
    presumed background colour. RGBA. If the image has alpha, fully transparent
    is treated as the background instead."""
    rgba = img.convert("RGBA")
    w, h = rgba.size
    corners = [rgba.getpixel(p) for p in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1))]

    # If any corner is fully transparent, background is transparent.
    if any(px[3] == 0 for px in corners):
        return (0, 0, 0, 0)

    # Otherwise pick the most common corner colour.
    counts: dict[tuple[int, int, int, int], int] = {}
    for px in corners:
        counts[px] = counts.get(px, 0) + 1
    return max(counts, key=counts.get)


def to_alpha_mask(img: Image.Image, bg: tuple[int, int, int, int], tol: int = 14) -> Image.Image:
    """Return an L-mode mask where icon pixels are 255 and background is 0.

    For transparent backgrounds we just use the alpha channel. For solid-colour
    backgrounds (e.g. white) we threshold by colour distance."""
    rgba = img.convert("RGBA")

    if bg[3] == 0:
        # Transparent background — use alpha directly.
        return rgba.split()[3].point(lambda v: 255 if v > 10 else 0)

    # Solid background — keep pixels that differ from bg by more than tol.
    r, g, b, _ = bg
    px = rgba.load()
    mask = Image.new("L", rgba.size, 0)
    mpx = mask.load()
    w, h = rgba.size
    for y in range(h):
        for x in range(w):
            pr, pg, pb, pa = px[x, y]
            if pa < 10:
                continue
            if abs(pr - r) + abs(pg - g) + abs(pb - b) > tol * 3:
                mpx[x, y] = 255
    return mask


def find_components(mask: Image.Image, min_size: int = 400) -> list[tuple[int, int, int, int]]:
    """Find connected components in a binary mask using a flood-fill.

    Returns a list of bounding boxes (left, top, right, bottom). Boxes with
    area smaller than min_size are discarded (suppresses speckle)."""
    w, h = mask.size
    data = mask.load()
    seen = [[False] * w for _ in range(h)]
    boxes: list[tuple[int, int, int, int]] = []

    for y0 in range(h):
        for x0 in range(w):
            if seen[y0][x0] or data[x0, y0] == 0:
                continue
            # Iterative flood fill (stack) to find this component's bbox.
            stack = [(x0, y0)]
            minx, miny, maxx, maxy = x0, y0, x0, y0
            while stack:
                x, y = stack.pop()
                if x < 0 or y < 0 or x >= w or y >= h:
                    continue
                if seen[y][x] or data[x, y] == 0:
                    continue
                seen[y][x] = True
                if x < minx: minx = x
                if y < miny: miny = y
                if x > maxx: maxx = x
                if y > maxy: maxy = y
                stack.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))
            area = (maxx - minx + 1) * (maxy - miny + 1)
            if area >= min_size:
                boxes.append((minx, miny, maxx + 1, maxy + 1))
    return boxes


def merge_overlapping(boxes: list[tuple[int, int, int, int]], gap: int = 10) -> list[tuple[int, int, int, int]]:
    """Merge boxes that touch or overlap (expanded by ``gap`` px in each
    direction). This re-unites disconnected parts of the same icon."""
    if not boxes:
        return []

    def overlaps(a, b):
        return not (a[2] + gap < b[0] or b[2] + gap < a[0] or a[3] + gap < b[1] or b[3] + gap < a[1])

    def merge(a, b):
        return (min(a[0], b[0]), min(a[1], b[1]), max(a[2], b[2]), max(a[3], b[3]))

    changed = True
    while changed:
        changed = False
        out: list[tuple[int, int, int, int]] = []
        for b in boxes:
            for i, ob in enumerate(out):
                if overlaps(ob, b):
                    out[i] = merge(ob, b)
                    changed = True
                    break
            else:
                out.append(b)
        boxes = out
    return boxes


def order_boxes(boxes: list[tuple[int, int, int, int]], row_tolerance: int) -> list[tuple[int, int, int, int]]:
    """Order boxes top-to-bottom, left-to-right. Boxes whose vertical centres
    are within row_tolerance of each other are treated as the same row."""
    if not boxes:
        return []
    by_y = sorted(boxes, key=lambda b: (b[1] + b[3]) / 2)
    rows: list[list[tuple[int, int, int, int]]] = [[by_y[0]]]
    for b in by_y[1:]:
        last_row = rows[-1]
        last_y = sum((bb[1] + bb[3]) / 2 for bb in last_row) / len(last_row)
        if abs(((b[1] + b[3]) / 2) - last_y) <= row_tolerance:
            last_row.append(b)
        else:
            rows.append([b])
    ordered: list[tuple[int, int, int, int]] = []
    for row in rows:
        ordered.extend(sorted(row, key=lambda b: b[0]))
    return ordered


def square_pad(box: tuple[int, int, int, int], img_size: tuple[int, int], pad_ratio: float) -> tuple[int, int, int, int]:
    """Expand a bbox to a square, with pad_ratio of breathing room, clamped to
    the source image bounds."""
    l, t, r, b = box
    w, h = r - l, b - t
    side = max(w, h)
    pad = int(side * pad_ratio)
    side += pad * 2
    cx, cy = (l + r) // 2, (t + b) // 2
    half = side // 2
    iw, ih = img_size
    return (
        max(0, cx - half),
        max(0, cy - half),
        min(iw, cx + half),
        min(ih, cy + half),
    )


def split_grid(img: Image.Image, rows: int, cols: int) -> list[tuple[int, int, int, int]]:
    """Slice an image into rows x cols equal cells, returning their boxes."""
    w, h = img.size
    cw, ch = w / cols, h / rows
    boxes: list[tuple[int, int, int, int]] = []
    for r in range(rows):
        for c in range(cols):
            boxes.append((int(c * cw), int(r * ch), int((c + 1) * cw), int((r + 1) * ch)))
    return boxes


# ---------- main -------------------------------------------------------------

def save_icons(
    src_path: Path,
    out_dir: Path,
    names: list[str],
    prefix: str,
    mode: str,
    grid: tuple[int, int] | None,
    pad_ratio: float,
    min_size: int,
    merge_gap: int,
) -> int:
    img = Image.open(src_path).convert("RGBA")

    if mode == "grid":
        if grid is None:
            print("error: --grid required for grid mode", file=sys.stderr)
            return 2
        boxes = split_grid(img, grid[0], grid[1])
    else:
        bg = detect_background(img)
        mask = to_alpha_mask(img, bg)
        raw = find_components(mask, min_size=min_size)
        merged = merge_overlapping(raw, gap=merge_gap)
        row_tol = max(img.size) // (max(2, len(names)) * 2)
        boxes = order_boxes(merged, row_tolerance=row_tol)

    if not boxes:
        print("error: no icons detected. Try --mode grid --grid ROWSxCOLS, or "
              "lower --min-size.", file=sys.stderr)
        return 1

    if len(boxes) < len(names):
        print(f"warning: detected {len(boxes)} icons but {len(names)} names "
              "were given. Excess names will be skipped.", file=sys.stderr)
    if len(boxes) > len(names):
        print(f"warning: detected {len(boxes)} icons but only {len(names)} "
              "names. Extra icons will be saved with numeric suffixes.",
              file=sys.stderr)

    out_dir.mkdir(parents=True, exist_ok=True)
    saved = 0
    for i, box in enumerate(boxes):
        name = names[i] if i < len(names) else f"icon-{i + 1}"
        crop_box = square_pad(box, img.size, pad_ratio) if mode == "auto" else box
        cropped = img.crop(crop_box)
        out_path = out_dir / f"{prefix}{name}.png"
        cropped.save(out_path, optimize=True)
        print(f"  -> {out_path}  ({cropped.size[0]}x{cropped.size[1]})")
        saved += 1
    print(f"\nSaved {saved} icon(s) to {out_dir}")
    return 0


def parse_grid(value: str) -> tuple[int, int]:
    try:
        r, c = value.lower().split("x")
        return (int(r), int(c))
    except Exception as e:
        raise argparse.ArgumentTypeError("--grid must look like 2x3") from e


def main(argv: Iterable[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Extract icons from a sheet image.")
    p.add_argument("--src", required=True, type=Path, help="Path to the source image.")
    p.add_argument("--out", required=True, type=Path, help="Output directory.")
    p.add_argument(
        "--names",
        nargs="+",
        default=["installations", "springs", "openers", "cables", "maintenance", "smart-kits"],
        help="Names for each detected icon, in reading order (top-to-bottom, left-to-right).",
    )
    p.add_argument("--prefix", default="help-", help="Filename prefix. Default: help-")
    p.add_argument("--mode", choices=["auto", "grid"], default="auto",
                   help="auto = detect icons by background; grid = fixed split.")
    p.add_argument("--grid", type=parse_grid, default=None,
                   help="Grid layout for grid mode, e.g. 2x3 (rows x cols).")
    p.add_argument("--pad", type=float, default=0.12,
                   help="Square padding ratio around each detected icon. Default 0.12.")
    p.add_argument("--min-size", type=int, default=400,
                   help="Minimum component area in pixels to keep. Default 400.")
    p.add_argument("--merge-gap", type=int, default=12,
                   help="Pixel gap within which to merge components. Default 12.")

    args = p.parse_args(list(argv) if argv is not None else None)

    if not args.src.exists():
        print(f"error: source image not found: {args.src}", file=sys.stderr)
        return 2

    return save_icons(
        src_path=args.src,
        out_dir=args.out,
        names=args.names,
        prefix=args.prefix,
        mode=args.mode,
        grid=args.grid,
        pad_ratio=args.pad,
        min_size=args.min_size,
        merge_gap=args.merge_gap,
    )


if __name__ == "__main__":
    raise SystemExit(main())
