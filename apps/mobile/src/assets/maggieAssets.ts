/**
 * MAGGIE character asset registry.
 *
 * All PNGs are transparent-background, hard-edged pixel art derived from the two
 * source images under apps/mobile/assets/ (see scripts/process_maggie_assets.py
 * and docs/maggie-ui-style-guide.md for provenance + dimensions).
 *
 * React Native bundles images referenced by static `require(...)` at build time,
 * so these must stay as literal requires (no dynamic paths).
 *
 * Usage:
 *   import { maggieAssets } from '../assets/maggieAssets';
 *   <Image source={maggieAssets.hero} />
 *
 * Prefer the <MaggieSprite /> component, which falls back to a safe placeholder
 * if an asset is ever missing at runtime.
 */
import type { ImageSourcePropType } from 'react-native';

export type MaggiePose =
  | 'hero'
  | 'idle'
  | 'avatar'
  | 'wave'
  | 'thinking'
  | 'celebrate';

export const maggieAssets: Record<MaggiePose, ImageSourcePropType> = {
  hero: require('../../assets/maggie/maggie-hero.png'),
  idle: require('../../assets/maggie/maggie-idle.png'),
  avatar: require('../../assets/maggie/maggie-avatar.png'),
  wave: require('../../assets/maggie/maggie-wave.png'),
  thinking: require('../../assets/maggie/maggie-thinking.png'),
  celebrate: require('../../assets/maggie/maggie-celebrate.png'),
};

/** Combined sprite strip (idle, wave, thinking, celebrate) for future animation. */
export const maggieSpritesheet: ImageSourcePropType = require('../../assets/maggie/maggie-spritesheet.png');

/**
 * Intrinsic pixel dimensions of each asset (width / height), so callers can keep
 * the correct aspect ratio without anti-aliasing. Update if assets are regenerated.
 */
export const maggieAssetSize: Record<MaggiePose, { w: number; h: number }> = {
  hero: { w: 782, h: 939 },
  idle: { w: 782, h: 939 },
  avatar: { w: 256, h: 256 },
  wave: { w: 374, h: 422 },
  thinking: { w: 328, h: 402 },
  celebrate: { w: 365, h: 402 },
};

export const spritesheetMeta = {
  frames: ['idle', 'wave', 'thinking', 'celebrate'] as const,
  cell: { w: 374, h: 423 },
  totalSize: { w: 1496, h: 423 },
};

export const maggieAspect = (pose: MaggiePose): number => {
  const s = maggieAssetSize[pose];
  return s.w / s.h;
};
