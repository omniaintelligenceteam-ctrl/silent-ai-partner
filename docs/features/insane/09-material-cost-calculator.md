# Real-Time Material Cost Calculator
**Status:** 💡 Future
**Tier:** Office Manager ($497)

Customer describes the job on the phone. She calculates materials needed, checks supplier prices, and builds a cost estimate before you hang up.

## How It Works
1. Customer: "I need a 50-gallon gas water heater installed"
2. Agent knows: 50-gal gas water heater + expansion tank + connectors + venting + permit
3. Checks supplier pricing (Home Depot API, Ferguson, local supplier)
4. Calculates: Materials ($800) + Labor (3hrs × $125 = $375) + Permit ($75) = $1,250
5. Tells customer: "Based on what you're describing, a 50-gallon gas water heater install typically runs $1,100 to $1,400 including parts and labor."

## Data Sources
- Supplier APIs (Home Depot Pro, Ferguson, Supply House)
- Business's labor rates
- Local permit costs
- Historical job costs from the business's own data
