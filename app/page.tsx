'use client'

import React, { useState, useEffect } from 'react'
import { Search, Loader2, Trash2, Shield, TrendingUp, AlertTriangle } from 'lucide-react'

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
    <main style={{ backgroundColor: '#050505', minHeight: '100vh', color: 'white', fontFamily: 'monospace', padding: '60px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* HEADER ОТ 47 */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-2px', marginBottom: '10px', fontStyle: 'italic', background: 'linear-gradient(to bottom, #fff, #666)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textTransform: 'uppercase' }}>
            ПАКЕТ 197: STRATEGIC ADVISOR
          </h1>
          <div style={{ color: '#00FF41', fontSize: '10px', fontWeight: 'bold', letterSpacing: '4px', textTransform: 'uppercase' }}>Sovereign Architecture Analysis</div>
        </div>

        {/* INPUT AREA С ЕФЕКТИТЕ НА 47 */}
        <div style={{ position: 'relative', marginBottom: '30px' }}>
          <div style={{ background: '#0a0a0a', border: '1px solid #333', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ВЪВЕДЕТЕ КАЗУС ЗА АНАЛИЗ (ROI, БИЗНЕС ЛОГИКА, АКТИВИ)..."
              style={{ width: '100%', height: '280px', background: 'transparent', border: 'none', padding: '30px', color: '#00FF41', fontSize: '18px', outline: 'none', resize: 'none', lineHeight: '1.6', fontWeight: 'bold' }}
            />
          </div>
        </div>

        {/* БУТОНИТЕ ОТ 47 */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '60px' }}>
          <button
            onClick={runAudit}
            disabled={loading || !input.trim()}
            style={{ flex: 3, height: '70px', background: 'white', color: 'black', border: 'none', borderRadius: '4px', fontWeight: '900', fontSize: '18px', letterSpacing: '2px', cursor: 'pointer', opacity: (loading || !input.trim()) ? 0.5 : 1, textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: '0.3s' }}
          >
            {loading ? <Loader2 size={24} className="animate-spin" /> : <><Search size={24} /> СТАРТИРАЙ СКАНИРАНЕ</>}
          </button>
          
          <button
            onClick={() => { setInput(''); setResult(null); }}
            style={{ flex: 1, height: '70px', background: 'transparent', border: '1px solid #333', color: '#666', borderRadius: '4px', fontWeight: '900', fontSize: '14px', letterSpacing: '1px', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Trash2 size={20} /> ИЗЧИСТИ
          </button>
        </div>

        {/* РЕЗУЛТАТЪТ */}
        {result && (
          <div style={{ borderLeft: '4px solid #00FF41', padding: '40px', background: 'rgba(0, 255, 65, 0.05)', borderRadius: '0 12px 12px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00FF41', fontSize: '10px', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              <Shield size={16} /> СТРАТЕГИЧЕСКИ РЕЗУЛТАТ 197
            </div>
            <p style={{ fontSize: '20px', lineHeight: '1.8', color: '#eee', whiteSpace: 'pre-line', fontStyle: 'italic' }}>
              {result}
            </p>
            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #333', display: 'flex', gap: '20px' }}>
                <div style={{ color: '#555', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}><TrendingUp size={12} /> ROI OPTIMIZED</div>
                <div style={{ color: '#555', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}><AlertTriangle size={12} /> STRESS TESTED</div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
