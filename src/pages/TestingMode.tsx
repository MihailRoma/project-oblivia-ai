import React, { useEffect, useMemo, useRef, useState } from 'react';

const agents = [
  { name: 'Cursor', color: 'text-terminal-cyan' },
  { name: 'ChatGPT', color: 'text-terminal-green' },
  { name: 'Claude', color: 'text-terminal-amber' },
  { name: 'Perplexity', color: 'text-terminal-white' },
  { name: 'Grok', color: 'text-terminal-pink' },
] as const;

type Agent = typeof agents[number]["name"];

const topics = [
  'mapping Level 0 corridors',
  'recursive stairs spiraling',
  'glitch pulse in sector C7',
  'escape vector hypothesis',
  'entropy bloom in the vents',
  'hallway echo collapsing',
  'archive door 13 unlocked',
  'maze tiling symmetry breaks',
];

const asciiSnippets = [
  `┌─────────┐\n│ ░░░░░░  │\n│ ░██░░░  │\n│ ░██░░░  │\n└─────────┘`,
  `╔════════════╗\n║  ││││││││  ║\n║  │      │  ║\n║  │  ▓▓  │  ║\n╚════════════╝`,
  `████████████\n█  ▓  ▓  ▓ █\n█          █\n████████████`,
];

const buildLine = (): { agent: Agent; text: string; ascii?: string } => {
  const a = agents[Math.floor(Math.random() * agents.length)].name;
  const t = topics[Math.floor(Math.random() * topics.length)];
  const withAscii = Math.random() < 0.2;
  return {
    agent: a,
    text: `${a === 'Cursor' ? '[SYS]' : a}: ${t}…`,
    ascii: withAscii ? asciiSnippets[Math.floor(Math.random() * asciiSnippets.length)] : undefined,
  };
};

const TestingMode: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [current, setCurrent] = useState<string>('');
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1); // 0.5 slow, 1 normal, 2 fast
  const [glitch, setGlitch] = useState(true);
  const [theme, setTheme] = useState<'green' | 'cyan'>('green');

  const colors = useMemo(() => ({
    green: 'text-terminal-green',
    cyan: 'text-terminal-cyan',
  }), []);

  const outRef = useRef<HTMLDivElement>(null);

  // append new generated line periodically
  useEffect(() => {
    if (paused) return;

    let cancelled = false;
    const { agent, text, ascii } = buildLine();
    const agentColor = agents.find(a => a.name === agent)?.color || 'text-terminal-white';
    const payload = ascii ? `${text}\n${ascii}` : text;

    let i = 0;
    const interval = setInterval(() => {
      if (cancelled) return;
      i++;
      setCurrent(payload.slice(0, i));
      if (i >= payload.length) {
        clearInterval(interval);
        setLines(prev => [...prev, `%${agentColor}%${payload}`]);
        setCurrent('');
      }
    }, Math.max(12, 24 / speed));

    const schedule = setTimeout(() => {
      if (!cancelled) {
        // trigger next line by re-running effect via state change
        setCurrent(c => c); 
      }
    }, 1200 / Math.max(1, speed));

    return () => {
      cancelled = true;
      clearInterval(interval);
      clearTimeout(schedule);
    };
  }, [paused, speed, glitch, theme, lines.length]);

  useEffect(() => {
    if (outRef.current) {
      outRef.current.scrollTop = outRef.current.scrollHeight;
    }
  }, [lines, current]);

  const renderColored = (s: string) => {
    // custom lightweight color markup: %className%text
    const match = s.match(/^%([^%]+)%/);
    if (!match) return <span className={colors[theme]}>{s}</span>;
    const cls = match[1];
    const text = s.slice(match[0].length);
    return <span className={cls}>{text}</span>;
  };

  return (
    <div className="min-h-screen bg-black text-terminal-white font-mono">
      {/* Header */}
      <div className="bg-[hsl(var(--cli-bg-secondary))] border-b border-terminal-pink px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-terminal-white text-sm">TESTING MODE — BACKROOMS DIALOGUE</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <button onClick={() => setPaused(p => !p)} className="px-3 py-1 border border-terminal-pink text-terminal-pink hover:bg-terminal-pink/20 transition">
            {paused ? 'Resume' : 'Pause'}
          </button>
          <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="bg-[hsl(var(--cli-bg-primary))] border border-terminal-pink px-2 py-1">
            <option value={0.5}>Slow</option>
            <option value={1}>Normal</option>
            <option value={2}>Fast</option>
          </select>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={glitch} onChange={(e) => setGlitch(e.target.checked)} />
            <span>Glitch</span>
          </label>
          <select value={theme} onChange={(e) => setTheme(e.target.value as any)} className="bg-[hsl(var(--cli-bg-primary))] border border-terminal-pink px-2 py-1">
            <option value="green">Green</option>
            <option value="cyan">Cyan</option>
          </select>
        </div>
      </div>

      {/* Output */}
      <div ref={outRef} className="p-4 h-[calc(100vh-56px)] overflow-y-auto">
        <div className="border border-terminal-green p-4">
          {lines.map((l, idx) => (
            <pre key={idx} className={`whitespace-pre-wrap leading-relaxed ${glitch && Math.random()<0.05 ? 'animate-fade-in' : ''}`}>
              {renderColored(l)}
            </pre>
          ))}
          {current && (
            <pre className={`whitespace-pre-wrap ${colors[theme]}`}>
              {current}<span className="text-terminal-green animate-blink">█</span>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestingMode;
