"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X,
  Star,
  Zap,
  Gift
} from "lucide-react";
import { useUserAssets } from "@/context/UserAssetsContext";

interface AirdropDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchProgress?: number; // 0-100
  unlockedMilestones?: number[];
}

export function AirdropDrawer({ 
  isOpen, 
  onClose, 
  watchProgress = 0,
  unlockedMilestones = []
}: AirdropDrawerProps) {
  const { balance, claimedMilestones, claimAirdrop: globalClaim } = useUserAssets();
  const [openingMilestone, setOpeningMilestone] = useState<number | null>(null);
  const [isClaiming, setIsClaiming] = useState(false);
  const [rewardAmount, setRewardAmount] = useState<number | null>(null);

  // Persistence local check is handled by context now, but we use it for UI
  const isClaimed = (m: number) => claimedMilestones.includes(m);

  const handleOpenChest = async (milestone: number) => {
    setOpeningMilestone(milestone);
    
    // Random Reward range 10-100
    const amount = Number((Math.random() * 90 + 10).toFixed(1));
    
    setRewardAmount(amount);
  };

  const handleClaim = async () => {
    if (openingMilestone !== null && rewardAmount !== null) {
      setIsClaiming(true);
      
      // Simulate Base Chain transaction
      await new Promise(r => setTimeout(r, 2000));
      
      // Use Global Store logic
      await globalClaim(openingMilestone, rewardAmount);

      setIsClaiming(false);
      setOpeningMilestone(null);
      setRewardAmount(null);
    }
  };

  const currentTier = Math.min(10, Math.floor(watchProgress / 10) + 1);
  const stars = Math.min(3, Math.floor((watchProgress % 10) / 3.33) + (watchProgress >= currentTier * 10 ? 3 : 0));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-[#020203]/80 backdrop-blur-[20px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40, rotateX: 10 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none"
            style={{ perspective: 1200 }}
          >
            <div 
              className="w-full max-w-[1100px] h-full max-h-[700px] rounded-[48px] overflow-hidden flex flex-col pointer-events-auto shadow-[0_0_120px_rgba(24,99,225,0.15)] relative border border-transparent backdrop-blur-md"
              style={{ 
                fontFamily: 'Figtree, sans-serif',
                background: 'linear-gradient(rgba(20, 20, 20, 0.7), rgba(20, 20, 20, 0.7)) padding-box, linear-gradient(to bottom right, rgba(24, 99, 225, 0.2), rgba(0, 0, 0, 0)) border-box'
              }}
            >
              {/* Futuristic Background HUD Elements */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                 <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1863E1] to-transparent" />
                 <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1863E1] to-transparent" />
                 <motion.div 
                   animate={{ opacity: [0.1, 0.3, 0.1] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1863E110_0%,_transparent_70%)]" 
                 />
              </div>

              <div className="flex-1 flex overflow-hidden">
                
                {/* Left Panel: Glassmorphic Progress HUD */}
                <div className="w-[45%] flex flex-col p-12 pr-6 bg-[#08080A]/60 backdrop-blur-3xl relative border-r border-white/5 overflow-y-auto scrollbar-hide">
                  <div className="mb-12 flex items-center justify-between">
                    <div>
                      <p className="text-[#1863E1] text-[10px] font-black uppercase tracking-[0.5em] mb-2">Alpha Terminal v2.0</p>
                      <h2 className="text-4xl font-black text-white tracking-tighter">Airdrop Rail</h2>
                    </div>
                    <div className="flex flex-col items-end">
                       <span className="text-white/20 text-[9px] font-black uppercase tracking-widest">Global Status</span>
                       <span className="text-[#22c55e] text-xs font-black uppercase tracking-widest flex items-center gap-1.5 mt-1">
                          <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-pulse" />
                          Live Sync
                       </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((m, idx) => {
                      const isUnlocked = (unlockedMilestones || []).includes(m);
                      const isMilestoneClaimed = isClaimed(m);
                      const isReady = isUnlocked && !isMilestoneClaimed;

                      return (
                        <motion.div 
                          key={m}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`group relative p-6 rounded-[28px] border transition-all duration-500 overflow-hidden
                            ${isMilestoneClaimed ? 'bg-[#1863E1]/5 border-[#1863E1]/20' : isReady ? 'bg-white/[0.04] border-[#1863E1]/50 shadow-[0_0_40px_rgba(24,99,225,0.15)] scale-[1.02]' : 'bg-transparent border-white/5 opacity-40'}`}
                        >
                          {/* Ready Glow Effect */}
                          {isReady && (
                             <motion.div 
                               animate={{ x: ['-100%', '200%'] }}
                               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                               className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1863E1]/10 to-transparent skew-x-12"
                             />
                          )}

                          <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-6">
                               <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center border transition-all duration-500
                                 ${isReady ? 'bg-[#1863E1] border-transparent shadow-[0_0_20px_#1863E1]' : 'bg-white/5 border-white/10'}`}>
                                  {isMilestoneClaimed ? <Zap className="w-6 h-6 text-white fill-current" /> : isUnlocked ? <Gift className="w-6 h-6 text-white animate-bounce" /> : <div className="text-white/30 text-[10px] font-black">{m}%</div>}
                               </div>
                               <div>
                                  <p className="text-white text-lg font-black tracking-tight">{m}% HUB</p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                     <span className={`text-[9px] font-black uppercase tracking-[0.2em] 
                                       ${isMilestoneClaimed ? 'text-[#22c55e]' : isReady ? 'text-[#1863E1]' : 'text-white/20'}`}>
                                        {isMilestoneClaimed ? 'Vault Claimed' : isUnlocked ? 'Ready to Open' : 'Signal Locked'}
                                     </span>
                                  </div>
                               </div>
                            </div>
                            
                            {isReady ? (
                              <button 
                                onClick={() => handleOpenChest(m)}
                                className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-xl shadow-xl hover:bg-[#1863E1] hover:text-white hover:scale-110 active:scale-95 transition-all"
                              >
                                Extract
                              </button>
                            ) : isMilestoneClaimed ? (
                               <div className="w-8 h-8 rounded-full bg-[#22c55e]/10 flex items-center justify-center border border-[#22c55e]/20">
                                  <Zap className="w-3.5 h-3.5 text-[#22c55e] fill-current" />
                               </div>
                            ) : (
                               <div className="flex flex-col items-end gap-1.5">
                                  <span className="text-[9px] font-black text-white/20">{Math.min(100, Math.round((watchProgress / m) * 100))}%</span>
                                  <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full bg-white/10" style={{ width: `${Math.min(100, (watchProgress / m) * 100)}%` }} />
                                  </div>
                               </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Panel: Holographic 3D Vault Area */}
                <div className="flex-1 flex flex-col p-12 relative overflow-hidden bg-gradient-to-br from-[#020203] to-[#0D0D15]">
                  {/* Floating Holographic Grid */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1863E1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                  
                  <div className="flex justify-start items-start z-10">
                     <div className="bg-white/5 border border-white/5 rounded-3xl p-4 backdrop-blur-2xl flex items-center gap-4">
                        <div className="flex flex-col">
                           <span className="text-white/30 text-[9px] font-black uppercase tracking-widest">Current Multiplier</span>
                           <span className="text-white text-sm font-black tracking-tight">x1.4 BONUS</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <Zap className="w-6 h-6 text-[#1863E1] fill-current" />
                     </div>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center relative translate-y-[-20px]">
                    {/* Immersive Glow Core */}
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.2, 0.1]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute w-[500px] h-[500px] bg-[#1863E1] rounded-full blur-[120px] mix-blend-screen" 
                    />
                    
                    {/* Simulated 3D Vault Container */}
                    <motion.div 
                      animate={{ 
                        y: [-15, 15, -15],
                        rotateX: [-3, 3, -3],
                        rotateY: [-5, 5, -5]
                      }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10 cursor-pointer"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                       {/* @ts-expect-error - model-viewer is a custom element */}
                       <model-viewer
                         src="/3d-airdrop.glb"
                         auto-rotate
                         rotation-per-second="60deg"
                         shadow-intensity="2"
                         camera-controls
                         autoplay
                         environment-image="neutral"
                         exposure="1.5"
                         class="w-full h-full cursor-grab active:cursor-grabbing outline-none"
                         style={{ width: '450px', height: '450px', filter: 'drop-shadow(0 0 40px rgba(24,99,225,0.6))' }}
                       />
                       
                       {/* Floating UI Bits around Vault */}
                       {[...Array(4)].map((_, i) => (
                         <motion.div
                           key={i}
                           animate={{ rotate: 360 }}
                           transition={{ duration: 15 + i*5, repeat: Infinity, ease: "linear" }}
                           className="absolute inset-[-40px] border border-[#1863E1]/10 rounded-full"
                         />
                       ))}
                    </motion.div>

                    {/* Progress HUD Overlay */}
                    <div className="mt-16 w-full max-w-sm space-y-8">
                       <div className="flex flex-col items-center gap-4">
                          <div className="flex items-center gap-3 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 backdrop-blur-2xl">
                             <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Master Tier</span>
                             <div className="w-px h-3 bg-white/10" />
                             <span className="text-white text-[10px] font-black uppercase tracking-widest">{currentTier} / 10</span>
                             <div className="flex items-center gap-1.5 border-l border-white/10 pl-3 ml-1">
                                {[1, 2, 3].map(i => (
                                  <Star key={i} className={`w-3.5 h-3.5 ${stars >= i ? 'text-yellow-400 fill-current drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]' : 'text-white/10'}`} />
                                ))}
                             </div>
                          </div>
                       </div>

                       <div className="relative pt-4">
                          <div className="flex justify-between items-end mb-3">
                             <div className="flex flex-col">
                                <span className="text-white/20 text-[9px] font-black uppercase tracking-widest">Extraction Link</span>
                                <span className="text-white text-lg font-black tracking-tighter">Syncing...</span>
                             </div>
                             <span className="text-[#1863E1] text-2xl font-black italic tracking-tighter">{watchProgress}%</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${watchProgress}%` }}
                               className="h-full bg-gradient-to-r from-[#1863E1] via-[#60A5FA] to-[#1863E1] rounded-full shadow-[0_0_20px_rgba(24,99,225,0.6)]"
                             />
                          </div>
                          {/* Scale Markers */}
                          <div className="flex justify-between px-1 mt-2">
                             {[0, 25, 50, 75, 100].map(p => (
                               <div key={p} className={`w-0.5 h-1.5 ${watchProgress >= p ? 'bg-[#1863E1]' : 'bg-white/10'}`} />
                             ))}
                          </div>
                       </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Close Button UI Component */}
              <button 
                onClick={onClose}
                className="absolute top-10 right-10 p-4 text-white/30 hover:text-white hover:bg-white/5 rounded-3xl transition-all z-[110] border border-transparent hover:border-white/10 backdrop-blur-xl"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Advanced 3D-Simulated Opening Sequence */}
              <AnimatePresence>
                {openingMilestone !== null && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-[200] bg-[#010101]/95 backdrop-blur-[80px] flex flex-col items-center justify-center overflow-hidden"
                  >
                    {/* Token Burst Background Effect */}
                    {rewardAmount && (
                       <div className="absolute inset-0 pointer-events-none">
                          {[...Array(15)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, x: 0, y: 0 }}
                              animate={{ 
                                scale: [0, 1.8, 0],
                                x: (Math.random() - 0.5) * 1200,
                                y: (Math.random() - 0.5) * 1200,
                                opacity: [0, 1, 0],
                                rotate: 360
                              }}
                              transition={{ duration: 2.5, ease: "easeOut" }}
                              className="absolute left-1/2 top-1/2 w-6 h-6 text-[#1863E1]/40"
                            >
                               <Zap className="fill-current w-full h-full blur-[1px]" />
                            </motion.div>
                          ))}
                       </div>
                    )}

                    <div className="relative flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0.3, opacity: 0, rotateY: 90, z: -500 }}
                        animate={{ 
                          scale: 1, 
                          opacity: 1, 
                          rotateY: 0,
                          z: 0,
                          x: 0,
                          y: 0
                        }}
                        transition={{ type: "spring", damping: 15, stiffness: 100 }}
                        className="relative z-10 w-[240px] h-[240px] md:w-[320px] md:h-[320px] flex items-center justify-center mt-8 md:mt-0"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                         {/* @ts-expect-error - model-viewer is a custom element */}
                         <model-viewer
                           src="/3d-airdrop.glb"
                           auto-rotate
                           shadow-intensity="2"
                           autoplay
                           environment-image="neutral"
                           exposure="1"
                           class="w-full h-full outline-none drop-shadow-[0_0_100px_rgba(24,99,225,0.8)]"
                         />
                         {/* Core Pulse */}
                         <motion.div 
                           animate={{ scale: [1, 2, 1], opacity: [0.1, 0.4, 0.1] }}
                           transition={{ duration: 2, repeat: Infinity }}
                           className="absolute inset-0 bg-[#1863E1] rounded-full blur-[120px] -z-10"
                         />
                      </motion.div>

                      {rewardAmount && (
                         <motion.div 
                           initial={{ opacity: 0, y: 60, scale: 0.8 }}
                           animate={{ opacity: 1, y: 0, scale: 1 }}
                           className="text-center mt-2 md:mt-4 space-y-6 md:space-y-8 max-w-xl px-4 md:px-12 z-20"
                         >
                            <div className="space-y-4">
                               <motion.div 
                                 animate={{ scale: [1, 1.05, 1] }}
                                 transition={{ duration: 2, repeat: Infinity }}
                                 className="inline-flex items-center gap-3 bg-[#1863E1]/20 px-6 py-2 rounded-full border border-[#1863E1]/40"
                               >
                                  <Zap className="w-4 h-4 text-[#1863E1] fill-current" />
                                  <span className="text-[#1863E1] text-[10px] md:text-[11px] font-black uppercase tracking-[1em]">Core Decrypted</span>
                               </motion.div>
                               <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none italic">
                                  Won <span className="bg-gradient-to-r from-[#1863E1] via-white to-[#1863E1] bg-clip-text text-transparent px-2">{rewardAmount}</span> <br/>
                                  <span className="text-xl md:text-3xl text-white/40 tracking-normal opacity-50 uppercase not-italic">$THAAI ASSETS</span>
                               </h1>
                            </div>

                            <div className="space-y-4 md:space-y-5">
                              <button 
                                onClick={handleClaim}
                                disabled={isClaiming}
                                className="w-full relative py-5 md:py-7 bg-white text-black rounded-[40px] font-black uppercase tracking-[0.4em] text-[10px] md:text-[12px] shadow-[0_30px_70px_rgba(24,99,225,0.4)] hover:bg-[#1863E1] hover:text-white hover:shadow-[0_40px_90px_rgba(24,99,225,0.6)] active:scale-95 transition-all overflow-hidden group"
                              >
                                {isClaiming ? (
                                   <div className="flex items-center justify-center gap-4">
                                      <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                                      />
                                      <span className="animate-pulse">Broadcasting Signal...</span>
                                   </div>
                                ) : 'Initialize Transfer'}
                                
                                <motion.div 
                                  animate={{ x: ['-150%', '300%'] }}
                                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                  className="absolute top-0 bottom-0 w-64 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                                />
                              </button>
                                
                              <div className="flex items-center justify-center gap-4 opacity-30">
                                 <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white" />
                                 <span className="text-white text-[9px] uppercase font-black tracking-[0.3em]">Base L2 Mainnet</span>
                                 <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white" />
                              </div>
                            </div>
                         </motion.div>
                      )}


                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
