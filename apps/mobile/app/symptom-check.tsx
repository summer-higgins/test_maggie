/**
 * Symptom Check — multi-select: "Which symptoms does Maggie associate with LOW
 * blood sugar?" A wrong answer reveals a gentle split-card (high vs low signs)
 * instead of a buzzer. Tone is encouraging and non-shaming throughout.
 */
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenScaffold from '../src/components/ScreenScaffold';
import InfoCard from '../src/components/InfoCard';
import PixelButton from '../src/components/PixelButton';
import MaggieGuideCard from '../src/components/MaggieGuideCard';
import { colors, radius, spacing, typography } from '../src/theme/maggieTheme';
import {
  symptomById,
  symptomCheckQuestion,
  symptomRemediation,
} from '../src/domain/maggieMockData';
import { useNav } from '../src/navigation/nav';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SymptomCheckScreen() {
  const { navigate, params } = useNav();
  const medCorrect = (params.medCorrect as number) ?? 0;
  const medTotal = (params.medTotal as number) ?? 0;

  const order = useMemo(() => shuffle(symptomCheckQuestion.choiceIds), []);
  const correctSet = useMemo(
    () => new Set(symptomCheckQuestion.correctIds),
    []
  );

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState(false);

  const toggle = (id: string) => {
    if (checked) return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const isCorrect =
    checked &&
    selected.size === correctSet.size &&
    [...selected].every((id) => correctSet.has(id));

  const finish = () => {
    navigate('session-summary', {
      medCorrect,
      medTotal,
      symptomCorrect: isCorrect,
    });
  };

  return (
    <ScreenScaffold
      title="Symptom Check"
      showBack
      footer={
        !checked ? (
          <PixelButton
            label="Check answer"
            onPress={() => setChecked(true)}
            disabled={selected.size === 0}
            accessibilityHint="Reveals whether your symptom picks match Maggie's"
          />
        ) : (
          <PixelButton label="See my summary ›" onPress={finish} />
        )
      }
    >
      <MaggieGuideCard
        pose={checked ? (isCorrect ? 'celebrate' : 'thinking') : 'idle'}
        message={
          checked
            ? isCorrect
              ? 'You nailed my low-blood-sugar cues!'
              : 'Close! Let’s line them up side by side.'
            : 'Pick all the ones that fit. You can choose more than one.'
        }
      />

      <InfoCard accent={colors.clay}>
        <Text style={typography.heading}>{symptomCheckQuestion.prompt}</Text>
        <Text style={typography.small}>Select all that apply.</Text>
      </InfoCard>

      <View style={styles.grid}>
        {order.map((id) => {
          const card = symptomById(id);
          if (!card) return null;
          const isSel = selected.has(id);
          const isAns = correctSet.has(id);
          const showRight = checked && isAns;
          const showMiss = checked && isSel && !isAns;
          return (
            <Pressable
              key={id}
              onPress={() => toggle(id)}
              disabled={checked}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: isSel }}
              accessibilityLabel={card.label}
              style={[
                styles.card,
                isSel && styles.cardSel,
                showRight && styles.cardRight,
                showMiss && styles.cardMiss,
              ]}
            >
              <Text style={styles.cardText}>{card.label}</Text>
            </Pressable>
          );
        })}
      </View>

      {checked && !isCorrect ? (
        <InfoCard accent={colors.accentTeal} title={symptomRemediation.title}>
          <Text style={typography.body}>{symptomRemediation.encouragement}</Text>
          <View style={styles.splitRow}>
            <View style={[styles.splitCol, styles.splitHigh]}>
              <Text style={styles.splitHeading}>{symptomRemediation.high.heading}</Text>
              {symptomRemediation.high.cardIds.map((cid) => (
                <Text key={cid} style={styles.splitItem}>
                  • {symptomById(cid)?.label}
                </Text>
              ))}
            </View>
            <View style={[styles.splitCol, styles.splitLow]}>
              <Text style={styles.splitHeading}>{symptomRemediation.low.heading}</Text>
              {symptomRemediation.low.cardIds.map((cid) => (
                <Text key={cid} style={styles.splitItem}>
                  • {symptomById(cid)?.label}
                </Text>
              ))}
            </View>
          </View>
          <Text style={[typography.small, styles.closing]}>
            {symptomRemediation.closing}
          </Text>
        </InfoCard>
      ) : null}

      {checked && isCorrect ? (
        <InfoCard accent={colors.success}>
          <Text style={typography.body}>
            Maggie’s low-blood-sugar cues are shakiness, weakness, sweating, and
            disorientation. Great memory recall! 🎉
          </Text>
        </InfoCard>
      ) : null}
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  card: {
    minWidth: '47%',
    flexGrow: 1,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  cardSel: {
    backgroundColor: colors.mint,
    borderColor: colors.accentTeal,
  },
  cardRight: {
    backgroundColor: '#e7f3df',
    borderColor: colors.success,
  },
  cardMiss: {
    backgroundColor: '#fdeede',
    borderColor: colors.warning,
  },
  cardText: {
    ...typography.subheading,
    textAlign: 'center',
  },
  splitRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  splitCol: {
    flex: 1,
    padding: spacing.sm,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    gap: 4,
  },
  splitHigh: {
    backgroundColor: '#fdeede',
  },
  splitLow: {
    backgroundColor: '#e7f3df',
  },
  splitHeading: {
    ...typography.small,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 2,
  },
  splitItem: {
    ...typography.small,
    color: colors.text,
  },
  closing: {
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
});
