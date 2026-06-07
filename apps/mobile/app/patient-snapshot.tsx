/**
 * Mock Patient Snapshot — Maggie's synthetic conditions, devices, medications,
 * and a clearly-framed "Maggie believes" note. Then: Start Practice.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenScaffold from '../src/components/ScreenScaffold';
import InfoCard from '../src/components/InfoCard';
import PixelButton from '../src/components/PixelButton';
import MaggieGuideCard from '../src/components/MaggieGuideCard';
import { colors, radius, spacing, typography } from '../src/theme/maggieTheme';
import {
  beliefs,
  conditions,
  devices,
  medications,
} from '../src/domain/maggieMockData';
import { useNav } from '../src/navigation/nav';

function Pill({ text, tone = 'record' }: { text: string; tone?: 'record' | 'belief' }) {
  return (
    <View style={[styles.pill, tone === 'belief' && styles.pillBelief]}>
      <Text style={[styles.pillText, tone === 'belief' && styles.pillBeliefText]}>
        {text}
      </Text>
    </View>
  );
}

export default function PatientSnapshotScreen() {
  const { navigate } = useNav();

  return (
    <ScreenScaffold
      title="Maggie’s Snapshot"
      showBack
      footer={
        <PixelButton
          label="Start Practice ›"
          onPress={() => navigate('medication-match')}
          accessibilityHint="Begins the Medication Match mini-game"
        />
      }
    >
      <MaggieGuideCard
        pose="idle"
        message="Here’s my (pretend!) health snapshot. Everything here is made up for the demo."
      />

      <InfoCard title="Conditions" accent={colors.clay}>
        <View style={styles.wrap}>
          {conditions.map((c) => (
            <Pill key={c.id} text={c.note ? `${c.label} · ${c.note}` : c.label} />
          ))}
        </View>
      </InfoCard>

      <InfoCard title="Devices" accent={colors.accentTeal}>
        {devices.map((d) => (
          <View key={d.id} style={styles.row}>
            <Text style={styles.rowTitle}>{d.label}</Text>
            <Text style={typography.small}>{d.kind}</Text>
          </View>
        ))}
      </InfoCard>

      <InfoCard title="Medications & supplements" accent={colors.success}>
        {medications.map((m) => (
          <View key={m.id} style={styles.row}>
            <View style={styles.rowHead}>
              <Text style={styles.rowTitle}>{m.name}</Text>
              {m.confidence === 'maggie-believes' ? (
                <Pill text="Maggie believes" tone="belief" />
              ) : null}
            </View>
            <Text style={typography.small}>{m.generalUse}</Text>
          </View>
        ))}
      </InfoCard>

      {beliefs.map((b) => (
        <InfoCard key={b.id} title="A note from Maggie" accent={colors.warning}>
          <Text style={typography.body}>{b.maggieBelieves}</Text>
          <Text style={[typography.small, styles.checkWith]}>{b.checkWith}</Text>
        </InfoCard>
      ))}
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  pill: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingVertical: 6,
    paddingHorizontal: spacing.sm,
  },
  pillText: {
    ...typography.small,
    color: colors.text,
    fontWeight: '700',
  },
  pillBelief: {
    backgroundColor: '#fdeede',
    borderColor: colors.warning,
  },
  pillBeliefText: {
    color: colors.warning,
  },
  row: {
    gap: 2,
    paddingVertical: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceAlt,
  },
  rowHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  rowTitle: {
    ...typography.subheading,
  },
  checkWith: {
    fontStyle: 'italic',
  },
});
