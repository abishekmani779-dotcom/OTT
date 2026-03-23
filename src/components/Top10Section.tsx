"use client";

import { useEffect, useState, useRef } from "react";
import { Play } from "lucide-react";
import Link from "next/link";

const top10Movies = [
  { badge: "NEW",          title: "Kantara",       image: "/kantara-poster.jpg" },
  { badge: "FREES",        title: "Singham Again", image: "https://img.freepik.com/free-vector/professional-suspense-movie-poster_742173-3470.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=400&q=80" },
  { badge: "MINI EPISODE", title: "Amaran",        image: "https://img.freepik.com/free-vector/realistic-horror-movie-poster_23-2149721019.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=400&q=80" },
  { badge: "FREES",        title: "Devara",        image: "https://img.freepik.com/premium-psd/action-movie-poster-design_528542-2204.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=400&q=80" },
  { badge: "NEW",          title: "GOAT",          image: "https://img.freepik.com/premium-psd/cinematic-movie-poster-template-thriller-drama-film_574474-2444.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=400&q=80" },
  { badge: "MINI EPISODE", title: "Kalki 2898",    image: "https://img.freepik.com/premium-psd/movie-poster_1009850-334.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=400&q=80" },
  { badge: "FREES",        title: "Lucky Baskhar", image: "https://img.freepik.com/free-vector/movie-poster-template-design_742173-20647.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=400&q=80" },
  { badge: "NEW",          title: "Vettaiyan",     image: "https://img.freepik.com/free-vector/cinema-movie-festival-vintage-poster_1284-52101.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=400&q=80" },
  { badge: "FREES",        title: "Salaar",        image: "https://img.freepik.com/free-psd/jazz-concert-print-template_23-2149063916.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=400&q=80" },
  { badge: "MINI EPISODE", title: "Animal",        image: "https://img.freepik.com/free-vector/realistic-cinema-movie-club-poster-template-with-camcorder-clapper-tapes-red-curtain-background-vector-illustration_1284-77039.jpg?uid=R73719490&ga=GA1.1.1915093804.1774120733&semt=ais_hybrid&w=400&q=80" },
];

function AnimatedRankNumber({ target, delay }: { target: number; delay: number }) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (started.current) return;
      started.current = true;
      let current = 0;
      const steps = target * 3;
      const interval = setInterval(() => {
        current += 1;
        setDisplay((current % (target + 1)));
        if (current >= steps) {
          setDisplay(target);
          clearInterval(interval);
        }
      }, 40);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay]);

  return <>{display}</>;
}

export function Top10Section() {
  return (
    <section>
      <h2 className="text-white font-medium text-lg mb-4">Top 10 Movies</h2>

      {/*
        Scroll container — hides the native scrollbar for a clean look.
        Each card slot is 115px wide. At 1400px viewport with ~48px padding:
        usable ≈ 1350px → 1350/115 ≈ 11.7, but the large rank number
        partially bleeds into the next slot, so ~6-7 full cards are "visible".
        The rest peek or scroll in.
      */}
      <div className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-4">
        <div className="flex gap-4 px-2" style={{ minWidth: "max-content" }}>
          {top10Movies.map((movie, i) => (
            /*
              Each unit:
              - total slot width  = 115px
              - rank number       = 120px font, absolute, bottom-left, z=0
              - poster            = 90×160px, absolute, top-right, z=10
              - slot height       = 190px (number bleeds to bottom, poster sits top)
            */
            <Link
              href="/movie/thaai-kezhavi"
              key={i}
              className="relative flex-shrink-0 cursor-pointer group block"
              style={{ width: 210, height: 240 }}
            >
              {/* ── Large ghost rank number ── */}
              <div
                className="absolute select-none pointer-events-none z-0 font-black leading-none"
                style={{
                  fontSize: 170,
                  bottom: -12,
                  left: 0,
                  color: "rgba(255,255,255,0.12)",
                  fontFamily: "'Figtree', 'Arial Black', Arial, sans-serif",
                  letterSpacing: "-0.06em",
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.07)",
                }}
              >
                <AnimatedRankNumber target={i + 1} delay={i * 110} />
              </div>

              {/* ── Poster card ── */}
              <div
                className="absolute top-0 right-0 z-10 rounded-xl overflow-hidden
                            shadow-[0_8px_24px_rgba(0,0,0,0.8)]
                            transition-all duration-300
                            group-hover:scale-[1.05] group-hover:-translate-y-2"
                style={{ width: 152, height: 215 }}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${movie.image})` }}
                />
                {/* Subtle bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                {/* Badge — top-right corner */}
                <div className="absolute top-0 right-0">
                  {movie.badge === "NEW" && (
                    <span className="block bg-[#E5B80B] text-black text-[7px] font-black px-1.5 py-0.5 rounded-bl-lg tracking-widest leading-tight">
                      NEW
                    </span>
                  )}
                  {movie.badge === "FREES" && (
                    <span className="block bg-[#E5B80B] text-black text-[7px] font-black px-1.5 py-0.5 rounded-bl-lg tracking-widest leading-tight">
                      FREES
                    </span>
                  )}
                  {movie.badge === "MINI EPISODE" && (
                    <span className="block bg-[#D92D95] text-white text-[6px] font-black px-1 py-0.5 rounded-bl-lg tracking-wide leading-tight whitespace-nowrap">
                      NEW EPISODE
                    </span>
                  )}
                </div>

                {/* Hover play overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
