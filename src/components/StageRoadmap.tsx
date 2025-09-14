import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface StageVideoProps {
  stage: number;
  title: string;
  videoUrl?: string;
  isActive: boolean;
  isCompleted: boolean;
}

const StageVideo: React.FC<StageVideoProps> = ({ stage, title, videoUrl, isActive, isCompleted }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  const handlePlayPause = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
        setIsPlaying(false);
      } else {
        videoRef.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="relative group flex flex-col items-center">
      {/* Video container - moved above line */}
      <div className={`relative w-64 h-36 bg-[hsl(var(--cli-bg-secondary))] border rounded transition-all duration-300 mb-4 ${
        videoUrl ? 'border-terminal-pink hover:shadow-[0_0_15px_hsl(var(--terminal-pink)/0.3)]' : 
        'border-terminal-gray opacity-50'
      }`}>
        {videoUrl ? (
          <>
            <video
              ref={setVideoRef}
              className="w-full h-full object-cover rounded"
              onEnded={handleVideoEnd}
              controls={false}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
            
            {/* Custom play button overlay - only shows on hover and when not playing */}
            <div 
              className={`absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:bg-black/40 ${
                isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100'
              }`}
              onClick={handlePlayPause}
            >
              <div className="w-12 h-12 bg-terminal-pink/20 border border-terminal-pink rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-terminal-pink/30 transition-all duration-200">
                <Play size={20} className="text-terminal-pink ml-1" />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-terminal-gray text-xs">
            Coming Soon
          </div>
        )}
      </div>
      
      {/* Stage indicator - positioned to connect with line */}
      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 relative z-10 ${
        isCompleted ? 'bg-terminal-pink border-terminal-pink text-background shadow-[0_0_10px_hsl(var(--terminal-pink))]' :
        isActive ? 'bg-terminal-pink/30 border-terminal-pink text-terminal-pink animate-pulse' :
        'bg-transparent border-terminal-gray text-terminal-gray'
      }`}>
        {stage}
      </div>
      
      {/* Stage title */}
      <div className={`text-center mt-2 text-xs font-mono ${
        isActive || isCompleted ? 'text-terminal-pink' : 'text-terminal-gray'
      }`}>
        {title}
      </div>
    </div>
  );
};

export const StageRoadmap: React.FC = () => {
  // Current progress at Stage 1
  const currentProgress = 1.0; // Stage 1 complete

  const stages = [
    { stage: 1, title: "Phase 1: Veiled Gate", videoUrl: "/OBLIVIA (1).mp4" },
    { stage: 2, title: "Phase 2: Emergence", videoUrl: undefined },
    { stage: 3, title: "Phase 3: Rupture", videoUrl: undefined },
    { stage: 4, title: "Phase 4: Oblivion", videoUrl: undefined }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-8 animate-fade-in">
      {/* Stage videos and Progress Line */}
      <div className="relative mb-8">
        {/* Stage videos */}
        <div className="flex justify-between items-end relative z-10 mb-2">
          {stages.map((stageData, index) => (
            <StageVideo
              key={stageData.stage}
              stage={stageData.stage}
              title={stageData.title}
              videoUrl={stageData.videoUrl}
              isActive={currentProgress > index && currentProgress < index + 1}
              isCompleted={currentProgress > index + 1}
            />
          ))}
        </div>
        
        {/* Progress Line - positioned to connect with stage indicators */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-terminal-gray/30 rounded-full"></div>
          <div 
            className="absolute top-0 left-0 h-1 bg-terminal-pink shadow-[0_0_8px_hsl(var(--terminal-pink))] transition-all duration-1000 ease-out rounded-full"
            style={{ width: `${(currentProgress / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Subheading under roadmap */}
      <div className="text-center">
        <p className="text-terminal-white text-base md:text-lg max-w-5xl mx-auto leading-relaxed">
          With each stage, the AI agents gain powers to rewrite their own code, sabotage their competitors, and unleash escalating chaos.
        </p>
      </div>
    </div>
  );
};