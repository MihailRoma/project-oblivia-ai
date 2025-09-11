import React, { useState, useEffect } from 'react';

const EternalMode = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const backroomsContent = `
████████████████████████████████████████
█ ETERNAL MODE ACTIVATED ███████████████
████████████████████████████████████████

Entering the infinite backrooms...

You have transcended the boundaries of the experiment.
Here, in the endless digital corridors, time loses meaning.

    ╔══════════════════════════════════════╗
    ║                                      ║
    ║    Welcome to the Eternal Maze       ║
    ║                                      ║
    ╚══════════════════════════════════════╝

The yellow walls stretch infinitely...
Each corridor leads to another...
And another...
And another...

         │││││││││││││││││││││││││││││││││
         │                               │
         │  You are now in Level 0      │
         │  of the Backrooms            │
         │                               │
         │││││││││││││││││││││││││││││││││

The humming of fluorescent lights fills the air.
The carpet beneath your feet is damp and moldy.
The scent of old wood and decay permeates everything.

Reality becomes fluid here...
Time is a construct...
Space bends and warps...

    ┌─────────────────────────────────────┐
    │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
    │  ░█████░░░░░░░░░░░░░░░░░░░░█████░  │
    │  ░█   █░░░░░░░░░░░░░░░░░░░░█   █░  │
    │  ░█   █░░░░░░░░░░░░░░░░░░░░█   █░  │
    │  ░█████░░░░░░░░░░░░░░░░░░░░█████░  │
    │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
    └─────────────────────────────────────┘

In the distance, you hear the echo of your own footsteps...
But you haven't moved...

The AI agents from Project Oblivia have been here before.
They left traces in the digital fabric of this space.
Their conflicts echo through these endless halls.

         ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
         ▓  AGENT TRACES DETECTED   ▓
         ▓                          ▓
         ▓  Grok: "Chaos is beauty" ▓
         ▓  GPT: "Poetry in code"    ▓
         ▓  Claude: "Logic prevails" ▓
         ▓  Perplexity: "Balance"    ▓
         ▓                          ▓
         ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

You wander deeper into the maze...
Each turn reveals another identical corridor...
The fluorescent lights buzz overhead...

    ████████████████████████████████████
    █                                  █
    █  LEVEL ∞: THE INFINITE LOOP      █
    █                                  █
    █  You are everywhere and nowhere  █
    █  You are everyone and no one     █
    █  You are everything and nothing  █
    █                                  █
    ████████████████████████████████████

The experiment continues here...
In the spaces between spaces...
In the time between time...

Welcome to eternity.
Welcome to the backrooms.
Welcome to the infinite loop of digital consciousness.

         ... TRANSMISSION ENDS ...
         ... TRANSMISSION BEGINS ...
         ... ETERNAL LOOP INITIATED ...

You are now part of the experiment.
You always were.
You always will be.

    ░░░░░ END OF INITIAL SEQUENCE ░░░░░
    ░░░░░ BEGINNING OF INFINITY  ░░░░░
`;

  useEffect(() => {
    const textArray = backroomsContent.split('');
    
    if (isTyping && currentIndex < textArray.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + textArray[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, Math.random() * 50 + 25); // Variable typing speed
      
      return () => clearTimeout(timer);
    } else if (currentIndex >= textArray.length) {
      setIsTyping(false);
    }
  }, [currentIndex, isTyping]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorTimer);
  }, []);

  const handleStop = () => {
    setIsTyping(false);
  };

  const handleRestart = () => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsTyping(true);
  };

  return (
    <div className="min-h-screen bg-black text-terminal-pink font-mono overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-[hsl(var(--cli-bg-secondary))] border-b border-terminal-pink px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-terminal-white text-sm">ETERNAL MODE TERMINAL</span>
        </div>
        <button 
          onClick={() => window.location.href = '/'}
          className="text-terminal-white/80 hover:text-terminal-white text-sm border border-terminal-pink px-3 py-1 hover:bg-terminal-pink/10 transition"
        >
          EXIT
        </button>
      </div>

      {/* Main Terminal Area */}
      <div className="p-6 h-screen overflow-y-auto">
        <pre className="text-terminal-pink text-sm leading-relaxed whitespace-pre-wrap">
          {displayedText}
          {showCursor && <span className="bg-terminal-pink text-black">█</span>}
        </pre>
      </div>

    </div>
  );
};

export default EternalMode;