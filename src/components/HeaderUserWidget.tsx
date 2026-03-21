"use client";

import { usePrivy } from "@privy-io/react-auth";
import { CheckCircle2, LogIn } from "lucide-react";

export function HeaderUserWidget() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  // Shorten wallet address
  const formatAddress = (address?: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!ready) {
    return (
      <button className="h-10 px-6 rounded-full bg-primary-blue/50 text-white/50 text-sm font-semibold cursor-not-allowed">
        Loading...
      </button>
    );
  }

  if (authenticated && user?.wallet) {
    return (
      <button 
        onClick={logout}
        className="h-10 pl-3 pr-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-all shadow-sm"
      >
        <div className="w-6 h-6 rounded-full bg-primary-blue flex items-center justify-center">
          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
        </div>
        <span>{formatAddress(user.wallet.address)}</span>
      </button>
    );
  }

  return (
    <button 
      onClick={login}
      className="h-10 px-6 flex items-center gap-2 rounded-full bg-primary-blue hover:bg-blue-600 text-white text-sm font-semibold transition-all shadow-blue-tint hover:shadow-blue-glow duration-300 transform hover:scale-[1.02]"
    >
      <LogIn className="w-4 h-4" />
      <span>Connect</span>
    </button>
  );
}
