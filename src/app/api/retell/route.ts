import { NextRequest, NextResponse } from 'next/server';

const RETELL_API_KEY = 'key_57a1e44d75cffc9b5e9f8188f048';
const AGENT_ID = 'agent_d4388c25d4ce0732b4882f18ad';

export async function POST(request: NextRequest) {
  try {
    const response = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RETELL_API_KEY}`,
      },
      body: JSON.stringify({
        agent_id: AGENT_ID,
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