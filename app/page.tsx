'use client';

import { useChat } from 'ai/react';
import { useState, useEffect, useRef } from 'react';
import { Search, Loader2, Trash2, Shield, Activity, Zap, AlertCircle, CheckCircle, FileWarning, Terminal } from 'lucide-react';

interface ScanResult {
  status: string;
  decision: string;
  defect: string;
  diagnostic: string;
  protocol: string;
}

export default function HomePage() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [started, setStarted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    setMounted(true);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
    <main className="min-h-screen bg-[#050505] text-white font-mono selection:bg-green-500/30 flex flex-col overflow-hidden">
      
      {/* --- СИСТЕМЕН HEADER (P47 STYLE) --- */}
      <div className="border-b border-white/10 bg-black px-8 py-4 flex justify-between items-center z-50 shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-green-500/50 uppercase">System_Active</span>
          </div>
          <h1 className="text-2xl font-black tracking-tighter italic uppercase underline decoration-green-500/30 underline-offset-8">
            ПАКЕТ 197: <span className="text-green-500">STRATEGIC ADVISOR</span>
          </h1>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-[9px] tracking-[0.5em] font-bold text-white/20 uppercase">
          <div className="flex items-center gap-2"><Shield className="w-3 h-3" /> Sovereign Architecture</div>
          <div className="flex items-center gap-2"><Terminal className="w-3 h-3" /> Core_v4.0.2</div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* --- IDENTITY LAYER (P47 INPUT GRID) --- */}
        {!started && (
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/5 bg-[#080808] animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="p-10 border-r border-white/5 group transition-colors hover:bg-white/[0.01]">
              <label className="text-[9px] text-green-500/40 uppercase tracking-[0.4em] mb-4 block font-black underline underline-offset-4">/ Source_Entity_Name</label>
              <input 
                type="text" 
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="ENTER_NAME..."
                className="w-full bg-transparent text-4xl font-black outline-none uppercase placeholder:text-white/5 tracking-tighter"
              />
            </div>
            <div className="p-10 group transition-colors hover:bg-white/[0.01]">
              <label className="text-[9px] text-green-500/40 uppercase tracking-[0.4em] mb-4 block font-black underline underline-offset-4">/ Industry_Sector_ID</label>
              <input 
                type="text" 
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="ENTER_SECTOR..."
                className="w-full bg-transparent text-4xl font-black outline-none uppercase placeholder:text-white/5 tracking-tighter"
              />
            </div>
          </div>
        )}

        {/* --- DATA STREAM AREA (THE REAL SCANNER LOG) --- */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 lg:p-20 space-y-16 scroll-smooth"
        >
          {messages.length === 0 && !started && (
            <div className="h-full flex flex-col items-center justify-center opacity-5 select-none pointer-events-none">
              <Zap className="w-32 h-32 mb-8" />
              <p className="text-4xl font-black tracking-[1.5em] uppercase">Ready_To_Scan</p>
            </div>
          )}

          {messages.map((m, idx) => (
            <div key={idx} className="animate-in fade-in slide-in-from-left-4 duration-500 max-w-6xl mx-auto">
              <div className={`relative p-10 border ${m.role === 'user' ? 'border-white/10 bg-[#0a0a0a]' : 'border-green-500/20 bg-green-500/[0.02]'}`}>
                {/* Decoration Corner */}
                <div className="absolute top-0 right-0 p-2 opacity-20">
                  {m.role === 'user' ? <Activity className="w-4 h-4 text-white" /> : <Shield className="w-4 h-4 text-green-500" />}
                </div>

                <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4 opacity-40">
                  <span className="text-[10px] font-black tracking-[0.5em] uppercase text-green-500">
                    {m.role === 'user' ? '// TACTICAL_INPUT' : '// STRATEGIC_ANALYSIS_OUTPUT'}
                  </span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                  <span className="text-[9px] italic uppercase tracking-widest italic">{new Date().toLocaleTimeString()}</span>
                </div>

                {/* Content Rendering */}
                <div className="text-2xl leading-[1.6] text-gray-200 whitespace-pre-wrap tracking-tighter font-medium">
                  {m.content}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="max-w-6xl mx-auto flex items-center gap-6 text-green-500 p-10 animate-pulse border border-green-500/10 bg-green-500/5">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-sm uppercase tracking-[1em] font-black italic underline underline-offset-8 decoration-green-500/50">Processing_Logic_Stream...</span>
            </div>
          )}
        </div>

        {/* --- COMMAND CENTER (FIXED INPUT AREA) --- */}
        <div className="bg-black border-t border-white/10 p-8 lg:p-12 shadow-[0_-50px_100px_rgba(0,0,0,0.8)]">
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            <form onSubmit={onExecute} className="space-y-8">
              <div className="relative group overflow-hidden border border-white/10 rounded-sm focus-within:border-green-500 transition-all duration-500">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="ВЪВЕДЕТЕ КАЗУС ЗА АНАЛИЗ (ROI, БИЗНЕС ЛОГИКА, АКТИВИ)..."
                  className="w-full h-48 bg-[#0a0a0a]/50 p-8 text-2xl text-green-50 focus:outline-none resize-none placeholder:text-white/5 font-bold leading-tight"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  type="submit"
                  disabled={isLoading || (!started && !businessName)}
                  className="flex-1 h-20 bg-white text-black font-black uppercase tracking-[0.5em] text-lg hover:bg-green-500 transition-all duration-500 disabled:opacity-5 flex items-center justify-center gap-6 group relative overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-green-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0" />
                  <span className="relative z-10 flex items-center gap-6 group-hover:text-black">
                    {isLoading ? <Loader2 className="w-8 h-8 animate-spin text-black" /> : <Zap className="w-6 h-6" />}
                    EXECUTE_STRATEGIC_SCAN
                  </span>
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  className="h-20 px-12 border border-white/10 text-white/30 hover:text-red-500 hover:border-red-500/50 transition-all duration-500 flex items-center justify-center gap-4 uppercase text-[11px] font-black tracking-[0.4em]"
                >
                  <Trash2 className="w-5 h-5" />
                  Reboot
                </button>
              </div>
            </form>
            
            {/* System Status Footer */}
            <div className="flex justify-between items-center text-[8px] tracking-[0.8em] font-black text-white/10 uppercase">
              <span>Sovereign_OS_Active</span>
              <span>Encrypted_AES_256</span>
              <span className="hidden sm:block underline decoration-green-900 underline-offset-4">Strategic_Layer_Active_197</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
