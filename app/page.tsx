'use client'

import React, { useState, useEffect } from 'react'
import { Search, Loader2, Trash2, Shield } from 'lucide-react'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [input, setInput] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const runAudit = async () => {
    if (!input.trim()) return
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: input }] })
      })
      const data = await response.json()
      setResult(data.content || 'Грешка в логическия мост.')
    } catch (err) {
      setResult('Критична грешка при връзката.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER ИЗГЛЕД ОТ 47 */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent italic uppercase">
            ПАКЕТ 197: STRATEGIC ADVISOR
          </h1>
          <div className="text-green-500 text-xs tracking-[0.4em] font-bold uppercase">Sovereign Architecture Analysis</div>
        </div>

        {/* INPUT AREA С ЕФЕКТИТЕ НА 47 */}
        <div className="relative group mb-6">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-transparent rounded-xl blur opacity-25"></div>
          <div className="relative bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ВЪВЕДЕТЕ КАЗУС ЗА АНАЛИЗ (ROI, БИЗНЕС ЛОГИКА, АКТИВИ)..."
              className="w-full h-64 bg-transparent p-8 text-green-50 focus:outline-none resize-none placeholder:text-white/5 text-lg leading-relaxed font-bold"
            />
          </div>
        </div>

        {/* БУТОНИТЕ ОТ 47 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button
            onClick={runAudit}
            disabled={loading || !input.trim()}
            className="flex-[3] h-16 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-green-500 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-5 h-5" /> СТАРТИРАЙ СКАНИРАНЕ</>}
          </button>
          
          <button
            onClick={() => { setInput(''); setResult(null); }}
            className="flex-1 h-16 border border-white/10 hover:border-red-500/50 hover:text-red-500 transition-all duration-300 flex items-center justify-center gap-2 uppercase font-bold text-xs"
          >
            <Trash2 className="w-4 h-4" /> ИЗЧИСТИ
          </button>
        </div>

        {/* РЕЗУЛТАТЪТ СЪС СТИЛА НА 197 */}
        {result && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="border-l-4 border-green-500 pl-8 py-6 bg-green-500/5 rounded-r-xl">
              <div className="flex items-center gap-2 mb-4 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                <Shield className="w-4 h-4" /> Стратегически Резултат 197
              </div>
              <p className="text-gray-100 text-xl leading-relaxed whitespace-pre-line italic font-medium">
                {result}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
