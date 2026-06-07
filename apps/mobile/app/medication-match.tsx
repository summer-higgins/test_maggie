/**
 * Medication Match — match each of Maggie's meds to the concern it supports.
 * Visible multiple-choice options (low memory load), gentle non-shaming feedback.
 */
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenScaffold from '../src/components/ScreenScaffold';
import InfoCard from '../src/components/InfoCard';
import PixelButton from '../src/components/PixelButton';
import MaggieGuideCard from '../src/components/MaggieGuideCard';
import { colors, radius, spacing, typography } from '../src/theme/maggieTheme';
import {
  medicationById,
  medicationMatchQuestions,
} from '../src/domain/maggieMockData';
import { useNav } from '../src/navigation/nav';

export default function MedicationMatchScreen() {
  const { navigate } = useNav();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const q = medicationMatchQuestions[index];
  const med = medicationById(q.medicationId);
  const answered = selected !== null;
  const isCorrect = selected === q.correctOptionId;
  const isLast = index === medicationMatchQuestions.length - 1;

  const choose = (optionId: string) => {
    if (answered) return;
    setSelected(optionId);
    if (optionId === q.correctOptionId) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    if (isLast) {
      navigate('symptom-check', {
        medCorrect: correctCount,
        medTotal: medicationMatchQuestions.length,
      });
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  };

  const correctLabel = q.options.find((o) => o.id === q.correctOptionId)?.label ?? '';

  return (
    <ScreenScaffold
      title="Medication Match"
      showBack
      footer={
        answered ? (
          <PixelButton label={isLast ? 'Next mini-game ›' : 'Next ›'} onPress={next} />
        ) : (
          <Text style={styles.hint}>Tap the answer you think Maggie would pick.</Text>
        )
      }
    >
      <Text style={styles.progress}>
        Question {index + 1} of {medicationMatchQuestions.length}
      </Text>

      <MaggieGuideCard
        pose={answered ? (isCorrect ? 'celebrate' : 'thinking') : 'idle'}
        message={`Let’s match ${med?.name ?? 'this med'} to the right reason.`}
      />

      <InfoCard accent={colors.clay}>
        <Text style={typography.heading}>{q.prompt}</Text>
      </InfoCard>

      <View style={{ gap: spacing.sm }}>
        {q.options.map((o) => {
          const chosen = selected === o.id;
          const showCorrect = answered && o.id === q.correctOptionId;
          const showWrong = answered && chosen && !isCorrect;
          return (
            <Pressable
              key={o.id}
              disabled={answered}
              onPress={() => choose(o.id)}
              accessibilityRole="button"
              accessibilityLabel={o.label}
              style={[
                styles.option,
                showCorrect && styles.optionCorrect,
                showWrong && styles.optionWrong,
              ]}
            >
              <Text style={styles.optionText}>{o.label}</Text>
              {showCorrect ? <Text style={styles.mark}>✓</Text> : null}
              {showWrong ? <Text style={styles.markWrong}>✕</Text> : null}
            </Pressable>
          );
        })}
      </View>

      {answered ? (
        <InfoCard accent={isCorrect ? colors.success : colors.warning}>
          {isCorrect ? (
            <Text style={typography.body}>{q.positive}</Text>
          ) : (
            <Text style={typography.body}>
              Good try! Maggie connects {med?.name} with “{correctLabel}.” You’ll remember it
              next time. 💛
            </Text>
          )}
        </InfoCard>
      ) : null}
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  progress: {
    ...typography.small,
    fontWeight: '700',
  },
  hint: {
    ...typography.small,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  optionCorrect: {
    backgroundColor: '#e7f3df',
    borderColor: colors.success,
  },
  optionWrong: {
    backgroundColor: '#fdeede',
    borderColor: colors.warning,
  },
  optionText: {
    ...typography.subheading,
    flex: 1,
  },
  mark: {
    color: colors.success,
    fontSize: 20,
    fontWeight: '900',
  },
  markWrong: {
    color: colors.warning,
    fontSize: 20,
    fontWeight: '900',
  },
});
