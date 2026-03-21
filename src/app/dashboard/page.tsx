import { Navbar } from "@/components/Navbar";
import { TokenChart } from "@/components/TokenChart";
import { BurnTracker } from "@/components/BurnTracker";
import { QuickSwap } from "@/components/QuickSwap";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black relative pb-24">
      <Navbar />
      
      {/* Spacer for fixed navbar */}
      <div className="h-28" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Movie Equity</h1>
          <p className="text-off-white/60 font-medium">Manage your portfolio, track burns, and trade $ALPHA.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Section */}
          <div className="lg:col-span-2 space-y-6">
            <TokenChart />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BurnTracker />
              
              {/* Extra Widget Placeholder to match grid layout aesthetics */}
              <div className="bg-deep-grey/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-blue/10 rounded-full blur-[50px]" />
                <h3 className="text-white font-bold text-lg mb-2">Total Dividends</h3>
                <p className="text-sm text-off-white/60 mb-6">Lifetime box-office yield</p>
                <p className="text-4xl font-black text-white">$45,290</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs bg-primary-blue/20 text-primary-blue font-bold px-2 py-1 rounded">Next Payout: 14 Days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <QuickSwap />

            {/* Quick Stats */}
            <div className="bg-deep-grey/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
               <h3 className="text-white font-bold text-sm text-off-white/60 uppercase tracking-wider mb-6">Network Stats</h3>
               <div className="space-y-4">
                 <div className="flex justify-between items-center border-b border-white/5 pb-4">
                   <span className="text-white/80 font-medium text-sm">Market Cap</span>
                   <span className="text-white font-bold">$14.5M</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/5 pb-4">
                   <span className="text-white/80 font-medium text-sm">24h Volume</span>
                   <span className="text-white font-bold">$1.2M</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-white/80 font-medium text-sm">Holders</span>
                   <span className="text-white font-bold">12,408</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
