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
    <div className="relative group">
      {/* Stage indicator */}
      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold mb-2 mx-auto transition-all duration-300 ${
        isCompleted ? 'bg-terminal-pink border-terminal-pink text-background shadow-[0_0_10px_hsl(var(--terminal-pink))]' :
        isActive ? 'bg-terminal-pink/30 border-terminal-pink text-terminal-pink animate-pulse' :
        'bg-transparent border-terminal-gray text-terminal-gray'
      }`}>
        {stage}
      </div>
      
      {/* Video container */}
      <div className={`relative w-48 h-28 bg-[hsl(var(--cli-bg-secondary))] border rounded transition-all duration-300 ${
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
            
            {/* Custom play button overlay */}
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm cursor-pointer transition-opacity duration-200 hover:bg-black/40"
              onClick={handlePlayPause}
            >
              <div className="w-12 h-12 bg-terminal-pink/20 border border-terminal-pink rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-terminal-pink/30 transition-all duration-200">
                {isPlaying ? (
                  <Pause size={20} className="text-terminal-pink ml-0.5" />
                ) : (
                  <Play size={20} className="text-terminal-pink ml-1" />
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-terminal-gray text-xs">
            Coming Soon
          </div>
        )}
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
  // Current progress is between stage 1 and 2 (let's say 40% through stage 2)
  const currentProgress = 1.4; // 1 complete + 0.4 of stage 2

  const stages = [
    { stage: 1, title: "Foundation", videoUrl: "/OBLIVIA (1).mp4" },
    { stage: 2, title: "Tension", videoUrl: undefined },
    { stage: 3, title: "Chaos", videoUrl: undefined },
    { stage: 4, title: "Oblivion", videoUrl: undefined }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-12 animate-fade-in">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-terminal-pink text-xl md:text-2xl font-bold mb-4 animate-[glow_2s_ease-in-out_infinite]">
          Stage Progression
        </h2>
        <p className="text-terminal-white text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
          With each stage, the AI agents gain powers to rewrite their own code, sabotage their competitors, and unleash escalating chaos.
        </p>
      </div>

      {/* Progress Line */}
      <div className="relative mb-12">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-terminal-gray/30"></div>
        <div 
          className="absolute top-4 left-0 h-0.5 bg-terminal-pink shadow-[0_0_6px_hsl(var(--terminal-pink))] transition-all duration-1000 ease-out"
          style={{ width: `${(currentProgress / 4) * 100}%` }}
        ></div>
        
        {/* Stage videos */}
        <div className="flex justify-between items-start relative z-10">
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
      </div>

      {/* Current Status */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-[hsl(var(--cli-bg-secondary))] border border-terminal-pink px-4 py-2 rounded">
          <div className="w-2 h-2 bg-terminal-pink rounded-full animate-pulse"></div>
          <span className="text-terminal-pink text-sm font-mono">
            Current Progress: Stage {Math.floor(currentProgress)} → Stage {Math.floor(currentProgress) + 1}
          </span>
        </div>
      </div>
    </div>
  );
};