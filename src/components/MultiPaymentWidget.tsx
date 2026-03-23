"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Wallet, Smartphone, Shield, ArrowRightLeft, CheckCircle2, X, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";

type PaymentMethod = "UPI" | "CARD" | "CRYPTO";
type TxStage = "IDLE" | "SELECT_METHOD" | "STAGE1" | "STAGE2" | "STAGE3";

export function MultiPaymentWidget() {
  const [method, setMethod] = useState<PaymentMethod>("CRYPTO");
  const [tradeType, setTradeType] = useState<"Buy" | "Sell">("Buy");
  const [amount, setAmount] = useState("");
  const [vpa, setVpa] = useState("");
  
  // Transaction Modal State
  const [txStage, setTxStage] = useState<TxStage>("IDLE");
  
  // Header sync (simulated global state)
  const [simulatedBalance, setSimulatedBalance] = useState(0);

  // Logic to calculate fees and final amount
  const getFinalAmount = (rawAmount: string, currentMethod: PaymentMethod, tType: "Buy" | "Sell") => {
    const num = parseFloat(rawAmount);
    if (isNaN(num) || num <= 0) return 0;
    
    // Base convert
    if (tType === "Buy") {
        let baseTokens = num / 1.89; // USD -> THAAI
        if (currentMethod === "UPI") baseTokens = baseTokens * 0.98;
        if (currentMethod === "CARD") baseTokens = baseTokens * 0.95;
        if (currentMethod === "CRYPTO") baseTokens = baseTokens * 0.995;
        return baseTokens;
    } else {
        let baseDollars = num * 1.89; // THAAI -> USD
        if (currentMethod === "UPI") baseDollars = baseDollars * 0.98;
        if (currentMethod === "CARD") baseDollars = baseDollars * 0.95;
        if (currentMethod === "CRYPTO") baseDollars = baseDollars * 0.995;
        return baseDollars;
    }
  };

  const finalAmount = getFinalAmount(amount, method, tradeType);
  const isBuy = tradeType === "Buy";
  const themeColor = isBuy ? "#1863E1" : "#E11818";
  const hoverColor = isBuy ? "#1A6FFD" : "#FF3333";

  const handlePay = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setTxStage("SELECT_METHOD");
  };

  const confirmPayment = () => {
    if (method === "UPI" && !vpa) return; // simple validation
    
    setTxStage("STAGE1");
    
    // Simulate Stage 1 -> Stage 2 (Fiat received / Gas sponsored)
    setTimeout(() => {
       setTxStage("STAGE2");
       
       // Simulate Stage 2 -> Stage 3 (Alpha Delivered)
       setTimeout(() => {
          setTxStage("STAGE3");
          // Trigger Confetti
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: [themeColor, '#ffffff']
          });
          // Update Simulated Balance for Account Abstraction
          if (isBuy) {
            setSimulatedBalance(prev => prev + finalAmount);
          } else {
            setSimulatedBalance(prev => Math.max(0, prev - parseFloat(amount)));
          }
       }, 3000);
    }, 2500);
  };

  return (
    <div className="mt-auto space-y-4 pt-4 border-t border-white/5 relative" style={{ fontFamily: 'Figtree, sans-serif' }}>
      
      {/* Dynamic Inputs (Main Sidebar) */}
      <div className="space-y-3">
         {/* Amount Field */}
         <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-bold">{isBuy ? "$" : "T"}</span>
            <input 
               type="number" 
               value={amount}
               onChange={(e) => setAmount(e.target.value)}
               placeholder={isBuy ? "Amount (USD)" : "Amount (THAAI)"}
               className={`w-full bg-[#1A1A1A] border border-white/10 rounded-xl py-3 pl-8 pr-16 text-sm text-white font-bold focus:outline-none transition-colors placeholder:text-white/30 ${isBuy ? 'focus:border-[#1863E1]/50 focus:bg-[#1E1E1E]' : 'focus:border-[#E11818]/50 focus:bg-[#1E1818]'}`}
            />
            <button 
              onClick={() => {
                 if (isBuy) setAmount("1000"); // simulate $1000 max fill
                 else setAmount(simulatedBalance.toFixed(2));
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white text-[10px] font-black px-3 py-1.5 rounded transition-colors uppercase tracking-wider"
            >
              Max
            </button>
         </div>
      </div>

      {/* Logic / Conversion Preview */}
      <div className="flex items-center justify-between px-2 text-[11px] font-bold bg-[#111] py-2 rounded-lg border border-white/5">
         <span className="text-white/40 uppercase tracking-widest">{isBuy ? "You Receive:" : "You Get:"}</span>
         <span className="text-sm tracking-tight" style={{ color: themeColor }}>
            {finalAmount.toFixed(2)} <span className="text-white/60 text-[10px] uppercase">{isBuy ? "THAAI" : "USD"}</span>
         </span>
      </div>

      {/* Buy/Sell Button & Footer */}
      <button 
         onClick={handlePay}
         disabled={!amount}
         className="w-full text-white font-black py-4 rounded-xl transition-all active:scale-[0.98] tracking-tight text-[15px] disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed mb-2"
         style={{ backgroundColor: themeColor, boxShadow: `0 4px 25px ${themeColor}66` }}
         onMouseEnter={(e) => !(!amount) && (e.currentTarget.style.backgroundColor = hoverColor)}
         onMouseLeave={(e) => !(!amount) && (e.currentTarget.style.backgroundColor = themeColor)}
      >
         {isBuy ? "BUY $THAAI" : "SELL $THAAI"}
      </button>

      <div className="flex items-center justify-between px-1 pt-2 border-t border-white/5">
         <div className="flex bg-[#151515] rounded-l-full rounded-r-full p-0.5 border border-white/5">
            <button 
               onClick={() => setTradeType('Buy')}
               className={`px-3 py-1 text-[10px] font-bold rounded-l-full rounded-r-md transition-all ${tradeType === 'Buy' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
            >
               Buy
            </button>
            <button 
               onClick={() => setTradeType('Sell')}
               className={`px-3 py-1 text-[10px] font-bold rounded-l-md rounded-r-full transition-all ${tradeType === 'Sell' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
            >
               Sell
            </button>
         </div>
         <div className="flex items-center gap-1.5 text-[10px] font-medium text-white/50">
            Balance: <span className="text-white/80">{simulatedBalance > 0 ? `${simulatedBalance.toFixed(2)} THAAI` : '0.00 USDC'}</span>
            <ArrowRightLeft className="w-3 h-3 cursor-pointer hover:text-white transition-colors" />
         </div>
      </div>

      {/* Seamless Transaction Modal */}
      <AnimatePresence>
         {txStage !== "IDLE" && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
               <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 exit={{ opacity: 0 }} 
                 className="absolute inset-0 bg-black/60 backdrop-blur-md"
               />
               <motion.div 
                 initial={{ scale: 0.95, opacity: 0, y: 20 }}
                 animate={{ scale: 1, opacity: 1, y: 0 }}
                 exit={{ scale: 0.95, opacity: 0, y: 20 }}
                 className="relative w-full max-w-sm rounded-3xl p-6 shadow-2xl flex flex-col items-center overflow-hidden border border-transparent backdrop-blur-md"
                 style={{ 
                   background: 'linear-gradient(rgba(20, 20, 20, 0.7), rgba(20, 20, 20, 0.7)) padding-box, linear-gradient(to bottom right, rgba(24, 99, 225, 0.2), rgba(0, 0, 0, 0)) border-box'
                 }}
               >
                  {/* Progress Stepper */}
                  {txStage !== "SELECT_METHOD" && (
                     <div className="w-full flex items-center justify-between mb-8 px-4">
                        <div className={`h-1 flex-1 rounded-full transition-all duration-500 bg-white/10`} 
                             style={{ backgroundColor: (txStage === 'STAGE1' || txStage === 'STAGE2' || txStage === 'STAGE3') ? themeColor : undefined }} />
                        <div className="w-2" />
                        <div className={`h-1 flex-1 rounded-full transition-all duration-500 bg-white/10`} 
                             style={{ backgroundColor: (txStage === 'STAGE2' || txStage === 'STAGE3') ? themeColor : undefined }} />
                        <div className="w-2" />
                        <div className={`h-1 flex-1 rounded-full transition-all duration-500 bg-white/10`} 
                             style={{ backgroundColor: (txStage === 'STAGE3') ? themeColor : undefined }} />
                     </div>
                  )}

                  {/* Stage 0: Select Payment Method */}
                  {txStage === "SELECT_METHOD" && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col w-full">
                        <div className="flex items-center justify-between mb-6">
                           <h3 className="text-xl font-bold tracking-tight text-white">{isBuy ? "Pay With" : "Withdraw To"}</h3>
                           <button onClick={() => setTxStage("IDLE")} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                             <X className="w-5 h-5 text-white/60" />
                           </button>
                        </div>

                        <div className="flex bg-[#151515] p-1 rounded-xl border border-white/5 mb-6">
                           <button 
                             onClick={() => setMethod("UPI")} 
                             className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-lg transition-all ${method === "UPI" ? 'text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                             style={method === "UPI" ? { backgroundColor: themeColor, boxShadow: `0 0 15px ${themeColor}66` } : {}}
                           >
                              <Smartphone className="w-5 h-5" />
                              <span className="text-[10px] font-bold tracking-wider uppercase">UPI</span>
                           </button>
                           <button 
                             onClick={() => setMethod("CARD")} 
                             className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-lg transition-all ${method === "CARD" ? 'text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                             style={method === "CARD" ? { backgroundColor: themeColor, boxShadow: `0 0 15px ${themeColor}66` } : {}}
                           >
                              <CreditCard className="w-5 h-5" />
                              <span className="text-[10px] font-bold tracking-wider uppercase">Card</span>
                           </button>
                           <button 
                             onClick={() => setMethod("CRYPTO")} 
                             className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-lg transition-all ${method === "CRYPTO" ? 'text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                             style={method === "CRYPTO" ? { backgroundColor: themeColor, boxShadow: `0 0 15px ${themeColor}66` } : {}}
                           >
                              <Wallet className="w-5 h-5" />
                              <span className="text-[10px] font-bold tracking-wider uppercase">Crypto</span>
                           </button>
                        </div>

                        {method === "UPI" && (
                           <div className="mb-6">
                             <input 
                                type="text" 
                                value={vpa}
                                onChange={(e) => setVpa(e.target.value)}
                                placeholder={isBuy ? "Enter VPA to pay (e.g., user@okicici)" : "Enter VPA to receive (e.g., user@paytm)"} 
                                className={`w-full bg-[#1A1A1A] border border-white/10 rounded-xl py-3 px-4 text-sm text-white font-medium focus:outline-none transition-colors placeholder:text-white/30 ${isBuy ? 'focus:border-[#1863E1]/50 focus:bg-[#1E1E1E]' : 'focus:border-[#E11818]/50 focus:bg-[#1E1818]'}`}
                             />
                           </div>
                        )}

                        <div className="flex items-center justify-between px-2 text-[11px] font-bold bg-[#111] py-2 rounded-lg border border-white/5 mb-6">
                           <span className="text-white/40 uppercase tracking-widest">{isBuy ? "You Receive:" : "You Get:"}</span>
                           <span className="text-sm tracking-tight" style={{ color: themeColor }}>
                              {finalAmount.toFixed(2)} <span className="text-white/60 text-[10px] uppercase">{isBuy ? "THAAI" : "USD"}</span>
                           </span>
                        </div>

                        <button 
                           onClick={confirmPayment}
                           disabled={method === "UPI" && !vpa}
                           className="w-full text-white font-black py-4 rounded-xl transition-all active:scale-[0.98] tracking-tight text-[15px] disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed mb-6"
                           style={{ backgroundColor: themeColor, boxShadow: `0 4px 25px ${themeColor}66` }}
                           onMouseEnter={(e) => !(method === "UPI" && !vpa) && (e.currentTarget.style.backgroundColor = hoverColor)}
                           onMouseLeave={(e) => !(method === "UPI" && !vpa) && (e.currentTarget.style.backgroundColor = themeColor)}
                        >
                           {method === "CRYPTO" ? "CONFIRM SWAP" : (isBuy ? "CONFIRM PAYMENT" : "CONFIRM PAYOUT")}
                        </button>

                        <div className="flex items-start gap-2 px-1 text-left opacity-60 hover:opacity-100 transition-opacity">
                           <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: themeColor }} />
                           <p className="text-[10px] text-white/70 leading-snug font-light tracking-wide">
                              Securely processed on Base Chain. Regulated Fiat-to-Crypto Gateway via Account Abstraction ERC-4337 (Gas Sponsored).
                           </p>
                        </div>
                     </motion.div>
                  )}

                  {/* Stage 1: Received / Initiating */}
                  {txStage === "STAGE1" && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 relative" style={{ backgroundColor: `${themeColor}1A` }}>
                           <div className="absolute inset-0 border-2 rounded-full animate-ping opacity-20" style={{ borderColor: themeColor }} />
                           <CheckCircle2 className="w-10 h-10" style={{ color: themeColor }} />
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                           {isBuy 
                              ? (method === "CRYPTO" ? "Wallet Signature Verified" : "Fiat Payment Received") 
                              : "Alpha Vault Unlocked"}
                        </h3>
                        <p className="text-xs text-white/50 font-medium">{isBuy ? "Processing your transaction via secure gateway..." : "Initiating payout gateway..."}</p>
                     </motion.div>
                  )}

                  {/* Stage 2: Swapping on Base */}
                  {txStage === "STAGE2" && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center w-full">
                        <div className="flex items-center justify-center gap-6 mb-8 mt-4">
                           {/* Left Node */}
                           <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
                              {isBuy ? (method === "CRYPTO" ? <Wallet className="w-6 h-6 text-white/70" /> : <Smartphone className="w-6 h-6 text-white/70" />) : (
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" fill="#0052FF"/>
                                  </svg>
                              )}
                           </div>
                           
                           {/* Animation Track */}
                           <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#1863E1]/50 to-transparent relative overflow-hidden">
                               <motion.div 
                                 className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-[0_0_10px_#1863E1]"
                                 style={{ backgroundColor: themeColor }}
                                 animate={{ left: isBuy ? ['0%', '100%'] : ['100%', '0%'] }}
                                 transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                               />
                           </div>

                           {/* Right Node */}
                           <div className="w-14 h-14 rounded-2xl bg-[#0052FF]/5 border border-[#0052FF]/20 flex items-center justify-center relative shadow-[0_0_20px_rgba(0,82,255,0.1)]">
                              {!isBuy ? (method === "CRYPTO" ? <Wallet className="w-6 h-6 text-white/70" /> : <Smartphone className="w-6 h-6 text-white/70" />) : (
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" fill="#0052FF"/>
                                  </svg>
                              )}
                           </div>
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-white mb-2">{isBuy ? "Executing on Base" : "Burning & Routing"}</h3>
                        <p className="text-xs text-white/50 font-medium">{method === "CRYPTO" ? 'Routing via Aerodrome Dex...' : 'Paymaster sponsoring gas routes...'}</p>
                     </motion.div>
                  )}

                  {/* Stage 3: Success */}
                  {txStage === "STAGE3" && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center w-full">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-2xl" style={{ background: `linear-gradient(135deg, ${themeColor}, ${hoverColor})` }}>
                           <span className="text-2xl font-black text-white">{isBuy ? "$THAAI" : "$USD"}</span>
                        </div>
                        <h3 className="text-2xl font-black tracking-tight text-white mb-2">{isBuy ? "Alpha Delivered!" : "Fiat Secured!"}</h3>
                        <p className="text-sm font-bold px-4 py-1.5 rounded-full mb-8" style={{ color: themeColor, backgroundColor: `${themeColor}1A` }}>
                           +{finalAmount.toFixed(2)} {isBuy ? "Tokens added to vault." : "Dollars sent to payout destination."}
                        </p>

                        <div className="flex flex-col w-full gap-3">
                           <button 
                             onClick={() => setTxStage("IDLE")} 
                             className="w-full border border-white/10 hover:bg-white/5 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                           >
                              View on BaseScan <ExternalLink className="w-4 h-4" />
                           </button>
                           <button 
                             onClick={() => setTxStage("IDLE")} 
                             className="w-full bg-white text-black font-black py-3 rounded-xl transition-colors text-sm hover:bg-gray-200"
                           >
                              Return to Movie
                           </button>
                        </div>
                     </motion.div>
                  )}
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
}
