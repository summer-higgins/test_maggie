# Prototype Phases and Team Workstreams

Aligned with [MAGGIE_FINAL Development_Plan.pdf](../MAGGIE_FINAL%20Development_Plan.pdf) §5.2.

---

## Phase summary

| Phase | Weeks | Goal | Demo milestone |
|-------|-------|------|----------------|
| **Prototype 1** | 1–4 | Foundation and data pipeline | Epic connected + FHIR on screen + session in Supabase |
| **Prototype 2** | 5–9 | Core gameplay | Full quiz loop with stored results |
| **Final** | 10–12 | Remediation, summary, polish | End-to-end sandbox demo on iOS and Android via Expo Go |

---

## Prototype 1 (Weeks 1–4) — Foundation

### Deliverables

- [x] Expo / React Native + TypeScript project skeleton  
- [ ] Supabase project + `sessions` table + RLS  
- [ ] Epic SMART on FHIR sandbox authorization (PKCE)  
- [ ] Retrieve simulated **Patient**, **Condition**, medication resources  
- [ ] Demo screen: patient connected, lists meds/conditions  
- [ ] `.env.example` + README setup instructions  
- [ ] `main` / `develop` / feature branch workflow active  

### Suggested workstreams

| Workstream | Primary owner | Supporting |
|------------|---------------|------------|
| Repo scaffold, Epic app registration, integration | Bassel | Malek |
| Supabase schema, migrations, RLS | Malek | Bassel |
| Expo shell, navigation placeholder, disclaimer UI | Humayra | Bassel |
| README, test plan outline, PHI checklist draft | Summer | All |

### Definition of done

A teammate can clone the repo, set env vars, run the app in Expo Go, log into Epic sandbox, see FHIR-derived medication/condition list, and confirm a `sessions` row was created.

---

## Prototype 2 (Weeks 5–9) — Core gameplay

### Deliverables

- [ ] FHIR → `GameContext` mapper (deterministic)  
- [ ] `generate-quiz` Edge Function + OpenRouter integration  
- [ ] Quiz UI (from Figma), answer handling, scoring  
- [ ] Tables: `quizzes`, `quiz_responses`  
- [ ] Session history or basic results view  
- [ ] Client UI review  

### Suggested workstreams

| Workstream | Primary owner | Supporting |
|------------|---------------|------------|
| Mapper + shared Zod types | Malek | Bassel |
| Edge Function `generate-quiz` | Malek | Bassel |
| Quiz screens and navigation | Humayra | Bassel |
| Prompt template doc for client approval | Summer | Bassel, Malek |

### Definition of done

User completes a generated quiz; every answer is stored; score visible; no OpenRouter key in mobile bundle.

---

## Final product (Weeks 10–12)

### Deliverables

- [ ] `generate-remediation` + follow-up question UI  
- [ ] `remediation_events` persistence  
- [ ] `generate-summary` + physician summary screen (gameplay-only copy)  
- [ ] Accessibility pass  
- [ ] Bug fixes; **no new features** unless blocking demo  
- [ ] Testing evidence: no real PHI used  

### Stabilization sub-phase (same weeks)

- End-to-end Expo Go demo on **iOS and Android**  
- Final documentation and presentation materials  

---

## Meeting cadence (from development plan)

| Meeting | When | Purpose |
|---------|------|---------|
| Client / GTA | Thursdays 4:00 PM (Zoom) | Demos, feedback, scope questions |
| Internal team | Fridays 1:00 PM+ | Sprint planning, blockers, assignments |
| Async | WhatsApp, GitHub Issues, OneDrive | Day-to-day coordination |

---

## Role reference

| Member | Primary role |
|--------|----------------|
| Bassel Taleb | Team Lead / Technical Coordinator |
| Summer Higgins | Documentation, QA, meeting notes |
| Malek Harajli | Backend / Data Lead |
| Humayra Nawshin | Frontend / UI Lead |
