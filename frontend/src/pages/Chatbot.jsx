// src/pages/Chatbot.jsx
import { useEffect, useRef, useState } from 'react';
import { Sparkles, Radio, ShieldAlert, Send, Loader2, User as UserIcon, Bot as BotIcon } from 'lucide-react';
import API from '../api/api';

const starterPrompts = [
  {
    title: 'Emergency Protocols',
    detail: '“Methane levels surged in Tunnel C — what sequence should we follow?”',
  },
  {
    title: 'Wearable Troubleshooting',
    detail: '“One device lost LoRa link but still has GSM — what should we check first?”',
  },
  {
    title: 'Vitals Guidance',
    detail: '“Heart rate spikes keep triggering overnight — how do we calibrate thresholds?”',
  },
];

function friendlyTimestamp(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso || '';
  }
}

const sentimentColor = (s) => {
  if (!s) return 'bg-slate-200 text-slate-800';
  const low = s.toString().toLowerCase();
  if (low.includes('positive')) return 'bg-emerald-100 text-emerald-800';
  if (low.includes('negative')) return 'bg-rose-100 text-rose-800';
  return 'bg-amber-100 text-amber-800';
};

const Chatbot = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState(() => [
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm here to help you learn about our Smart Wearable Alert System for mining safety. How can I assist you?",
      timestamp: new Date().toISOString(),
      sentiment: 'Neutral',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef(null);

  // Auto-scroll when messages change
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 80;
    if (isNearBottom) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    } else {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  const sendToBackend = async (text) => {
    setLoading(true);
    setError('');
    try {
      const payload = { message: text };
      const { data } = await API.post('/chatbot/ask', payload);

      const rawAnswer = data?.answer || data?.message || '';
      const tier = data?.tier || 1;

      let answer = rawAnswer;
      if (typeof answer === 'string') {
        answer = answer.replace(/^\s*MineGuard Support Assistant:\s*/i, '').trim();
      } else {
        answer = String(answer);
      }

      const sentiment = data?.sentiment || 'Neutral';

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: answer || 'MineGuard Support Assistant: (no content returned)',
          timestamp: new Date().toISOString(),
          sentiment,
          tier,
        },
      ]);
    } catch (err) {
      console.error('Chatbot send error:', err);
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        'Failed to reach the MineGuard assistant. Please try again.';
      setError(msg);

      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: msg,
          timestamp: new Date().toISOString(),
          sentiment: 'Neutral',
          tier: 1,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    const text = question.trim();

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: 'user', content: text, timestamp: new Date().toISOString() },
    ]);

    setQuestion('');
    await sendToBackend(text);
  };

  const handleStarterClick = async (example) => {
    if (!example) return;
    const text = example;

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: 'user', content: text, timestamp: new Date().toISOString() },
    ]);

    await sendToBackend(text);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">

        {/* Left column */}
        <aside className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-card">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-[var(--color-accent)]" />
            <h2 className="text-xl font-semibold text-[var(--color-text)]">MineGuard Support Assistant</h2>
          </div>

          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Product-aware support that answers mining safety, wearable diagnostics, and emergency readiness questions only.
          </p>

          <div className="mt-5 space-y-3">
            {starterPrompts.map((p) => (
              <button
                key={p.title}
                onClick={() => handleStarterClick(p.detail)}
                className="w-full text-left rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-3 transition hover:scale-[1.01]"
              >
                <p className="text-sm font-semibold text-[var(--color-text)]">{p.title}</p>
                <p className="text-xs text-[var(--color-text-muted)] line-clamp-2">{p.detail}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-[var(--color-surface-soft)] p-4 text-xs text-[var(--color-text-muted)]">
            <p className="font-semibold uppercase tracking-[0.3em] text-[var(--color-text)]">Capabilities</p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center gap-2">
                <ShieldAlert className="h-3.5 w-3.5 text-rose-500" /> Hazard diagnostics & alert explanations
              </li>
              <li className="flex items-center gap-2">
                <Radio className="h-3.5 w-3.5 text-sky-500" /> Connectivity, firmware, and wearable setup
              </li>
            </ul>
          </div>
        </aside>

        {/* Main chat area */}
        <section className="flex h-[70vh] flex-col rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-card">

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto rounded-2xl bg-[var(--color-surface-soft)] p-4">
            {messages.length === 0 ? (
              <p className="text-sm text-[var(--color-text-muted)]">Conversations appear here.</p>
            ) : (
              messages.map((m, idx) => {
                const isUser = m.role === 'user';
                const isAssistant = m.role === 'assistant';
                return (
                  <div key={`${m.id}-${idx}`} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className="max-w-xl">

                      {isAssistant && (m.sentiment || m.tier) && (
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          {m.sentiment && (
                            <div className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs ${sentimentColor(m.sentiment)}`}>
                              <strong className="uppercase tracking-wide">{m.sentiment}</strong>
                            </div>
                          )}
                          {m.tier && m.tier >= 2 && (
                            <div className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs ${
                              m.tier === 3 ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                            }`}>
                              <ShieldAlert className="h-3 w-3" />
                              <strong className="uppercase tracking-wide">TIER {m.tier}</strong>
                            </div>
                          )}
                        </div>
                      )}

                      <div
                        className={`rounded-3xl px-4 py-3 text-sm shadow-sm transition ${
                          isUser
                            ? 'bg-[var(--color-accent)] text-white shadow-[0_15px_35px_rgba(249,115,22,0.25)]'
                            : 'bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] shadow-inner'
                        }`}
                      >
                        {m.content}
                      </div>

                      <div className="mt-1 text-xs text-[var(--color-text-muted)]">
                        <span>{friendlyTimestamp(m.timestamp)}</span>
                        {isAssistant && <span className="ml-2 text-[10px] opacity-60"> • assistant</span>}
                        {isUser && <span className="ml-2 text-[10px] opacity-60"> • you</span>}
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {loading && (
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <Loader2 className="h-4 w-4 animate-spin" />
                Assistant is typing…
              </div>
            )}

            {error && <div className="text-sm text-rose-500">{error}</div>}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              placeholder="Ask about MineGuard safety workflows..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-3 py-3 text-sm focus:border-[var(--color-highlight)] focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]/30"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-[var(--color-accent-strong)] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="inline-block mr-2 h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                'Send'
              )}
            </button>
          </form>

        </section>
      </div>
    </div>
  );
};

export default Chatbot;
