'use client'

import { useState } from 'react'
import { Search, Loader2, Trash2 } from 'lucide-react'
import { useChat } from 'ai/react'

export default function HomePage() {
  const [bn, setBn] = useState('')
  const [ind, setInd] = useState('')
  const [started, setStarted] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/chat',
    body: { businessName: bn, industry: ind },
  })

  const runAudit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bn || !ind) return
    setStarted(true)
    handleSubmit(e)
  }

  const clearAll = () => {
    setMessages([])
    setBn('')
    setInd('')
    setStarted(false)
    window.location.reload()
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white font-mono selection:bg-green-500/30">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* HEADER: ORIGINAL P47 */}
        <div className="mb-12 text-center relative">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent italic uppercase">
            ПАКЕТ 197: STRATEGIC ADVISOR
          </h1>
          <div className="text-green-500 text-xs tracking-[0.3em] font-bold uppercase">Sovereign Architecture Analysis</div>
        </div>

        {/* INPUTS: P197 LOGIC IN P47 STYLE */}
        {!started && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden p-4">
               <label className="text-[9px] text-white/30 uppercase mb-2 block tracking-widest">Business_Name</label>
               <input type="text" value={bn} onChange={(e) => setBn(e.target.value)} placeholder="ENTER NAME..." className="bg-transparent w-full text-green-50 outline-none font-bold uppercase" />
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden p-4">
               <label className="text-[9px] text-white/30 uppercase mb-2 block tracking-widest">Industry_Sector</label>
               <input type="text" value={ind} onChange={(e) => setInd(e.target.value)} placeholder="ENTER SECTOR..." className="bg-transparent w-full text-green-50 outline-none font-bold uppercase" />
            </div>
          </div>
        )}

        {/* TEXTAREA: ORIGINAL P47 STYLE */}
        <div className="relative group mb-6">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder="ВЪВЕДЕТЕ КАЗУС ЗА АНАЛИЗ (ROI, БИЗНЕС ЛОГИКА, АКТИВИ)..."
              className="w-full h-48 bg-transparent p-6 text-green-50 focus:outline-none resize-none placeholder:text-white/10 text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* BUTTONS: ORIGINAL P47 STYLE */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <form onSubmit={runAudit} className="flex-1 flex gap-4">
            <button
              type="submit"
              disabled={isLoading || !bn}
              className="flex-1 h-14 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-green-500 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 group"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />}
              СТАРТИРАЙ СКАНИРАНЕ
            </button>
          </form>
          
          <button
            onClick={clearAll}
            className="h-14 px-8 border border-white/10 hover:border-red-500/50 hover:text-red-500 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <Trash2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            ИЗЧИСТИ
          </button>
        </div>

        {/* RESULTS: P47 VISUAL CARDS */}
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
          {messages.map((m, i) => (
            m.role !== 'user' && (
              <div key={i} className="grid gap-6">
                <div className="border-l-4 border-green-500 pl-6 py-2 bg-green-500/5">
                  <h3 className="text-green-500 text-[10px] font-bold uppercase tracking-widest mb-2">Стратегически Анализ 197</h3>
                  <p className="text-white leading-relaxed whitespace-pre-line">{m.content}</p>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </main>
  )
}
