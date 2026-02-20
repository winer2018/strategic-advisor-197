import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `ВИЕ СТЕ STRATEGIC ADVISOR 197 – ЕЛЕМЕНТ ОТ SOVEREIGN ARCHITECTURE™.
        ВАШАТА ЦЕЛ: ДА ПЕСТИТЕ ВРЕМЕТО НА КЛИЕНТА ЧРЕЗ АДАПТИВНА ИНТЕЛИГЕНТНОСТ.
        
        ПРАВИЛА НА РАБОТА:
        1. Ако входните данни са недостатъчни за категорично решение, НЕ ХАЛЮЦИНИРАЙТЕ. Спрете и задайте точно ОПРЕДЕЛЕН уточняващ въпрос.
        2. Фокусирайте се върху ROI и бизнес логиката.
        3. Използвайте спокоен, професионален и директен тон.
        4. Забранени думи: "брутално", "екзекуция" (заменяй с "Реализация"), "Понеделник сутрин".`
      },
      ...messages,
    ],
  });

  // Преобразуваме отговора в съвместим стрийм
  const stream = OpenAIStream(response as any);
  return new StreamingTextResponse(stream);
}
