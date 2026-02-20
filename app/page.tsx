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

  // Използваме презареждане на страницата за изчистване - 100% безопасно за билда
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-black text-[#00FF41] font-mono flex flex-col selection:bg-[#00FF41]/20">
      
      {/* SCANNER HEADER */}
      <div className="border-b border-[#00FF41]/30 p-4 flex justify-between items-center text-[10px] bg-black sticky top-0 z-50">
        <div className="flex gap-8 items-center">
          <span className="font-black tracking-[0.3em]">PROJECT_47_SCANNER_V197</span>
          <span className="text-emerald-950 hidden md:block">| STATUS: ENCRYPTED_LINK</span>
        </div>
        <div className="flex items-center gap-3 text-emerald-400">
          <span className="uppercase tracking-widest text-[9px]">Uptime: 99.9%</span>
          <div className="w-2 h-2 bg-[#00FF41] shadow-[0_0_10px_#00FF41] animate-pulse"></div>
        </div>
      </div>

      {/* TACTICAL INPUTS */}
      {!started && (
        <div className="border-b border-[#00FF41]/20 grid grid-cols-1 md:grid-cols-2 bg-[#00FF41]/5 animate-in fade-in duration-500">
          <div className="p-10 border-r border-[#00FF41]/20">
            <span className="text-[9px] block mb-4 opacity-40 uppercase tracking-[0.3em]">/ SOURCE_ENTITY</span>
            <input 
              type="text" 
              value={businessName} 
              onChange={(e) => setBusinessName(e.target.value)} 
              className="w-full bg-transparent border-none p-0 text-4xl uppercase focus:ring-0 outline-none text-[#00FF41] placeholder:text-emerald-950 font-black tracking-tighter" 
              placeholder="NAME_REQUIRED" 
            />
          </div>
          <div className="p-10">
            <span className="text-[9px] block mb-4 opacity-40 uppercase tracking-[0.3em]">/ SECTOR_IDENT</span>
            <input 
              type="text" 
              value={industry} 
              onChange={(e) => setIndustry(e.target.value)} 
              className="w-full bg-transparent border-none p-0 text-4xl uppercase focus:ring-0 outline-none text-[#00FF41] placeholder:text-emerald-950 font-black tracking-tighter" 
              placeholder="INDUSTRY_REQUIRED" 
            />
          </div>
        </div>
      )}

      {/* DATA FLOW (LOG) */}
      <div className="flex-1 p-6 md:p-16 space-y-16 overflow-y-auto bg-black scrollbar-hide pb-96">
        {messages.length === 0 && !started && (
          <div className="h-full flex flex-col items-center justify-center opacity-10 uppercase tracking-[2em] mt-32 select-none">
            <p className="text-7xl font-black mb-6 italic">Scanner</p>
            <p className="text-sm">Initiate Protocol 197</p>
          </div>
        )}
        
        {messages.map(m => (
          <div key={m.id} className="animate-in slide-in-from-left-8 duration-500">
            <div className={`p-10 border-l-2 ${m.role === 'user' ? 'border-gray-800 bg-zinc-950/30' : 'border-[#00FF41] bg-[#00FF41]/5 shadow-[inset_0_0_30px_rgba(0,255,65,0.03)]'}`}>
              <div className="flex justify-between items-center mb-8 opacity-40 border-b border-[#00FF41]/10 pb-4">
                <span className="text-[10px] font-black tracking-[0.5em] uppercase">
                  {m.role === 'user' ? '// TACTICAL_INPUT' : '// ADVISOR_RESPONSE'}
                </span>
                <span className="text-[9px] font-mono italic underline uppercase">Hash: {Math.random().toString(36).substring(7)}</span>
              </div>
              <p className="text-2xl leading-[1.6] whitespace-pre-wrap font-medium tracking-tight text-gray-200">{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="p-10 border-l-2 border-[#00FF41]/20 bg-[#00FF41]/5 w-full">
            <span className="text-xs uppercase tracking-[1em] animate-pulse text-[#00FF41]">Analyzing_Logic_Flow...</span>
          </div>
        )}
      </div>

      {/* COMMAND CONSOLE (Input) */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-[#00FF41]/30 shadow-[0_-20px_50px_rgba(0,0,0,0.9)]">
        <form onSubmit={onSubmit}>
          <textarea 
            value={input} 
            onChange={handleInputChange} 
            className="w-full bg-black p-10 text-2xl outline-none min-h-[250px] border-none focus:ring-0 text-[#00FF41] placeholder:text-emerald-950 resize-none font-medium leading-relaxed" 
            placeholder="[ ENTER DATA FOR ANALYSIS... ]" 
          />
          <div className="p-6 border-t border-[#00FF41]/10 flex justify-between items-center bg-[#050505]">
            <div className="text-[10px] opacity-20 hidden md:flex gap-12 uppercase tracking-[0.3em] font-bold italic">
              <span>Sovereign_Architecture: Active</span>
              <span>Enc: AES_256</span>
              <span>Layer: Strategic_197</span>
            </div>
            <div className="flex gap-8 w-full md:w-auto">
              <button 
                type="button" 
                onClick={handleReset} 
                className="px-10 py-4 border border-[#00FF41]/20 text-[#00FF41]/30 hover:text-[#00FF41] hover:border-[#00FF41] transition-all text-xs uppercase font-black tracking-widest"
              >
                Reset_Scanner
              </button>
              <button 
                type="submit" 
                disabled={isLoading || (!started && !businessName)} 
                className="flex-1 md:flex-none bg-[#00FF41] text-black font-black px-24 py-5 hover:bg-white transition-all text-sm uppercase tracking-[0.5em] shadow-[0_0_40px_rgba(0,255,65,0.4)] active:scale-95"
              >
                {isLoading ? 'ANALYZING' : 'EXECUTE'}
              </button>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
}
