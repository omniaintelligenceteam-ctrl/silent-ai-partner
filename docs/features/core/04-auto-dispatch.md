# Auto-Dispatch to Right Technician
**Status:** 🔜 Planned
**Tier:** Office Manager ($497)

After booking a job, texts the RIGHT technician based on skill, location, and availability. "Mike, you got a tankless install at 9am Thursday at 123 Oak St."

## How It Works
1. Job booked via call → calendar
2. Agent checks tech roster: skills, current schedule, location
3. Matches best tech for the job
4. Sends SMS to tech with: job type, time, address, customer name, special notes
5. Tech confirms via text reply
6. If no confirmation in 15 min, escalates to next available tech

## Data Needed per Tech
- Name + phone
- Skills/certifications (plumbing, HVAC, electrical, etc.)
- Service area / zip codes
- Schedule / availability
- Seniority (for complex jobs)

## Smart Matching Logic
- Emergency → closest available tech
- Specialized job → certified tech only
- New customer → most experienced tech (first impression matters)
- Repeat customer → same tech as last time (relationship)
