# Webhook Format Differences
Vapi vs Retell — Payload Mapping Guide

---

## Overview

If we ever need to switch between Vapi and Retell (or support both), here are the key differences in webhook payloads.

---

## Vapi Webhook Payload Structure

### Conversation Update

```json
{
  "message": {
    "type": "conversation-update",
    "role": "assistant",
    "content": "Let me help you book an appointment.",
    "conversationId": "conv-123-abc",
    "assistant": {
      "id": "91fcdef7-a116-4674-9e07-6cb269c2cd53",
      "name": "Ali"
    },
    "customer": {
      "number": "+15551234567",
      "name": "John Smith"
    }
  },
  "call": {
    "id": "call-456-def",
    "status": "in-progress",
    "startedAt": "2026-02-11T14:30:00Z",
    "duration": 120
  }
}
```

### Function Call (Tool Use)

```json
{
  "message": {
    "type": "function-call",
    "role": "assistant",
    "toolCall": {
      "id": "tool-789",
      "name": "create_booking",
      "arguments": {
        "date": "2026-02-12T10:00:00Z",
        "customer_name": "John Smith",
        "service": "leaky faucet"
      }
    }
  },
  "call": {
    "id": "call-456-def",
    "customer": {
      "number": "+15551234567"
    }
  }
}
```

### Call Ended

```json
{
  "message": {
    "type": "end-of-call-report",
    "role": "assistant"
  },
  "call": {
    "id": "call-456-def",
    "status": "completed",
    "startedAt": "2026-02-11T14:30:00Z",
    "endedAt": "2026-02-11T14:35:00Z",
    "duration": 300,
    "transcript": "Full conversation text here...",
    "recordingUrl": "https://cdn.vapi.ai/recordings/rec-123.mp3",
    "summary": "Customer called about leaky faucet, booked for tomorrow 10am",
    "customer": {
      "number": "+15551234567",
      "name": "John Smith"
    }
  },
  "assistant": {
    "id": "91fcdef7-a116-4674-9e07-6cb269c2cd53",
    "name": "Ali"
  }
}
```

---

## Retell Webhook Payload Structure

### Call Started

```json
{
  "event": "call_started",
  "call_id": "call-abc-123",
  "timestamp": "2026-02-11T14:30:00Z",
  "metadata": {
    "agent_id": "agent-xyz-789",
    "customer_number": "+15551234567"
  }
}
```

### Call Status Update (Transcript Chunk)

```json
{
  "event": "call_transcript",
  "call_id": "call-abc-123",
  "timestamp": "2026-02-11T14:30:15Z",
  "data": {
    "transcript": [
      {
        "role": "agent",
        "content": "Hello, how can I help you today?",
        "timestamp": "2026-02-11T14:30:00Z"
      },
      {
        "role": "user",
        "content": "I have a leaky faucet.",
        "timestamp": "2026-02-11T14:30:05Z"
      }
    ],
    "turns": 2
  }
}
```

### Function Call

```json
{
  "event": "function_call",
  "call_id": "call-abc-123",
  "timestamp": "2026-02-11T14:30:30Z",
  "data": {
    "function": {
      "name": "create_booking",
      "arguments": "{\"date\":\"2026-02-12T10:00:00Z\",\"customer_name\":\"John Smith\",\"service\":\"leaky faucet\"}",
      "id": "func-456"
    },
    "response": null
  }
}
```

### Call Ended

```json
{
  "event": "call_ended",
  "call_id": "call-abc-123",
  "timestamp": "2026-02-11T14:35:00Z",
  "data": {
    "duration": 300,
    "recording_url": "https://cdn.retellai.com/recordings/rec-456.mp3",
    "transcript": [
      {
        "role": "agent",
        "content": "Hello..."
      },
      {
        "role": "user",
        "content": "I have a leaky..."
      }
    ],
    "summary": "Booked appointment for leaky faucet repair",
    "disconnection_reason": "user_hangup",
    "call_cost": {
      "total": 0.08,
      "currency": "USD"
    }
  }
}
```

---

## Field Mapping Between Platforms

| Data Point | Vapi Field | Retell Field | Notes |
|:-----------|:-----------|:-------------|:------|
| **Call ID** | `call.id` | `call_id` | Different naming |
| **Customer Phone** | `call.customer.number` | `metadata.customer_number` | Retell is in metadata |
| **Call Status** | `call.status` | `event` type | Vapi has status field, Retell uses event |
| **Duration** | `call.duration` | `data.duration` | Retell is nested |
| **Transcript** | `call.transcript` | `data.transcript` | Both string arrays |
| **Recording URL** | `call.recordingUrl` | `data.recording_url` | Slightly different naming |
| **Summary** | `call.summary` | `data.summary` | Both automatic summaries |
| **Timestamp** | `call.startedAt` | `timestamp` | ISO8601 format |
| **Function Name** | `message.toolCall.name` | `data.function.name` | Retell uses "function" |
| **Function Args** | `message.toolCall.arguments` | `data.function.arguments` | JSON string vs object |
| **Event Type** | `message.type` | `event` | Different field names |

---

## What Needs to Change If We Switch

### 1. Webhook Route Parsing

**Vapi:**
```javascript
const eventType = req.body.message.type;
const callId = req.body.call.id;
```

**Retell:**
```javascript
const eventType = req.body.event;
const callId = req.body.call_id;
```

### 2. Customer Phone Extraction

**Vapi:**
```javascript
const customerPhone = req.body.call.customer.number;
```

**Retell:**
```javascript
const customerPhone = req.body.metadata?.customer_number || 
                      extractFromTranscript(req.body.data?.transcript);
```

### 3. Transcript Handling

**Vapi:**
```javascript
const transcript = req.body.call.transcript; // Single string
```

**Retell:**
```javascript
const transcript = req.body.data.transcript
  .map(t => `${t.role}: ${t.content}`)
  .join('\n'); // Array, needs transformation
```

### 4. Tool/Function Calling

**Vapi:**
```javascript
if (req.body.message.type === 'function-call') {
  const toolName = req.body.message.toolCall.name;
  const args = req.body.message.toolCall.arguments; // Already parsed
}
```

**Retell:**
```javascript
if (req.body.event === 'function_call') {
  const toolName = req.body.data.function.name;
  const args = JSON.parse(req.body.data.function.arguments); // String, needs parsing
}
```

### 5. End of Call Handling

**Vapi:**
```javascript
if (req.body.message.type === 'end-of-call-report') {
  const recordingUrl = req.body.call.recordingUrl;
  const summary = req.body.call.summary;
  // Save to database
}
```

**Retell:**
```javascript
if (req.body.event === 'call_ended') {
  const recordingUrl = req.body.data.recording_url;
  const summary = req.body.data.summary;
  // Save to database
}
```

---

## Unified Handler Pattern

Write once, support both:

```javascript
// Unified webhook handler
async function handleWebhook(req, res) {
  // Detect platform
  const platform = detectPlatform(req.body);
  
  // Transform to common format
  const normalized = normalizePayload(req.body, platform);
  
  // Process normally
  switch(normalized.eventType) {
    case 'call_started':
      await handleCallStart(normalized);
      break;
    case 'function_call':
      await handleFunctionCall(normalized);
      break;
    case 'call_ended':
      await handleCallEnd(normalized);
      break;
  }
  
  res.status(200).json({ received: true });
}

// Platform detection
function detectPlatform(body) {
  if (body.message?.type) return 'vapi';
  if (body.event) return 'retell';
  return 'unknown';
}

// Normalization
function normalizePayload(body, platform) {
  if (platform === 'vapi') {
    return {
      eventType: body.message.type,
      callId: body.call.id,
      customerPhone: body.call.customer?.number,
      transcript: body.call.transcript,
      recordingUrl: body.call.recordingUrl,
      summary: body.call.summary,
      timestamp: body.call.startedAt,
      duration: body.call.duration,
      functionCall: body.message.type === 'function-call' ? {
        name: body.message.toolCall.name,
        args: body.message.toolCall.arguments
      } : null
    };
  }
  
  if (platform === 'retell') {
    return {
      eventType: body.event,
      callId: body.call_id,
      customerPhone: body.metadata?.customer_number,
      transcript: body.data?.transcript?.map(t => t.content).join(' '),
      recordingUrl: body.data?.recording_url,
      summary: body.data?.summary,
      timestamp: body.timestamp,
      duration: body.data?.duration,
      functionCall: body.event === 'function_call' ? {
        name: body.data.function.name,
        args: JSON.parse(body.data.function.arguments)
      } : null
    };
  }
}
```

---

## Migration Checklist

If switching from Vapi to Retell:

- [ ] Update webhook endpoint to handle Retell format
- [ ] Re-test all tool/function calls
- [ ] Verify transcript handling
- [ ] Update SMS/calendar integrations
- [ ] Test emergency escalation flow
- [ ] Validate recording URLs work
- [ ] Re-run end-to-end tests
- [ ] Update documentation
- [ ] Monitor first 10 calls closely
- [ ] Keep Vapi fallback ready

---

**Last Updated:** February 11, 2026
