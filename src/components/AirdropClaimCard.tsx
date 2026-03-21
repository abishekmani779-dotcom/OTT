"use client";

import { useEffect, useState } from "react";

export function AirdropClaimCard() {
  // Start at 70% and tick upward live every second (simulating live airdrop)
  const [claimedTokens, setClaimedTokens] = useState(0);
  const [percent, setPercent] = useState(0);

  const TOTAL = 1_000_000;
  const START_TOKENS = 700_000;
  const TICK_PER_SECOND = 137; // tokens claimed per second (visible live growth)

  useEffect(() => {
    // Initial count-up animation from 0 → START_TOKENS over ~1.4s
    let current = 0;
    const step = Math.ceil(START_TOKENS / 60); // 60 frames to fill
    const fillInterval = setInterval(() => {
      current = Math.min(current + step, START_TOKENS);
      setClaimedTokens(current);
      setPercent(Math.round((current / TOTAL) * 100));
      if (current >= START_TOKENS) {
        clearInterval(fillInterval);

        // After fill, start live ticking every second
        const liveInterval = setInterval(() => {
          setClaimedTokens((prev) => {
            const next = Math.min(prev + TICK_PER_SECOND, TOTAL);
            setPercent(Math.round((next / TOTAL) * 100));
            return next;
          });
        }, 1000);

        return () => clearInterval(liveInterval);
      }
    }, 16);

    return () => clearInterval(fillInterval);
  }, []);

  return (
    <div className="w-full max-w-sm rounded-2xl bg-black/40 backdrop-blur-md px-5 py-4 space-y-2.5">

      {/* Row 1: Claimed label + live percentage */}
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-off-white/80 tracking-wide">
          Claimed
        </span>
        <span
          className="text-[26px] font-black tabular-nums leading-none"
          style={{
            color: "#10B981",
            textShadow: "0 0 14px rgba(16,185,129,0.5)",
          }}
        >
          {percent}%
        </span>
      </div>

      {/* Row 2: Progress bar */}
      <div className="relative h-[7px] w-full bg-white/8 rounded-full overflow-hidden">
        {/* Animated fill */}
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${percent}%`,
            background: "linear-gradient(90deg, #059669, #10B981)",
            boxShadow: "0 0 10px rgba(16,185,129,0.55)",
            transition: "width 0.9s linear",
          }}
        />
      </div>

      {/* Row 3: Token amounts — both counting live */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-off-white/55 font-medium tabular-nums">
          {claimedTokens.toLocaleString()} $ALPHA
        </span>
        <span className="text-[11px] text-off-white/40 font-medium">
          {TOTAL.toLocaleString()} Total
        </span>
      </div>
    </div>
  );
}
