"use client";

import { motion } from "framer-motion";

export function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-32 h-32 flex items-center justify-center" style={{ perspective: '1000px' }}>
        {/* Glowing backdrop */}
        <div className="absolute inset-0 bg-primary-blue/20 rounded-full blur-[40px] animate-pulse" />
        
        {/* 3D Spinning Coin */}
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="relative w-24 h-24 rounded-full border-4 border-primary-blue bg-gradient-to-br from-primary-blue/80 to-black flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_0_30px_rgba(24,99,225,0.6)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Inner details for 3D effect */}
          <div className="absolute inset-2 rounded-full border border-white/20" />
          <span 
            className="text-white font-black text-2xl tracking-tighter"
            style={{ transform: 'translateZ(20px)' }}
          >
            OA
          </span>
        </motion.div>
      </div>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-8 text-primary-blue font-bold tracking-[0.2em] uppercase text-sm"
      >
        Loading Alpha...
      </motion.p>
    </div>
  );
}
