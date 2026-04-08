import React, { useRef } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies }) => {
  const sliderRef = useRef(null);

  const slide = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => slide('left')}
          className="bg-white/30 left-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-50 hidden group-hover:block"
          size={40}
        />
        <div ref={sliderRef} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative pl-2 pr-2">
          {movies && movies.map((item, id) => (
            <MovieCard key={id} item={item} />
          ))}
        </div>
        <MdChevronRight
          onClick={() => slide('right')}
          className="bg-white/30 right-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-50 hidden group-hover:block"
          size={40}
        />
      </div>
    </div>
  );
};

export default MovieRow;
