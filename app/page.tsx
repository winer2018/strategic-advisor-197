'use client';

import { useChat } from 'ai/react';
import { useState, useEffect } from 'react';

export default function Home() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [started, setStarted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { businessName, industry },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!started && (!businessName || !industry)) return;
    if (!started) setStarted(true);
    handleSubmit(e);
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#000', color: '#00FF41', minHeight: '100vh', fontFamily: 'monospace', display: 'flex', flexDirection: 'column' }}>
      
      {/* SCANNER HEADER */}
      <div style={{ borderBottom: '1px solid rgba(0,255,65,0.3)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#000' }}>
        <span style={{ fontWeight: '900', letterSpacing: '0.4em', fontSize: '18px' }}>PROJECT_197_SCANNER</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.6 }}>Sovereign_Link_Active</span>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#00FF41', borderRadius: '50%', boxShadow: '0 0 10px #00FF41' }}></div>
        </div>
      </div>

      {/* TACTICAL INPUTS */}
      {!started && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', borderBottom: '1px solid rgba(0,255,65,0.2)', backgroundColor: 'rgba(0,255,65,0.05)' }}>
          <div style={{ padding: '40px', borderRight: '1px solid rgba(0,255,65,0.2)' }}>
            <div style={{ fontSize: '10px', marginBottom: '10px', opacity: 0.5, letterSpacing: '0.2em' }}>/ IDENTITY_ENTITY</div>
            <input 
              type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} 
              style={{ width: '100%', background: 'transparent', border: 'none', color: '#00FF41', fontSize: '40px', fontWeight: '900', outline: 'none', textTransform: 'uppercase' }} 
              placeholder="ENTER_NAME" 
            />
          </div>
          <div style={{ padding: '40px' }}>
            <div style={{ fontSize: '10px', marginBottom: '10px', opacity: 0.5, letterSpacing: '0.2em' }}>/ INDUSTRY_SECTOR</div>
            <input 
              type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} 
              style={{ width: '100%', background: 'transparent', border: 'none', color: '#00FF41', fontSize: '40px', fontWeight: '900', outline: 'none', textTransform: 'uppercase' }} 
              placeholder="ENTER_SECTOR" 
            />
          </div>
        </div>
      )}

      {/* ANALYSIS LOG AREA */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto', paddingBottom: '500px' }}>
        {messages.length === 0 && !started && (
          <div style={{ opacity: 0.1, fontSize: '100px', fontWeight: '900', textAlign: 'center', marginTop: '100px', letterSpacing: '0.5em', textTransform: 'uppercase' }}>
            Scanner
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: '60px', padding: '40px', borderLeft: '4px solid #00FF41', backgroundColor: 'rgba(0,255,65,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(0,255,65,0.1)', paddingBottom: '10px', fontSize: '10px', opacity: 0.4 }}>
              <span>{m.role === 'user' ? '// TACTICAL_QUERY' : '// STRATEGIC_ANALYSIS'}</span>
              <span>2026_LOG_SA197</span>
            </div>
            <div style={{ fontSize: '28px', lineHeight: '1.4', fontWeight: '500', color: '#E0E0E0' }}>{m.content}</div>
          </div>
        ))}
        {isLoading && <div style={{ fontSize: '12px', letterSpacing: '0.8em', animation: 'pulse 1s infinite' }}>SCANNING_LOGIC...</div>}
      </div>

      {/* FIXED COMMAND CONSOLE */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#000', borderTop: '2px solid rgba(0,255,65,0.3)', padding: '0' }}>
        <form onSubmit={onSubmit}>
          <textarea 
            value={input} onChange={handleInputChange} 
            style={{ width: '100%', backgroundColor: '#000', color: '#00FF41', padding: '40px', fontSize: '32px', border: 'none', outline: 'none', minHeight: '300px', resize: 'none' }} 
            placeholder="[ ENTER STRATEGIC DATA FOR EXECUTION ]" 
          />
          <div style={{ padding: '25px', borderTop: '1px solid rgba(0,255,65,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#050505' }}>
            <div style={{ fontSize: '10px', opacity: 0.3, letterSpacing: '0.3em' }}>PROPRIETARY_SOVEREIGN_OS // AES_256</div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <button type="button" onClick={() => window.location.reload()} style={{ padding: '15px 30px', border: '1px solid rgba(0,255,65,0.2)', background: 'transparent', color: 'rgba(0,255,65,0.5)', cursor: 'pointer', textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold' }}>Reset</button>
              <button type="submit" disabled={isLoading} style={{ padding: '15px 60px', backgroundColor: '#00FF41', color: '#000', border: 'none', cursor: 'pointer', textTransform: 'uppercase', fontSize: '14px', fontWeight: '900', letterSpacing: '0.4em', boxShadow: '0 0 30px rgba(0,255,65,0.3)' }}>Execute</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
