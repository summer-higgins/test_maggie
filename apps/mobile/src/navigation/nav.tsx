/**
 * Tiny zero-dependency stack navigator for Demo 1.
 *
 * Why not Expo Router? It is not installed, and adding it for Demo 1 would
 * require new packages plus an `app.config.ts` plugin entry — both explicitly
 * out of scope for this task. This context gives us the same screen + params +
 * back-stack ergonomics with no new dependencies.
 *
 * Migration path (future): replace `useNav()` calls with `useRouter()` /
 * `useLocalSearchParams()` from expo-router. Screen files already live under
 * `app/` with default exports, matching the Expo Router file convention.
 */
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type ScreenName =
  | 'home'
  | 'patient-snapshot'
  | 'medication-match'
  | 'symptom-check'
  | 'session-summary';

export type ScreenParams = Record<string, unknown>;

interface StackEntry {
  screen: ScreenName;
  params: ScreenParams;
}

interface NavApi {
  screen: ScreenName;
  params: ScreenParams;
  canGoBack: boolean;
  navigate: (screen: ScreenName, params?: ScreenParams) => void;
  goBack: () => void;
  reset: (screen?: ScreenName) => void;
}

const NavContext = createContext<NavApi | null>(null);

const HOME: StackEntry = { screen: 'home', params: {} };

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [stack, setStack] = useState<StackEntry[]>([HOME]);

  const navigate = useCallback((screen: ScreenName, params: ScreenParams = {}) => {
    setStack((s) => [...s, { screen, params }]);
  }, []);

  const goBack = useCallback(() => {
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }, []);

  const reset = useCallback((screen: ScreenName = 'home') => {
    setStack([{ screen, params: {} }]);
  }, []);

  const top = stack[stack.length - 1];

  const value = useMemo<NavApi>(
    () => ({
      screen: top.screen,
      params: top.params,
      canGoBack: stack.length > 1,
      navigate,
      goBack,
      reset,
    }),
    [top, stack.length, navigate, goBack, reset]
  );

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav(): NavApi {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error('useNav must be used within <NavProvider>');
  return ctx;
}
