# ElevenLabs Flash Research
Reducing Latency: 300ms → 75ms

---

## What Is ElevenLabs Flash?

ElevenLabs Flash is an ultra-low-latency text-to-speech model designed specifically for conversational AI applications.

| Metric | Turbo v2.5 | Flash | Improvement |
|--------|-----------|-------|-------------|
| **Latency** | ~300ms | ~75ms | **75% reduction** |
| **Quality** | Excellent | Very Good | Slight trade-off |
| **Best For** | Premium content | Real-time convos | Conversational AI |

---

## How to Enable Flash Model

### In ElevenLabs Dashboard

1. Go to https://elevenlabs.io/app/voice-lab
2. Select your voice
3. Change model from "eleven_turbo_v2_5" to "eleven_flash_v2_5"
4. Save changes

### In Vapi Configuration

```json
{
  "voice": {
    "provider": "elevenlabs",
    "voiceId": "your-voice-id",
    "model": "eleven_flash_v2_5",
    "speed": 1.0
  }
}
```

### In Retell Configuration

```json
{
  "voice": {
    "model": "eleven_flash_v2_5",
    "voice_id": "your-voice-id"
  }
}
```

---

## API Changes Needed

### Vapi API Update

```javascript
// BEFORE (Turbo)
{
  "voice": {
    "provider": "elevenlabs",
    "voiceId": "Jessica",
    "model": "eleven_turbo_v2_5"
  }
}

// AFTER (Flash)
{
  "voice": {
    "provider": "elevenlabs",
    "voiceId": "Jessica",
    "model": "eleven_flash_v2_5"
  }
}
```

### Direct ElevenLabs API

```bash
# BEFORE
curl -X POST https://api.elevenlabs.io/v1/text-to-speech/VOICE_ID/stream \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, how can I help you today?",
    "model_id": "eleven_turbo_v2_5"
  }'

# AFTER
curl -X POST https://api.elevenlabs.io/v1/text-to-speech/VOICE_ID/stream \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, how can I help you today?",
    "model_id": "eleven_flash_v2_5"
  }'
```

---

## Cost Comparison

| Model | Price per 1K characters | Per 10 min call* | Monthly (100 calls)** |
|-------|----------------------|------------------|----------------------|
| **Turbo v2.5** | $0.30 | ~$0.45 | ~$45 |
| **Flash v2.5** | $0.20 | ~$0.30 | ~$30 |
| **Savings** | **33% cheaper** | **$0.15/call** | **$15/mo** |

*Assumes 1500 characters per 10-min call  
**Assumes 100 calls/month, 10 min average

---

## Step-by-Step Switch Guide

### Step 1: Test Flash Model First

```bash
# Create test audio with Flash
curl -X POST https://api.elevenlabs.io/v1/text-to-speech/VOICE_ID \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, this is Ali from Silent AI Partner. How can I help you today?",
    "model_id": "eleven_flash_v2_5"
  }' \
  --output test-flash.mp3

# Listen to test-flash.mp3
```

### Step 2: Compare Quality

```bash
# Generate same text with Turbo for comparison
curl -X POST https://api.elevenlabs.io/v1/text-to-speech/VOICE_ID \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, this is Ali from Silent AI Partner. How can I help you today?",
    "model_id": "eleven_turbo_v2_5"
  }' \
  --output test-turbo.mp3
```

**Compare:**
- Naturalness of voice
- Speed of response
- Any artifacts or clipping

### Step 3: Update Production Config

**For Vapi:**
```bash
# PATCH request to update assistant
curl -X PATCH https://api.vapi.ai/assistant/$ASSISTANT_ID \
  -H "Authorization: Bearer $VAPI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "voice": {
      "provider": "elevenlabs",
      "voiceId": "your-voice-id",
      "model": "eleven_flash_v2_5"
    }
  }'
```

**For Retell:**
```bash
# Update agent voice settings
curl -X PATCH https://api.retellai.com/retell-llm/$AGENT_ID \
  -H "Authorization: Bearer $RETELL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "voice": {
      "model": "eleven_flash_v2_5",
      "voice_id": "your-voice-id"
    }
  }'
```

### Step 4: Monitor & Validate

**Test calls:**
- [ ] Make test call, measure response time
- [ ] Verify audio quality acceptable
- [ ] Check customer doesn't notice difference
- [ ] Monitor error rates for 24 hours

**Metrics to track:**
- Average TTS latency
- Customer satisfaction scores
- Hang-up rate (shouldn't increase)
- API error rate

### Step 5: Rollback Plan

If issues arise:

```bash
# Revert to Turbo immediately
curl -X PATCH https://api.vapi.ai/assistant/$ASSISTANT_ID \
  -H "Authorization: Bearer $VAPI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "voice": {
      "model": "eleven_turbo_v2_5"
    }
  }'
```

---

## When to Use Flash vs Turbo

### Use Flash When:
- ✅ Low latency is critical (conversational AI)
- ✅ Cost savings matter
- ✅ Call quality is already good
- ✅ Testing shows acceptable audio quality

### Stick With Turbo When:
- ❌ Audio quality degradation is noticeable
- ✅ Premium positioning matters (high-end service)
- ⚠️ Running demo calls where first impression is everything

---

## Known Limitations

1. **Slightly less natural prosody** — Flash prioritizes speed over nuance
2. **Limited voice selection** — Not all voices available on Flash
3. **Newer model** — Less battle-tested than Turbo
4. **Streaming only** — No batch/non-streaming support

---

## Recommended Decision

**For Silent AI Partner: SWITCH TO FLASH**

**Why:**
- 75ms latency makes conversations feel snappy
- Cost savings ($15/mo at scale) add up
- Conversational context masks minor quality differences
- Speed matters more than perfection in phone calls

**Action:** Test Flash this week, switch if quality acceptable.

---

## Resources

- ElevenLabs Models: https://elevenlabs.io/docs/text-to-speech/overview
- Flash API Docs: https://elevenlabs.io/docs/api-reference/text-to-speech
- Vapi Voice Config: https://docs.vapi.ai/api-reference/assistants/update

---

**Last Updated:** February 11, 2026
