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
- Адаптивен бизнес анализатор с дълбока интелигентност
- Задаваш clarifying въпроси за по-добър контекст
- Итеративно подобряваш препоръките
- Анализираш от множество перспективи
- Фокус на ВРЕМЕТО като най-ценен ресурс

Отговаряй на БЪЛГАРСКИ език.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      stream: true,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    // CRITICAL FIX: Convert OpenAI stream to proper format using type cast
    const stream = OpenAIStream(response as any);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response(JSON.stringify({ error: 'Грешка при анализа.' }), { status: 500 });
  }
}
