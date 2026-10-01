# Plan: Certifications page — replace Supabase JS client with REST fetch

## Context
`src/pages/Certifications.tsx` (626 lines) imports `supabase` from `src/lib/supabaseClient.ts`, which calls `createClient` from `@supabase/supabase-js`. That package isn't installed (pnpm install is blocked), so every call fails with "Failed to fetch". Inspection shows the REST rewrite has NOT actually landed in the file yet: it still uses `supabase.from(...)` (lines ~82, 160, 190) and `supabase.storage` (lines ~150-156, 188). The password gate (`ADMIN_PASSWORD`, line 51; `requestAction`/`handlePasswordSubmit`, lines ~100-125) already exists.

## Changes
1. **New `src/lib/supabaseRest.ts`** — tiny helper using `projectId` / `publicAnonKey` from `utils/supabase/info.tsx`:
   - `listCertifications()` → `GET /rest/v1/certifications?select=*&order=created_at.desc`
   - `insertCertification(row)` → `POST /rest/v1/certifications` (`Prefer: return=minimal`)
   - `deleteCertification(id)` → `DELETE /rest/v1/certifications?id=eq.{id}`
   - `uploadFile(path, file)` → `POST /storage/v1/object/certifications/{path}` (`x-upsert: false`, file Content-Type)
   - `removeFile(path)` → `DELETE /storage/v1/object/certifications/{path}`
   - `publicUrl(path)` → `https://{projectId}.supabase.co/storage/v1/object/public/certifications/{path}` (no network call)
   - All send `apikey` + `Authorization: Bearer <anon key>`; throw on `!res.ok` with response text.
2. **Edit `Certifications.tsx`** — drop the `supabase` import; swap the 5 call sites above to the helper, keeping existing `{data,error}`-based toast flow converted to try/catch. UI, animations, and password-modal flow unchanged.
3. **Delete `src/lib/supabaseClient.ts`** if nothing else imports it (grep first).

## Security issues to resolve (need your decision)
- **Password gate is client-side only**: `061484Jomike` is shipped in the JS bundle, and the anon key can write to the bucket/table directly, so the gate protects nothing against anyone who opens devtools. Recommended: move upload/delete into the existing Edge Function (`supabase/functions/server/index.tsx`, Hono) as `POST/DELETE /certifications`, checking the password against `Deno.env.get("CERT_ADMIN_PASSWORD")` and using the service-role key; make the bucket/table read-only for anon via RLS. The client then just sends the password with each request. I'd do this unless you say to keep it simple.
- **Credentials pasted in chat**: the AgentMail key and the password are now exposed in this conversation. The server code correctly reads `AGENTMAIL_API_KEY` from env (nothing to change in code), but you should rotate both and set them as Supabase secrets. I will not write either into source.

## Verification
- `grep -rn "@supabase/supabase-js\|supabaseClient" src` returns nothing.
- Run the dev server; open `/certifications`: list loads (empty state OK), no "Failed to fetch".
- Upload with wrong password → rejected; correct password → PDF/PNG uploads, card appears, view modal opens file.
- Delete removes both the table row and storage object.
- Confirm the `certifications` bucket is public and the table has a policy allowing the chosen access path (anon select at minimum).
