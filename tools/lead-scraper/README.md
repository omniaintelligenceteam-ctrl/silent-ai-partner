# Silent AI Partner Lead Scraper

A powerful Google Maps scraper designed specifically for Silent AI Partner to find high-quality leads among service contractors who need AI receptionist services.

## ⭐ NEW: Email Extraction Feature

**🎉 Now automatically extracts email addresses from:**
- Google Maps business listings
- Company websites (homepage + contact pages)
- Validates and filters professional email addresses
- Provides complete contact information for direct outreach

## 🎯 What It Does

This tool automatically searches Google Maps for service businesses (plumbers, HVAC contractors, electricians, landscapers, etc.) and identifies the best prospects for AI receptionist services by analyzing:

- **Missing websites** (they need digital help)
- **Communication issues in reviews** (customers complaining about unreachable businesses)
- **Small businesses** (more likely to need AI assistance)
- **No after-hours coverage** (perfect fit for AI receptionist)
- **Contact availability** (must have phone numbers to reach them)
- **Email extraction** (automatically finds email addresses from Google Maps and websites)

## 🏆 Lead Scoring System

Each lead gets scored 0-100 based on these factors:

| Factor | Points | Why It Matters |
|--------|--------|----------------|
| No website | +20 | They need digital presence help |
| Communication issues in reviews | +30 | Perfect pain point - customers can't reach them |
| Small business (< 50 reviews) | +10 | More likely to need AI receptionist |
| No after-hours coverage | +15 | AI can handle after-hours calls |
| Has phone number | +25 | We can actually contact them |

**70+ score = High quality lead** 🎯
**40-69 score = Medium quality lead** 📊
**< 40 score = Low quality lead** 📉

## 🚀 Installation

```bash
cd /path/to/lead-scraper
npm install
```

## 📋 Usage

### Basic Usage

```bash
# Search for plumbers in Phoenix
npx ts-node src/index.ts --query "plumbers" --city "Phoenix, AZ" --limit 50

# Search for HVAC contractors in Scottsdale
npx ts-node src/index.ts --query "HVAC contractors" --city "Scottsdale, AZ" --limit 30

# Search landscapers in Tempe
npx ts-node src/index.ts --query "landscapers" --city "Tempe, AZ" --limit 25
```

### Multi-City Search

```bash
# Search multiple cities at once
npx ts-node src/index.ts --query "plumbers" --cities "Phoenix,AZ;Scottsdale,AZ;Tempe,AZ" --limit 50
```

### Advanced Options

```bash
# Custom output directory
npx ts-node src/index.ts --query "electricians" --city "Mesa, AZ" --limit 40 --output ./my-leads

# Only CSV output
npx ts-node src/index.ts --query "roofers" --city "Chandler, AZ" --limit 30 --csv-only

# Only JSON output
npx ts-node src/index.ts --query "pest control" --city "Glendale, AZ" --limit 20 --json-only
```

### Test Run

```bash
# Quick test with 5 results
npm run test
```

## 📊 Output Files

Results are saved in the `output/` directory:

### CSV Format (`leads-YYYY-MM-DD.csv`)
```csv
name,phone,email,website,address,rating,reviews,hours,score,category,city,scraped_date
"Mike's Plumbing","(480) 555-1234","info@mikesplumbing.com","","123 Main St, Phoenix AZ",4.2,15,"Mon-Fri 8-5",85,"Plumber","Phoenix, AZ","2026-02-11"
```

### JSON Format (`leads-YYYY-MM-DD.json`)
```json
[{
  "name": "Mike's Plumbing",
  "phone": "(480) 555-1234",
  "email": "info@mikesplumbing.com",
  "website": "",
  "address": "123 Main St, Phoenix AZ",
  "rating": 4.2,
  "reviews": 15,
  "hours": "Mon-Fri 8-5",
  "score": 85,
  "category": "Plumber",
  "city": "Phoenix, AZ",
  "scrapedDate": "2026-02-11",
  "scoreReasons": ["no_website", "small_business", "no_after_hours", "has_phone"]
}]
```

## 🎯 Best Target Categories

Recommended business types that typically need AI receptionist services:

- **Plumbers** - Often busy on jobs, miss lots of calls
- **HVAC contractors** - Seasonal rushes, after-hours emergencies
- **Electricians** - Emergency calls, hard to answer while working
- **Landscapers** - Seasonal business, often working outdoors
- **Roofers** - Weather-dependent, miss calls during busy seasons
- **Pest control** - Emergency calls, route-based work
- **Handymen** - Solo operations, can't answer during jobs
- **Cleaning services** - Working in client locations

## ⚙️ Configuration

The scraper includes anti-detection features:

- **Random delays** (2-5 seconds between requests)
- **Realistic browser fingerprint**
- **Conservative limits** (max 50 results per query)
- **Human-like scrolling patterns**

## 🔍 Review Analysis

The scraper analyzes Google reviews for communication-related complaints:

**Keywords detected:**
- "couldn't reach"
- "no answer"
- "voicemail"
- "never called back"
- "hard to get ahold of"
- "doesn't answer"
- "unreachable"
- "missed calls"
- "no response"

When found, these businesses get +30 bonus points as they're perfect candidates for AI receptionist services.

## 📧 Email Extraction

The scraper automatically extracts email addresses from multiple sources:

**From Google Maps listings:**
- Business contact information
- Email buttons and mailto links
- Text content analysis

**From business websites:**
- Homepage email extraction
- Contact page scraping
- Mailto link detection
- Common email patterns (info@, contact@, office@, etc.)

**Smart extraction features:**
- Validates email format
- Filters out placeholder emails
- Prioritizes professional email addresses
- Handles website errors gracefully
- Adds delays between requests (2-3 seconds)

**No email? No problem!** The field is left blank if no valid email is found, so you can still use the other contact information.

## 📈 Performance Tips

1. **Start small** - Test with `--limit 10` first
2. **Use specific queries** - "emergency plumbers" vs just "plumbers"
3. **Target suburbs** - Less competition than major cities
4. **Batch by category** - Run separate searches for each business type
5. **Monitor rate limits** - Space out large scraping sessions

## ⚠️ Important Notes

- **Respect rate limits** - Built-in delays prevent blocking
- **Verify phone numbers** - Always double-check before calling
- **Update regularly** - Business info changes frequently
- **Check legality** - Ensure compliance with local scraping laws

## 🛠️ Development

```bash
# Build TypeScript
npm run build

# Run built version
npm start -- --query "plumbers" --city "Phoenix, AZ" --limit 5

# Development mode
npm run dev -- --query "plumbers" --city "Phoenix, AZ" --limit 5
```

## 📞 Integration with Silent AI Partner

1. **Import leads** into your CRM
2. **Sort by score** (focus on 70+ first)
3. **Prepare talking points** based on `scoreReasons`
4. **Customize outreach** for each business category

### Sample Outreach Script

For high-scoring leads with communication issues:

> "Hi [Business Name], I noticed some of your customers mentioned having trouble reaching you by phone. I help service businesses like yours never miss another call with AI receptionist technology. Could we chat for 5 minutes about how this could help your business?"

## 🐛 Troubleshooting

**No results found:**
- Check spelling of city name
- Try broader search terms
- Increase limit parameter

**Browser crashes:**
- Reduce limit to avoid memory issues
- Check available system resources

**Rate limited by Google:**
- Increase delays in scraper.ts
- Use VPN to rotate IP address
- Reduce scraping frequency

## 📄 License

MIT License - See LICENSE file for details.

---

**Built for Silent AI Partner** - Helping service contractors never miss another call! 📞🤖