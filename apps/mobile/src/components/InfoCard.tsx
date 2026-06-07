/**
 * Rounded, chunky-bordered surface card used to group content on every screen.
 * Optional title row and an optional accent color stripe on the left edge.
 */
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { cardBorder, colors, shadow, spacing, typography } from '../theme/maggieTheme';

interface Props {
  title?: string;
  subtitle?: string;
  accent?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export default function InfoCard({ title, subtitle, accent, children, style }: Props) {
  return (
    <View style={[styles.card, style]}>
      {accent ? <View style={[styles.accent, { backgroundColor: accent }]} /> : null}
      <View style={styles.body}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    ...cardBorder,
    ...shadow,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  accent: {
    width: 8,
  },
  body: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.sm,
  },
  title: {
    ...typography.heading,
  },
  subtitle: {
    ...typography.small,
    marginTop: -spacing.xs,
  },
});
