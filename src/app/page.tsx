import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Top10Section } from "@/components/Top10Section";
import { Crown, Play, ArrowRight } from "lucide-react";

export default function Home() {
  const trendingMovies = [
    { title: "Kantara",  views: "$2.1M",  image: "/kantara-poster.jpg", isCrown: true },
    { title: "RRR",      views: "$1.8M",  image: "https://img.freepik.com/free-vector/professional-suspense-movie-poster_742173-3470.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=740&q=80" },
    { title: "Pushpa 2", views: "$1.6M",  image: "https://img.freepik.com/free-vector/realistic-horror-movie-poster_23-2149721019.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=740&q=80" },
    { title: "Vikram",   views: "$1.55M", image: "https://img.freepik.com/premium-psd/cinematic-movie-poster-template-thriller-drama-film_574474-2444.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=740&q=80" },
    { title: "Beast",    views: "$1.3M",  image: "https://img.freepik.com/free-psd/jazz-concert-print-template_23-2149063916.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=740&q=80" },
  ];



  const genres = [
    { name: "Action",    images: ["https://img.freepik.com/premium-psd/action-movie-poster-design_528542-2204.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80", "https://img.freepik.com/free-vector/realistic-horror-movie-poster_23-2149721019.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80", "https://img.freepik.com/free-vector/professional-suspense-movie-poster_742173-3470.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80", "https://img.freepik.com/free-vector/gradient-minimalist-space-movie-poster_742173-6466.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80"] },
    { name: "Adventure", images: ["https://img.freepik.com/free-vector/cinema-movie-festival-vintage-poster_1284-52101.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80", "https://img.freepik.com/premium-psd/cinematic-movie-poster-template-thriller-drama-film_574474-2444.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80", "https://img.freepik.com/free-vector/gradient-minimalist-space-movie-poster_742173-6466.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80", "https://img.freepik.com/premium-psd/action-movie-poster-design_528542-2204.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80"] },
    { name: "Comedy",   images: ["https://img.freepik.com/free-vector/movie-poster-template-design_742173-20647.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80", "https://img.freepik.com/free-psd/jazz-concert-print-template_23-2149063916.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80", "https://img.freepik.com/free-vector/realistic-cinema-movie-club-poster-template-with-camcorder-clapper-tapes-red-curtain-background-vector-illustration_1284-77039.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80", "https://img.freepik.com/free-vector/cinema-movie-festival-vintage-poster_1284-52101.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80"] },
    { name: "Drama",    images: ["https://img.freepik.com/premium-psd/movie-poster_1009850-334.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80", "https://img.freepik.com/premium-psd/cinematic-movie-poster-template-thriller-drama-film_574474-2444.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80", "https://img.freepik.com/free-vector/professional-suspense-movie-poster_742173-3470.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80", "https://img.freepik.com/free-vector/movie-poster-template-design_742173-20647.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80"] },
    { name: "Horror",   images: ["https://img.freepik.com/free-vector/realistic-horror-movie-poster_23-2149721019.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80", "https://img.freepik.com/premium-psd/action-movie-poster-design_528542-2204.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80", "https://img.freepik.com/free-vector/gradient-minimalist-space-movie-poster_742173-6466.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80", "https://img.freepik.com/premium-psd/movie-poster_1009850-334.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=360&q=80"] },
  ];

  const freeTamilMovies = [
    { title: "Soorarai Pottru", rating: "8.7", image: "https://img.freepik.com/free-vector/professional-suspense-movie-poster_742173-3470.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=400&q=80" },
    { title: "Master",          rating: "7.9", image: "https://img.freepik.com/premium-psd/action-movie-poster-design_528542-2204.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=400&q=80" },
    { title: "Vikram",          rating: "8.3", image: "https://img.freepik.com/free-vector/gradient-minimalist-space-movie-poster_742173-6466.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=400&q=80" },
    { title: "Valimai",         rating: "6.8", image: "https://img.freepik.com/premium-psd/movie-poster_1009850-334.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=400&q=80" },
    { title: "Doctor",          rating: "7.5", image: "https://img.freepik.com/free-vector/realistic-horror-movie-poster_23-2149721019.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=400&q=80" },
    { title: "Annaatthe",       rating: "5.9", image: "https://img.freepik.com/premium-psd/cinematic-movie-poster-template-thriller-drama-film_574474-2444.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=400&q=80" },
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] font-sans pb-24 overflow-x-hidden">
      <Navbar />
      <Hero />
      
      {/* Container for all rows */}
      <div className="pl-6 md:pl-12 py-10 space-y-12">
        
        {/* Trending Movie Row */}
        <section>
          <h2 className="text-white font-medium text-lg mb-4">Trending movie</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide pr-6">
            {trendingMovies.map((movie, i) => (
              <div key={i} className="relative min-w-[280px] w-[280px] aspect-video rounded-xl overflow-hidden cursor-pointer group flex-shrink-0">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${movie.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {movie.isCrown && (
                  <div className="absolute top-2 left-2">
                    <Crown className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                  </div>
                )}
                
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-off-white/70 tracking-tight">Vol. Mak...</p>
                    <p className="text-2xl font-bold text-white leading-none tracking-tight">{movie.views}</p>
                  </div>
                  <button className="flex items-center gap-1 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 transition-colors border border-white/10">
                    <span className="text-[10px] font-medium text-white">Play trailer</span>
                    <Play className="w-3 h-3 fill-white text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top 10 Movies Row — animated client component */}
        <Top10Section />

        {/* Genre Row */}
        <section>
          <h2 className="text-white font-medium text-lg mb-4">Genre</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide pr-6">
            {genres.map((genre, i) => (
              <div key={i} className="min-w-[200px] w-[200px] bg-[#151515] hover:bg-[#1A1A1A] border border-white/5 hover:border-white/10 rounded-xl p-3 cursor-pointer transition-colors group flex-shrink-0">
                <div className="grid grid-cols-2 gap-1 mb-4 rounded-lg overflow-hidden">
                  {genre.images.map((img, j) => (
                    <div key={j} className="aspect-square bg-[#222]">
                      <img src={img} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-off-white group-hover:text-white px-1">
                  <span className="text-sm font-medium">{genre.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Free Tamil Movies Row */}
        <section>
          <div className="flex items-center justify-between mb-4 pr-6 md:pr-12">
            <h2 className="text-white font-medium text-lg">Free Tamil Movies</h2>
            <button className="text-off-white/60 hover:text-white text-xs font-medium flex items-center gap-1 transition-colors">
              More <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide pr-6">
            {freeTamilMovies.map((movie, i) => (
              <div key={i} className="relative min-w-[160px] w-[160px] aspect-[2/3] rounded-lg overflow-hidden cursor-pointer group flex-shrink-0">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${movie.image})` }} />
                
                <div className="absolute top-0 right-0 bg-[#E5B80B] text-black text-[10px] font-bold px-2 py-1 rounded-bl-lg tracking-wider z-10 shadow-lg">
                  FREES
                </div>
                
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent p-3 flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1">
                    <span className="text-white font-bold text-lg leading-none">{movie.rating}</span>
                    <span className="text-[9px] text-off-white/80 font-bold bg-[#E5B80B]/20 px-1 py-0.5 rounded text-[#E5B80B]">IMDb</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
      </div>
    </main>
  );
}
