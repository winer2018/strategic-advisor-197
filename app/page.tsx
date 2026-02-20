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

  const handleClear = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-12 font-mono selection:bg-emerald-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-emerald-900/30 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase mb-1">
              ПАКЕТ 197 <span className="text-emerald-500 italic">/ STRATEGIC ADVISOR</span>
            </h1>
            <p className="text-emerald-500/50 text-[10px] tracking-[0.4em] uppercase">Adaptive Intelligence Architecture</p>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <span className="text-[10px] text-gray-600 block uppercase tracking-widest">Status</span>
            <span className="text-emerald-400 text-xs font-bold animate-pulse uppercase">System Active // 2026</span>
          </div>
        </div>

        {/* MAIN CONTEXT INPUTS (Only if not started) */}
        {!started && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 animate-in fade-in duration-700">
            <div className="group">
              <label className="block text-[10px] text-gray-500 uppercase mb-3 tracking-widest group-focus-within:text-emerald-400 transition-colors">Бизнес Идентификация</label>
              <input 
                type="text" 
                placeholder="ИМЕ НА КОМПАНИЯТА..." 
                value={businessName} 
                onChange={(e) => setBusinessName(e.target.value)} 
                className="w-full bg-transparent border-b border-gray-800 p-4 text-xl outline-none focus:border-emerald-500 transition-all placeholder:text-gray-800"
              />
            </div>
            <div className="group">
              <label className="block text-[10px] text-gray-500 uppercase mb-3 tracking-widest group-focus-within:text-emerald-400 transition-colors">Индустриален Сектор</label>
              <input 
                type="text" 
                placeholder="СФЕРА НА ДЕЙНОСТ..." 
                value={industry} 
                onChange={(e) => setIndustry(e.target.value)} 
                className="w-full bg-transparent border-b border-gray-800 p-4 text-xl outline-none focus:border-emerald-500 transition-all placeholder:text-gray-800"
              />
            </div>
          </div>
        )}

        {/* CHAT DISPLAY */}
        <div className="space-y-12 mb-12 min-h-[200px]">
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start underline-offset-8'}`}>
              <div className={`max-w-4xl w-full ${m.role === 'user' ? 'bg-zinc-900/50 p-8 border-r-4 border-emerald-500' : 'p-8 border-l-4 border-emerald-500 bg-emerald-500/5'}`}>
                <span className="text-[9px] font-bold text-emerald-400 mb-4 block tracking-[0.3em] uppercase opacity-50">
                  {m.role === 'user' ? '// USER_QUERY' : '// ADVISOR_STRATEGY'}
                </span>
                <p className="text-lg leading-relaxed text-gray-200 whitespace-pre-wrap">{m.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="p-8 border-l-4 border-emerald-800 bg-emerald-900/5">
                <span className="text-[10px] text-emerald-700 tracking-widest uppercase">Scanning Architecture...</span>
              </div>
            </div>
          )}
        </div>

        {/* INPUT AREA - HUGE TEXTAREA */}
        <form onSubmit={onSubmit} className="sticky bottom-12 bg-[#050505] pt-4">
          <div className="relative border border-gray-800 focus-within:border-emerald-500 transition-all bg-black/50 shadow-2xl">
            <textarea 
              value={input} 
              onChange={handleInputChange} 
              className="w-full bg-transparent p-8 text-xl outline-none min-h-[250px] resize-y placeholder:text-gray-800" 
              placeholder="ОПИШЕТЕ КАЗУСА В ДЕТАЙЛИ... (ROI, ПРОБЛЕМИ, ЦЕЛИ)" 
            />
            <div className="p-4 border-t border-gray-900 flex flex-col md:flex-row gap-4 justify-between items-center">
              <p className="text-[9px] text-gray-600 uppercase tracking-widest hidden md:block">
                {started ? `ACTIVE: ${businessName} // ${industry}` : "Waiting for context..."}
              </p>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  type="button" 
                  onClick={handleClear} 
                  className="px-6 py-3 border border-gray-800 text-gray-600 hover:text-white hover:border-white transition-all text-xs uppercase"
                >
                  Clear
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading || (!started && !businessName)} 
                  className="flex-1 md:flex-none bg-emerald-500 hover:bg-emerald-400 text-black font-black px-12 py-3 transition-all text-xs uppercase tracking-[0.2em] disabled:opacity-20"
                >
                  {isLoading ? 'Processing...' : 'Execute Analysis'}
                </button>
              </div>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
