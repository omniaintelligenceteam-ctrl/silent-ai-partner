# Emergency Call Routing
**Status:** ✅ LIVE (basic)
**Tier:** Receptionist ($297)

Detects emergency calls by keywords and tone. Routes immediately to the business owner's cell or on-call tech. No delay.

## Emergency Triggers
- Keywords: "burst pipe", "flooding", "no heat", "gas smell", "electrical fire", "water everywhere"
- Tone: urgency, panic, raised voice
- Time: after-hours calls about active problems

## Routing Logic
1. AI recognizes emergency
2. "I understand this is urgent. Let me get someone on the line right away."
3. Warm transfers to on-call number
4. Simultaneously texts owner: "EMERGENCY: Burst pipe at 123 Oak St. Customer: John (480) 555-1234. Transferring now."
5. If no answer in 30 seconds, tries backup number
6. If still no answer, takes detailed info and marks URGENT in system
