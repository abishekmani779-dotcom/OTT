"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, LogIn, Wallet, ShieldCheck, Search } from 'lucide-react';
import { useMockPrivy as usePrivy } from "@/hooks/useMockPrivy";
import { LoginModal } from './LoginModal';
import { useUserAssets } from "@/context/UserAssetsContext";

export function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const { balance } = useUserAssets();
  const { authenticated, user } = usePrivy();

  const avatarLetter = (user?.email?.address ?? user?.phone?.number ?? 'W')[0].toUpperCase();

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-6 md:px-8 border-b border-white/5"
        style={{
          fontFamily: 'Figtree, sans-serif',
          background: 'rgba(7,9,15,0.92)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.img
              src="/logo.png"
              alt="OwnAlpha Logo"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(24,99,225,0.6)' }}
              className="w-9 h-9 rounded-xl object-contain drop-shadow-md border border-white/10"
            />
            <span className="text-[17px] font-black tracking-tight text-white group-hover:text-[#1863E1] transition-colors">
              OwnAlpha
            </span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <motion.div
            animate={{ boxShadow: searchFocused ? '0 0 20px rgba(24,99,225,0.1)' : '0 0 0 0px transparent' }}
            className="w-full rounded-full overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search Films, Tokens, Producers..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full h-10 bg-white/5 rounded-full pl-5 pr-12 text-sm text-white placeholder:text-white/25 focus:outline-none focus:bg-white/8 transition-colors"
            />
          </motion.div>
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#1863E1] transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Subscriptions */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:flex h-9 px-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B58A1F] items-center gap-2 text-black font-black text-sm shadow-[0_2px_12px_rgba(212,175,55,0.25)] hover:shadow-[0_2px_20px_rgba(212,175,55,0.45)] transition-shadow"
          >
            <Crown className="w-4 h-4 fill-black" />
            Subscribe
          </motion.button>

          {/* Login / Profile */}
          <AnimatePresence mode="wait">
            {authenticated && user ? (
              <div key="auth-group" className="flex items-center gap-3">
                {/* ── Authenticated: Unified Profile Button ── */}
                <motion.button
                  key="avatar"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setLoginOpen(true)}
                  className="relative flex items-center p-1.5 pl-1.5 pr-5 rounded-2xl bg-[#111113]/90 backdrop-blur-xl border border-white/5 hover:border-white/10 hover:bg-[#1A1A1D]/90 transition-all text-left shadow-[0_4px_20px_rgba(0,0,0,0.4)] group/profile min-w-[220px]"
                >
                  {/* Luxury Glow Effect on Hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#1863E1]/0 via-transparent to-[#1863E1]/0 group-hover/profile:from-[#1863E1]/10 group-hover/profile:to-transparent transition-all duration-700 pointer-events-none" />
                  
                  {/* Notification Dot */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-br from-[#1863E1] to-[#60A5FA] rounded-full border-[3px] border-[#07090F] shadow-[0_0_10px_rgba(24,99,225,0.4)] z-10" />
                  
                  {/* Avant-Garde Avatar Container */}
                  <div className="w-11 h-11 bg-gradient-to-br from-[#1A1A1D] to-[#0A0A0C] rounded-xl flex items-center justify-center text-white font-black text-base shadow-inner shrink-0 mr-4 border border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1863E120_0%,_transparent_70%)] opacity-50" />
                    <span className="relative z-10">{avatarLetter}</span>
                  </div>
                  
                  <div className="flex flex-col relative z-10 flex-1">
                     <div className="flex items-center gap-1.5 mb-1">
                       <span className="text-white text-[15px] font-black tracking-tight group-hover/profile:text-[#1863E1] transition-colors leading-none">
                         Peppy Nova
                       </span>
                       <ShieldCheck className="w-3 h-3 text-[#1863E1] fill-[#1863E1]/10" />
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 bg-[#1863E1]/10 px-2.5 py-1 rounded-lg border border-[#1863E1]/20">
                           <Wallet className="w-3 h-3 text-[#1863E1]" />
                           <span className="text-white font-black text-[12px] tabular-nums tracking-tighter leading-none">
                              {balance.toLocaleString()}
                           </span>
                        </div>
                        <span className="text-white/30 text-[9px] font-black uppercase tracking-[0.2em] pt-0.5">
                          {((user?.wallet?.address || user?.email?.address || "").slice(0, 4))}
                        </span>
                     </div>
                  </div>

                  {/* Vault Status Indicator (Right Side) */}
                  <div className="ml-4 pl-4 border-l border-white/5 flex flex-col items-end shrink-0 hidden lg:flex">
                     <span className="text-white/20 text-[8px] font-black uppercase tracking-[0.2em] mb-1">Portfolio</span>
                     <span className="text-[#1863E1] font-black text-[15px] leading-none drop-shadow-[0_0_10px_rgba(24,99,225,0.4)]">
                        ${(balance * 1.8).toFixed(1)}
                     </span>
                  </div>
                </motion.button>
              </div>
            ) : (
              /* ── Not authenticated: Login button ── */
              <motion.button
                key="login"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(24,99,225,0.25)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-2 h-9 px-5 rounded-full bg-[#1863E1] text-white text-sm font-black tracking-tight shadow-[0_0_0px_rgba(24,99,225,0)] hover:shadow-[0_0_20px_rgba(24,99,225,0.35)] transition-all"
              >
                <LogIn className="w-4 h-4" />
                Login
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Login Modal */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
