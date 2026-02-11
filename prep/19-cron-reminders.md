# Auto-Reminder / Cron Setup
Silent AI Partner — Monitoring & Summary Alerts

---

## Morning Health Check Script

### Purpose
Daily automated check of critical infrastructure before business hours.

### What It Checks
1. Webhook endpoint health
2. Vapi account balance
3. Retell status (if used)
4. Tailscale connectivity
5. Twilio balance
6. Cal.com API availability

### Script: `morning_check.sh`

```bash
#!/bin/bash

# Silent AI Partner - Morning Health Check
# Run daily at 7:00 AM (before business hours)

SCRIPT_DIR="/root/.openclaw/workspace/silent-ai-partner"
LOG_FILE="$SCRIPT_DIR/logs/health-$(date +%Y%m%d).log"
ALERT_PHONE="$OWNER_PHONE"  # Your phone number for alerts

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================" | tee -a $LOG_FILE
echo "Silent AI Partner Health Check" | tee -a $LOG_FILE
echo "Date: $(date)" | tee -a $LOG_FILE
echo "========================================" | tee -a $LOG_FILE
echo "" | tee -a $LOG_FILE

# Track status
ERRORS=0
WARNINGS=0

# 1. Check Gateway Health
echo "[1/6] Checking Gateway..." | tee -a $LOG_FILE
GATEWAY_URL="https://ubuntu-s-1vcpu-1gb-sfo3-01.tail0fbff3.ts.net"
response=$(curl -s -o /dev/null -w "%{http_code}" "$GATEWAY_URL/health" 2>/dev/null)
if [ "$response" == "200" ]; then
    echo -e "${GREEN}✓ Gateway is UP${NC}" | tee -a $LOG_FILE
else
    echo -e "${RED}✗ Gateway returned HTTP $response${NC}" | tee -a $LOG_FILE
    ((ERRORS++))
fi
echo "" | tee -a $LOG_FILE

# 2. Check Vapi Balance
echo "[2/6] Checking Vapi account..." | tee -a $LOG_FILE
if [ -n "$VAPI_API_KEY" ]; then
    # Vapi doesn't have a direct balance API; check assistant exists
    assistant_response=$(curl -s -X GET "https://api.vapi.ai/assistant/91fcdef7-a116-4674-9e07-6cb269c2cd53" \
        -H "Authorization: Bearer $VAPI_API_KEY" \
        -H "Content-Type: application/json" 2>/dev/null | head -c 100)
    if [[ "$assistant_response" == *"id"* ]]; then
        echo -e "${GREEN}✓ Vapi API accessible${NC}" | tee -a $LOG_FILE
    else
        echo -e "${YELLOW}⚠ Vapi API check inconclusive${NC}" | tee -a $LOG_FILE
        ((WARNINGS++))
    fi
else
    echo -e "${YELLOW}⚠ VAPI_API_KEY not set${NC}" | tee -a $LOG_FILE
    ((WARNINGS++))
fi
echo "" | tee -a $LOG_FILE

# 3. Check Twilio Balance
echo "[3/6] Checking Twilio balance..." | tee -a $LOG_FILE
if [ -n "$TWILIO_SID" ] && [ -n "$TWILIO_TOKEN" ]; then
    balance_response=$(curl -s "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_SID/Usage/Records.json?Category=totalprice&StartDate=$(date +%Y-%m-01)" \
        -u "$TWILIO_SID:$TWILIO_TOKEN" 2>/dev/null)
    if [[ "$balance_response" == *"usage_records"* ]]; then
        echo -e "${GREEN}✓ Twilio API accessible${NC}" | tee -a $LOG_FILE
    else
        echo -e "${YELLOW}⚠ Twilio API check failed${NC}" | tee -a $LOG_FILE
        ((WARNINGS++))
    fi
else
    echo -e "${YELLOW}⚠ Twilio credentials not set${NC}" | tee -a $LOG_FILE
    ((WARNINGS++))
fi
echo "" | tee -a $LOG_FILE

# 4. Check Tailscale
echo "[4/6] Checking Tailscale..." | tee -a $LOG_FILE
if command -v tailscale &> /dev/null; then
    if tailscale status &> /dev/null; then
        echo -e "${GREEN}✓ Tailscale connected${NC}" | tee -a $LOG_FILE
    else
        echo -e "${RED}✗ Tailscale NOT connected${NC}" | tee -a $LOG_FILE
        ((ERRORS++))
    fi
else
    echo -e "${YELLOW}⚠ Tailscale not installed${NC}" | tee -a $LOG_FILE
    ((WARNINGS++))
fi
echo "" | tee -a $LOG_FILE

# 5. Check disk space
echo "[5/6] Checking disk space..." | tee -a $LOG_FILE
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -lt 80 ]; then
    echo -e "${GREEN}✓ Disk space OK (${DISK_USAGE}%)${NC}" | tee -a $LOG_FILE
else
    echo -e "${RED}✗ Disk space critical (${DISK_USAGE}%)${NC}" | tee -a $LOG_FILE
    ((ERRORS++))
fi
echo "" | tee -a $LOG_FILE

# 6. Check memory
echo "[6/6] Checking memory..." | tee -a $LOG_FILE
MEM_AVAILABLE=$(free | awk '/Mem:/ {print $7/$2 * 100.0}' | cut -d. -f1)
if [ "$MEM_AVAILABLE" -gt 20 ]; then
    echo -e "${GREEN}✓ Memory OK (${MEM_AVAILABLE}% available)${NC}" | tee -a $LOG_FILE
else
    echo -e "${YELLOW}⚠ Memory low (${MEM_AVAILABLE}% available)${NC}" | tee -a $LOG_FILE
    ((WARNINGS++))
fi
echo "" | tee -a $LOG_FILE

# Summary
echo "========================================" | tee -a $LOG_FILE
echo "Health Check Summary" | tee -a $LOG_FILE
echo "========================================" | tee -a $LOG_FILE

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ All systems operational${NC}" | tee -a $LOG_FILE
    STATUS="healthy"
else
    echo -e "${RED}✗ Found $ERRORS errors, $WARNINGS warnings${NC}" | tee -a $LOG_FILE
    STATUS="issues"
fi

echo "" | tee -a $LOG_FILE
echo "Log saved to: $LOG_FILE" | tee -a $LOG_FILE

# Send SMS summary if Twilio configured
if [ -n "$TWILIO_SID" ] && [ -n "$ALERT_PHONE" ] && [ "$STATUS" != "healthy" ]; then
    curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_SID/Messages.json" \
        --data-urlencode "From=$TWILIO_PHONE" \
        --data-urlencode "To=$ALERT_PHONE" \
        --data-urlencode "Body=SAI Health Check: $STATUS. $ERRORS errors. Check logs: $(date +%Y-%m-%d)" \
        -u "$TWILIO_SID:$TWILIO_TOKEN" > /dev/null 2>&1
fi

exit $ERRORS
```

### Installation

```bash
# Make executable
chmod +x /root/.openclaw/workspace/silent-ai-partner/scripts/morning_check.sh

# Add to crontab (runs at 7:00 AM daily)
crontab -e
# Add: 0 7 * * * /root/.openclaw/workspace/silent-ai-partner/scripts/morning_check.sh
```

---

## Weekly Summary Script

### Purpose
Weekly performance summary for business review.

### What It Reports
1. Total calls handled
2. Appointments booked
3. Emergency escalations
4. Average call duration
5. Missed/failed calls
6. Conversion rate

### Script: `weekly_summary.sh`

```bash
#!/bin/bash

# Silent AI Partner - Weekly Summary Report
# Run every Monday at 8:00 AM

REPORT_DATE=$(date -d "last week" +"%Y-%m-%d")
END_DATE=$(date +"%Y-%m-%d")

# Generate summary (customize with your DB queries)
cat << EOF

SILENT AI PARTNER - WEEKLY SUMMARY
==================================
Week: $REPORT_DATE to $END_DATE
Generated: $(date)

METRICS
-------
Total Calls Handled:    [PULL FROM DB]
Appointments Booked:    [PULL FROM DB]
Emergency Escalations:  [PULL FROM DB]
Average Call Duration:  [PULL FROM DB]
Failed/Timeout Calls:   [PULL FROM DB]

CONVERSION
----------
Booking Rate: [CALC FROM DB]
Revenue Estimate: [CALC FROM DB]

TOP CUSTOMERS
-------------
1. [CUSTOMER] - [X] calls, [Y] bookings
2. [CUSTOMER] - [X] calls, [Y] bookings
3. [CUSTOMER] - [X] calls, [Y] bookings

ACTIONS
-------
- [ ] Review any failed calls
- [ ] Follow up with customers needing support
- [ ] Plan outreach for slow week

EOF
```

### Installation

```bash
# Install to crontab
crontab -e
# Add: 0 8 * * 1 /path/to/weekly_summary.sh | mail -s "SAI Weekly Report" you@email.com
```

---

## Crontab Configuration

### Recommended Schedule

```bash
# Edit crontab
crontab -e

# Morning health check (7:00 AM daily)
0 7 * * * /root/.openclaw/workspace/silent-ai-partner/scripts/morning_check.sh >> /var/log/sai-health.log 2>&1

# Weekly summary (Monday 8:00 AM)
0 8 * * 1 /root/.openclaw/workspace/silent-ai-partner/scripts/weekly_summary.sh

# Monthly revenue tracking (1st of month, 9:00 AM)
0 9 1 * * /root/.openclaw/workspace/silent-ai-partner/scripts/monthly_metrics.sh

# Twilio balance check (daily at 6:00 AM - warn if low)
0 6 * * * /root/.openclaw/workspace/silent-ai-partner/scripts/check_balances.sh

# Log rotation (weekly, Sunday midnight)
0 0 * * 0 /root/.openclaw/workspace/silent-ai-partner/scripts/rotate_logs.sh
```

---

## Customer Metrics Tracking (Monthly)

### Metrics to Track

| Metric | Formula | Action |
|:-------|:--------|:-------|
| **MRR** | Sum(all active subscriptions) | Track growth |
| **Call Volume** | Count(calls per customer) | Capacity planning |
| **Booking Rate** | Bookings ÷ Total Calls | Conversion optimization |
| **Churn Rate** | Cancelled ÷ Total (month) | Retention focus |
| **LTV** | MRR × Avg Lifespan | CAC justification |
| **Support Tickets** | Count(issues/month) | Quality indicator |

### Monthly Report Script

```bash
#!/bin/bash

MONTH=$(date -d "last month" +"%B %Y")

echo "========================================="
echo "Silent AI Partner - $MONTH Report"
echo "========================================="
echo ""
echo "FINANCIAL"
echo "---------"
echo "MRR: \$[CALCULATE]"
echo "New Customers: [COUNT]"
echo "Churn: [COUNT]"
echo "Net Revenue: \$[CALCULATE]"
echo ""
echo "USAGE"
echo "-----"
echo "Total Calls: [COUNT]"
echo "Total Bookings: [COUNT]"
echo "Avg Calls/Customer: [CALCULATE]"
echo ""
echo "GOALS"
echo "-----"
echo "Monthly Target: 10 customers"
echo "Current Progress: [X]/10"
echo ""
echo "Next Month Focus: [TBD]"
```

---

## Alert Thresholds

### When to Alert (SMS/Email)

| Condition | Threshold | Action |
|:----------|:----------|:-------|
| Vapi balance | < $50 | SMS alert |
| Twilio balance | < $25 | SMS alert |
| Emergency escalation | > 5/hour | PagerDuty/Phone call |
| Failed calls | > 10% of total | SMS alert |
| Disk space | > 90% | SMS alert |
| Server down | > 2 min | SMS + Email |

---

## Notification Templates

### SMS Alert: Low Balance

```
SAI Alert: Account balance low ($XX remaining). 
Add credits before 5PM to avoid service interruption.

Reply BALANCE for details.
```

### SMS Alert: System Issue

```
🚨 SAI Health Alert 🚨

Issue: [Gateway down / High failures / Disk full]
Time: [TIMESTAMP]
Action: [Manual check needed]

Check dashboard: [DASHBOARD_URL]
```

### Weekly Summary Email

```
Subject: Silent AI Partner - Week of [DATE] Summary

Good morning!

This week:
✓ [X] calls handled
✓ [Y] appointments booked
✓ [Z] new customers

Top performer: [CUSTOMER NAME] - [N] bookings

Action items:
□ Review [N] failed calls
□ Follow up with [CUSTOMER] (needs config help)
□ Launch [FEATURE] to beta group

Dashboard: [DASHBOARD_URL]

— SAI Bot 🤖
```

---

## Environment Variables

Create `~/.sai_env`:

```bash
# Service credentials
VAPI_API_KEY=your_key_here
RETELL_API_KEY=your_key_here  # Optional
TWILIO_SID=your_sid_here
TWILIO_TOKEN=your_token_here
TWILIO_PHONE=+15551234567
CALCOM_API_KEY=your_key_here

# Alert settings
OWNER_PHONE=+15559876543
OWNER_EMAIL=you@email.com

# Paths
SAI_BASE_DIR=/root/.openclaw/workspace/silent-ai-partner
SAI_LOG_DIR=$SAI_BASE_DIR/logs
```

Add to `~/.bashrc`:
```bash
if [ -f ~/.sai_env ]; then
    export $(cat ~/.sai_env | grep -v '^#' | xargs)
fi
```

---

**Last Updated:** February 11, 2026
