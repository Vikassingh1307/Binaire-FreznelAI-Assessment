import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { authService } from '../../services/authService';
import { User } from 'firebase/auth';

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = authService.subscribe((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/');
  };

  return (
    <nav className="bg-[#171d25] text-[#c6d4df] uppercase text-sm font-semibold tracking-wider relative z-50">
      <div className="max-w-[940px] mx-auto flex items-center justify-between h-[104px] px-4">
        {/* Logo Area */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-3xl">🎮</span> STEAM
          </Link>
          <div className="hidden md:flex gap-4">
            <Link to="/" className="hover:text-white hover:underline decoration-blue-500 underline-offset-4 focus-visible:outline-white focus-visible:ring-2 p-1">Store</Link>
            <Link to="/search" className="hover:text-white p-1">Search</Link>
            <Link to="/category" className="hover:text-white p-1">Categories</Link>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex flex-col items-end gap-2">
          <div className="text-xs text-[#b8b6b4] flex gap-2 items-center">
            <button className="bg-[#5c7e10] text-[#e5e4dc] px-2 py-0.5 hover:text-white flex items-center gap-1 focus-visible:outline-white">
              Install Steam
            </button>
            <span>|</span>
            {user ? (
              <>
                <span className="lowercase text-[#a3d4ff]">{user.email}</span>
                <span>|</span>
                <button onClick={handleLogout} className="hover:text-white focus-visible:outline-white">logout</button>
              </>
            ) : (
              <Link to="/login" className="hover:text-white focus-visible:outline-white">login</Link>
            )}
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="search the store" 
              className="bg-[#316282] text-white px-3 py-1 pr-8 rounded-sm italic focus:outline-none focus-within:ring-2 focus-within:ring-white placeholder-[#0f212e]"
            />
            <Search className="w-4 h-4 absolute right-2 top-1.5 text-blue-300" />
          </div>
        </div>
      </div>
    </nav>
  );
}
