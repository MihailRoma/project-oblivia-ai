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
  content: string;
}

// Group context to ensure only one folder is open at a time
interface AIAgentFolderContext {
  openName: string | null;
  setOpenName: (name: string | null) => void;
}
const AIAgentFolderCtx = React.createContext<AIAgentFolderContext | null>(null);

export const AIAgentFolderGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openName, setOpenName] = React.useState<string | null>(null);
  return (
    <AIAgentFolderCtx.Provider value={{ openName, setOpenName }}>
      {children}
    </AIAgentFolderCtx.Provider>
  );
};

export const AIAgentFolder: React.FC<AIAgentFolderProps> = ({ name, content }) => {
  const ctx = React.useContext(AIAgentFolderCtx);
  const [localOpen, setLocalOpen] = React.useState(false);
  const isOpen = ctx ? ctx.openName === name : localOpen;

  const toggle = () => {
    if (ctx) {
      ctx.setOpenName(isOpen ? null : name);
    } else {
      setLocalOpen(!localOpen);
    }
  };

  return (
    <div className="mb-2">
      <div 
        className="flex items-center space-x-2 cursor-pointer hover:bg-terminal-pink/10 p-2 transition-colors"
        onClick={toggle}
      >
        <Folder className="text-terminal-amber" size={16} />
        <span className="text-terminal-white font-mono text-sm">{name}</span>
        <span className="text-terminal-gray text-xs">{isOpen ? '[-]' : '[+]'}</span>
      </div>
      {isOpen && (
        <div className="ml-6 mt-2 p-3 bg-[hsl(var(--cli-bg-primary))] border-l-2 border-terminal-pink animate-fade-in max-w-full overflow-hidden">
          <div className="flex items-start space-x-2 mb-2">
            <FileText className="text-terminal-green mt-1 flex-shrink-0" size={14} />
            <div className="min-w-0 flex-1">
              <p className="text-terminal-white text-xs leading-relaxed whitespace-pre-wrap break-words">{content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};