import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
       navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <nav className={`fixed w-full z-[100] top-0 transition-all duration-300 ${isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <Link to="/" className="text-netflix text-2xl md:text-4xl font-bold cursor-pointer">
          MOVIEHUB
        </Link>
        <div className="flex items-center gap-6">
          <form onSubmit={handleSearchSubmit} className="hidden sm:flex relative items-center">
            <input 
              type="text" 
              placeholder="Titles, people, genres" 
              className="bg-black/40 border border-white/20 text-white px-4 py-1.5 focus:outline-none focus:border-white/60 focus:bg-black/80 transition-all placeholder:text-gray-400 w-[200px] xl:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 text-gray-400 hover:text-white transition">
              <FaSearch />
            </button>
          </form>
          <Link to="/search" className="sm:hidden text-white hover:text-gray-300 transition">
             <FaSearch className="text-xl" />
          </Link>
          <Link to="/watchlist" className="flex items-center gap-2 text-white hover:text-gray-300 transition">
            <FaHeart className="text-netflix text-xl" />
            <span className="hidden md:block font-medium">Watchlist</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
