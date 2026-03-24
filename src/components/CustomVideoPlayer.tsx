"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Settings, 
  PictureInPicture, 
  MonitorPlay,
  LineChart,
  Gift
} from "lucide-react";
import { motion } from "framer-motion";
import { MovieTokenChart } from "./MovieTokenChart";
import { AirdropDrawer } from "./AirdropDrawer";
import { AdOverlay } from "./AdOverlay";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MILESTONES = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export function CustomVideoPlayer({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isHoveringSeek, setIsHoveringSeek] = useState(false);
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [isAirdropOpen, setIsAirdropOpen] = useState(false);
  const [isPiP, setIsPiP] = useState(false);
  const [pipError, setPipError] = useState<string | null>(null);
  const [unlockedMilestones, setUnlockedMilestones] = useState<number[]>([]);
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [adMilestonesReached, setAdMilestonesReached] = useState<number[]>([]);
  
  // Load persistence
  useEffect(() => {
    const saved = localStorage.getItem('unlocked_milestones');
    if (saved) {
      try {
        setUnlockedMilestones(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load milestones", e);
      }
    }
  }, []);

  // Save persistence
  useEffect(() => {
    localStorage.setItem('unlocked_milestones', JSON.stringify(unlockedMilestones));
  }, [unlockedMilestones]);

  // Handle Ad Playback state sync
  useEffect(() => {
    if (isAdPlaying && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isAdPlaying]);
  
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetIdleTimer = () => {
      setShowControls(true);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', resetIdleTimer);
      container.addEventListener('mouseleave', () => setShowControls(false));
      container.addEventListener('mouseenter', resetIdleTimer);
    }
    
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (container) {
        container.removeEventListener('mousemove', resetIdleTimer);
        container.removeEventListener('mouseleave', () => setShowControls(false));
        container.removeEventListener('mouseenter', resetIdleTimer);
      }
    };
  }, [isPlaying]);

  // Sync PiP state with browser events (covers user closing PiP from the floating window)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onEnterPiP = () => setIsPiP(true);
    const onLeavePiP = () => setIsPiP(false);
    video.addEventListener('enterpictureinpicture', onEnterPiP);
    video.addEventListener('leavepictureinpicture', onLeavePiP);
    return () => {
      video.removeEventListener('enterpictureinpicture', onEnterPiP);
      video.removeEventListener('leavepictureinpicture', onLeavePiP);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isAdPlaying) return; // Prevent playing during ads
      
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const togglePiP = async () => {
    const video = videoRef.current;
    if (!video) return;

    // Browser support check
    if (!document.pictureInPictureEnabled || video.disablePictureInPicture) {
      setPipError('PiP not supported in this browser');
      setTimeout(() => setPipError(null), 3000);
      return;
    }

    try {
      if (document.pictureInPictureElement) {
        // Exit PiP
        await document.exitPictureInPicture();
      } else {
        // Browsers require video to be playing (and ideally unmuted) for PiP
        if (video.paused) {
          await video.play();
          setIsPlaying(true);
        }
        // Unmute so PiP audio works (user can re-mute after)
        if (video.muted) {
          video.muted = false;
          setIsMuted(false);
        }
        await video.requestPictureInPicture();
      }
      setPipError(null);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'PiP failed';
      console.error('PiP failed:', msg);
      setPipError('PiP unavailable: ' + msg.slice(0, 60));
      setTimeout(() => setPipError(null), 4000);
    }
  };

  const onAdSkip = React.useCallback(() => {
    setIsAdPlaying(false);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && !isAdPlaying) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      const progress = (current / total) * 100;
      
      setCurrentTime(current);

      // Milestone Logic
      MILESTONES.forEach(m => {
        if (progress >= m && !unlockedMilestones.includes(m)) {
          setUnlockedMilestones(prev => [...prev, m]);
          toast.info(`New Airdrop Unlocked! Click the Vault at ${m}% to Open.`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              background: "#0A0A0B",
              color: "#FFF",
              border: "1px solid #1863E1",
              fontFamily: "Figtree"
            }
          });
        }
      });

      // Mid-Roll Ad Simulation at exactly 20% and 50%
      const adMilestones = [20, 50];
      
      adMilestones.forEach(m => {
        if (progress >= m && !adMilestonesReached.includes(m)) {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
            setIsAdPlaying(true);
            setAdMilestonesReached(prev => [...prev, m]);
          }
        }
      });
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  // Chapter markers randomly placed for demo
  const chapterMarkers = [10, 25, 45, 60, 80];

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-black group flex-shrink-0"
    >
      <motion.div 
        animate={{ 
          scale: isAdPlaying ? 0.95 : 1,
          filter: isAdPlaying ? "blur(10px)" : "blur(0px)",
          opacity: isAdPlaying ? 0.5 : 1
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full h-full"
      >
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Top Left Icons (Navigation Bar) */}
      <div 
         className={`absolute top-4 left-4 z-40 bg-[#161619]/90 backdrop-blur-md border border-white/5 rounded-2xl flex flex-col items-center py-2 px-1.5 gap-4 transition-all duration-300 ${!isAdPlaying && (showControls || !isPlaying) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
          <button className="p-2.5 rounded-xl bg-[#0A0A0A] border border-white/5 shadow-inner transition-colors">
              <MonitorPlay className="w-5 h-5 text-white" />
          </button>
          <button onClick={() => {
              // Pause video when chart opens
              if (videoRef.current && !videoRef.current.paused) {
                videoRef.current.pause();
                setIsPlaying(false);
              }
              setIsChartOpen(true);
          }} className="p-2.5 rounded-xl hover:bg-white/5 transition-colors group/icon">
              <LineChart className="w-5 h-5 text-white/40 group-hover/icon:text-white/80 transition-colors" />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-white/5 transition-colors group/icon"
            onClick={() => {
              if (videoRef.current && !videoRef.current.paused) {
                videoRef.current.pause();
                setIsPlaying(false);
              }
              setIsAirdropOpen(true);
            }}
          >
              <Gift className={`w-5 h-5 transition-colors ${isAirdropOpen ? 'text-[#1863E1]' : 'text-white/40 group-hover/icon:text-white/80'}`} />
          </button>
      </div>

      {/* Controller Overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-16 pb-4 px-6 transition-all duration-300 flex flex-col gap-3 ${!isAdPlaying && (showControls || !isPlaying) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Top-level Seek Bar */}
        <div 
          className="relative w-full flex items-center group/seek cursor-pointer"
          onMouseEnter={() => setIsHoveringSeek(true)}
          onMouseLeave={() => setIsHoveringSeek(false)}
        >
          {/* Track Background */}
          <div className={`absolute w-full bg-white/20 rounded-full transition-all duration-300 ${isHoveringSeek ? 'h-2' : 'h-1'}`} />
          
          {/* Airdrop Vault Markers */}
          {MILESTONES.map(m => (
            <div 
              key={m}
              className="absolute z-30 -translate-x-1/2 pointer-events-none"
              style={{ left: `${m}%`, top: '-20px' }}
            >
              <div className={`p-1 rounded-full transition-all duration-500 scale-75
                ${progressPercentage >= m 
                  ? 'bg-[#1863E1] shadow-[0_0_15px_#1863E1] scale-100 animate-pulse' 
                  : 'bg-white/10 grayscale opacity-40'}`}
              >
                <Gift className="w-3 h-3 text-white" />
              </div>
            </div>
          ))}

          {/* Chapter Markers */}
          {chapterMarkers.map(marker => (
             <div 
               key={marker} 
               className={`absolute bg-black/60 w-[2px] transition-all duration-300 z-10 ${isHoveringSeek ? 'h-2' : 'h-1'}`}
               style={{ left: `${marker}%` }}
             />
          ))}

          {/* Progress Fill with Alpha Glow */}
          <div 
            className={`absolute bg-[#1863E1] rounded-full transition-all duration-300 pointer-events-none z-0 ${isHoveringSeek ? 'h-2' : 'h-1'} max-w-full`}
            style={{ 
              width: `${progressPercentage}%`,
              boxShadow: '0 0 12px 2px rgba(24,99,225,0.6)'
            }}
          />

          {/* Native Range Input (Hidden visual, used for interaction) */}
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="absolute w-full h-4 opacity-0 cursor-pointer z-20"
          />

          {/* Scrubber Circle */}
          <div 
             className={`absolute w-3.5 h-3.5 bg-white rounded-full z-10 pointer-events-none transition-all duration-200 ${isHoveringSeek ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
             style={{ 
                left: `calc(${progressPercentage}% - 7px)`,
                boxShadow: '0 0 5px rgba(0,0,0,0.5)'
             }}
          />
        </div>

        {/* Lower Controls Row */}
        <div className="flex items-center justify-between w-full select-none mt-1">
          {/* Left Controls */}
          <div className="flex items-center gap-5">
            <button onClick={togglePlay} className="text-white hover:text-[#1863E1] transition-colors focus:outline-none group/icon">
              {isPlaying ? (
                <Pause className="w-6 h-6 stroke-[1.5px] fill-current" />
              ) : (
                <Play className="w-6 h-6 stroke-[1.5px] fill-current" />
              )}
            </button>
            <button onClick={toggleMute} className="text-white hover:text-[#1863E1] transition-colors focus:outline-none group/icon">
              {isMuted ? (
                <VolumeX className="w-6 h-6 stroke-[1.5px]" />
              ) : (
                <Volume2 className="w-6 h-6 stroke-[1.5px]" />
              )}
            </button>
            
            <div className="text-white/90 text-[14px] font-medium tracking-wide ml-2" style={{ fontFamily: 'Figtree, sans-serif' }}>
              {formatTime(currentTime)} <span className="text-white/50 mx-1">/</span> {formatTime(duration)}
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-6">
            

            {/* Settings (HD) */}
            <button className="relative text-white hover:text-[#1863E1] transition-colors focus:outline-none group/settings">
              <Settings className="w-6 h-6 stroke-[1.5px]" />
              <span 
                className="absolute -top-1.5 -right-2 bg-red-600 border border-black text-white text-[8px] font-bold px-1 py-0.5 rounded shadow-sm leading-none"
                style={{ fontFamily: 'Figtree, sans-serif' }}
              >
                HD
              </span>
            </button>

            {/* Picture-in-Picture */}
            <button
              onClick={togglePiP}
              title={isPiP ? 'Exit Picture-in-Picture' : 'Picture-in-Picture'}
              className={`transition-colors focus:outline-none ${isPiP ? 'text-[#1863E1]' : 'text-white hover:text-[#1863E1]'}`}
            >
              <PictureInPicture className="w-6 h-6 stroke-[1.5px]" />
            </button>

            {/* Fullscreen */}
            <button onClick={toggleFullscreen} className="text-white hover:text-[#1863E1] transition-colors focus:outline-none">
              {isFullscreen ? (
                <Minimize className="w-6 h-6 stroke-[1.5px]" />
              ) : (
                <Maximize className="w-6 h-6 stroke-[1.5px]" />
              )}
            </button>

          </div>
        </div>
      </div>

      {/* DEBUG: Temporary Trigger Ad Button - Remove after testing */}
      <button 
        onClick={() => !isAdPlaying && setIsAdPlaying(true)}
        className={`absolute top-20 right-4 z-[60] bg-red-600/20 hover:bg-red-600/40 border border-red-600/50 text-red-500 text-[10px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md transition-opacity ${!isAdPlaying ? 'group-hover:opacity-100 opacity-0' : 'opacity-0 pointer-events-none'}`}
      >
        DEBUG: Trigger Ad
      </button>

      <MovieTokenChart
        isOpen={isChartOpen}
        onClose={() => {
          setIsChartOpen(false);
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
          }
        }}
      />

      <AirdropDrawer
        isOpen={isAirdropOpen}
        watchProgress={Math.round(progressPercentage)}
        unlockedMilestones={unlockedMilestones}
        onClose={() => {
          setIsAirdropOpen(false);
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
          }
        }}
      />

      <AdOverlay 
        isVisible={isAdPlaying} 
        onSkip={onAdSkip}
      />

      {/* PiP Error Toast */}
      {pipError && (
        <div
          className="absolute top-4 right-4 z-50 bg-[#1A1A1A] border border-red-500/30 text-red-400 text-[11px] font-semibold px-4 py-2 rounded-xl shadow-lg backdrop-blur-sm animate-fade-in"
          style={{ fontFamily: 'Figtree, sans-serif' }}
        >
          {pipError}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
