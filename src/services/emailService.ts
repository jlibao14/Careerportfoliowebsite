const AGENTMAIL_API_KEY = 'am_us_inbox_99d03d6b6722f3e0b67716d9f6f80ce6b665dc5ebd816026ce004edf5cbaaa35';
const AGENTMAIL_HOST = 'https://agentmail.to';
const TO_EMAIL = 'mymail@jlibao.cloud-ip.cc';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendEmail(data: EmailData): Promise<void> {
  try {
    // Construct email payload
    const emailPayload = {
      to: TO_EMAIL,
      from: data.email,
      reply_to: data.email,
      subject: `Portfolio Contact: ${data.subject}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #888; font-size: 12px;">
            This message was sent from the portfolio contact form at jlibao.cloud-ip.cc
          </p>
        </div>
      `
    };

    // Try primary endpoint
    const response = await fetch(`${AGENTMAIL_HOST}/api/v1/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AGENTMAIL_API_KEY}`,
        'X-API-Key': AGENTMAIL_API_KEY
      },
      body: JSON.stringify(emailPayload)
    });

    if (!response.ok) {
      // Try alternative endpoint structure
      const altResponse = await fetch(`${AGENTMAIL_HOST}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AGENTMAIL_API_KEY}`,
          'X-API-Key': AGENTMAIL_API_KEY
        },
        body: JSON.stringify(emailPayload)
      });

      if (!altResponse.ok) {
        const errorData = await altResponse.json().catch(() => null);
        throw new Error(
          errorData?.message ||
          errorData?.error ||
          `Email service error: ${altResponse.status} ${altResponse.statusText}`
        );
      }

      return;
    }

    const result = await response.json().catch(() => null);
    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Failed to send email. Please try again later.'
    );
  }
}
