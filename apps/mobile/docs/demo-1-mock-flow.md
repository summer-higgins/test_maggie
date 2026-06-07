# MAGGIE — Demo 1 Mock Flow

## 1. Purpose

Demonstrate the intended MAGGIE product experience — meet the guide character,
review a patient snapshot, play medication/symptom learning games, get gentle
remediation, and see a session recap — **before** Epic SMART on FHIR
authentication is wired up. Demo 1 is a **frontend-only mock flow** using
synthetic data so the team and client can react to the real feel of the app now.

## 2. Scope

**In scope**

- Frontend screens and navigation in `apps/mobile`
- 100% synthetic, clearly-labeled mock data (`src/domain/maggieMockData.ts`)
- Maggie pixel-art character assets and theming
- Two mini-games (Medication Match, Symptom Check) + remediation + summary

**Out of scope / intentionally NOT done**

- No Epic SMART on FHIR connection
- No Supabase reads or writes
- No OpenRouter / LLM calls
- No changes to `.env`, `app.config.ts`, or EAS config
- No SDK or package version changes
- No real PHI; no diagnosis, treatment, dosing, or care-team messaging

## 3. Demo User Flow

1. **Home / Welcome** — Maggie hero sprite, intro, sandbox-only disclaimer → *Meet Maggie*
2. **Patient Snapshot** — synthetic conditions, devices, medications, and a clearly
   framed "Maggie believes" note (Vitamin C / Dexcom) → *Start Practice*
3. **Medication Match** — 3 questions matching meds to the concern they support,
   with gentle feedback → *Next mini-game*
4. **Symptom Check** — multi-select "Which symptoms = LOW blood sugar?"; a wrong
   answer reveals a **split-card** (high vs low signs) instead of a buzzer → *See summary*
5. **Session Summary** — gameplay-only recap (scores + what to revisit) → *Play again*

```
Home → Patient Snapshot → Medication Match → Symptom Check → (Remediation split-card) → Session Summary
```

## 4. Maggie Mock Profile

> ⚠️ Entirely fictional. Source: `src/domain/maggieMockData.ts`.

- **Name / pronouns:** Maggie, she/her — young adult
- **Personality:** curious, playful, determined, encouraging
- **Learning style:** visual, hands-on, concise explanations, memory recall
- **Conditions:** Type 1 Diabetes; Diabetic Retinopathy (left eye concern); High
  Blood Pressure / Kidney Function Concern; Anxiety and Depression; Low Vitamin D;
  Low Iron
- **Devices:** Dexcom G7 (CGM), Omnipod 5 (insulin pump)
- **Medications/supplements:** Novolog, Sertraline, Losartan, Vitamin D, Vitamin B,
  Vitamin C
- **Belief framing:** Vitamin C → Dexcom readings is shown only as *"Maggie
  believes…"* with *"ask your care team or an approved source"* — never as a
  verified app claim, and never inside graded quiz content.
- **Symptom cards**
  - *High blood sugar:* cotton mouth, headache, fatigue, shortness of breath, racing heart
  - *Low blood sugar:* shakiness, weakness, sweating, disorientation

## 5. What This Demonstrates

- The end-to-end **learning loop**: snapshot → practice → remediation → recap
- Maggie as a friendly, consistent **guide character** across screens
- **Gentle, non-shaming** feedback and a visual remediation pattern
- A summary that is **gameplay-only** (no clinical interpretation) — the same
  principle the future physician summary must follow
- Safety posture: persistent sandbox badge, disclaimers, belief-vs-record framing

## 6. Future Integration Points

| Demo 1 (mock) | Future (real) |
|---|---|
| `src/domain/maggieMockData.ts` | Deterministic FHIR → `GameContext` mapper |
| Hardcoded quiz/symptom content | `generate-quiz` Edge Function (OpenRouter, server-side) |
| In-memory session state | Supabase `sessions` / `quizzes` / `quiz_responses` (anon key + RLS) |
| Split-card remediation content | `generate-remediation` Edge Function |
| Session Summary screen | `generate-summary` from gameplay tables only |
| `src/navigation/nav.tsx` (custom stack) | Expo Router (`useRouter` / `useLocalSearchParams`) |
| No auth | Epic SMART on FHIR (PKCE), tokens in `expo-secure-store` |

## 7. Run Instructions

```bash
cd apps/mobile
bun install
bun run start -- --clear
# Press w for web, or scan the QR with Expo Go (SDK 55)
```

No `.env` is required to view Demo 1 — the flow uses only synthetic data and does
not read Supabase/Epic config.

## 8. Demo Script

1. Open the app. "This is MAGGIE — a cozy health-learning game. Note the
   **sandbox/synthetic** badge up top; nothing here is a real patient."
2. Tap **Meet Maggie**. "Here's Maggie's *pretend* snapshot — conditions, devices,
   meds. Notice Vitamin C is flagged *'Maggie believes'* — we never assert that as
   medical fact."
3. Tap **Start Practice** → play **Medication Match**. Get one right (celebrate
   pose), miss one on purpose. "Feedback is encouraging, never shaming."
4. Continue to **Symptom Check**. Intentionally include a high-sugar card so it's
   wrong. "Instead of a buzzer, Maggie shows a **side-by-side** high vs low card to
   teach the difference."
5. Continue to **Session Summary**. "A recap of *game activity only* — what was
   practiced and what to revisit. No diagnosis or advice."
6. Tap **Play again**. "When Epic auth lands, this same flow runs on synthetic
   sandbox FHIR through our mapper."

## 9. Acceptance Checklist

- [ ] App launches to Home with Maggie hero sprite and a visible sandbox badge
- [ ] Disclaimer (synthetic, not medical advice) appears on Home and Summary
- [ ] Patient Snapshot lists all conditions, both devices, all 6 meds
- [ ] Vitamin C shows "Maggie believes" + "ask care team / approved source"
- [ ] Medication Match: 3 questions, correct/incorrect states, gentle feedback
- [ ] Symptom Check: multi-select; correct set = shakiness/weakness/sweating/disorientation
- [ ] Wrong symptom answer shows the high-vs-low split card
- [ ] Session Summary shows med score + symptom result + what to revisit
- [ ] No Epic / Supabase / OpenRouter calls occur; no `.env` needed
- [ ] Maggie art renders with hard pixel edges and transparent background
- [ ] If an asset is missing at runtime, a safe placeholder shows instead of a crash
