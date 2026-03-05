import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactBody = {
  name: string;
  email: string;
  message: string;
  company?: string;
};

export async function POST(req: Request) {
  const { name, email, message, company } = (await req.json()) as ContactBody;

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing fields' }, { status: 400 });
  }

  if (!email.includes('@')) {
    return Response.json({ error: 'Invalid email' }, { status: 400 });
  }

  if (message.length > 2000) {
    return Response.json({ error: 'Message too long' }, { status: 400 });
  }

  // honeypot
  if (company) {
    return Response.json({ success: true }, { status: 200 });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <contact@anujacharjee.com>',
      to: ['anujacharjee37@gmail.com'],
      replyTo: email,
      subject: `New message from ${name}`,
      html: emailTemplate({ name, email, message }),
      text: `
        Name: ${name}
        Email: ${email}

        ${message}
      `,
    });

    if (error) {
      return Response.json({ error: `Resend Error: ${error.message}` }, { status: 500 });
    }

    return Response.json({ success: true, data }, { status: 200 });
  } catch (error: unknown) {
    console.error('CONTACT API ERROR:', error);
    return Response.json({ error: `Unexpected Error: ${(error as Error).message}` }, { status: 500 });
  }
}

function emailTemplate({ name, email, message }: ContactBody) {
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#0d1117;padding:24px;color:#e6edf3">
    
    <div style="max-width:560px;margin:auto;background:#161b22;border-radius:10px;border:1px solid #30363d;padding:28px">
      
      <h2 style="margin-top:0;color:#58a6ff;font-size:20px">
        New Portfolio Contact
      </h2>

      <p style="margin:12px 0">
        <strong>Name:</strong> ${name}
      </p>

      <p style="margin:12px 0">
        <strong>Email:</strong> ${email}
      </p>

      <div style="margin-top:18px;padding:16px;background:#0d1117;border:1px solid #30363d;border-radius:8px">
        <p style="margin:0;white-space:pre-wrap">${message}</p>
      </div>

      <p style="margin-top:20px;font-size:12px;color:#8b949e">
        Sent from your portfolio contact form
      </p>

    </div>

  </div>
  `;
}
