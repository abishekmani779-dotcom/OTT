import Link from 'next/link';
import { Search, Crown, LogIn } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] h-[72px] flex items-center justify-between px-6 md:px-8 border-b border-white/5">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-blue rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">OA</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">OwnAlpha</span>
        </Link>
      </div>
      
      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
        <input 
          type="text" 
          placeholder="Search Movies, TV Shows..." 
          className="w-full h-10 bg-[#1A1A1A] border border-white/5 rounded-full pl-5 pr-12 text-sm text-white placeholder:text-off-white/40 focus:outline-none focus:border-primary-blue/50 focus:bg-[#202020] transition-colors"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-off-white/50 hover:text-white transition-colors">
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="h-9 px-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B58A1F] hover:opacity-90 flex items-center gap-2 text-black font-semibold text-sm transition-opacity">
          <Crown className="w-4 h-4 fill-black" />
          Subscriptions
        </button>
        <button className="h-9 px-5 rounded-full bg-[#1A1A1A] hover:bg-[#252525] border border-white/5 flex items-center gap-2 text-white text-sm font-medium transition-colors">
          <LogIn className="w-4 h-4" />
          Login
        </button>
      </div>
    </nav>
  );
}
