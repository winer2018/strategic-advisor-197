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
    <div className="min-h-screen bg-black text-[#00FF41] font-mono flex flex-col selection:bg-[#00FF41]/30">
      
      {/* SCANNER HEADER */}
      <div className="border-b border-[#00FF41]/30 p-4 flex justify-between items-center text-[10px] bg-black sticky top-0 z-50">
        <div className="flex gap-10 items-center">
          <span className="font-black tracking-[0.4em] text-sm uppercase">SA_197_SCANNER</span>
          <span className="text-emerald-950 hidden md:block uppercase tracking-[0.2em]">Sovereign_Architecture_Active</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-emerald-400 uppercase text-[9px] tracking-widest italic">Encrypted_Link</span>
          <div className="w-2 h-2 bg-[#00FF41] shadow-[0_0_10px_#00FF41] animate-pulse"></div>
        </div>
      </div>

      {/* IDENTITY INPUTS */}
      {!started && (
        <div className="border-b border-[#00FF41]/20 grid grid-cols-1 md:grid-cols-2 bg-[#00FF41]/5">
          <div className="p-12 border-r border-[#00FF41]/20">
            <span className="text-[10px] block mb-4 opacity-40 uppercase tracking-[0.3em]">/ SOURCE_ENTITY</span>
            <input 
              type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} 
              className="w-full bg-transparent border-none p-0 text-5xl uppercase focus:ring-0 outline-none text-[#00FF41] placeholder:text-emerald-950 font-black tracking-tighter" 
              placeholder="NAME_REQUIRED" 
            />
          </div>
          <div className="p-12">
            <span className="text-[10px] block mb-4 opacity-40 uppercase tracking-[0.3em]">/ SECTOR_IDENT</span>
            <input 
              type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} 
              className="w-full bg-transparent border-none p-0 text-5xl uppercase focus:ring-0 outline-none text-[#00FF41] placeholder:text-emerald-950 font-black tracking-tighter" 
              placeholder="INDUSTRY_REQUIRED" 
            />
          </div>
        </div>
      )}

      {/* ANALYSIS STREAM (LOG) */}
      <div className="flex-1 p-8 md:p-20 space-y-20 overflow-y-auto bg-black pb-[450px]">
        {messages.length === 0 && !started && (
          <div className="h-full flex flex-col items-center justify-center opacity-10 uppercase tracking-[2em] mt-32 select-none">
            <p className="text-8xl font-black mb-8 italic">Scanner</p>
            <p className="text-sm">Initiating Sovereign Protocol 197...</p>
          </div>
        )}
        
        {messages.map(m => (
          <div key={m.id} className="animate-in slide-in-from-left-8 duration-500">
            <div className={`p-12 border-l-4 ${m.role === 'user' ? 'border-gray-800 bg-zinc-950/30' : 'border-[#00FF41] bg-[#00FF41]/5'}`}>
              <div className="flex justify-between items-center mb-8 opacity-30 border-b border-[#00FF41]/10 pb-4">
                <span className="text-[10px] font-black tracking-[0.5em] uppercase">
                  {m.role === 'user' ? '// TACTICAL_INPUT' : '// STRATEGIC_ANALYSIS'}
                </span>
                <span className="text-[9px] font-mono italic">SYNC_OK</span>
              </div>
              <p className="text-3xl leading-relaxed whitespace-pre-wrap font-medium tracking-tight text-gray-200">{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="p-12 border-l-4 border-[#00FF41]/20 bg-[#00FF41]/5">
            <span className="text-xs uppercase tracking-[1em] animate-pulse text-[#00FF41]">Analyzing_Logic_Flow...</span>
          </div>
        )}
      </div>

      {/* COMMAND CONSOLE (WIDE TEXTAREA) */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t-2 border-[#00FF41]/30 shadow-[0_-30px_60px_rgba(0,0,0,0.95)]">
        <form onSubmit={onSubmit}>
          <textarea 
            value={input} onChange={handleInputChange} 
            className="w-full bg-black p-12 text-3xl outline-none min-h-[350px] border-none focus:ring-0 text-[#00FF41] placeholder:text-emerald-950 resize-none font-medium leading-tight" 
            placeholder="[ ENTER DATA FOR STRATEGIC SCAN... ]" 
          />
          <div className="p-6 border-t border-[#00FF41]/10 flex justify-between items-center bg-[#030303]">
            <div className="text-[10px] opacity-20 hidden md:flex gap-16 uppercase tracking-[0.4em] font-black italic">
              <span>Protocol: ON</span>
              <span>Enc: AES_256</span>
              <span>Layer: Strategic_197</span>
            </div>
            <div className="flex gap-10 w-full md:w-auto">
              <button 
                type="button" onClick={() => window.location.reload()} 
                className="px-12 py-5 border border-[#00FF41]/20 text-emerald-900 hover:text-[#00FF41] transition-all text-xs uppercase font-black"
              >
                Reset
              </button>
              <button 
                type="submit" disabled={isLoading || (!started && !businessName)} 
                className="flex-1 md:flex-none bg-[#00FF41] text-black font-black px-32 py-6 hover:bg-white transition-all text-sm uppercase tracking-[0.6em] shadow-[0_0_50px_rgba(0,255,65,0.4)]"
              >
                {isLoading ? 'SCANNING' : 'EXECUTE'}
              </button>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
}
