'use client'

import { useState } from 'react'

export default function HomePage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const runAudit = async () => {
    if (input.trim().length < 5) {
      setError('ОПИШЕТЕ КАЗУСА ПО-ПОДРОБНО.')
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

      if (!response.ok) throw new Error(`Server Error: ${response.status}`)
      
      const data = await response.json()
      setResult(data.content || 'ГРЕШКА В ОТГОВОРА.')
    } catch (err: any) {
      setError(`КРИТИЧНА ГРЕШКА: ${err.message}. ПРОВЕРЕТЕ API МОСТА.`)
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
    <main style={{ backgroundColor: '#050505', minHeight: '100vh', color: 'white', fontFamily: 'monospace', padding: '60px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-2px', marginBottom: '10px', fontStyle: 'italic', background: 'linear-gradient(to bottom, #fff, #666)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textTransform: 'uppercase' }}>
            ПАКЕТ 197: STRATEGIC ADVISOR
          </h1>
          <div style={{ color: '#00FF41', fontSize: '10px', fontWeight: 'bold', letterSpacing: '4px', textTransform: 'uppercase' }}>Sovereign Architecture Analysis</div>
        </div>

        <div style={{ background: '#0a0a0a', border: '1px solid #333', borderRadius: '12px', overflow: 'hidden', marginBottom: '30px' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ВЪВЕДЕТЕ КАЗУС ЗА АНАЛИЗ..."
            style={{ width: '100%', height: '280px', background: 'transparent', border: 'none', padding: '30px', color: '#00FF41', fontSize: '18px', outline: 'none', resize: 'none', lineHeight: '1.6', fontWeight: 'bold' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '60px' }}>
          <button
            onClick={runAudit}
            disabled={loading}
            style={{ flex: 3, height: '70px', background: 'white', color: 'black', border: 'none', borderRadius: '4px', fontWeight: '900', fontSize: '18px', letterSpacing: '2px', cursor: 'pointer', opacity: loading ? 0.5 : 1, textTransform: 'uppercase' }}
          >
            {loading ? 'SCANNING_LOGIC...' : 'СТАРТИРАЙ СКАНИРАНЕ'}
          </button>
          
          <button
            onClick={clearAll}
            style={{ flex: 1, height: '70px', background: 'transparent', border: '1px solid #333', color: '#666', borderRadius: '4px', fontWeight: '900', fontSize: '14px', letterSpacing: '1px', cursor: 'pointer', textTransform: 'uppercase' }}
          >
            ИЗЧИСТИ
          </button>
        </div>

        {error && (
          <div style={{ padding: '20px', borderLeft: '4px solid #ff0000', background: 'rgba(255,0,0,0.05)', color: '#ff4444', marginBottom: '30px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        {result && (
          <div style={{ borderLeft: '4px solid #00FF41', padding: '40px', background: 'rgba(0, 255, 65, 0.05)', borderRadius: '0 12px 12px 0' }}>
            <div style={{ color: '#00FF41', fontSize: '10px', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '2px', textTransform: 'uppercase' }}>// СТРАТЕГИЧЕСКИ РЕЗУЛТАТ 197</div>
            <p style={{ fontSize: '20px', lineHeight: '1.8', color: '#eee', whiteSpace: 'pre-line', fontStyle: 'italic' }}>
              {result}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
