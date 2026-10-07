import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Layout/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Search } from './pages/Search';
import { Category } from './pages/Category';
import { useEffect, useState } from 'react';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-[#1b2838] font-sans flex flex-col">
        {!isOnline && (
          <div className="bg-[#a84732] text-white text-center py-2 text-sm font-semibold uppercase tracking-wider sticky top-0 z-50">
            You are currently offline. Using cached data.
          </div>
        )}
        
        <Navbar />
        
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="/category" element={<Category />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
