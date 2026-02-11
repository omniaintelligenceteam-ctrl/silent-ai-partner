# Webhook Health Monitor
Silent AI Partner — Testing & Troubleshooting Guide

---

## 🧪 Quick Test Commands

### Test Vapi Endpoint Health

```bash
# Vapi Inbound Call Webhook
curl -X POST https://your-gateway.com/vapi/inbound \
  -H "Content-Type: application/json" \
  -d '{"message":{"type":"conversation-update","role":"assistant"}}'

# Expected Response: 200 OK with JSON
# {"status": "received", "type": "conversation-update"}
```

### Test Retell Endpoint Health

```bash
# Retell Inbound Call Webhook
curl -X POST https://your-gateway.com/retell/inbound \
  -H "Content-Type: application/json" \
  -H "x-retell-signature: test" \
  -d '{"event":"call_started","call_id":"test-123"}'

# Expected Response: 200 OK with JSON
# {"status": "received", "event": "call_started"}
```

### Test Cal.com Webhook

```bash
# Cal.com Booking Webhook
curl -X POST https://your-gateway.com/calcom/booking \
  -H "Content-Type: application/json" \
  -d '{"type":"BOOKING_CREATED","payload":{"booking":{"id":123,"startTime":"2026-02-11T10:00:00Z"}}}'

# Expected Response: 200 OK
# {"status": "booking_processed", "booking_id": 123}
```

### Test Twilio SMS Endpoint

```bash
# Twilio SMS Summary Endpoint
curl -X POST https://your-gateway.com/twilio/sms \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d 'From=%2B15551234567&To=%2B15559876543&Body=Test+summary+message'

# Expected Response: 200 OK with TwiML
# <Response></Response>
```

### Test Emergency Escalation

```bash
# Emergency Escalation Webhook
curl -X POST https://your-gateway.com/escalate \
  -H "Content-Type: application/json" \
  -d '{"call_id":"test-456","urgency":"emergency","summary":"Burst pipe in basement","caller":"+15551234567"}'

# Expected Response: 200 OK
# {"status": "escalated", "escalation_id": "esc-789"}
```

---

## 📊 Expected Response Reference

| Endpoint | Method | Expected Status | Expected Body | Timeout |
|----------|--------|-----------------|---------------|---------|
| `/vapi/inbound` | POST | 200 OK | JSON with status | 5s |
| `/retell/inbound` | POST | 200 OK | JSON with status | 5s |
| `/calcom/booking` | POST | 200 OK | JSON confirmation | 5s |
| `/twilio/sms` | POST | 200 OK | TwiML | 5s |
| `/escalate` | POST | 200 OK | JSON with status | 3s |
| `/health` | GET | 200 OK | `{"status": "ok"}` | 2s |

---

## 🔧 Troubleshooting Guide

### Issue: Endpoint Returns 404

```bash
# Check if service is running
curl https://your-gateway.com/health

# If 404 or timeout:
# 1. Check if server is running
# 2. Check DNS/proxy configuration
# 3. Verify path is correct
```

**Fixes:**
1. Verify service is running: `pm2 status` or `systemctl status`
2. Check nginx config: `sudo nginx -t`
3. Verify route exists in application code
4. Check Tailscale tunnel is active

---

### Issue: Endpoint Returns 500

```bash
# Check application logs
# For PM2:
pm2 logs

# For systemd:
sudo journalctl -u your-service -f

# For Docker:
docker logs container-name
```

**Common Causes:**
1. Database connection failure
2. Missing environment variables
3. JSON parsing error (malformed payload)
4. Missing API keys (Vapi, Retell, Twilio)

---

### Issue: Endpoint Returns 401/403

**For Vapi:** Check `X-Vapi-Signature` header validation

**For Retell:** Check `x-retell-signature` header validation

**For Twilio:** Check Twilio signature validation

```bash
# Verify your auth tokens match
echo $VAPI_API_KEY
echo $RETELL_API_KEY
echo $TWILIO_AUTH_TOKEN
```

---

### Issue: SMS Not Sending

```bash
# Test Twilio directly
curl -X POST https://api.twilio.com/2010-04-01/Accounts/$TWILIO_SID/Messages.json \
  --data-urlencode "From=$TWILIO_PHONE" \
  --data-urlencode "To=+15551234567" \
  --data-urlencode "Body=Test message" \
  -u "$TWILIO_SID:$TWILIO_TOKEN"
```

**Checklist:**
- [ ] Twilio account has balance/credits
- [ ] From number is valid and verified
- [ ] To number is not on DNC list
- [ ] Message body is under 1600 chars
- [ ] No special characters breaking encoding

---

### Issue: Cal.com Not Booking

```bash
# Test Cal.com API directly
curl -H "Authorization: Bearer $CALCOM_API_KEY" \
  https://api.cal.com/v1/bookings
```

**Checklist:**
- [ ] API key is valid and not expired
- [ ] Event type ID exists
- [ ] Time slot is available (not double-booked)
- [ ] User timezone provided correctly
- [ ] Buffer time not causing conflicts

---

### Issue: Vapi/Retell Timeout

**Check latency:**
```bash
# Ping test
curl -w "@curl-format.txt" -o /dev/null -s https://your-gateway.com/health

# curl-format.txt:
# time_namelookup: %{time_namelookup}\n
# time_connect: %{time_connect}\n
# time_total: %{time_total}\n
```

**Causes:**
- Slow database queries
- Synchronous API calls blocking response
- High server load
- Network latency

---

## 🔍 Diagnostic Script

Save as `health_check.sh`:

```bash
#!/bin/bash

GATEWAY_URL="https://ubuntu-s-1vcpu-1gb-sfo3-01.tail0fbff3.ts.net"

echo "=== Silent AI Partner Health Check ==="
echo "Time: $(date)"
echo ""

# Check gateway health
echo "1. Checking Gateway Health..."
response=$(curl -s -o /dev/null -w "%{http_code}" "$GATEWAY_URL/health" 2>/dev/null)
if [ "$response" == "200" ]; then
    echo "   ✅ Gateway is UP"
else
    echo "   ❌ Gateway returned $response"
fi
echo ""

# Check Vapi
echo "2. Checking Vapi Webhook..."
vapi_response=$(curl -s -X POST "$GATEWAY_URL/v1/inbound" \
  -H "Content-Type: application/json" \
  -d '{"test":true}' 2>/dev/null)
echo "   Response: $vapi_response"
echo ""

# Check Tailscale
echo "3. Checking Tailscale..."
if command -v tailscale &> /dev/null; then
    tailscale_status=$(tailscale status --json 2>/dev/null | grep -o '"Self":{"ID"' | head -1)
    if [ ! -z "$tailscale_status" ]; then
        echo "   ✅ Tailscale connected"
    else
        echo "   ❌ Tailscale not connected"
    fi
else
    echo "   ⚠️  Tailscale not installed"
fi
echo ""

# Check services
echo "4. Checking Services..."
if pgrep -f "node.*api\|python.*api" > /dev/null; then
    echo "   ✅ API process running"
else
    echo "   ❌ API process not found"
fi
echo ""

echo "=== Health Check Complete ==="
```

---

## 📞 Emergency Contacts

| Service | Status Page | Support |
|---------|-------------|---------|
| Vapi | https://status.vapi.ai | support@vapi.ai |
| Retell | https://status.retellai.com | support@retellai.com |
| Twilio | https://status.twilio.com | support@twilio.com |
| Cal.com | https://status.cal.com | support@cal.com |
| Tailscale | https://status.tailscale.com | support@tailscale.com |

---

## 🚨 Escalation Checklist

If health checks fail:

1. [ ] Run diagnostic script above
2. [ ] Check status pages for third-party outages
3. [ ] Verify environment variables loaded
4. [ ] Check disk space: `df -h`
5. [ ] Check memory: `free -h`
6. [ ] Restart services: `pm2 restart all` or `sudo systemctl restart`
7. [ ] Review recent logs for errors
8. [ ] Check Tailscale tunnel: `tailscale status`
9. [ ] If all else fails: restart server

---

**Last Updated:** February 11, 2026
