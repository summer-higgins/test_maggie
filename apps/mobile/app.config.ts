import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'MAGGIE',
  slug: 'maggie',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  scheme: 'maggie',
  ios: {
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false
    },
    supportsTablet: true,
    bundleIdentifier: 'edu.waynestate.maggie',
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
    package: 'edu.waynestate.maggie',
    predictiveBackGestureEnabled: false,
  },
  extra: {
    eas: {
      projectId: 'da1b9fca-6684-4b74-9863-3c2f24326338',
    },
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    epicClientId: process.env.EXPO_PUBLIC_EPIC_CLIENT_ID,
    epicRedirectUri: process.env.EXPO_PUBLIC_EPIC_REDIRECT_URI,
    epicFhirBaseUrl: process.env.EXPO_PUBLIC_EPIC_FHIR_BASE_URL,
  },
};

export default config;
