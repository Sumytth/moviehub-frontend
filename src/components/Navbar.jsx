import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Hide navbar on login page
  if (location.pathname === "/login") {
    return null;
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowDropdown(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Failed to logout");
    }
  };

  return (
    <nav
      className={`fixed w-full z-[100] top-0 transition-all duration-300 ${
        isScrolled
          ? "bg-black shadow-lg"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <Link
          to="/"
          className="text-netflix text-xl md:text-4xl font-bold cursor-pointer"
        >
          MOVIEHUB
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <form
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex relative items-center"
          >
            <input
              type="text"
              placeholder="Titles, people, genres"
              className="bg-black/40 border border-white/20 text-white px-4 py-1.5 focus:outline-none focus:border-white/60 focus:bg-black/80 transition-all placeholder:text-gray-400 w-[200px] xl:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
              type="submit"
              className="absolute right-3 text-gray-400 hover:text-white transition"
            >
              <FaSearch />
            </button>
          </form>

          <Link
            to="/search"
            className="sm:hidden text-white hover:text-gray-300 transition"
          >
            <FaSearch className="text-xl" />
          </Link>

          <Link
            to="/watchlist"
            className="flex items-center gap-2 text-white hover:text-gray-300 transition"
          >
            <FaHeart className="text-netflix text-xl" />
            <span className="hidden md:block font-medium">
              Watchlist
            </span>
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() =>
                  setShowDropdown((prev) => !prev)
                }
              >
                <img
                  src={
                    user.photoURL ||
                    "https://via.placeholder.com/40"
                  }
                  alt="profile"
                  className="w-9 h-9 rounded-full border border-gray-500"
                />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-black border border-gray-700 rounded shadow-lg overflow-hidden">
                  <div className="px-4 py-3 text-sm text-white border-b border-gray-700 truncate">
                    {user.displayName || user.email}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-white hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white bg-red-600 px-4 py-1 rounded hover:text-gray-300 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;