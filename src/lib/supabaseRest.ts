import { projectId, publicAnonKey } from '../../utils/supabase/info';

const BASE = `https://${projectId}.supabase.co`;
const FN = `${BASE}/functions/v1/make-server-2bb64241`;
const anonHeaders = { apikey: publicAnonKey, Authorization: `Bearer ${publicAnonKey}` };

async function ensureOk(res: Response) {
  if (!res.ok) {
    let msg = res.statusText;
    try {
      const body = await res.json();
      msg = body.error || body.message || msg;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  return res;
}

export async function listCertifications<T>(): Promise<T[]> {
  const res = await ensureOk(
    await fetch(`${BASE}/rest/v1/certifications?select=*&order=created_at.desc`, {
      headers: anonHeaders,
    }),
  );
  return res.json();
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const res = await fetch(`${FN}/certifications/verify`, {
    method: 'POST',
    headers: { ...anonHeaders, 'x-admin-password': password },
  });
  return res.ok;
}

export async function createCertification(
  password: string,
  fields: Record<string, string>,
  file: File,
) {
  const body = new FormData();
  Object.entries(fields).forEach(([k, v]) => body.append(k, v));
  body.append('file', file);
  await ensureOk(
    await fetch(`${FN}/certifications`, {
      method: 'POST',
      headers: { ...anonHeaders, 'x-admin-password': password },
      body,
    }),
  );
}

export async function deleteCertification(password: string, id: string | number) {
  await ensureOk(
    await fetch(`${FN}/certifications/${encodeURIComponent(String(id))}`, {
      method: 'DELETE',
      headers: { ...anonHeaders, 'x-admin-password': password },
    }),
  );
}
