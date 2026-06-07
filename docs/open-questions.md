# Open Questions for Client / GTA

Track answers here after meetings. Link GitHub issues when resolved.

| # | Question | Impact | Answer | Date |
|---|----------|--------|--------|------|
| 1 | Medication resource: `MedicationRequest` vs `MedicationStatement`? | FHIR fetch URLs, mapper | _TBD_ | |
| 2 | Exact Epic sandbox scopes for our app type? | OAuth config | _TBD_ | |
| 3 | Fixed sandbox test patient for demos? | Consistent demo script | _TBD_ | |
| 4 | Quiz format v1: multiple-choice only? | UI + JSON schema | _TBD_ | |
| 5 | Approved OpenRouter model(s) and prompt templates? | Edge Functions | _TBD_ | |
| 6 | Physician summary: in-app text only vs PDF export? | Final phase scope | _TBD_ | |
| 7 | Is Epic app registered as public (PKCE only) or confidential (needs `epic-token` function)? | Auth architecture | _TBD_ | |

---

## How to close an item

1. Record answer in the table above.  
2. Update [architecture.md](./architecture.md) or [data-model.md](./data-model.md) if needed.  
3. Add ADR to [decisions.md](./decisions.md) if the answer changes design.  
4. Close linked GitHub issue.
