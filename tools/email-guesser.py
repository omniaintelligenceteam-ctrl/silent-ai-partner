#!/usr/bin/env python3
"""
Email Guesser + MX Validator
Given a company domain, guesses common email patterns and validates via DNS MX records.
"""
import dns.resolver
import sys
import smtplib
import socket

def has_mx_record(domain):
    """Check if domain has MX records (can receive email)"""
    try:
        records = dns.resolver.resolve(domain, 'MX')
        return len(records) > 0
    except:
        return False

def get_mx_host(domain):
    """Get primary MX host for domain"""
    try:
        records = dns.resolver.resolve(domain, 'MX')
        mx = sorted(records, key=lambda r: r.preference)
        return str(mx[0].exchange).rstrip('.')
    except:
        return None

def guess_emails(domain):
    """Generate common contractor email patterns"""
    patterns = [
        f"info@{domain}",
        f"office@{domain}",
        f"contact@{domain}",
        f"admin@{domain}",
        f"service@{domain}",
        f"sales@{domain}",
        f"careers@{domain}",
        f"jobs@{domain}",
        f"hr@{domain}",
        f"hello@{domain}",
        f"support@{domain}",
    ]
    return patterns

def validate_email_smtp(email, mx_host):
    """Try SMTP RCPT TO validation (works ~50% of the time)"""
    try:
        with smtplib.SMTP(mx_host, 25, timeout=10) as smtp:
            smtp.helo('silentaipartner.com')
            smtp.mail('team@silentaipartner.com')
            code, _ = smtp.rcpt(email)
            return code == 250
    except:
        return None  # Inconclusive

def check_domain(domain):
    """Full check: MX exists + guess emails + optional SMTP validation"""
    print(f"\n🔍 Checking {domain}...")
    
    if not has_mx_record(domain):
        print(f"  ❌ No MX records — domain can't receive email")
        return []
    
    mx_host = get_mx_host(domain)
    print(f"  ✅ MX record found: {mx_host}")
    
    guesses = guess_emails(domain)
    valid = []
    
    for email in guesses:
        result = validate_email_smtp(email, mx_host)
        if result is True:
            print(f"  ✅ VALID: {email}")
            valid.append(email)
        elif result is None:
            # Can't verify — MX exists so it MIGHT work
            valid.append(email)
            print(f"  ⚠️ POSSIBLE: {email} (MX valid, SMTP inconclusive)")
        else:
            print(f"  ❌ REJECTED: {email}")
    
    return valid

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python3 email-guesser.py domain1.com domain2.com ...")
        sys.exit(1)
    
    for domain in sys.argv[1:]:
        results = check_domain(domain)
        if results:
            print(f"\n  📧 Best guesses for {domain}:")
            # info@ and office@ are most common for contractors
            for e in results[:3]:
                print(f"     → {e}")
