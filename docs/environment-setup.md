# Environment Setup

Copy the repo root `.env.example` to `apps/mobile/.env` and fill in values locally. **Never commit** `.env`.

```bash
cp .env.example apps/mobile/.env
```

## Variables

```bash
# --- Expo (public; embedded in client) ---
EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

EXPO_PUBLIC_EPIC_CLIENT_ID=your_epic_sandbox_client_id
EXPO_PUBLIC_EPIC_REDIRECT_URI=maggie://oauth/callback
EXPO_PUBLIC_EPIC_FHIR_BASE_URL=https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4

# --- Supabase Edge Functions only (Supabase dashboard / CLI secrets) ---
# OPENROUTER_API_KEY=
# EPIC_CLIENT_SECRET=   # only if Epic app is confidential
```

`EXPO_PUBLIC_*` values are read at build time via `apps/mobile/app.config.ts` and exposed on `expo-constants` `extra` for the app.

Edge Function secrets (`OPENROUTER_API_KEY`, optional `EPIC_CLIENT_SECRET`) are configured in the Supabase project, not in the mobile `.env`.
