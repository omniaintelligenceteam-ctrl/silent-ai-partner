import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, company, phone } = await request.json();

    if (!name || !company || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();

    // Send email notification via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Sarah <sarah@silentaipartner.com>',
          to: ['premierllwes@gmail.com'],
          subject: `🔥 New Demo Request — ${company}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
              <h2 style="color: #f97316; margin-bottom: 8px;">New Demo Request</h2>
              <p style="color: #64748b; margin-bottom: 24px;">${timestamp}</p>
              
              <div style="background: #0f172a; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="color: #94a3b8; padding: 8px 0; width: 100px;">Name</td>
                    <td style="color: #ffffff; font-weight: 600; padding: 8px 0;">${name}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; padding: 8px 0;">Company</td>
                    <td style="color: #ffffff; font-weight: 600; padding: 8px 0;">${company}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; padding: 8px 0;">Phone</td>
                    <td style="color: #f97316; font-weight: 600; padding: 8px 0; font-size: 18px;">${phone}</td>
                  </tr>
                </table>
              </div>

              <p style="color: #64748b; font-size: 14px;">
                Call them now — they just raised their hand. ⚡
              </p>
            </div>
          `,
        }),
      });
    }

    // Post to Discord webhook if configured
    const discordWebhook = process.env.DISCORD_WEBHOOK_ALERTS;
    if (discordWebhook) {
      await fetch(discordWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🔥 **New Demo Request**\n**Name:** ${name}\n**Company:** ${company}\n**Phone:** ${phone}\n\nCall them now ⚡`,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Demo request error:', error);
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
  }
}
