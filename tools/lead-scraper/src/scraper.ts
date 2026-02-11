import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { BusinessLead, ScrapingOptions, ScoreCalculation, ReviewAnalysis, EmailExtractionResult } from './types';

export class GoogleMapsScraper {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;

  async initialize(): Promise<void> {
    this.browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    this.context = await this.browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
      viewport: { width: 1366, height: 768 }
    });

    this.page = await this.context.newPage();
  }

  async scrapeBusinesses(options: ScrapingOptions): Promise<BusinessLead[]> {
    if (!this.page) throw new Error('Scraper not initialized');

    const allLeads: BusinessLead[] = new Map<string, BusinessLead>().values as any;
    const leads = new Map<string, BusinessLead>();
    
    const citiesToProcess = options.cities || [options.city || ''];

    for (const city of citiesToProcess) {
      const searchQuery = `${options.query} in ${city}`;
      console.log(`🔍 Searching for: ${searchQuery}`);

      try {
        const cityLeads = await this.scrapeCity(searchQuery, options.limit, city);
        
        // Deduplicate by phone number
        cityLeads.forEach(lead => {
          if (lead.phone && !leads.has(lead.phone)) {
            leads.set(lead.phone, lead);
          } else if (!lead.phone) {
            // For businesses without phone, use name + address as key
            const key = `${lead.name}_${lead.address}`;
            if (!leads.has(key)) {
              leads.set(key, lead);
            }
          }
        });

        // Random delay between cities
        await this.randomDelay(2000, 3000);
        
      } catch (error) {
        console.error(`❌ Error scraping ${city}:`, error);
      }
    }

    return Array.from(leads.values());
  }

  private async scrapeCity(searchQuery: string, limit: number, city: string): Promise<BusinessLead[]> {
    if (!this.page) throw new Error('Page not initialized');

    // Navigate directly to Google Maps search results
    const encodedQuery = encodeURIComponent(searchQuery);
    await this.page.goto(`https://www.google.com/maps/search/${encodedQuery}`, { timeout: 60000, waitUntil: 'domcontentloaded' });
    
    // Wait for results to load
    await this.page.waitForTimeout(5000);

    // Scroll to load more results
    await this.loadMoreResults(limit);

    // Extract business information
    return await this.extractBusinessData(limit, city);
  }

  private async loadMoreResults(limit: number): Promise<void> {
    if (!this.page) return;

    const scrollContainer = this.page.locator('[role="main"]').first();
    let loadedCount = 0;
    let lastHeight = 0;

    while (loadedCount < limit) {
      // Scroll down in the results panel
      await scrollContainer.evaluate(el => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.scrollTop !== undefined) {
          htmlEl.scrollTop += 1000;
        }
      });

      await this.randomDelay(1500, 2500);

      // Check if we've loaded new results
      const currentResults = await this.page.locator('[data-result-index]').count();
      if (currentResults === loadedCount) {
        // Try scrolling to end to trigger "load more"
        await scrollContainer.evaluate(el => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.scrollTop !== undefined && htmlEl.scrollHeight !== undefined) {
            htmlEl.scrollTop = htmlEl.scrollHeight;
          }
        });
        await this.randomDelay(2000, 3000);
      }

      loadedCount = currentResults;
      
      // Break if no new results after several attempts
      if (loadedCount >= limit) break;
    }
  }

  private async extractBusinessData(limit: number, city: string): Promise<BusinessLead[]> {
    if (!this.page) return [];

    const businesses: BusinessLead[] = [];
    
    // Get all business result elements
    const businessElements = await this.page.locator('[data-result-index]').all();
    const processCount = Math.min(businessElements.length, limit);

    console.log(`📊 Found ${businessElements.length} businesses, processing ${processCount}`);

    for (let i = 0; i < processCount; i++) {
      try {
        const element = businessElements[i];
        
        // Click on the business to load details
        await element.click();
        await this.randomDelay(1500, 2500);

        // Extract business data
        const business = await this.extractSingleBusiness(city);
        if (business) {
          businesses.push(business);
          console.log(`✅ Extracted: ${business.name} (Score: ${business.score})`);
        }

        await this.randomDelay(1000, 2000);
        
      } catch (error) {
        console.error(`❌ Error extracting business ${i}:`, error);
      }
    }

    return businesses;
  }

  private async extractSingleBusiness(city: string): Promise<BusinessLead | null> {
    if (!this.page) return null;

    try {
      // Wait for the detail panel to load
      await this.page.waitForTimeout(2000);

      // Extract name
      const nameElement = await this.page.locator('h1').first();
      const name = await nameElement.textContent() || '';

      // Extract phone
      let phone = '';
      try {
        const phoneElement = this.page.locator('[data-value*="Call"]').or(
          this.page.locator('button[data-value]').filter({ hasText: /^\+?\d/ })
        );
        const phoneText = await phoneElement.first().getAttribute('data-value');
        phone = phoneText || '';
      } catch {}

      // Extract website
      let website = '';
      try {
        const websiteElement = this.page.locator('a[data-value*="http"]').first();
        website = await websiteElement.getAttribute('data-value') || '';
      } catch {}

      // Extract address
      let address = '';
      try {
        const addressElement = this.page.locator('button[data-value*="directions"]').first();
        const addressText = await addressElement.getAttribute('data-value');
        address = addressText?.replace(/^directions,/, '') || '';
      } catch {}

      // Extract rating and review count
      let rating = 0;
      let reviews = 0;
      try {
        const ratingText = await this.page.locator('span.MW4etd').first().textContent();
        if (ratingText) {
          rating = parseFloat(ratingText) || 0;
        }
        
        const reviewElement = await this.page.locator('button').filter({ hasText: /reviews?$/ }).first();
        const reviewText = await reviewElement.textContent();
        if (reviewText) {
          const match = reviewText.match(/(\d+(?:,\d+)*)\s*reviews?/);
          reviews = match ? parseInt(match[1].replace(/,/g, '')) : 0;
        }
      } catch {}

      // Extract hours
      let hours = '';
      try {
        // Look for hours information
        const hoursButton = this.page.locator('button').filter({ hasText: /hours|open|closed/i });
        const hoursText = await hoursButton.first().textContent();
        hours = hoursText || '';
      } catch {}

      // Analyze reviews for communication issues
      const reviewAnalysis = await this.analyzeReviews();

      // Extract email from Google Maps and website
      const email = await this.extractEmail(website);

      // Calculate score
      const scoreData = this.calculateScore({
        website,
        reviews,
        phone,
        hours,
        reviewAnalysis
      });

      const business: BusinessLead = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        website: website.trim(),
        address: address.trim(),
        rating,
        reviews,
        hours: hours.trim(),
        score: scoreData.score,
        category: this.extractCategory(name),
        city,
        scrapedDate: new Date().toISOString().split('T')[0],
        scoreReasons: scoreData.reasons
      };

      return business;

    } catch (error) {
      console.error('Error extracting business data:', error);
      return null;
    }
  }

  private async analyzeReviews(): Promise<ReviewAnalysis> {
    if (!this.page) return { hasCommunicationIssues: false, keywords: [] };

    const keywords = [
      "couldn't reach", "no answer", "voicemail", "never called back", 
      "hard to get ahold of", "doesn't answer", "unreachable", 
      "missed calls", "no response"
    ];

    try {
      // Try to find and read first few reviews
      const reviewElements = await this.page.locator('[data-review-id]').all();
      const reviewTexts: string[] = [];

      for (let i = 0; i < Math.min(3, reviewElements.length); i++) {
        try {
          const reviewText = await reviewElements[i].locator('.wiI7pd').textContent();
          if (reviewText) reviewTexts.push(reviewText.toLowerCase());
        } catch {}
      }

      const foundKeywords: string[] = [];
      let hasCommunicationIssues = false;

      keywords.forEach(keyword => {
        const found = reviewTexts.some(review => review.includes(keyword));
        if (found) {
          foundKeywords.push(keyword);
          hasCommunicationIssues = true;
        }
      });

      return {
        hasCommunicationIssues,
        keywords: foundKeywords
      };

    } catch (error) {
      return { hasCommunicationIssues: false, keywords: [] };
    }
  }

  private async extractEmail(websiteUrl: string): Promise<string> {
    if (!this.page) return '';

    const emails: string[] = [];

    try {
      // First, try to extract email from the current Google Maps listing
      const mapEmail = await this.extractEmailFromGoogleMaps();
      if (mapEmail) emails.push(mapEmail);

      // If we have a website, scrape it for emails
      if (websiteUrl) {
        console.log(`📧 Extracting email from website: ${websiteUrl}`);
        const websiteEmails = await this.extractEmailFromWebsite(websiteUrl);
        emails.push(...websiteEmails);
      }

      // Return the first valid email found, or empty string
      const validEmails = emails.filter(email => this.isValidEmail(email));
      return validEmails.length > 0 ? validEmails[0] : '';

    } catch (error) {
      console.error('❌ Error extracting email:', error);
      return '';
    }
  }

  private async extractEmailFromGoogleMaps(): Promise<string> {
    if (!this.page) return '';

    try {
      // Look for email in the business details panel
      const emailButtons = this.page.locator('button[data-value*="@"]').or(
        this.page.locator('a[href*="mailto:"]')
      );

      const emailElement = await emailButtons.first();
      if (await emailElement.count() > 0) {
        const dataValue = await emailElement.getAttribute('data-value');
        if (dataValue && dataValue.includes('@')) {
          return this.cleanEmail(dataValue);
        }

        const href = await emailElement.getAttribute('href');
        if (href && href.includes('mailto:')) {
          return this.cleanEmail(href.replace('mailto:', ''));
        }
      }

      // Also check for email in text content
      const detailsPanel = this.page.locator('[role="main"]');
      const textContent = await detailsPanel.textContent();
      if (textContent) {
        const emailMatch = textContent.match(/[\w.-]+@[\w.-]+\.\w+/);
        if (emailMatch) {
          return this.cleanEmail(emailMatch[0]);
        }
      }

    } catch (error) {
      // Fail silently for Google Maps email extraction
    }

    return '';
  }

  private async extractEmailFromWebsite(websiteUrl: string): Promise<string[]> {
    if (!this.page) return [];

    const emails: string[] = [];
    
    try {
      // Add delay before visiting website
      await this.randomDelay(2000, 3000);

      // Visit homepage
      await this.page.goto(websiteUrl, { 
        timeout: 15000,
        waitUntil: 'domcontentloaded'
      });
      await this.randomDelay(1500, 2500);

      // Extract emails from homepage
      const homepageEmails = await this.extractEmailsFromPage();
      emails.push(...homepageEmails);

      // Try to visit contact page
      const contactEmails = await this.visitContactPage();
      emails.push(...contactEmails);

    } catch (error) {
      console.error(`❌ Error scraping website ${websiteUrl}:`, error);
    }

    return emails;
  }

  private async extractEmailsFromPage(): Promise<string[]> {
    if (!this.page) return [];

    const emails: string[] = [];

    try {
      // Get page content
      const content = await this.page.content();
      
      // Extract mailto links
      const mailtoLinks = await this.page.locator('a[href^="mailto:"]').all();
      for (const link of mailtoLinks) {
        const href = await link.getAttribute('href');
        if (href) {
          const email = href.replace('mailto:', '').split('?')[0]; // Remove query parameters
          emails.push(this.cleanEmail(email));
        }
      }

      // Extract emails from text content using regex
      const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
      const textEmails = content.match(emailRegex) || [];
      emails.push(...textEmails.map(email => this.cleanEmail(email)));

      // Look for common email patterns in text
      const commonPatterns = [
        /info@[\w.-]+\.\w+/gi,
        /contact@[\w.-]+\.\w+/gi,
        /office@[\w.-]+\.\w+/gi,
        /hello@[\w.-]+\.\w+/gi,
        /support@[\w.-]+\.\w+/gi,
        /sales@[\w.-]+\.\w+/gi
      ];

      for (const pattern of commonPatterns) {
        const matches = content.match(pattern) || [];
        emails.push(...matches.map(email => this.cleanEmail(email)));
      }

    } catch (error) {
      console.error('❌ Error extracting emails from page:', error);
    }

    return emails;
  }

  private async visitContactPage(): Promise<string[]> {
    if (!this.page) return [];

    const emails: string[] = [];

    try {
      // Look for contact page links
      const contactLinks = this.page.locator('a').filter({
        hasText: /contact|about|reach|touch/i
      });

      const contactLink = await contactLinks.first();
      if (await contactLink.count() > 0) {
        await contactLink.click();
        await this.randomDelay(2000, 3000);

        // Extract emails from contact page
        const contactEmails = await this.extractEmailsFromPage();
        emails.push(...contactEmails);
      }

    } catch (error) {
      // Fail silently if contact page doesn't exist or can't be accessed
    }

    return emails;
  }

  private cleanEmail(email: string): string {
    // Remove common prefixes and clean up
    return email
      .replace(/^mailto:/, '')
      .replace(/[<>()[\]"']/g, '')
      .trim()
      .toLowerCase();
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && 
           !email.includes('example.com') && 
           !email.includes('test.com') &&
           !email.includes('placeholder');
  }

  private calculateScore(data: {
    website: string;
    reviews: number;
    phone: string;
    hours: string;
    reviewAnalysis: ReviewAnalysis;
  }): ScoreCalculation {
    let score = 0;
    const reasons: string[] = [];

    // No website = +20 (they need help)
    if (!data.website) {
      score += 20;
      reasons.push('no_website');
    }

    // Low reviews mentioning communication issues = +30
    if (data.reviewAnalysis.hasCommunicationIssues) {
      score += 30;
      reasons.push('communication_issues');
    }

    // Small business (few reviews) = +10
    if (data.reviews < 50) {
      score += 10;
      reasons.push('small_business');
    }

    // No after-hours coverage = +15
    const hasAfterHours = /24|24\/7|24 hours|after hours/i.test(data.hours);
    if (!hasAfterHours && data.hours) {
      score += 15;
      reasons.push('no_after_hours');
    }

    // Has phone number = +25
    if (data.phone) {
      score += 25;
      reasons.push('has_phone');
    }

    return { score: Math.min(score, 100), reasons };
  }

  private extractCategory(businessName: string): string {
    const name = businessName.toLowerCase();
    
    if (name.includes('plumb')) return 'Plumber';
    if (name.includes('hvac') || name.includes('heating') || name.includes('cooling')) return 'HVAC';
    if (name.includes('electric')) return 'Electrician';
    if (name.includes('landscape') || name.includes('lawn')) return 'Landscaper';
    if (name.includes('roofing') || name.includes('roof')) return 'Roofer';
    if (name.includes('pest') || name.includes('exterminator')) return 'Pest Control';
    if (name.includes('clean')) return 'Cleaning Service';
    if (name.includes('handyman') || name.includes('repair')) return 'Handyman';
    
    return 'Service Contractor';
  }

  private async randomDelay(min: number, max: number): Promise<void> {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    await this.page?.waitForTimeout(delay);
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }
}