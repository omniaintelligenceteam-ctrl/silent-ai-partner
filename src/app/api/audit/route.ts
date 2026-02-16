import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Validate required fields
    const required = [
      'fullName',
      'businessName',
      'businessWebsite',
      'phoneNumber',
      'trade',
      'teamSize',
      'missedCalls',
      'phoneHandler',
      'currentSoftware',
      'extraHours',
    ]

    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Phoenix',
      dateStyle: 'full',
      timeStyle: 'short',
    })

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #fff; padding: 32px; border-radius: 12px;">
        <h1 style="color: #f97316; margin-bottom: 8px;">New Audit Request</h1>
        <p style="color: #94a3b8; font-size: 14px; margin-bottom: 32px;">Submitted ${timestamp}</p>

        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #1e293b;">
            <td style="padding: 12px 0; color: #94a3b8; font-size: 14px; width: 40%;">Full Name</td>
            <td style="padding: 12px 0; color: #fff; font-size: 14px;">${data.fullName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1e293b;">
            <td style="padding: 12px 0; color: #94a3b8; font-size: 14px;">Business Name</td>
            <td style="padding: 12px 0; color: #fff; font-size: 14px;">${data.businessName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1e293b;">
            <td style="padding: 12px 0; color: #94a3b8; font-size: 14px;">Website</td>
            <td style="padding: 12px 0; color: #fff; font-size: 14px;"><a href="${data.businessWebsite}" style="color: #f97316;">${data.businessWebsite}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #1e293b;">
            <td style="padding: 12px 0; color: #94a3b8; font-size: 14px;">Phone</td>
            <td style="padding: 12px 0; color: #fff; font-size: 14px;"><a href="tel:${data.phoneNumber}" style="color: #f97316;">${data.phoneNumber}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #1e293b;">
            <td style="padding: 12px 0; color: #94a3b8; font-size: 14px;">Trade</td>
            <td style="padding: 12px 0; color: #fff; font-size: 14px;">${data.trade}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1e293b;">
            <td style="padding: 12px 0; color: #94a3b8; font-size: 14px;">Team Size</td>
            <td style="padding: 12px 0; color: #fff; font-size: 14px;">${data.teamSize}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1e293b;">
            <td style="padding: 12px 0; color: #94a3b8; font-size: 14px;">Missed Calls/Day</td>
            <td style="padding: 12px 0; color: #fff; font-size: 14px;">${data.missedCalls}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1e293b;">
            <td style="padding: 12px 0; color: #94a3b8; font-size: 14px;">Who Handles Phones</td>
            <td style="padding: 12px 0; color: #fff; font-size: 14px;">${data.phoneHandler}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1e293b;">
            <td style="padding: 12px 0; color: #94a3b8; font-size: 14px;">Current Software</td>
            <td style="padding: 12px 0; color: #fff; font-size: 14px;">${data.currentSoftware}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1e293b;">
            <td style="padding: 12px 0; color: #94a3b8; font-size: 14px;">Extra 10 Hours</td>
            <td style="padding: 12px 0; color: #fff; font-size: 14px;">${data.extraHours}</td>
          </tr>
          ${data.biggestFrustration ? `
          <tr>
            <td style="padding: 12px 0; color: #94a3b8; font-size: 14px;">Biggest Frustration</td>
            <td style="padding: 12px 0; color: #fff; font-size: 14px;">${data.biggestFrustration}</td>
          </tr>
          ` : ''}
        </table>
      </div>
    `

    // Send via Resend
    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Silent AI Partner <audit@silentaipartner.com>',
        to: ['team@silentaipartner.com'],
        subject: `New Audit Request: ${data.businessName} (${data.trade})`,
        html: emailHtml,
      }),
    })

    if (!emailRes.ok) {
      const errBody = await emailRes.text()
      console.error('Resend error:', errBody)
      return NextResponse.json(
        { error: 'Failed to send notification' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Audit submission error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
