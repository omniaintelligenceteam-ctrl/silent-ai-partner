import * as fs from 'fs';
import * as path from 'path';
import * as createCsvWriter from 'csv-writer';
import { BusinessLead } from './types';

export class OutputManager {
  private outputDir: string;

  constructor(outputDir: string = './output') {
    this.outputDir = outputDir;
    this.ensureOutputDirectory();
  }

  private ensureOutputDirectory(): void {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async saveAsCSV(leads: BusinessLead[], filename?: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const csvFileName = filename || `leads-${timestamp}.csv`;
    const csvPath = path.join(this.outputDir, csvFileName);

    const csvWriter = createCsvWriter.createObjectCsvWriter({
      path: csvPath,
      header: [
        { id: 'name', title: 'name' },
        { id: 'phone', title: 'phone' },
        { id: 'email', title: 'email' },
        { id: 'website', title: 'website' },
        { id: 'address', title: 'address' },
        { id: 'rating', title: 'rating' },
        { id: 'reviews', title: 'reviews' },
        { id: 'hours', title: 'hours' },
        { id: 'score', title: 'score' },
        { id: 'category', title: 'category' },
        { id: 'city', title: 'city' },
        { id: 'scrapedDate', title: 'scraped_date' }
      ]
    });

    await csvWriter.writeRecords(leads);
    console.log(`💾 Saved CSV: ${csvPath} (${leads.length} leads)`);
    return csvPath;
  }

  async saveAsJSON(leads: BusinessLead[], filename?: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const jsonFileName = filename || `leads-${timestamp}.json`;
    const jsonPath = path.join(this.outputDir, jsonFileName);

    const jsonData = JSON.stringify(leads, null, 2);
    fs.writeFileSync(jsonPath, jsonData, 'utf8');
    
    console.log(`💾 Saved JSON: ${jsonPath} (${leads.length} leads)`);
    return jsonPath;
  }

  printSummary(leads: BusinessLead[]): void {
    console.log('\n📊 SCRAPING SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total leads found: ${leads.length}`);
    
    // Contact information stats
    const withPhone = leads.filter(l => l.phone).length;
    const withEmail = leads.filter(l => l.email).length;
    const withWebsite = leads.filter(l => l.website).length;
    const withBothPhoneEmail = leads.filter(l => l.phone && l.email).length;
    
    console.log(`\n📞 Contact Information:`);
    console.log(`  Leads with phone: ${withPhone} (${Math.round(withPhone/leads.length*100)}%)`);
    console.log(`  Leads with email: ${withEmail} (${Math.round(withEmail/leads.length*100)}%)`);
    console.log(`  Leads with website: ${withWebsite} (${Math.round(withWebsite/leads.length*100)}%)`);
    console.log(`  Leads with phone + email: ${withBothPhoneEmail} (${Math.round(withBothPhoneEmail/leads.length*100)}%)`);
    
    // Score distribution
    const highScore = leads.filter(l => l.score >= 70).length;
    const mediumScore = leads.filter(l => l.score >= 40 && l.score < 70).length;
    const lowScore = leads.filter(l => l.score < 40).length;
    
    console.log(`\n🎯 Lead Quality:`);
    console.log(`  High quality leads (70+ score): ${highScore}`);
    console.log(`  Medium quality leads (40-69 score): ${mediumScore}`);
    console.log(`  Low quality leads (<40 score): ${lowScore}`);
    
    // Top reasons
    const allReasons = leads.flatMap(l => l.scoreReasons);
    const reasonCounts = allReasons.reduce((acc, reason) => {
      acc[reason] = (acc[reason] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('\n📈 Top lead quality indicators:');
    Object.entries(reasonCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([reason, count]) => {
        console.log(`  ${this.formatReason(reason)}: ${count} leads`);
      });

    // Top scoring leads
    const topLeads = leads
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    if (topLeads.length > 0) {
      console.log('\n🏆 TOP 5 LEADS:');
      topLeads.forEach((lead, i) => {
        const contactInfo = [
          lead.phone ? `📞 ${lead.phone}` : null,
          lead.email ? `📧 ${lead.email}` : null
        ].filter(Boolean).join(', ') || 'No contact info';
        
        console.log(`${i + 1}. ${lead.name} (${lead.score} pts) - ${contactInfo}`);
      });
    }

    console.log('='.repeat(50));
  }

  private formatReason(reason: string): string {
    const reasonMap: Record<string, string> = {
      'no_website': 'No website',
      'communication_issues': 'Communication issues in reviews',
      'small_business': 'Small business (few reviews)',
      'no_after_hours': 'No after-hours coverage',
      'has_phone': 'Has phone number'
    };
    
    return reasonMap[reason] || reason;
  }
}