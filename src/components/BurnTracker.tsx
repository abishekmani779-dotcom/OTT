"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BurnTracker() {
  const [supply, setSupply] = useState(1000000);
  const [isBurning, setIsBurning] = useState(false);

  const handleBurn = () => {
    if (isBurning) return;
    setIsBurning(true);
    
    // Simulate a glitch burn and reduce supply
    setTimeout(() => {
      setSupply((prev) => prev - 5000);
      setIsBurning(false);
    }, 1500);
  };

  return (
    <div 
      className="rounded-2xl p-6 relative overflow-hidden group hover:border-primary-blue/30 transition-colors border border-transparent backdrop-blur-md"
      style={{ 
        background: 'linear-gradient(rgba(20, 20, 20, 0.7), rgba(20, 20, 20, 0.7)) padding-box, linear-gradient(to bottom right, rgba(24, 99, 225, 0.2), rgba(0, 0, 0, 0)) border-box'
      }}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-white font-bold text-lg">Supply Burn</h3>
          <p className="text-sm text-off-white/60">Total $ALPHA supply remaining</p>
        </div>
        <button 
          onClick={handleBurn}
          className="text-xs bg-red-500/10 text-red-500 font-bold px-3 py-1.5 rounded-full border border-red-500/20 hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all"
        >
          Execute Burn
        </button>
      </div>

      <div className="relative h-20 flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {isBurning ? (
            <motion.div
              key="burning"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.1, x: [0, -5, 5, -5, 5, 0], filter: "hue-rotate(90deg)" }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, ease: "easeInOut", times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
              className="text-5xl font-black text-primary-blue tracking-tighter drop-shadow-[0_0_15px_rgba(24,99,225,0.8)]"
            >
              BURNING...
            </motion.div>
          ) : (
            <motion.div
              key="supply"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-5xl font-black text-white tracking-tighter"
            >
              {supply.toLocaleString()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Particle Explosion Effect */}
        {isBurning && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array({ length: 15 })].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                animate={{
                  opacity: 0,
                  x: (Math.random() - 0.5) * 200,
                  y: (Math.random() - 0.5) * 200,
                  scale: Math.random() * 2 + 1,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 w-2 h-2 bg-primary-blue rounded-full shadow-[0_0_10px_rgba(24,99,225,0.8)]"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
