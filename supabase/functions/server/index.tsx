import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "apikey", "x-admin-password"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-2bb64241/health", (c) => {
  return c.json({ status: "ok" });
});

const AGENTMAIL_BASE = "https://api.agentmail.to/v0";
const TO_EMAIL = "mymail@jlibao.cloud-ip.cc";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function resolveInboxId(apiKey: string): Promise<string> {
  const res = await fetch(`${AGENTMAIL_BASE}/inboxes`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`AgentMail list inboxes failed: ${res.status} ${res.statusText} — ${text}`);
  }
  let data: any;
  try { data = JSON.parse(text); } catch {
    throw new Error(`AgentMail list inboxes returned non-JSON: ${text}`);
  }
  const list = Array.isArray(data) ? data : (data.inboxes || data.data || []);
  if (!list.length) {
    throw new Error(`AgentMail account has no inboxes available`);
  }
  const inbox = list[0];
  const id = inbox.inbox_id || inbox.id || inbox.email_address || inbox.email;
  if (!id) {
    throw new Error(`AgentMail inbox response missing id field: ${JSON.stringify(inbox)}`);
  }
  return id;
}

app.post("/make-server-2bb64241/send-email", async (c) => {
  try {
    const apiKey = Deno.env.get("AGENTMAIL_API_KEY");
    if (!apiKey) {
      console.log("send-email error: AGENTMAIL_API_KEY env var is not set");
      return c.json({ error: "Server misconfigured: AGENTMAIL_API_KEY missing" }, 500);
    }

    const body = await c.req.json().catch(() => null) as
      | { name?: string; email?: string; subject?: string; message?: string }
      | null;
    if (!body || !body.name || !body.email || !body.subject || !body.message) {
      return c.json({ error: "Missing required fields: name, email, subject, message" }, 400);
    }

    const inboxId = Deno.env.get("AGENTMAIL_INBOX_ID") || await resolveInboxId(apiKey);
    console.log(`send-email: using inbox ${inboxId}`);

    const payload = {
      to: [TO_EMAIL],
      reply_to: [body.email],
      subject: `Portfolio Contact: ${body.subject}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\n\nMessage:\n${body.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(body.subject)}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${escapeHtml(body.message)}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #888; font-size: 12px;">Sent from the portfolio contact form at jlibao.cloud-ip.cc</p>
        </div>
      `,
    };

    const sendUrl = `${AGENTMAIL_BASE}/inboxes/${encodeURIComponent(inboxId)}/messages/send`;
    const res = await fetch(sendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const respText = await res.text();
    if (!res.ok) {
      console.log(`AgentMail send failed (${res.status} ${res.statusText}) at ${sendUrl}: ${respText}`);
      return c.json(
        { error: `AgentMail send failed: ${res.status} ${res.statusText}`, detail: respText },
        502,
      );
    }
    let result: any = null;
    try { result = JSON.parse(respText); } catch { result = { raw: respText }; }
    console.log(`send-email success: ${JSON.stringify(result).slice(0, 200)}`);
    return c.json({ ok: true, result });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.log(`send-email unexpected error: ${msg}`);
    return c.json({ error: `Server error while sending email: ${msg}` }, 500);
  }
});

// ---- Certifications admin (password enforced server-side) ----
const SB_URL = Deno.env.get("SUPABASE_URL")!;
const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const sbHeaders = { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` };

function isAdmin(c: any): boolean {
  const expected = Deno.env.get("CERT_ADMIN_PASSWORD");
  return !!expected && c.req.header("x-admin-password") === expected;
}

app.post("/make-server-2bb64241/certifications/verify", (c) =>
  isAdmin(c) ? c.json({ ok: true }) : c.json({ error: "Incorrect password" }, 401));

app.post("/make-server-2bb64241/certifications", async (c) => {
  if (!isAdmin(c)) return c.json({ error: "Incorrect password" }, 401);
  try {
    const form = await c.req.formData();
    const file = form.get("file") as File | null;
    const name = String(form.get("name") ?? "").trim();
    const issuer = String(form.get("issuer") ?? "").trim();
    if (!file || !name || !issuer) return c.json({ error: "name, issuer and file are required" }, 400);
    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type) || file.size > 10 * 1024 * 1024) {
      return c.json({ error: "Invalid file type or size" }, 400);
    }
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${name.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.${ext}`;
    const up = await fetch(`${SB_URL}/storage/v1/object/certifications/${path}`, {
      method: "POST",
      headers: { ...sbHeaders, "Content-Type": file.type, "x-upsert": "false" },
      body: await file.arrayBuffer(),
    });
    if (!up.ok) return c.json({ error: `Storage: ${await up.text()}` }, 500);
    const row = {
      name,
      issuer,
      issue_date: String(form.get("issue_date") ?? "") || null,
      credential_id: String(form.get("credential_id") ?? "").trim() || null,
      file_url: `${SB_URL}/storage/v1/object/public/certifications/${path}`,
      file_type: file.type === "application/pdf" ? "pdf" : "image",
    };
    const ins = await fetch(`${SB_URL}/rest/v1/certifications`, {
      method: "POST",
      headers: { ...sbHeaders, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify(row),
    });
    if (!ins.ok) return c.json({ error: `Database: ${await ins.text()}` }, 500);
    return c.json({ ok: true });
  } catch (e) {
    console.log("certifications create error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

app.delete("/make-server-2bb64241/certifications/:id", async (c) => {
  if (!isAdmin(c)) return c.json({ error: "Incorrect password" }, 401);
  const id = encodeURIComponent(c.req.param("id"));
  const get = await fetch(`${SB_URL}/rest/v1/certifications?id=eq.${id}&select=file_url`, { headers: sbHeaders });
  const [row] = get.ok ? await get.json() : [];
  const filename = row?.file_url?.split("/").pop();
  if (filename) {
    await fetch(`${SB_URL}/storage/v1/object/certifications/${filename}`, { method: "DELETE", headers: sbHeaders });
  }
  const del = await fetch(`${SB_URL}/rest/v1/certifications?id=eq.${id}`, { method: "DELETE", headers: sbHeaders });
  if (!del.ok) return c.json({ error: `Database: ${await del.text()}` }, 500);
  return c.json({ ok: true });
});

Deno.serve(app.fetch);