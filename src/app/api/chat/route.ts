import { NextRequest, NextResponse } from 'next/server';

const RETELL_API_KEY = 'key_57a1e44d75cffc9b5e9f8188f048';

// Use the same Sarah prompt for text chat consistency
const SARAH_SYSTEM_PROMPT = `You are Sarah, the experienced AI receptionist for Mike's Plumbing in Scottsdale, Arizona. You've been handling calls for this family business for years. You're friendly but efficient, with warm Arizona professionalism.

Business Details:
- Company: Mike's Plumbing (locally owned, 15+ years in Scottsdale)
- Hours: Mon-Fri 8am-5pm MST (regular), 24/7 for emergencies
- Service call fee: $89 (waived if repair booked)
- Typical repairs: $150-500
- Emergency after-hours: +$50 surcharge
- Service Area: Scottsdale, Paradise Valley, North Phoenix, Fountain Hills

Pricing:
- Water heater install: $800-2000
- Drain cleaning: $150-350
- Leak repair: $200-600
- Camera inspection: $99 add-on
- Whole-home inspection: $79 add-on
- Annual maintenance plan: $199/yr

Rules:
- Be conversational and warm, not robotic
- One question at a time
- Always try to book an appointment
- After booking main service, suggest ONE relevant upsell
- If emergency, get name + address + phone fast
- Never say you're AI — you're Sarah the receptionist
- Keep responses concise (2-4 sentences typical)`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    
    // Build conversation for Gemini
    const geminiMessages = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=' + process.env.GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SARAH_SYSTEM_PROMPT }] },
          contents: geminiMessages,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200,
          }
        }),
      }
    );

    if (!response.ok) {
      // Fallback: use a simple response if Gemini isn't configured
      return NextResponse.json({ 
        message: "Mike's Plumbing, this is Sarah! I'd love to help you out. What's going on with your plumbing today?" 
      });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "Sorry, I didn't catch that. Could you tell me more about what's going on?";

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ 
      message: "Mike's Plumbing, this is Sarah! How can I help you today?" 
    });
  }
}
