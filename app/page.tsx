'use client'

import React, { useState } from 'react'

export default function HomePage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const runAudit = async () => {
    if (!input.trim()) return
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
      setResult(data.content || 'Грешка в логическия мост.')
    } catch (err) {
      setError('Критична грешка при връзката.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: 'white', fontFamily: 'monospace', padding: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        
        <h1 style={{ fontSize: '32px', marginBottom: '40px', color: '#fff', textTransform: 'uppercase' }}>
          ПАКЕТ 197: STRATEGIC ADVISOR
        </h1>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ОПИШЕТЕ КАЗУСА ТУК..."
          style={{ 
            width: '100%', height: '200px', backgroundColor: '#0a0a0a', border: '1px solid #333', 
            borderRadius: '8px', padding: '20px', color: '#00FF41', fontSize: '16px', marginBottom: '20px',
            outline: 'none', resize: 'none'
          }}
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={runAudit}
            disabled={loading || !input.trim()}
            style={{ 
              flex: 1, height: '60px', backgroundColor: '#fff', color: '#000', border: 'none', 
              borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', opacity: loading ? 0.5 : 1
            }}
          >
            {loading ? 'СКАНИРАНЕ...' : 'СТАРТИРАЙ АНАЛИЗ'}
          </button>
          
          <button
            onClick={() => { setInput(''); setResult(null); }}
            style={{ 
              width: '100px', height: '60px', backgroundColor: 'transparent', border: '1px solid #333', 
              color: '#666', borderRadius: '4px', cursor: 'pointer'
            }}
          >
            ИЗЧИСТИ
          </button>
        </div>

        {error && <div style={{ color: 'red', marginTop: '20px' }}>{error}</div>}

        {result && (
          <div style={{ marginTop: '40px', padding: '30px', borderLeft: '4px solid #00FF41', backgroundColor: '#0a0a0a', textAlign: 'left' }}>
            <div style={{ color: '#00FF41', fontSize: '12px', marginBottom: '10px' }}>// РЕЗУЛТАТ:</div>
            <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#ccc', whiteSpace: 'pre-line' }}>{result}</p>
          </div>
        )}
      </div>
    </div>
  )
}
