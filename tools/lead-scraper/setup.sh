#!/bin/bash

echo "🚀 Setting up Silent AI Partner Lead Scraper..."
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🌐 Installing Playwright browser..."
npx playwright install chromium

echo "🧪 Running demo test..."
npx ts-node src/demo.ts

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 Usage Examples:"
echo "==================="
echo ""
echo "# Search for plumbers in Phoenix"
echo "npx ts-node src/index.ts --query \"plumbers\" --city \"Phoenix, AZ\" --limit 20"
echo ""
echo "# Search for HVAC contractors in multiple cities"  
echo "npx ts-node src/index.ts --query \"HVAC contractors\" --cities \"Phoenix,AZ;Scottsdale,AZ\" --limit 30"
echo ""
echo "# Quick test (5 results)"
echo "npm run test"
echo ""
echo "🎉 Happy lead hunting!"