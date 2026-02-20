'use client';

import { useChat } from 'ai/react';
import { useState, useEffect } from 'react';

export default function Home() {
  const [bn, setBn] = useState('');
  const [ind, setInd] = useState('');
  const [st, setSt] = useState(false);
  const [m, setM] = useState(false);

  useEffect(() => { setM(true); }, []);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { businessName: bn, industry: ind },
  });

  if (!m) return null;

  return (
    <div style={{ backgroundColor: '#000', color: '#00FF41', minHeight: '100vh', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', margin: '0', padding: '0' }}>
      
      {/* SYSTEM TOP BAR */}
      <div style={{ borderBottom: '1px solid #00FF41', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#050505' }}>
        <span style={{ fontWeight: '900', letterSpacing: '0.5em', fontSize: '18px' }}>SA_197_SCANNER_v2.0</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.6 }}>Link_Sovereign_Active</span>
          <div style={{ width: '10px', height: '10px', background: '#00FF41', borderRadius: '50%', boxShadow: '0 0 10px #00FF41' }}></div>
        </div>
      </div>

      {/* TACTICAL INPUTS (FULL WIDTH) */}
      {!st && (
        <div style={{ display: 'flex', borderBottom: '1px solid #00FF41', background: 'rgba(0,255,65,0.03)' }}>
          <div style={{ flex: 1, padding: '40px', borderRight: '1px solid #00FF41' }}>
            <div style={{ fontSize: '10px', opacity: 0.5, marginBottom: '10px', letterSpacing: '0.2em' }}>/ IDENTITY_ENTITY</div>
            <input type="text" value={bn} onChange={(e) => setBn(e.target.value)} style={{ width: '100%', background: 'transparent', border: 'none', color: '#00FF41', fontSize: '45px', fontWeight: '900', outline: 'none', textTransform: 'uppercase' }} placeholder="ENTER_NAME" />
          </div>
          <div style={{ flex: 1, padding: '40px' }}>
            <div style={{ fontSize: '10px', opacity: 0.5, marginBottom: '10px', letterSpacing: '0.2em' }}>/ INDUSTRY_SECTOR</div>
            <input type="text" value={ind} onChange={(e) => setInd(e.target.value)} style={{ width: '100%', background: 'transparent', border: 'none', color: '#00FF41', fontSize: '45px', fontWeight: '900', outline: 'none', textTransform: 'uppercase' }} placeholder="ENTER_SECTOR" />
          </div>
        </div>
      )}

      {/* ANALYSIS STREAM (LOG) */}
      <div style={{ flex: 1, padding: '60px', overflowY: 'auto', paddingBottom: '550px' }}>
        {messages.length === 0 && !st && (
          <div style={{ opacity: 0.05, fontSize: '150px', fontWeight: '900', textAlign: 'center', marginTop: '100px', pointerEvents: 'none', letterSpacing: '0.3em' }}>SCANNER</div>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '80px', borderLeft: '4px solid #00FF41', paddingLeft: '40px', background: 'rgba(0,255,65,0.02)', padding: '40px' }}>
            <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '20px', letterSpacing: '0.5em', textTransform: 'uppercase' }}>{msg.role === 'user' ? '// TACTICAL_INPUT' : '// STRATEGIC_ANALYSIS'}</div>
            <div style={{ fontSize: '32px', lineHeight: '1.4', color: '#FFF', fontWeight: '500' }}>{msg.content}</div>
          </div>
        ))}
        {isLoading && <div style={{ color: '#00FF41', fontSize: '14px', letterSpacing: '1em', animate: 'pulse 1s infinite' }}>PROCESSING_LOGIC...</div>}
      </div>

      {/* COMMAND CONSOLE (FIXED BOTTOM - FULL WIDTH) */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#000', borderTop: '2px solid #00FF41', zIndex: 100 }}>
        <form onSubmit={(e) => { e.preventDefault(); if(!st) setSt(true); handleSubmit(e); }}>
          <textarea 
            value={input} onChange={handleInputChange} 
            style={{ width: '100%', background: '#000', color: '#00FF41', padding: '50px', fontSize: '35px', border: 'none', outline: 'none', minHeight: '350px', resize: 'none', fontWeight: 'bold' }} 
            placeholder="[ ENTER STRATEGIC DATA FOR EXECUTION ]" 
          />
          <div style={{ padding: '30px 50px', borderTop: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#030303' }}>
            <div style={{ fontSize: '11px', opacity: 0.3, letterSpacing: '0.5em' }}>PROPRIETARY_SOVEREIGN_OS // AES_256</div>
            <div style={{ display: 'flex', gap: '40px' }}>
              <button type="button" onClick={() => window.location.reload()} style={{ background: 'transparent', border: '1px solid #333', color: '#444', padding: '20px 40px', cursor: 'pointer', fontSize: '14px', textTransform: 'uppercase', fontWeight: 'bold' }}>Reset</button>
              <button type="submit" style={{ background: '#00FF41', color: '#000', border: 'none', padding: '20px 100px', fontSize: '18px', fontWeight: '900', cursor: 'pointer', letterSpacing: '0.5em', boxShadow: '0 0 40px rgba(0,255,65,0.5)' }}>EXECUTE</button>
            </div>
          </div>
        </form>
      </div>

      <style jsx global>{`
        body { margin: 0; background: black; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #00FF41; }
        input::placeholder, textarea::placeholder { color: #003300 !important; }
      `}</style>
    </div>
  );
}
