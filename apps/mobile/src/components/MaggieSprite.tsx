/**
 * Renders a Maggie pose as a static PNG, preserving the asset's pixel aspect
 * ratio. If the image fails to load at runtime, it falls back to a safe,
 * dependency-free placeholder (a clay disc with an "M") so screens never break.
 */
import React, { useState } from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { maggieAssets, maggieAspect, MaggiePose } from '../assets/maggieAssets';
import { colors, radius } from '../theme/maggieTheme';

interface Props {
  pose?: MaggiePose;
  /** Rendered width in dp; height is derived from the asset aspect ratio. */
  width: number;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

export default function MaggieSprite({
  pose = 'idle',
  width,
  style,
  accessibilityLabel,
}: Props) {
  const [failed, setFailed] = useState(false);
  const height = Math.round(width / maggieAspect(pose));
  const label = accessibilityLabel ?? `Maggie ${pose} pose`;

  if (failed) {
    return (
      <View
        accessibilityLabel={`${label} (placeholder)`}
        style={[
          styles.placeholder,
          { width, height: width, borderRadius: width / 2 },
          style,
        ]}
      >
        <Text style={[styles.placeholderText, { fontSize: width * 0.5 }]}>M</Text>
      </View>
    );
  }

  return (
    <Image
      accessibilityLabel={label}
      source={maggieAssets[pose]}
      onError={() => setFailed(true)}
      resizeMode="contain"
      // `contain` + matched aspect ratio keeps hard pixel edges (no smoothing
      // from non-uniform scaling).
      style={[{ width, height }, style] as StyleProp<ImageStyle>}
    />
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: colors.clay,
    borderWidth: 3,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
  },
  placeholderText: {
    color: colors.surface,
    fontWeight: '800',
  },
});
