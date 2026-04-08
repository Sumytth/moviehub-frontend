import React, { useEffect, useState } from 'react';
import { movieService } from '../services/movieService';
import MovieRow from '../components/MovieRow';
import { MovieRowSkeleton, BannerSkeleton } from '../components/SkeletonLoader';
import { getImageUrl } from '../utils/formatters';

const Home = () => {
  const [movies, setMovies] = useState({
    trending: [],
    popular: [],
    topRated: [],
    upcoming: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trending, popular, topRated, upcoming] = await Promise.all([
          movieService.getTrendingMovies(),
          movieService.getPopularMovies(),
          movieService.getTopRatedMovies(),
          movieService.getUpcomingMovies()
        ]);
        
        setMovies({
          trending: trending.results,
          popular: popular.results,
          topRated: topRated.results,
          upcoming: upcoming.results
        });
      } catch (error) {
        console.error("Error fetching home movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const heroMovie = movies.trending[Math.floor(Math.random() * movies.trending.length)];

  if (loading) {
    return (
      <div className="w-full">
         <BannerSkeleton />
         <MovieRowSkeleton />
         <MovieRowSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <div className="w-full h-[550px] md:h-[700px] text-white">
        <div className="w-full h-full">
          <div className="absolute w-full h-[550px] md:h-[700px] bg-gradient-to-r from-black/90 to-transparent"></div>
          <div className="absolute w-full h-[550px] md:h-[700px] bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <img 
            className="w-full h-full object-cover" 
            src={getImageUrl(heroMovie?.backdrop_path, 'original')} 
            alt={heroMovie?.title} 
          />
          <div className="absolute w-full top-[30%] md:top-[40%] p-4 md:p-12">
            <h1 className="text-3xl md:text-5xl font-bold max-w-[800px]">{heroMovie?.title}</h1>
            <div className="my-6 flex gap-4">
              <button className="border bg-gray-300 text-black border-gray-300 py-2 px-6 font-semibold hover:bg-white transition">
                Play
              </button>
              <button className="border border-gray-300  py-2 px-6 hover:bg-white/20 transition">
                Watch Later
              </button>
            </div>
            <p className="text-gray-400 text-sm">Released: {heroMovie?.release_date}</p>
            <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200 mt-2 line-clamp-4">
              {heroMovie?.overview}
            </p>
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="-mt-16 md:-mt-32 relative z-20 pb-12">
         <MovieRow title="Trending Now" movies={movies.trending} />
         <MovieRow title="Popular" movies={movies.popular} />
         <MovieRow title="Top Rated" movies={movies.topRated} />
         <MovieRow title="Upcoming" movies={movies.upcoming} />
      </div>
    </div>
  );
};

export default Home;
