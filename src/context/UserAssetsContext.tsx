"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

/**
 * Asset Type:
 * Token Name ($THAAI)
 * Current Value in INR (calculated from price multiplier)
 * Source (e.g. "Earned via Watch-to-Earn" or "Purchased on DEX")
 */
export interface UserAsset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  valueINR: number;
  source: "Watch-to-Earn" | "DEX Purchase" | "Staked Bonus";
  timestamp: number;
}

interface UserAssetsContextType {
  balance: number;
  assets: UserAsset[];
  claimedMilestones: number[];
  refreshAssets: (showToast?: boolean) => void;
  claimAirdrop: (milestone: number, amount: number) => Promise<boolean>;
}

const UserAssetsContext = createContext<UserAssetsContextType | undefined>(undefined);

export function UserAssetsProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(0);
  const [assets, setAssets] = useState<UserAsset[]>([]);
  const [claimedMilestones, setClaimedMilestones] = useState<number[]>([]);

  // Sample Price Feed (1 STK = 18.90 INR)
  const PRICE_MULTIPLIER = 18.90;

  const loadLocalData = useCallback(() => {
    const savedRewards = localStorage.getItem('claimed_rewards');
    const savedMilestones = localStorage.getItem('claimed_milestones'); // List of milestone numbers

    if (savedRewards) {
      try {
        const rewards = JSON.parse(savedRewards); // { [milestone]: amount }
        const total = Object.values(rewards).reduce((acc: number, val: any) => acc + Number(val), 0);
        setBalance(total);

        // Map to Asset format
        const assetList: UserAsset[] = Object.entries(rewards).map(([milestone, amount]) => ({
          id: `airdrop-${milestone}`,
          name: "Thaai Assets",
          symbol: "$THAAI",
          amount: Number(amount),
          valueINR: Number(amount) * PRICE_MULTIPLIER,
          source: "Watch-to-Earn",
          timestamp: Date.now() - (100 - Number(milestone)) * 60000 // Fake historical timestamps
        }));
        
        setAssets(assetList.sort((a,b) => b.timestamp - a.timestamp));
        setClaimedMilestones(Object.keys(rewards).map(Number));
      } catch (e) {
        console.error("Failed to parse rewards", e);
      }
    }
  }, []);

  useEffect(() => {
    loadLocalData();
  }, [loadLocalData]);

  const refreshAssets = (showToast = true) => {
    loadLocalData();
    if (showToast) {
      toast.info("Profile Updated: New Assets Reflected.", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: "#111113",
          color: "#FFF",
          border: "1px solid #1863E1",
          fontFamily: "Figtree"
        }
      });
    }
  };

  const claimAirdrop = async (milestone: number, amount: number): Promise<boolean> => {
    // Current Logic is in AirdropDrawer, but we centralize here
    const saved = localStorage.getItem('claimed_rewards');
    let rewards = saved ? JSON.parse(saved) : {};
    
    rewards[milestone] = amount;
    localStorage.setItem('claimed_rewards', JSON.stringify(rewards));
    
    // Trigger Sync
    refreshAssets(true);
    return true;
  };

  return (
    <UserAssetsContext.Provider value={{ balance, assets, claimedMilestones, refreshAssets, claimAirdrop }}>
      {children}
    </UserAssetsContext.Provider>
  );
}

export function useUserAssets() {
  const context = useContext(UserAssetsContext);
  if (context === undefined) {
    throw new Error("useUserAssets must be used within a UserAssetsProvider");
  }
  return context;
}
