import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};

function envConfigured(): boolean {
  return Boolean(extra.supabaseUrl && extra.supabaseAnonKey);
}

export default function App() {
  const ready = envConfigured();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MAGGIE</Text>
      <Text style={styles.subtitle}>
        Medical Application Game-Generator for Intelligence Evaluation
      </Text>
      <Text style={styles.disclaimer}>
        Simulated Epic sandbox data only. Not for real patients. Not medical
        advice.
      </Text>
      <View style={styles.status}>
        <Text style={styles.statusLabel}>Environment</Text>
        <Text style={ready ? styles.statusOk : styles.statusWarn}>
          {ready
            ? 'Supabase variables loaded'
            : 'Copy .env.example to .env and set EXPO_PUBLIC_* values'}
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 20,
  },
  disclaimer: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 32,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
  },
  status: {
    gap: 6,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#64748b',
  },
  statusOk: {
    fontSize: 15,
    color: '#15803d',
  },
  statusWarn: {
    fontSize: 15,
    color: '#b45309',
    lineHeight: 22,
  },
});
