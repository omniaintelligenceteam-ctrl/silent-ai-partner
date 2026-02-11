#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { GoogleMapsScraper } from './scraper';
import { OutputManager } from './output';
import { ScrapingOptions } from './types';

const program = new Command();

program
  .name('lead-scraper')
  .description('Google Maps lead scraper for Silent AI Partner with email extraction')
  .version('2.0.0');

program
  .requiredOption('-q, --query <query>', 'Business category to search (e.g., "plumbers", "HVAC contractors")')
  .option('-c, --city <city>', 'City to search in (e.g., "Phoenix, AZ")')
  .option('--cities <cities>', 'Multiple cities separated by semicolons (e.g., "Phoenix,AZ;Scottsdale,AZ")')
  .option('-l, --limit <limit>', 'Maximum number of results per city', '50')
  .option('-o, --output <directory>', 'Output directory', './output')
  .option('--csv-only', 'Only output CSV file')
  .option('--json-only', 'Only output JSON file')
  .action(async (options) => {
    await runScraper(options);
  });

async function runScraper(options: any) {
  console.log(chalk.blue('🚀 Silent AI Partner Lead Scraper'));
  console.log(chalk.blue('====================================='));

  // Validate input
  if (!options.city && !options.cities) {
    console.error(chalk.red('❌ Error: Either --city or --cities must be specified'));
    process.exit(1);
  }

  const scrapingOptions: ScrapingOptions = {
    query: options.query,
    limit: parseInt(options.limit),
    outputDir: options.output
  };

  if (options.cities) {
    scrapingOptions.cities = options.cities.split(';').map((city: string) => city.trim());
  } else {
    scrapingOptions.city = options.city;
  }

  console.log(chalk.cyan(`🔍 Query: ${scrapingOptions.query}`));
  console.log(chalk.cyan(`📍 Location(s): ${scrapingOptions.cities?.join(', ') || scrapingOptions.city}`));
  console.log(chalk.cyan(`📊 Limit: ${scrapingOptions.limit} per city`));
  console.log('');

  const scraper = new GoogleMapsScraper();
  const outputManager = new OutputManager(scrapingOptions.outputDir);

  try {
    // Initialize the scraper
    console.log(chalk.yellow('⏳ Initializing browser...'));
    await scraper.initialize();

    // Start scraping
    console.log(chalk.yellow('🕷️  Starting scrape...'));
    const startTime = Date.now();
    
    const leads = await scraper.scrapeBusinesses(scrapingOptions);
    
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);

    if (leads.length === 0) {
      console.log(chalk.yellow('⚠️  No leads found. Try adjusting your search query or location.'));
      return;
    }

    // Sort leads by score (highest first)
    leads.sort((a, b) => b.score - a.score);

    // Save output
    console.log(chalk.green('💾 Saving results...'));
    
    if (!options.jsonOnly) {
      await outputManager.saveAsCSV(leads);
    }
    
    if (!options.csvOnly) {
      await outputManager.saveAsJSON(leads);
    }

    // Print summary
    outputManager.printSummary(leads);
    
    console.log(chalk.green(`\n✅ Scraping completed in ${duration}s`));
    console.log(chalk.green(`📈 Found ${leads.length} quality leads!`));

  } catch (error) {
    console.error(chalk.red('❌ Error during scraping:'), error);
    process.exit(1);
  } finally {
    await scraper.close();
  }
}

// Handle uncaught errors
process.on('uncaughtException', async (error) => {
  console.error(chalk.red('❌ Uncaught Exception:'), error);
  process.exit(1);
});

process.on('unhandledRejection', async (error) => {
  console.error(chalk.red('❌ Unhandled Rejection:'), error);
  process.exit(1);
});

// Parse command line arguments
program.parse();