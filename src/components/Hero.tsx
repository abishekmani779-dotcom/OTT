import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AirdropClaimCard } from './AirdropClaimCard';

export function Hero({ onShortsClick }: { onShortsClick?: () => void }) {
  return (
    <div className="w-full flex flex-col md:flex-row h-auto min-h-[500px] md:h-[75vh] pt-[72px] bg-[#0A0A0A]">
      {/* Left Feature (Kantara) */}
      <div className="relative w-full md:w-[65%] h-[500px] md:h-full group overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1.0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/kantara-poster.jpg")' }}
        />
        {/* Gradient overlays to match the dark cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
        
        <div className="relative h-full flex flex-col justify-end p-8 md:p-12 md:pl-16">
          {/* Kantara Logo Image */}
          <div className="relative h-16 md:h-24 w-48 mb-4">
            <Image
              src="/kantara-logo.png"
              alt="Kantara"
              fill
              className="object-contain drop-shadow-[0_0_20px_rgba(242,140,56,0.7)]"
              priority
            />
          </div>
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-off-white/80 font-medium mb-4">
            <span>2025</span>
            <span className="w-1 h-1 rounded-full bg-off-white/40" />
            <span>U/A 13+</span>
            <span className="w-1 h-1 rounded-full bg-off-white/40" />
            <span>1h 26m</span>
            <span className="w-1 h-1 rounded-full bg-off-white/40" />
            <span>3 Languages</span>
            <span className="bg-[#E5B80B] text-black text-xs font-bold px-1.5 py-0.5 rounded ml-2">IMDb 7.3</span>
          </div>
          
          <p className="text-sm text-off-white/60 mb-6 leading-relaxed max-w-xl">
            After a crash-landing, an astronaut is quarantined by a Demonic. Just as disturbing events unfold, she fears something paranormal followed her home.
          </p>
          
          {/* Actions */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/movie/thaai-kezhavi" className="h-10 px-6 rounded-full bg-primary-blue text-white font-bold tracking-wide flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-blue-tint group/btn">
              WATCH
              <Play className="w-4 h-4 fill-white" />
            </Link>
            <Link href="/movie/thaai-kezhavi" className="h-10 px-6 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium backdrop-blur-sm transition-colors flex items-center justify-center">
              Invest Now
            </Link>
          </div>
          
          {/* Airdrop Claim Card replacing the plain progress bar */}
          <AirdropClaimCard />
        </div>
      </div>

      {/* Right Vertical Stack (Shorts) */}
      <div 
        onClick={onShortsClick}
        className="relative w-full md:w-[35%] h-[300px] md:h-full bg-[#121212] flex items-center justify-center overflow-hidden border-l border-white/5 cursor-pointer hover:bg-[#151515] transition-colors group/shorts"
      >
        {/* Background gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/50 to-[#0A0A0A]" />
        
        {/* Stacked Posters */}
        <div className="relative w-48 xl:w-64 h-[120%] flex items-center justify-center -mt-10">
          <div className="absolute w-[80%] h-[70%] bg-zinc-800 rounded-lg -rotate-6 -translate-x-8 opacity-50 overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=400&auto=format&fit=crop" fill className="object-cover" alt="" unoptimized />
          </div>
          <div className="absolute w-[80%] h-[70%] bg-zinc-700 rounded-lg rotate-6 translate-x-8 opacity-50 overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=400&auto=format&fit=crop" fill className="object-cover" alt="" unoptimized />
          </div>
          <div className="relative w-full h-[70%] bg-zinc-900 rounded-lg z-10 shadow-2xl overflow-hidden border border-white/5">
            <Image src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&auto=format&fit=crop" fill className="object-cover" alt="Main Poster" unoptimized />
            <div className="absolute top-6 left-0 right-0 text-center">
               <span className="text-white font-bold tracking-[0.2em] text-xs xl:text-sm uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Soorarai Pottru</span>
            </div>
          </div>
        </div>

        {/* Huge SHORTS Text Overlay */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
            <h2 
            className="text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/95 to-white/20 tracking-[-0.08em] font-figtree"
            style={{ 
              WebkitTextStroke: '0.5px rgba(255,255,255,0.08)',
              filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,1))',
              letterSpacing: "-0.05em"
            }}
          >
            SHORTS
          </h2>
        </div>
      </div>
    </div>
  );
}
