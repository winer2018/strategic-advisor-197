import { NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key missing' }, { status: 500 });
    }

    const lastMessage = messages[messages.length - 1].content;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Ти си ПАКЕТ 197: STRATEGIC ADVISOR. 
          Анализирай този казус брутално реалистично. Фокус: ROI и 50% спад на оборота. 
          Без празни приказки. Казус: ${lastMessage}` }] }],
        }),
      }
    );

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Грешка в логическия мост.';

    return NextResponse.json({ role: 'assistant', content: aiResponse });
  } catch (error) {
    return NextResponse.json({ error: 'System Failure' }, { status: 500 });
  }
}
