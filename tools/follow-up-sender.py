#!/usr/bin/env python3
"""
Follow-Up Email Sequencer for Silent AI Partner
Sends automated follow-ups on Day 3, Day 7, and Day 14 to non-responders.
Dry-run mode only - logs what would be sent without actually sending.
"""

import re
import subprocess
import os
from datetime import datetime, timedelta
from dataclasses import dataclass
from typing import List, Optional, Dict

# Configuration
RESEND_API_KEY = "re_aLR2jVvf_AGy33ecxAbHsPsHnFapn1e5h"
FROM_EMAIL = "Sarah Mitchell <team@silentaipartner.com>"
DRY_RUN = True  # Set to False to actually send emails

# File paths
CONTACTED_FILE = "/root/.openclaw/workspace/memory/crm/contacted-companies.md"
LOG_FILE = "/root/.openclaw/workspace/memory/crm/follow-up-log.md"

# Original contact date (when the 50 emails were sent)
ORIGINAL_CONTACT_DATE = datetime(2026, 2, 13)


@dataclass
class Company:
    name: str
    email: str
    method: str
    contact_date: datetime


@dataclass
class FollowUp:
    day: int
    subject: str
    body: str


# Follow-up templates
FOLLOW_UPS = {
    3: FollowUp(
        day=3,
        subject="Re: Applying for your office manager position",
        body="""Hey {company},

Just checking in — did you get a chance to check out silentaipartner.com? Happy to answer any questions.

— Sarah"""
    ),
    7: FollowUp(
        day=7,
        subject="Quick thought for {company}",
        body="""Hey {company},

Quick thought — 62% of calls to businesses like yours go unanswered during busy hours. That's revenue walking out the door. I handle that for $7/day.

Still happy to show you — silentaipartner.com.

— Sarah"""
    ),
    14: FollowUp(
        day=14,
        subject="Last note from Sarah",
        body="""Hey {company},

I'll keep this short — if the timing isn't right, no hard feelings. But if you ever want to see what an AI office manager can do, I'm at silentaipartner.com.

Wishing you a great season.

— Sarah"""
    )
}


def parse_contacted_companies(filepath: str) -> List[Company]:
    """Parse the contacted-companies.md file and return list of Company objects."""
    companies = []
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the most recent date section
    # The file has sections per date, we want the latest one
    date_pattern = r'## (\d{4}-\d{2}-\d{2})'
    dates = re.findall(date_pattern, content)
    
    if not dates:
        print("No dates found in contacted-companies.md")
        return companies
    
    latest_date = max(dates)
    
    # Find the table under that date
    section_pattern = rf'## {latest_date}.*?\n\| Company \| Email \| Method \| Date \|[^\n]*\n\|[^\n]*\n((?:\|[^\n]*\|\n?)*)'
    match = re.search(section_pattern, content, re.DOTALL)
    
    if not match:
        print(f"No table found under date {latest_date}")
        return companies
    
    table_content = match.group(1)
    
    # Parse each row
    for line in table_content.strip().split('\n'):
        line = line.strip()
        if not line or not line.startswith('|'):
            continue
        
        # Split by | and clean up
        parts = [p.strip() for p in line.split('|')]
        parts = [p for p in parts if p]  # Remove empty strings
        
        if len(parts) >= 4:
            name = parts[0]
            email = parts[1]
            method = parts[2]
            date_str = parts[3]
            
            # Skip entries with no email (contact form entries)
            if email == '—' or not email or 'contact form' in method.lower():
                continue
            
            try:
                contact_date = datetime.strptime(date_str, '%Y-%m-%d')
            except ValueError:
                contact_date = ORIGINAL_CONTACT_DATE
            
            companies.append(Company(name, email, method, contact_date))
    
    return companies


def parse_follow_up_log(filepath: str) -> Dict[str, List[int]]:
    """Parse the follow-up-log.md and return dict of company -> list of days sent."""
    log = {}
    
    if not os.path.exists(filepath):
        return log
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find entries like "- [2026-02-16] ... Day 3 follow-up"
    pattern = r'\[([^\]]+)\].*?(\S+)\s+<([^>]+)>.*?Day\s+(\d+)'
    matches = re.findall(pattern, content)
    
    for _, name, email, day in matches:
        key = email.lower().strip()
        if key not in log:
            log[key] = []
        log[key].append(int(day))
    
    return log


def get_current_day() -> int:
    """Calculate days since original contact date (used as reference)."""
    today = datetime(2026, 2, 14)  # The current date context
    delta = today - ORIGINAL_CONTACT_DATE
    return delta.days


def should_send_followup(company: Company, day: int, log: Dict[str, List[int]]) -> bool:
    """Check if a specific day follow-up should be sent."""
    key = company.email.lower().strip()
    sent_days = log.get(key, [])
    
    # Check if this day already sent
    if day in sent_days:
        return False
    
    # Check total touches (original + follow-ups)
    if len(sent_days) >= 3:
        return False
    
    # Check if we've hit Day 3, Day 7, or Day 14
    current_day = get_current_day()
    
    # The follow-up day is relative to the contact date
    required_day_since_contact = day
    
    return current_day >= required_day_since_contact


def generate_email(company: Company, followup: FollowUp) -> tuple:
    """Generate subject and body for a follow-up."""
    subject = followup.subject.format(company=company.name)
    body = followup.body.format(company=company.name)
    return subject, body


def send_email_resend(company: Company, subject: str, body: str) -> bool:
    """Send email using Resend API via curl."""
    if DRY_RUN:
        print(f"  [DRY RUN] Would send email to {company.email}")
        return True
    
    # Escape special characters for JSON
    subject_escaped = subject.replace('"', '\\"')
    body_escaped = body.replace('"', '\\"').replace('\n', '\\n')
    
    curl_cmd = [
        'curl', '-s', 'https://api.resend.com/emails',
        '-X', 'POST',
        '-H', 'Authorization: Bearer {}'.format(RESEND_API_KEY),
        '-H', 'Content-Type: application/json',
        '-d', '{{"from":"{}","to":"{}","subject":"{}","text":"{}"}}'.format(
            FROM_EMAIL, company.email, subject_escaped, body_escaped
        )
    ]
    
    try:
        result = subprocess.run(curl_cmd, capture_output=True, text=True, timeout=30)
        if result.returncode == 0:
            response = result.stdout
            print(f"  Sent successfully: {response[:100]}")
            return True
        else:
            print(f"  Failed to send: {result.stderr}")
            return False
    except Exception as e:
        print(f"  Error sending: {e}")
        return False


def log_followup(company: Company, day: int, subject: str, dry_run: bool = True):
    """Log the follow-up to the log file."""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M UTC')
    today = datetime(2026, 2, 14).strftime('%Y-%m-%d')
    
    prefix = "[DRY_RUN] " if dry_run else ""
    
    log_entry = f"- [{today}] {prefix}Day {day} follow-up → {company.name} <{company.email}> | Subject: {subject}\n"
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)
    
    # Append to log
    with open(LOG_FILE, 'a', encoding='utf-8') as f:
        f.write(log_entry)
    
    print(f"  Logged to follow-up-log.md")


def initialize_log_file():
    """Initialize the log file with header if it doesn't exist."""
    if not os.path.exists(LOG_FILE):
        os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)
        with open(LOG_FILE, 'w', encoding='utf-8') as f:
            f.write("# Follow-Up Email Log\n")
            f.write("*Auto-generated by follow-up-sender.py*\n\n")
            f.write("## Log Entries\n\n")
            f.write("| Date | Day | Company | Email | Subject | Status |\n")
            f.write("|------|-----|---------|-------|---------|--------|\n")


def main():
    print("=" * 60)
    print("  Silent AI Partner - Follow-Up Email Sequencer")
    print("=" * 60)
    print(f"Mode: {'DRY RUN (no emails sent)' if DRY_RUN else 'LIVE (emails will be sent)'}")
    print(f"Current Date (Context): 2026-02-14")
    print(f"Original Contact Date: {ORIGINAL_CONTACT_DATE.strftime('%Y-%m-%d')}")
    print(f"Days Since Contact: {get_current_day()}")
    print("=" * 60)
    print()
    
    # Initialize log file
    initialize_log_file()
    
    # Parse contacted companies
    print(f"Reading {CONTACTED_FILE}...")
    companies = parse_contacted_companies(CONTACTED_FILE)
    print(f"Found {len(companies)} companies with email addresses")
    print()
    
    # Parse existing log to track what's been sent
    log = parse_follow_up_log(LOG_FILE)
    print(f"Found {len(log)} companies with existing follow-up history")
    print()
    
    # Find which follow-ups to send
    followups_needed = []
    
    for company in companies:
        key = company.email.lower().strip()
        sent_days = log.get(key, [])
        
        for day in [3, 7, 14]:
            if should_send_followup(company, day, log):
                followup = FOLLOW_UPS[day]
                subject, body = generate_email(company, followup)
                followups_needed.append({
                    'company': company,
                    'day': day,
                    'subject': subject,
                    'body': body,
                    'already_sent': sent_days
                })
                break  # Only send one follow-up per run
    
    if not followups_needed:
        print("No follow-ups needed at this time!")
        print()
        print("Summary:")
        print(f"  - Total companies tracked: {len(companies)}")
        print(f"  - Days since original contact: {get_current_day()}")
        print(f"  - Ready for Day 3: {sum(1 for c in companies if get_current_day() >= 3 and c.email.lower().strip() not in log)}")
        print(f"  - Ready for Day 7: {sum(1 for c in companies if get_current_day() >= 7 and len(log.get(c.email.lower().strip(), [])) >= 1)}")
        print(f"  - Ready for Day 14: {sum(1 for c in companies if get_current_day() >= 14 and len(log.get(c.email.lower().strip(), [])) >= 2)}")
        return
    
    print(f"Found {len(followups_needed)} follow-ups to process:\n")
    
    # Process each follow-up
    for item in followups_needed:
        company = item['company']
        day = item['day']
        subject = item['subject']
        body = item['body']
        
        print(f"Follow-Up Day {day}: {company.name}")
        print(f"  To: {company.email}")
        print(f"  Subject: {subject}")
        print(f"  Body preview: {body[:60]}...")
        print()
        
        # Send the email
        success = send_email_resend(company, subject, body)
        
        if success:
            log_followup(company, day, subject, dry_run=DRY_RUN)
        
        print()
    
    print("=" * 60)
    print("  Follow-Up Processing Complete")
    print("=" * 60)
    print()
    print(f"Processed {len(followups_needed)} follow-ups")
    print(f"Mode: {'DRY RUN' if DRY_RUN else 'LIVE'}")
    print(f"Log file: {LOG_FILE}")


if __name__ == "__main__":
    main()
