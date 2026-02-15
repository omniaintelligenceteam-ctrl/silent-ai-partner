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

// === CUSTOMER CONFIG ===
let customerConfig = null;
try {
  customerConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'customers.json'), 'utf8'));
  console.log(`✅ Loaded ${customerConfig.customers.length} customers`);
} catch (err) {
  console.log('⚠️  Customer config not found — Silent Listener disabled');
}

function findCustomerByTwilioNumber(twilioNumber) {
  if (!customerConfig) return null;
  return customerConfig.customers.find(c => c.twilio_number === twilioNumber);
}

// === AI EXTRACTION ===
async function extractBusinessIntelligence(transcript, callMetadata) {
  const prompt = `Extract business intelligence from this phone call recording. Return ONLY valid JSON:
{
  "caller_name": "string or null",
  "issue_request": "what they called about",
  "quotes_mentioned": ["any pricing or quotes discussed"],
  "appointments_discussed": {
    "scheduled": "boolean",
    "date_time": "string or null",
    "service_type": "string or null"
  },
  "upsell_opportunities": ["potential additional services they might need"],
  "competitor_mentions": ["any competitor names or references"],
  "sentiment": "positive | neutral | negative | frustrated",
  "call_outcome": "appointment_scheduled | quote_requested | complaint | information_only | hang_up",
  "follow_up_needed": "boolean",
  "customer_value_signals": ["indicators of high-value customer"],
  "key_insights": "1-2 sentence summary of important business insights"
}

Call metadata: From ${callMetadata.from} to ${callMetadata.to}, Duration: ${callMetadata.duration}s

TRANSCRIPT:
${transcript}`;

  try {
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
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await resp.json();
    const text = data.choices?.[0]?.message?.content || '{}';
    const cleaned = text.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();
    console.log('🧠 Business intelligence extracted:', cleaned.substring(0, 200) + '...');
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('❌ Business intelligence extraction failed:', err.message);
    return null;
  }
}

// === RECORDING DOWNLOAD ===
async function downloadTwilioRecording(recordingUrl) {
  try {
    const resp = await fetch(recordingUrl, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${TWILIO_SID}:${TWILIO_AUTH}`).toString('base64')}`
      }
    });
    return await resp.text();
  } catch (err) {
    console.error('❌ Failed to download recording:', err.message);
    return null;
  }
}

// === SILENT LISTENER LOGGING ===
function logSilentListener(data) {
  const logPath = path.join(__dirname, 'silent-listener-log.json');
  let logs = [];
  try {
    logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));
  } catch {}
  logs.push({
    timestamp: new Date().toISOString(),
    ...data
  });
  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
  console.log('📝 Silent Listener log updated');
}

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

  // Silent Listener: Incoming call
  if (req.method === 'POST' && req.url === '/webhook/silent-listener/incoming') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        // Parse Twilio webhook data
        const params = new URLSearchParams(body);
        const from = params.get('From');
        const to = params.get('To');
        const callSid = params.get('CallSid');
        
        console.log(`\n📞 SILENT LISTENER: ${from} → ${to} (${callSid})`);
        
        // Find customer config for this Twilio number
        const customer = findCustomerByTwilioNumber(to);
        if (!customer) {
          console.error('❌ No customer found for Twilio number:', to);
          res.writeHead(404, { 'Content-Type': 'text/xml' });
          res.end('<Response><Say>This number is not configured.</Say></Response>');
          return;
        }
        
        console.log(`✅ Customer: ${customer.business_name}, forwarding to ${customer.owner_phone}`);
        
        // Generate TwiML
        const recordingCallback = `https://${req.headers.host}/webhook/silent-listener/recording-status`;
        const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>This call may be recorded for quality purposes.</Say>
  <Dial record="record-from-answer-dual" recordingStatusCallback="${recordingCallback}">
    ${customer.owner_phone}
  </Dial>
</Response>`;
        
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml);
      } catch (err) {
        console.error('❌ Silent Listener incoming error:', err.message);
        res.writeHead(500, { 'Content-Type': 'text/xml' });
        res.end('<Response><Say>System error.</Say></Response>');
      }
    });
    return;
  }

  // Silent Listener: Recording status
  if (req.method === 'POST' && req.url === '/webhook/silent-listener/recording-status') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const params = new URLSearchParams(body);
        const recordingUrl = params.get('RecordingUrl');
        const recordingSid = params.get('RecordingSid');
        const callSid = params.get('CallSid');
        const from = params.get('From');
        const to = params.get('To');
        const duration = parseInt(params.get('RecordingDuration') || '0');
        
        console.log(`\n🎧 RECORDING READY: ${recordingSid} (${duration}s)`);
        
        const callMetadata = {
          recordingSid,
          callSid,
          from,
          to,
          duration,
          recordingUrl,
          timestamp: new Date().toISOString()
        };
        
        // Download and transcribe the recording
        console.log('📥 Downloading recording for transcription...');
        // Note: In a real implementation, you'd use Twilio's transcription service
        // or a transcription API. For now, we'll log the metadata.
        
        // Extract business intelligence (using a sample transcript for demo)
        const sampleTranscript = 'Sample transcript would go here from transcription service';
        const businessIntel = await extractBusinessIntelligence(sampleTranscript, callMetadata);
        
        // Log to Silent Listener log
        logSilentListener({
          ...callMetadata,
          businessIntelligence: businessIntel,
          transcriptAvailable: false // Would be true when real transcription is implemented
        });
        
        console.log('✅ Silent Listener processing complete');
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (err) {
        console.error('❌ Recording status error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Silent Listener: Transcription (optional)
  if (req.method === 'POST' && req.url === '/webhook/silent-listener/transcription') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const params = new URLSearchParams(body);
        const transcriptionText = params.get('TranscriptionText');
        const callSid = params.get('CallSid');
        
        console.log(`📝 TRANSCRIPTION: ${callSid} - ${transcriptionText?.length || 0} chars`);
        
        // Here you could update the existing log entry with the transcription
        // and re-run business intelligence extraction with the real transcript
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (err) {
        console.error('❌ Transcription error:', err.message);
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
  console.log(`🎧 POST /webhook/silent-listener/incoming`);
  console.log(`📝 POST /webhook/silent-listener/recording-status`);
  console.log(`📄 POST /webhook/silent-listener/transcription`);
  console.log(`🤖 Anthropic: ${ANTHROPIC_KEY ? '✅' : '❌ MISSING'}`);
  console.log(`📱 Twilio: ${twilioClient ? '✅' : '⚠️  log only'}`);
  console.log(`👥 Customers: ${customerConfig ? customerConfig.customers.length : 0}\n`);
});

// === SMS FOLLOW-UP AFTER RETELL CALLS ===
// Retell sends post-call data to this webhook
// We extract caller phone and send a follow-up SMS with booking link

async function handleRetellPostCall(body) {
  try {
    const callData = typeof body === 'string' ? JSON.parse(body) : body;
    const callerPhone = callData.from_number || callData.caller_number;
    const transcript = callData.transcript || '';
    const callDuration = callData.call_duration_ms || 0;
    
    // Skip very short calls (spam/hangups) - less than 15 seconds
    if (callDuration < 15000) {
      console.log('⏭️ Skipping SMS - call too short:', callDuration, 'ms');
      return { sent: false, reason: 'call_too_short' };
    }
    
    // Skip if no caller phone
    if (!callerPhone) {
      console.log('⏭️ Skipping SMS - no caller phone number');
      return { sent: false, reason: 'no_phone' };
    }
    
    // Determine if this was a demo/interview call or a customer call
    const isDemo = transcript.toLowerCase().includes('silent ai partner') || 
                   transcript.toLowerCase().includes('interview') ||
                   transcript.toLowerCase().includes('free trial');
    
    let smsMessage;
    if (isDemo) {
      // Demo caller - send booking link
      smsMessage = `Thanks for trying the Silent AI Partner demo! Ready to see a custom version built for YOUR business? Book a free consultation: https://calendly.com/silentaipartner\n\nTry it free for 2 weeks - no commitment. Questions? Reply to this text.\n\n- Wes, Founder`;
    } else {
      // Regular customer call - send confirmation
      smsMessage = `Thanks for calling! Your request has been logged and our team will follow up shortly. If you need immediate help, call us back anytime - we're available 24/7.`;
    }
    
    if (twilioClient) {
      const demoFrom = '+18667821303'; // Main demo line
      await twilioClient.messages.create({
        body: smsMessage,
        from: demoFrom,
        to: callerPhone
      });
      console.log(`📱 SMS follow-up sent to ${callerPhone} (${isDemo ? 'demo' : 'customer'})`);
      return { sent: true, type: isDemo ? 'demo' : 'customer', to: callerPhone };
    } else {
      console.log(`📱 SMS would send to ${callerPhone}: ${smsMessage}`);
      return { sent: false, reason: 'twilio_not_configured', message: smsMessage };
    }
  } catch (err) {
    console.error('❌ SMS follow-up error:', err.message);
    return { sent: false, reason: err.message };
  }
}

