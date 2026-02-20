'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';

export default function Home() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [revenue, setRevenue] = useState('');
  const [started, setStarted] = useState(false);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
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
    setStarted(false);
    setBusinessName('');
    setIndustry('');
    setRevenue('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8 font-mono text-center">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tighter uppercase">
          ПАКЕТ 197: <span className="text-emerald-400 italic text-5xl">STRATEGIC ADVISOR</span>
        </h1>
        <p className="text-gray-500 text-[10px] tracking-[0.5em] mt-2 uppercase">Sovereign Architecture Analysis Layer</p>
      </div>

      <div className="w-full max-w-4xl bg-[#111] border border-gray-800 rounded shadow-2xl overflow-hidden text-left">
        {!started ? (
          <div className="p-8 space-y-6 border-b border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest">Бизнес Име</span>
                <input type="text" placeholder="Въведете..." value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="bg-black border border-gray-800 p-4 rounded text-xs focus:border-emerald-500 outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest">Индустрия</span>
                <input type="text" placeholder="E-commerce, SaaS..." value={industry} onChange={(e) => setIndustry(e.target.value)} className="bg-black border border-gray-800 p-4 rounded text-xs focus:border-emerald-500 outline-none transition-all" />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-emerald-500/5 border-b border-gray-800 text-[10px] text-emerald-400 flex justify-between px-8 items-center">
            <span className="font-bold tracking-widest uppercase">ACTIVE SESSION: {businessName.toUpperCase()} | {industry.toUpperCase()}</span>
            <span className="animate-pulse flex items-center gap-2">● ADAPTIVE LAYER LIVE</span>
          </div>
        )}

        <div className="h-[420px] overflow-y-auto p-8 space-y-6 text-sm border-b border-gray-800 bg-black/20 scrollbar-hide">
          {messages.length === 0 && !started && (
            <div className="h-full flex items-center justify-center text-gray-700 italic text-xs uppercase tracking-widest">
              System Ready. Please define the business case above.
            </div>
          )}
          {messages.map(m => (
            <div key={m.id} className={`border-l-2 p-4 ${m.role === 'user' ? 'border-gray-700 bg-white/5' : 'border-emerald-500 bg-emerald-500/5'}`}>
              <span className="text-[9px] font-bold text-emerald-400 mb-2 block tracking-widest uppercase italic">
                {m.role === 'user' ? '> ЗАПИТВАНЕ' : '> АНАЛИЗ СТРАТЕГ'}
              </span>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{m.content}</p>
            </div>
          ))}
          {isLoading && <div className="animate-pulse text-emerald-400 text-[10px] uppercase tracking-[0.3em]">Processing Logic...</div>}
        </div>

        <form onSubmit={onSubmit} className="p-8 bg-black/40">
          <textarea 
            value={input} 
            onChange={handleInputChange} 
            className="w-full bg-black border border-gray-800 p-4 rounded text-white mb-6 focus:border-emerald-500 outline-none min-h-[100px] text-xs transition-all" 
            placeholder="Опишете вашия казус за анализ..." 
          />
          <div className="flex flex-col md:flex-row gap-4">
            <button 
              type="submit" 
              disabled={isLoading || (!started && !businessName)} 
              className="flex-1 bg-white text-black font-bold py-4 rounded hover:bg-emerald-400 transition-all text-xs uppercase tracking-[0.2em] shadow-lg active:scale-[0.98]"
            >
              СТАРТИРАЙ АНАЛИЗ
            </button>
            <button 
              type="button" 
              onClick={handleClear} 
              className="px-8 border border-gray-800 text-gray-500 hover:text-white hover:border-white transition-all text-[10px] uppercase tracking-widest font-bold"
            >
              ИЗЧИСТИ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
