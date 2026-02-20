'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';

export default function Home() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [revenue, setRevenue] = useState('');
  const [started, setStarted] = useState(false);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/chat',
    body: {
      businessName,
      industry,
      revenue,
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!started && (!businessName || !industry)) {
      return;
    }
    if (!started) {
      setStarted(true);
    }
    handleSubmit(e);
  };

  const handleClear = () => {
    setMessages([]);
    setInput('');
    setStarted(false);
    setBusinessName('');
    setIndustry('');
    setRevenue('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-3 tracking-wide">
          <span className="text-white">ПАКЕТ 197: </span>
          <span className="italic">STRATEGIC ADVISOR</span>
        </h1>
        <p className="text-emerald-400 text-sm tracking-[0.3em] uppercase">
          SOVEREIGN ARCHITECTURE ANALYSIS
        </p>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl">
        {/* Results/Chat Area */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg min-h-[400px] max-h-[500px] overflow-y-auto mb-6 p-6">
          {!started && messages.length === 0 ? (
            // Initial Form
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Име на бизнеса *
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Моята компания ООД"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Индустрия *
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="E-commerce, SaaS, Консултинг..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Годишни приходи <span className="text-gray-600">(по избор)</span>
                </label>
                <input
                  type="text"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="$100K, $1M, $10M+"
                />
              </div>

              <div className="pt-4">
                <label className="block text-sm text-gray-400 mb-2">
                  Вашият въпрос *
                </label>
                <textarea
                  value={input}
                  onChange={(e) => handleInputChange(e as any)}
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  rows={4}
                  placeholder="Опишете вашия бизнес въпрос или проблем..."
                />
              </div>
            </div>
          ) : (
            // Messages
            <div className="space-y-4">
              {started && (
                <div className="text-xs text-gray-500 pb-4 border-b border-gray-800">
                  <span className="text-emerald-400">БИЗНЕС:</span> {businessName} 
                  {' • '}
                  <span className="text-emerald-400">ИНДУСТРИЯ:</span> {industry}
                  {revenue && (
                    <>
                      {' • '}
                      <span className="text-emerald-400">ПРИХОДИ:</span> {revenue}
                    </>
                  )}
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${
                    message.role === 'user'
                      ? 'text-gray-300'
                      : 'text-white'
                  }`}
                >
                  <div className="text-xs text-emerald-400 mb-2 uppercase tracking-wider">
                    {message.role === 'user' ? '> ЗАПИТВАНЕ' : '> АНАЛИЗ'}
                  </div>
                  <div className="text-sm leading-relaxed whitespace-pre-wrap pl-4 border-l-2 border-gray-700">
                    {message.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="text-white">
                  <div className="text-xs text-emerald-400 mb-2 uppercase tracking-wider">
                    > АНАЛИЗ
                  </div>
                  <div className="text-sm pl-4 border-l-2 border-gray-700 flex items-center gap-2">
                    <span>Анализирам</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse delay-75"></div>
                      <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Continue conversation input */}
              {started && !isLoading && (
                <div className="pt-6 border-t border-gray-800">
                  <textarea
                    value={input}
                    onChange={(e) => handleInputChange(e as any)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (input.trim()) {
                          handleSubmit(e as any);
                        }
                      }
                    }}
                    className="w-full bg-[#0a0a0a] border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    rows={3}
                    placeholder="Продължете разговора..."
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={(e) => {
              if (!started) {
                const form = { preventDefault: () => {}, target: {} } as any;
                onSubmit(form);
              } else if (input.trim()) {
                const form = { preventDefault: () => {}, target: {} } as any;
                handleSubmit(form);
              }
            }}
            disabled={isLoading || (!started && (!businessName || !industry || !input.trim())) || (started && !input.trim())}
            className="flex-1 bg-white hover:bg-gray-100 text-black font-semibold py-4 px-6 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase tracking-wider"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {!started ? 'Стартирай Анализ' : isLoading ? 'Анализирам...' : 'Продължи Анализ'}
          </button>

          <button
            onClick={handleClear}
            className="bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-gray-700 text-white font-semibold py-4 px-6 rounded transition-colors flex items-center gap-2 uppercase tracking-wider"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Изчисти
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-xs text-gray-600">
        <p>Powered by Sovereign Architecture™</p>
      </div>
    </div>
  );
}
