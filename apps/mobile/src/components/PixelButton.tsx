/**
 * Chunky pixel-game button with large tap targets.
 * Variants: primary (deep green), secondary (teal), ghost (outline).
 */
import React from 'react';
import {
  AccessibilityRole,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { colors, radius, shadow, spacing, typography } from '../theme/maggieTheme';

type Variant = 'primary' | 'secondary' | 'ghost';

interface Props {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityHint?: string;
}

const bg: Record<Variant, string> = {
  primary: colors.primary,
  secondary: colors.accentTeal,
  ghost: 'transparent',
};

const fg: Record<Variant, string> = {
  primary: colors.primaryText,
  secondary: colors.text,
  ghost: colors.primary,
};

export default function PixelButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  accessibilityHint,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole={'button' as AccessibilityRole}
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: bg[variant] },
        variant === 'ghost' && styles.ghost,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style as ViewStyle,
      ]}
    >
      <View pointerEvents="none">
        <Text style={[styles.label, { color: fg[variant] }]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 3,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
  ghost: {
    borderColor: colors.primary,
  },
  pressed: {
    transform: [{ translateY: 2 }],
    shadowOpacity: 0,
    elevation: 0,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    ...typography.button,
    textAlign: 'center',
  },
});
