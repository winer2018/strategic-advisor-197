import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Ти си Strategic Advisor 197. Твоята задача е да правиш Stress Test на бизнес казуси. Бъди брутално реалистичен. Ако видиш логическа грешка или емоционално решение (като теглене на заем за заплати без оборот), диагностицирай го като "Крадец на логика". Давай решения за ROI и Реализация.'
        },
        ...messages
      ],
      temperature: 0.2, // По-ниска температура за по-точна логика
    });

    return NextResponse.json({ content: response.choices[0].message.content });
  } catch (error: any) {
    console.error('API ERROR:', error);
    return NextResponse.json({ error: 'Грешка при връзката с мозъка на системата.' }, { status: 500 });
  }
}
