"""
Derive MAGGIE character assets from the two source PNGs.

- Transparency via border flood-fill (scipy.ndimage.label on a background-color
  mask, then drop only the background components that touch the image border).
  Interior light pixels (eyes, mint shirt) are preserved because the dark pixel
  outline encloses them.
- All resizing uses NEAREST to preserve hard pixel edges (no anti-alias/blur).

Run with the user's global Python (Pillow + numpy + scipy installed there).
This script only WRITES into apps/mobile/assets/maggie/. It does not touch
project package files.
"""
import numpy as np
from PIL import Image
from scipy import ndimage
import os

ASSETS = r"C:/Users/summe/Github/test_maggie/apps/mobile/assets/"
OUT = os.path.join(ASSETS, "maggie")
os.makedirs(OUT, exist_ok=True)

SINGLE = "single sprite - maggie.png"
MULTI = "MAGGIE image more pixelated.png"

PAD = 6  # transparent padding around tight crops


def rgba_with_transparency(path, tol=20):
    im = Image.open(path).convert("RGB")
    arr = np.array(im)
    h, w, _ = arr.shape
    frame = np.concatenate([
        arr[0:3, :, :].reshape(-1, 3), arr[-3:, :, :].reshape(-1, 3),
        arr[:, 0:3, :].reshape(-1, 3), arr[:, -3:, :].reshape(-1, 3),
    ])
    bg = np.median(frame, axis=0)
    dist = np.sqrt(((arr.astype(np.int32) - bg) ** 2).sum(axis=2))
    bgm = dist < tol
    lbl, _ = ndimage.label(bgm)
    border = set(lbl[0, :]) | set(lbl[-1, :]) | set(lbl[:, 0]) | set(lbl[:, -1])
    border.discard(0)
    exterior = np.isin(lbl, list(border))
    alpha = np.where(exterior, 0, 255).astype(np.uint8)
    rgba = np.dstack([arr, alpha])
    return Image.fromarray(rgba, "RGBA")


def alpha_bbox(rgba):
    a = np.array(rgba)[:, :, 3]
    ys, xs = np.where(a > 0)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def tight_crop(rgba, pad=PAD):
    x0, y0, x1, y1 = alpha_bbox(rgba)
    x0 = max(0, x0 - pad); y0 = max(0, y0 - pad)
    x1 = min(rgba.width, x1 + pad); y1 = min(rgba.height, y1 + pad)
    return rgba.crop((x0, y0, x1, y1))


def crop_cell(rgba, box, pad=PAD):
    """Crop a rough grid cell, then tighten to that cell's own alpha bbox."""
    cx0, cy0, cx1, cy1 = box
    cell = rgba.crop((cx0, cy0, cx1, cy1))
    return tight_crop(cell, pad)


def save(img, name):
    p = os.path.join(OUT, name)
    img.save(p)
    print(f"{name}: {img.width}x{img.height}")
    return p


def main():
    results = {}

    # ---- single sprite -> hero / idle / avatar ----
    single = rgba_with_transparency(ASSETS + SINGLE)
    hero = tight_crop(single)
    save(hero, "maggie-hero.png")
    save(hero.copy(), "maggie-idle.png")  # same standing pose, in-game name

    # avatar: square head+upper-body crop from the top of the tight body crop
    side = min(hero.width, hero.height)
    avatar_src = hero.crop((
        max(0, (hero.width - side) // 2), 0,
        max(0, (hero.width - side) // 2) + side, side,
    ))
    avatar = avatar_src.resize((256, 256), Image.NEAREST)
    save(avatar, "maggie-avatar.png")

    # ---- multi-pose grid -> wave / thinking / celebrate (+ idle2, sit) ----
    multi = rgba_with_transparency(ASSETS + MULTI)
    # rough cells from projection analysis (x0,y0,x1,y1)
    cells = {
        "idle2":     (72,  108, 412,  533),   # top-left
        "sit":       (519, 108, 837,  533),   # top-mid
        "wave":      (944, 108, 1318, 533),   # top-right
        "thinking":  (273, 617, 601,  1019),  # bottom-left
        "celebrate": (728, 617, 1093, 1019),  # bottom-right
    }
    poses = {}
    for name, box in cells.items():
        poses[name] = crop_cell(multi, box)

    save(poses["wave"], "maggie-wave.png")
    save(poses["thinking"], "maggie-thinking.png")
    save(poses["celebrate"], "maggie-celebrate.png")

    # ---- spritesheet: idle, wave, thinking, celebrate in uniform cells ----
    order = ["idle2", "wave", "thinking", "celebrate"]
    frames = [poses[n] for n in order]
    cw = max(f.width for f in frames)
    ch = max(f.height for f in frames)
    sheet = Image.new("RGBA", (cw * len(frames), ch), (0, 0, 0, 0))
    for i, f in enumerate(frames):
        ox = i * cw + (cw - f.width) // 2          # center horizontally
        oy = ch - f.height                          # bottom-align (shared ground)
        sheet.paste(f, (ox, oy), f)
    save(sheet, "maggie-spritesheet.png")
    print(f"spritesheet frames: {order}  cell={cw}x{ch}  count={len(frames)}")


if __name__ == "__main__":
    main()
