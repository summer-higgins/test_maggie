# Security, Privacy, and Scope Boundaries

These rules are **non-negotiable** for capstone demo unless the client approves a written scope change (see development plan §4.2, §4.4).

---

## In scope (reminder)

- Cross-platform mobile **prototype** (Expo Go)  
- **Epic FHIR Sandbox** data only  
- Educational quiz games and remediation from **approved prompts**  
- Supabase storage of **session and gameplay** data  
- Physician summary from **game activity only**  

---

## Out of scope

- Real patient records, live hospital systems, or any **real PHI**  
- Public production deployment or app store release  
- Connection to a **live EHR** or EHR write-back  
- Diagnosis, treatment, prescribing, dosage changes, adherence enforcement, emergency guidance  
- Direct provider messaging, automatic transmission to a real physician, physician portal  
- Prescription refills, pharmacy ordering, billing, insurance workflows  
- Independent medical-content research beyond sandbox data and client-approved reference material  

---

## Default policy (when unsure)

Apply the **safest interpretation** until Dr. Farrow and the GTA clarify:

1. **No real PHI**  
2. **No public deployment**  
3. **No medical advice** in UI or AI outputs  
4. **No provider transmission** unless explicitly approved as scope change  

---

## Secrets and configuration

| Rule | Detail |
|------|--------|
| Never commit secrets | `.env`, API keys, tokens, patient exports |
| OpenRouter key | Supabase Edge Function secrets only |
| Epic client secret | Edge Function only (if confidential app); never in mobile |
| Epic access tokens | `expo-secure-store` on device |
| Sandbox URL guard | `EXPO_PUBLIC_EPIC_FHIR_BASE_URL` must point to sandbox host |

---

## AI content guardrails

System and user prompts must:

- Frame output as **educational gameplay** only  
- Use **`GameContext`** fields only — not full FHIR JSON  
- Avoid instructing patients to start/stop/change medications  
- Avoid diagnosis or treatment recommendations  

Physician summary generation must:

- Read **only** `quiz_responses` and `remediation_events` (and related quiz metadata)  
- **Not** re-interpret FHIR clinical data or invent new clinical facts  

Post-generation checks (recommended):

- Zod schema validation on quiz JSON  
- Blocklist for prescriptive medical phrases in summaries  

---

## PHI / sandbox verification checklist

Use before each client demo and in final documentation:

- [ ] Epic app configured for **sandbox** environment  
- [ ] No production FHIR base URLs in code or env  
- [ ] No real patient identifiers in database, logs, or screenshots  
- [ ] No OpenRouter or other keys in mobile binary / `EXPO_PUBLIC_*` vars  
- [ ] Meeting/demo recordings contain sandbox data only  
- [ ] Shared OneDrive / GitHub contain no exported clinical files  

**Owner:** Summer (QA / documentation) with team sign-off before demos.

---

## PR review reminders

Reviewers should ask:

1. Does this PR touch auth, FHIR, or AI? If yes, are secrets server-side?  
2. Could any log statement print tokens or full FHIR bundles?  
3. Does UI copy imply medical advice?  
4. Is new functionality in scope per this document?  
