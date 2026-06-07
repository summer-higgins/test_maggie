# MAGGIE — Team Documentation

**MAGGIE** (Medical Application Game-Generator for Intelligence Evaluation) is a Wayne State CSC4996 capstone project (Spring/Summer 2026). This folder is the shared technical reference for implementation.

## Start here

| Document | Who should read it |
|----------|-------------------|
| [architecture.md](./architecture.md) | Everyone — system overview, data flow, tech stack |
| [repository-structure.md](./repository-structure.md) | Everyone — repo layout, branches, PR workflow |
| [data-model.md](./data-model.md) | Backend / data (Malek) — Supabase schema and RLS |
| [prototype-phases.md](./prototype-phases.md) | Everyone — milestones, deliverables, ownership |
| [security-and-scope.md](./security-and-scope.md) | Everyone — PHI rules, secrets, out-of-scope list |
| [decisions.md](./decisions.md) | Team lead / integrators — locked architecture choices |
| [open-questions.md](./open-questions.md) | Client/GTA meetings — items to confirm |
| [environment-setup.md](./environment-setup.md) | Env vars and secrets (no committed `.env`) |

## Official project plan

The course development plan lives at the repo root:

- [`MAGGIE_FINAL Development_Plan.pdf`](../MAGGIE_FINAL%20Development_Plan.pdf)

Architecture docs here **implement** that plan; if something conflicts, discuss with the team and client before changing code.

## Quick reference

- **Client:** Dr. Stephen Farrow  
- **GTA:** Yermakhan Magzym  
- **Instructor:** Dr. Seyed Ziae Mousavi Mojab  
- **Stack:** Expo (React Native + TypeScript), Supabase, Epic FHIR Sandbox, OpenRouter (via Edge Functions only)

## Contributing to docs

When you make a major technical decision, add a short entry to [decisions.md](./decisions.md) and link the related GitHub issue. Do not commit secrets or sandbox tokens.
