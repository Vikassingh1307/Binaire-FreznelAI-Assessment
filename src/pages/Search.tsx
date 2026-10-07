import { useEffect, useState } from 'react';
import { tmdbClient } from '../services/apiClient';
import { lazyLoader } from '../services/LazyImageObserver';
import { Pagination } from '../components/ui/Pagination';

export function Search() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await tmdbClient.fetchMovies('/movie/top_rated', currentPage);
        if (data && data.results) {
          setGames(data.results);
          setTotalPages(Math.min(data.total_pages, 100));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [currentPage]);

  useEffect(() => {
    const images = document.querySelectorAll('.lazy-image');
    images.forEach(img => lazyLoader.observe(img as HTMLImageElement));
    return () => images.forEach(img => lazyLoader.unobserve(img as HTMLImageElement));
  }, [games]);

  return (
    <div className="max-w-[940px] mx-auto py-8 px-4 flex flex-col md:flex-row gap-6 text-[#c6d4df]">
      {/* Search Sidebar / Filters */}
      <aside className="w-full md:w-[250px] flex-shrink-0 text-sm">
        <div className="bg-[#1b2838] p-4 mb-4 border border-[#1b2838]">
          <h3 className="uppercase text-[#54a5d4] mb-2 font-semibold">Narrow by OS</h3>
          <label className="flex items-center gap-2 mb-1 hover:text-white cursor-pointer group">
            <input type="checkbox" defaultChecked className="bg-[#32353c] text-blue-500 rounded focus:ring-blue-500" />
            <span className="group-hover:text-white transition-colors">Windows</span>
          </label>
          <label className="flex items-center gap-2 mb-1 hover:text-white cursor-pointer group">
            <input type="checkbox" className="bg-[#32353c] text-blue-500 rounded focus:ring-blue-500" />
            <span className="group-hover:text-white transition-colors">macOS</span>
          </label>
        </div>

        <div className="bg-[#1b2838] p-4 border border-[#1b2838]">
          <h3 className="uppercase text-[#54a5d4] mb-2 font-semibold">Narrow by Tag</h3>
          {['Action', 'RPG', 'Strategy', 'Adventure'].map(tag => (
            <label key={tag} className="flex items-center gap-2 mb-1 hover:text-white cursor-pointer group">
              <input type="checkbox" className="bg-[#32353c] text-blue-500 rounded focus:ring-blue-500" />
              <span className="group-hover:text-white transition-colors">{tag}</span>
            </label>
          ))}
        </div>
      </aside>

      {/* Main Results */}
      <main className="flex-1">
        <h2 className="text-2xl font-light text-white mb-4">Top Sellers</h2>
        
        {/* Results List */}
        <div className="flex flex-col gap-2">
          {loading ? (
            <div className="text-center py-10 animate-pulse bg-[#1b2838] text-white">Searching the store...</div>
          ) : (
            games.map((game, index) => (
              <a 
                href="#" 
                key={game.id} 
                className="flex bg-[#16202d]/80 hover:bg-[#324a64] border border-[#1b2838] transition-colors focus-visible:outline-white focus-visible:ring-2 p-2 group"
                tabIndex={0}
              >
                <div className="w-[120px] md:w-[200px] h-[60px] md:h-[94px] flex-shrink-0 bg-black">
                  <img 
                    data-src={`https://image.tmdb.org/t/p/w300${game.backdrop_path}`} 
                    alt={game.title} 
                    className="lazy-image w-full h-full object-cover opacity-0 transition-opacity duration-500"
                  />
                </div>
                <div className="flex-1 pl-4 flex flex-col justify-between py-1">
                  <h4 className="text-white text-base md:text-lg group-hover:text-[#67c1f5] transition-colors">{game.title}</h4>
                  <div className="flex gap-2 text-xs text-[#8f98a0]">
                    <span className="hidden md:inline">Win</span>
                    <span className="bg-[#32353c] px-1 rounded">Action</span>
                    <span className="bg-[#32353c] px-1 rounded">Singleplayer</span>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-center px-4 w-[120px]">
                  <span className="text-[#8f98a0] line-through text-xs">$39.99</span>
                  <span className="text-[#a4d007] font-semibold">$19.99</span>
                </div>
              </a>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="mt-4">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </main>
    </div>
  );
}
