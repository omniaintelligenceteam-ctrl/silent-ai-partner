const http = require('http');
const fs = require('fs');
const path = require('path');

// === CONFIG ===
const PORT = 3456;
const OWNER_PHONE = process.env.OWNER_PHONE || '+14805555555';
const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_AUTH = process.env.TWILIO_AUTH;
const TWILIO_FROM = process.env.TWILIO_FROM;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

let twilioClient = null;
if (TWILIO_SID && TWILIO_AUTH) {
  const twilio = require('twilio');
  twilioClient = twilio(TWILIO_SID, TWILIO_AUTH);
  console.log('✅ Twilio configured');
} else {
  console.log('⚠️  Twilio not configured — SMS will be logged only');
}

// === AI EXTRACTION ===
async function extractCallData(transcript, messages) {
  const prompt = `Extract from this plumbing call transcript. Return ONLY valid JSON:
{
  "customer_name": "string or null",
  "customer_phone": "string or null",
  "service_needed": "what they need done",
  "urgency": "emergency | urgent | routine",
  "preferred_time": "string or null",
  "address": "string or null",
  "special_notes": "string or null",
  "estimated_value": "rough dollar estimate",
  "summary": "1-2 sentence summary"
}

TRANSCRIPT:
${transcript}`;

  try {
    // Use OpenClaw gateway (OpenAI-compatible endpoint)
    const GATEWAY_URL = process.env.GATEWAY_URL || 'http://127.0.0.1:18789';
    const GATEWAY_TOKEN = process.env.GATEWAY_TOKEN || 'opie-token-123';
    
    const resp = await fetch(`${GATEWAY_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GATEWAY_TOKEN}`
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-5-haiku-latest',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await resp.json();
    const text = data.choices?.[0]?.message?.content || '{}';
    // Strip markdown code fences if present
    const cleaned = text.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();
    console.log('🧠 Raw AI response:', cleaned.substring(0, 300));
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('❌ AI extraction failed:', err.message);
    return null;
  }
}

// === SMS ===
async function sendSMS(to, body) {
  if (!twilioClient) {
    console.log(`📱 SMS (would send to ${to}):\n${body}\n`);
    return { logged: true };
  }
  try {
    const msg = await twilioClient.messages.create({ body, from: TWILIO_FROM, to });
    console.log(`📱 SMS sent to ${to}: ${msg.sid}`);
    return msg;
  } catch (err) {
    console.error(`❌ SMS failed:`, err.message);
    return null;
  }
}

// === SERVER ===
const server = http.createServer(async (req, res) => {
  // Health check
  if (req.method === 'GET' && req.url === '/webhook/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
    return;
  }

  // Vapi webhook
  if (req.method === 'POST' && req.url === '/webhook/vapi') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { message } = JSON.parse(body);
        
        if (!message || message.type !== 'end-of-call-report') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true }));
          return;
        }

        console.log(`\n📞 END OF CALL REPORT`);
        const { artifact, call, endedReason } = message;
        const transcript = artifact?.transcript || '';
        const messages = artifact?.messages || [];
        const callerNumber = call?.customer?.number || 'Unknown';
        const callDuration = call?.duration || 0;
        const recordingUrl = artifact?.recording?.url || null;

        console.log(`📋 Ended: ${endedReason} | Caller: ${callerNumber} | Duration: ${callDuration}s`);

        // Extract with AI
        const callData = await extractCallData(transcript, messages);

        if (callData) {
          console.log('✅ Extracted:', JSON.stringify(callData, null, 2));

          // Text owner
          const ownerMsg = `🔔 NEW CALL\n${callData.customer_name || 'Unknown'} — ${callerNumber}\nService: ${callData.service_needed}\nUrgency: ${callData.urgency?.toUpperCase()}\n${callData.preferred_time ? 'When: ' + callData.preferred_time + '\n' : ''}${callData.address ? 'Address: ' + callData.address + '\n' : ''}${callData.special_notes ? 'Notes: ' + callData.special_notes + '\n' : ''}Est. Value: ${callData.estimated_value || 'TBD'}\n\n${callData.summary}${recordingUrl ? '\n\n🎧 ' + recordingUrl : ''}`;

          await sendSMS(OWNER_PHONE, ownerMsg);

          // Text customer
          if (callerNumber && callerNumber !== 'Unknown') {
            const custMsg = `Thanks for calling Mike's Plumbing! ✅\n\nWe've got your request for ${callData.service_needed}${callData.preferred_time ? ' — ' + callData.preferred_time : ''}.\n\n${callData.urgency === 'emergency' ? "We're dispatching someone right away." : "We'll confirm your appointment shortly."}\n\nQuestions? Call (866) 782-1303 anytime.`;
            await sendSMS(callerNumber, custMsg);
          }
        } else {
          await sendSMS(OWNER_PHONE, `📞 New call from ${callerNumber} (${callDuration}s). Check logs.`);
        }

        // Log
        const logPath = path.join(__dirname, 'call-log.json');
        let logs = [];
        try { logs = JSON.parse(fs.readFileSync(logPath, 'utf8')); } catch {}
        logs.push({
          timestamp: new Date().toISOString(),
          caller: callerNumber,
          duration: callDuration,
          endedReason,
          extracted: callData,
          transcriptLength: transcript.length
        });
        fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, extracted: !!callData }));
      } catch (err) {
        console.error('❌ Error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Silent AI Partner webhook on port ${PORT}`);
  console.log(`📡 POST /webhook/vapi`);
  console.log(`💊 GET  /webhook/health`);
  console.log(`🤖 Anthropic: ${ANTHROPIC_KEY ? '✅' : '❌ MISSING'}`);
  console.log(`📱 Twilio: ${twilioClient ? '✅' : '⚠️  log only'}\n`);
});
