import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWatchlist } from '../context/WatchlistContext';
import { getImageUrl } from '../utils/formatters';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MovieCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addMovie, removeMovie, isInWatchlist } = useWatchlist();
  const saved = isInWatchlist(item.id);
  const navigate = useNavigate();
  const { user } = useAuth();

  const toggleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("Please login to use Watchlist");
      navigate("/login");
      return;
    }

    if (saved) {
      removeMovie(item.id);
    } else {
      addMovie(item);
    }
  };

  return (
    <Link to={`/movie/${item.id}`} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block relative p-2 flex-shrink-0 group">
      <div
        className="w-full aspect-[2/3] relative overflow-hidden rounded-md bg-gray-800 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:z-10 shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          className="w-full h-full object-cover block"
          src={getImageUrl(item?.poster_path || item?.backdrop_path)}
          alt={item?.title}
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white transition-opacity duration-300 flex flex-col justify-between p-4">
          <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
            {item?.title}
          </p>
          <div onClick={toggleWatchlist} className="absolute top-4 left-4 text-gray-300 hover:text-white cursor-pointer z-20">
            {saved ? <FaHeart className="text-netflix text-xl" /> : <FaRegHeart className="text-xl" />}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
