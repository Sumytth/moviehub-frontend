import React from 'react';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';

const Watchlist = () => {
  const { watchlist } = useWatchlist();

  return (
    <div className="w-full min-h-screen pt-24 px-4 md:px-12 text-white">
      <h1 className="text-3xl font-bold mb-8 text-white flex items-center gap-2">
         My Watchlist
      </h1>
      
      {watchlist.length === 0 ? (
         <div className="text-center mt-24 text-gray-500">
             <h2 className="text-xl">Your watchlist is empty</h2>
             <p className="mt-2 text-sm">Add movies you want to watch later by clicking the heart icon.</p>
         </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {watchlist.map((movie) => (
             <div key={movie.id} className="relative">
                <MovieCard item={movie} />
             </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
