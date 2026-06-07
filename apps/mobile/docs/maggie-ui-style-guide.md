# MAGGIE — UI Style Guide

Visual direction: **cozy science notebook + friendly health quest + body-system
card game.** Warm, calm, encouraging, low-clutter, large tap targets, visible
options instead of memory-heavy UI.

## Maggie character

Maggie is an **original** cozy pine-marten-inspired pixel-art guide: warm brown
fur, simple pixel eyes, teal/green jacket, light mint shirt, diagonal satchel
strap, and a small satchel with a **blue Type 1 diabetes awareness ribbon**. Keep
her original — do not copy any copyrighted character style.

### Poses

| Pose | Use |
|------|-----|
| `hero` | Home welcome (large) |
| `idle` | Default guide/narrator |
| `avatar` | Small circular/square contexts |
| `wave` | Greeting (derived) |
| `thinking` | After a miss / reflection |
| `celebrate` | Correct answer / summary |

## Palette

| Token | Hex | Role |
|-------|-----|------|
| background | `#b7f2ea` | app background (pale mint) |
| surface | `#fff7e8` | cards (warm cream) |
| text | `#1f1615` | dark espresso text |
| primary | `#234f3f` | deep green buttons |
| accentTeal | `#51b5a6` | accents / selection |
| clay | `#c17145` | warmth / section accents |
| border | `#6e3c3b` | chunky card/button borders |
| warning | `#a15345` | caution / "review" states |
| success | `#578e49` | correct / positive states |
| ribbonBlue | `#2f7fe5` | T1D awareness ribbon |

Full source palette also includes `#7bdfd9`, `#df9867`, `#7ea953`. All tokens live
in [`src/theme/maggieTheme.ts`](../src/theme/maggieTheme.ts) — **read from there;
never hardcode hex in screens.**

## Components

- **`ScreenScaffold`** — mint background, safe-area, persistent `DemoBadge`,
  optional back + title, scroll area, optional sticky footer (primary action).
- **`PixelButton`** — chunky 3px-border button; `primary` / `secondary` / `ghost`;
  min height 56; press = 2px nudge + flat shadow.
- **`InfoCard`** — rounded cream card with chunky border + optional left accent stripe.
- **`MaggieGuideCard`** — Maggie sprite + speech (name + message).
- **`MaggieSprite`** — static PNG by pose, aspect-correct, with a safe placeholder
  fallback if the image fails to load.
- **`DemoBadge`** — always-visible "sandbox / synthetic / not medical advice" pill.

## Layout rules

- Rounded cards (`radius.lg` = 20), chunky borders (3px, `colors.border`).
- Generous spacing scale: 4 / 8 / 16 / 24 / 32.
- Tap targets ≥ 56dp; quiz options and symptom cards are full-width / ~half-width.
- Minimal clutter: one primary action per screen, pinned in the footer.
- Prefer **visible choices** (multiple-choice, selectable cards) over recall typing.

## Tone & safety copy

- Encouraging, non-shaming feedback ("Good try!", "Close!", 💛).
- Frame everything as **a game / educational practice**, never medical advice.
- Distinguish **sandbox record** vs **"Maggie believes…"** (personal belief →
  "ask your care team or an approved source").
- The summary describes **game activity only** — no diagnosis, treatment, dosing,
  or care-team messaging.

## Pixel-art handling

- Source art and provenance: [`assets/maggie/README.md`](../assets/maggie/README.md).
- **Preserve hard edges.** Never blur, anti-alias, airbrush, or smooth.
- Render with matched aspect ratio + `resizeMode="contain"`; resize only by
  nearest-neighbor (the asset pipeline already does this for the avatar).
- Transparent backgrounds are extracted via border flood-fill so Maggie composites
  cleanly over the mint background.

## Asset usage (React Native)

```tsx
import MaggieSprite from '../src/components/MaggieSprite';
// preferred — safe fallback built in
<MaggieSprite pose="hero" width={170} />

// or reference the raw source directly
import { maggieAssets } from '../src/assets/maggieAssets';
import { Image } from 'react-native';
<Image source={maggieAssets.celebrate} style={{ width: 120, height: 135 }} />
```
