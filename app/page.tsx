'use client'

import React, { useState, useEffect } from 'react'
import { Search, Loader2, Trash2, Shield } from 'lucide-react'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [input, setInput] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const runAudit = async () => {
    console.log("Бутонът е натиснат. Стартирам сканиране...");
    if (!input.trim()) {
      alert("Моля, въведете казус.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: input }] })
      });

      const data = await response.json();
      
      if (data.error || data.content?.includes("Грешка")) {
        setResult("КРИТИЧНА ГРЕШКА: " + (data.error || data.content));
      } else {
        setResult(data.content);
      }
    } catch (err) {
      setResult("ВРЪЗКАТА Е ПРЕКЪСНАТА. Проверете конзолата.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <main style={{ backgroundColor: '#050505', minHeight: '100vh', color: 'white', fontFamily: 'monospace', padding: '60px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-2px', marginBottom: '10px', fontStyle: 'italic', background: 'linear-gradient(to bottom, #fff, #666)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textTransform: 'uppercase' }}>
            ПАКЕТ 197: STRATEGIC ADVISOR
          </h1>
          <div style={{ color: '#00FF41', fontSize: '10px', fontWeight: 'bold', letterSpacing: '4px', textTransform: 'uppercase' }}>Sovereign Architecture Analysis</div>
        </div>

        <div style={{ background: '#0a0a0a', border: '1px solid #333', borderRadius: '12px', overflow: 'hidden', marginBottom: '30px' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ВЪВЕДЕТЕ КАЗУСА ТУК..."
            style={{ width: '100%', height: '250px', background: 'transparent', border: 'none', padding: '30px', color: '#00FF41', fontSize: '18px', outline: 'none', resize: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '60px' }}>
          <button
            onClick={() => runAudit()}
            disabled={loading}
            style={{ flex: 3, height: '70px', background: 'white', color: 'black', border: 'none', borderRadius: '4px', fontWeight: '900', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: loading ? 0.5 : 1 }}
          >
            {loading ? <Loader2 size={24} className="animate-spin" /> : <><Search size={24} /> СТАРТИРАЙ СКАНИРАНЕ</>}
          </button>
          <button
            onClick={() => { setInput(''); setResult(null); }}
            style={{ flex: 1, height: '70px', background: 'transparent', border: '1px solid #333', color: '#666', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            <Trash2 size={20} /> ИЗЧИСТИ
          </button>
        </div>

        {result && (
          <div style={{ borderLeft: '4px solid #00FF41', padding: '40px', background: 'rgba(0, 255, 65, 0.05)', borderRadius: '0 12px 12px 0' }}>
             <div style={{ color: '#00FF41', fontSize: '10px', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '2px' }}>// РЕЗУЛТАТ 197:</div>
             <p style={{ fontSize: '20px', lineHeight: '1.8', color: '#eee', whiteSpace: 'pre-line', fontStyle: 'italic' }}>{result}</p>
          </div>
        )}
      </div>
    </main>
  );
}
