# Beta Customer Onboarding Checklist
Silent AI Partner

---

## 📋 Step-by-Step: "Yes" ➜ "Live"

### Phase 1: Pre-Setup (Day of Signup)

**Customer Provides:**
- [ ] Business name (for greeting)
- [ ] Forwarding phone number (their existing business line)
- [ ] Cal.com calendar link (for booking integration)
- [ ] Cell number for emergency escalations
- [ ] Business hours (for after-hours messaging)
- [ ] Service area/zip codes accepted
- [ ] Top 5 services offered (for AI training context)
- [ ] "Emergency" definition (when to escalate immediately)

**Internal Setup Tasks:**
- [ ] Create customer profile in system
- [ ] Configure Vapi/Retell assistant with business context
- [ ] Set up webhook endpoints for this customer
- [ ] Configure Twilio number for forwarding
- [ ] Test Cal.com webhook integration
- [ ] Set up text notification endpoint
- [ ] Create emergency escalation rules

**Time Estimate:** 30 minutes per customer

---

### Phase 2: Number Setup & Testing

**Configuration Steps:**
1. [ ] Customer sets call forwarding on their business line → Twilio number
2. [ ] Test with customer present: call their line, verify AI answers
3. [ ] Test emergency escalation: say "burst pipe," verify customer receives call
4. [ ] Test booking: attempt to schedule, verify Cal.com receives appointment
5. [ ] Test SMS summary: verify customer receives text after test call

**Test Script (Read to Customer):**
```
"Call your business number right now. Pretend you're a customer with a leaky faucet in your basement. Book an appointment if prompted. Then check your texts—did you get a summary? Check your calendar—did it book?"
```

---

### Phase 3: Go-Live

**Launch Checklist:**
- [ ] Customer confirms forwarding is ACTIVE
- [ ] Customer saved AI number in phone as "Silent AI Partner"
- [ ] Customer received documentation: "What to Expect"
- [ ] Customer added to shared Slack channel (if beta group)
- [ ] Internal: Mark status as "LIVE" in tracker
- [ ] Internal: Schedule first check-in (see below)

**What to Expect (Send to Customer):**
```
Welcome to the Silent AI Partner beta!

What happens now:
- Every call to your business line goes to Ali (your AI receptionist)
- You'll get a text summary within 30 seconds of every call
- Appointments booked show up in your Cal.com immediately
- Emergency calls escalate to your cell immediately
- Regular business hours: Ali handles everything
- After hours: Ali takes messages for next-day callback

First week: I'll check in daily to make sure everything's working.
Questions? Text me directly: [YOUR NUMBER]
```

---

## 📅 First Week Check-In Schedule

### Day 1 (Go-Live Day)
**Time:** End of business day  
**Method:** Quick text

```
"Hey [Name], Ali's been live for a day. How's it going? Any weird calls or questions?"
```

### Day 2-3
**Time:** Mid-day  
**Method:** Text or call

Focus: Technical issues, missed escalations, booking problems

### Day 5 (First Friday)
**Time:** End of week  
**Method:** 10-min phone call

**Questions to ask:**
1. How many calls did Ali handle this week?
2. Any surprises about what customers asked?
3. How are the text summaries working for you?
4. Any appointments booked you would've missed?
5. Any calls that should've escalated but didn't?
6. On a scale of 1-10, how's the experience so far?

### Day 7 (End of First Week)
**Time:** Morning  
**Method:** Email summary

Send: Week 1 Analytics Summary
- Total calls answered
- Appointments booked
- Emergencies escalated
- Missed booking opportunities (if any)

### Day 14 (Week 2 Check-In)
**Time:** Mid-week  
**Method:** Phone call (15 min)

Focus: Usage patterns, feature requests, satisfaction check

---

## 📊 Customer Info Template

Create one per customer:

```markdown
# Customer: [BUSINESS NAME]
**Signup Date:** [DATE]
**Status:** [PREP/LIVE/PENDING/CHURNED]

## Contact Info
- **Owner:** [NAME]
- **Phone:** [CELL]
- **Email:** [EMAIL]
- **Business Line:** [FORWARDING NUMBER]
- **Service Area:** [ZIPS/CITIES]

## Business Context
- **Business Type:** [Plumbing/HVAC/etc]
- **Years in Business:** [X]
- **Solo/Team:** [SOLO/EMPLOYEES]
- **Current Call Handling:** [VOICEMAIL/SELF/ANSWERING SERVICE]

## Configuration
- **Twilio Number:** [ASSIGNED]
- **Cal.com Link:** [URL]
- **Emergency Escalation:** [YES/NO]
- **Emergency Keywords:** [BURST, FLOOD, LEAK, EMERGENCY]
- **Business Hours:** [X AM - X PM]
- **After Hours:** [SCHEDULE/TAKE MESSAGE]

## Services (Top 5)
1. [SERVICE]
2. [SERVICE]
3. [SERVICE]
4. [SERVICE]
5. [SERVICE]

## Notes
- [CUSTOM CONTEXT/NOTES]
```

---

## 🚨 Common Setup Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Calls not forwarding | Customer forgot to activate | Walk them through carrier forwarding code |
| AI not booking | Cal.com webhook not connected | Re-verify webhook URL, test manually |
| No text summaries | SMS endpoint misconfigured | Check Twilio SMS setup, phone number format |
| Emergency not escalating | Keyword not triggering | Add customer's preferred emergency words |
| AI answers but silent | Audio/welcome message missing | Check TTS/voice configuration |
| Double bookings | Cal.com config issue | Ensure buffer times set correctly |
| After-hours calls dropping | Business hours misconfigured | Update hours in Vapi/Retell settings |

---

## ✅ Customer Success Metrics (Track Weekly)

For each beta customer:

```
Week X: [DATE RANGE]
- Total Calls Handled: [X]
- Appointments Booked: [X]
- Emergencies Escalated: [X]
- Missed Calls (failed to answer): [X]
- Customer Satisfaction (1-10): [X]
- Feature Requests: [LIST]
- Issues Reported: [LIST]
```

---

## 🎯 Beta Success Criteria

Customer is considered "successful" if:
- [ ] Active for 30+ days
- [ ] 90%+ call answer rate
- [ ] 1+ booking per week
- [ ] Customer satisfaction 7+/10
- [ ] No critical technical issues unresolved
- [ ] Customer willing to provide testimonial

---

**Last Updated:** February 11, 2026
