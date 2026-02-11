import { chromium } from 'playwright';
import * as fs from 'fs';

interface Lead {
  name: string;
  phone: string;
  website: string;
  address: string;
  rating: number;
  reviews: number;
  category: string;
  city: string;
  score: number;
  scoreReasons: string[];
  scrapedDate: string;
}

async function scrape(query: string, city: string, limit: number = 10) {
  console.log(`🚀 Scraping "${query}" in ${city} (limit: ${limit})`);
  
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    viewport: { width: 1366, height: 768 }
  });

  const encoded = encodeURIComponent(`${query} in ${city}`);
  await page.goto(`https://www.google.com/maps/search/${encoded}`, { timeout: 60000, waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);

  // Scroll to load more results
  const feed = page.locator('[role="feed"]').first();
  for (let i = 0; i < 3; i++) {
    await feed.evaluate(el => (el as HTMLElement).scrollTop += 2000);
    await page.waitForTimeout(2000);
  }

  // Get all place links
  const placeLinks = await page.locator('a[href*="/maps/place"]').all();
  console.log(`📊 Found ${placeLinks.length} businesses`);

  const leads: Lead[] = [];

  for (let i = 0; i < Math.min(placeLinks.length, limit); i++) {
    try {
      const link = placeLinks[i];
      const ariaLabel = await link.getAttribute('aria-label') || '';
      
      // Click to open details
      await link.click();
      await page.waitForTimeout(3000);

      // Extract details from the side panel
      const name = ariaLabel || await page.locator('h1').first().textContent() || 'Unknown';
      
      // Phone
      let phone = '';
      try {
        const phoneBtn = page.locator('button[data-tooltip="Copy phone number"]').first();
        const phoneText = await phoneBtn.getAttribute('aria-label');
        if (phoneText) phone = phoneText.replace('Phone: ', '');
      } catch {}
      if (!phone) {
        try {
          const phoneLink = page.locator('a[href^="tel:"]').first();
          const href = await phoneLink.getAttribute('href');
          if (href) phone = href.replace('tel:', '');
        } catch {}
      }
      if (!phone) {
        // Try extracting from the page content
        const content = await page.content();
        const phoneMatch = content.match(/\(\d{3}\)\s?\d{3}[-.]?\d{4}/);
        if (phoneMatch) phone = phoneMatch[0];
      }

      // Website
      let website = '';
      try {
        const webBtn = page.locator('a[data-tooltip="Open website"]').first();
        website = await webBtn.getAttribute('href') || '';
      } catch {}
      if (!website) {
        try {
          const webLink = page.locator('a[aria-label*="website"]').first();
          website = await webLink.getAttribute('href') || '';
        } catch {}
      }

      // Address
      let address = '';
      try {
        const addrBtn = page.locator('button[data-tooltip="Copy address"]').first();
        address = await addrBtn.getAttribute('aria-label') || '';
        address = address.replace('Address: ', '');
      } catch {}

      // Rating & reviews  
      let rating = 0;
      let reviews = 0;
      try {
        const ratingEl = page.locator('div.F7nice span[aria-hidden="true"]').first();
        const ratingText = await ratingEl.textContent();
        if (ratingText) rating = parseFloat(ratingText);
      } catch {}
      try {
        const reviewEl = page.locator('div.F7nice span[aria-label*="review"]').first();
        const reviewText = await reviewEl.getAttribute('aria-label') || '';
        const match = reviewText.match(/(\d[\d,]*)/);
        if (match) reviews = parseInt(match[1].replace(',', ''));
      } catch {}

      // Score the lead
      const { score, reasons } = scoreLead(website, reviews, phone, rating);

      const lead: Lead = {
        name: name.trim(),
        phone,
        website,
        address,
        rating,
        reviews,
        category: query,
        city,
        score,
        scoreReasons: reasons,
        scrapedDate: new Date().toISOString().split('T')[0]
      };

      leads.push(lead);
      console.log(`✅ ${i+1}. ${lead.name} | ${lead.phone || 'no phone'} | Score: ${lead.score}`);

      // Random delay
      await page.waitForTimeout(1500 + Math.random() * 2000);
    } catch (err: any) {
      console.log(`⚠️  Skipped business ${i+1}: ${err.message?.substring(0, 50)}`);
    }
  }

  await browser.close();

  // Sort by score
  leads.sort((a, b) => b.score - a.score);

  // Save outputs
  const outDir = './output';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // JSON
  fs.writeFileSync(`${outDir}/${query}-${city.replace(/[^a-z0-9]/gi, '-')}.json`, JSON.stringify(leads, null, 2));
  
  // CSV
  const csvHeader = 'name,phone,website,address,rating,reviews,score,scoreReasons,city,scrapedDate\n';
  const csvRows = leads.map(l => 
    `"${l.name}","${l.phone}","${l.website}","${l.address}",${l.rating},${l.reviews},${l.score},"${l.scoreReasons.join(';')}","${l.city}","${l.scrapedDate}"`
  ).join('\n');
  fs.writeFileSync(`${outDir}/${query}-${city.replace(/[^a-z0-9]/gi, '-')}.csv`, csvHeader + csvRows);

  console.log(`\n🎯 Results: ${leads.length} leads saved to ./output/`);
  console.log(`🔥 Top leads:`);
  leads.slice(0, 5).forEach((l, i) => {
    console.log(`   ${i+1}. ${l.name} — Score: ${l.score} — ${l.phone || 'NO PHONE'} — ${l.website ? 'has website' : 'NO WEBSITE'}`);
  });
}

function scoreLead(website: string, reviews: number, phone: string, rating: number): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  if (!website) { score += 20; reasons.push('no_website'); }
  if (reviews < 50) { score += 10; reasons.push('small_business'); }
  if (phone) { score += 25; reasons.push('has_phone'); }
  // No after-hours detection without hours data, give benefit of doubt
  score += 15; reasons.push('likely_no_after_hours');
  if (rating > 0 && rating < 4.0) { score += 10; reasons.push('lower_rating'); }

  return { score, reasons };
}

// CLI
const args = process.argv.slice(2);
const query = args[0] || 'plumbers';
const city = args[1] || 'Gilbert, AZ';
const limit = parseInt(args[2] || '10');

scrape(query, city, limit);
