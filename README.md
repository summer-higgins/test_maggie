# MAGGIE

**Medical Application Game-Generator for Intelligence Evaluation**

Wayne State University — CSC4996 Senior Capstone (Spring/Summer 2026)

MAGGIE is a mobile learning app that turns **simulated Epic FHIR sandbox** medication data into personalized quiz games with adaptive remediation. It uses **no real patient information** and does not provide medical advice.

## Team documentation

**Start here:** [`docs/README.md`](./docs/README.md)

| Doc | Description |
|-----|-------------|
| [docs/architecture.md](./docs/architecture.md) | System design and data flow |
| [docs/prototype-phases.md](./docs/prototype-phases.md) | Milestones and ownership |
| [docs/data-model.md](./docs/data-model.md) | Supabase schema |
| [docs/security-and-scope.md](./docs/security-and-scope.md) | PHI rules and out-of-scope |

## Development plan

[`MAGGIE_FINAL Development_Plan.pdf`](./MAGGIE_FINAL%20Development_Plan.pdf)

## Mobile app setup

The client is **Expo + React Native + TypeScript** in [`apps/mobile`](./apps/mobile).

1. Install [Bun](https://bun.sh) and [Expo Go](https://expo.dev/go) (or use iOS/Android simulators).
2. Copy environment variables:

   ```bash
   cp .env.example apps/mobile/.env
   ```

   Edit `apps/mobile/.env` using [docs/environment-setup.md](./docs/environment-setup.md).

3. Run the app:

   ```bash
   cd apps/mobile
   bun install
   bun run start
   ```

4. Open the project in Expo Go from the QR code in the terminal.

See [apps/mobile/README.md](./apps/mobile/README.md) for platform-specific commands.

## Status

Prototype 1 in progress — Epic OAuth, FHIR demo screen, and Supabase session storage. See [docs/prototype-phases.md](./docs/prototype-phases.md).
