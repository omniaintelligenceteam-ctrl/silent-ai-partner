#!/usr/bin/env python3
"""
Retell Call Transcript Analyzer
Analyzes recent calls from 6 phone numbers and generates insights.
"""

import json
import subprocess
import re
from datetime import datetime
from pathlib import Path

# Configuration
API_KEY = "key_57a1e44d75cffc9b5e9f8188f048"
OUTPUT_PATH = "/root/.openclaw/workspace/memory/crm/call-log.md"

PHONE_NUMBERS = {
    "+18667821303": "Main demo",
    "+14807250700": "Plumbing",
    "+16029321296": "HVAC",
    "+16232945515": "Landscape Lighting",
    "+15205256494": "Electrical",
    "+17068009656": "Redwoods"
}


def normalize_phone(phone):
    """Normalize phone number to digits only (removing +1 country code)."""
    digits = re.sub(r'\D', '', phone)
    # Strip leading 1 if it's a country code
    if len(digits) == 11 and digits.startswith('1'):
        digits = digits[1:]
    return digits


def run_command(cmd):
    """Run a shell command and return output."""
    try:
        result = subprocess.run(
            cmd,
            shell=True,
            capture_output=True,
            text=True,
            timeout=30
        )
        return result.stdout.strip()
    except Exception as e:
        print(f"Command failed: {e}")
        return None


def list_recent_calls(limit=50):
    """Fetch recent calls from Retell API."""
    # Updated to use v2 API with correct endpoint
    cmd = (
        f"curl -s -X POST 'https://api.retellai.com/v2/list-calls' "
        f"-H 'Authorization: Bearer {API_KEY}' "
        f"-H 'Content-Type: application/json' "
        f"-d '{{\"sort_order\": \"descending\", \"limit\": {limit}}}'"
    )
    
    output = run_command(cmd)
    if output:
        try:
            data = json.loads(output)
            return data
        except json.JSONDecodeError:
            print(f"Failed to parse JSON: {output[:200]}")
    return None


def get_call_details(call_id):
    """Get details for a specific call."""
    cmd = (
        f"curl -s 'https://api.retellai.com/get-call/{call_id}' "
        f"-H 'Authorization: Bearer {API_KEY}'"
    )
    
    output = run_command(cmd)
    if output:
        try:
            data = json.loads(output)
            return data
        except json.JSONDecodeError:
            print(f"Failed to parse call details: {output[:200]}")
    return None


def get_transcript(call_id):
    """Get transcript for a specific call."""
    # Updated to use v2 API
    cmd = (
        f"curl -s 'https://api.retellai.com/v2/get-call/{call_id}' "
        f"-H 'Authorization: Bearer {API_KEY}'"
    )
    
    output = run_command(cmd)
    if output:
        try:
            data = json.loads(output)
            # Try to get transcript from different possible fields
            transcript = data.get("transcript", "")
            if not transcript:
                transcript = data.get("transcript_text", "")
            return transcript, data
        except json.JSONDecodeError:
            return "", None
    return "", None


def run_command(cmd):
    """Run a shell command and return output."""
    try:
        result = subprocess.run(
            cmd,
            shell=True,
            capture_output=True,
            text=True,
            timeout=30
        )
        return result.stdout.strip()
    except Exception as e:
        print(f"Command failed: {e}")
        return None


def analyze_duration(duration_seconds):
    """Analyze call duration and return category."""
    if duration_seconds < 30:
        return {
            "category": "Hangup",
            "rating": "COLD",
            "note": "Short call - likely hangup or wrong number"
        }
    elif duration_seconds < 120:
        return {
            "category": "Interested",
            "rating": "WARM",
            "note": "Medium call - prospect showed interest"
        }
    else:
        return {
            "category": "Hot Lead",
            "rating": "HOT",
            "note": "Long call - highly engaged prospect"
        }


def extract_contact_info(transcript):
    """Extract contact information from transcript."""
    if not transcript:
        return {"name": None, "email": None, "phone": None}
    
    text_upper = transcript.upper()
    
    # Name extraction patterns
    name_patterns = [
        r"my name is (\w+[\s\w']*)",
        r"this is (\w+[\s\w']*)",
        r"speaking with (\w+[\s\w']*)",
        r"call me (\w+[\s\w']*)",
        r"i'm (\w+[\s\w']*)",
        r"I AM (\w+[\s\w']*)"
    ]
    
    name = None
    for pattern in name_patterns:
        match = re.search(pattern, text_upper, re.IGNORECASE)
        if match:
            name = match.group(1).strip().title()
            if len(name.split()) <= 4:  # Reasonable name length
                break
    
    # Phone extraction - look for phone numbers
    phone = None
    phone_pattern = r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b'
    matches = re.findall(phone_pattern, transcript)
    for match in matches:
        normalized = normalize_phone(match)
        # Skip our known numbers
        if normalized not in PHONE_NUMBERS:
            phone = match
            break
    
    # Email extraction
    email = None
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b'
    match = re.search(email_pattern, transcript, re.IGNORECASE)
    if match:
        email = match.group(0).lower()
    
    return {"name": name, "email": email, "phone": phone}


def identify_topics(transcript):
    """Identify key topics from transcript."""
    if not transcript:
        return []
    
    text_lower = transcript.lower()
    topics = []
    
    topic_keywords = {
        "Plumbing": ["pipe", "plumb", "leak", "drain", "water", "faucet", "toilet", "sewer", "gas line"],
        "HVAC": ["ac", "air conditioning", "heat", "furnace", "cool", "ventilation", "temperature", "thermostat"],
        "Electrical": ["electric", "wiring", "outlet", "light", "power", "circuit", "breaker", "panel"],
        "Pricing": ["price", "cost", "quote", "estimate", "budget", "afford", "payment", "financing"],
        "Scheduling": ["schedule", "appointment", "available", "when", "tomorrow", "today", "week", "time"],
        "Emergency": ["emergency", "urgent", "immediately", "asap", "broken", "stopped", "flood", "fire"],
        "Service": ["service", "repair", "install", "maintenance", "warranty", "contract"],
        "General": ["question", "information", "help", "support"]
    }
    
    for topic, keywords in topic_keywords.items():
        if any(keyword in text_lower for keyword in keywords):
            topics.append(topic)
    
    return topics if topics else ["General Inquiry"]


def get_agent_info(call_data):
    """Extract agent information from call data."""
    agent = call_data.get("retell_llm_dynamic_variables", {}).get("agent_name", None)
    if not agent:
        agent = call_data.get("llm_websocket_url", "Unknown Agent")
        if "/" in agent:
            agent = agent.split("/")[-1].split("?")[0][:30]
    return agent if agent else "Unknown Agent"


def format_duration(seconds):
    """Format duration in human readable format."""
    seconds = float(seconds)
    if seconds < 60:
        return f"{int(seconds)}s"
    minutes = int(seconds // 60)
    secs = int(seconds % 60)
    return f"{minutes}m {secs}s"


def analyze_call(call_id, call_summary):
    """Perform full analysis on a call."""
    transcript, call_data = get_transcript(call_id)
    
    if not call_data:
        return None
    
    # Get call metadata - timestamps in ms, duration in ms
    duration_ms = call_data.get("duration_ms", 0)
    duration = duration_ms / 1000  # convert to seconds for analysis
    start_time = call_data.get("start_timestamp", 0)
    
    # Determine which number
    from_num = call_data.get("from_number", "")
    to_num = call_data.get("to_number", "")
    
    # Identify our number - check if our phone number appears in from/to
    our_number = None
    number_type = "Unknown"
    
    for e164_num, name in PHONE_NUMBERS.items():
        if e164_num == from_num or e164_num == to_num:
            our_number = e164_num
            number_type = name
            break
    
    # Analyze duration
    duration_analysis = analyze_duration(duration)
    
    # Extract contact info
    contact_info = extract_contact_info(transcript)
    
    # Identify topics
    topics = identify_topics(transcript)
    
    # Get agent
    agent = get_agent_info(call_data)
    
    return {
        "call_id": call_id,
        "timestamp": start_time,
        "duration": duration,
        "duration_formatted": format_duration(duration),
        "number_type": number_type,
        "our_number": our_number,
        "from_number": from_num,
        "to_number": to_num,
        "agent": agent,
        "rating": duration_analysis["rating"],
        "category": duration_analysis["category"],
        "contact_info": contact_info,
        "topics": topics,
        "transcript": transcript[:500] if transcript else "(No transcript available)"
    }


def save_results(calls_analyzed, output_path):
    """Save analyzed calls to markdown file."""
    output = Path(output_path)
    output.parent.mkdir(parents=True, exist_ok=True)
    
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M UTC")
    
    with open(output, "w") as f:
        f.write(f"# Retell Call Log\n\n")
        f.write(f"**Generated:** {timestamp}\n\n")
        f.write(f"**Total Calls Analyzed:** {len(calls_analyzed)}\n\n")
        
        # Summary stats
        hot = sum(1 for c in calls_analyzed if c["rating"] == "HOT")
        warm = sum(1 for c in calls_analyzed if c["rating"] == "WARM")
        cold = sum(1 for c in calls_analyzed if c["rating"] == "COLD")
        
        f.write("## Summary Stats\n\n")
        f.write(f"- 🔥 **HOT Leads:** {hot}\n")
        f.write(f"- 🔶 **WARM:** {warm}\n")
        f.write(f"- 🔵 **COLD:** {cold}\n\n")
        
        # Breakdown by number
        f.write("## By Number\n\n")
        for digits, name in PHONE_NUMBERS.items():
            count = sum(1 for c in calls_analyzed if c["our_number"] == digits)
            f.write(f"- **{name}** ({digits}): {count} calls\n")
        f.write("\n")
        
        # Detailed call records
        f.write("## Call Records\n\n")
        for call in calls_analyzed:
            # timestamps are in milliseconds
            date_str = datetime.fromtimestamp(call["timestamp"]/1000).strftime("%Y-%m-%d %H:%M") if call["timestamp"] else "Unknown"
            
            f.write(f"### {call['call_id'][:16]}... ({date_str})\n\n")
            f.write(f"- **Number:** {call['number_type']}\n")
            f.write(f"- **Duration:** {call['duration_formatted']}\n")
            f.write(f"- **Rating:** {call['rating']} ({call['category']})\n")
            f.write(f"- **Agent:** {call['agent']}\n")
            f.write(f"- **Topics:** {', '.join(call['topics'])}\n")
            
            contact = call['contact_info']
            contact_str = []
            if contact['name']:
                contact_str.append(f"Name: {contact['name']}")
            if contact['phone']:
                contact_str.append(f"Phone: {contact['phone']}")
            if contact['email']:
                contact_str.append(f"Email: {contact['email']}")
            
            if contact_str:
                f.write(f"- **Contact Info:** {' | '.join(contact_str)}\n")
            else:
                f.write(f"- **Contact Info:** *None captured*\n")
            
            f.write(f"\n**Transcript Preview:**\n```\n{call['transcript']}...\n```\n\n")
            f.write("---\n\n")
    
    print(f"✅ Results saved to: {output_path}")


def generate_discord_summary(calls_analyzed):
    """Generate Discord-ready summary."""
    hot_calls = [c for c in calls_analyzed if c["rating"] == "HOT"]
    warm_calls = [c for c in calls_analyzed if c["rating"] == "WARM"]
    
    lines = [
        "## 📞 Retell Call Analysis",
        "",
        f"**Total Calls:** {len(calls_analyzed)}",
        "",
        f"🔥 **HOT Leads:** {len(hot_calls)}",
        f"🔶 **WARM:** {len(warm_calls)}",
    ]
    
    # By number breakdown
    lines.append("")
    lines.append("**By Number:**")
    for digits, name in PHONE_NUMBERS.items():
        count = sum(1 for c in calls_analyzed if c["our_number"] == digits)
        lines.append(f"• {name}: {count}")
    
    # Hot leads detail
    if hot_calls:
        lines.append("")
        lines.append("🔥 **HOT Leads to Follow Up:**")
        for call in hot_calls[:5]:  # Top 5
            contact = call['contact_info']
            contact_info = contact['phone'] or contact['email'] or contact['name'] or "No contact captured"
            lines.append(f"• {call['number_type']} ({call['duration_formatted']}) - Contact: {contact_info}")
    
    # Warm calls with contact info
    warm_with_contact = [c for c in warm_calls if any(c['contact_info'].values())]
    if warm_with_contact:
        lines.append("")
        lines.append("🔶 **WARM Calls with Contact Info:**")
        for call in warm_with_contact[:3]:
            contact = call['contact_info']
            contact_str = contact['phone'] or contact['email'] or contact['name']
            lines.append(f"• {call['number_type']} ({call['duration_formatted']}) - {contact_str}")
    
    lines.append("")
    lines.append(f"📅 Full log: `{OUTPUT_PATH}`")
    
    return "\n".join(lines)


def main():
    print("🚀 Retell Call Analyzer")
    print("=" * 50)
    
    # Step 1: List recent calls
    print("\n📥 Fetching recent calls...")
    calls_data = list_recent_calls(limit=50)
    
    if not calls_data or not isinstance(calls_data, list):
        print("❌ Failed to fetch calls or no calls found")
        if calls_data:
            print(f"Response: {json.dumps(calls_data, indent=2)[:500]}")
        return
    
    print(f"✅ Found {len(calls_data)} calls")
    
    # Step 2 & 3: Analyze each call
    calls_analyzed = []
    
    print("\n🔍 Analyzing calls...")
    for i, call_summary in enumerate(calls_data):
        call_id = call_summary.get("call_id")
        if not call_id:
            continue
        
        print(f"  [{i+1}/{len(calls_data)}] Processing {call_id[:12]}...", end=" ")
        
        analysis = analyze_call(call_id, call_summary)
        if analysis:
            calls_analyzed.append(analysis)
            print(f"✓ {analysis['rating']} - {analysis['number_type']}")
        else:
            print("✗ failed")
    
    print(f"\n✅ Successfully analyzed {len(calls_analyzed)} calls")
    
    # Step 4: Save results
    print("\n💾 Saving results...")
    save_results(calls_analyzed, OUTPUT_PATH)
    
    # Step 5: Discord summary
    print("\n--- DISCORD SUMMARY ---")
    discord_summary = generate_discord_summary(calls_analyzed)
    print(discord_summary)
    
    return calls_analyzed


if __name__ == "__main__":
    main()
