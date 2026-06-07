# MAGGIE Mobile (Expo)

React Native + Expo + TypeScript client for MAGGIE.

## Prerequisites

- [Bun](https://bun.sh)
- [Expo Go](https://expo.dev/go) on a physical device, or Xcode / Android Studio for simulators

## Setup

1. From the repo root, copy environment variables:

   ```bash
   cp .env.example apps/mobile/.env
   ```

2. Fill in `EXPO_PUBLIC_*` values in `apps/mobile/.env` (see [docs/environment-setup.md](../../docs/environment-setup.md)).

3. Install dependencies and start the dev server:

   ```bash
   cd apps/mobile
   bun install
   bun run start
   ```

4. Scan the QR code with Expo Go (Android) or the Camera app (iOS).

### “Requires a newer version of Expo Go”

The App Store / Play Store build of Expo Go only supports up to **SDK 55**. A fresh `create-expo-app` may scaffold **SDK 56**, which is *newer* than store Expo Go — so “update Expo Go” will not fix it.

This project targets **SDK 55** for compatibility with store Expo Go. After pulling changes, restart the dev server:

```bash
cd apps/mobile
bun install
bun run start
```

If you need SDK 56 features later, use an [iOS Simulator with a matching Expo Go](https://expo.dev/go), Android install via CLI, or a [development build](https://docs.expo.dev/develop/development-builds/introduction/) (`expo-dev-client` is already included).

## Scripts

| Command | Description |
|---------|-------------|
| `bun run start` | Expo dev server (Expo Go) |
| `bun run ios` | Open iOS simulator |
| `bun run android` | Open Android emulator |

OAuth redirect scheme: `maggie://oauth/callback` (configured in `app.config.ts`).
