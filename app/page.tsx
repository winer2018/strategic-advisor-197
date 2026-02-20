'use client'

import { 
  useState, 
  useEffect, 
  useRef 
} from 'react'

import { 
  useChat 
} from 'ai/react'

import { 
  Search, 
  Loader2, 
  Trash2, 
  Shield, 
  Activity, 
  Zap, 
  Terminal, 
  Lock, 
  Cpu 
} from 'lucide-react'

// --- START_OF_SOVEREIGN_ARCHITECTURE_197 ---

export default function HomePage() {
  const [bn, setBn] = useState('')
  const [ind, setInd] = useState('')
  const [st, setSt] = useState(false)
  const [mounted, setMounted] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [st, bn, messages])

  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading, 
    setMessages 
  } = useChat({
    api: '/api/chat',
    body: { businessName: bn, industry: ind },
  })

  const onExecute = (e: React.FormEvent) => {
    e.preventDefault()
    if (!st && (!bn || !ind)) return
    if (!st) setSt(true)
    handleSubmit(e)
  }

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />

  return (
    <main className="min-h-screen bg-[#050505] text-white font-mono selection:bg-green-500/30 flex flex-col overflow-hidden uppercase">
      
      {/* HEADER_LAYER */}
      <div className="border-b border-white/10 bg-black px-8 py-5 flex justify-between items-center z-50 shadow-2xl">
        <div className="flex items-center gap-5">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_#22c55e]" />
          <h1 className="text-2xl font-black tracking-tighter italic uppercase">
            ПАКЕТ 197: <span className="text-green-500">STRATEGIC ADVISOR</span>
          </h1>
        </div>
        <div className="hidden lg:flex gap-10 text-[9px] tracking-[0.5em] font-bold text-white/20 items-center">
          <span className="flex items-center gap-2"><Lock className="w-3 h-3 text-green-900" /> Secure Assets</span>
          <span className="flex items-center gap-2"><Cpu className="w-3 h-3 text-green-900" /> Neural_Core_v4</span>
          <span className="flex items-center gap-2"><Shield className="w-3 h-3 text-green-900" /> Sovereign</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* INPUT_LAYER */}
        {!st && (
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/5 bg-[#080808] animate-in fade-in duration-700">
            <div className="p-10 border-r border-white/5 group hover:bg-white/[0.01] transition-colors">
              <label className="text-[10px] text-green-500/40 tracking-[0.4em] mb-4 block font-black italic underline underline-offset-8">/ Source_Entity_Name</label>
              <input type="text" value={bn} onChange={(e)=>setBn(e.target.value)} placeholder="ENTER_NAME..." className="w-full bg-transparent text-4xl font-black outline-none placeholder:text-white/5 tracking-tighter focus:text-green-400 transition-colors uppercase" />
            </div>
            <div className="p-10 group hover:bg-white/[0.01] transition-colors">
              <label className="text-[10px] text-green-500/40 tracking-[0.4em] mb-4 block font-black italic underline underline-offset-8">/ Industry_Sector_ID</label>
              <input type="text" value={ind} onChange={(e)=>setInd(e.target.value)} placeholder="ENTER_SECTOR..." className="w-full bg-transparent text-4xl font-black outline-none placeholder:text-white/5 tracking-tighter focus:text-green-400 transition-colors uppercase" />
            </div>
          </div>
        )}

        {/* STREAM_LAYER */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 md:p-20 space-y-16 scroll-smooth bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.02),transparent)]">
          {messages.length === 0 && !st && (
            <div className="h-full flex flex-col items-center justify-center opacity-5 select-none animate-pulse">
              <Zap className="w-32 h-32 mb-10 text-green-500" />
              <p className="text-4xl font-black tracking-[1.5em] italic text-center uppercase italic underline underline-offset-[20px]">Ready_For_Execution</p>
            </div>
          )}
          {messages.map((m, idx) => (
            <div key={idx} className="animate-in fade-in slide-in-from-left-6 duration-700 max-w-6xl mx-auto">
              <div className={`p-12 border shadow-2xl ${m.role === 'user' ? 'border-white/10 bg-[#0a0a0a]' : 'border-green-500/20 bg-green-500/[0.02]'}`}>
                <div className="flex items-center gap-5 mb-8 border-b border-white/5 pb-4 opacity-40 tracking-widest text-[10px] uppercase">
                  <span className="font-black text-green-500">{m.role === 'user' ? '// TACTICAL_INPUT' : '// ADVISOR_STRATEGY'}</span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                  <span className="italic">{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="text-2xl leading-[1.6] text-gray-200 whitespace-pre-wrap tracking-tighter font-medium selection:bg-green-500/50 uppercase">{m.content}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="max-w-6xl mx-auto flex items-center gap-6 text-green-500 p-12 animate-pulse border border-green-500/10 bg-green-500/5 shadow-[0_0_30px_rgba(34,197,94,0.05)]">
              <Loader2 className="w-6 h-6 animate-spin text-green-500" />
              <span className="text-xs tracking-[1.2em] font-black italic uppercase">Scanning_Logic_Architecture...</span>
            </div>
          )}
        </div>

        {/* CONSOLE_LAYER */}
        <div className="bg-black border-t border-white/10 p-10 md:p-14 shadow-[0_-50px_100px_rgba(0,0,0,0.9)] relative z-50">
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            <form onSubmit={onExecute} className="space-y-8">
              <div className="relative group border border-white/10 focus-within:border-green-500/50 transition-all duration-700 shadow-inner bg-[#020202]">
                <textarea value={input} onChange={handleInputChange} placeholder="ВЪВЕДЕТЕ КАЗУС ЗА АНАЛИЗ (ROI, БИЗНЕС ЛОГИКА, АКТИВИ)..." className="w-full h-44 bg-transparent p-8 text-2xl text-green-50 focus:outline-none resize-none placeholder:text-white/5 font-bold leading-tight tracking-tight uppercase" />
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <button type="submit" disabled={isLoading || (!st && !bn)} className="flex-1 h-20 bg-white text-black font-black uppercase tracking-[0.6em] text-lg hover:bg-green-500 transition-all duration-500 disabled:opacity-5 flex items-center justify-center gap-6 group relative overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                  <span className="relative z-10 flex items-center gap-6 uppercase">{isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : <Zap className="w-6 h-6 group-hover:scale-125 transition-transform" />}EXEC
