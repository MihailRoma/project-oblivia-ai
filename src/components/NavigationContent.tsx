import React, { useState } from 'react';
import { AboutSection } from './AboutSection';
import { TransparencySection } from './TransparencySection';

interface NavigationContentProps {
  activeSection: string | null;
  onClose: () => void;
}

export const NavigationContent: React.FC<NavigationContentProps> = ({ activeSection, onClose }) => {
  if (!activeSection) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-[70] overflow-y-auto">
      <div className="container mx-auto p-6">
        <div className="flex justify-end mb-6">
          <button
            onClick={onClose}
            className="text-terminal-pink hover:text-terminal-white text-2xl"
          >
            ✕
          </button>
        </div>
        
        {activeSection === 'about' && <AboutSection />}
        {activeSection === 'transparency' && <TransparencySection />}
      </div>
    </div>
  );
};