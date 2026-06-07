/**
 * Always-visible safety badge marking the app as a synthetic sandbox demo.
 * Placed on every screen so no screenshot can be mistaken for real patient data.
 */
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../theme/maggieTheme';

interface Props {
  style?: ViewStyle;
  compact?: boolean;
}

export default function DemoBadge({ style, compact = false }: Props) {
  return (
    <View
      accessibilityLabel="Sandbox demo. Synthetic data only."
      style={[styles.badge, style]}
    >
      <Text style={styles.dot}>●</Text>
      <Text style={styles.text}>
        {compact ? 'SANDBOX DEMO' : 'SANDBOX DEMO · SYNTHETIC DATA · NOT MEDICAL ADVICE'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
    paddingVertical: 5,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.warning,
    backgroundColor: '#fdeede',
  },
  dot: {
    color: colors.warning,
    fontSize: 9,
  },
  text: {
    color: colors.warning,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
});
