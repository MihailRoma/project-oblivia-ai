import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  className = '', 
  intensity = 'medium' 
}) => {
  const glitchClasses = {
    low: 'animate-pulse',
    medium: 'glitch-text',
    high: 'glitch-text animate-glitch'
  };

  return (
    <span 
      className={`${glitchClasses[intensity]} ${className}`}
      data-text={text}
    >
      {text}
    </span>
  );
};