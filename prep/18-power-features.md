# Power Feature Roadmap
Silent AI Partner — Build Order

---

## Three Features to Build First

| Priority | Feature | Why First? | Customer Value |
|:--------:|:--------|:-----------|:---------------|
| **1** | **Auto-Schedule** | Core differentiator | Captures bookings 24/7 |
| **2** | **Auto-Quote** | Revenue accelerator | Pre-qualifies leads |
| **3** | **Auto-Follow-Up** | Retention multiplier | Converts missed opportunities |

---

## Feature #1: Auto-Schedule

### What It Is
AI books appointments directly into customer's calendar without human intervention.

### Why First
- **Already partially working** (Cal.com integration exists)
- **Most visible customer benefit** — "it books while I work"
- **Proven ROI** — Each booking = $350+ revenue
- **Technical foundation** for other features

### Implementation Steps

| Step | Task | Status | Time |
|:----:|:-----|:------:|:----:|
| 1 | Complete Cal.com API integration | ⚠️ In Progress | 2 days |
| 2 | Add buffer time configuration | 📋 Planned | 1 day |
| 3 | Support multiple event types | 📋 Planned | 2 days |
| 4 | Add timezone handling | 📋 Planned | 1 day |
| 5 | Test emergency vs standard booking | ✅ Ready | — |
| 6 | Sync booking status to dashboard | 📋 Planned | 1 day |

### Dependencies
- Cal.com API access
- Customer calendar permissions
- Business hours configuration per customer

### Quick Win vs Heavy Lift
| Aspect | Assessment |
|:-------|:-----------|
| **Quick Win** | Basic Cal.com integration (existing) |
| **Heavy Lift** | Multi-calendar, team routing, travel time |
| **Recommendation** | Ship MVP first, expand later |

---

## Feature #2: Auto-Quote

### What It Is
AI provides instant price estimates based on service type, then books appropriate appointment tier.

### Why Second
- **Pre-qualifies leads** — filters price shoppers vs serious customers
- **Sets expectations** — reduces no-shows from sticker shock
- **Enables premium positioning** — "I already know the price"
- **Increases booking confidence** — customer commits knowing cost

### Implementation Steps

| Step | Task | Status | Time |
|:----:|:-----|:------:|:----:|
| 1 | Build quote database per service | 📋 Planned | 2 days |
| 2 | Add quote questions to AI flow | 📋 Planned | 1 day |
| 3 | Create service → price mapping | 📋 Planned | 1 day |
| 4 | Add "estimate" vs "exact" language | 📋 Planned | 1 day |
| 5 | Tie quotes to appointment type | 📋 Planned | 1 day |
| 6 | Add quote to text summary | 📋 Planned | 1 day |

### Sample Quote Logic

```
Service: Leaking faucet
  → Quick diagnostic question
  → "Most faucet repairs run $150-250 depending on parts. 
      I can book a standard service call to get you fixed."

Service: Water heater replacement
  → "Water heater replacements typically range $1,200-2,500 
      depending size and type. I'll book a free estimate."
```

### Dependencies
- Customer-specific pricing configuration
- Service type mapping
- Quote → booking tier logic

### Quick Win vs Heavy Lift
| Aspect | Assessment |
|:-------|:-----------|
| **Quick Win** | Basic price ranges by service category |
| **Heavy Lift** | Dynamic pricing, parts integration, estimates |
| **Recommendation** | Start with ranges, add precision later |

---

## Feature #3: Auto-Follow-Up

### What It Is
AI automatically reaches out to leads who didn't book, with personalized follow-up.

### Why Third
- **Recaptures lost opportunities** — 60-70% of calls don't book immediately
- **Differentiates from competition** — no one else does this
- **Scales automatically** — runs without human effort
- **Drives ROI** — every recaptured lead = $350

### Implementation Steps

| Step | Task | Status | Time |
|:----:|:-----|:------:|:----:|
| 1 | Identify non-booking calls | 📋 Planned | 1 day |
| 2 | Build SMS follow-up templates | 📋 Planned | 1 day |
| 3 | Create timing rules (24hr, 72hr, 7day) | 📋 Planned | 1 day |
| 4 | Add email follow-up option | 📋 Planned | 2 days |
| 5 | Build escalation for hot leads | 📋 Planned | 1 day |
| 6 | Track follow-up conversion | 📋 Planned | 1 day |

### Follow-Up Sequence

```
Call ends without booking:

Hour 2: AI sends SMS
  "Hi [Name], this is Ali from [Business]. 
   Thanks for calling earlier. Just wanted to check—
   did you need help scheduling that [service]? 
   Reply BOOK and I can get you on the calendar."

Day 3 (if no reply): AI sends email
  Subject: Quick follow-up on your [service] call
  Body: [Personalized message + booking link]

Day 7 (if still no reply): Final touch
  SMS: "Still need help with [service]? 
        If you've found someone else, no worries. 
        Just let us know. —Ali"
```

### Dependencies
- SMS/email sending infrastructure
- Customer opt-in consent
- Call outcome tracking (booked vs not booked)
- CRM integration for lead tracking

### Quick Win vs Heavy Lift
| Aspect | Assessment |
|:-------|:-----------|
| **Quick Win** | SMS 24-hour follow-up only |
| **Heavy Lift** | Multi-channel sequences, personalization, opt-out |
| **Recommendation** | Ship SMS 24hr first, add sophistication later |

---

## Implementation Timeline

### Week 1-2: Auto-Schedule MVP
```
Days 1-2: Complete Cal.com integration
Days 3-4: Testing with beta customers
Days 5-6: Buffer time and multi-slot
Days 7-8: Dashboard sync
Days 9-10: Beta launch with 3 customers
```

### Week 3-4: Auto-Quote V1
```
Days 1-2: Build quote database
Days 3-4: Map services to prices
Days 5-6: Integrate into AI conversation
Days 7-8: Testing + refinement
Days 9-10: Deploy to beta group
```

### Week 5-6: Auto-Follow-Up MVP
```
Days 1-2: Non-booking call detection
Days 3-4: SMS template + timing
Days 5-6: Testing follow-up flows
Days 7-8: Email as secondary channel
Days 9-10: Launch to beta customers
```

---

## Dependencies Between Features

```
Auto-Schedule (Foundation)
    ↓
    ├─→ Enables Auto-Quote (needs booking infrastructure)
    └─→ Enables Auto-Follow-Up (knows if booking succeeded)
```

**Critical Path:**
1. Auto-Schedule complete before Auto-Quote
2. Auto-Schedule complete before Auto-Follow-Up
3. Auto-Quote and Auto-Follow-Up can be parallel

---

## Why These Three First

### The Thesis

| Feature | Solves | Revenue Impact |
|:--------|:-------|:---------------|
| **Auto-Schedule** | "I miss calls while working" | +3-5 bookings/week |
| **Auto-Quote** | "Wasted trips for price shoppers" | +30% conversion rate |
| **Auto-Follow-Up** | "People called but didn't book" | +2-3 recaptures/week |

**Combined Effect:**
- Without these: 40% call capture rate
- With these: 70%+ capture rate
- **Net effect:** 10+ more jobs/month = $3,500+ revenue per customer

### Competitive Moat

| Feature | Competitor A | Competitor B | **Silent AI Partner** |
|:--------|:----------:|:----------:|:---------------------:|
| Auto-Schedule | ❌ Messages only | ✅ Basic | ✅ **Full booking** |
| Auto-Quote | ❌ None | ❌ None | ✅ **Unique** |
| Auto-Follow-Up | ❌ None | ❌ None | ✅ **Unique** |

**Position:** First with true end-to-end automation.

---

## Post-Launch Features (Phase 2)

After the big three are stable:

| # | Feature | Why | Time |
|:-:|:--------|:----|:----:|
| 4 | Review Requests | Post-appointment follow-up | 1 week |
| 5 | Spam Filtering | Reduce noise | 3 days |
| 6 | Multi-Language Support | Spanish, etc. | 2 weeks |
| 7 | Payment Processing | Collect deposits | 2 weeks |
| 8 | Team Routing | Assign to specific plumbers | 1 week |
| 9 | SMS Two-Way | Reply to SMS summaries | 3 days |
| 10 | Analytics Dashboard | Customer insights | 1 week |

---

**Last Updated:** February 11, 2026
