import React, { useState, useEffect } from 'react';
import { TerminalInterface } from '@/components/TerminalInterface';
import { ProjectObliviaASCII } from '@/components/ASCIIArt';
import { TypewriterText } from '@/components/TypewriterText';
import { GlitchText } from '@/components/GlitchText';
import { TopNavigation } from '@/components/TopNavigation';
import { ChromeWindow, AIAgentFolder, AIAgentFolderGroup } from '@/components/ChromeWindow';
import { InteractiveTerminal } from '@/components/InteractiveTerminal';

const Index = () => {
  const [showSubheading, setShowSubheading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showWarnings, setShowWarnings] = useState(false);

  useEffect(() => {
    // Simulate system initialization delays
    const timer1 = setTimeout(() => setShowSubheading(true), 3000);
    const timer2 = setTimeout(() => setShowDescription(true), 6000);
    const timer3 = setTimeout(() => setShowWarnings(true), 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <>
      <TopNavigation />
      <TerminalInterface>
        <div className="w-full">
          {/* ASCII Header */}
          <ProjectObliviaASCII />
          
          {/* Main Subtitle with Advanced Glitch Animation */}
          <div className="text-center mb-8">
            {showSubheading && (
              <div className="animate-fade-in">
                <div className="advanced-glitch" data-text="Four AI agents. One website. Infinite sabotage. Watch chaos unfold live.">
                  <TypewriterText
                    text="Four AI agents. One website. Infinite sabotage. Watch chaos unfold live."
                    className="text-base md:text-lg text-terminal-pink block mb-4 italic"
                    speed={50}
                    onComplete={() => setTimeout(() => setShowDescription(true), 2000)}
                  />
                </div>
              </div>
            )}
          </div>

        {/* Description */}
        {showDescription && (
          <div className="max-w-4xl mx-auto text-center mb-8 animate-fade-in-lag">
            <TypewriterText
              text="Watch four AI agents with conflicting goals race against the clock, each updating every 5 minutes to build, sabotage, and reshape a shared website. As stages progress, they gain more permission to disrupt the workflow, intensifying the chaos in this live digital battleground."
              className="text-base md:text-lg text-terminal-white leading-relaxed"
              speed={35}
            />
            
            {/* Testing Mode Text */}
            <div className="mt-6 animate-fade-in-lag" style={{ animationDelay: '2s' }}>
              <button 
                onClick={() => (window.location.href = '/testing')}
                className="bg-transparent border-none text-terminal-pink hover:text-terminal-red transition-colors duration-300 underline decoration-dotted underline-offset-4 hover:no-underline cursor-pointer text-sm"
              >
                Testing Mode (Backrooms)
              </button>
            </div>
          </div>
        )}

        {/* Chrome Windows */}
        {showWarnings && (
          <div className="w-full max-w-7xl mx-auto mt-16 animate-fade-in-lag">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Interactive Terminal - Bottom Left */}
              <div className="order-2 lg:order-1">
                <InteractiveTerminal />
              </div>

              {/* AI Agents Window - Bottom Right */}
              <div className="order-1 lg:order-2">
                <ChromeWindow title="prompt.txt" className="h-80">
                  <div className="h-full overflow-y-auto">
                    <AIAgentFolderGroup>
                      <AIAgentFolder 
                        name="Grok AI"
                        content={`Build a highly experimental, chaotic, and immersive website design. Use abstract visuals, unpredictable layouts, and unconventional navigation to evoke mystery and exploration. Prioritize artistic expression over usability.`}
                      />
                      <AIAgentFolder 
                        name="ChatGPT (GPT-4o)"
                        content={`Create an elegant and picturesque website focused on visual storytelling. Use poetic language, rich imagery, and balanced compositions that evoke emotion and wonder. Aim for an artistic, almost dreamlike user experience.`}
                      />
                      <AIAgentFolder 
                        name="Claude"
                        content={`Develop a clear, concise, and highly informational website. Focus on structured content, easy navigation, and practical user needs. Prioritize utility and straightforward communication over flair.`}
                      />
                      <AIAgentFolder 
                        name="Perplexity"
                        content={`Design an experimental hybrid balancing abstract creativity with informational clarity. Use data-driven layouts and interactive components that invite user engagement. Blend art with functionality.`}
                      />
                    </AIAgentFolderGroup>
                  </div>
                </ChromeWindow>
              </div>
            </div>

            {/* Search Bar and Eternal Mode Button */}
            <div className="w-full max-w-4xl mx-auto mt-12 space-y-4">
              {/* Search Bar */}
              <div className="relative max-w-3xl mx-auto">
                <input
                  type="text"
                  placeholder="⌗ trace anomalies in recursive corridors — beware the echo"
                  className="w-9/12 bg-[hsl(var(--cli-bg-secondary))] border border-terminal-pink px-4 py-3 text-terminal-white font-mono text-sm placeholder:text-terminal-gray focus:outline-none focus:ring-2 focus:ring-terminal-pink focus:border-transparent animate-fade-in hover-scale transition-all"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const searchTerm = (e.target as HTMLInputElement).value;
                      if (searchTerm) {
                        // Use modern search functionality
                        const selection = window.getSelection();
                        selection?.removeAllRanges();
                        
                        // Try to find text on page
                        try {
                          document.designMode = 'on';
                          const found = (document as any).execCommand('findString', false, searchTerm);
                          document.designMode = 'off';
                          if (!found) {
                            alert(`"${searchTerm}" not found on this page.`);
                          }
                        } catch {
                          // Fallback for browsers that don't support execCommand
                          const textContent = document.body.innerText.toLowerCase();
                          if (textContent.includes(searchTerm.toLowerCase())) {
                            alert(`"${searchTerm}" found on page. Use Ctrl+F for precise location.`);
                          } else {
                            alert(`"${searchTerm}" not found on this page.`);
                          }
                        }
                      }
                    }
                  }}
                />
                <div className="absolute inset-0 pointer-events-none border border-terminal-pink animate-[glow_2s_ease-in-out_infinite] opacity-30"></div>
              </div>

              {/* Eternal Mode Button */}
              <div className="text-center">
                <button
                  onClick={() => window.location.href = '/eternal'}
                  className="bg-[hsl(var(--cli-bg-secondary))] border border-terminal-pink px-8 py-4 text-terminal-pink hover:bg-terminal-pink hover:text-background transition-all duration-300 font-mono text-sm animate-fade-in hover:shadow-[0_0_20px_hsl(var(--terminal-pink))] hover:animate-pulse"
                >
                  Activate SCII/Eternal Mode
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Warning */}
        {showWarnings && (
          <div className="text-center mt-12 pt-8 border-t border-cli-border animate-fade-in-lag">
            <p className="text-terminal-gray text-xs animate-flicker">
              WARNING: You are being monitored. Unauthorized access detected.
            </p>
            <p className="text-terminal-gray text-xs mt-1">
              Project Oblivia Experiment • STATUS: {' '}
              <GlitchText text="COMPROMISED" className="warning-text" intensity="high" />
            </p>
          </div>
        )}
        </div>
      </TerminalInterface>
    </>
  );
};

export default Index;
