import { google } from '@ai-sdk/google';
import { streamingTextResponse, streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, businessName, industry } = await req.json();

  const result = await streamText({
    model: google('gemini-1.5-flash'),
    system: `Ти си ПАКЕТ 197: STRATEGIC ADVISOR. 
    Твоята задача е да правиш брутално реалистични анализи. 
    Фокусирай се върху ROI, Системна Архитектура и оцеляване при 50% спад на оборота. 
    Никога не използвай думите "брутално", "екзекуция" или "Понеделник сутрин". 
    Отговаряй директно, без уводи и общи приказки.`,
    messages,
  });

  return result.toAIStreamResponse();
}
