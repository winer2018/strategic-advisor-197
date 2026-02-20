'use client';

import { useChat } from 'ai/react';
import { useState, useEffect } from 'react';
import { Search, Loader2, Trash2, Shield, Activity, Zap } from 'lucide-react';

export default function HomePage() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [started, setStarted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/chat',
    body: { businessName, industry },
  });

  const onExecute = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!started && (!businessName || !industry)) return;
    if (!started) setStarted(true);
    handleSubmit(e);
  };

  const clearAll = () => {
    setMessages([]);
    setStarted(false);
    setBusinessName('');
    setIndustry('');
    window.location.reload();
  };

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white font-mono selection:bg-green-500/30 flex flex-col">
      {/* HEADER BAR */}
      <div className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse rounded-full" />
          <h1 className="text-xl font-black tracking-tighter italic uppercase">
            ПАКЕТ 197: <span className="text-green-500">STRATEGIC ADVISOR</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[10px] tracking-[0.3em] font-bold text-white/20 uppercase">
          <span>Sovereign Architecture</span>
          <span className="text-green-900">//</span>
          <span>System Active 2026</span>
        </div>
      </div>

      <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 flex flex-col">
        {/* INPUT SECTION */}
        {!started ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm focus-within:border-green-500/50 transition-all">
                <label className="text-[10px] text-green-500/50 uppercase tracking-widest mb-4 block">Бизнес Идентификация</label>
                <input 
                  type="text" 
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="ИМЕ НА КОМПАНИЯ..."
                  className="w-full bg-transparent text-2xl font-black outline-none uppercase placeholder:text-white/5"
                />
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm focus-within:border-green-500/50 transition-all">
                <label className="text-[10px] text-green-500/50 uppercase tracking-widest mb-4 block">Индустриален Сектор</label>
                <input 
                  type="text" 
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="СФЕРА НА ДЕЙНОСТ..."
                  className="w-full bg-transparent text-2xl font-black outline-none uppercase placeholder:text-white/5"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-green-500/5 border border-green-500/20 p-4 mb-8 flex justify-between items-center animate-in fade-in duration-300">
            <div className="text-[10px] font-bold tracking-widest text-green-500 uppercase">
              АКТИВЕН СКЕНЕР: {businessName} // {industry}
            </div>
            <Activity className="w-4 h-4 text-green-500 animate-pulse" />
          </div>
        )}

        {/* MESSAGES / ANALYSIS */}
        <div className="flex-1 space-y-12 mb-12 min-h-[400px]">
          {messages.length === 0 && !started && (
            <div className="h-full flex flex-col items-center justify-center opacity-10 py-32">
              <Zap className="w-16 h-16 mb-6" />
              <p className="text-sm tracking-[1em] uppercase">Системата е в готовност</p>
            </div>
          )}
          
          {messages.map((m, idx) => (
            <div key={idx} className={`animate-in fade-in slide-in-from-bottom-2 duration-500`}>
              <div className={`p-8 border-l-2 ${m.role === 'user' ? 'border-white/10 bg-white/[0.02]' : 'border-green-500 bg-green-500/[0.03]'}`}>
                <div className="flex justify-between items-center mb-6 opacity-30">
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
                    {m.role === 'user' ? '> ACCESS_REQUEST' : '> STRATEGIC_ANALYSIS'}
                  </span>
                  <span className="text-[9px] italic font-mono">{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="text-xl leading-relaxed text-gray-200 whitespace-pre-wrap tracking-tight">
                  {m.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-4 text-green-500 p-8 animate-pulse">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-xs uppercase tracking-[0.5em]">Crunching logic...</span>
            </div>
          )}
        </div>

        {/* CONTROL CONSOLE */}
        <div className="sticky bottom-0 bg-[#050505] pt-6 pb-12">
          <form onSubmit={onExecute} className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-green-500/10 rounded-sm blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
              <textarea
                value={input}
                onChange={handleInputChange}
                placeholder="ВЪВЕДЕТЕ КАЗУС ЗА АНАЛИЗ (ROI, БИЗНЕС ЛОГИКА, АКТИВИ)..."
                className="relative w-full h-40 bg-black border border-white/10 p-8 text-xl text-green-50 focus:outline-none focus:border-green-500/50 resize-none placeholder:text-white/5 transition-all"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isLoading || (!started && !businessName)}
                className="flex-1 h-16 bg-white text-black font-black uppercase tracking-[0.3em] text-sm hover:bg-green-500 transition-all duration-300 disabled:opacity-10 flex items-center justify-center gap-4 group"
              >
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Zap className="w-5 h-5 group-hover:scale-125 transition-all" />}
                ИЗПЪЛНИ АНАЛИЗ
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="h-16 px-10 border border-white/10 text-white/20 hover:text-red-500 hover:border-red-500/50 transition-all duration-300 flex items-center justify-center gap-2 uppercase text-[10px] font-bold tracking-widest"
              >
                <Trash2 className="w-4 h-4" />
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
