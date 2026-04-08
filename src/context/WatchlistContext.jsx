import React, { createContext, useState, useEffect, useContext } from 'react';

const WatchlistContext = createContext(null);

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const item = window.localStorage.getItem('moviehub_watchlist');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('moviehub_watchlist', JSON.stringify(watchlist));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [watchlist]);

  const addMovie = (movie) => {
    setWatchlist((prevOptions) => {
      if (!prevOptions.find((m) => m.id === movie.id)) {
        return [...prevOptions, movie];
      }
      return prevOptions;
    });
  };

  const removeMovie = (id) => {
    setWatchlist((prevOptions) => prevOptions.filter((m) => m.id !== id));
  };

  const isInWatchlist = (id) => {
    return watchlist.some((m) => m.id === id);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addMovie, removeMovie, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};
