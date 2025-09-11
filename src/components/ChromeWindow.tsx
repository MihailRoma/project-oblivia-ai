import React from 'react';
import { Folder, FileText } from 'lucide-react';

interface ChromeWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const ChromeWindow: React.FC<ChromeWindowProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-[hsl(var(--cli-bg-secondary))] border border-cli-border rounded-none ${className}`}>
      {/* Window Header */}
      <div className="bg-[hsl(var(--cli-bg-primary))] border-b border-cli-border px-3 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-terminal-white text-sm font-mono ml-4">{title}</span>
        </div>
      </div>
      {/* Window Content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

interface AIAgentFolderProps {
  name: string;
  goal: string;
  personality: string;
}

export const AIAgentFolder: React.FC<AIAgentFolderProps> = ({ name, goal, personality }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="mb-4">
      <div 
        className="flex items-center space-x-2 cursor-pointer hover:bg-terminal-pink/10 p-2 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Folder className="text-terminal-amber" size={16} />
        <span className="text-terminal-white font-mono text-sm">{name}</span>
        <span className="text-terminal-gray text-xs">{isOpen ? '[-]' : '[+]'}</span>
      </div>
      {isOpen && (
        <div className="ml-6 mt-2 p-3 bg-[hsl(var(--cli-bg-primary))] border-l-2 border-terminal-pink animate-fade-in">
          <div className="flex items-start space-x-2 mb-2">
            <FileText className="text-terminal-green mt-1" size={14} />
            <div>
              <div className="text-terminal-green text-xs font-mono mb-1">Goal:</div>
              <p className="text-terminal-white text-xs leading-relaxed mb-3">{goal}</p>
              <div className="text-terminal-green text-xs font-mono mb-1">Personality:</div>
              <p className="text-terminal-white text-xs leading-relaxed">{personality}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};