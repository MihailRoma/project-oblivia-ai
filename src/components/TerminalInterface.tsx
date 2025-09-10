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
    <div className="min-h-screen bg-background text-foreground font-terminal relative scanlines">
      {/* Status Bar */}
      <div className="status-bar">
        <span className="warning-text">Quarantine Status: UNSTABLE</span>
        <span className="ml-4 text-terminal-gray">•</span>
        <span className="ml-2 text-terminal-gray">Agents: 4</span>
        <span className="ml-4 text-terminal-gray">•</span>
        <span className="ml-2 warning-text">Containment: FAILED</span>
      </div>
      
      {/* Main Terminal Window */}
      <div className="terminal-window min-h-[calc(100vh-2rem)] m-2">
        {isLoaded ? (
          <div className="p-6">
            {children}
          </div>
        ) : (
          <div className="p-6 flex items-center justify-center h-96">
            <div className="typing-text">INITIALIZING PROJECT OBLIVIA...</div>
          </div>
        )}
      </div>
      
      {/* Terminal Cursor */}
      <div className="fixed bottom-4 right-4 text-terminal-green animate-blink">
        <span className="text-xs">█</span>
      </div>
    </div>
  );
};