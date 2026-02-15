#!/usr/bin/env python3
"""
Domain Health Monitor
Checks DNS records (SPF, DKIM, DMARC, MX) and website uptime.
"""

import subprocess
import requests
import sys

DOMAIN = "silentaipartner.com"
TIMEOUT = 10

def run_dig(record_type, domain):
    """Run dig command and return output."""
    try:
        result = subprocess.run(
            ['dig', '+short', record_type, domain],
            capture_output=True,
            text=True,
            timeout=TIMEOUT
        )
        return result.stdout.strip()
    except subprocess.TimeoutExpired:
        return "TIMEOUT"
    except FileNotFoundError:
        return "DIG_NOT_FOUND"
    except Exception as e:
        return f"ERROR: {str(e)}"

def check_spf():
    """Check SPF record."""
    output = run_dig('TXT', DOMAIN)
    
    if 'v=spf1' in output.lower():
        return {
            'status': 'PASS',
            'details': 'SPF record found',
            'content': output[:200]
        }
    elif output in ['TIMEOUT', 'DIG_NOT_FOUND']:
        return {
            'status': 'ERROR',
            'details': f'Check failed: {output}',
            'content': output
        }
    else:
        return {
            'status': 'FAIL',
            'details': 'No SPF record found',
            'content': output[:200] if output else 'Empty response'
        }

def check_dkim():
    """Check DKIM record."""
    dkim_domain = f"resend._domainkey.{DOMAIN}"
    output = run_dig('TXT', dkim_domain)
    
    if 'v=dkim1' in output.lower() or 'k=rsa' in output.lower() or 'p=' in output:
        return {
            'status': 'PASS',
            'details': 'DKIM record found',
            'content': output[:200]
        }
    elif output in ['TIMEOUT', 'DIG_NOT_FOUND']:
        return {
            'status': 'ERROR',
            'details': f'Check failed: {output}',
            'content': output
        }
    else:
        return {
            'status': 'FAIL',
            'details': 'No DKIM record found',
            'content': output[:200] if output else 'Empty response'
        }

def check_dmarc():
    """Check DMARC record."""
    dmarc_domain = f"_dmarc.{DOMAIN}"
    output = run_dig('TXT', dmarc_domain)
    
    if 'v=dmarc1' in output.lower():
        return {
            'status': 'PASS',
            'details': 'DMARC record found',
            'content': output[:200]
        }
    elif output in ['TIMEOUT', 'DIG_NOT_FOUND']:
        return {
            'status': 'ERROR',
            'details': f'Check failed: {output}',
            'content': output
        }
    else:
        return {
            'status': 'FAIL',
            'details': 'No DMARC record found',
            'content': output[:200] if output else 'Empty response'
        }

def check_mx():
    """Check MX records."""
    output = run_dig('MX', DOMAIN)
    
    if output and output not in ['TIMEOUT', 'DIG_NOT_FOUND']:
        lines = [line.strip() for line in output.split('\n') if line.strip()]
        if lines:
            return {
                'status': 'PASS',
                'details': f'{len(lines)} MX record(s) found',
                'content': output[:300]
            }
    
    if output in ['TIMEOUT', 'DIG_NOT_FOUND']:
        return {
            'status': 'ERROR',
            'details': f'Check failed: {output}',
            'content': output
        }
    
    return {
        'status': 'FAIL',
        'details': 'No MX records found',
        'content': output[:200] if output else 'Empty response'
    }

def check_website():
    """Check if website is up."""
    url = f"https://{DOMAIN}"
    
    try:
        response = requests.get(url, timeout=TIMEOUT, allow_redirects=True)
        status_code = response.status_code
        
        if 200 <= status_code < 400:
            return {
                'status': 'PASS',
                'details': f'HTTP {status_code} - Website is up',
                'content': f'HTTP {status_code}'
            }
        elif 400 <= status_code < 500:
            return {
                'status': 'FAIL',
                'details': f'HTTP {status_code} - Client error',
                'content': f'HTTP {status_code}'
            }
        else:
            return {
                'status': 'WARN',
                'details': f'HTTP {status_code} - Server error or redirect',
                'content': f'HTTP {status_code}'
            }
            
    except requests.exceptions.ConnectionError:
        return {
            'status': 'FAIL',
            'details': 'Connection failed - Website may be down',
            'content': 'Connection Error'
        }
    except requests.exceptions.Timeout:
        return {
            'status': 'FAIL',
            'details': 'Request timed out',
            'content': 'Timeout'
        }
    except Exception as e:
        return {
            'status': 'ERROR',
            'details': f'Error: {str(e)}',
            'content': str(e)
        }

def print_result(name, result):
    """Print a formatted result."""
    status = result['status']
    
    if status == 'PASS':
        icon = '✅'
    elif status == 'FAIL':
        icon = '❌'
    elif status == 'WARN':
        icon = '⚠️'
    else:
        icon = '⚠️'
    
    print(f"\n{icon} {name}")
    print(f"   Status: {status}")
    print(f"   Details: {result['details']}")
    if result['content']:
        preview = result['content'][:150].replace('\n', '; ')
        print(f"   Content: {preview}...")

def main():
    print("=" * 60)
    print(f"DOMAIN HEALTH MONITOR")
    print(f"Target: {DOMAIN}")
    print("=" * 60)
    
    # Run all checks
    results = {
        'SPF Record': check_spf(),
        'DKIM Record': check_dkim(),
        'DMARC Record': check_dmarc(),
        'MX Records': check_mx(),
        'Website Up': check_website()
    }
    
    # Print results
    for name, result in results.items():
        print_result(name, result)
    
    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("-" * 60)
    
    passed = sum(1 for r in results.values() if r['status'] == 'PASS')
    failed = sum(1 for r in results.values() if r['status'] == 'FAIL')
    warnings = sum(1 for r in results.values() if r['status'] == 'WARN')
    errors = sum(1 for r in results.values() if r['status'] == 'ERROR')
    
    print(f"  ✅ Passed:   {passed}")
    print(f"  ❌ Failed:   {failed}")
    print(f"  ⚠️  Warnings: {warnings}")
    print(f"  ⚠️  Errors:   {errors}")
    
    if failed > 0:
        print("\n🚨 ALERT: Critical health checks failed!")
        failed_items = [name for name, r in results.items() if r['status'] == 'FAIL']
        for item in failed_items:
            print(f"   - {item}")
        sys.exit(1)
    elif errors > 0:
        print("\n⚠️  Some checks could not complete due to errors.")
        sys.exit(2)
    else:
        print("\n✅ All health checks passed!")
        sys.exit(0)

if __name__ == "__main__":
    main()
