/**
 * Lite Lead Scraper — Uses Brave Search API (via web_search)
 * Zero browser, zero memory issues
 * 
 * Usage: Run via G — "scrape plumbers in Gilbert, AZ"
 * G will use web_search + web_fetch to pull leads and save them here
 */

import * as fs from 'fs';

export interface Lead {
  name: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  city: string;
  score: number;
  scoreReasons: string[];
  scrapedDate: string;
}

export function scoreLead(lead: Partial<Lead>): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  if (!lead.website) { score += 20; reasons.push('no_website'); }
  if (lead.phone) { score += 25; reasons.push('has_phone'); }
  if (lead.email) { score += 10; reasons.push('has_email'); }
  score += 15; reasons.push('likely_no_after_hours');

  return { score, reasons };
}

export function saveLeads(leads: Lead[], query: string, city: string) {
  const outDir = __dirname + '/../output';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const filename = `${query}-${city.replace(/[^a-z0-9]/gi, '-')}`;
  
  // JSON
  fs.writeFileSync(`${outDir}/${filename}.json`, JSON.stringify(leads, null, 2));
  
  // CSV
  const csvHeader = 'name,phone,email,website,address,score,scoreReasons,city,scrapedDate\n';
  const csvRows = leads.map(l =>
    `"${l.name}","${l.phone}","${l.email}","${l.website}","${l.address}",${l.score},"${l.scoreReasons.join(';')}","${l.city}","${l.scrapedDate}"`
  ).join('\n');
  fs.writeFileSync(`${outDir}/${filename}.csv`, csvHeader + csvRows);

  console.log(`✅ Saved ${leads.length} leads to output/${filename}.*`);
}

// If run directly, read from stdin (pipe JSON leads in)
if (require.main === module) {
  let data = '';
  process.stdin.on('data', chunk => data += chunk);
  process.stdin.on('end', () => {
    try {
      const input = JSON.parse(data);
      const leads: Lead[] = input.leads || input;
      const query = input.query || 'leads';
      const city = input.city || 'unknown';
      saveLeads(leads, query, city);
    } catch (e) {
      console.error('Pipe JSON leads: { leads: [...], query: "plumbers", city: "Gilbert, AZ" }');
    }
  });
}
