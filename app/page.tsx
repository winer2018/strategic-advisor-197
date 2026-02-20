'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'

export default function HomePage() {
  const [bn] = useState('SYSTEM_ENTITY')
  const [ind] = useState('STRATEGIC_SECTOR')

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/chat',
    body: { businessName: bn, industry: ind },
  })

  const runAudit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    handleSubmit(e)
  }

  const clearAll = () => {
    setMessages([]);
    window.location.reload()
  }

  return (
    <main style={{ backgroundColor: '#050505', minHeight: '100vh', color: 'white', fontFamily: 'monospace', padding: '60px 20px', textTransform: 'uppercase' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-2px', marginBottom: '10px', fontStyle: 'italic', background: 'linear-gradient(to bottom, #fff, #666)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ПАКЕТ 197: STRATEGIC ADVISOR
          </h1>
          <div style={{ color: '#00FF41', fontSize: '12px', fontWeight: 'bold', letterSpacing: '4px' }}>Sovereign Architecture Analysis</div>
        </div>

        {/* MAIN INPUT AREA */}
        <div style={{ position: 'relative', marginBottom: '30px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="ОПИШЕТЕ СИТУАЦИЯТА / КАЗУСА ТУК..."
            style={{ width: '100%', height: '280px', background: 'transparent', border: 'none', padding: '30px', color: '#00FF41', fontSize: '18px', outline: 'none', resize: 'none', lineHeight: '1.6', fontWeight: 'bold' }}
          />
        </div>

        {/* COMMAND ACTIONS */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '60px' }}>
          <form onSubmit={runAudit} style={{ flex: 1 }}>
            <button type="submit" disabled={isLoading} style={{ width: '100%', height: '70px', background: 'white', color: 'black', border: 'none', borderRadius: '4px', fontWeight: '900', fontSize: '18px', letterSpacing: '2px', cursor: 'pointer', opacity: isLoading ? 0.5 : 1 }}>
              {isLoading ? 'SCANNING_LOGIC...' : 'СТАРТИРАЙ СКАНИРАНЕ'}
            </button>
          </form>
          <button onClick={clearAll} style={{ padding: '0 30px', background: 'transparent', border: '1px solid #333', color: '#666', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>ИЗЧИСТИ</button>
        </div>

        {/* LOGIC OUTPUT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {messages.map((m, i) => m.role !== 'user' && (
            <div key={i} style={{ borderLeft: '4px solid #00FF41', padding: '30px', background: 'rgba(0, 255, 65, 0.05)', borderRadius: '0 12px 12px 0' }}>
              <div style={{ color: '#00FF41', fontSize: '10px', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '2px' }}>// СТРАТЕГИЧЕСКИ РЕЗУЛТАТ 197</div>
              <div style={{ fontSize: '19px', lineHeight: '1.8', color: '#eee', whiteSpace: 'pre-line', tracking: 'tight' }}>{m.content}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
