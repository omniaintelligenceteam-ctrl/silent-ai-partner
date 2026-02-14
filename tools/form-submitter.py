#!/usr/bin/env python3
"""
SAP Contact Form Submitter
Automatically detects form type and submits Sarah's application.

Strategies (in order):
1. Contact Form 7 (WordPress) — direct REST API POST
2. WPForms / Gravity Forms — parse hidden fields, POST
3. Generic HTML forms — parse action/fields, POST
4. Fallback — report "needs browser" for manual or headless fallback

Usage:
  python3 form-submitter.py https://example.com/contact "Company Name"
  python3 form-submitter.py --test https://example.com/contact
"""

import requests
from bs4 import BeautifulSoup
import re
import sys
import json
import time
from urllib.parse import urljoin, urlparse

# Sarah's info
SARAH = {
    'name': 'Sarah Mitchell',
    'first_name': 'Sarah',
    'last_name': 'Mitchell',
    'email': 'team@silentaipartner.com',
    'phone': '(866) 782-1303',
}

def get_application_message(company_name, compliment=None):
    """Generate the standard application message"""
    opener = compliment or f"I came across {company_name} and was impressed by what you've built."
    return f"""Hey {company_name},

{opener}

I saw you're looking for help managing your phones and office. Here's what I bring to the table:

I answer every call — first ring, every time. Nights, weekends, holidays. Schedule jobs, send confirmations, suggest upsells your team might miss, remember returning callers by name, record full transcripts, chase invoices, and deliver weekly performance reports. I learn your entire business in minutes. I'm an AI — and your customers won't even notice.

I don't call in sick. I don't take time off. I don't quit after 6 months and leave you scrambling.

Hiring a full-time office manager costs $35K+ a year plus benefits, training, and the headache when they leave. I cost $7 a day.

I'm so confident I'm the right fit that I'll work the first 15 days free — and there's no setup charge. If you don't love what I do, no hard feelings.

Want to hear me in action? Visit silentaipartner.com — I'll show you what I can do.

— Sarah Mitchell
Silent AI Partner
team@silentaipartner.com"""


def detect_form_type(soup):
    """Detect which form builder is used"""
    html_str = str(soup)
    
    # Contact Form 7
    if 'wpcf7-form' in html_str or 'data-wpcf7-id' in html_str:
        return 'cf7'
    
    # WPForms
    if 'wpforms-form' in html_str or 'wpforms-submit' in html_str:
        return 'wpforms'
    
    # Gravity Forms
    if 'gform_wrapper' in html_str or 'gform_submit' in html_str:
        return 'gravity'
    
    # Ninja Forms
    if 'nf-form' in html_str or 'ninja-forms' in html_str:
        return 'ninja'
    
    # JotForm
    if 'jotform' in html_str.lower():
        return 'jotform'
    
    # Squarespace
    if 'squarespace' in html_str.lower() or 'sqs-block-form' in html_str:
        return 'squarespace'
    
    # Wix
    if 'wix' in html_str.lower() and 'form' in html_str.lower():
        return 'wix'
    
    # GoDaddy
    if 'godaddy' in html_str.lower():
        return 'godaddy'
    
    # Generic HTML form
    forms = soup.find_all('form')
    if forms:
        return 'generic'
    
    return 'none'


def submit_cf7(url, soup, company_name, compliment=None):
    """Submit Contact Form 7 via REST API"""
    # Find form ID
    form = soup.find(class_='wpcf7-form')
    if not form:
        form = soup.find(attrs={'data-wpcf7-id': True})
    
    form_id = None
    if form:
        # Try data attribute
        form_id = form.get('data-wpcf7-id')
        if not form_id:
            # Try hidden input
            hidden = form.find('input', {'name': '_wpcf7'})
            if hidden:
                form_id = hidden.get('value')
    
    if not form_id:
        return {'success': False, 'error': 'Could not find CF7 form ID'}
    
    # Build API endpoint
    parsed = urlparse(url)
    api_url = f"{parsed.scheme}://{parsed.netloc}/wp-json/contact-form-7/v1/contact-forms/{form_id}/feedback"
    
    # Detect field names from the form
    message = get_application_message(company_name, compliment)
    
    # Standard CF7 field names (try common variations)
    data = {}
    inputs = form.find_all(['input', 'textarea'])
    
    for inp in inputs:
        name = inp.get('name', '')
        inp_type = inp.get('type', 'text')
        
        if inp_type in ('hidden', 'submit'):
            if name.startswith('_'):
                data[name] = inp.get('value', '')
            continue
        
        name_lower = name.lower()
        
        # Map fields
        if any(k in name_lower for k in ['name', 'your-name', 'full-name', 'fullname']):
            if any(k in name_lower for k in ['first', 'fname']):
                data[name] = SARAH['first_name']
            elif any(k in name_lower for k in ['last', 'lname']):
                data[name] = SARAH['last_name']
            else:
                data[name] = SARAH['name']
        elif any(k in name_lower for k in ['email', 'your-email', 'mail']):
            data[name] = SARAH['email']
        elif any(k in name_lower for k in ['phone', 'tel', 'mobile', 'your-phone']):
            data[name] = SARAH['phone']
        elif any(k in name_lower for k in ['message', 'your-message', 'comment', 'textarea', 'inquiry', 'details']):
            data[name] = message
        elif any(k in name_lower for k in ['subject', 'your-subject', 'topic']):
            data[name] = 'Applying for your office manager position'
        elif any(k in name_lower for k in ['company', 'business']):
            data[name] = 'Silent AI Partner'
    
    # Also check textareas
    textareas = form.find_all('textarea')
    for ta in textareas:
        name = ta.get('name', '')
        if name and name not in data:
            data[name] = message
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Referer': url,
            'Origin': f"{parsed.scheme}://{parsed.netloc}",
        }
        resp = requests.post(api_url, data=data, headers=headers, timeout=30)
        
        if resp.status_code == 200:
            result = resp.json()
            status = result.get('status', '')
            if status in ('mail_sent', 'sent'):
                return {'success': True, 'method': 'cf7_api', 'response': result.get('message', '')}
            else:
                return {'success': False, 'method': 'cf7_api', 'error': result.get('message', str(result))}
        else:
            return {'success': False, 'method': 'cf7_api', 'error': f'HTTP {resp.status_code}'}
    except Exception as e:
        return {'success': False, 'method': 'cf7_api', 'error': str(e)}


def submit_generic(url, soup, company_name, compliment=None):
    """Submit a generic HTML form"""
    forms = soup.find_all('form')
    if not forms:
        return {'success': False, 'error': 'No forms found'}
    
    # Find the contact/message form (not search, not login)
    target_form = None
    for form in forms:
        form_str = str(form).lower()
        # Skip search and login forms
        if 'search' in form.get('class', [''])[0:1] if form.get('class') else False:
            continue
        if 'login' in form_str[:200]:
            continue
        # Look for message/textarea forms
        if form.find('textarea') or 'contact' in form_str or 'message' in form_str:
            target_form = form
            break
    
    if not target_form:
        target_form = forms[0]  # fallback to first form
    
    # Get form action
    action = target_form.get('action', '')
    method = target_form.get('method', 'POST').upper()
    
    if not action or action == '#':
        action = url
    else:
        action = urljoin(url, action)
    
    # Check for CAPTCHA
    form_str = str(target_form).lower()
    if 'g-recaptcha' in form_str or 'h-captcha' in form_str or 'recaptcha' in form_str:
        # Check if it's reCAPTCHA v3 (invisible) vs v2 (checkbox)
        if 'g-recaptcha-response' in form_str and 'data-sitekey' in form_str:
            return {'success': False, 'error': 'reCAPTCHA detected — skip this lead, use email instead', 'captcha': True}
    
    message = get_application_message(company_name, compliment)
    data = {}
    
    # Collect all form fields
    for inp in target_form.find_all(['input', 'textarea', 'select']):
        name = inp.get('name', '')
        if not name:
            continue
        
        inp_type = inp.get('type', 'text')
        name_lower = name.lower()
        
        # Hidden fields — preserve values
        if inp_type == 'hidden':
            data[name] = inp.get('value', '')
            continue
        
        # Skip submit buttons
        if inp_type in ('submit', 'button', 'image', 'reset'):
            continue
        
        # Honeypot detection — leave empty
        style = inp.get('style', '')
        classes = ' '.join(inp.get('class', []))
        if 'display:none' in style or 'visibility:hidden' in style or 'honey' in name_lower or 'trap' in name_lower:
            data[name] = ''  # honeypot — leave empty
            continue
        
        # Map fields intelligently
        if any(k in name_lower for k in ['name', 'full_name', 'fullname', 'your_name']):
            if any(k in name_lower for k in ['first', 'fname']):
                data[name] = SARAH['first_name']
            elif any(k in name_lower for k in ['last', 'lname']):
                data[name] = SARAH['last_name']
            else:
                data[name] = SARAH['name']
        elif any(k in name_lower for k in ['email', 'mail', 'e-mail']):
            data[name] = SARAH['email']
        elif any(k in name_lower for k in ['phone', 'tel', 'mobile', 'cell']):
            data[name] = SARAH['phone']
        elif any(k in name_lower for k in ['message', 'comment', 'inquiry', 'details', 'question', 'description', 'body', 'content']):
            data[name] = message
        elif inp.name == 'textarea':
            data[name] = message
        elif any(k in name_lower for k in ['subject', 'topic', 'reason']):
            data[name] = 'Applying for your office manager position'
        elif any(k in name_lower for k in ['company', 'business', 'organization']):
            data[name] = 'Silent AI Partner'
        elif any(k in name_lower for k in ['website', 'url', 'site']):
            data[name] = 'silentaipartner.com'
        elif any(k in name_lower for k in ['city', 'location']):
            data[name] = 'Scottsdale, AZ'
        elif inp_type == 'checkbox':
            data[name] = inp.get('value', 'on')  # check all checkboxes
        else:
            # Unknown field — try to fill sensibly or skip
            if inp_type == 'text' and not inp.get('value'):
                data[name] = SARAH['name']  # default to name for unknown text fields
    
    try:
        parsed = urlparse(url)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': url,
            'Origin': f"{parsed.scheme}://{parsed.netloc}",
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        
        if method == 'GET':
            resp = requests.get(action, params=data, headers=headers, timeout=30, allow_redirects=True)
        else:
            resp = requests.post(action, data=data, headers=headers, timeout=30, allow_redirects=True)
        
        if resp.status_code in (200, 301, 302):
            # Check response for success indicators
            resp_text = resp.text.lower()
            if any(s in resp_text for s in ['thank', 'success', 'received', 'submitted', 'sent']):
                return {'success': True, 'method': 'generic_post', 'status': resp.status_code}
            else:
                return {'success': True, 'method': 'generic_post', 'status': resp.status_code, 'note': 'Submitted but could not confirm success from response'}
        else:
            return {'success': False, 'method': 'generic_post', 'error': f'HTTP {resp.status_code}'}
    except Exception as e:
        return {'success': False, 'method': 'generic_post', 'error': str(e)}


def submit_wpforms(url, soup, company_name, compliment=None):
    """Submit WPForms"""
    form = soup.find(class_=re.compile('wpforms-form'))
    if not form:
        return submit_generic(url, soup, company_name, compliment)
    
    # WPForms uses wpforms[fields][N] naming
    message = get_application_message(company_name, compliment)
    data = {}
    
    for inp in form.find_all(['input', 'textarea']):
        name = inp.get('name', '')
        if not name:
            continue
        
        inp_type = inp.get('type', 'text')
        
        if inp_type == 'hidden':
            data[name] = inp.get('value', '')
            continue
        if inp_type in ('submit', 'button'):
            continue
        
        # Map by placeholder/label
        placeholder = (inp.get('placeholder', '') or '').lower()
        name_lower = name.lower()
        
        if any(k in placeholder + name_lower for k in ['name', 'full']):
            if 'first' in placeholder + name_lower:
                data[name] = SARAH['first_name']
            elif 'last' in placeholder + name_lower:
                data[name] = SARAH['last_name']
            else:
                data[name] = SARAH['name']
        elif any(k in placeholder + name_lower for k in ['email', 'mail']):
            data[name] = SARAH['email']
        elif any(k in placeholder + name_lower for k in ['phone', 'tel']):
            data[name] = SARAH['phone']
        elif any(k in placeholder + name_lower for k in ['message', 'comment']):
            data[name] = message
        elif inp.name == 'textarea':
            data[name] = message
        elif any(k in placeholder + name_lower for k in ['subject']):
            data[name] = 'Applying for your office manager position'
    
    action = form.get('action', url)
    if not action or action == '#':
        action = url
    else:
        action = urljoin(url, action)
    
    try:
        parsed = urlparse(url)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Referer': url,
            'Origin': f"{parsed.scheme}://{parsed.netloc}",
        }
        resp = requests.post(action, data=data, headers=headers, timeout=30, allow_redirects=True)
        
        if resp.status_code in (200, 301, 302):
            return {'success': True, 'method': 'wpforms', 'status': resp.status_code}
        else:
            return {'success': False, 'method': 'wpforms', 'error': f'HTTP {resp.status_code}'}
    except Exception as e:
        return {'success': False, 'method': 'wpforms', 'error': str(e)}


def analyze_page(url):
    """Fetch page and analyze form"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        }
        resp = requests.get(url, headers=headers, timeout=30, allow_redirects=True)
        soup = BeautifulSoup(resp.text, 'html.parser')
        form_type = detect_form_type(soup)
        
        # Count fields
        forms = soup.find_all('form')
        total_fields = sum(len(f.find_all(['input', 'textarea', 'select'])) for f in forms)
        
        # Check for CAPTCHA
        has_captcha = bool(re.search(r'recaptcha|hcaptcha|g-recaptcha', resp.text, re.I))
        has_honeypot = bool(re.search(r'honey|trap|display:\s*none.*?input|visibility:\s*hidden.*?input', resp.text, re.I))
        
        return {
            'url': url,
            'form_type': form_type,
            'form_count': len(forms),
            'total_fields': total_fields,
            'has_captcha': has_captcha,
            'has_honeypot': has_honeypot,
            'soup': soup,
        }
    except Exception as e:
        return {'url': url, 'form_type': 'error', 'error': str(e)}


def submit_form(url, company_name, compliment=None, dry_run=False):
    """Main entry point — detect form type and submit"""
    print(f"\n🔍 Analyzing: {url}")
    
    analysis = analyze_page(url)
    
    if 'error' in analysis:
        print(f"  ❌ Error: {analysis['error']}")
        return analysis
    
    form_type = analysis['form_type']
    print(f"  📋 Form type: {form_type}")
    print(f"  📊 Forms: {analysis['form_count']}, Fields: {analysis['total_fields']}")
    print(f"  🔒 CAPTCHA: {analysis['has_captcha']}, Honeypot: {analysis['has_honeypot']}")
    
    if form_type == 'none':
        print(f"  ❌ No form found on page")
        return {'success': False, 'error': 'No form found', 'form_type': form_type}
    
    if analysis['has_captcha'] and form_type not in ('cf7',):
        print(f"  ⚠️ CAPTCHA detected — may fail")
    
    if dry_run:
        print(f"  🏃 DRY RUN — would submit to {form_type} form")
        return {'success': True, 'dry_run': True, 'form_type': form_type}
    
    soup = analysis['soup']
    
    # Route to appropriate handler
    if form_type == 'cf7':
        result = submit_cf7(url, soup, company_name, compliment)
    elif form_type == 'wpforms':
        result = submit_wpforms(url, soup, company_name, compliment)
    elif form_type in ('squarespace', 'wix', 'godaddy'):
        result = {'success': False, 'error': f'{form_type} requires headless browser', 'form_type': form_type, 'needs_browser': True}
    else:
        result = submit_generic(url, soup, company_name, compliment)
    
    result['form_type'] = form_type
    
    if result.get('success'):
        print(f"  ✅ SUBMITTED via {result.get('method', form_type)}")
    else:
        print(f"  ❌ Failed: {result.get('error', 'Unknown')}")
    
    return result


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python3 form-submitter.py <url> [company_name] [--test] [--dry-run]")
        sys.exit(1)
    
    url = sys.argv[1]
    company = sys.argv[2] if len(sys.argv) > 2 and not sys.argv[2].startswith('--') else 'Your Company'
    dry_run = '--dry-run' in sys.argv or '--test' in sys.argv
    
    result = submit_form(url, company, dry_run=dry_run)
    print(f"\n📊 Result: {json.dumps({k:v for k,v in result.items() if k != 'soup'}, indent=2)}")
