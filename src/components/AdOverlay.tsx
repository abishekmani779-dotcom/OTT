"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight } from "lucide-react";

interface AdOverlayProps {
  isVisible: boolean;
  onSkip: () => void;
}

export function AdOverlay({ isVisible, onSkip }: AdOverlayProps) {
  const [countdown, setCountdown] = useState(5);
  const [canSkip, setCanSkip] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let adCompletionTimer: NodeJS.Timeout;
    let timer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    if (isVisible) {
      // Only reset these if we haven't started yet to prevent flickering/restarting
      // when the parent re-renders and the effect re-runs.
      setCountdown(5);
      setCanSkip(false);
      setProgress(0);
      setHasStarted(false);
      
      const playVideo = async () => {
        if (videoRef.current) {
          try {
            // Force start from beginning
            videoRef.current.currentTime = 0;
            await videoRef.current.play();
            setHasStarted(true);
          } catch (err) {
            console.error("Ad video play failed:", err);
            setHasStarted(true); 
          }
        }
      };

      playVideo();

      // Overall ad completion timer (15 seconds total)
      adCompletionTimer = setTimeout(() => {
        onSkip();
      }, 15000);

      // Countdown logic
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanSkip(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Progress bar logic (15 seconds total)
      const startTime = Date.now();
      const duration = 15000;
      progressTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);
        if (newProgress >= 100) {
          clearInterval(progressTimer);
        }
      }, 50);

      return () => {
        clearTimeout(adCompletionTimer);
        if (timer) clearInterval(timer);
        if (progressTimer) clearInterval(progressTimer);
      };
    }
  }, [isVisible, onSkip]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="ad-overlay"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 z-[500] bg-black border border-white/10 flex flex-col justify-between overflow-hidden cursor-default pointer-events-auto"
          style={{ fontFamily: "'Figtree', sans-serif", fontWeight: 700 }}
        >
          {/* Ad Video Content - Higher z to override any background leakage */}
          <div className="absolute inset-0 z-0 bg-black flex items-center justify-center">
             <video 
               ref={videoRef}
               src="/shorts/iphone.mp4" 
               className={`w-full h-full object-cover transition-opacity duration-1000 ${hasStarted ? 'opacity-100' : 'opacity-0'}`} 
               muted={false} 
               loop 
               playsInline
             />
             {!hasStarted && (
               <div className="flex flex-col items-center gap-4 relative z-10">
                 <div className="w-12 h-12 border-4 border-[#1863E1]/20 border-t-[#1863E1] rounded-full animate-spin" />
                 <span className="text-white/40 text-sm animate-pulse">Loading Ad Intelligence...</span>
               </div>
             )}
             {/* Overlay for text readability */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/60 z-[1]" />
          </div>

          {/* Top Info (Optional, but makes it look real) */}
          <div className="relative z-10 p-6 flex justify-between items-start">
            <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10 flex items-center gap-2">
              <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Ad</span>
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <span className="text-white/80 text-xs">Video will resume after ad</span>
            </div>
          </div>

          <div className="flex-grow z-10" />

          {/* Bottom Section */}
          <div className="relative z-10 p-6 flex items-end justify-between w-full mb-4">
            {/* Banner Link */}
            <motion.a 
              href="https://apple.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center gap-3 hover:bg-black/80 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1863E1] flex items-center justify-center shadow-[0_0_15px_rgba(24,99,225,0.4)]">
                <ExternalLink className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-bold">Visit Apple</span>
                <span className="text-white/40 text-[10px] uppercase font-bold tracking-tight">sponsored</span>
              </div>
            </motion.a>

            {/* Countdown / Skip Button */}
            <motion.button
              onClick={() => canSkip && onSkip()}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              disabled={!canSkip}
              className={`min-w-[140px] h-12 px-6 rounded-lg flex items-center justify-center gap-2 transition-all font-bold tracking-wide
                ${canSkip 
                  ? 'bg-black/80 border border-white/20 text-white hover:bg-white hover:text-black cursor-pointer' 
                  : 'bg-black/40 border border-white/5 text-white/40 cursor-not-allowed'}`}
            >
              {canSkip ? (
                <>
                  <span>Skip Ad</span>
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                <span>Skip Ad in {countdown}</span>
              )}
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 overflow-hidden z-20">
            <motion.div 
              className="h-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]"
              style={{ width: `${progress}%` }}
              layoutId="ad-progress"
            />
          </div>

          {/* Background Shimmer (Premium Effect, subtle overlay) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
             <div className="absolute -inset-[100%] bg-gradient-to-tr from-[#1863E1]/5 via-transparent to-yellow-400/5 opacity-30" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
