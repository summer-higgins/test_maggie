/**
 * Maggie's "speech" guide card: her sprite next to an encouraging message.
 * Used as the friendly narrator across the demo flow.
 */
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { cardBorder, colors, shadow, spacing, typography } from '../theme/maggieTheme';
import { MaggiePose } from '../assets/maggieAssets';
import MaggieSprite from './MaggieSprite';

interface Props {
  message: string;
  pose?: MaggiePose;
  /** Title shown above the message, e.g. "Maggie". */
  name?: string;
  spriteWidth?: number;
  style?: ViewStyle;
}

export default function MaggieGuideCard({
  message,
  pose = 'idle',
  name = 'Maggie',
  spriteWidth = 84,
  style,
}: Props) {
  return (
    <View style={[styles.card, style]}>
      <MaggieSprite pose={pose} width={spriteWidth} />
      <View style={styles.bubble}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    ...cardBorder,
    ...shadow,
  },
  bubble: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    ...typography.subheading,
    color: colors.primary,
  },
  message: {
    ...typography.body,
  },
});
