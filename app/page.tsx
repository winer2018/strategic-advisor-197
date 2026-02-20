'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';

export default function Home() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [revenue, setRevenue] = useState('');
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      businessName,
      industry,
      revenue,
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!businessName || !industry) {
      alert('Моля, попълнете бизнес име и индустрия');
      return;
    }
    handleSubmit(e);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">ПАКЕТ 197</h1>
          <p className="text-xl text-indigo-700 font-medium">STRATEGIC ADVISOR - Business Audit Scanner</p>
          <p className="text-sm text-gray-600 mt-2 italic">Адаптивна бизнес интелигентност</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-6 bg-indigo-600 text-white">
            <h2 className="text-lg font-semibold uppercase tracking-wider">Бизнес Профил</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-100">
            <input 
              type="text" placeholder="Име на бизнес" value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black outline-none"
            />
            <input 
              type="text" placeholder="Индустрия" value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black outline-none"
            />
            <input 
              type="text" placeholder="Месечни приходи (опционално)" value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black outline-none"
            />
          </div>

          <div className="h-[400px] overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-20">
                <p>Въведете данни и задайте въпрос, за да започнете стратегическия одит.</p>
              </div>
            )}
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-800 shadow-sm'}`}>
                  <p className="text-xs font-bold mb-1 uppercase opacity-70">{m.role === 'user' ? 'Вие' : 'Strategic Advisor'}</p>
                  <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="p-6 border-t border-gray-100 bg-white">
            <div className="flex gap-2">
              <input
                type="text" value={input} onChange={handleInputChange} disabled={isLoading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-100 text-black"
                placeholder={messages.length === 0 ? 'Опишете вашия бизнес проблем...' : 'Задайте следващ въпрос...'}
              />
              <button
                type="submit" disabled={isLoading || (!businessName && messages.length === 0)}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 font-bold transition-all shadow-md"
              >
                {isLoading ? 'Мисля...' : 'АНАЛИЗИРАЙ'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
