#!/usr/bin/env python3
"""
Social Mention Monitor for AI Receptionist in Contractor Communities
Searches for mentions of AI receptionists, answering services, and missed calls
in contractor/plumbing/HVAC/electrician communities.
"""

import json
import subprocess
import re
from datetime import datetime
from typing import List, Dict, Optional
from pathlib import Path

# Configuration
QUERIES = [
    # Search queries targeting contractor communities
    '"AI receptionist" contractor OR plumber OR HVAC OR electrician',
    '"missed calls" contractor hiring receptionist',
    '"answering service" contractor frustrated',
    '"AI phone" small business',
    'site:reddit.com contractor receptionist',
    'site:reddit.com HVAC "answering service" OR "AI"',
    'site:reddit.com plumbing "answer the phone" OR "call center"',
    'site:reddit.com r/HVAC "service manager" OR "call answering"',
    'site:reddit.com r/electricians business phone calls OR leads',
    'Smith.ai OR "Ruby Receptionist" OR Dialzara OR Goodcall small business',
]

COMPETITORS = ['smith.ai', 'smith', 'ruby', 'rubya', 'dialzara', 'goodcall', 'nexa', 'answerhero', 'ringover', 'upfirst']

# Reddit community patterns to focus on
TARGET_SUBREDDITS = [
    'plumbing', 'HVAC', 'electricians', 'construction', 'contractor', 
    'smallbusiness', 'lawncare', 'landscaping', 'roofing', 'pestcontrol'
]


def score_relevance(title: str, snippet: str, url: str) -> str:
    """
    Score the relevance of a search result.
    HIGH = Actively looking for solution
    MEDIUM = Discussing the problem
    LOW = Just mentioning
    """
    text = (title + " " + snippet).lower()
    
    # HIGH keywords - actively seeking solutions
    high_signals = [
        'hiring', 'need', 'looking for', 'recommend', 'best', 'which',
        'should i get', 'need help', 'help with', 'how do you',
        'started', 'setup', 'implement', 'switched to', 'switched from',
        'review', 'opinion on', 'worth it', 'considering'
    ]
    
    # MEDIUM keywords - discussing problems or challenges
    medium_signals = [
        'frustrated', 'busy', 'missed calls', 'can\'t answer', 'too many',
        'buried in', 'overwhelmed', 'struggling', 'problem', 'issue',
        'challenge', 'wasting time', 'difficult', 'hard to'
    ]
    
    # Check for HIGH signals
    for signal in high_signals:
        if signal in text:
            return 'HIGH'
    
    # Check for MEDIUM signals
    for signal in medium_signals:
        if signal in text:
            return 'MEDIUM'
    
    return 'LOW'


def check_competitors(title: str, snippet: str) -> List[str]:
    """Check if the result mentions any competitors."""
    text = (title + " " + snippet).lower()
    found_competitors = []
    
    for comp in COMPETITORS:
        if comp in text:
            found_competitors.append(comp)
    
    return found_competitors


def is_contractor_related(title: str, snippet: str, url: str) -> bool:
    """Check if result is related to contractor/trade industries."""
    text = (title + " " + snippet + " " + url).lower()
    
    contractor_terms = [
        'contractor', 'plumbing', 'plumber', 'hvac', 'electrician',
        'electric', 'construction', 'handyman', 'trades', 'trade',
        'service business', 'residential service', 'home service',
        'lawn care', 'landscaping', 'roofing', 'pest control',
        'home improvement', 'maintenance', 'repair',
        'r/plumbing', 'r/hvac', 'r/electricians'
    ]
    
    for term in contractor_terms:
        if term in text:
            return True
    
    return False


def extract_date(published_str: str) -> str:
    """Extract date from published string."""
    if not published_str:
        return 'Unknown'
    return published_str


def run_search(query: str, freshness: str = 'pw') -> List[Dict]:
    """Run a web search using the brave API via CLI."""
    # In production, this would call the actual API
    # For now, we'll use a placeholder that simulates results
    print(f"[SEARCH] Query: {query}")
    return []


def process_results(results: List[Dict], query: str) -> List[Dict]:
    """Process search results and add metadata."""
    processed = []
    
    for result in results:
        if not result.get('url'):
            continue
        
        processed_result = {
            'url': result.get('url', ''),
            'title': result.get('title', '').replace('<<<EXTERNAL_UNTRUSTED_CONTENT>>>', '').replace('Source: Web Search', '').replace('---', '').strip(),
            'snippet': result.get('description', '').replace('<<<EXTERNAL_UNTRUSTED_CONTENT>>>', '').replace('Source: Web Search', '').replace('---', '').strip(),
            'date': extract_date(result.get('published', '')),
            'site': result.get('siteName', ''),
            'query': query,
            'relevance': score_relevance(
                result.get('title', ''),
                result.get('description', ''),
                result.get('url', '')
            ),
            'competitors_mentioned': check_competitors(
                result.get('title', ''),
                result.get('description', '')
            ),
            'is_contractor_related': is_contractor_related(
                result.get('title', ''),
                result.get('description', ''),
                result.get('url', '')
            ),
            'found_at': datetime.now().isoformat()
        }
        
        processed.append(processed_result)
    
    return processed


def format_markdown(results: List[Dict]) -> str:
    """Format results as markdown for saving."""
    lines = [
        "# Social Mentions Monitor Report",
        f"**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M UTC')}",
        "",
        "## Search Summary",
        f"- **Total results found:** {len(results)}",
        f"- **High relevance:** {len([r for r in results if r['relevance'] == 'HIGH'])}",
        f"- **Medium relevance:** {len([r for r in results if r['relevance'] == 'MEDIUM'])}",
        f"- **Low relevance:** {len([r for r in results if r['relevance'] == 'LOW'])}",
        f"- **Contractor related:** {len([r for r in results if r['is_contractor_related']])}",
        "",
        "## Competitor Mentions",
    ]
    
    comp_mentions = [r for r in results if r['competitors_mentioned']]
    if comp_mentions:
        lines.append(f"Found {len(comp_mentions)} results mentioning competitors:")
        for r in comp_mentions:
            lines.append(f"- {r['competitors_mentioned']} in [{r['title'][:60]}...]({r['url']})")
    else:
        lines.append("No competitor mentions found in this batch.")
    
    lines.extend([
        "",
        "## Results",
        ""
    ])
    
    # Group by relevance
    for relevance in ['HIGH', 'MEDIUM', 'LOW']:
        rel_results = [r for r in results if r['relevance'] == relevance]
        if rel_results:
            lines.append(f"### {relevance} Relevance")
            lines.append("")
            
            for r in rel_results:
                lines.append(f"**[{r['title']}]({r['url']})**")
                lines.append(f"- **Site:** {r['site']}")
                lines.append(f"- **Date:** {r['date']}")
                lines.append(f"- **Query:** `{r['query']}`")
                lines.append(f"- **Contractor Related:** {'Yes' if r['is_contractor_related'] else 'No'}")
                if r['competitors_mentioned']:
                    lines.append(f"- **Competitors:** {', '.join(r['competitors_mentioned'])}")
                lines.append(f"- **Snippet:** {r['snippet'][:300]}...")
                lines.append("")
    
    return "\n".join(lines)


def format_discord_summary(results: List[Dict]) -> str:
    """Format a Discord-ready summary of HIGH relevance finds."""
    high_results = [r for r in results if r['relevance'] == 'HIGH']
    
    if not high_results:
        return "🤖 **No HIGH relevance mentions found in this batch.**"
    
    lines = [
        "🤖 **AI Receptionist Social Monitor - HIGH Priority Finds**",
        f"📅 {datetime.now().strftime('%Y-%m-%d %H:%M UTC')}",
        "",
        f"Found **{len(high_results)}** high-relevance mentions:",
        ""  # Blank line before code block
    ]
    
    for r in high_results:
        comp_flag = " 🏆 [COMPETITOR]" if r['competitors_mentioned'] else ""
        trade_flag = " 🔧 [CONTRACTOR]" if r['is_contractor_related'] else ""
        
        lines.append(f"**{r['title'][:80]}**{comp_flag}{trade_flag}")
        lines.append(f"🔗 {r['url']}")
        lines.append(f"📄 {r['snippet'][:200]}...")
        lines.append(f"🏷️ Relevance: **{r['relevance']}** | 📅 {r['date']}")
        
        if r['competitors_mentioned']:
            lines.append(f"⚠️ Mentions: {', '.join(r['competitors_mentioned'])}")
        lines.append("")
    
    return "\n".join(lines)


def save_results(results: List[Dict], output_path: str):
    """Save results to markdown file."""
    md_content = format_markdown(results)
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    Path(output_path).write_text(md_content)
    print(f"[SAVED] Results to {output_path}")


def main():
    """Main entry point."""
    print("=" * 60)
    print("Social Mention Monitor for AI Receptionist")
    print("=" * 60)
    print()
    
    # This would run the actual searches in production
    print("Queries configured:")
    for i, q in enumerate(QUERIES, 1):
        print(f"  {i}. {q}")
    
    print()
    print("To run this script with actual searches:")
    print("  1. Ensure web_search tool is available")
    print("  2. Call the search functions with the queries above")
    print("  3. Process results using process_results()")
    print("  4. Save and format output using save_results() and format_discord_summary()")


if __name__ == '__main__':
    main()
