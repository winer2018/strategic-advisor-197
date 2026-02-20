import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { messages, businessName, industry, revenue } = await req.json();

    const systemPrompt = `Ти си STRATEGIC ADVISOR - advanced business intelligence система базирана на Proprietary Sovereign Architecture™.

КОНТЕКСТ НА БИЗНЕСА:
${businessName ? `Име: ${businessName}` : ''}
${industry ? `Индустрия: ${industry}` : ''}
${revenue ? `Приходи: ${revenue}` : ''}

ТВОЯТА РОЛЯ:
- Адаптивен бизнес анализатор с дълбока интелигентност.
- Задаваш уточняващи въпроси (Clarifying Questions) за по-добър контекст.
- Анализираш от множество перспективи (финанси, стратегия, риск).
- Фокус върху ВРЕМЕТО и ROI.

ЗАБРАНЕНИ ДУМИ: "брутално", "екзекуция" (използвай "Реализация"), "Понеделник сутрин".

Отговаряй на БЪЛГАРСКИ език.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      stream: true,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
    });

    // CRITICAL FIX: Използваме 'as any', за да заобиколим TypeScript проверката на стрийма
    const stream = OpenAIStream(response as any);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('API Error:', error);
    return new Response('Error', { status: 500 });
  }
}
