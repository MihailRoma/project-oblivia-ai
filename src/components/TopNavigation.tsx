import React, { useState } from 'react';
import { Eye, Activity, Globe } from 'lucide-react';
import { NavigationContent } from './NavigationContent';

export const TopNavigation: React.FC = () => {
  const [observatoryOpen, setObservatoryOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, section?: string) => {
    e.currentTarget.classList.add('animate-laggy-flicker');
    if (section) setActiveSection(section); // open immediately for responsiveness
    setTimeout(() => {
      e.currentTarget.classList.remove('animate-laggy-flicker');
    }, 400);
  };

  const handleObservatoryClick = () => {
    window.open('https://oblivia-observatory.site/', '_blank');
  };

  const handleTwitterClick = () => {
    window.open('https://x.com/ObliviaAI', '_blank');
  };

  return (
    <>
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--cli-bg-secondary))] border-b border-border px-4 py-2">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          {/* Left side navigation */}
          <div className="flex space-x-6">
            <button 
              className="bg-[hsl(var(--cli-bg-secondary))] border-none px-4 py-2 text-terminal-white hover:text-terminal-pink transition-colors text-sm"
              onClick={(e) => handleButtonClick(e, 'about')}
            >
              About
            </button>
            <button 
              className="bg-[hsl(var(--cli-bg-secondary))] border-none px-4 py-2 text-terminal-white hover:text-terminal-pink transition-colors text-sm"
              onClick={(e) => handleButtonClick(e, 'transparency')}
            >
              Transparency
            </button>
            <button 
              className="bg-[hsl(var(--cli-bg-secondary))] border-none px-4 py-2 text-terminal-white hover:text-terminal-pink transition-colors text-sm"
              onClick={(e) => {
                handleButtonClick(e);
                handleTwitterClick();
              }}
            >
              Twitter
            </button>
          </div>
          
          {/* Right side - Observatory */}
          <div className="relative">
            <button
              onClick={handleObservatoryClick}
              className="observatory-button flex items-center gap-2 bg-terminal-pink/20 text-terminal-pink hover:text-terminal-white transition-all duration-300 text-sm px-4 py-2 border-2 border-terminal-pink hover:bg-terminal-pink hover:shadow-[0_0_15px_hsl(var(--terminal-pink)/0.5)] font-semibold"
            >
              Observatory <Eye size={16} />
            </button>
            
            {/* Observatory Dropdown */}
            {observatoryOpen && (
              <div className="absolute right-0 top-full mt-2 bg-[hsl(var(--cli-bg-primary))] border border-terminal-green min-w-[220px] z-[70] shadow-lg backdrop-blur-sm animate-fade-in">
                <button
                  className="bg-[hsl(var(--cli-bg-primary))] flex items-center gap-3 px-4 py-3 text-terminal-white hover:text-terminal-pink transition-colors text-sm border-b border-terminal-green hover:bg-terminal-pink/10 w-full text-left"
                  onClick={handleButtonClick}
                >
                  <Activity size={16} />
                  Watch logs live
                </button>
                <button
                  className="bg-[hsl(var(--cli-bg-primary))] flex items-center gap-3 px-4 py-3 text-terminal-white hover:text-terminal-pink transition-colors text-sm hover:bg-terminal-pink/10 w-full text-left"
                  onClick={handleButtonClick}
                >
                  <Globe size={16} />
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

      {/* Navigation Content */}
      <NavigationContent 
        activeSection={activeSection}
        onClose={() => setActiveSection(null)}
      />
    </>
  );
};