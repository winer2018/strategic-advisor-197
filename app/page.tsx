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
    <div className="min-h-screen bg-black text-[#00FF41] font-mono flex flex-col selection:bg-[#00FF41]/20">
      
      {/* SYSTEM HEADER */}
      <div className="border-b border-[#00FF41]/30 p-4 flex justify-between items-center text-[10px] bg-black sticky top-0 z-50">
        <div className="flex gap-8 items-center">
          <span className="font-black tracking-[0.3em]">SYSTEM: STRATEGIC_ADVISOR_197</span>
          <span className="text-emerald-900 hidden md:block">| LOG_ID: 2026-SA197-X</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="animate-pulse underline uppercase">Active_Link_Established</span>
          <div className="w-2 h-2 bg-[#00FF41] shadow-[0_0_8px_#00FF41]"></div>
        </div>
      </div>

      {/* INPUTS SECTION (Collapsible) */}
      {!started && (
        <div className="border-b border-[#00FF41]/20 grid grid-cols-1 md:grid-cols-2 bg-[#00FF41]/5">
          <div className="p-8 border-r border-[#00FF41]/20">
            <span className="text-[9px] block mb-2 opacity-50 uppercase tracking-widest">/ IDENTIFY_ENTITY</span>
            <input 
              type="text" 
              value={businessName} 
              onChange={(e) => setBusinessName(e.target.value)} 
              className="w-full bg-transparent border-none p-0 text-3xl uppercase focus:ring-0 outline-none text-[#00FF41] placeholder:text-emerald-950 font-black" 
              placeholder="ENTER_NAME" 
            />
          </div>
          <div className="p-8">
            <span className="text-[9px] block mb-2 opacity-50 uppercase tracking-widest">/ SECTOR_IDENTIFICATION</span>
            <input 
              type="text" 
              value={industry} 
              onChange={(e) => setIndustry(e.target.value)} 
              className="w-full bg-transparent border-none p-0 text-3xl uppercase focus:ring-0 outline-none text-[#00FF41] placeholder:text-emerald-950 font-black" 
              placeholder="ENTER_SECTOR" 
            />
          </div>
        </div>
      )}

      {/* CHAT / ANALYSIS LOG AREA */}
      <div className="flex-1 p-6 md:p-12 space-y-12 overflow-y-auto bg-black scrollbar-hide mb-40">
        {messages.length === 0 && !started && (
          <div className="h-full flex flex-col items-center justify-center opacity-10 uppercase tracking-[1.5em] mt-20">
            <p className="text-6xl font-black mb-4">Scanner_Ready</p>
            <p className="text-xs">Proprietary Sovereign Architecture</p>
          </div>
        )}
        
        {messages.map(m => (
          <div key={m.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={`p-8 border ${m.role === 'user' ? 'border-gray-900 bg-zinc-950/50' : 'border-[#00FF41]/20 bg-[#00FF41]/5'}`}>
              <div className="flex justify-between items-center mb-6 border-b border-[#00FF41]/10 pb-4">
                <span className="text-[10px] font-black tracking-[0.4em] uppercase">
                  {m.role === 'user' ? '> TACTICAL_QUERY' : '> STRATEGIC_ANALYSIS'}
                </span>
                <span className="text-[9px] opacity-30 italic font-mono uppercase">Decrypted: {new Date().toLocaleTimeString()}</span>
              </div>
              <p className="text-xl leading-relaxed whitespace-pre-wrap font-light tracking-tight">{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="p-8 border border-[#00FF41]/10 bg-[#00FF41]/5 inline-block w-full">
            <span className="text-xs uppercase tracking-[0.8em] animate-pulse">Running_Neural_Logic_Scans...</span>
          </div>
        )}
      </div>

      {/* FOOTER / TACTICAL INPUT AREA */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-[#00FF41]/30">
        <form onSubmit={onSubmit}>
          <textarea 
            value={input} 
            onChange={handleInputChange} 
            className="w-full bg-black p-8 text-xl outline-none min-h-[180px] border-none focus:ring-0 text-[#00FF41] placeholder:text-emerald-950 resize-none font-medium" 
            placeholder="[ ENTER_STRATEGIC_INPUT_HERE ]" 
          />
          <div className="p-4 border-t border-[#00FF41]/10 flex justify-between items-center bg-black">
            <div className="text-[9px] opacity-20 hidden md:flex gap-8 uppercase tracking-widest font-bold">
              <span>Sovereign_Protocol: ON</span>
              <span>Data_Encryption: 256bit</span>
              <span>ROI_Matrix: Active</span>
            </div>
            <div className="flex gap-6 w-full md:w-auto">
              <button 
                type="button" 
                onClick={handleClear} 
                className="px-8 py-3 border border-[#00FF41]/20 text-emerald-900 hover:text-[#00FF41] hover:border-[#00FF41] transition-all text-xs uppercase font-black"
              >
                Clear
              </button>
              <button 
                type="submit" 
                disabled={isLoading || (!started && !businessName)} 
                className="flex-1 md:flex-none bg-[#00FF41] text-black font-black px-20 py-3 hover:bg-white transition-all text-xs uppercase tracking-[0.4em] shadow-[0_0_25px_rgba(0,255,65,0.3)]"
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
