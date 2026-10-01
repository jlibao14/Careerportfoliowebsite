# Plan: Fix "Failed to fetch" — Replace Supabase JS Client with Direct REST API Calls

## Context
`@supabase/supabase-js` was added to `package.json` but `pnpm install` was blocked by sandbox permissions, so the package is not in `node_modules`. When the Certifications page loads, importing from `@supabase/supabase-js` fails, causing a "Failed to fetch" error before any upload begins.

The fix replaces the Supabase JS client with direct `fetch` calls to the Supabase REST API. This requires zero additional packages — only the browser's built-in `fetch` — and supports every operation the JS client was used for: table reads, inserts, deletes, storage uploads, and public URL generation.

---

## REST API Reference (Supabase)

Base URL from `utils/supabase/info.tsx`: `https://xmcxnikgupsdfnrhiblg.supabase.co`

| Operation | Method | URL |
|---|---|---|
| List certs | GET | `/rest/v1/certifications?select=*&order=created_at.desc` |
| Insert cert | POST | `/rest/v1/certifications` |
| Delete cert | DELETE | `/rest/v1/certifications?id=eq.{id}` |
| Upload file | POST | `/storage/v1/object/certifications/{filename}` |
| Delete file | DELETE | `/storage/v1/object/certifications/{filename}` |
| Public file URL | — | `/storage/v1/object/public/certifications/{filename}` |

Required headers on every call:
```
Authorization: Bearer {publicAnonKey}
apikey: {publicAnonKey}
```
DB calls also need `Content-Type: application/json` and `Prefer: return=minimal` (for inserts).

---

## Files to Modify

### `src/pages/Certifications.tsx`
- Remove `import { supabase } from '../lib/supabaseClient'`
- Add `import { projectId, publicAnonKey } from '../../utils/supabase/info'`
- Add a `supabaseHeaders` constant and a `SUPABASE_URL` constant at module scope
- Replace every `supabase.*` call with the equivalent `fetch` call:

**`fetchCerts`:**
```ts
const res = await fetch(`${SUPABASE_URL}/rest/v1/certifications?select=*&order=created_at.desc`, {
  headers: supabaseHeaders
});
if (!res.ok) throw new Error(await res.text());
const data: Certification[] = await res.json();
setCerts(data);
```

**`handleUpload` — storage:**
```ts
const res = await fetch(`${SUPABASE_URL}/storage/v1/object/certifications/${filename}`, {
  method: 'POST',
  headers: { ...supabaseHeaders, 'Content-Type': form.file.type },
  body: form.file
});
if (!res.ok) throw new Error('Storage upload failed.');
const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/certifications/${filename}`;
```

**`handleUpload` — DB insert:**
```ts
const res = await fetch(`${SUPABASE_URL}/rest/v1/certifications`, {
  method: 'POST',
  headers: { ...supabaseHeaders, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
  body: JSON.stringify({ name, issuer, issue_date, credential_id, file_url, file_type })
});
if (!res.ok) throw new Error('Failed to save certification metadata.');
```

**`handleDelete` — storage:**
```ts
await fetch(`${SUPABASE_URL}/storage/v1/object/certifications/${filename}`, {
  method: 'DELETE',
  headers: supabaseHeaders
});
```

**`handleDelete` — DB delete:**
```ts
const res = await fetch(`${SUPABASE_URL}/rest/v1/certifications?id=eq.${cert.id}`, {
  method: 'DELETE',
  headers: supabaseHeaders
});
if (!res.ok) throw new Error('Failed to delete certification.');
```

### `src/lib/supabaseClient.ts`
- Replace its content with a comment noting it is unused (cannot delete files in this environment); the Certifications page no longer imports it.

### `package.json`
- Remove `"@supabase/supabase-js": "2.49.8"` from dependencies (no longer needed).

---

## Verification
1. `/certifications` loads without any toast error.
2. Click "Upload Certification" → password modal → enter `061484Jomike` → upload modal opens.
3. Select a PDF, fill form, click Upload → file uploads and cert card appears.
4. Click "View Certificate" → file displays in modal.
5. Hover card → delete icon → confirm → cert removed.

---

# Plan: Password-Gate the Certifications Upload & Delete

## Context
The Certifications page currently shows the Upload button and Delete icons only when `?admin=true` is in the URL — a URL-obscurity approach. The user wants a more reliable gate: a password prompt ("061484Jomike") that must be satisfied before the upload or delete actions can proceed. Once the correct password is entered in a session, the user stays unlocked so they don't have to re-enter it for subsequent actions.

---

## Changes — `src/pages/Certifications.tsx` only

### State additions
| State | Type | Purpose |
|---|---|---|
| `isUnlocked` | `boolean` | True after correct password entered this session |
| `passwordModalOpen` | `boolean` | Controls the password prompt modal visibility |
| `pendingAction` | `'upload' \| 'delete' \| null` | Tracks which action triggered the password gate |
| `pendingDeleteCert` | `Certification \| null` | Holds the cert to delete until password is confirmed |
| `passwordInput` | `string` | Controlled input value |
| `passwordError` | `string` | Inline error message in the password modal |

### Behaviour changes
1. **Remove** the `?admin=true` URL-param check (`useSearchParams`, `isAdminMode`) entirely — no longer needed.
2. **Upload button** — always visible (gold FAB, bottom-right), visible to all visitors.
3. **Delete icons** — always visible on each card (small trash icon, top-right).
4. **Clicking Upload or Delete when `isUnlocked === false`** → open the password modal and store the pending action.
5. **Clicking Upload or Delete when `isUnlocked === true`** → proceed directly (skip password modal).
6. **Password modal behaviour:**
   - Single password input (type="password"), auto-focused
   - Submit on Enter key or "Unlock" button
   - On match (`"061484Jomike"`) → set `isUnlocked = true`, close modal, execute the pending action
   - On mismatch → set `passwordError = "Incorrect password. Please try again."`, clear input, keep modal open
7. **`removeSearchParams` / `useSearchParams` import** → removed.

### Password check (client-side only)
```ts
const ADMIN_PASSWORD = '061484Jomike';

function handlePasswordSubmit() {
  if (passwordInput === ADMIN_PASSWORD) {
    setIsUnlocked(true);
    setPasswordModalOpen(false);
    setPasswordError('');
    if (pendingAction === 'upload') setUploadOpen(true);
    if (pendingAction === 'delete' && pendingDeleteCert) handleDelete(pendingDeleteCert);
    setPendingAction(null);
    setPendingDeleteCert(null);
  } else {
    setPasswordError('Incorrect password. Please try again.');
    setPasswordInput('');
  }
}
```

### Password Modal UI
- Matches site theme (dark navy `#0f1629`, gold `#d4af37` accents)
- Lock icon (Lucide `Lock`) in header
- Password input with show/hide toggle (Lucide `Eye`/`EyeOff`)
- Inline error in red below input
- "Cancel" + "Unlock" buttons

---

## Files to Modify
| File | Change |
|---|---|
| `src/pages/Certifications.tsx` | Replace `isAdminMode`/`useSearchParams` logic with `isUnlocked` + password modal |

No other files need changes.

---

## Verification
1. Visit `/certifications` — Upload FAB and delete icons are visible without any URL param.
2. Click Upload → password modal appears.
3. Enter wrong password → inline error shown, modal stays open.
4. Enter `061484Jomike` → modal closes, upload modal opens.
5. Upload a cert, then immediately click delete on another card — no password prompt (already unlocked).
6. Refresh page → `isUnlocked` resets to false; password required again.

---

# Plan: Certifications Page with Upload Feature

## Context
The portfolio needs a dedicated Certifications page where visitors can view professional certificates, and the owner (John) can upload new ones at any time without touching code. Files (PDFs/images) will live in Supabase Storage; metadata (name, issuer, date) in a Supabase database table. The upload UI is hidden behind a `?admin=true` URL parameter for low-friction admin access without requiring authentication setup.

---

## Supabase Setup (one-time, done in Supabase Dashboard)

### 1. Storage Bucket
- Name: `certifications`
- Public: **yes** (so file URLs are accessible to anyone)

### 2. Database Table
```sql
create table certifications (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  issuer text not null,
  issue_date text,
  credential_id text,
  file_url text not null,
  file_type text not null,
  created_at timestamptz default now()
);
alter table certifications enable row level security;
create policy "Public read" on certifications for select using (true);
create policy "Anon insert" on certifications for insert with check (true);
create policy "Anon delete" on certifications for delete using (true);
```

### 3. Storage RLS
In the Supabase dashboard, set the `certifications` bucket policies to allow public `SELECT` and anon `INSERT` (Objects → Policies).

---

## New Files to Create

### `src/lib/supabaseClient.ts`
```ts
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);
```

### `src/pages/Certifications.tsx`
Full-page component with:

**State:** `certifications[]` (loaded from DB), `loading`, `isAdminMode` (from `?admin=true` URL param), `uploadModalOpen`, upload form fields, `viewModalOpen` + selected cert.

**On mount:** `supabase.from('certifications').select('*').order('created_at', { ascending: false })`

**Display:** Responsive grid of Cards. Each card:
- Gold cert icon (Award from lucide-react)
- Certificate name (bold, white)
- Issuer (gray-300)
- Issue date + optional Credential ID
- "View Certificate" button → opens a modal (PDF via `<iframe>` or image via `<img>`)

**Admin mode** (when `?admin=true`):
- Floating "Upload Certification" button (gold, bottom-right)
- Upload modal with:
  - Drag-and-drop / file input (accepts `.pdf,.jpg,.jpeg,.png`)
  - Fields: Certificate Name, Issuing Organization, Issue Date, Credential ID (optional)
  - On submit: upload file to Supabase Storage `certifications` bucket, get public URL, insert row into `certifications` table
  - Success toast via `sonner`; refresh list

**Delete** (admin mode only): small trash icon on each card → `supabase.storage.from('certifications').remove([filename])` + `supabase.from('certifications').delete().eq('id', id)`

---

## Files to Modify

### `src/app/App.tsx`
- Import `Certifications` from `'../pages/Certifications'`
- Add `<Route path="/certifications" element={<Certifications />} />` after `/about`

### `src/components/Navbar.tsx`
- Add `{ path: '/certifications', label: 'Certifications' }` after the About entry in `navLinks`

---

## npm Package Required
`@supabase/supabase-js` — install before writing code: `npm install @supabase/supabase-js`

---

## Verification
1. `/certifications` — page loads, shows empty state or existing certs
2. `/certifications?admin=true` — Upload button appears; upload a PDF → card appears in grid
3. Click "View Certificate" — modal opens showing the file
4. Admin mode: delete a cert → card disappears, file removed from storage
5. `/certifications` (no admin param) — Upload button and delete icons are hidden

---

# Plan: Add Two New Roles to Career Journey

## Context
John Michael L. Libao's portfolio has a Career Journey timeline (`careerTimeline` array in `src/pages/About.tsx`) and a Projects dataset (`src/data/projects.ts`). Two new roles need to be added in chronological order, and the matching project entries in `projects.ts` need to be updated/corrected to reflect the actual work performed.

---

## New Roles to Add

### Role A — LEE Designs Industries, Inc.
- **Title**: Solutions Architect — IT Consultant (Contract)
- **Period**: Apr 2025 – Jul 2025
- **Timeline position**: 3rd entry (after Chris Sports Jul–Oct 2025, before Ventaja Jul 2023)
- **Description**: Re-architected IT infrastructure, security compliance, and governance processes; deployed application servers, Active Directory, firewall services, and group policy controls. Drafted business and systems proposals and led vendor selection alongside company ownership; built and onboarded the technical team. Impact: Established a reliable, policy-governed IT and security infrastructure aligned to current best practices.

### Role B — AI Developer | Project Manager | Trader (Freelance)
- **Company**: JML Freelance Consulting (self-employed)
- **Period**: Ongoing
- **Timeline position**: 1st entry (above GTO Trading, as it is the current active engagement)
- **Description**: Designs and builds digital products for local SMEs driving operational efficiency and growth; guides start-ups through AI modernization initiatives enabling scalable adoption of emerging technologies; delivers technical consultancy with strategic insights and implementation support; develops and optimizes AI-driven trading bots (Expert Advisors) engineered to align with London and New York market sessions.

---

## Changes Required

### 1. `src/pages/About.tsx` — `careerTimeline` array

Insert **Role B (Freelance)** at index 0 and **Role A (LEE Designs)** at index 3 (before Chris Sports):

```
Index 0  → AI Developer | Project Manager | Trader (Freelance) — April 20206 and Ongoing   [NEW]
Index 1  → GTO Trading Corporation — Nov 2025 – Mar 2026
Index 2  → Chris Sports, Inc. — Jul 2025 – Oct 2025
Index 3  → LEE Designs Industries, Inc. — Apr 2025 – Jul 2025              [NEW]
Index 4  → Ventaja International Corporation — Jul 2023 – Dec 2023
...rest unchanged
```

### 2. `src/data/projects.ts` — Update existing entries

**Entry `devops-cicd-pipeline`** (currently uses generic CI/CD content, maps to "Lee Designs Inds."):
- `title`: `'IT Infrastructure Re-Architecture & Security Compliance'`
- `company`: `'LEE Designs Industries, Inc.'` (standardize name)
- `role`: `'Solutions Architect — IT Consultant (Contract)'`
- `category`: `'Governance'`
- `description`: Infrastructure and security re-architecture engagement for a design and manufacturing firm
- `problem`: Ad-hoc IT infrastructure with no formal governance, security controls, or team structure
- `solution`: Re-architected environment with Active Directory, application servers, firewall, and group policy; drafted business/systems proposals; led vendor selection and built/onboarded the technical team
- `techStack`: `['Active Directory', 'Windows Server', 'Firewall/NGFW', 'Group Policy', 'IT Governance']`
- `metrics`: `[{ label: 'Infrastructure Coverage', value: '100%' }, { label: 'Security Posture', value: 'Policy-Governed' }, { label: 'Team Onboarded', value: 'Yes' }]`
- `featured`: remove (not listed as featured)

**Entry `ai-chatbot-integration`** (already maps to `JML Freelance Consulting`, covers AI work but too narrow):
- `title`: `'AI Solutions & Trading Bot Development'`
- `role`: `'AI Developer | Project Manager | Trader'`
- `description`: Freelance engagements delivering AI-powered digital products for SMEs and AI modernization for startups; includes development of Expert Advisor trading bots tuned for London and New York sessions
- `problem`: SMEs and startups lacking structured AI adoption paths and automation capabilities
- `solution`: Delivered tailored digital products, AI modernization roadmaps, technical consultancy, and algorithmic trading bots (Expert Advisors) aligned to major FX market sessions
- `techStack`: `['OpenAI GPT', 'Python', 'MQL5/MQL4', 'MetaTrader', 'FastAPI', 'React', 'PostgreSQL']`
- `metrics`: `[{ label: 'Clients Served', value: 'SMEs & Startups' }, { label: 'Bot Sessions', value: 'London + NY' }, { label: 'Engagement Type', value: 'Ongoing' }]`

---

## Files to Modify

| File | Change |
|---|---|
| `src/pages/About.tsx` | Insert 2 new objects into `careerTimeline` at indices 0 and 3 |
| `src/data/projects.ts` | Update `devops-cicd-pipeline` and `ai-chatbot-integration` entries |

No changes needed to Home, Capabilities, or Contact — they reference skills/domains generically.

---

## Verification

1. `/about` — Career Journey shows Freelance (Ongoing) at top, LEE Designs between Chris Sports and Ventaja, all in correct chronological order.
2. `/portfolio` — LEE Designs card shows updated title and tech stack; freelance card shows AI/trading bot scope.
3. `/portfolio/devops-cicd-pipeline` and `/portfolio/ai-chatbot-integration` — Project Detail pages show accurate descriptions.
