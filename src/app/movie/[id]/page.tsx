"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CustomVideoPlayer } from "@/components/CustomVideoPlayer";
import { MultiPaymentWidget } from "@/components/MultiPaymentWidget";
import { TransactionHistory } from "@/components/TransactionHistory";
import { 
  Globe, 
  Twitter, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
} from "lucide-react";
import { motion } from "framer-motion";

const HOLDERS = [
  { address: "0x9bfF...1l_0o", amount: "$405.4k", percentage: 72.85, isNotable: true },
  { address: "47Gyuf...TBnS", amount: "$27.83k", percentage: 5.00 },
  { address: "H7WWbF...mc8i", amount: "$27.83k", percentage: 5.00 },
  { address: "GNuVG2...V3QD", amount: "$13.91k", percentage: 2.50 },
  { address: "BfMkB3...v2Fq", amount: "$13.91k", percentage: 2.50 },
  { address: "Aed6FL...FEND", amount: "$13.91k", percentage: 2.50 },
  { address: "0x789F...7LF2", amount: "$13.91k", percentage: 2.50 },
  { address: "7Mc7WW...sLve", amount: "$6.95k", percentage: 1.24 },
  { address: "Eq4rxx...Udfz", amount: "$6.00k", percentage: 1.10 },
  { address: "BqngAj...oxH3", amount: "$5.15k", percentage: 0.95 },
];

export default function MovieAssetHub() {
  const [activeTab, setActiveTab] = useState('Holders');

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans overflow-x-hidden selection:bg-[#1863E1]/30 pb-32">
      <Navbar />
      
      <main className="max-w-[1600px] mx-auto pt-[100px] px-6 md:px-8 space-y-6">
        
        {/* TOP SECTION: 70/30 GRID */}
        <div className="flex flex-col lg:grid lg:grid-cols-10 gap-6 lg:h-[500px] xl:h-[600px]">
          
          {/* LEFT: Video Player (70%) */}
          <div className="lg:col-span-7 w-full h-[300px] sm:h-[400px] lg:h-full rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/5 relative flex-shrink-0 shadow-[0_0_40px_rgba(24,99,225,0.05)] ring-1 ring-[#1863E1]/10 group">
            <CustomVideoPlayer src="/shorts/thaai_kezhavi.mp4" />
          </div>

          {/* RIGHT: Investment Sidebar (30%) */}
          <div 
            className="lg:col-span-3 rounded-2xl p-4 flex flex-col h-[500px] lg:h-full relative shadow-[0_0_30px_rgba(24,99,225,0.1)] ring-1 ring-[#1863E1]/10 overflow-hidden border border-transparent backdrop-blur-md" 
            style={{ 
              fontFamily: 'Figtree, sans-serif',
              background: 'linear-gradient(rgba(20, 20, 20, 0.7), rgba(20, 20, 20, 0.7)) padding-box, linear-gradient(to bottom right, rgba(24, 99, 225, 0.2), rgba(0, 0, 0, 0)) border-box'
            }}
          >
            
            {/* Tabs */}
            <div className="flex bg-white/5 p-1 rounded-xl mb-6 flex-shrink-0">
              {['Holders', 'History', 'Details'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === tab 
                      ? 'bg-white/10 text-white shadow-sm' 
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {tab} {tab === 'Holders' && <span className="bg-white/10 px-1.5 py-0.5 rounded text-[9px] text-white">183</span>}
                </button>
              ))}
            </div>

            {/* Holders List */}
            {activeTab === 'Holders' && (
              <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide space-y-1 mb-6">
                <div className="flex justify-between text-[10px] font-bold text-white/40 mb-3 uppercase tracking-wider px-2">
                  <span>TOP 20 <span className="mx-1">|</span> NOTABLE</span>
                </div>
                {HOLDERS.map((holder, idx) => (
                  <div key={idx} className="relative flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors group z-10 overflow-hidden cursor-pointer">
                    {/* Background Progress Bar */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-[#1863E1]/10 z-[-1] transition-all group-hover:bg-[#1863E1]/20" 
                      style={{ width: `${holder.percentage}%` }}
                    />
                    
                    <div className="flex items-center gap-2">
                      <span className="text-white/80 text-xs font-semibold tracking-tight">{holder.address}</span>
                      {holder.isNotable && <span className="text-[10px] bg-[#ff4444]/20 text-[#ff4444] rounded-full p-0.5"><ShieldCheck className="w-3 h-3" /></span>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white/90 text-xs font-semibold">{holder.amount}</span>
                      <span className={`text-[10px] font-bold w-10 text-right ${idx === 0 ? 'text-[#ff4444]' : 'text-white/60'}`}>
                        {holder.percentage.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Transaction History Tab */}
            {activeTab === 'History' && (
              <TransactionHistory />
            )}

            {/* Details Tab */}
            {activeTab === 'Details' && (
              <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide space-y-8 mb-6 mt-4">
                <div className="space-y-4">
                  <h4 className="text-[14px] font-bold text-white uppercase tracking-wider mb-2">Market Stats</h4>
                  <div className="flex justify-between items-center text-[14px]">
                     <span className="text-white/50 font-medium">Price</span>
                     <span className="text-white font-medium tracking-tight">$0.00002</span>
                  </div>
                  <div className="flex justify-between items-center text-[14px]">
                     <span className="text-white/50 font-medium">FDV</span>
                     <span className="text-white font-medium tracking-tight">$22.20K</span>
                  </div>
                  <div className="flex justify-between items-center text-[14px]">
                     <span className="text-white/50 font-medium">Holders</span>
                     <span className="text-white font-medium tracking-tight">125</span>
                  </div>
                  <div className="flex justify-between items-center text-[14px]">
                     <span className="text-white/50 font-medium">Amount Raised</span>
                     <span className="text-white font-medium tracking-tight">$350.00K</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[14px] font-bold text-white uppercase tracking-wider mb-2">Token Info</h4>
                  <div className="flex justify-between items-center text-[14px]">
                     <span className="text-white/50 font-medium">Created</span>
                     <span className="text-white font-medium tracking-tight">Sep 9, 2025, 8:35 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-[14px]">
                     <span className="text-white/50 font-medium">Developer Wallet</span>
                     <span className="text-white font-medium tracking-tight leading-none border-b border-dotted border-white/60 hover:border-white transition-colors cursor-pointer pb-0.5">Ep7Apf...2pAk</span>
                  </div>
                  <div className="flex justify-between items-center text-[14px]">
                     <span className="text-white/50 font-medium">Contract</span>
                     <span className="text-white font-medium tracking-tight leading-none border-b border-dotted border-white/60 hover:border-white transition-colors cursor-pointer pb-0.5">EBuNwZ...Bobq</span>
                  </div>
                  <div className="flex justify-between items-center text-[14px]">
                     <span className="text-white/50 font-medium">Pool</span>
                     <span className="text-white font-medium tracking-tight leading-none border-b border-dotted border-white/60 hover:border-white transition-colors cursor-pointer pb-0.5">6Jqo5a...33HZ</span>
                  </div>
                </div>
              </div>
            )}

            {/* Multi-Payment Terminal & Swapper */}
            <MultiPaymentWidget />
            
          </div>
        </div>

        {/* MIDDLE SECTION: PRODUCER INFO & STATS */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#0A0A0A] border border-white/5 rounded-2xl p-4 lg:p-6 gap-6 shadow-[0_0_20px_rgba(24,99,225,0.05)] ring-1 ring-[#1863E1]/10">
          
          {/* Left: Producer Info */}
          <div className="flex items-center gap-5 w-full md:w-1/2 border-r border-white/5 h-full pr-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#111] to-[#000] rounded-xl flex items-center justify-center border border-[#d4af37]/30 shadow-[0_0_15px_rgba(212,175,55,0.15)] overflow-hidden flex-shrink-0">
                {/* Simulated SK Productions Logo */}
                <span className="text-[#d4af37] font-serif text-2xl font-bold italic tracking-tighter">SK</span>
            </div>
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold italic tracking-tight text-white m-0 leading-none" style={{ fontFamily: 'Figtree, sans-serif' }}>SK productions</h1>
                    <div className="flex items-center gap-1.5 opacity-60">
                        <Globe className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                        <Twitter className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                        <Send className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>
                
                <div className="flex gap-2">
                    <span className="flex items-center gap-1 text-[9px] font-bold tracking-wide text-white bg-[#1863E1]/20 border border-[#1863E1]/50 px-2 py-0.5 rounded-full uppercase">
                        <CheckCircle2 className="w-3 h-3 text-[#1863E1]" /> Verified
                    </span>
                    <span className="flex items-center gap-1 text-[9px] font-bold tracking-wide text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/30 px-2 py-0.5 rounded-full uppercase">
                        <ShieldCheck className="w-3 h-3" /> Ownership Token
                    </span>
                 </div>
              </div>

              <div className="flex items-center gap-2 bg-[#151515] px-2.5 py-1 rounded-lg border border-white/10 w-max shadow-inner">
                  <div className="w-6 h-6 bg-[#1863E1] rounded text-[8px] font-black flex items-center justify-center tracking-tighter shadow-sm border border-white/20">THAAI</div>
                  <div className="flex flex-col leading-none justify-center">
                      <span className="text-[8px] text-white/50 uppercase font-black">Token Price</span>
                      <span className="text-sm font-bold tracking-tight text-white">$1.89</span>
                  </div>
              </div>

            </div>
          </div>

          {/* Right: Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-1/2" style={{ fontFamily: 'Figtree, sans-serif' }}>
             {[
               { label: 'FDV', value: '$552.6K', isAnimated: true },
               { label: 'Yield', value: '$300K' },
               { label: 'Holders', value: '183' },
               { label: 'Airdrop', value: '10%' },
             ].map((stat, i) => (
                <div key={i} className="flex flex-col py-1 border-l border-white/10 pl-4 md:pl-6 first:border-0 first:pl-0 pt-2 lg:pt-0">
                   <span className="text-[11px] font-bold text-white/40 mb-1 tracking-wider uppercase">{stat.label}</span>
                   {stat.isAnimated ? (
                       <motion.span 
                         className="text-2xl lg:text-3xl font-bold tracking-tight text-white drop-shadow-sm"
                         animate={{ 
                           color: ["#ffffff", "#1863E1", "#ffffff"],
                           textShadow: ["0px 0px 0px rgba(24,99,225,0)", "0px 0px 15px rgba(24,99,225,0.8)", "0px 0px 0px rgba(24,99,225,0)"]
                         }}
                         transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 10 }}
                       >
                         {stat.value}
                       </motion.span>
                   ) : (
                       <span className="text-2xl lg:text-3xl font-bold tracking-tight text-white">{stat.value}</span>
                   )}
                </div>
             ))}
          </div>

        </div>

        {/* BOTTOM SECTION: PROJECT DETAILS */}
        <div className="mt-12">
            <h2 className="text-xl font-bold italic tracking-tight text-white mb-4 flex items-center gap-2">
              Project Details
            </h2>
            
            <div className="bg-[#0A0A0A] border border-white/10 p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]" style={{ fontFamily: 'Figtree, sans-serif' }}>
               
               <h3 className="text-[#1863E1] font-black tracking-widest mb-8 text-lg uppercase bg-gradient-to-r from-[#1863E1] to-[#3B82F6] bg-clip-text text-transparent">MOVIE PROJECT: THAAI KEZHAVI (DIGITAL IP)</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-white/5">
                   <div>
                       <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1.5">Audio Languages :</p>
                       <p className="text-white text-sm font-medium tracking-tight">Tamil, Telugu, Malayalam, Kannada</p>
                   </div>
                   <div>
                       <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1.5">Subtitles :</p>
                       <p className="text-white text-sm font-medium tracking-tight">English</p>
                   </div>
                   <div>
                       <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1.5">Genre :</p>
                       <p className="text-white text-sm font-medium tracking-tight">Crime, Drama, Thriller</p>
                   </div>
               </div>

               <div className="mb-8 pb-8 border-b border-white/5">
                   <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-3">Cast:</p>
                   <ul className="text-white text-sm font-medium tracking-tight space-y-1.5 max-w-xl">
                       {['Muthukumar Palanisamy Director', 'Samuthirakani SI Adhiyaman', 'Shivedaas Inspector Lakshmi', 'Raj Thirudasuruti Suruli', 'Mahesh Rameshan DSP Gunasekaran', 'Sruthiharidasan DSP Rayudu'].map((cast, i) => (
                           <li key={i} className="hover:bg-[#1863E1]/10 px-3 -mx-3 py-1.5 rounded-lg transition-colors cursor-default border border-transparent hover:border-[#1863E1]/20">
                             {cast}
                           </li>
                       ))}
                   </ul>
               </div>

               <div className="mb-8 pb-8 border-b border-white/5 max-w-4xl">
                   <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-3 text-[#1863E1]">THE PITCH</p>
                   <p className="text-white/80 text-sm font-medium leading-relaxed tracking-tight">
                    Can a viral cultural movement become a decentralized asset? Thaai Kezhavi isn&apos;t just a song or a scene, it&apos;s a pan-Indian pop culture phenomenon. We are tokenizing the exclusive Digital Distribution & Merchandising Rights for this specific IP segment. By fractionalizing this project on OwnAlpha, we allow fans to move from being &quot;listeners&quot; to &quot;shareholders&quot; of a chart-buster.
                   </p>
               </div>

               <div className="mb-8 pb-8 border-b border-white/5 max-w-4xl">
                   <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-3 text-[#1863E1]">PROJECT UTILITY</p>
                   <ul className="text-white/80 text-sm font-medium leading-relaxed tracking-tight space-y-2">
                       <li className="hover:bg-[#1863E1]/10 px-3 -mx-3 py-2 rounded-lg transition-colors duration-300 border border-transparent hover:border-[#1863E1]/20 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1863E1] mt-1.5 flex-shrink-0" />
                          <div><span className="font-bold text-white uppercase tracking-wider text-xs mr-2">The Yield:</span> 40% of all streaming royalty revenue from the OwnAlpha OTT platform for this movie is funneled into the $ALPHA-THAAI Buy-Back-and-Burn program.</div>
                       </li>
                        <li className="hover:bg-[#1863E1]/10 px-3 -mx-3 py-2 rounded-lg transition-colors duration-300 border border-transparent hover:border-[#1863E1]/20 flex items-start gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#1863E1] mt-1.5 flex-shrink-0" />
                           <div><span className="font-bold text-white uppercase tracking-wider text-xs mr-2">Exclusive Access:</span> $ALPHA-THAAI holders unlock a 4K &quot;Director&apos;s Cut&quot; of the song, behind-the-scenes rehearsal footage, and high-fidelity lossless audio stems.</div>
                        </li>
                        <li className="hover:bg-[#1863E1]/10 px-3 -mx-3 py-2 rounded-lg transition-colors duration-300 border border-transparent hover:border-[#1863E1]/20 flex items-start gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#1863E1] mt-1.5 flex-shrink-0" />
                           <div><span className="font-bold text-white uppercase tracking-wider text-xs mr-2">Gamification:</span> Holders of 5,000+ tokens get their names featured in the &quot;Digital Wall of Fame&quot; on the movie&apos;s landing page.</div>
                        </li>
                   </ul>
               </div>

               <div className="max-w-4xl">
                   <p className="text-[#1863E1] text-[10px] font-black tracking-widest uppercase mb-3">TOKENOMICS: $ALPHA-THAAI</p>
                   <p className="text-white text-sm font-bold mb-4 tracking-tight">
                       Total Supply: 100,000,000 Tokens (Fixed) — Network: Base Chain (L2)
                   </p>
                   <ul className="text-white/80 text-sm font-medium leading-relaxed space-y-2">
                        <li className="hover:bg-[#1863E1]/10 px-3 -mx-3 py-2 rounded-lg transition-colors duration-300 border border-transparent hover:border-[#1863E1]/20 flex items-start gap-2">
                           <span className="text-[#1863E1] font-bold shrink-0 w-8">70%</span> 
                           <span>Public Sale: Available for retail investors to own a piece of the movie&apos;s digital success.</span>
                        </li>
                       <li className="hover:bg-[#1863E1]/10 px-3 -mx-3 py-2 rounded-lg transition-colors duration-300 border border-transparent hover:border-[#1863E1]/20 flex items-start gap-2">
                          <span className="text-[#1863E1] font-bold shrink-0 w-8">15%</span> 
                          <span>Creator Pool: Reserved for the original artists and production house, vested over 24 months to ensure long-term alignment.</span>
                       </li>
                       <li className="hover:bg-[#1863E1]/10 px-3 -mx-3 py-2 rounded-lg transition-colors duration-300 border border-transparent hover:border-[#1863E1]/20 flex items-start gap-2">
                          <span className="text-[#1863E1] font-bold shrink-0 w-8">10%</span> 
                          <span>Watch-to-Earn (Shorts): Airdropped to users who engage with Thaai Kezhavi shorts and remixes on the OwnAlpha discovery rail.</span>
                       </li>
                       <li className="hover:bg-[#1863E1]/10 px-3 -mx-3 py-2 rounded-lg transition-colors duration-300 border border-transparent hover:border-[#1863E1]/20 flex items-start gap-2">
                          <span className="text-[#1863E1] font-bold shrink-0 w-8">5%</span> 
                          <span>Liquidity: Locked on Base to ensure 24/7 trading for fans.</span>
                       </li>
                   </ul>
               </div>
               
               {/* Background Glow */}
               <div className="absolute top-0 right-0 w-96 h-96 bg-[#1863E1]/5 rounded-full blur-[120px] pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1863E1]/5 rounded-full blur-[120px] pointer-events-none" />
            </div>
        </div>

      </main>
    </div>
  );
}
