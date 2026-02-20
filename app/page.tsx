'use client'

import { useState } from 'react'
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
    setMessages([]); setBn(''); setInd(''); setStarted(false);
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

        {/* INPUTS */}
        {!started && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            <div style={{ background: '#0a0a0a', border: '1px solid #333', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '10px', color: '#666', marginBottom: '8px', letterSpacing: '2px' }}>/ Business_Name</div>
              <input type="text" value={bn} onChange={(e) => setBn(e.target.value)} placeholder="ENTER NAME..." style={{ background: 'transparent', border: 'none', color: '#00FF41', width: '100%', fontSize: '18px', fontWeight: 'bold', outline: 'none' }} />
            </div>
            <div style={{ background: '#0a0a0a', border: '1px solid #333', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '10px', color: '#666', marginBottom: '8px', letterSpacing: '2px' }}>/ Industry_Sector</div>
              <input type="text" value={ind} onChange={(e) => setInd(e.target.value)} placeholder="ENTER SECTOR..." style={{ background: 'transparent', border: 'none', color: '#00FF41', width: '100%', fontSize: '18px', fontWeight: 'bold', outline: 'none' }} />
            </div>
          </div>
        )}

        {/* TERMINAL TEXTAREA */}
        <div style={{ position: 'relative', marginBottom: '30px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="ВЪВЕДЕТЕ КАЗУС ЗА АНАЛИЗ (ROI, БИЗНЕС ЛОГИКА, АКТИВИ)..."
            style={{ width: '100%', height: '200px', background: 'transparent', border: 'none', padding: '25px', color: '#00FF41', fontSize: '16px', outline: 'none', resize: 'none', lineHeight: '1.6' }}
          />
        </div>

        {/* ACTIONS */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '60px' }}>
          <form onSubmit={runAudit} style={{ flex: 1 }}>
            <button type="submit" disabled={isLoading || !bn} style={{ width: '100%', height: '60px', background: 'white', color: 'black', border: 'none', borderRadius: '4px', fontWeight: '900', fontSize: '14px', letterSpacing: '2px', cursor: 'pointer', opacity: (isLoading || !bn) ? 0.5 : 1 }}>
              {isLoading ? 'SCANNING_IN_PROGRESS...' : 'СТАРТИРАЙ СКАНИРАНЕ'}
            </button>
          </form>
          <button onClick={clearAll} style={{ padding: '0 30px', background: 'transparent', border: '1px solid #333', color: '#666', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>ИЗЧИСТИ</button>
        </div>

        {/* STRATEGIC OUTPUT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {messages.map((m, i) => m.role !== 'user' && (
            <div key={i} style={{ borderLeft: '4px solid #00FF41', padding: '25px', background: 'rgba(0, 255, 65, 0.05)', borderRadius: '0 12px 12px 0' }}>
              <div style={{ color: '#00FF41', fontSize: '10px', fontWeight: 'bold', marginBottom: '15px', letterSpacing: '2px' }}>// СТРАТЕГИЧЕСКИ АНАЛИЗ 197</div>
              <div style={{ fontSize: '18px', lineHeight: '1.7', color: '#eee', whiteSpace: 'pre-line' }}>{m.content}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
