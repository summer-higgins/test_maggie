/**
 * Shared screen wrapper: mint background, safe-area top padding, a persistent
 * DemoBadge, an optional back button + title, and a scrollable content area.
 * Dependency-free (uses RN's built-in SafeAreaView — no extra packages).
 */
import React from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, spacing, typography } from '../theme/maggieTheme';
import DemoBadge from './DemoBadge';
import { useNav } from '../navigation/nav';

interface Props {
  title?: string;
  showBack?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function ScreenScaffold({ title, showBack, children, footer }: Props) {
  const { goBack, canGoBack } = useNav();
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.topRow}>
        {showBack && canGoBack ? (
          <Pressable
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={12}
            style={styles.back}
          >
            <Text style={styles.backText}>‹ Back</Text>
          </Pressable>
        ) : (
          <View style={styles.back} />
        )}
        <DemoBadge compact />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {children}
      </ScrollView>

      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  back: {
    minWidth: 64,
    minHeight: 32,
    justifyContent: 'center',
  },
  backText: {
    ...typography.subheading,
    color: colors.primary,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  footer: {
    padding: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 2,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.sm,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.xs,
  },
});
