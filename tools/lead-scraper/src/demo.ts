#!/usr/bin/env node

import { BusinessLead } from './types';
import { OutputManager } from './output';

// Generate sample lead data for demonstration
function generateSampleLeads(): BusinessLead[] {
  const sampleLeads: BusinessLead[] = [
    {
      name: "Mike's Emergency Plumbing",
      phone: "(480) 555-1234",
      email: "",
      website: "",
      address: "123 Main St, Scottsdale, AZ",
      rating: 4.2,
      reviews: 15,
      hours: "Mon-Fri 8-5",
      score: 85,
      category: "Plumber",
      city: "Scottsdale, AZ",
      scrapedDate: "2026-02-11",
      scoreReasons: ["no_website", "small_business", "no_after_hours", "has_phone"]
    },
    {
      name: "Desert Rose Plumbing LLC",
      phone: "(602) 555-5678",
      email: "info@desertroseplumbing.com",
      website: "https://desertroseplumbing.com",
      address: "456 Oak Ave, Scottsdale, AZ",
      rating: 4.7,
      reviews: 89,
      hours: "Mon-Fri 7-6, Sat 8-4",
      score: 35,
      category: "Plumber",
      city: "Scottsdale, AZ",
      scrapedDate: "2026-02-11",
      scoreReasons: ["has_phone"]
    },
    {
      name: "Quick Fix Plumbing",
      phone: "",
      email: "",
      website: "",
      address: "789 Desert Rd, Scottsdale, AZ",
      rating: 3.8,
      reviews: 7,
      hours: "Mon-Fri 9-5",
      score: 45,
      category: "Plumber",
      city: "Scottsdale, AZ",
      scrapedDate: "2026-02-11",
      scoreReasons: ["no_website", "small_business", "no_after_hours"]
    },
    {
      name: "Ace Plumbing & Drain Cleaning",
      phone: "(480) 555-9999",
      email: "service@aceplumbing.biz",
      website: "",
      address: "321 Cactus Blvd, Scottsdale, AZ",
      rating: 4.1,
      reviews: 23,
      hours: "Mon-Fri 8-5",
      score: 100,
      category: "Plumber",
      city: "Scottsdale, AZ",
      scrapedDate: "2026-02-11",
      scoreReasons: ["no_website", "communication_issues", "small_business", "no_after_hours", "has_phone"]
    },
    {
      name: "Valley Wide Plumbing Services",
      phone: "(623) 555-2468",
      email: "contact@valleywideplumbing.com",
      website: "https://valleywideplumbing.com",
      address: "654 Mountain View Dr, Scottsdale, AZ",
      rating: 4.9,
      reviews: 156,
      hours: "24/7 Emergency Service",
      score: 25,
      category: "Plumber",
      city: "Scottsdale, AZ",
      scrapedDate: "2026-02-11",
      scoreReasons: ["has_phone"]
    }
  ];

  return sampleLeads;
}

async function runDemo() {
  console.log('🚀 Silent AI Partner Lead Scraper - DEMO MODE');
  console.log('=============================================');
  console.log('🔍 Query: plumbers');
  console.log('📍 Location(s): Scottsdale, AZ');
  console.log('📊 Limit: 5 per city');
  console.log('');
  console.log('📝 Generating sample lead data...');

  const leads = generateSampleLeads();
  const outputManager = new OutputManager('./output');

  console.log('💾 Saving results...');
  
  // Save to both CSV and JSON
  await outputManager.saveAsCSV(leads, 'demo-leads.csv');
  await outputManager.saveAsJSON(leads, 'demo-leads.json');

  // Print summary
  outputManager.printSummary(leads);
  
  console.log('✅ Demo completed!');
  console.log('📁 Check the output/ folder for generated files.');
  console.log('');
  console.log('🎯 HIGH-VALUE LEADS FOUND:');
  const highValueLeads = leads.filter(l => l.score >= 70);
  highValueLeads.forEach((lead, i) => {
    console.log(`${i + 1}. ${lead.name}`);
    console.log(`   📞 ${lead.phone || 'No phone'}`);
    console.log(`   📧 ${lead.email || 'No email'}`);
    console.log(`   🌐 ${lead.website || 'No website'}`);
    console.log(`   🏠 ${lead.address}`);
    console.log(`   ⭐ ${lead.rating} stars (${lead.reviews} reviews)`);
    console.log(`   💰 Score: ${lead.score}/100`);
    console.log(`   ✅ ${lead.scoreReasons.map(r => r.replace('_', ' ')).join(', ')}`);
    console.log('');
  });
}

runDemo().catch(console.error);