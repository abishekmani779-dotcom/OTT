import { Play } from "lucide-react";

interface MovieCardProps {
  title: string;
  image: string;
  genre: string;
  raisedContext: string;
}

export function MovieCard({ title, image, genre, raisedContext }: MovieCardProps) {
  return (
    <div className="group relative w-full aspect-[2/3] rounded-xl overflow-hidden cursor-pointer border-2 border-deep-grey hover:border-primary-blue hover:shadow-blue-glow transition-all duration-500">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
      
      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end z-10">
        <span className="text-xs font-bold text-primary-blue uppercase tracking-wider mb-1 drop-shadow-md">
          {genre}
        </span>
        <h3 className="text-white font-bold text-xl leading-tight mb-2 drop-shadow-lg">
          {title}
        </h3>
        
        <div className="flex items-center justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
          <span className="text-xs font-medium text-off-white/80">
            {raisedContext}
          </span>
          <div className="w-8 h-8 rounded-full bg-primary-blue flex items-center justify-center shadow-blue-glow">
            <Play className="w-4 h-4 fill-white text-white ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
