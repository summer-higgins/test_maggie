/**
 * Home / Welcome — meet Maggie + sandbox-only disclaimer, then Start.
 * (Default export so it also fits the Expo Router file convention later.)
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenScaffold from '../src/components/ScreenScaffold';
import InfoCard from '../src/components/InfoCard';
import PixelButton from '../src/components/PixelButton';
import MaggieSprite from '../src/components/MaggieSprite';
import { colors, spacing, typography } from '../src/theme/maggieTheme';
import { DISCLAIMER_LONG, maggieProfile } from '../src/domain/maggieMockData';
import { useNav } from '../src/navigation/nav';

export default function HomeScreen() {
  const { navigate } = useNav();

  return (
    <ScreenScaffold
      footer={
        <PixelButton
          label="Meet Maggie ›"
          onPress={() => navigate('patient-snapshot')}
          accessibilityHint="Opens Maggie's synthetic health snapshot"
        />
      }
    >
      <View style={styles.hero}>
        <MaggieSprite pose="hero" width={170} accessibilityLabel="Maggie waving hello" />
        <Text style={styles.brand}>MAGGIE</Text>
        <Text style={styles.tagline}>A cozy health-quest learning game</Text>
      </View>

      <InfoCard accent={colors.accentTeal}>
        <Text style={typography.heading}>Hi, I’m Maggie!</Text>
        <Text style={typography.body}>
          I’m a {maggieProfile.ageRange} ({maggieProfile.pronouns}) who loves turning my
          health notes into little games. I’m {maggieProfile.personality.join(', ')} — and I
          learn best with pictures, hands-on practice, and short explanations.
        </Text>
      </InfoCard>

      <InfoCard accent={colors.warning} title="Before we play">
        <Text style={typography.body}>{DISCLAIMER_LONG}</Text>
      </InfoCard>

      <Text style={styles.fineprint}>
        Demo 1 · frontend mock flow · Epic sign-in coming later
      </Text>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingTop: spacing.sm,
  },
  brand: {
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: 2,
    color: colors.primary,
  },
  tagline: {
    ...typography.small,
    fontSize: 14,
  },
  fineprint: {
    ...typography.small,
    textAlign: 'center',
  },
});
