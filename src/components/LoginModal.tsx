"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Shield, ArrowRight, Zap, Loader2, Copy, ExternalLink, Download, ArrowLeftRight, Send as SendIcon, Link2, UserPlus, PenSquare, LogOut, Github, Twitter } from "lucide-react";
import { useMockPrivy as usePrivy } from "@/hooks/useMockPrivy";

// Simple global flag for session onboarding so we don't repeat the animation if modal is closed/reopened.
let sessionOnboarded = false;

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, authenticated, user, logout, connectWallet } = usePrivy();
  
  // Step definitions: 'login' -> 'pulse' -> 'upi' -> 'success' -> 'profile'
  const [step, setStep] = useState<'login' | 'pulse' | 'upi' | 'success' | 'profile'>('login');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [upiId, setUpiId] = useState("");
  const [isLinkingUpi, setIsLinkingUpi] = useState(false);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState("Peppy Nova");
  const [profileBio, setProfileBio] = useState("");

  const [pulseText, setPulseText] = useState("Generating Embedded Wallet...");
  const [completeScan, setCompleteScan] = useState(false);

  // Hexagon component for pulse animation
  const Hexagon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className}>
      <path 
        d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" 
        fill="currentColor"
      />
    </svg>
  );

  useEffect(() => {
    if (authenticated && user) {
      if (!sessionOnboarded) {
        setStep('pulse');
        sessionOnboarded = true;
      } else if (isOpen && step !== 'pulse' && step !== 'upi' && step !== 'success') {
        setStep('profile');
      }
    } else {
      setStep('login');
      sessionOnboarded = false;
    }
  }, [authenticated, user, isOpen, step]);

  // Pulse animation timer
  useEffect(() => {
    if (step === 'pulse') {
      setPulseText("Generating Embedded Wallet...");
      
      const tA = setTimeout(() => setPulseText("Deploying Smart Account on Base..."), 700);
      const tB = setTimeout(() => setPulseText("Securing Producer Identity..."), 1400);

      const t = setTimeout(() => {
        setStep('upi');
      }, 2600); // 2s progress bar + 600ms to see checkmark

      return () => { 
        clearTimeout(t);
        clearTimeout(tA);
        clearTimeout(tB);
      };
    }
  }, [step]);

  const handleLogin = (methodId: string) => {
    setLoadingId(methodId);
    
    setTimeout(() => {
      setLoadingId(null);
    }, 10000); // Failsafe to clear loading state if users close the popup

    try {
      if (methodId === 'wallet' && connectWallet) {
        connectWallet();
      } else {
        login(); 
      }
    } catch {
      setLoadingId(null);
    }
  };

  const handleLinkUpi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiId.trim()) return;
    setIsLinkingUpi(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200));
    setIsLinkingUpi(false);
    setStep('success');

    // After success, transition out or to profile
    setTimeout(() => {
      onClose(); // Land on dashboard as requested
      setStep('profile'); // Reset underlying state for next open
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step === 'login' || step === 'profile' ? onClose : undefined}
            className="fixed inset-0 z-[9990] bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-auto"
          >
            {/* The Modal Container */}
            <div 
              className={`relative w-full ${step === 'profile' ? 'max-w-4xl p-6' : 'max-w-[400px] p-4'} overflow-hidden rounded-[24px] border border-transparent shadow-[0_0_80px_rgba(0,0,0,0.8)] z-50 pointer-events-auto transition-all duration-500 backdrop-blur-md`}
              style={{ 
                fontFamily: 'Figtree, sans-serif',
                background: 'linear-gradient(rgba(20, 20, 20, 0.7), rgba(20, 20, 20, 0.7)) padding-box, linear-gradient(to bottom right, rgba(24, 99, 225, 0.2), rgba(0, 0, 0, 0)) border-box'
              }}
            >
              {/* Subtle Blue glow making it pop against black (only on onboarding) */}
              {step !== 'profile' && (
                <motion.div 
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#1863E1] blur-[80px] pointer-events-none" 
                />
              )}

              {/* Close Button (only allowed on login or profile) */}
              {step === 'login' && (
                <button 
                  onClick={onClose}
                  className="absolute top-5 right-5 z-20 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/60 hover:text-white" />
                </button>
              )}

              {/* --- STEP 1: LOGIN --- */}
              {step === 'login' && (
                <div className="relative z-10 p-8 flex flex-col items-center">
                  <motion.img 
                    src="/logo.png" 
                    alt="OwnAlpha"
                    className="w-16 h-16 rounded-2xl shadow-[0_0_30px_rgba(24,99,225,0.4)] mb-6 object-contain border border-white/10"
                  />
                  
                  <h2 className="text-2xl font-black text-white tracking-tight text-center mb-1">
                    Welcome to OwnAlpha
                  </h2>
                  <p className="text-sm font-medium text-white/50 text-center mb-8">
                    Sign in to access premium cinematic assets.
                  </p>

                  <div className="w-full space-y-3">
                    {/* Primary Action 1: Google */}
                    <button 
                      onClick={() => handleLogin('google')}
                      disabled={loadingId !== null}
                      className="relative z-10 cursor-pointer w-full bg-white text-black h-12 rounded-xl flex items-center justify-center gap-3 hover:bg-white/90 transition-all font-medium active:scale-[0.98]"
                    >
                      {loadingId === 'google' ? <Loader2 className="w-5 h-5 animate-spin text-[#1863E1]" /> : (
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      )}
                      <span>Sign in with Google</span>
                    </button>

                    {/* Primary Action 2: Apple */}
                    <button 
                      onClick={() => handleLogin('apple')}
                      disabled={loadingId !== null}
                      className="relative z-10 cursor-pointer w-full bg-[#121212] border border-white/20 text-white h-12 rounded-xl flex items-center justify-center gap-3 hover:bg-[#1A1A1A] transition-all font-medium active:scale-[0.98]"
                    >
                      {loadingId === 'apple' ? <Loader2 className="w-5 h-5 animate-spin text-[#1863E1]" /> : (
                        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.58-.79 1.56-.05 2.89.65 3.65 1.76-3.14 1.87-2.61 5.92.35 7.15-.71 1.73-1.55 3.32-2.66 4.05zm-4.32-13.43c-.15-2.22 1.55-4.14 3.59-4.36.27 2.37-1.85 4.35-3.59 4.36z" />
                        </svg>
                      )}
                      <span>Sign in with Apple</span>
                    </button>
                    
                    <div className="flex items-center gap-3 py-2">
                       <div className="h-px bg-white/10 flex-1" />
                       <span className="text-[11px] font-bold uppercase tracking-widest text-white/30">Or</span>
                       <div className="h-px bg-white/10 flex-1" />
                    </div>

                    {/* Secondary Action: Wallet */}
                    <button 
                      onClick={() => handleLogin('wallet')}
                      disabled={loadingId !== null}
                      className="relative z-10 cursor-pointer w-full bg-transparent border border-white/10 text-white/80 h-10 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-all text-sm font-medium"
                    >
                      {loadingId === 'wallet' ? <Loader2 className="w-5 h-5 animate-spin text-[#1863E1]" /> : "Connect External Wallet"}
                    </button>
                  </div>
                  
                  <p className="text-[10px] text-white/30 text-center mt-6 tracking-wide">
                    Secured by <span className="text-white/60">Privy SDK</span> · Gasless on Base Chain
                  </p>
                </div>
              )}

              {/* --- STEP 2: ONBOARDING PULSE --- */}
              {step === 'pulse' && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="relative z-10 p-10 flex flex-col items-center justify-center min-h-[400px]"
                >
                  <div className="relative mb-8 w-24 h-24 flex items-center justify-center overflow-hidden">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 text-[#1863E1] blur-md"
                    >
                       <Hexagon className="w-24 h-24" />
                    </motion.div>
                    
                    {!completeScan ? (
                      <>
                        <Hexagon className="w-24 h-24 text-[#1863E1] relative z-10 drop-shadow-[0_0_15px_rgba(24,99,225,0.8)]" />
                        <motion.div 
                          animate={{ y: ['-140%', '140%', '-140%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute left-0 right-0 h-1 bg-white shadow-[0_0_15px_white] z-20"
                        />
                      </>
                    ) : (
                      <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        transition={{ type: "spring", damping: 15 }} 
                        className="relative z-20"
                      >
                         <CheckCircle2 className="w-16 h-16 text-[#22c55e] drop-shadow-[0_0_20px_rgba(34,197,94,0.6)]" />
                      </motion.div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-black text-white text-center tracking-tight mb-2">
                    Producer Identity
                  </h3>
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={pulseText}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-sm text-white/60 text-center mb-8 h-5 font-light"
                    >
                      {pulseText}
                    </motion.p>
                  </AnimatePresence>

                  {/* 2 Second Progress Bar */}
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "linear" }}
                      onAnimationComplete={() => setCompleteScan(true)}
                      className="h-full bg-[#1863E1] shadow-[0_0_10px_#1863E1]"
                    />
                  </div>
                </motion.div>
              )}

              {/* --- STEP 3: WALLET & PAYMENT SYNC --- */}
              {step === 'upi' && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  className="relative z-10 p-8 flex flex-col min-h-[400px]"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-[#1863E1]/20 flex items-center justify-center border border-[#1863E1]/40">
                      <Shield className="w-4 h-4 text-[#1863E1]" />
                    </div>
                    <div>
                       <h3 className="text-white font-black text-lg leading-none">Wallet Ready</h3>
                       <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-1">Base Chain Active</p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-black text-white tracking-tight leading-snug mb-2">
                    Link your UPI ID for instant $ALPHA purchases.
                  </h2>
                  <p className="text-sm text-white/60 mb-8">
                    Skip the crypto learning curve. Buy movie equity instantly using INR.
                  </p>

                  <form onSubmit={handleLinkUpi} className="mt-auto space-y-4">
                     <div>
                       <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1 mb-2 block">UPI / VPA ID</label>
                       <input 
                         type="text" 
                         value={upiId}
                         onChange={e => setUpiId(e.target.value)}
                         placeholder="user@okaxis" 
                         required
                         className="w-full h-14 bg-black/40 border border-white/10 rounded-xl px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#1863E1] focus:ring-1 focus:ring-[#1863E1] transition-all font-medium"
                       />
                     </div>
                     <button 
                       type="submit"
                       disabled={isLinkingUpi || !upiId}
                       className="w-full h-14 bg-[#1863E1] text-white rounded-xl font-black tracking-wide shadow-[0_8px_20px_rgba(24,99,225,0.3)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                     >
                       {isLinkingUpi ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                         <>
                           LINK UPI SECURELY
                           <ArrowRight className="w-4 h-4" />
                         </>
                       )}
                     </button>
                  </form>
                </motion.div>
              )}

              {/* --- STEP 4: SUCCESS HOOK --- */}
              {step === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 p-10 flex flex-col items-center justify-center min-h-[400px] text-center"
                >
                   <motion.div
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     transition={{ type: "spring", damping: 12, stiffness: 200 }}
                     className="w-20 h-20 rounded-full bg-[#22c55e]/20 flex items-center justify-center mb-6 border border-[#22c55e]/40 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                   >
                     <CheckCircle2 className="w-10 h-10 text-[#22c55e]" />
                   </motion.div>
                   
                   <h2 className="text-2xl font-black text-white tracking-tight mb-2">
                     Linked!
                   </h2>
                   <p className="text-base text-white/80 leading-relaxed max-w-xs">
                     You are now ready to earn $THAAI rewards and claim dividends.
                   </p>

                   {/* Toast Notification effect directly inside modal */}
                   <motion.div 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.5 }}
                     className="mt-8 px-6 py-3 bg-white border border-white shadow-[0_10px_40px_rgba(24,99,225,0.4)] rounded-full flex items-center gap-3"
                   >
                     <Zap className="w-4 h-4 text-[#1863E1] fill-[#1863E1]" />
                     <span className="text-black font-black text-sm tracking-tight">Welcome back, Producer</span>
                   </motion.div>
                </motion.div>
              )}

              {/* --- STEP 5: ACCOUNT DASHBOARD --- */}
              {step === 'profile' && (
                 <div className="relative z-10 animate-in fade-in duration-500">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-white tracking-tight">{isEditingProfile ? "Edit Profile" : "Account"}</h2>
                      <button onClick={onClose} className="p-2 -mr-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 cursor-pointer">
                         <X className="w-4 h-4 text-white/60" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {/* LEFT COLUMN */}
                       <div className="flex flex-col gap-4">
                          
                          {/* User info box */}
                          <div className="bg-[#242427]/80 backdrop-blur-md border border-white/20 rounded-xl p-4 flex gap-4 shadow-sm">
                             <div className="w-14 h-14 bg-[#111] rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-inner relative group cursor-pointer overflow-hidden border border-white/5 hover:border-white/20 transition-all">
                                {isEditingProfile ? (
                                   <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                                      <PenSquare className="w-4 h-4 text-white" />
                                   </div>
                                ) : null}
                                <span className={isEditingProfile ? "opacity-20" : ""}>{profileName.charAt(0).toUpperCase()}</span>
                             </div>
                             <div className="flex flex-col justify-center flex-1">
                                {isEditingProfile ? (
                                   <div className="flex flex-col gap-1.5 mb-2">
                                     <input 
                                       type="text" 
                                       value={profileName} 
                                       onChange={(e) => setProfileName(e.target.value)}
                                       className="bg-[#13151A] border border-white/10 rounded-lg px-2 py-1 text-sm text-white focus:outline-none focus:border-[#1863E1]"
                                     />
                                     <input 
                                       type="text" 
                                       value={profileBio} 
                                       onChange={(e) => setProfileBio(e.target.value)}
                                       placeholder="add your bio..."
                                       className="bg-[#13151A] border border-white/10 rounded-lg px-2 py-1 text-xs text-white/80 placeholder:text-white/30 focus:outline-none focus:border-[#1863E1]"
                                     />
                                   </div>
                                ) : (
                                   <>
                                      <h3 className="text-white font-medium text-[15px] leading-tight">
                                         {profileName}
                                      </h3>
                                      <p className="text-white/40 text-xs mb-1.5 italic max-w-[140px] truncate">{profileBio || "add your bio"}</p>
                                   </>
                                )}
                                <div className="flex items-center gap-3 text-sm text-white/80">
                                   <span className="font-mono text-xs">{((user?.wallet?.address || user?.email?.address || "").slice(0, 6) + "..." + (user?.wallet?.address || user?.email?.address || "").slice(-4))}</span>
                                   <div className="flex items-center gap-1.5 ml-auto opacity-60">
                                      <Copy 
                                        className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" 
                                        onClick={() => {
                                          const addr = user?.wallet?.address || user?.email?.address;
                                          if (addr) {
                                            navigator.clipboard.writeText(addr);
                                            alert('Address copied to clipboard!');
                                          }
                                        }}
                                      />
                                      <ExternalLink 
                                        className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" 
                                        onClick={() => {
                                          const addr = user?.wallet?.address || user?.email?.address;
                                          if (addr) {
                                            window.open(`https://basescan.org/address/${addr}`, '_blank');
                                          }
                                        }}
                                      />
                                   </div>
                                </div>
                             </div>
                          </div>

                           {/* Balances & Actions */}
                          <div className="bg-[#242427]/80 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-sm">
                             <div className="flex justify-between items-center mb-4">
                                <span className="text-white text-sm font-medium">Balance</span>
                                <span className="text-white text-sm font-medium flex items-center gap-1"><ArrowLeftRight className="w-3 h-3 text-white/40" /> ~$0.00</span>
                             </div>
                             
                             <div className="grid grid-cols-3 gap-2 mb-6">
                                <button onClick={() => setStep('upi')} className="bg-[#1863E1] hover:bg-[#2b70f0] text-white py-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer border border-[#1863E1]/50 shadow-sm shadow-[#1863E1]/20">
                                   <Download className="w-4 h-4" />
                                   <span className="text-[11px] font-semibold">Deposit</span>
                                </button>
                                <button onClick={() => alert('Aerodrome Swap SDK starting...')} className="bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white py-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors border border-white/5 cursor-pointer">
                                   <ArrowLeftRight className="w-4 h-4" />
                                   <span className="text-[11px] font-semibold">Swap</span>
                                </button>
                                <button onClick={() => alert('Send interface opening...')} className="bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white py-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors border border-white/5 cursor-pointer">
                                   <SendIcon className="w-4 h-4" />
                                   <span className="text-[11px] font-semibold">Send</span>
                                </button>
                             </div>

                             <div className="flex flex-col gap-3.5">
                                <div className="flex items-center justify-between text-sm">
                                   <div className="flex items-center gap-2 text-white font-medium text-[13px]">
                                      <div className="w-[18px] h-[18px] bg-gradient-to-br from-[#14F195] to-[#9945FF] rounded-full flex-shrink-0" />
                                      <span>0 <span className="text-white/60">$SOL</span></span>
                                   </div>
                                   <span className="text-white/60 text-xs font-medium">$0.00</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                   <div className="flex items-center gap-2 text-white font-medium text-[13px]">
                                      <div className="w-[18px] h-[18px] bg-[#2775CA] rounded-full flex-shrink-0" />
                                      <span>0 <span className="text-white/60">$USDC</span></span>
                                   </div>
                                   <span className="text-white/60 text-xs font-medium">$0.00</span>
                                </div>
                             </div>
                          </div>

                          <div className="flex flex-col gap-2 mt-1">
                             <span className="text-[11px] text-white/80 font-medium mb-1">Connect your socials</span>
                             <div className="flex gap-2">
                                <button onClick={() => alert('OAuth 2.0 Flow: Twitter Connecting...')} className="flex-1 bg-[#242427] hover:bg-[#2A2A2E] border border-white/20 text-white/90 py-2.5 rounded-[10px] text-[11px] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm">
                                   Connect <Twitter className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => alert('OAuth 2.0 Flow: Github Connecting...')} className="flex-1 bg-[#242427] hover:bg-[#2A2A2E] border border-white/20 text-white/90 py-2.5 rounded-[10px] text-[11px] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm">
                                   Connect <Github className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => alert('Are you sure? This will remove your easy-login method.')} className="flex-1 bg-[#242427] hover:bg-[#2A2A2E] border border-white/20 text-white/90 py-2.5 rounded-[10px] text-[11px] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm">
                                   Disconnect G
                                </button>
                             </div>
                          </div>
                           <div className="flex gap-2 mt-3" onClick={(_e) => _e.stopPropagation()} onMouseDown={(_e) => _e.stopPropagation()}>
                              <button onClick={() => { logout(); onClose(); }} className="bg-[#EF4444] hover:bg-[#DC2626] text-white py-2.5 px-5 rounded-xl text-[13px] font-semibold flex flex-shrink-0 items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm shadow-red-500/20 border border-red-500/40">
                                 Logout <LogOut className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => setIsEditingProfile(!isEditingProfile)} 
                                className={`flex-1 ${isEditingProfile ? 'bg-[#1863E1] hover:bg-[#2b70f0] border-[#1863E1]' : 'bg-[#242427]/80 hover:bg-[#303035] border-white/20 backdrop-blur-md'} border text-white/90 py-2.5 rounded-xl text-[13px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm`}
                              >
                                 {isEditingProfile ? "Save Profile" : "Edit Profile"} 
                                 <PenSquare className={`w-3.5 h-3.5 ${isEditingProfile ? 'text-white' : 'text-white/50'}`} />
                              </button>
                           </div> 
                       </div>

                       {/* RIGHT COLUMN */}
                       <div className="flex flex-col gap-4">
                          
                          {/* Tabs */}
                          <div className="bg-[#242427]/80 backdrop-blur-md p-1 rounded-xl flex border border-white/20 shadow-sm">
                             <button className="flex-1 bg-[#13151A] text-white text-[13px] font-medium py-1.5 rounded-lg flex items-center justify-center gap-2 shadow-sm border border-white/10">
                                Referrals <span className="bg-[#1863E1] text-[9px] text-white font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">Earn 100%</span>
                             </button>
                             <button className="flex-1 text-white/50 text-[13px] font-medium py-1.5 hover:text-white transition-colors">
                                My asset
                             </button>
                          </div>

                          <p className="text-[#A1A1A8] text-[13px] leading-relaxed mt-2 px-1">
                             Refer friends to earn <strong className="text-white font-medium">100%</strong> of their deposit fees, sent automatically to your wallet.
                          </p>

                          <button 
                             onClick={() => {
                               navigator.clipboard.writeText('ownalpha.com/join?ref=peppy_nova');
                               alert('Referral URL generated and copied to clipboard! (Share to WhatsApp/X)');
                             }}
                             className="w-full bg-[#1863E1] hover:bg-[#2b70f0] text-white py-3 rounded-xl font-semibold text-[13px] flex items-center justify-center gap-2 transition-colors mt-2 cursor-pointer shadow-sm shadow-[#1863E1]/20 border border-[#1863E1]/50"
                          >
                             <Link2 className="w-3.5 h-3.5" /> Generate Referral Link
                          </button>

                          <div className="mt-6">
                             <div className="flex items-center gap-2 text-white font-medium text-[13px] mb-1.5 px-1">
                                <UserPlus className="w-4 h-4 text-white/80" /> Your Referrer
                             </div>
                             <p className="text-[#A1A1A8] text-xs mb-3 px-1">
                                Enter a friends code to get a 5% discount on deposit fees.
                             </p>

                             <div className="flex gap-2">
                                <input 
                                   type="text" 
                                   placeholder="Enter referral code (e.g., abc123-launchonstar)"
                                   className="flex-1 bg-[#242427] border border-white/5 rounded-xl px-4 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#1863E1]/50 transition-colors h-10"
                                />
                                <button 
                                   onClick={() => alert('Verifying code... 5% Discount active!')}
                                   className="bg-[#242427]/80 backdrop-blur-md border border-white/20 hover:bg-[#2C2C2E] text-white/70 hover:text-white text-xs font-semibold px-4 h-10 rounded-xl transition-colors whitespace-nowrap cursor-pointer shadow-sm"
                                >
                                   Apply Code
                                </button>
                             </div>
                          </div>

                       </div>
                    </div>
                 </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
