#!/usr/bin/env python3
"""
Reply Detector + Bounce Monitor
Checks Resend API for email delivery status and Cloudflare for replies.
Run via cron: */30 * * * * /usr/bin/python3 /root/.openclaw/workspace/silent-ai-partner/tools/reply-detector.py
"""

import os
import sys
import json
import re
import subprocess
from datetime import datetime, timedelta
from pathlib import Path

# Configuration
RESEND_API_KEY = "re_aLR2jVvf_AGy33ecxAbHsPsHnFapn1e5h"
RESEND_API_URL = "https://api.resend.com/emails"
CLOUDFLARE_EMAIL_TARGET = "team@silentaipartner.com"

# Paths
WORKSPACE = Path("/root/.openclaw/workspace")
CONTACTED_FILE = WORKSPACE / "memory/crm/contacted-companies.md"
TRACKING_FILE = WORKSPACE / "memory/crm/email-tracking.md"
LOG_FILE = WORKSPACE / "memory/crm/bounce-log.json"

def log(message, level="INFO"):
    """Print with timestamp"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S UTC")
    print(f"[{timestamp}] [{level}] {message}")

def curl_request(url, headers=None, method="GET"):
    """Make API request using curl (more reliable than urllib)"""
    cmd = ["curl", "-s", "-L", "-m", "30", "-X", method]
    
    if headers:
        for key, value in headers.items():
            cmd.extend(["-H", f"{key}: {value}"])
    
    cmd.append(url)
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=35)
        
        if result.returncode != 0:
            log(f"curl failed: {result.stderr}", "ERROR")
            return {"error": result.stderr}
        
        # Try to parse JSON
        try:
            return json.loads(result.stdout)
        except json.JSONDecodeError:
            log(f"Non-JSON response: {result.stdout[:200]}", "WARN")
            return {"raw": result.stdout}
            
    except subprocess.TimeoutExpired:
        log("Request timed out", "ERROR")
        return {"error": "timeout"}
    except Exception as e:
        log(f"Request failed: {e}", "ERROR")
        return {"error": str(e)}

def fetch_resend_emails(since_hours=48):
    """Fetch recent emails from Resend API"""
    log(f"Fetching emails from Resend (last {since_hours}h)...")
    
    headers = {
        "Authorization": f"Bearer {RESEND_API_KEY}",
        "Content-Type": "application/json",
        "User-Agent": "ReplyDetector/1.0"
    }
    
    # Get last 100 emails
    url = f"{RESEND_API_URL}?per_page=100"
    
    result = curl_request(url, headers)
    
    if "error" in result:
        log(f"Failed to fetch from Resend: {result['error']}", "ERROR")
        return []
    
    # Handle Resend's data wrapper
    emails = result.get("data", [])
    if not emails and isinstance(result, list):
        emails = result
    
    log(f"Retrieved {len(emails)} emails from Resend")
    return emails

def check_bounced_emails(emails):
    """Identify bounced emails from the list"""
    bounced = []
    delivered = []
    pending = []
    
    for email in emails:
        if not isinstance(email, dict):
            continue
            
        email_id = email.get("id", "unknown")
        to_addr = email.get("to", ["unknown"])
        if isinstance(to_addr, list) and len(to_addr) > 0:
            to_addr = to_addr[0]
        elif not isinstance(to_addr, str):
            to_addr = "unknown"
        
        subject = email.get("subject", "No subject")
        created_at = email.get("created_at", "unknown")
        
        # Check last_event or status
        last_event = email.get("last_event", "")
        status = email.get("status", "")
        
        entry = {
            "id": email_id,
            "to": to_addr,
            "subject": subject,
            "created_at": created_at,
            "status": status,
            "last_event": last_event
        }
        
        # Determine status
        if last_event == "bounced" or status == "bounced":
            bounced.append(entry)
        elif last_event == "delivered" or status == "delivered":
            delivered.append(entry)
        else:
            pending.append(entry)
    
    return bounced, delivered, pending

def parse_contacted_companies(content):
    """Parse contacted companies from markdown table"""
    companies = []
    lines = content.split('\n')
    in_table = False
    
    for line in lines:
        if '| Company | Email |' in line:
            in_table = True
            continue
        if in_table and line.startswith('|') and '---' not in line:
            parts = [p.strip() for p in line.split('|')[1:-1]]
            if len(parts) >= 4:
                companies.append({
                    "company": parts[0],
                    "email": parts[1],
                    "method": parts[2],
                    "date": parts[3],
                    "raw_line": line
                })
    
    return companies

def update_contacted_companies(bounced_emails):
    """Mark bounced emails in contacted-companies.md"""
    if not bounced_emails:
        return 0
    
    if not CONTACTED_FILE.exists():
        log("contacted-companies.md not found", "WARN")
        return 0
    
    with open(CONTACTED_FILE, 'r') as f:
        content = f.read()
    
    # Extract bounced email addresses
    bounced_addresses = set()
    for entry in bounced_emails:
        addr = entry.get("to", "").lower().strip()
        if addr and addr != "unknown":
            bounced_addresses.add(addr)
            # Also add without common prefixes if present
            if '@' in addr:
                bounced_addresses.add(addr)
    
    updated_count = 0
    original_content = content
    
    for bounced_addr in bounced_addresses:
        # Try to find the email in the table and mark as bounced
        # Match patterns like: | Company | email@domain.com | email | date |
        escaped_addr = re.escape(bounced_addr)
        
        # Pattern to match the email in table row
        patterns = [
            rf'(\| [^|]+ \| {escaped_addr} \| email \| [^|]+ \|)(?!.*BOUNCED)',
            rf'(\| [^|]+ \| {escaped_addr} \|)(?!.*BOUNCED)',
        ]
        
        for pattern in patterns:
            new_content, count = re.subn(
                pattern, 
                r'\1 🔴 BOUNCED |',
                content, 
                flags=re.IGNORECASE
            )
            if count > 0:
                content = new_content
                updated_count += count
                log(f"Marked as bounced: {bounced_addr}")
                break
    
    if content != original_content:
        with open(CONTACTED_FILE, 'w') as f:
            f.write(content)
        log(f"Updated contacted-companies.md with {updated_count} bounce marks")
    
    return updated_count

def log_email_tracking(bounced, delivered, pending):
    """Log results to email-tracking.md"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    date_str = datetime.now().strftime("%Y-%m-%d")
    
    total = len(bounced) + len(delivered) + len(pending)
    bounce_rate = (len(bounced) / total * 100) if total > 0 else 0
    delivery_rate = (len(delivered) / total * 100) if total > 0 else 0
    
    tracking_entry = f"""## Check Run: {timestamp}

### Summary
| Metric | Count | Rate |
|--------|-------|------|
| Total Processed | {total} | 100% |
| 📬 Delivered | {len(delivered)} | {delivery_rate:.1f}% |
| 🔴 Bounced | {len(bounced)} | {bounce_rate:.1f}% |
| ⏳ Pending/Other | {len(pending)} | {(len(pending)/total*100 if total>0 else 0):.1f}% |

### Bounced Emails
"""
    
    if bounced:
        tracking_entry += "| Email | Subject | Time |\n|-------|---------|------|\n"
        for entry in bounced:
            subject = entry['subject'][:40] + "..." if len(entry['subject']) > 40 else entry['subject']
            tracking_entry += f"| `{entry['to']}` | {subject} | {entry['created_at'][:10]} |\n"
    else:
        tracking_entry += "_No bounces detected_\n"
    
    tracking_entry += "\n### Recent Delivered (last 10)\n"
    if delivered:
        tracking_entry += "| Email | Subject | Time |\n|-------|---------|------|\n"
        for entry in delivered[:10]:
            subject = entry['subject'][:40] + "..." if len(entry['subject']) > 40 else entry['subject']
            tracking_entry += f"| `{entry['to']}` | {subject} | {entry['created_at'][:10]} |\n"
    else:
        tracking_entry += "_No delivery confirmations_\n"
    
    tracking_entry += "\n---\n\n"
    
    # Ensure file exists
    TRACKING_FILE.parent.mkdir(parents=True, exist_ok=True)
    
    if TRACKING_FILE.exists():
        with open(TRACKING_FILE, 'r') as f:
            existing = f.read()
        
        # Insert after header
        if "# Email Tracking" in existing:
            # Find where to insert (after first header)
            lines = existing.split('\n')
            header_idx = 0
            for i, line in enumerate(lines):
                if line.startswith('# Email Tracking'):
                    header_idx = i + 1
                    break
            # Insert after first empty line after header
            insert_idx = header_idx
            while insert_idx < len(lines) and lines[insert_idx].strip() == '':
                insert_idx += 1
            
            new_content = '\n'.join(lines[:insert_idx]) + '\n' + tracking_entry + '\n'.join(lines[insert_idx:])
        else:
            new_content = f"# Email Tracking Log\n\n{tracking_entry}{existing}"
    else:
        new_content = f"""# Email Tracking Log

Auto-generated email delivery monitoring for Silent AI Partner outreach.

---

{tracking_entry}"""
    
    with open(TRACKING_FILE, 'w') as f:
        f.write(new_content)
    
    log(f"Logged to {TRACKING_FILE}")

def save_bounce_log(bounced, delivered, pending):
    """Save structured bounce data for analysis"""
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    
    total = len(bounced) + len(delivered) + len(pending)
    
    log_data = {
        "timestamp": datetime.now().isoformat(),
        "date": datetime.now().strftime("%Y-%m-%d"),
        "summary": {
            "bounced": len(bounced),
            "delivered": len(delivered),
            "pending": len(pending),
            "total": total,
            "bounce_rate": round((len(bounced) / total * 100), 2) if total > 0 else 0,
            "delivery_rate": round((len(delivered) / total * 100), 2) if total > 0 else 0
        },
        "bounced": bounced,
        "recent_delivered": delivered[:20] if delivered else [],
        "recent_pending": pending[:10] if pending else []
    }
    
    # Append to log file
    logs = []
    if LOG_FILE.exists():
        try:
            with open(LOG_FILE, 'r') as f:
                logs = json.load(f)
                if not isinstance(logs, list):
                    logs = [logs]
        except:
            logs = []
    
    logs.append(log_data)
    
    # Keep only last 100 entries
    logs = logs[-100:]
    
    with open(LOG_FILE, 'w') as f:
        json.dump(logs, f, indent=2)
    
    log(f"Bounce log saved to {LOG_FILE}")

def check_cloudflare_replies():
    """
    Check Cloudflare email routing for replies.
    Cloudflare Email Routing forwards to configured destination.
    Actual reply checking needs webhook or inbox polling.
    """
    log("Cloudflare email routing check...")
    
    return {
        "status": "configured",
        "message": f"Emails to {CLOUDFLARE_EMAIL_TARGET} forwarded via Cloudflare",
        "check_action": "Monitor destination inbox for forwarded replies",
        "replies_found": []
    }

def get_stats_summary():
    """Get summary stats from log file"""
    if not LOG_FILE.exists():
        return None
    
    try:
        with open(LOG_FILE, 'r') as f:
            logs = json.load(f)
        
        if logs and len(logs) > 1:
            recent = logs[-1]
            previous = logs[-2] if len(logs) > 1 else None
            return {
                "current": recent.get("summary", {}),
                "previous": previous.get("summary", {}) if previous else None
            }
        elif logs:
            return {"current": logs[-1].get("summary", {})}
    except:
        pass
    
    return None

def discord_summary(bounced, delivered, pending, cf_status):
    """Generate Discord-friendly summary"""
    total = len(bounced) + len(delivered) + len(pending)
    bounce_rate = (len(bounced) / total * 100) if total > 0 else 0
    delivery_rate = (len(delivered) / total * 100) if total > 0 else 0
    
    # Get trending stats
    stats = get_stats_summary()
    
    summary = f"""📧 **Email Monitor Report** — {datetime.now().strftime('%Y-%m-%d %H:%M')}

```
Total:    {total:>4}
📬 Sent:   {len(delivered):>4} ({delivery_rate:.1f}%)
🔴 Bounce: {len(bounced):>4} ({bounce_rate:.1f}%)
⏳ Other:  {len(pending):>4}
```
"""
    
    if bounced:
        summary += "\n**⚠️ Bounced:**\n"
        for entry in bounced[:5]:
            email = entry['to']
            # Truncate long emails
            display_email = email[:35] + "..." if len(email) > 35 else email
            summary += f"`{display_email}`\n"
        if len(bounced) > 5:
            summary += f"_+{len(bounced) - 5} more_\n"
    
    if cf_status:
        summary += f"\n📥 **Replies:** {cf_status.get('check_action', 'Check inbox')}"
    
    # Alert if bounce rate is high
    if bounce_rate > 10:
        summary += "\n\n🚨 **Alert:** Bounce rate >10% - review contact list"
    elif bounce_rate > 5:
        summary += "\n\n⚠️ **Warning:** Bounce rate >5%"
    
    # Show trend if available
    if stats and stats.get("previous"):
        prev_bounce = stats["previous"].get("bounce_rate", 0)
        if abs(bounce_rate - prev_bounce) > 2:
            trend = "📈" if bounce_rate > prev_bounce else "📉"
            summary += f"\n\n{trend} Trend: Bounce rate was {prev_bounce:.1f}%"
    
    return summary

def main():
    """Main execution"""
    log("=" * 60)
    log("Reply Detector + Bounce Monitor Starting")
    log("=" * 60)
    
    run_timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    
    # Check if we should run in test mode (no actual API calls)
    test_mode = "--test" in sys.argv
    
    if test_mode:
        log("Running in TEST MODE - no API calls")
        bounced, delivered, pending = [], [], []
    else:
        # Step 1: Fetch emails from Resend
        emails = fetch_resend_emails(since_hours=48)
        
        if not emails:
            log("No emails retrieved from Resend API", "WARN")
            bounced, delivered, pending = [], [], []
        else:
            # Step 2: Check for bounces and delivery status
            bounced, delivered, pending = check_bounced_emails(emails)
            log(f"Status: {len(bounced)} bounced, {len(delivered)} delivered, {len(pending)} pending")
    
    # Step 3: Update contacted companies file with bounces
    updated = update_contacted_companies(bounced)
    log(f"Updated {updated} entries in contacted-companies.md")
    
    # Step 4: Log to tracking file
    log_email_tracking(bounced, delivered, pending)
    
    # Step 5: Save structured log
    save_bounce_log(bounced, delivered, pending)
    
    # Step 6: Check Cloudflare email routing
    cf_status = check_cloudflare_replies()
    
    # Step 7: Generate Discord summary
    discord_msg = discord_summary(bounced, delivered, pending, cf_status)
    
    # Output Discord summary (can be captured by caller)
    print("\n" + "=" * 60)
    print("DISCORD_OUTPUT_START")
    print(discord_msg)
    print("DISCORD_OUTPUT_END")
    print("=" * 60)
    
    # Also save to file for easy retrieval
    discord_file = WORKSPACE / f"memory/crm/discord-summary-{run_timestamp}.txt"
    with open(discord_file, 'w') as f:
        f.write(discord_msg)
    log(f"Discord summary saved to {discord_file}")
    
    # Clean up old summaries (keep last 10)
    try:
        summary_files = sorted(
            WORKSPACE.glob("memory/crm/discord-summary-*.txt"),
            key=lambda p: p.stat().st_mtime
        )
        for old_file in summary_files[:-10]:
            old_file.unlink()
            log(f"Cleaned up old summary: {old_file.name}")
    except Exception as e:
        log(f"Cleanup error: {e}", "WARN")
    
    log("Run completed successfully")
    
    # Return non-zero if bounces detected (for monitoring)
    sys.exit(1 if bounced else 0)

if __name__ == "__main__":
    main()
