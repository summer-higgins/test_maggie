# Repository Structure and Git Workflow

## Target monorepo layout

As implementation progresses, the repo should look like this:

```
MAGGIE/
├── apps/
│   └── mobile/              # Expo + TypeScript (primary app)
│       ├── app/             # Expo Router screens
│       ├── src/
│       │   ├── features/    # auth, quiz, summary, remediation
│       │   ├── services/    # epic, fhir, supabase
│       │   ├── domain/      # GameContext, scoring, mappers
│       │   └── components/
│       └── app.config.ts
├── supabase/
│   ├── migrations/
│   ├── functions/
│   │   ├── generate-quiz/
│   │   ├── generate-remediation/
│   │   ├── generate-summary/
│   │   └── epic-token/      # only if required by Epic app type
│   └── config.toml
├── packages/
│   └── shared/              # Zod schemas, types, prompt IDs (P2+)
├── docs/                    # team architecture (this folder)
├── .env.example
└── README.md
```

### Prototype 1 simplification

For the first sprint, a **single Expo app at repo root** is acceptable if it unblocks the team. Refactor into `apps/mobile` when Edge Functions and `packages/shared` land in Prototype 2.

---

## Branching (from development plan)

| Branch | Purpose |
|--------|---------|
| `main` | Always stable and demo-ready |
| `develop` | Integration branch for completed features |
| `feature/*` | One branch per feature or fix (e.g. `feature/epic-oauth`) |

**Rules:**

- All merges into `develop` or `main` require a **pull request** and **at least one teammate review**.
- Link PRs to GitHub Issues (`Closes #123`).
- Never commit secrets, tokens, or exports that could contain sensitive data.

---

## Code quality

- **TypeScript** everywhere in app and Edge Functions  
- **ESLint** + **Prettier** (add configs in first scaffold PR)  
- Environment variables for Supabase, Epic sandbox, and OpenRouter (functions only)

---

## Environment variables

Copy `.env.example` to `.env` locally. Never commit `.env`.

| Variable | Where used | In git? |
|----------|------------|---------|
| `EXPO_PUBLIC_SUPABASE_URL` | Mobile | Example only |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Mobile | Example only |
| `EXPO_PUBLIC_EPIC_CLIENT_ID` | Mobile | Example only |
| `EXPO_PUBLIC_EPIC_REDIRECT_URI` | Mobile | Example only |
| `EXPO_PUBLIC_EPIC_FHIR_BASE_URL` | Mobile | Example only (sandbox URL) |
| `OPENROUTER_API_KEY` | Edge Functions only | **Never** |
| `EPIC_CLIENT_SECRET` | Edge Function only (if confidential app) | **Never** |

---

## Task tracking

- **GitHub Issues** — backlog and assignments  
- **GitHub Projects** — board columns: Backlog → In Progress → Review → Done  
- **Meeting notes** — shared OneDrive; link major decisions in Issues or [decisions.md](./decisions.md)
