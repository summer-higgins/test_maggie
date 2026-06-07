/**
 * Session Summary — a gameplay-only recap (what was practiced, what to revisit).
 * No clinical interpretation, no advice; mirrors the future "physician summary
 * from gameplay tables only" idea, but entirely from this session's mock state.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenScaffold from '../src/components/ScreenScaffold';
import InfoCard from '../src/components/InfoCard';
import PixelButton from '../src/components/PixelButton';
import MaggieGuideCard from '../src/components/MaggieGuideCard';
import { colors, radius, spacing, typography } from '../src/theme/maggieTheme';
import { DISCLAIMER_SHORT } from '../src/domain/maggieMockData';
import { useNav } from '../src/navigation/nav';

function ScoreRow({ label, value, good }: { label: string; value: string; good: boolean }) {
  return (
    <View style={styles.scoreRow}>
      <Text style={styles.scoreLabel}>{label}</Text>
      <View style={[styles.scoreChip, good ? styles.chipGood : styles.chipReview]}>
        <Text style={[styles.scoreValue, good ? styles.valueGood : styles.valueReview]}>
          {value}
        </Text>
      </View>
    </View>
  );
}

export default function SessionSummaryScreen() {
  const { params, reset } = useNav();
  const medCorrect = (params.medCorrect as number) ?? 0;
  const medTotal = (params.medTotal as number) ?? 0;
  const symptomCorrect = Boolean(params.symptomCorrect);

  const medAllRight = medTotal > 0 && medCorrect === medTotal;
  const revisit: string[] = [];
  if (!medAllRight) revisit.push('Medication Match — what each med supports');
  if (!symptomCorrect) revisit.push('Telling low vs. high blood sugar signs apart');

  return (
    <ScreenScaffold
      title="Session Summary"
      showBack
      footer={
        <PixelButton
          label="Play again from start"
          onPress={() => reset('home')}
          accessibilityHint="Returns to the welcome screen"
        />
      }
    >
      <MaggieGuideCard
        pose="celebrate"
        message="Great session! Here’s what we practiced together today."
      />

      <InfoCard title="Today’s practice" accent={colors.accentTeal}>
        <ScoreRow
          label="Medication Match"
          value={`${medCorrect} / ${medTotal}`}
          good={medAllRight}
        />
        <ScoreRow
          label="Symptom Check"
          value={symptomCorrect ? 'Matched' : 'Reviewed'}
          good={symptomCorrect}
        />
      </InfoCard>

      <InfoCard title="What to revisit next time" accent={colors.clay}>
        {revisit.length === 0 ? (
          <Text style={typography.body}>
            You matched everything today — nice recall! Come back to keep it fresh. 🌱
          </Text>
        ) : (
          revisit.map((r) => (
            <Text key={r} style={styles.bullet}>
              • {r}
            </Text>
          ))
        )}
      </InfoCard>

      <InfoCard title="What this recap is" accent={colors.success}>
        <Text style={typography.body}>
          This is a summary of game activity only — the concepts Maggie practiced and the
          ones to revisit. It’s not a diagnosis, treatment, or message to a care team.
        </Text>
      </InfoCard>

      <Text style={styles.disclaimer}>{DISCLAIMER_SHORT}</Text>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  scoreLabel: {
    ...typography.subheading,
  },
  scoreChip: {
    paddingVertical: 4,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 2,
  },
  chipGood: {
    backgroundColor: '#e7f3df',
    borderColor: colors.success,
  },
  chipReview: {
    backgroundColor: '#fdeede',
    borderColor: colors.warning,
  },
  scoreValue: {
    ...typography.subheading,
  },
  valueGood: {
    color: colors.success,
  },
  valueReview: {
    color: colors.warning,
  },
  bullet: {
    ...typography.body,
    marginVertical: 2,
  },
  disclaimer: {
    ...typography.small,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
