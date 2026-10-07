import { useEffect, useState } from 'react';
import { tmdbClient } from '../services/apiClient';
import { lazyLoader } from '../services/LazyImageObserver';
import gsap from 'gsap';

export function Category() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await tmdbClient.fetchMovies('/movie/upcoming', 1);
        if (data && data.results) {
          setGames(data.results.slice(0, 12));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    const images = document.querySelectorAll('.lazy-image');
    images.forEach(img => lazyLoader.observe(img as HTMLImageElement));

    if (games.length > 0) {
      gsap.fromTo('.category-card', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" }
      );
    }
    
    return () => images.forEach(img => lazyLoader.unobserve(img as HTMLImageElement));
  }, [games]);

  return (
    <div className="w-full text-[#c6d4df]">
      {/* Category Banner */}
      <div className="w-full h-[250px] relative bg-[#0a141d] flex items-center justify-center overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-green-900/40 opacity-50 z-0"></div>
        <div className="z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-widest drop-shadow-lg mb-2">Exploration & Open World</h1>
          <p className="text-[#a3d4ff] text-lg">Browse the biggest open world experiences</p>
        </div>
      </div>

      <div className="max-w-[940px] mx-auto px-4">
        {/* Category Tabs */}
        <div className="flex gap-1 border-b border-[#2a475e] mb-6">
          <button className="bg-[#2a475e] text-white px-4 py-2 font-semibold hover:bg-[#316282] focus-visible:outline-white">New & Trending</button>
          <button className="bg-transparent text-[#67c1f5] px-4 py-2 hover:bg-[#2a475e]/50 focus-visible:outline-white">Top Sellers</button>
          <button className="bg-transparent text-[#67c1f5] px-4 py-2 hover:bg-[#2a475e]/50 focus-visible:outline-white">Top Rated</button>
        </div>

        {/* Grid View */}
        {loading ? (
          <div className="text-center py-10 animate-pulse text-white">Loading category...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-12">
            {games.map(game => (
              <a 
                href={`#game-${game.id}`} 
                id={`game-${game.id}`}
                key={game.id} 
                className="category-card bg-[#16202d] hover:bg-[#1f2f42] transition-colors shadow-lg group focus-visible:outline-white focus-visible:ring-2 target:ring-4 target:ring-[#67c1f5] target:scale-105 outline-none"
              >
                <div className="w-full aspect-[3/4] relative overflow-hidden bg-black">
                  <img 
                    data-src={`https://image.tmdb.org/t/p/w500${game.poster_path}`} 
                    alt={game.title} 
                    className="lazy-image w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-0.5 text-xs font-semibold rounded">
                    $29.99
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-white text-sm font-semibold truncate group-hover:text-[#67c1f5] transition-colors">{game.title}</h4>
                  <p className="text-xs text-[#8f98a0] mt-1 line-clamp-2">{game.overview}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
