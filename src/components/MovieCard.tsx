import { Play } from "lucide-react";

interface MovieCardProps {
  title: string;
  image: string;
  genre: string;
  raisedContext: string;
}

export function MovieCard({ title, image, genre, raisedContext }: MovieCardProps) {
  return (
    <div className="group relative w-full aspect-[2/3] rounded-xl overflow-hidden cursor-pointer border border-[#111] hover:border-[#1863E1] hover:scale-105 hover:shadow-[0_0_15px_rgba(24,99,225,0.8)] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end z-10 transition-transform duration-500">
        <span className="text-[10px] font-black tracking-widest text-[#1863E1] uppercase mb-1.5 drop-shadow-md">
          {genre}
        </span>
        <h3 className="text-white font-black text-xl leading-tight mb-2 drop-shadow-lg tracking-tight">
          {title}
        </h3>
        
        <div className="flex items-center justify-between h-8 mt-2 overflow-hidden">
          <span className="text-xs font-medium text-white/60">
            {raisedContext}
          </span>
          {/* Play Icon - hidden normally, shown on hover with 0.3s ease-in */}
          <div className="w-8 h-8 rounded-full bg-[#1863E1] flex items-center justify-center shadow-[0_0_10px_rgba(24,99,225,0.6)] opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 ease-in">
            <Play className="w-4 h-4 fill-white stroke-transparent ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
