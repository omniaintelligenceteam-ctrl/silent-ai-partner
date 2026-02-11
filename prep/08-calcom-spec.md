# Cal.com Integration Specification
Silent AI Partner — Appointment Booking

---

## What We Need from Cal.com API

### Core Requirements (MVP)

1. **Create bookings** — When customer wants appointment, AI creates it
2. **Check availability** — AI knows open slots before offering times
3. **Cancel/reschedule** — Handle customer changes
4. **Read existing bookings** — Avoid double-booking
5. **Webhook notifications** — Get notified of manual changes

### Extended Requirements (Full Version)

1. **Buffer times** — Add space before/after appointments
2. **Multiple event types** — Emergency vs standard vs quotes
3. **Team scheduling** — Route to right team member
4. **Payment integration** — Pre-payment for certain services
5. **SMS reminders** — Auto-remind customers

---

## Endpoints to Hit

### Authentication

All requests include:
```
Authorization: Bearer {CALCOM_API_KEY}
Content-Type: application/json
```

### 1. Get Available Slots

**Endpoint:** `GET /v1/slots`  
**Purpose:** See open times before offering to customer

**Request:**
```bash
curl -X GET "https://api.cal.com/v1/slots?eventTypeId=123&startTime=2026-02-11T00:00:00Z&endTime=2026-02-18T23:59:59Z" \
  -H "Authorization: Bearer $CALCOM_API_KEY"
```

**Response:**
```json
{
  "slots": {
    "2026-02-11": [
      {"time": "2026-02-11T09:00:00Z"},
      {"time": "2026-02-11T14:00:00Z"}
    ],
    "2026-02-12": [
      {"time": "2026-02-12T10:00:00Z"}
    ]
  }
}
```

**Usage:** AI offers these times to caller

---

### 2. Create Booking

**Endpoint:** `POST /v1/bookings`  
**Purpose:** Actually book the appointment

**Request:**
```bash
curl -X POST "https://api.cal.com/v1/bookings" \
  -H "Authorization: Bearer $CALCOM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "eventTypeId": 123,
    "start": "2026-02-11T14:00:00.000Z",
    "responses": {
      "name": "John Smith",
      "email": "john@example.com",
      "phone": "+15555551234",
      "address": "123 Main St, City",
      "notes": "Leaky faucet in kitchen"
    },
    "timeZone": "America/Los_Angeles",
    "language": "en",
    "title": "Plumbing Service - John Smith",
    "description": "Leaky kitchen faucet, customer available all day"
  }'
```

**Response:**
```json
{
  "booking": {
    "id": 456,
    "uid": "abc-123-xyz",
    "title": "Plumbing Service - John Smith",
    "description": "Leaky kitchen faucet...",
    "startTime": "2026-02-11T14:00:00.000Z",
    "endTime": "2026-02-11T15:00:00.000Z",
    "attendees": [
      {
        "email": "john@example.com",
        "name": "John Smith",
        "phoneNumber": "+15555551234"
      }
    ],
    "user": {
      "name": "Mike the Plumber",
      "email": "mike@plumbing.com"
    },
    "status": "ACCEPTED"
  }
}
```

**Usage:** AI confirms booking to customer

---

### 3. Get Booking

**Endpoint:** `GET /v1/bookings/{bookingId}`  
**Purpose:** Retrieve booking details

**Request:**
```bash
curl -X GET "https://api.cal.com/v1/bookings/456" \
  -H "Authorization: Bearer $CALCOM_API_KEY"
```

**Usage:** Verify booking, show in dashboard

---

### 4. Cancel Booking

**Endpoint:** `DELETE /v1/bookings/{bookingId}`  
**Purpose:** Customer wants to cancel

**Request:**
```bash
curl -X DELETE "https://api.cal.com/v1/bookings/456" \
  -H "Authorization: Bearer $CALCOM_API_KEY" \
  -d '{
    "cancellationReason": "Customer request via AI",
    "cancelledBy": "AI Assistant"
  }'
```

**Usage:** AI handles cancellation requests

---

### 5. Reschedule Booking

**Endpoint:** `PATCH /v1/bookings/{bookingId}`  
**Purpose:** Customer wants different time

**Request:**
```bash
curl -X PATCH "https://api.cal.com/v1/bookings/456" \
  -H "Authorization: Bearer $CALCOM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "start": "2026-02-12T10:00:00.000Z",
    "rescheduleReason": "Customer requested new time"
  }'
```

---

## Webhook Flow

### Cal.com → Our System

**Setup:** Register webhook endpoint in Cal.com settings

**Webhook URL:** `https://your-gateway.com/webhooks/calcom`

**Events We Care About:**
- `BOOKING_CREATED` — Someone booked (direct or via AI)
- `BOOKING_CANCELLED` — Booking cancelled
- `BOOKING_RESCHEDULED` — Time changed
- `MEETING_ENDED` — Appointment completed

### Webhook Payload Structure

```json
{
  "triggerEvent": "BOOKING_CREATED",
  "createdAt": "2026-02-11T14:00:00.000Z",
  "payload": {
    "type": "booking_created",
    "title": "Plumbing Service - John Smith",
    "description": "Leaky kitchen faucet",
    "startTime": "2026-02-11T14:00:00.000Z",
    "endTime": "2026-02-11T15:00:00.000Z",
    "organizer": {
      "name": "Mike the Plumber",
      "email": "mike@plumbing.com"
    },
    "attendees": [
      {
        "email": "john@example.com",
        "name": "John Smith",
        "phoneNumber": "+15555551234"
      }
    ],
    "uid": "abc-123-xyz"
  }
}
```

### What We Do With Webhooks

1. **Sync to customer dashboard** — Show all appointments
2. **Send confirmation SMS** — "You're booked for Tuesday 2pm"
3. **Update AI context** — "You have 3 appointments today"
4. **Trigger follow-ups** — After appointment, send review request

---

## MVP Version vs Full Version

### MVP (Launch Ready)
| Feature | Status | Notes |
|---------|--------|-------|
| Create bookings | ✅ Required | Core functionality |
| Get availability | ✅ Required | Before offering times |
| Read bookings | ✅ Required | Prevent double-booking |
| Webhooks (created) | ✅ Required | Confirmation flow |
| Basic event type | ✅ Required | Single "Service Call" type |

### Full Version (Post-Launch)
| Feature | Status | Notes |
|---------|--------|-------|
| Cancel/reschedule | 📋 Planned | Customer self-service |
| Webhooks (cancelled) | 📋 Planned | Sync cancellations |
| Multiple event types | 📋 Planned | Emergency vs standard |
| Buffer times | 📋 Planned | 15 min between calls |
| Team routing | 📋 Planned | Assign to specific plumber |
| Location buffer | 📋 Planned | Travel time calculation |
| SMS reminders | 📋 Planned | Auto-remind customers |
| Payment hold | 📋 Planned | Deposits for big jobs |

---

## Implementation Order

### Phase 1: MVP (Days 1-3)
1. Set up Cal.com account
2. Create "Service Call" event type
3. Build "get slots" API call
4. Build "create booking" API call
5. Implement BOOKING_CREATED webhook
6. Test end-to-end (AI → booking → confirmation)

### Phase 2: Polish (Days 4-7)
7. Add error handling (unavailable times, conflicts)
8. Build cancellation support
9. Add webhook verification (security)
10. Integrate with SMS notifications
11. Test emergency booking flow

### Phase 3: Full (Weeks 2-3)
12. Multiple event types
13. Buffer time configuration
14. Team member routing
15. Rescheduling flow
16. Analytics/reporting

---

## Estimated Dev Time

| Task | Hours | Notes |
|------|-------|-------|
| API integration (CRUD) | 2-3 | Standard REST calls |
| Webhook implementation | 2 | Payload parsing, security |
| Error handling | 2 | Timeouts, conflicts, retries |
| AI function calling | 3 | Connect AI → Cal.com |
| Testing | 2 | End-to-end validation |
| **MVP Total** | **10-12 hours** | ~2 dev days |
| | | |
| Full integration | +8 hours | Rescheduling, multi-type, etc |
| **Full Total** | **18-20 hours** | ~1 dev week |

**Recommendation:** Build MVP first (launches faster), add full features incrementally.

---

## Environment Variables Needed

```bash
# Cal.com
CALCOM_API_KEY=cal_live_xxxxxxxxxxxx
CALCOM_WEBHOOK_SECRET=whsec_xxxxxxxx

# Event Types (per customer)
CUSTOMER_1_EVENT_TYPE_ID=12345
CUSTOMER_2_EVENT_TYPE_ID=67890
```

---

## Quick Start Code

```javascript
// Example: Get availability and create booking
async function bookAppointment(customer, desiredDate) {
  // 1. Get available slots
  const slots = await fetch(
    `https://api.cal.com/v1/slots?eventTypeId=${EVENT_TYPE_ID}&startTime=${desiredDate}`,
    { headers: { Authorization: `Bearer ${CALCOM_API_KEY}` } }
  );
  
  // 2. Pick first available
  const firstSlot = slots[0];
  
  // 3. Create booking
  const booking = await fetch('https://api.cal.com/v1/bookings', {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${CALCOM_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      eventTypeId: EVENT_TYPE_ID,
      start: firstSlot.time,
      responses: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone
      }
    })
  });
  
  return booking;
}
```

---

**Last Updated:** February 11, 2026
