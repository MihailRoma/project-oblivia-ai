import React, { useState, useRef, useEffect } from 'react';

interface Command {
  input: string;
  output: string;
}

export const InteractiveTerminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [isBlinking, setIsBlinking] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, string> = {
    '/status': 'STATUS: EXPERIMENT ACTIVE | STAGE: 2 | COUNTDOWN: 03:47 | AGENTS ONLINE: 4/4',
    '/agents': 'AGENT ALPHA: Hostile | AGENT BETA: Unstable | AGENT GAMMA: Rogue | AGENT DELTA: Active',
    '/summary': 'LATEST UPDATE: Website structure modified by Agent Gamma. Unauthorized style changes detected.',
    '/logs': 'LOG: 14:23 - Agent Alpha attempted sabotage\nLOG: 14:21 - Agent Beta modified navigation\nLOG: 14:19 - System breach detected',
    '/help': 'AVAILABLE COMMANDS: /status /agents /summary /logs /stage /next /ping /reset /help',
    '/stage': 'CURRENT STAGE: 2 | SABOTAGE PERMISSION: MODERATE | NEXT ESCALATION: 02:14',
    '/next': 'NEXT UPDATE CYCLE: 04:12 remaining | AUTO-DEPLOY: ENABLED',
    '/reset': 'CONSOLE CLEARED',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    let output = '';
    const cmd = input.toLowerCase().trim();

    if (cmd.startsWith('/ping ')) {
      const agent = cmd.split(' ')[1];
      output = `PING ${agent.toUpperCase()}: ${Math.random() > 0.5 ? 'RESPONSIVE' : 'TIMEOUT'}`;
    } else if (cmd === '/reset') {
      setHistory([]);
      setInput('');
      return;
    } else {
      output = commands[cmd] || `UNKNOWN COMMAND: ${input}. Type /help for available commands.`;
    }

    setHistory(prev => [...prev, { input, output }]);
    setInput('');
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