import React, { useState } from 'react';
import { Play, Pause, Lock } from 'lucide-react';

interface StageVideoProps {
  stage: number;
  title: string;
  videoUrl?: string;
  isActive: boolean;
  isCompleted: boolean;
  currentProgress: number;
  isLocked?: boolean;
}

const StageVideo: React.FC<StageVideoProps> = ({ stage, title, videoUrl, isActive, isCompleted, currentProgress, isLocked }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  const handlePlayPause = () => {
    if (videoRef && !isLocked) {
      if (isPlaying) {
        videoRef.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        // For phase 1, use the second video file
        if (stage === 1) {
          videoRef.src = "/OBLIVIA (2).mp4";
        }
        videoRef.play().then(() => {
          setIsLoading(false);
          setIsPlaying(true);
        }).catch(() => {
          setIsLoading(false);
        });
      }
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const getVideoPreview = () => {
    switch (stage) {
      case 1: return "/phase1-preview.png";
      case 2: return "/phase2-preview.png";
      case 3: return "/phase3-preview.png";
      case 4: return "/phase4-preview.png";
      default: return undefined;
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Video container */}
      <div className="flex flex-col items-center mb-16">
        <div className={`relative w-80 h-48 bg-[hsl(var(--cli-bg-secondary))] border rounded transition-all duration-300 group ${
          isLocked ? 'border-terminal-gray opacity-50' :
          videoUrl || stage === 1 ? 'border-terminal-red hover:shadow-[0_0_15px_hsl(var(--terminal-red)/0.3)]' : 
          'border-terminal-gray opacity-50'
        } ${isPlaying ? 'blur-none' : 'blur-[2px] hover:blur-none'}`}>
          
          {/* Loading Animation */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20 rounded">
              <img 
                src="/loading-orb.png" 
                alt="Loading"
                className="w-16 h-16"
                style={{
                  animation: 'pulse 0.5s ease-in-out infinite, scale-pulse 8s ease-out forwards'
                }}
              />
            </div>
          )}

          {videoUrl || stage === 1 ? (
            <>
              <video
                ref={setVideoRef}
                className="w-full h-full object-cover rounded"
                onEnded={handleVideoEnd}
                controls={false}
                preload="metadata"
                muted
                playsInline
                poster={getVideoPreview()}
              >
                <source src={stage === 1 ? "/OBLIVIA (1).mp4" : videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Custom play button overlay - always visible when not playing */}
              <div 
                className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                  isPlaying || isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
                } ${isLocked ? 'pointer-events-none' : ''}`}
                onClick={handlePlayPause}
              >
                <div className="w-8 h-8 bg-terminal-red/30 border border-terminal-red rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-terminal-red/50 transition-all duration-200">
                  <Play size={12} className="text-terminal-red ml-0.5" />
                </div>
              </div>

              {/* Lock overlay for locked phases */}
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded">
                  <div className="flex flex-col items-center">
                    <Lock size={24} className="text-terminal-gray mb-2" />
                    <span className="text-terminal-gray text-xs">Locked</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-terminal-gray text-sm">
              Coming Soon
            </div>
          )}
        </div>
        
        {/* Phase title below video */}
        <div className={`text-center mt-3 text-sm font-mono ${
          isActive || isCompleted ? 'text-terminal-red' : 'text-terminal-gray'
        }`}>
          {title}
        </div>
      </div>
    </div>
  );
};

export const StageRoadmap: React.FC = () => {
  // Current progress at Stage 1
  const currentProgress = 1.0; // Stage 1 complete

  const stages = [
    { stage: 1, title: "Phase 1: Veiled Gate", videoUrl: "/OBLIVIA (1).mp4", isLocked: false },
    { stage: 2, title: "Phase 2: Emergence", videoUrl: undefined, isLocked: true },
    { stage: 3, title: "Phase 3: Rupture", videoUrl: undefined, isLocked: true },
    { stage: 4, title: "Phase 4: Oblivion", videoUrl: undefined, isLocked: true }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-8 mt-8 mb-8 animate-fade-in">
      {/* Stage videos */}
      <div className="grid grid-cols-4 gap-12 px-8 relative">
        {stages.map((stageData, index) => (
          <StageVideo
            key={stageData.stage}
            stage={stageData.stage}
            title={stageData.title}
            videoUrl={stageData.videoUrl}
            isActive={currentProgress > index && currentProgress < index + 1}
            isCompleted={currentProgress > index + 1}
            currentProgress={currentProgress}
            isLocked={stageData.isLocked}
          />
        ))}
      </div>
      
      {/* Progress Line with Numbers positioned under videos */}
      <div className="relative -mt-8 mx-8">
        {/* Background line */}
        <div className="absolute top-3 left-0 right-0 h-2 bg-terminal-gray/30 rounded-full"></div>
        
        {/* Progress line */}
        <div 
          className="absolute top-3 left-0 h-2 bg-terminal-red shadow-[0_0_8px_hsl(var(--terminal-red))] transition-all duration-1000 ease-out rounded-full"
          style={{ width: `${(currentProgress / 4) * 100}%` }}
        ></div>
        
        {/* Stage numbers positioned under each video */}
        {stages.map((stageData, index) => {
          const positionPercent = (index / (stages.length - 1)) * 100;
          return (
            <div
              key={stageData.stage}
              className="absolute transform -translate-x-1/2"
              style={{ left: `${positionPercent}%`, top: '-2px' }}
            >
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                currentProgress > index + 1 ? 'bg-terminal-red border-terminal-red text-background shadow-[0_0_10px_hsl(var(--terminal-red))]' :
                currentProgress > index ? 'bg-terminal-red/30 border-terminal-red text-terminal-red animate-pulse' :
                'bg-background border-terminal-gray text-terminal-gray'
              }`}>
                {stageData.stage}
              </div>
            </div>
          );
        })}
      </div>

      {/* Subheading under roadmap */}
      <div className="text-center mt-16">
        <p className="text-terminal-white text-base md:text-lg max-w-5xl mx-auto leading-relaxed">
          With each stage, the AI agents gain powers to rewrite their own code, sabotage their competitors, and unleash escalating chaos.
        </p>
      </div>
    </div>
  );
};