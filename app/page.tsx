'use client'

import React, { useState, useEffect } from 'react'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  async function handleScan() {
    console.log("START_SCAN"); // Трябва да го видиш в Console
    if (!input) return alert("Въведи текст!");
    
    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: input }] })
      });
      const data = await res.json();
      setResult(data.content || "Няма отговор от сървъра.");
    } catch (e) {
      setResult("Грешка при връзката.");
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#00FF41', padding: '50px', fontFamily: 'monospace' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', border: '1px solid #333', padding: '30px' }}>
        <h1 style={{ color: '#fff', textAlign: 'center' }}>ПАКЕТ 197: STRATEGIC ADVISOR</h1>
        
        <textarea 
          style={{ width: '100%', height: '200px', background: '#111', color: '#00FF41', border: '1px solid #333', padding: '15px', marginTop: '20px' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ОПИШЕТЕ КАЗУСА..."
        />

        <button 
          onClick={handleScan}
          disabled={loading}
          style={{ width: '100%', height: '60px', marginTop: '20px', background: '#fff', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {loading ? "СКАНИРАНЕ..." : "СТАРТИРАЙ АНАЛИЗ"}
        </button>

        <button 
          onClick={() => { setInput(''); setResult(''); }}
          style={{ width: '100%', marginTop: '10px', background: 'transparent', color: '#666', border: 'none', cursor: 'pointer' }}
        >
          ИЗЧИСТИ
        </button>

        {result && (
          <div style={{ marginTop: '30px', padding: '20px', borderTop: '2px solid #00FF41', color: '#fff' }}>
            <strong>РЕЗУЛТАТ:</strong>
            <p style={{ whiteSpace: 'pre-line' }}>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
