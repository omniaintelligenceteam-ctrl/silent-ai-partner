# Auto-Schedule from Calls
**Status:** 🔜 Next up
**Tier:** Receptionist ($297)

Listens to every call, extracts the service needed + preferred time + address, books it in the calendar, texts the crew. Zero human touch.

## How It Works
1. Vapi records call + generates transcript
2. Post-call webhook sends transcript to our agent
3. Agent extracts: service type, date/time preference, customer name/phone, address, urgency
4. Agent books appointment in Cal.com
5. Sends SMS confirmation to customer
6. Sends SMS notification to business owner/tech

## Data Extracted
- Service type (e.g., "water heater install")
- Preferred date/time (e.g., "Thursday morning")
- Customer name + phone (from caller ID + conversation)
- Address
- Urgency level (routine vs emergency)
- Special notes ("dog in backyard", "use side gate")

## Tech Needed
- Vapi webhook (post-call)
- Cal.com integration (free tier)
- Twilio SMS (for confirmations)
- AI agent to parse transcript
