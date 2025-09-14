import React, { useState, useEffect } from 'react';

interface TerminalInterfaceProps {
  children: React.ReactNode;
}

export const TerminalInterface: React.FC<TerminalInterfaceProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading lag
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-terminal relative scanlines crt-scanlines overflow-hidden">
      {/* Status Bar */}
      <div className="status-bar mt-8 py-1 text-xs opacity-80">
        <span className="warning-text">Status: IN ACTION</span>
        <span className="ml-4 text-terminal-gray">•</span>
        <span className="ml-2 text-terminal-gray">Agents: 4</span>
        <span className="ml-4 text-terminal-gray">•</span>
        <span className="ml-2 warning-text">Containment: FAILED</span>
      </div>
      
      {/* Main Terminal Window */}
      <div className="terminal-window m-2 mt-0 flex items-start justify-center">
        {isLoaded ? (
          <div className="w-full max-w-7xl mx-auto py-6">
            {children}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="typing-text">INITIALIZING PROJECT OBLIVIA...</div>
          </div>
        )}
      </div>
      
      {/* Terminal Cursor */}
      <div className="fixed bottom-4 right-4 text-terminal-pink animate-blink">
        <span className="text-xs">█</span>
      </div>
    </div>
  );
};