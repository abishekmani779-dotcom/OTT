"use client";

import { motion } from "framer-motion";
import { ArrowDownUp } from "lucide-react";

export function QuickSwap() {
  return (
    <div 
      className="rounded-2xl p-6 relative overflow-hidden border border-transparent backdrop-blur-md"
      style={{ 
        background: 'linear-gradient(rgba(20, 20, 20, 0.7), rgba(20, 20, 20, 0.7)) padding-box, linear-gradient(to bottom right, rgba(24, 99, 225, 0.2), rgba(0, 0, 0, 0)) border-box'
      }}
    >
      <h3 className="text-white font-bold text-lg mb-6">Quick Swap</h3>
      
      <div className="space-y-2 mb-6">
        <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex justify-between items-center group hover:border-white/10 transition-colors">
          <div>
            <p className="text-xs text-off-white/50 mb-1">Pay</p>
            <input 
              type="text" 
              placeholder="0.0" 
              className="bg-transparent text-2xl font-bold text-white outline-none w-1/2 placeholder:text-white/20"
              defaultValue="1.5"
            />
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full cursor-pointer hover:bg-white/20 transition-colors">
            <div className="w-5 h-5 rounded-full bg-blue-500 overflow-hidden" />
            <span className="text-white font-bold text-sm">ETH</span>
          </div>
        </div>

        <div className="relative flex justify-center -my-3 z-10">
          <div className="w-8 h-8 rounded-full bg-deep-grey border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer hover:scale-110 active:scale-95">
            <ArrowDownUp className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex justify-between items-center group hover:border-primary-blue/20 transition-colors">
          <div>
            <p className="text-xs text-off-white/50 mb-1">Receive</p>
            <input 
              type="text" 
              placeholder="0.0" 
              className="bg-transparent text-2xl font-bold text-white outline-none w-1/2 placeholder:text-white/20"
              defaultValue="15,420"
              readOnly
            />
          </div>
          <div className="flex items-center gap-2 bg-primary-blue/20 border border-primary-blue/30 px-3 py-1.5 rounded-full cursor-pointer hover:bg-primary-blue/30 transition-colors">
            <div className="w-5 h-5 rounded-full bg-primary-blue overflow-hidden shadow-blue-glow" />
            <span className="text-primary-blue font-bold text-sm">ALPHA</span>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className="w-full h-14 rounded-xl bg-primary-blue text-white font-bold text-lg tracking-wide shadow-blue-tint cursor-pointer select-none flex items-center justify-center"
      >
        Review Swap
      </motion.button>
      
      <div className="flex justify-between items-center mt-4 text-xs font-medium text-off-white/40">
        <span>Slippage Tolerance</span>
        <span className="text-white">0.5%</span>
      </div>
    </div>
  );
}
