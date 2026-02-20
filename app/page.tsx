'use client'

import { useState } from 'react'

export default function HomePage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const runAudit = async () => {
    if (!input.trim() || isLoading) return
    
    const userMsg = { role: 'user', content: input }
    // Показваме казуса веднага, за да не изчезва
    setMessages([{ role: 'user', content: input }])
    setIsLoading(true)
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [userMsg] }),
      })
      
      const data = await res.json()
      
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'ГРЕШКА: ЛОГИЧЕСКИЯТ МОСТ ВЪРНА ПРАЗЕН ОТГОВОР.' }])
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'КРИТИЧНА ГРЕШКА: ВРЪЗКАТА СЪС СЪРВЪРА Е ПРЕКЪСНАТА.' }])
    } finally {
      setIsLoading(false)
    }
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

        {/* INPUT */}
        <div style={{ marginBottom: '30px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '12px', overflow: 'hidden' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ОПИШЕТЕ КАЗУСА ТУК..."
            style={{ width: '100%', height: '280px', background: 'transparent', border: 'none', padding: '30px', color: '#00FF41', fontSize: '18px', outline: 'none', resize: 'none', lineHeight: '1.6', fontWeight: 'bold' }}
          />
        </div>

        {/* ACTION BUTTON - NO FORM WRAPPER TO PREVENT RELOAD */}
        <div style={{ marginBottom: '60px' }}>
          <button 
            onClick={runAudit}
            disabled={isLoading || !input.trim()} 
            style={{ width: '100%', height: '70px', background: 'white', color: 'black', border: 'none', borderRadius: '4px', fontWeight: '900', fontSize: '18px', letterSpacing: '2px', cursor: 'pointer', opacity: (isLoading || !input.trim()) ? 0.5 : 1 }}
          >
            {isLoading ? 'SCANNING_LOGIC...' : 'СТАРТИРАЙ СКАНИРАНЕ'}
          </button>
        </div>

        {/* OUTPUT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ 
              borderLeft: m.role === 'user' ? '4px solid #333' : '4px solid #00FF41', 
              padding: '30px', 
              background: m.role === 'user' ? 'transparent' : 'rgba(0, 255, 65, 0.05)', 
              borderRadius: '0 12px 12px 0',
              marginBottom: '10px'
            }}>
              <div style={{ color: m.role === 'user' ? '#666' : '#00FF41', fontSize: '10px', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '2px' }}>
                // {m.role === 'user' ? 'ВЪВЕДЕН КАЗУС' : 'СТРАТЕГИЧЕСКИ РЕЗУЛТАТ 197'}
              </div>
              <div style={{ fontSize: '19px', lineHeight: '1.8', color: '#eee', whiteSpace: 'pre-line' }}>{m.content}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
