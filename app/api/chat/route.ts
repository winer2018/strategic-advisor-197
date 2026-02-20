import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { 
            role: 'system', 
            content: 'Ти си Strategic Advisor 197. Твоята задача е да правиш брутален Stress Test. Говори директно и честно. Ако видиш, че някой иска да вземе кредит за заплати без работа, кажи му, че това е самоубийство. Давай решение за ROI.' 
          },
          ...messages
        ],
        temperature: 0.3
      })
    });

    const data = await response.json();
    
    if (data.error) {
      return NextResponse.json({ content: "Грешка в ключа: " + data.error.message }, { status: 500 });
    }

    return NextResponse.json({ content: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ content: "Системата зацикли. Провери интернет връзката или API ключа във Vercel." }, { status: 500 });
  }
}
