'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';

export default function Home() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [revenue, setRevenue] = useState('');
  const [started, setStarted] = useState(false);
  
  // ДОБАВЕНО: setInput тук, за да работи handleClear
  const { messages, input, setInput, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/chat',
    body: {
      businessName,
      industry,
      revenue,
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!started && (!businessName || !industry)) {
      return;
    }
    if (!started) {
      setStarted(true);
    }
    handleSubmit(e);
  };

  const handleClear = () => {
    setMessages([]);
    setInput('');
    setStarted(false);
    setBusinessName('');
    setIndustry('');
    setRevenue('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-3 tracking-wide uppercase">
          <span className="text-white">ПАКЕТ 197: </span>
          <span className="italic text-emerald-400">STRATEGIC ADVISOR</span>
        </h1>
        <p className="text-gray-400 tracking-[0.2em] text-sm uppercase">Sovereign Architecture Analysis Layer</p>
      </div>

      <div className="w-full max-w-4xl bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-2xl overflow-hidden">
        {!started ? (
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-emerald-400 mb-2 uppercase tracking-widest">Бизнес Име</label>
                <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full bg-black border border-gray-700 p-4 rounded text-white focus:border-emerald-400 outline-none transition-all" placeholder="Въведете име..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-400 mb-2 uppercase tracking-widest">Индустрия</label>
                <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full bg-black border border-gray-700 p-4 rounded text-white focus:border-emerald-400 outline-none transition-all" placeholder="E-commerce, SaaS, и т.н." />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-black/50 p-4 border-b border-gray-800 flex justify-between items-center px-8">
            <span className="text-emerald-400 font-mono text-sm tracking-tighter uppercase font-bold">
              АНАЛИЗ ЗА: {businessName} | {industry}
            </span>
            <span className="text-gray-600 text-[10px] tracking-widest uppercase">Adaptive Layer Active</span>
          </div>
        )}

        <div className="h-[450px] overflow-y-auto p-8 space-y-6 font-mono text-sm">
          {messages.length === 0 && !started && (
            <div className="h-full flex items-center justify-center text-gray-600 italic">
              Системата е в готовност. Опишете казуса си долу.
            </div>
          )}
          {messages.map(m => (
            <div key={m.id} className={`border-l-2 p-4 ${m.role === 'user' ? 'border-gray-700 bg-white/5' : 'border-emerald-500 bg-emerald-500/5'}`}>
              <span className="text-[10px] font-bold text-emerald-400 mb-2 block tracking-[0.3em] uppercase">
                {m.role === 'user' ? '> ЗАПИТВАНЕ' : '> АНАЛИЗ СТРАТЕГ'}
              </span>
              <p className="leading-relaxed text-gray-200">{m.content}</p>
            </div>
          ))}
          {isLoading && <div className="animate-pulse text-emerald-400 text-xs uppercase tracking-widest">Обработка на данни...</div>}
        </div>

        <form onSubmit={onSubmit} className="p-8 border-t border-gray-800 bg-black/20">
          <textarea
            value={input}
            onChange={handleInputChange}
            className="w-full bg-black border border-gray-700 p-4 rounded text-white mb-6 focus:border-emerald-400 outline-none min-h-[100px] resize-none transition-all"
            placeholder="Въведете конкретен казус или въпрос за анализ..."
          />
          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              disabled={isLoading || (!started && (!businessName || !industry || !input.trim()))}
              className="flex-1 bg-white hover:bg-gray-200 text-black font-bold py-4 px-6 rounded transition-all disabled:opacity-30 uppercase tracking-widest flex items-center justify-center gap-2"
            >
              СТАРТИРАЙ АНАЛИЗ
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-4 border border-gray-700 text-gray-400 hover:text-white hover:border-white transition-all rounded uppercase text-xs tracking-widest font-bold"
            >
              ИЗЧИСТИ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
