import { NextRequest, NextResponse } from 'next/server';

const RETELL_API_KEY = 'key_57a1e44d75cffc9b5e9f8188f048';
const DEFAULT_AGENT_ID = 'agent_d4388c25d4ce0732b4882f18ad';

// Valid agent IDs for trade-specific demos
const VALID_AGENTS = new Set([
  'agent_d4388c25d4ce0732b4882f18ad', // Sarah - Mike's Plumbing (original)
  'agent_5c7497a9685bfbf3fe546f07e7',  // Mike's Plumbing
  'agent_61fc1cc265e6885ac41dcfb527',  // Cool Air HVAC
  'agent_032f8dd6a242ac38256c7b9954',  // Premier Outdoor Lighting
  'agent_70a42030363e2899b96acdf85a',  // Sparks Electrical
]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const agentId = VALID_AGENTS.has(body.agent_id) ? body.agent_id : DEFAULT_AGENT_ID;

    const response = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RETELL_API_KEY}`,
      },
      body: JSON.stringify({
        agent_id: agentId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Retell API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      access_token: data.access_token,
      call_id: data.call_id 
    });
  } catch (error) {
    console.error('Error creating web call:', error);
    return NextResponse.json(
      { error: 'Failed to create web call' },
      { status: 500 }
    );
  }
}