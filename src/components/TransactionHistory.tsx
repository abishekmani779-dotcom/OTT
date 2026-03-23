"use client";

import React from "react";
import { ArrowUpRight, ArrowDownLeft, ExternalLink, Smartphone, CreditCard, Wallet, Clock } from "lucide-react";

type Transaction = {
  id: string;
  type: "Buy" | "Sell";
  method: "UPI" | "CARD" | "CRYPTO";
  tokens: string;
  fiat: string;
  status: "Completed" | "Pending" | "Failed";
  date: string;
  hash: string;
};

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    type: "Buy",
    method: "UPI",
    tokens: "+261.37",
    fiat: "$500.00",
    status: "Completed",
    date: "2 mins ago",
    hash: "0x1a2b...3c4d"
  },
  {
    id: "tx-2",
    type: "Sell",
    method: "CRYPTO",
    tokens: "-100.00",
    fiat: "$188.05",
    status: "Completed",
    date: "1 hr ago",
    hash: "0x4d3c...2b1a"
  },
  {
    id: "tx-3",
    type: "Buy",
    method: "CARD",
    tokens: "+125.66",
    fiat: "$250.00",
    status: "Completed",
    date: "Yesterday",
    hash: "0x9f8e...7d6c"
  },
  {
    id: "tx-4",
    type: "Buy",
    method: "UPI",
    tokens: "+52.91",
    fiat: "$100.00",
    status: "Completed",
    date: "2 Days ago",
    hash: "0x5a6b...7c8d"
  }
];

export function TransactionHistory() {
  const getMethodIcon = (method: string) => {
    switch(method) {
      case "UPI": return <Smartphone className="w-3.5 h-3.5" />;
      case "CARD": return <CreditCard className="w-3.5 h-3.5" />;
      case "CRYPTO": return <Wallet className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide space-y-2.5 mb-6" style={{ fontFamily: 'Figtree, sans-serif' }}>
      <div className="flex justify-between items-center text-[10px] font-bold text-white/40 mb-3 px-1">
        <span className="uppercase tracking-wider">Recent Activity</span>
        <div className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded text-white/60">
           <Clock className="w-3 h-3" /> <span className="uppercase">Base L2</span>
        </div>
      </div>

      {MOCK_TRANSACTIONS.map((tx) => {
        const isBuy = tx.type === "Buy";
        const colorClass = isBuy ? "text-[#1863E1]" : "text-[#ff4444]";
        const bgClass = isBuy ? "bg-[#1863E1]/10" : "bg-[#ff4444]/10";
        
        return (
          <div key={tx.id} className="group relative flex flex-col p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all overflow-hidden cursor-default gap-2">
            
            {/* Top Row: Icon + Status + Date */}
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-3">
                   <div className={`w-8 h-8 rounded-lg ${bgClass} flex items-center justify-center ${colorClass}`}>
                      {isBuy ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                   </div>
                   <div className="flex flex-col">
                      <span className="text-white text-xs font-bold leading-tight flex items-center gap-1.5">
                         {tx.type} THAAI 
                         <span className="text-white/40 font-normal">via</span>
                         <span className="text-white/80">{getMethodIcon(tx.method)}</span>
                      </span>
                      <span className="text-white/40 text-[9px] font-semibold tracking-wide uppercase mt-0.5">{tx.date}</span>
                   </div>
               </div>
               
               <div className="flex flex-col items-end">
                   <span className={`text-xs font-black tracking-tight ${colorClass}`}>
                      {tx.tokens}
                   </span>
                   <span className="text-white/40 text-[10px] font-bold">
                      {tx.fiat}
                   </span>
               </div>
            </div>

            {/* Bottom Row: Explorer Link */}
            <div className="flex justify-between items-center pt-2 mt-1 border-t border-white/5 opacity-60 group-hover:opacity-100 transition-opacity">
               <span className="text-[9px] font-medium text-white/40 uppercase tracking-widest flex items-center gap-1">
                 Status: <span className="text-[#22c55e]">{tx.status}</span>
               </span>
               <a 
                 href="#" 
                 className="flex items-center gap-1 text-[9px] font-bold text-[#1863E1] hover:text-[#1A6FFD] transition-colors uppercase tracking-widest"
                 onClick={(e) => e.preventDefault()}
               >
                 BaseScan ({tx.hash}) <ExternalLink className="w-3 h-3" />
               </a>
            </div>
            
          </div>
        );
      })}
    </div>
  );
}
