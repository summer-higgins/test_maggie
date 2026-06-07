# Prototype 1 Build Guides

Detailed, file-by-file implementation guides for turning the Demo-1 mock app into a real
Epic → mapper → Supabase pipeline — including design alternatives, commit sequences, and
when to push / open PRs. Deep-dive on **Prototype 1**; later phases outlined for context.

| PDF | What it covers |
|-----|----------------|
| [00-overview.pdf](./00-overview.pdf) | Strategy, the mock↔real "seam", files to add, dependencies, build order & ownership, open questions to resolve first |
| [01-epic-oauth.pdf](./01-epic-oauth.pdf) | Slice A — Epic SMART on FHIR PKCE auth: design options, code sketch, token storage, commits, push points |
| [02-fhir-mapper.pdf](./02-fhir-mapper.pdf) | Slice B — FHIR client + deterministic `GameContext` mapper + the data-source seam, fixtures/tests, commits |
| [03-supabase-sessions.pdf](./03-supabase-sessions.pdf) | Slice C — `sessions` table + RLS migration, anon client, session service, commits |
| [04-git-workflow.pdf](./04-git-workflow.pdf) | Branch model, Conventional Commits, when to push/PR, review gates, conflict avoidance, 4-week timeline |

Suggested reading order: **00 → 04 → 03 → 02 → 01** (overview, then the git plan, then slices in
merge order C → B → A).

## Editing & regenerating

Markdown sources live in [`_src/`](./_src). Edit those, then rebuild:

```bash
cd docs/build-guides/_src
python -m pip install markdown          # one-time
python build_pdfs.py                    # md -> styled html
# then render each html to ../<name>.pdf with headless Chrome:
for f in 00-overview 01-epic-oauth 02-fhir-mapper 03-supabase-sessions 04-git-workflow; do
  "/c/Program Files/Google/Chrome/Application/chrome.exe" --headless --disable-gpu \
    --no-pdf-header-footer --print-to-pdf="../$f.pdf" "$f.html"
done
```

These are working documents (uncommitted) — review and adjust before sharing with the team or
folding decisions into `docs/decisions.md`.
