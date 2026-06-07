# Maggie character assets

Transparent-background, hard-edged pixel art derived from two source images in
`apps/mobile/assets/`:

- `single sprite - maggie.png` (1254×1254) → hero / idle / avatar
- `MAGGIE image more pixelated.png` (1402×1122, 5-pose grid) → wave / thinking / celebrate / spritesheet

Regenerate with: `python scripts/process_maggie_assets.py` (repo root).

| File | Size (px) | Source | Notes |
|------|-----------|--------|-------|
| `maggie-hero.png` | 782×939 | single sprite | full-body welcome pose, transparent |
| `maggie-idle.png` | 782×939 | single sprite | same standing pose, in-game name |
| `maggie-avatar.png` | 256×256 | single sprite | square head/torso crop, NEAREST-scaled |
| `maggie-wave.png` | 374×422 | grid top-right | transparent |
| `maggie-thinking.png` | 328×402 | grid bottom-left | transparent |
| `maggie-celebrate.png` | 365×402 | grid bottom-right | transparent |
| `maggie-spritesheet.png` | 1496×423 | grid | 4 frames (idle, wave, thinking, celebrate), 374×423 cells, bottom-aligned |

**Edges:** transparency is extracted by flood-filling the cream background from the
image border (the dark pixel outline encloses interior light pixels, so eyes /
mint shirt / blue ribbon are preserved). No blur, anti-alias, or smoothing was
applied; the only resize (avatar) uses nearest-neighbor.

Reference these via `apps/mobile/src/assets/maggieAssets.ts`.
