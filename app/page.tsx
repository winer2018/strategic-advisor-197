'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';

export default function Home() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [started, setStarted] = useState(false);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { businessName, industry },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!started && (!businessName || !industry)) return;
    if (!started) setStarted(true);
    handleSubmit(e);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8 font-mono">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tighter uppercase">
          ПАКЕТ 197: <span className="text-emerald-400 italic">STRATEGIC ADVISOR</span>
        </h1>
      </div>

      <div className="w-full max-w-4xl bg-[#111] border border-gray-800 rounded shadow-2xl overflow-hidden">
        {!started ? (
          <div className="p-8 grid grid-cols-2 gap-6 border-b border-gray-800">
            <input type="text" placeholder="БИЗНЕС ИМЕ" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="bg-black border border-gray-800 p-4 rounded text-xs outline-none focus:border-emerald-500" />
            <input type="text" placeholder="ИНДУСТРИЯ" value={industry} onChange={(e) => setIndustry(e.target.value)} className="bg-black border border-gray-800 p-4 rounded text-xs outline-none focus:border-emerald-500" />
          </div>
        ) : (
          <div className="p-4 bg-emerald-500/5 border-b border-gray-800 text-[10px] text-emerald-400 px-8">
            ACTIVE SESSION: {businessName.toUpperCase()}
          </div>
        )}

        <div className="h-[400px] overflow-y-auto p-8 space-y-6 text-sm">
          {messages.map(m => (
            <div key={m.id} className={`border-l-2 p-4 ${m.role === 'user' ? 'border-gray-700' : 'border-emerald-500 bg-emerald-500/5'}`}>
              <p className="text-gray-300 whitespace-pre-wrap">{m.content}</p>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="p-8 bg-black/40">
          <textarea value={input} onChange={handleInputChange} className="w-full bg-black border border-gray-800 p-4 rounded text-white mb-6 outline-none text-xs min-h-[80px]" placeholder="Опишете казуса..." />
          <button type="submit" disabled={isLoading} className="w-full bg-white text-black font-bold py-4 rounded hover:bg-emerald-400 transition-all text-xs uppercase tracking-widest">
            {isLoading ? 'АНАЛИЗИРАМ...' : 'СТАРТИРАЙ АНАЛИЗ'}
          </button>
        </form>
      </div>
    </div>
  );
}
