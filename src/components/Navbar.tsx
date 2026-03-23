"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Crown, LogIn } from 'lucide-react';
import { useMockPrivy as usePrivy } from "@/hooks/useMockPrivy";
import { LoginModal } from './LoginModal';



export function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setLoginOpen(true)}
                  className="relative flex items-center p-1.5 pl-1.5 pr-4 rounded-[18px] bg-[#1C1C1E] border border-white/5 hover:bg-[#2A2A2E] transition-all text-left min-w-[200px]"
                >
                  {/* Notification Dot (Brand Blue) */}
                  <div className="absolute -top-1 -left-1 w-3.5 h-3.5 bg-[#1863E1] rounded-full border-[2.5px] border-[#0A0A0A]" />
                  
                  <div className="w-10 h-10 bg-[#0A0A0A] rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-inner shrink-0 mr-3">
                    {avatarLetter}
                  </div>
                  
                  <div className="flex-1 flex justify-between items-center gap-4">
                     <span className="text-white text-[15px] font-medium tracking-tight">
                       Peppy Nova
                     </span>
                     <div className="flex flex-col items-end">
                        <span className="text-white font-semibold text-[14px] leading-none mb-0.5">$0.00</span>
                        <span className="text-white/40 text-[11px] font-mono tracking-tighter leading-none">
                          {((user?.wallet?.address || user?.email?.address || "").slice(0, 4) + "..." + (user?.wallet?.address || user?.email?.address || "").slice(-4))}
                        </span>
                     </div>
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
