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
    <div style={{ backgroundColor: '#000', color: '#00FF41', minHeight: '100vh', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', padding: '0', margin: '0' }}>
      
      {/* SYSTEM HEADER */}
      <div style={{ borderBottom: '2px solid #00FF41', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#050505' }}>
        <span style={{ fontWeight: '900', letterSpacing: '0.5em', fontSize: '20px' }}>SA_197_SCANNER_v2.0</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '10px', animation: 'pulse 2s infinite' }}>LOG_CONNECTED</span>
          <div style={{ width: '12px', height: '12px', background: '#00FF41', boxShadow: '0 0 15px #00FF41' }}></div>
        </div>
      </div>

      {/* TACTICAL INPUTS (TOP) */}
      {!st && (
        <div style={{ display: 'flex', borderBottom: '1px solid #00FF41' }}>
          <div style={{ flex: 1, padding: '30px', borderRight: '1px solid #00FF41' }}>
            <div style={{ fontSize: '10px', opacity: 0.5, marginBottom: '10px' }}>{'>'} SOURCE_ENTITY</div>
            <input type="text" value={bn} onChange={(e) => setBn(e.target.value)} style={{ width: '100%', background: 'transparent', border: 'none', color: '#00FF41', fontSize: '35px', fontWeight: 'bold', outline: 'none' }} placeholder="NAME_REQUIRED" />
          </div>
          <div style={{ flex: 1, padding: '30px' }}>
            <div style={{ fontSize: '10px', opacity: 0.5, marginBottom: '10px' }}>{'>'} INDUSTRY_SECTOR</div>
            <input type="text" value={ind} onChange={(e) => setInd(e.target.value)} style={{ width: '100%', background: 'transparent', border: 'none', color: '#00FF41', fontSize: '35px', fontWeight: 'bold', outline: 'none' }} placeholder="SECTOR_REQUIRED" />
          </div>
        </div>
      )}

      {/* ANALYSIS STREAM (MIDDLE) */}
      <div style={{ flex: 1, padding: '50px', overflowY: 'auto', paddingBottom: '500px' }}>
        {messages.length === 0 && !st && (
          <div style={{ opacity: 0.05, fontSize: '120px', fontWeight: '900', textAlign: 'center', marginTop: '100px', pointerEvents: 'none' }}>SCANNER</div>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '50px', borderLeft: '5px solid #00FF41', padding: '30px', background: 'rgba(0,255,65,0.05)' }}>
            <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '15px' }}>{msg.role === 'user' ? '// DATA_INPUT' : '// SYSTEM_ANALYSIS'}</div>
            <div style={{ fontSize: '26px', lineHeight: '1.5', color: '#FFF' }}>{msg.content}</div>
          </div>
        ))}
        {isLoading && <div style={{ color: '#00FF41', fontSize: '14px', letterSpacing: '0.5em' }}>PROCESSING_LOGIC...</div>}
      </div>

      {/* COMMAND CONSOLE (FIXED BOTTOM) */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#000', borderTop: '3px solid #00FF41' }}>
        <form onSubmit={(e) => { e.preventDefault(); if(!st) setSt(true); handleSubmit(e); }}>
          <textarea 
            value={input} onChange={handleInputChange} 
            style={{ width: '100%', background: '#000', color: '#00FF41', padding: '40px', fontSize: '30px', border: 'none', outline: 'none', minHeight: '350px', resize: 'none' }} 
            placeholder="[ PROVIDE STRATEGIC DATA FOR EXECUTION ]" 
          />
          <div style={{ padding: '20px 40px', borderTop: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#050505' }}>
            <div style={{ fontSize: '10px', opacity: 0.3 }}>SOVEREIGN_ARCH_v197</div>
            <div style={{ display: 'flex', gap: '30px' }}>
              <button type="button" onClick={() => window.location.reload()} style={{ background: 'transparent', border: '1px solid #333', color: '#444', padding: '15px 30px', cursor: 'pointer', fontSize: '12px' }}>RESET</button>
              <button type="submit" style={{ background: '#00FF41', color: '#000', border: 'none', padding: '15px 80px', fontSize: '16px', fontWeight: '900', cursor: 'pointer', letterSpacing: '0.3em', boxShadow: '0 0 25px rgba(0,255,65,0.4)' }}>EXECUTE</button>
            </div>
          </div>
        </form>
      </div>

      <style jsx global>{`
        body { margin: 0; background: black; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #00FF41; }
      `}</style>
    </div>
  );
}
