#!/usr/bin/env python3
"""
SAP Lead Pipeline — 3 strategies:
1. Known email → send directly via Resend
2. No email but has domain → guess info@domain (MX validated) → send via Resend  
3. Contact form only → use browser automation (future)

Usage: python3 lead-pipeline.py <leads_file.json>
"""
import json, base64, urllib.request, dns.resolver, sys, time

RESEND_KEY = "re_aLR2jVvf_AGy33ecxAbHsPsHnFapn1e5h"

def has_mx(domain):
    try:
        dns.resolver.resolve(domain, 'MX')
        return True
    except:
        return False

def send_email(to_email, company_name, body_text):
    data = json.dumps({
        "from": "Sarah Mitchell <team@silentaipartner.com>",
        "to": [to_email],
        "subject": "Applying for your office manager position",
        "text": body_text
    }).encode()
    
    req = urllib.request.Request('https://api.resend.com/emails', data=data, headers={
        'Authorization': f'Bearer {RESEND_KEY}',
        'Content-Type': 'application/json'
    })
    
    try:
        resp = urllib.request.urlopen(req)
        return True
    except Exception as e:
        return False

def guess_email(domain):
    """If MX exists, info@ is the safest bet for contractors"""
    if has_mx(domain):
        return f"info@{domain}"
    return None

if __name__ == '__main__':
    print("SAP Lead Pipeline ready")
    print("Strategies: direct email → MX guess → contact form bot")
