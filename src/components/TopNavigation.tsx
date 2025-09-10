import React, { useState } from 'react';
import { Eye } from 'lucide-react';

export const TopNavigation: React.FC = () => {
  const [observatoryOpen, setObservatoryOpen] = useState(false);

  return (
    <>
      {/* Top Navigation Panel */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-cli-border">
        <div className="flex justify-between items-center px-6 py-3">
          {/* Left Navigation Items */}
          <div className="flex items-center space-x-8">
            <button className="text-terminal-white hover:text-terminal-green transition-colors text-sm font-terminal">
              About
            </button>
            <button className="text-terminal-white hover:text-terminal-green transition-colors text-sm font-terminal">
              Transparency
            </button>
            <button className="text-terminal-white hover:text-terminal-green transition-colors text-sm font-terminal">
              Twitter
            </button>
          </div>
          
          {/* Right Observatory Section */}
          <div className="relative">
            <button 
              onClick={() => setObservatoryOpen(!observatoryOpen)}
              className="flex items-center space-x-2 text-terminal-white hover:text-terminal-green transition-colors text-sm font-terminal"
            >
              <Eye size={16} />
              <span>Observatory</span>
            </button>
            
            {/* Observatory Dropdown */}
            {observatoryOpen && (
              <div className="absolute top-full right-0 mt-2 bg-background border border-cli-border rounded-none min-w-[180px] animate-fade-in-lag">
                <button className="w-full text-left px-4 py-2 text-terminal-white hover:bg-cli-secondary hover:text-terminal-green transition-colors text-sm font-terminal border-b border-cli-border">
                  Watch logs live
                </button>
                <button className="w-full text-left px-4 py-2 text-terminal-white hover:bg-cli-secondary hover:text-terminal-green transition-colors text-sm font-terminal">
                  Website
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Overlay to close dropdown */}
      {observatoryOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setObservatoryOpen(false)}
        />
      )}
    </>
  );
};