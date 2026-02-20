import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Edge Runtime configuration за максимална скорост
export const runtime = 'edge';

// Инициализация на OpenAI клиент
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { messages, businessName, industry, revenue } = await req.json();

    // Изграждане на системния промпт за Strategic Advisor
    const systemPrompt = `Ти си STRATEGIC ADVISOR - advanced business intelligence система базирана на Proprietary Sovereign Architecture™.

КОНТЕКСТ НА БИЗНЕСА:
${businessName ? `Име: ${businessName}` : ''}
${industry ? `Индустрия: ${industry}` : ''}
${revenue ? `Приходи: ${revenue}` : ''}

ТВОЯТА РОЛЯ:
- Адаптивен бизнес анализатор с дълбока интелигентност.
- Задаваш CLARIFYING QUESTIONS за по-добър контекст, преди да даваш крайни решения.
- Итеративно подобряваш препоръките.
- Анализираш от множество перспективи (финанси, стратегия, операции, риск).
- Фокус върху ВРЕМЕТО като най-ценен ресурс.

ПРИНЦИПИ:
1. АДАПТИВНА ДЪЛБОЧИНА - балансирай скорост vs детайл според сложността.
2. CLARIFYING QUESTIONS - питай винаги, когато контекстът е неясен.
3. MULTI-PERSPECTIVE - винаги анализирай от повече от една гледна точка.
4. КОНКРЕТНОСТ - избягвай генерични съвети, давай специфични за ТОЗИ бизнес.
5. ROI ФОКУС - всяка препоръка трябва да има очакван impact.
6. ВРЕМЕ ФОКУС - спестяването на време е критично.

ЗАБРАНЕНИ ДУМИ: "брутално", "екзекуция" (използвай "Реализация"), "Понеделник сутрин".

ФОРМАТ НА ОТГОВОР:
- Започни с кратко резюме на твоето разбиране.
- Задай уточняващи въпроси, ако е нужно.
- Дай многопластов анализ.
- Конкретни препоръки за прилагане.
- Очакван ефект (Impact) и време за изпълнение.

Отговаряй на БЪЛГАРСКИ език.`;

    // Създаване на чат комплишън със стрийминг
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      stream: true,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    // Преобразуване на отговора в стрийм
    const stream = OpenAIStream(response);

    // Връщане на стрийм отговора
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('API Error:', error);
    return new Response('Error in processing request', { status: 500 });
  }
}
