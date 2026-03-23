"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Diamond, 
  MessageSquare, 
  Share2, 
  TrendingUp, 
  ArrowUpRight,
  Play,
  Volume2,
  VolumeX
} from 'lucide-react';
import Link from 'next/link';



// --- Mock Data ---
const SHORTS_DATA = [
  {
    id: 1,
    videoUrl: '/shorts/lockdown.mp4',
    title: 'Lockdown: Exclusive',
    author: 'Alpha Studios',
    likes: '1.2M',
    comments: '45K',
    shares: '12K',
    tokenPrice: '$1.45',
    burnStatus: '45%'
  },
  {
    id: 2,
    videoUrl: '/shorts/naaisekar.mp4',
    title: 'Naai Sekar Returns',
    author: 'Lyca Productions',
    likes: '850K',
    comments: '28K',
    shares: '8K',
    tokenPrice: '$0.92',
    burnStatus: '62%'
  },
  {
    id: 3,
    videoUrl: '/shorts/neelothi.mp4',
    title: 'Neelothi: Sirai',
    author: 'Vikram Prabhu',
    likes: '2.4M',
    comments: '115K',
    shares: '42K',
    tokenPrice: '$2.15',
    burnStatus: '35%'
  }
];

// --- Components ---

function Hexagon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path 
        d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" 
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function HexBoltAnimation({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
      transition={{ duration: 0.8, times: [0, 0.2, 1], ease: "easeOut" }}
      onAnimationComplete={onComplete}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-[60]"
    >
      <div className="relative">
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 0.8, ease: "linear" }}
           className="relative"
        >
          <Hexagon className="w-32 h-32 text-[#1863E1]/20 blur-sm" />
          <Hexagon className="absolute inset-0 w-32 h-32 text-[#1863E1]/40" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Diamond className="w-12 h-12 text-[#1863E1] fill-[#1863E1] drop-shadow-[0_0_20px_rgba(24,99,225,0.8)]" />
        </div>
      </div>
    </motion.div>
  );
}

function ProgressIndicator({ progress }: { progress: number }) {
  return (
    <div className="absolute top-0 left-0 w-full h-[3px] bg-white/5 z-50 overflow-hidden">
      <motion.div 
        className="h-full bg-[#1863E1] shadow-[0_0_15px_rgba(24,99,225,1)]"
        style={{ width: `${progress}%` }}
        animate={{ 
          filter: progress > 90 ? ["brightness(1)", "brightness(2)", "brightness(1)"] : "brightness(1)" 
        }}
        transition={{ duration: 0.5, repeat: progress > 90 ? Infinity : 0 }}
      />
    </div>
  );
}

function EngagementSidebar({ 
  likes, 
  comments, 
  onInvest
}: { 
  likes: string, 
  comments: string, 
  onInvest: () => void
}) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="absolute right-4 bottom-12 flex flex-col items-center gap-6 z-40">
      {/* Diamond Like */}
      <button onClick={handleLike} className="flex flex-col items-center gap-1 group active:scale-90 transition-transform">
        <div className={`p-3 rounded-full transition-all duration-300 ${liked ? 'bg-[#1863E1] shadow-[0_0_20px_rgba(24,99,225,0.5)]' : 'bg-white/5 backdrop-blur-md border border-white/10'}`}>
          <Diamond className={`w-6 h-6 transition-colors ${liked ? 'fill-white text-white scale-110' : 'text-white'}`} />
        </div>
        <span className="text-[10px] font-black text-white/80 tracking-tighter shadow-black drop-shadow-md">{likes}</span>
      </button>

      {/* Comments */}
      <div className="flex flex-col items-center gap-1 group cursor-pointer active:scale-90 transition-transform">
        <div className="p-3 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 transition-all">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <span className="text-[10px] font-black text-white/80 tracking-tighter shadow-black drop-shadow-md">{comments}</span>
      </div>

      {/* Share */}
      <div className="flex flex-col items-center gap-1 group cursor-pointer active:scale-90 transition-transform">
        <div className="p-3 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 transition-all">
          <Share2 className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Quick Invest Shortcut */}
      <button 
        onClick={onInvest}
        className="w-14 h-14 rounded-full bg-[#1863E1] shadow-[0_0_30px_rgba(24,99,225,0.6)] flex items-center justify-center group active:scale-95 transition-all border border-white/20 ring-4 ring-[#1863E1]/20 hover:ring-[#1863E1]/40"
      >
        <TrendingUp className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
}



function ShortsCard({ 
  data, 
  isActive, 
  isMuted,
  onInvest
}: { 
  data: typeof SHORTS_DATA[0], 
  isActive: boolean, 
  isMuted: boolean,
  onInvest: () => void
}) {
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showBolt, setShowBolt] = useState(false);

  useEffect(() => {
    if (isActive && videoRef.current) {
        videoRef.current.play();
    } else if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  const handleDoubleClick = () => {
    setShowBolt(true);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  return (
    <div 
      className="relative w-full h-full bg-black snap-start overflow-hidden"
      onDoubleClick={handleDoubleClick}
    >
      <AnimatePresence>
        {showBolt && <HexBoltAnimation onComplete={() => setShowBolt(false)} />}
      </AnimatePresence>


      {/* Video Content */}
      <video
        ref={videoRef}
        src={data.videoUrl}
        className="w-full h-full object-cover"
        loop
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

      <ProgressIndicator progress={progress} />

      {/* Top Branding */}
      <div className="absolute top-10 left-0 right-0 flex justify-center z-40 pointer-events-none">
        <h2 className="text-[#E5B80B] font-black text-xs tracking-[0.4em] uppercase drop-shadow-2xl" style={{ fontFamily: 'Figtree, sans-serif', textShadow: '0 0 20px rgba(229,184,11,0.5)' }}>
          {data.title}
        </h2>
      </div>



      {/* Bottom Info */}
      <div className="absolute bottom-12 left-6 right-20 z-40 pointer-events-none">
        <div className="flex items-center gap-2 mb-3">
           <div className="w-6 h-6 rounded-full bg-zinc-800 border border-white/10" />
           <span className="text-white font-black text-sm">@{data.author.replace(' ', '').toLowerCase()}</span>
           <span className="bg-[#1863E1]/20 text-[#1863E1] text-[8px] font-black px-2 py-0.5 rounded-full border border-[#1863E1]/30 uppercase tracking-widest">Producer</span>
        </div>
        <p className="text-white font-medium text-xs leading-relaxed max-w-[90%] drop-shadow-lg opacity-90">
           The next blue-chip cinema asset. Invest in {data.title} equity today and earn lifetime dividends. #OwnAlpha #BaseChain
        </p>
      </div>

      <EngagementSidebar 
        likes={data.likes} 
        comments={data.comments} 
        onInvest={onInvest} 
      />
    </div>
  );
}

export function ShortsPlayer({ onClose }: { onClose: () => void }) {
  const [isMuted, setIsMuted] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollTop / scrollRef.current.clientHeight);
      setActiveIndex(index);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">


      {/* Constraints for mobile-style vertical view on desktop */}
      <div className="relative w-full max-w-[450px] h-full bg-zinc-900 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Snap Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="w-full h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        >
          {SHORTS_DATA.map((short, i) => (
            <ShortsCard 
              key={short.id} 
              data={short} 
              isActive={activeIndex === i} 
              isMuted={isMuted}
              onInvest={() => setIsDrawerOpen(true)}
            />
          ))}
        </div>

        {/* --- Quick Invest Drawer --- */}
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDrawerOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              />
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute bottom-0 left-0 right-0 bg-[#121212]/90 backdrop-blur-2xl border-t border-white/10 rounded-t-[32px] p-8 z-[70] min-h-[400px]"
              >
                <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-8" />
                
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-white font-black text-2xl tracking-tight">{SHORTS_DATA[activeIndex].title}</h3>
                    <p className="text-off-white/60 text-sm">Movie Equity Portfolio Tool</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#1863E1] font-black text-2xl tracking-tighter">{SHORTS_DATA[activeIndex].tokenPrice}</p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Live Price</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                   <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                      <p className="text-off-white/40 text-[10px] font-bold uppercase tracking-wider mb-1">Burn Status</p>
                      <p className="text-white font-black text-xl">{SHORTS_DATA[activeIndex].burnStatus}</p>
                      <div className="w-full h-1 bg-white/10 rounded-full mt-2">
                        <div className="h-full bg-[#E5B80B] rounded-full" style={{ width: SHORTS_DATA[activeIndex].burnStatus }} />
                      </div>
                   </div>
                   <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                      <p className="text-off-white/40 text-[10px] font-bold uppercase tracking-wider mb-1">Dividends</p>
                      <p className="text-white font-black text-xl">+12.4%</p>
                      <p className="text-green-500 text-[10px] font-bold mt-1">Est. APY</p>
                   </div>
                </div>

                <Link href="/movie/thaai-kezhavi" className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm tracking-tight hover:bg-white/10 transition-all flex items-center justify-center gap-2 mb-4">
                   <Play className="w-4 h-4 fill-white" />
                   WATCH MOVIE
                </Link>

                <Link href="/movie/thaai-kezhavi" className="w-full py-5 rounded-2xl bg-[#1863E1] text-white font-black text-lg tracking-tight shadow-[0_8px_30px_rgba(24,99,225,0.3)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                   BUY EQUITY NOW
                   <ArrowUpRight className="w-6 h-6" />
                </Link>
                
                <p className="text-center text-[10px] text-white/40 font-bold uppercase tracking-widest mt-6">
                   Secured by Base Chain • No Gas Fees
                </p>
              </motion.div>
            </>
          )}
        </AnimatePresence>



        {/* Control UI (Back button etc) */}
        <button 
           onClick={onClose}
           className="absolute top-8 left-4 z-[80] w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center group"
        >
          <div className="w-5 h-5 border-l-2 border-b-2 border-white rotate-45 ml-1.5 opacity-60 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Speaker Button */}
        <button 
           onClick={() => setIsMuted(!isMuted)}
           className="absolute top-8 right-4 z-[80] w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center group"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
          ) : (
            <Volume2 className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
          )}
        </button>

      </div>
    </div>
  );
}
