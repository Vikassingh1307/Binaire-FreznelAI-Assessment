import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { tmdbClient } from '../services/apiClient';
import { lazyLoader } from '../services/LazyImageObserver';
import { Pagination } from '../components/ui/Pagination';

export function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const mainImageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await tmdbClient.fetchMovies('/movie/popular', currentPage);
        if (data && data.results) {
          setMovies(data.results.slice(0, 12)); // Get enough items for pagination testing
          setTotalPages(Math.min(data.total_pages, 500)); // TMDB limits to 500 pages
          setActiveIndex(0);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [currentPage]);

  // Lazy loading observer hook
  useEffect(() => {
    const images = document.querySelectorAll('.lazy-image');
    images.forEach(img => lazyLoader.observe(img as HTMLImageElement));

    return () => {
      images.forEach(img => lazyLoader.unobserve(img as HTMLImageElement));
    };
  }, [movies]);

  // GSAP Animation when active index changes
  useEffect(() => {
    if (mainImageRef.current && titleRef.current) {
      gsap.fromTo(mainImageRef.current, 
        { opacity: 0.5, x: 20 }, 
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.1 }
      );
    }
  }, [activeIndex]);

  const activeMovie = movies[activeIndex];

  return (
    <div className="max-w-[940px] mx-auto py-8 px-4 flex gap-8">
      {/* Left Sidebar */}
      <aside className="w-[200px] hidden lg:block text-sm">
        <div className="group cursor-pointer focus-within:ring-2 focus-within:ring-white rounded">
          <img 
            data-src="https://store.cloudflare.steamstatic.com/public/images/v6/gift_cards_brazilian.png" 
            alt="Gift Cards" 
            className="lazy-image mb-6 w-full opacity-0 transition-opacity duration-500 rounded outline-none" 
            tabIndex={0}
          />
        </div>
        
        <h2 className="text-[#54a5d4] uppercase font-semibold mb-2">Browse Categories</h2>
        <ul className="space-y-1 text-[#2f89bc]">
          {['Top Sellers', 'New Releases', 'Upcoming', 'Specials', 'VR Titles', 'Controller Friendly'].map(cat => (
            <li key={cat}>
              <a 
                href="#" 
                className="block p-1 hover:bg-[#316282] hover:text-white focus-visible:bg-[#316282] focus-visible:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded transition-colors"
              >
                {cat}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-hidden">
        <h2 className="text-white text-lg tracking-wide mb-3">FEATURED & RECOMMENDED</h2>
        
        {loading ? (
          <div className="h-[353px] bg-[#1b2838] animate-pulse rounded shadow-lg"></div>
        ) : movies.length > 0 ? (
          <div className="relative bg-[#0f1922] shadow-[0_0_15px_rgba(0,0,0,0.8)] flex flex-col md:flex-row group transition-transform focus-within:ring-2 focus-within:ring-blue-400">
            {/* Main Active Image Area */}
            <div className="md:w-[616px] h-[353px] overflow-hidden relative cursor-pointer outline-none" tabIndex={0} role="button">
              <img 
                ref={mainImageRef}
                src={`https://image.tmdb.org/t/p/w780${activeMovie.backdrop_path}`} 
                alt={activeMovie.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 ref={titleRef} className="text-2xl text-white font-semibold mb-1 shadow-black drop-shadow-md">{activeMovie.title}</h3>
                <div className="flex justify-between items-center text-xs">
                  <span className="bg-[#4c6b22] text-[#a4d007] px-1 py-0.5 rounded-sm">Now Available</span>
                  <div className="text-right bg-black/50 px-2 py-1 rounded">
                    <span className="text-[#a4d007] font-semibold">Free to Play</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Selector Area */}
            <div className="flex-1 flex md:flex-col overflow-x-auto md:overflow-visible bg-[#0f1922] p-2 gap-2">
              <p className="hidden md:block text-xs text-gray-400 mb-1">More featured titles:</p>
              {movies.slice(0, 4).map((movie, idx) => (
                <div 
                  key={movie.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={activeIndex === idx}
                  className={`relative h-[68px] cursor-pointer overflow-hidden rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 ${
                    activeIndex === idx ? 'ring-2 ring-[#67c1f5] scale-105 z-10' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img 
                    data-src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`} 
                    alt={movie.title}
                    className="lazy-image w-full h-full object-cover opacity-0 transition-opacity duration-500"
                  />
                  {activeIndex === idx && <div className="absolute inset-0 bg-[#67c1f5]/20 pointer-events-none"></div>}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-white">No data found.</div>
        )}

        {/* Custom Pagination */}
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </main>
    </div>
  );
}
