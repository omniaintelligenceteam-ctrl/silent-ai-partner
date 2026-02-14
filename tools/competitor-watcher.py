#!/usr/bin/env python3
"""
Competitor Price Watcher
Scrapes pricing from competitors and flags changes.
"""

import json
import re
from urllib.parse import urljoin
from datetime import datetime

# Known pricing info embedded (last known values)
KNOWN_PRICING = {
    "smith_ai": {
        "Starter": 225,
        "Basic": 420,
        "Pro": 600
    },
    "ruby": {
        "Starter": 199,
        "Growth": 349,
        "Enterprise": 649
    },
    "ours": {
        "Starter": 197,
        "Growth": 397,
        "Scale": 597
    }
}

# We'll extract pricing from web pages
COMPETITORS = {
    "smith_ai": {
        "name": "Smith.ai",
        "url": "https://smith.ai/pricing",
        "tiers": ["Starter", "Basic", "Pro"]
    },
    "ruby": {
        "name": "Ruby",
        "url": "https://www.ruby.com/pricing",
        "tiers": ["Starter", "Growth", "Enterprise"]
    },
    "dialzara": {
        "name": "Dialzara",
        "url": "https://dialzara.com/pricing",
        "tiers": ["Starter", "Professional", "Enterprise"]
    },
    "goodcall": {
        "name": "Goodcall",
        "url": "https://goodcall.com/pricing",
        "tiers": ["Free", "Pro", "Enterprise"]
    }
}

def fetch_page(url):
    """Fetch a page using web_fetch tool (simulated here via requests)."""
    try:
        import requests
        headers = {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=15)
        if response.status_code == 200:
            return response.text
        return None
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def extract_pricing_from_text(text, competitor_key):
    """Extract pricing from text using patterns."""
    pricing = {}
    text_lower = text.lower()
    
    # Price patterns: $XXX or $X,XXX per month
    price_pattern = r'\$([0-9,]+)(?:\s*/\s*mo|\s+per\s+month|\s*/\s*month|\s*monthly)?'
    prices_found = re.findall(price_pattern, text)
    prices_found = [int(p.replace(',', '')) for p in prices_found]
    
    if competitor_key == "smith_ai":
        # Smith.ai prices: Starter ~$225, Basic ~$420, Pro ~$600
        if prices_found:
            # Sort and map to tiers
            unique_prices = sorted(set(prices_found))
            # Filter reasonable prices ($100-$1000)
            filtered = [p for p in unique_prices if 100 <= p <= 1000]
            if len(filtered) >= 3:
                pricing["Starter"] = filtered[0]
                pricing["Basic"] = filtered[1]
                pricing["Pro"] = filtered[2]
    
    elif competitor_key == "ruby":
        # Ruby prices: Starter ~$199, Growth ~$349, Enterprise ~$649
        if prices_found:
            unique_prices = sorted(set(prices_found))
            filtered = [p for p in unique_prices if 100 <= p <= 1000]
            if len(filtered) >= 3:
                pricing["Starter"] = filtered[0]
                pricing["Growth"] = filtered[1]
                pricing["Enterprise"] = filtered[2]
    
    elif competitor_key == "dialzara":
        # Dialzara prices - need to look for common patterns
        if prices_found:
            unique_prices = sorted(set(prices_found))
            filtered = [p for p in unique_prices if 50 <= p <= 1000]
            if len(filtered) >= 3:
                pricing["Starter"] = filtered[0]
                pricing["Professional"] = filtered[1]
                pricing["Enterprise"] = filtered[2]
    
    elif competitor_key == "goodcall":
        # Goodcall may have free tier
        if prices_found:
            unique_prices = sorted(set(prices_found))
            filtered = [p for p in unique_prices if 0 <= p <= 1000]
            if len(filtered) >= 2:
                pricing["Free"] = 0
                pricing["Pro"] = filtered[0]
                if len(filtered) > 1:
                    pricing["Enterprise"] = filtered[1]
    
    return pricing

def check_competitor(key, info):
    """Check a single competitor's pricing."""
    print(f"\n📊 {info['name']}")
    print(f"   URL: {info['url']}")
    
    html = fetch_page(info['url'])
    if not html:
        return {
            'name': info['name'],
            'status': 'FETCH_ERROR',
            'pricing': {},
            'changes': []
        }
    
    current_pricing = extract_pricing_from_text(html, key)
    known_pricing = KNOWN_PRICING.get(key, {})
    
    changes = []
    if current_pricing and known_pricing:
        for tier, current_price in current_pricing.items():
            known_price = known_pricing.get(tier)
            if known_price and current_price != known_price:
                changes.append({
                    'tier': tier,
                    'old': known_price,
                    'new': current_price,
                    'diff': current_price - known_price
                })
        
        # Check for removed tiers
        for tier in known_pricing:
            if tier not in current_pricing:
                changes.append({
                    'tier': tier,
                    'old': known_pricing[tier],
                    'new': None,
                    'diff': f"Removed"
                })
    
    status = 'OK'
    if changes:
        status = 'CHANGED'
    elif not current_pricing:
        status = 'NO_DATA'
    
    return {
        'name': info['name'],
        'key': key,
        'status': status,
        'pricing': current_pricing or known_pricing,
        'changes': changes
    }

def print_comparison_table(results):
    """Print a comparison table."""
    print("\n" + "=" * 80)
    print("PRICING COMPARISON TABLE")
    print("=" * 80)
    
    # Header
    header = f"{'Competitor':<20} {'Tier 1':<15} {'Tier 2':<15} {'Tier 3':<15}"
    print(f"\n{header}")
    print("-" * 80)
    
    # Our pricing first
    ours = KNOWN_PRICING.get('ours', {})
    print(f"{'SilentPartner (Us)':<20} {'$197 (Starter)':<15} {'$397 (Growth)':<15} {'$597 (Scale)':<15}")
    
    print("-" * 80)
    
    # Competitors
    for result in results:
        if result['status'] == 'FETCH_ERROR':
            print(f"{result['name']:<20} {'FETCH ERROR':<15} {'N/A':<15} {'N/A':<15}")
            continue
        
        pricing = result['pricing']
        tiers = list(pricing.keys())
        
        # Format up to 3 tiers
        tier_vals = []
        for i in range(3):
            if i < len(tiers):
                tier_name = tiers[i]
                price = pricing[tier_name]
                prefix = "⚠️ " if any(c['tier'] == tier_name for c in result['changes']) else ""
                tier_vals.append(f"{prefix}${price} ({tier_name[:7]})")
            else:
                tier_vals.append("-")
        
        print(f"{result['name']:<20} {tier_vals[0]:<15} {tier_vals[1]:<15} {tier_vals[2]:<15}")
    
    print("=" * 80)

def print_changes(results):
    """Print any detected changes."""
    print("\n" + "=" * 80)
    print("PRICE CHANGE ALERTS")
    print("=" * 80)
    
    any_changes = False
    for result in results:
        if result['changes']:
            any_changes = True
            print(f"\n🚨 {result['name']} - Price Changes Detected!")
            for change in result['changes']:
                if change['new'] is None:
                    print(f"   ⚠️  {change['tier']}: Removed (was ${change['old']})")
                else:
                    direction = "📈 UP" if change['diff'] > 0 else "📉 DOWN"
                    print(f"   {direction} {change['tier']}: ${change['old']} → ${change['new']} (${abs(change['diff'])} change)")
    
    if not any_changes:
        print("\n✅ No price changes detected. All prices match last known values.")
    
    print("=" * 80)

def print_our_position(results):
    """Print our competitive position."""
    print("\n" + "=" * 80)
    print("OUR COMPETITIVE POSITION")
    print("=" * 80)
    
    our_starter = 197
    our_growth = 397
    our_scale = 597
    
    # Collect all starter prices
    all_starters = [("SilentPartner", our_starter)]
    for result in results:
        pricing = result['pricing']
        for tier, price in pricing.items():
            if 'starter' in tier.lower() or 'basic' in tier.lower():
                all_starters.append((result['name'], price))
                break
    
    all_starters.sort(key=lambda x: x[1])
    
    print(f"\nStarter Plan Comparison (sorted by price):")
    for name, price in all_starters:
        marker = "➤ " if name == "SilentPartner" else "  "
        print(f"   {marker}{name:<20} ${price}/mo")
    
    cheapest = all_starters[0]
    our_rank = next((i+1 for i, (n, _) in enumerate(all_starters) if n == "SilentPartner"), len(all_starters))
    
    print(f"\n✓ Our Starter plan (${our_starter}) ranks #{our_rank} in price")
    if cheapest[0] == "SilentPartner":
        print("  🏆 We are the most affordable option!")
    else:
        diff = cheapest[1] - our_starter
        if diff < 0:
            print(f"  ⚠️  {cheapest[0]} is ${abs(diff)} cheaper than us")
        else:
            print(f"  💰 We are ${diff} cheaper than {cheapest[0]}")
    
    print("=" * 80)

def main():
    print("=" * 80)
    print("COMPETITOR PRICE WATCHER")
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 80)
    
    print("\n🔍 Checking competitor pricing pages...")
    
    results = []
    for key, info in COMPETITORS.items():
        result = check_competitor(key, info)
        results.append(result)
    
    # Print comparison table
    print_comparison_table(results)
    
    # Print changes
    print_changes(results)
    
    # Print competitive position
    print_our_position(results)
    
    # Summary
    print("\n📋 SUMMARY")
    print("-" * 40)
    checked = len(results)
    errors = sum(1 for r in results if r['status'] == 'FETCH_ERROR')
    changes = sum(1 for r in results if r['changes'])
    
    print(f"  Competitors checked: {checked}")
    print(f"  Fetch errors: {errors}")
    print(f"  Price changes detected: {changes}")
    print(f"\n  Our pricing: Starter $197 | Growth $397 | Scale $597")

if __name__ == "__main__":
    main()
