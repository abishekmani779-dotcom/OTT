"use client";

import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { usePrivy } from "@privy-io/react-auth";
import { Loader2, Plus, Check } from "lucide-react";
import Player from "video.js/dist/types/player";

export function VideoPlayer({ options }: { options: any }) {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  
  const [watchPercentage, setWatchPercentage] = useState(0);
  const [claimState, setClaimState] = useState<"hidden" | "available" | "minting" | "claimed">("hidden");
  const { authenticated, login } = usePrivy();

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
      });

      player.on('timeupdate', () => {
        const current = player.currentTime() || 0;
        const duration = player.duration() || 0;
        // Fallback for short demo videos where division might act funky, trigger at 80%
        if (duration > 0) {
          const percentage = (current / duration) * 100;
          setWatchPercentage(percentage || 0);
          
          if (percentage >= 80 && claimState === "hidden") {
            setClaimState("available");
          }
        }
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [options, claimState]);

  const handleClaim = () => {
    if (!authenticated) {
      login();
      return;
    }
    
    setClaimState("minting");
    // Simulate minting delay
    setTimeout(() => {
      setClaimState("claimed");
    }, 3000);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden bg-black shadow-2xl transition-all duration-700 my-16 group/player">
      {/* 80% Watch Time Blue Border Pulse Component Wrapper */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 z-10 rounded-3xl
        ${watchPercentage >= 80 ? 'border-[3px] border-primary-blue shadow-[inset_0_0_80px_rgba(24,99,225,0.4)] animate-pulse' : 'border border-deep-grey'}`} 
      />
      
      <div data-vjs-player ref={videoRef} className="w-full aspect-video rounded-3xl overflow-hidden [&>div]:w-full [&>div]:h-full" />

      {/* Slide-in 'Claim Your Stake' Button */}
      {claimState !== "hidden" && (
        <div className="absolute bottom-16 right-8 z-30 flex flex-col items-end animate-[slideIn_0.5s_ease-out_forwards]">
          {claimState === "available" && (
            <button 
              onClick={handleClaim}
              className="relative overflow-hidden h-14 px-8 rounded-full bg-primary-blue text-white font-bold tracking-wide shadow-blue-glow hover:scale-[1.03] transition-transform flex items-center gap-2 group cursor-pointer"
            >
              {/* Shimmer effect inside the button */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <Plus className="w-5 h-5" />
              Claim Your Stake
            </button>
          )}

          {claimState === "minting" && (
            <div className="h-14 px-8 border border-primary-blue/30 rounded-full bg-black/80 backdrop-blur-md text-primary-blue font-bold tracking-wide flex items-center justify-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="animate-pulse">Minting on Base...</span>
            </div>
          )}

          {claimState === "claimed" && (
            <div className="h-14 px-8 border border-[#10B981]/30 rounded-full bg-black/90 backdrop-blur-xl text-[#34D399] font-bold tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center justify-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-[#34D399]" />
              </div>
              Co-Producer Status Unlocked
            </div>
          )}
        </div>
      )}
    </div>
  );
}
