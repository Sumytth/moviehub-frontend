import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { movieService } from '../services/movieService';
import { useWatchlist } from '../context/WatchlistContext';
import { DetailSkeleton } from '../components/SkeletonLoader';
import { getImageUrl, formatDate } from '../utils/formatters';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addMovie, removeMovie, isInWatchlist } = useWatchlist();

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        setLoading(true);
        const data = await movieService.getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecord();
  }, [id]);

  if (loading) return <DetailSkeleton />;
  if (error) return <div className="text-white text-center mt-32">{error}</div>;
  if (!movie) return null;

  const saved = isInWatchlist(movie.id);
  const toggleWatchlist = () => {
    if (saved) removeMovie(movie.id);
    else addMovie(movie);
  };

  const trailer = movie.videos?.results?.find((vid) => vid.type === "Trailer" && vid.site === "YouTube");

  return (
    <div className="w-full text-white">
      <div className="w-full h-[600px] relative">
        <div className="absolute w-full h-[600px] bg-gradient-to-r from-black/90 to-transparent"></div>
        <div className="absolute w-full h-[600px] bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <img 
          className="w-full h-full object-cover" 
          src={getImageUrl(movie.backdrop_path || movie.poster_path, 'original')} 
          alt={movie.title} 
        />
        
        <div className="absolute w-full top-[20%] p-4 md:p-12 flex flex-col md:flex-row gap-8 items-start">
           <img 
              className="w-[200px] md:w-[300px] rounded shadow-2xl hidden md:block" 
              src={getImageUrl(movie.poster_path)} 
              alt={movie.title} 
           />
           <div className="flex flex-col gap-4 mt-8 md:mt-0 max-w-[800px]">
              <h1 className="text-4xl md:text-6xl font-bold">{movie.title}</h1>
              <div className="flex flex-wrap gap-4 items-center text-sm text-gray-300">
                <span className="font-bold text-green-400">{movie.vote_average?.toFixed(1)} Rating</span>
                <span>|</span>
                <span>{formatDate(movie.release_date)}</span>
                <span>|</span>
                <span>{movie.runtime} min</span>
              </div>
              
              <div className="flex gap-2 mb-2">
                 {movie.genres?.map(g => (
                    <span key={g.id} className="bg-gray-800 text-xs px-3 py-1 rounded-full">
                      {g.name}
                    </span>
                 ))}
              </div>

              <p className="text-gray-200 text-lg leading-relaxed">{movie.overview}</p>
              
              <div className="mt-4 flex gap-4">
                 {trailer && (
                   <a 
                     href={`https://www.youtube.com/watch?v=${trailer.key}`} 
                     target="_blank" 
                     rel="noreferrer"
                     className="bg-netflix text-white py-3 px-8 font-semibold rounded hover:bg-red-700 transition"
                   >
                     Watch Trailer
                   </a>
                 )}
                 <button 
                   onClick={toggleWatchlist} 
                   className="flex items-center gap-2 border border-gray-400 py-3 px-8 font-semibold rounded hover:bg-white/10 transition"
                 >
                   {saved ? <FaHeart className="text-netflix" /> : <FaRegHeart />}
                   {saved ? 'Remove' : 'Watchlist'}
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
