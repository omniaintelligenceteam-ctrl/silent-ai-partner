#!/usr/bin/env python3
"""
Stripe Payment Monitor
Checks for recent payments and alerts on new charges.
"""

import requests
import json
import os
from datetime import datetime

STRIPE_SK = os.environ.get("STRIPE_SECRET_KEY", "")
STATE_FILE = "/root/.openclaw/workspace/silent-ai-partner/tools/.stripe_last_charge.json"

def get_recent_charges(limit=5):
    """Fetch recent charges from Stripe API."""
    url = f"https://api.stripe.com/v1/charges?limit={limit}"
    response = requests.get(url, auth=(STRIPE_SK, ''))
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None

def load_last_known_charge():
    """Load the last known charge ID from state file."""
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE, 'r') as f:
            try:
                data = json.load(f)
                return data.get('last_charge_id')
            except json.JSONDecodeError:
                return None
    return None

def save_last_known_charge(charge_id):
    """Save the last known charge ID to state file."""
    with open(STATE_FILE, 'w') as f:
        json.dump({'last_charge_id': charge_id}, f)

def determine_tier(amount_cents):
    """Determine pricing tier based on amount."""
    amount_dollars = amount_cents / 100
    if amount_dollars == 197:
        return "Starter ($197)"
    elif amount_dollars == 397:
        return "Growth ($397)"
    elif amount_dollars == 597:
        return "Scale ($597)"
    else:
        return f"Custom (${amount_dollars:.2f})"

def format_charge(charge):
    """Format a charge for display."""
    amount = charge.get('amount', 0)
    currency = charge.get('currency', 'usd').upper()
    
    # Get customer/billing details
    receipt_email = charge.get('receipt_email', '')
    description = charge.get('description', '')
    metadata = charge.get('metadata', {})
    
    # Try to get company name from various sources
    company_name = metadata.get('company_name', '')
    if not company_name and receipt_email:
        company_name = receipt_email.split('@')[1].split('.')[0].capitalize() if '@' in receipt_email else receipt_email
    if not company_name:
        company_name = description if description else "Unknown"
    
    tier = determine_tier(amount)
    timestamp = datetime.fromtimestamp(charge.get('created', 0)).strftime('%Y-%m-%d %H:%M:%S UTC')
    status = charge.get('status', 'unknown')
    
    return {
        'id': charge.get('id'),
        'company': company_name,
        'amount': f"${amount / 100:.2f} {currency}",
        'tier': tier,
        'timestamp': timestamp,
        'status': status
    }

def main():
    print("=" * 60)
    print("STRIPE PAYMENT MONITOR")
    print("=" * 60)
    
    # Get recent charges
    data = get_recent_charges()
    if not data:
        print("Failed to fetch charges from Stripe.")
        return
    
    charges = data.get('data', [])
    if not charges:
        print("No charges found.")
        return
    
    # Load last known charge
    last_known_id = load_last_known_charge()
    
    # Find new charges (charges that are more recent than last known)
    new_charges = []
    current_last_id = charges[0].get('id') if charges else None
    
    for charge in charges:
        charge_id = charge.get('id')
        if charge_id == last_known_id:
            break
        if charge.get('status') == 'succeeded' and charge.get('paid', False):
            new_charges.append(charge)
    
    # Display results
    print(f"\nRecent Charges Checked: {len(charges)}")
    print(f"Last Known Charge ID: {last_known_id or 'None (first run)'}")
    print()
    
    if new_charges:
        print("🚨 NEW PAYMENTS DETECTED!")
        print("-" * 60)
        for charge in new_charges:
            formatted = format_charge(charge)
            print(f"  Company:    {formatted['company']}")
            print(f"  Amount:     {formatted['amount']}")
            print(f"  Tier:       {formatted['tier']}")
            print(f"  Time:       {formatted['timestamp']}")
            print(f"  Status:     {formatted['status'].upper()}")
            print(f"  Charge ID:  {formatted['id']}")
            print("-" * 60)
        print(f"\n✅ Found {len(new_charges)} new payment(s)!")
    else:
        print("✓ No new payments detected.")
    
    # Save the most recent charge ID
    if current_last_id:
        save_last_known_charge(current_last_id)
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    main()
