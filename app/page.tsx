'use client'

import { useState } from 'react'
import { Search, Loader2, Trash2, Shield, TrendingUp, AlertTriangle } from 'lucide-react'

export default function HomePage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const runAudit = async () => {
    if (input.trim().length < 5) {
      setError('Опишете казуса по-конкретно.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: input }] })
      })

      const data = await response.json()
      if (data.error) throw new Error(data.error)
      
      setResult(data.content || data.result)
    } catch (err: any) {
      setError('Критична грешка в логическия мост. Проверете API ключа.')
    } finally {
      setLoading(false)
    }
  }

  const clearAll = () => {
    setInput('')
    setResult(null)
    setError('')
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white font-mono selection:bg-green-500/30">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* HEADER */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent italic">
            ПАКЕТ 197: STRATEGIC ADVISOR
          </h1>
          <div className="text-green-500 text-xs tracking-[0.3em] font-bold uppercase">Sovereign Architecture Analysis</div>
        </div>

        {/* INPUT AREA */}
        <div className="relative bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden mb-6 shadow-2xl">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ВЪВЕДЕТЕ КАЗУС ЗА АНАЛИЗ (ROI, БИЗНЕС ЛОГИКА, АКТИВИ)..."
            className="w-full h-64 bg-transparent p-8 text-green-50 focus:outline-none resize-none placeholder:text-white/10 text-lg leading-relaxed"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button
            onClick={runAudit}
            disabled={loading}
            className="flex-1 h-16 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-green-500 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Search className="w-6 h-6" /> СТАРТИРАЙ СКАНИРАНЕ</>}
          </button>
          
          <button
            onClick={clearAll}
            className="h-16 px-8 border border-white/10 hover:border-red-500/50 hover:text-red-500 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-5 h-5" /> ИЗЧИСТИ
          </button>
        </div>

        {/* ERROR DISPLAY */}
        {error && (
          <div className="mb-8 p-4 border-l-4 border-red-600 bg-red-600/5 text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* RESULT OUTPUT */}
        {result && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="border-l-4 border-green-500 pl-8 py-4 bg-green-500/5 rounded-r-xl">
              <div className="flex items-center gap-2 mb-4 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                <Shield className="w-4 h-4" /> Стратегически Резултат 197
              </div>
              <p className="text-gray-100 text-xl leading-relaxed whitespace-pre-line font-sans italic">
                {result}
              </p>
              <div className="mt-8 pt-6 border-t border-white/5 flex gap-6">
                <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase"><TrendingUp className="w-3 h-3" /> ROI Optimized</div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase"><AlertTriangle className="w-3 h-3" /> Stress Tested -50%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
