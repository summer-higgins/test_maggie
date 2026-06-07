/**
 * App root for MAGGIE Demo 1.
 *
 * Hosts a tiny in-app stack navigator (src/navigation/nav) and renders the
 * current screen from app/. This keeps Demo 1 dependency-free while Epic auth is
 * pending. When Expo Router is adopted later, the entry point can switch to
 * `expo-router/entry` and this file can be removed (screens already live in app/
 * with default exports).
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavProvider, ScreenName, useNav } from './src/navigation/nav';
import { colors } from './src/theme/maggieTheme';

import HomeScreen from './app/index';
import PatientSnapshotScreen from './app/patient-snapshot';
import MedicationMatchScreen from './app/medication-match';
import SymptomCheckScreen from './app/symptom-check';
import SessionSummaryScreen from './app/session-summary';

const screens: Record<ScreenName, React.ComponentType> = {
  home: HomeScreen,
  'patient-snapshot': PatientSnapshotScreen,
  'medication-match': MedicationMatchScreen,
  'symptom-check': SymptomCheckScreen,
  'session-summary': SessionSummaryScreen,
};

function Router() {
  const { screen } = useNav();
  const Active = screens[screen];
  // `key` remounts the screen on navigation so per-screen local state (quiz
  // progress, selections) resets cleanly between visits.
  return <Active key={screen} />;
}

export default function App() {
  return (
    <View style={styles.root}>
      <NavProvider>
        <Router />
      </NavProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
