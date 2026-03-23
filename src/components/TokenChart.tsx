"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { date: "Jan", value: 0.15 },
  { date: "Feb", value: 0.22 },
  { date: "Mar", value: 0.18 },
  { date: "Apr", value: 0.35 },
  { date: "May", value: 0.32 },
  { date: "Jun", value: 0.48 },
  { date: "Jul", value: 0.55 },
  { date: "Aug", value: 0.82 },
  { date: "Sep", value: 0.75 },
  { date: "Oct", value: 1.15 },
  { date: "Nov", value: 1.05 },
  { date: "Dec", value: 1.45 },
];

export function TokenChart() {
  return (
    <div 
      className="rounded-2xl p-6 h-[400px] w-full relative overflow-hidden border border-transparent backdrop-blur-md"
      style={{ 
        background: 'linear-gradient(rgba(20, 20, 20, 0.7), rgba(20, 20, 20, 0.7)) padding-box, linear-gradient(to bottom right, rgba(24, 99, 225, 0.2), rgba(0, 0, 0, 0)) border-box'
      }}
    >
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-white font-bold text-lg leading-none mb-2">Token Value ($ALPHA)</h3>
          <p className="text-sm text-off-white/60 font-medium">+866% Since Inception</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-primary-blue drop-shadow-[0_0_10px_rgba(24,99,225,0.4)]">$1.45</p>
          <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded font-bold tracking-wide">
            +12.5% Today
          </span>
        </div>
      </div>

      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1863E1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#1863E1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#FFFFFF40", fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#FFFFFF40", fontSize: 12, fontWeight: 500 }}
              tickFormatter={(val) => `$${val}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "rgba(0,0,0,0.8)", 
                borderColor: "rgba(255,255,255,0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
                color: "#fff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
              }}
              itemStyle={{ color: "#1863E1", fontWeight: "bold" }}
              labelStyle={{ color: "rgba(255,255,255,0.6)", marginBottom: "4px", fontSize: "12px" }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#1863E1" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
