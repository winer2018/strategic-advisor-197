'use client';

import { useChat } from 'ai/react';

export default function StrategicAdvisor() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-8 max-w-4xl mx-auto">
      <div className="w-full border-b border-slate-800 pb-4 mb-8">
        <h1 className="text-2xl font-bold tracking-tight">STRATEGIC ADVISOR 197</h1>
        <p className="text-slate-400 text-sm">Sovereign Architecture™ | Adaptive Intelligence Layer</p>
      </div>

      <div className="flex-1 w-full overflow-y-auto space-y-4 mb-8 scrollbar-hide">
        {messages.length === 0 && (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-lg">
            <p className="text-slate-500">Системата е в готовност. Въведете казус за стратегически анализ.</p>
          </div>
        )}
        {messages.map(m => (
          <div key={m.id} className={`p-4 rounded-lg ${m.role === 'user' ? 'bg-slate-900 ml-12' : 'bg-slate-800 mr-12 border-l-4 border-blue-500'}`}>
            <span className="text-xs font-bold uppercase block mb-1 opacity-50">
              {m.role === 'user' ? 'Client' : 'Sovereign Advisor'}
            </span>
            <div className="whitespace-pre-wrap">{m.content}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="w-full sticky bottom-8">
        <div className="relative flex items-center">
          <input
            className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all pr-12"
            value={input}
            placeholder="Опишете бизнес ситуацията..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="absolute right-3 p-2 bg-blue-600 rounded-lg disabled:opacity-50"
            disabled={isLoading || !input}
          >
            {isLoading ? '...' : '→'}
          </button>
        </div>
      </form>
    </main>
  );
}
