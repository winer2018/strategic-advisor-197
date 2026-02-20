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
    <div className="min-h-screen bg-black text-[#00FF41] font-mono p-4 md:p-6 selection:bg-[#00FF41]/20">
      <div className="max-w-[1600px] mx-auto border border-[#00FF41]/20 min-h-[90vh] flex flex-col">
        
        {/* TOP BAR / SYSTEM INFO */}
        <div className="border-b border-[#00FF41]/20 p-4 flex justify-between items-center text-[10px] tracking-widest uppercase">
          <div className="flex gap-6">
            <span className="font-bold">SYSTEM: STRATEGIC_ADVISOR_197</span>
            <span className="hidden md:inline text-gray-600">// CORE: v4.0.2</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-gray-600">2026_LOG_ACTIVE</span>
            <span className="w-2 h-2 bg-[#00FF41] animate-pulse"></span>
          </div>
        </div>

        {/* IDENTITY SCANNER (Inputs) */}
        {!started ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-[#00FF41]/20 bg-emerald-950/5">
            <div className="p-6 border-r border-[#00FF41]/20 group">
              <span className="text-[10px] block mb-2 opacity-50 tracking-widest uppercase">/ INPUT_BUSINESS_NAME</span>
              <input 
                type="text" 
                value={businessName} 
                onChange={(e) => setBusinessName(e.target.value)} 
                className="w-full bg-transparent border-none p-0 text-2xl uppercase focus:ring-0 outline-none text-[#00FF41] placeholder:text-emerald-900" 
                placeholder="ENTER_NAME..." 
              />
            </div>
            <div className="p-6 group">
              <span className="text-[10px] block mb-2 opacity-50 tracking-widest uppercase">/ INPUT_INDUSTRY_SECTOR</span>
              <input 
                type="text" 
                value={industry} 
                onChange={(e) => setIndustry(e.target.value)} 
                className="w-full bg-transparent border-none p-0 text-2xl uppercase focus:ring-0 outline-none text-[#00FF41] placeholder:text-emerald-900" 
                placeholder="ENTER_SECTOR..." 
              />
            </div>
          </div>
        ) : (
          <div className="p-3 bg-[#00FF41]/5 border-b border-[#00FF41]/20 px-6 flex justify-between items-center text-[10px]">
            <span className="font-bold">ACTIVE_LOG // {businessName.toUpperCase()} // {industry.toUpperCase()}</span>
            <span className="text-gray-500 uppercase">Architecture_Layer_Locked</span>
          </div>
        )}

        {/* DATA ANALYSIS AREA (Chat) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-black/40 scrollbar-hide">
          {messages.length === 0 && !started && (
            <div className="h-full flex flex-col items-center justify-center opacity-20 uppercase tracking-[1em] text-center">
              <p className="text-4xl font-black mb-4">Scanner_Ready</p>
              <p className="text-[10px]">Waiting for tactical input...</p>
            </div>
          )}
          {messages.map(m => (
            <div key={m.id} className="animate-in fade-in slide-in-from-left duration-300">
              <div className={`p-6 border ${m.role === 'user' ? 'border-gray-800 bg-gray-900/10' : 'border-[#00FF41]/30 bg-[#00FF41]/5'}`}>
                <div className="flex justify-between items-center mb-4 border-b border-[#00FF41]/10 pb-2">
                  <span className="text-[10px] font-bold tracking-widest uppercase">
                    {m.role === 'user' ? '> ACCESS_REQUEST' : '> ADVISOR_STRATEGY'}
                  </span>
                  <span className="text-[9px] opacity-30 font-mono italic">Timestamp: {new Date().toLocaleTimeString()}</span>
                </div>
                <p className="text-lg leading-relaxed whitespace-pre-wrap font-light">{m.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-4 p-6 border border-[#00FF41]/20 bg-[#00FF41]/5">
              <span className="w-2 h-2 bg-[#00FF41] animate-ping"></span>
              <span className="text-xs uppercase tracking-[0.5em] animate-pulse">Processing_Neural_Logic...</span>
            </div>
          )}
        </div>

        {/* TACTICAL INPUT (Textarea) */}
        <form onSubmit={onSubmit} className="border-t border-[#00FF41]/20 p-0 bg-black">
          <textarea 
            value={input} 
            onChange={handleInputChange} 
            className="w-full bg-black p-8 text-xl outline-none min-h-[300px] border-none focus:ring-0 text-[#00FF41] placeholder:text-emerald-950 resize-none font-light" 
            placeholder="[ ENTER_TACTICAL_DATA_HERE ]" 
          />
          <div className="border-t border-[#00FF41]/10 p-4 flex flex-col md:flex-row gap-4 items-center bg-black">
            <div className="text-[9px] opacity-30 flex gap-4 uppercase tracking-widest flex-1">
              <span>Memory: Optimized</span>
              <span>Encryption: Sovereign</span>
              <span>Layer: Strategy</span>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button 
                type="button" 
                onClick={handleClear} 
                className="px-8 py-3 border border-[#00FF41]/20 text-[#00FF41]/40 hover:text-[#00FF41] hover:border-[#00FF41] transition-all text-xs uppercase font-bold tracking-widest"
              >
                Reset
              </button>
              <button 
                type="submit" 
                disabled={isLoading || (!started && !businessName)} 
                className="flex-1 md:flex-none bg-[#00FF41] text-black font-black px-16 py-3 hover:bg-[#00FF41]/80 transition-all text-xs uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(0,255,65,0.2)]"
              >
                {isLoading ? 'ANALYZING...' : 'EXECUTE'}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
