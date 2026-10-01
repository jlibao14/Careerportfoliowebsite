import { projectId, publicAnonKey } from "../../utils/supabase/info";

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ENDPOINT = `https://${projectId}.supabase.co/functions/v1/make-server-2bb64241/send-email`;

export async function sendEmail(data: EmailData): Promise<void> {
  let response: Response;
  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(data),
    });
  } catch (networkErr) {
    console.error("Email network error:", networkErr);
    throw new Error("Network error while sending email. Please try again.");
  }

  const text = await response.text();
  let parsed: any = null;
  try { parsed = text ? JSON.parse(text) : null; } catch { /* keep raw */ }

  if (!response.ok) {
    const detail = parsed?.error || parsed?.detail || text || `${response.status} ${response.statusText}`;
    console.error("Email server error:", response.status, detail);
    throw new Error(`Failed to send email: ${detail}`);
  }

  console.log("Email sent successfully:", parsed);
}
