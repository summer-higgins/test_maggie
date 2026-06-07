# Architecture Decision Record (ADR)

Short log of decisions the team has agreed on. Update via PR when something changes.

| ID | Date | Decision | Status |
|----|------|----------|--------|
| ADR-001 | 2026-05-29 | Supabase is the only backend (DB + Edge Functions); no separate Node/Bun API server for v1 | Accepted |
| ADR-002 | 2026-05-29 | Epic OAuth via mobile PKCE; public client id in app for sandbox | Accepted |
| ADR-003 | 2026-05-29 | OpenRouter only from Edge Functions; never in Expo client | Accepted |
| ADR-004 | 2026-05-29 | Session model: Epic patient id + MAGGIE `session_id`; no Supabase Auth in v1 | Accepted |
| ADR-005 | 2026-05-29 | FHIR → `GameContext` mapper is deterministic; LLM consumes `GameContext` only | Accepted |
| ADR-006 | 2026-05-29 | Physician summary generated from gameplay DB rows only | Accepted |

---

## ADR-001 — Single backend (Supabase)

**Context:** Development plan lists Supabase as the backend platform.

**Decision:** Use PostgreSQL, RLS, and Edge Functions for all server-side logic.

**Consequences:** Team learns Supabase CLI; Deno Edge Functions for AI. Add `epic-token` function only if Epic requires confidential client.

---

## ADR-002 — Epic PKCE on mobile

**Context:** Native/mobile SMART apps typically use authorization code + PKCE.

**Decision:** Implement OAuth in the Expo app with `expo-auth-session`.

**Consequences:** Must register redirect URI with Epic early; test on physical devices and Expo Go in week 1.

---

## ADR-003 — OpenRouter server-side only

**Context:** API keys in mobile apps are extractable.

**Decision:** All LLM calls from Edge Functions; mobile calls functions with `sessionId` / `gameContext`.

**Consequences:** Malek/Bassel own function contracts; shared Zod schemas in P2.

---

## ADR-004 — Lightweight sessions (no Supabase Auth v1)

**Context:** Capstone demo does not require patient accounts across devices.

**Decision:** UUID `sessions` table; optional hardening with JWT claims later.

**Consequences:** RLS must be documented as demo-appropriate; not enterprise HIPAA architecture.

---

## ADR-005 — Deterministic mapper

**Context:** Sending raw FHIR to the LLM increases cost, variability, and clinical risk.

**Decision:** Mapper extracts display fields; prompts use `GameContext` type only.

**Consequences:** Malek owns mapper tests with sandbox fixture JSON.

---

## ADR-006 — Gameplay-only physician summary

**Context:** Client requires clinical boundaries.

**Decision:** `generate-summary` queries quiz/remediation tables only; UI labels summary as non-clinical.

**Consequences:** Summary quality depends on stored gameplay fidelity, not FHIR re-analysis.
