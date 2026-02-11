# Emergency Routing Logic
Silent AI Partner

---

## Keywords That Trigger Emergency Mode

### Immediate Escalation Triggers

| Keyword/Phrase | Priority | Action |
|---------------|----------|--------|
| "emergency" | P1 | Escalate immediately + SMS |
| "burst pipe" | P1 | Escalate immediately + SMS |
| "flooding" | P1 | Escalate immediately + SMS |
| "water everywhere" | P1 | Escalate immediately + SMS |
| "sewage backup" | P1 | Escalate immediately + SMS |
| "no water" | P2 | Escalate within 2 min |
| "no hot water" | P3 | Offer emergency booking |
| "leak" | P3 | Qualify urgency first |
| "dripping" | P4 | Standard booking flow |

### Priority Definitions

- **P1 (Critical):** Immediate human intervention required
- **P2 (Urgent):** Escalate quickly but can wait 2 minutes
- **P3 (Important):** Offer emergency slot if available
- **P4 (Routine):** Standard scheduling flow

---

## Twilio Call Flow Script

### Call Flow Diagram

```
Caller Dials Business Line
          ↓
    Twilio Receives Call
          ↓
    Forward to AI Gateway
          ↓
      AI Answers
          ↓
    [EMERGENCY DETECTED?]
       ↙ Yes      No ↘
  P1 Check       Continue AI
       ↓              ↓
  Immediate    Appointment
  Escalation   Booking Flow
       ↓              ↓
  Call Owner     Confirm Book
       ↓              ↓
   SMS Alert     Send Confirm
       ↓              ↓
   [Handled]   [Complete]
```

### Twilio Configuration

```xml
<!-- TWIML for initial call handling -->
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <!-- Fork call: AI answers + Monitor for emergency -->
  <Dial>
    <Number url="https://your-gateway.com/emergency-check">
      ${AI_GATEWAY_NUMBER}
    </Number>
  </Dial>
  
  <!-- If emergency detected, also call owner -->
  <Dial>
    <Number>
      ${OWNER_CELL_NUMBER}
    </Number>
  </Dial>
</Response>
```

### Emergency Detection Script

```javascript
// Pseudocode for emergency detection
async function handleCall(callData) {
  const transcript = await transcribe(callData.audio);
  
  // Check for emergency keywords
  const emergencyKeywords = ['emergency', 'burst', 'flooding', 'sewage'];
  const isEmergency = emergencyKeywords.some(kw => 
    transcript.toLowerCase().includes(kw)
  );
  
  if (isEmergency) {
    // Immediate escalation
    await escalateEmergency({
      callId: callData.id,
      caller: callData.from,
      summary: transcript,
      urgency: 'CRITICAL'
    });
    
    return { action: 'ESCALATE_IMMEDIATE' };
  }
  
  // Continue normal AI flow
  return { action: 'CONTINUE_AI' };
}
```

---

## Escalation Paths

### Path 1: Immediate Escalation (P1)

1. **Caller is on hold while AI:**
   - "Let me connect you with the on-call technician immediately."

2. **Simultaneous actions:**
   - Call owner/vendor cell (Simultaneous dial)
   - Send SMS to owner/vendor: "🚨 EMERGENCY CALL: [Number]. Burst pipe reported. Calling you now."
   - If no answer in 30 seconds, call backup number
   - If no backup answer, take message with callback commitment

3. **Fallback if owner unreachable:**
   - "I couldn't reach the technician immediately. Let me take your details and ensure they call you back within 15 minutes. What's the best number?"

### Path 2: Urgent Escalation (P2)

1. **AI attempts to book emergency slot:**
   - "We have an emergency appointment available at [time]. I can also page the technician."

2. **If customer agrees:**
   - Book slot
   - Send SMS to owner: "⚠️ URGENT: Emergency booking at [time]. Customer: [name]. Call if questions: [number]"

3. **If customer needs immediate:**
   - Escalate to Path 1

### Path 3: Important (P3)

1. **AI offers quick appointment:**
   - "I can get someone there today at [earliest available]. Is that urgent enough, or do you need emergency service?"

2. **If yes to emergency:**
   - Escalate appropriately

---

## SMS Notification Templates

### Template 1: Critical Emergency (P1)

```
🚨 EMERGENCY CALL 🚨

Caller: {{CALLER_NUMBER}}
Issue: {{EMERGENCY_TYPE}}
Location: {{ADDRESS}} (if provided)

ACTION: Call immediately
Time: {{TIMESTAMP}}

Reply 1 to confirm you're handling
Reply 2 if you need backup dispatched
```

### Template 2: Urgent Escalation (P2)

```
⚠️ URGENT: {{CALLER_NAME}}

Issue: {{ISSUE_SUMMARY}}
Phone: {{CALLER_NUMBER}}
Status: Waiting for callback

Customer expecting call within 15 min.

View details: {{DASHBOARD_LINK}}
```

### Template 3: Emergency Booked (P3)

```
✅ Emergency booking confirmed

Customer: {{CALLER_NAME}}
Time: {{APPOINTMENT_TIME}}
Issue: {{ISSUE_SUMMARY}}

Customer notified. See you there.

{{CALENDAR_LINK}}
```

### Template 4: Missed Emergency (Owner Unavailable)

```
❌ MISSED EMERGENCY

Caller: {{CALLER_NUMBER}}
Time: {{CALL_TIME}}
Issue: {{SUMMARY}}

AI took message. Customer expects callback within 30 min.

Listen to recording: {{RECORDING_LINK}}
```

---

## Implementation Logic

### Decision Tree

```
Caller: "I have a burst pipe!"
  ↓
AI detects "burst pipe" → P1
  ↓
┌─────────────────────────────────────┐
│ Action: Escalate Immediate          │
├─────────────────────────────────────┤
│ 1. Inform caller:                     │
│    "Connecting you now..."           │
│                                     │
│ 2. Simultaneous:                    │
│    a. Call owner cell                │
│    b. Send P1 SMS                    │
│    c. Log incident                   │
│                                     │
│ 3. If owner answers:                │
│    - Bridge calls                    │
│    - AI drops off                    │
│                                     │
│ 4. If owner no answer (30s):       │
│    - Try backup #1                   │
│    - If no answer, take message      │
│    - Send "missed emergency" SMS     │
│    - Commit callback time to caller  │
└─────────────────────────────────────┘
```

### Code Implementation

```javascript
// Emergency routing handler
async function routeEmergency(transcript, callerInfo) {
  // Determine priority
  const priority = assessPriority(transcript);
  
  switch(priority) {
    case 'P1':
      return await handleCriticalEmergency(callerInfo, transcript);
    case 'P2':
      return await handleUrgentEmergency(callerInfo, transcript);
    case 'P3':
      return await handleImportantIssue(callerInfo, transcript);
    default:
      return await handleStandardInquiry(callerInfo, transcript);
  }
}

async function handleCriticalEmergency(caller, summary) {
  // 1. Attempt owner contact
  const ownerCall = await twilio.calls.create({
    to: OWNER_PHONE,
    from: TWILIO_NUMBER,
    url: 'https://your-gateway.com/emergency-bridge',
    statusCallback: 'https://your-gateway.com/owner-status'
  });
  
  // 2. Send immediate SMS
  await twilio.messages.create({
    to: OWNER_PHONE,
    from: TWILIO_SMS_NUMBER,
    body: formatEmergencySMS(caller, summary)
  });
  
  // 3. Set timeout for fallback
  setTimeout(async () => {
    if (ownerCall.status !== 'completed') {
      await escalateToBackup(caller, summary);
    }
  }, 30000); // 30 seconds
  
  return { status: 'ESCALATING', priority: 'P1' };
}
```

---

## Configuration Variables

```javascript
// Emergency routing config
const EMERGENCY_CONFIG = {
  keywords: {
    P1: ['emergency', 'burst', 'flooding', 'sewage', 'water everywhere'],
    P2: ['no water', 'no hot water', 'heating broken'],
    P3: ['leak', 'clogged', 'not draining']
  },
  
  contacts: {
    primary: process.env.OWNER_PHONE,
    backup1: process.env.BACKUP_1_PHONE,
    backup2: process.env.BACKUP_2_PHONE,
    afterHours: process.env.ON_CALL_PHONE
  },
  
  timeouts: {
    escalation: 30000,   // 30s to answer
    callback: 900000,    // 15 min callback promise
    backup: 60000        // 1 min before trying backup
  }
};
```

---

## Testing Emergency Flow

```bash
# Test script for emergency routing
curl -X POST https://your-gateway.com/test/emergency \
  -H "Content-Type: application/json" \
  -d '{
    "scenario": "burst_pipe",
    "caller": "+15555551234",
    "transcript": "Hello, I have a burst pipe in my basement and water is everywhere!"
  }'

# Expected:
# - SMS sent to owner phone
# - Simultaneous call initiated
# - Log entry created
```

---

**Last Updated:** February 11, 2026
