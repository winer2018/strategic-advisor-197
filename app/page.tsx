'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';

export default function Home() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [revenue, setRevenue] = useState('');
  const [started, setStarted] = useState(false);
  
  // ФИКС: Деструктурираме setInput, за да работи handleClear
  const { messages, input, setInput, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/chat',
    body: { businessName, industry, revenue },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!started && (!businessName || !industry)) return;
    if (!started) setStarted(true);
    handleSubmit(e);
  };

  const handleClear = () => {
    setMessages([]);
    setInput('');
    setStarted(false);
    setBusinessName('');
    setIndustry('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8 font-mono">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tighter uppercase">
          ПАКЕТ 197: <span className="text-emerald-400 italic">STRATEGIC ADVISOR</span>
        </h1>
        <p className="text-gray-500 text-[10px] tracking-[0.5em] mt-2">SOVEREIGN ARCHITECTURE ANALYSIS</p>
      </div>

      <div className="w-full max-w-4xl bg-[#111] border border-gray-800 rounded shadow-2xl">
        {!started ? (
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-800">
            <input type="text" placeholder="БИЗНЕС ИМЕ" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="bg-black border border-gray-800 p-4 rounded text-xs focus:border-emerald-500 outline-none transition-all" />
            <input type="text" placeholder="ИНДУСТРИЯ" value={industry} onChange={(e) => setIndustry(e.target.value)} className="bg-black border border-gray-800 p-4 rounded text-xs focus:border-emerald-500 outline-none transition-all" />
          </div>
        ) : (
          <div className="p-4 bg-emerald-500/5 border-b border-gray-800 text-[10px] text-emerald-400 flex justify-between px-8">
            <span>ACTIVE SESSION: {businessName.toUpperCase()}</span>
            <span className="animate-pulse">● ADAPTIVE LAYER LIVE</span>
          </div>
        )}

        <div className="h-[400px] overflow-y-auto p-8 space-y-6 text-sm border-b border-gray-800">
          {messages.map(m => (
            <div key={m.id} className={`border-l-2 p-4 ${m.role === 'user' ? 'border-gray-700 bg-white/5' : 'border-emerald-500 bg-emerald-500/5'}`}>
              <span className="text-[9px] font-bold text-emerald-400 mb-2 block tracking-widest uppercase">
                {m.role === 'user' ? '> ЗАПИТВАНЕ' : '> АНАЛИЗ'}
              </span>
              <p className="text-gray-300 leading-relaxed">{m.content}</p>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="p-8 bg-black/40">
          <textarea value={input} onChange={handleInputChange} className="w-full bg-black border border-gray-800 p-4 rounded text-white mb-6 focus:border-emerald-500 outline-none min-h-[80px] text-xs" placeholder="Опишете казуса за анализ..." />
          <div className="flex gap-4">
            <button type="submit" disabled={isLoading || (!started && !businessName)} className="flex-1 bg-white text-black font-bold py-4 rounded hover:bg-emerald-400 transition-all text-xs uppercase tracking-widest">
              СТАРТИРАЙ АНАЛИЗ
            </button>
            <button type="button" onClick={handleClear} className="px-6 border border-gray-800 text-gray-500 hover:text-white transition-all text-[10px] uppercase">
              ИЗЧИСТИ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
