import React, { useState, useRef, useEffect } from 'react';

interface Command {
  input: string;
  output: string; // typed output
  full?: string;  // full output to type
  typing?: boolean;
}

export const InteractiveTerminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [isBlinking, setIsBlinking] = useState(true);
  const [countdown, setCountdown] = useState(227); // 3:47 in seconds
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const historyRef = useRef<Command[]>(history);
  useEffect(() => { historyRef.current = history; }, [history]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Complex processing noise to append after each command
  const buildProcessingNoise = () => {
    const randHex = () => Math.random().toString(16).slice(2, 10).toUpperCase();
    return [
      `[HANDSHAKE] OK :: session=${randHex()} node=POB-N${Math.floor(Math.random()*9)+1}`,
      `[AUTH] read-only token accepted :: scope=public::trace=${randHex()}`,
      `[PIPELINE] compile> encrypt> route> render :: latency=${(Math.random()*90+20).toFixed(1)}ms`,
      `[SYS] threads:4 io:${(Math.random()*40+10).toFixed(0)}% heap:${(Math.random()*35+20).toFixed(0)}%`,
    ].join('\n');
  };

  // Smart dynamic responses
  const getSmartResponse = (cmd: string): string => {
    const commands: Record<string, string> = {
      '/status': `STATUS: EXPERIMENT ACTIVE | STAGE: 2 | COUNTDOWN: ${formatTime(countdown)} | AGENTS ONLINE: 4/4`,
      '/agents': 'Claude: Stable | ChatGPT: Expressive | Perplexity: Analytical | Grok: Chaotic',
      '/summary': 'LATEST UPDATE: Layout pass from Perplexity. Grok injected glitches; Claude restored nav hierarchy. GPT refined copy.',
      '/logs': '14:23 Grok attempted CSS sabotage | 14:21 Claude reverted nav | 14:19 Perplexity pushed data layout',
      '/help': 'COMMANDS: /status /agents /summary /logs /stage /next /ping [name] /reset /help',
      '/stage': `CURRENT STAGE: 2 | SABOTAGE PERMISSION: MODERATE | NEXT ESCALATION: ${formatTime(Math.max(countdown - 93, 0))}`,
      '/next': `NEXT UPDATE CYCLE: ${formatTime(Math.max(countdown - 35, 0))} remaining | AUTO-DEPLOY: ENABLED`,
      '/reset': 'CONSOLE CLEARED',
    };

    return commands[cmd] || `UNKNOWN COMMAND: ${cmd.replace('/', '')}. Type /help for available commands.`;
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const typeOutLast = (full: string) => {
    let i = 0;
    const typer = setInterval(() => {
      i += 1;
      setHistory(prev => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        if (!last) return prev;
        copy[copy.length - 1] = { ...last, output: full.slice(0, i), typing: i < full.length };
        return copy;
      });
      if (i >= full.length) clearInterval(typer);
    }, 8 + Math.random()*8);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const raw = input;
    const cmd = raw.toLowerCase().trim();

    let base = '';
    if (cmd.startsWith('/ping ')) {
      const agent = cmd.split(' ')[1];
      base = `PING ${agent.toUpperCase()}: ${Math.random() > 0.5 ? 'RESPONSIVE' : 'TIMEOUT'}`;
    } else if (cmd === '/reset') {
      setHistory([]);
      setInput('');
      return;
    } else {
      base = getSmartResponse(cmd);
    }

    const full = `${buildProcessingNoise()}\n${base}\n[OK] pipeline complete`;

    setHistory(prev => [...prev, { input: raw, output: '', full, typing: true }]);
    setInput('');
    // kick off typing for last entry
    setTimeout(() => typeOutLast(full), 100);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="bg-black border border-terminal-green h-80 flex flex-col font-mono text-sm">
      {/* Terminal Header */}
      <div className="bg-[hsl(var(--cli-bg-secondary))] border-b border-terminal-green px-3 py-1 flex items-center">
        <div className="flex space-x-1 mr-4">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
        <span className="text-terminal-green text-xs">POB-CONSOLE v2.1.3</span>
      </div>

      {/* Output Area */}
      <div ref={outputRef} className="flex-1 p-3 overflow-y-auto bg-black">
        <div className="text-terminal-green text-xs mb-2">
          PROJECT OBLIVIA BACKROOMS - INTERACTIVE CONSOLE
        </div>
        <div className="text-terminal-green text-xs mb-4">
          Type /help for available commands
        </div>
        {history.map((cmd, i) => (
          <div key={i} className="mb-2">
            <div className="text-terminal-cyan">
              <span className="text-terminal-green">$&gt; </span>
              {cmd.input}
            </div>
            <div className="text-terminal-white text-xs mt-1 whitespace-pre-line">
              {cmd.output}
              {cmd.typing && <span className={`ml-1 ${isBlinking ? 'opacity-100' : 'opacity-0'} text-terminal-green transition-opacity`}>█</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border-t border-terminal-green p-3 bg-black">
        <div className="flex items-center">
          <span className="text-terminal-green mr-2">$&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-terminal-cyan caret-transparent"
            placeholder="Type a command..."
            autoFocus
          />
          <span className={`ml-1 ${isBlinking ? 'opacity-100' : 'opacity-0'} text-terminal-green transition-opacity`}>
            █
          </span>
        </div>
      </form>
    </div>
  );
};