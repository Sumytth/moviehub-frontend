import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import {
  // getWatchlist,
  subscribeToWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "../services/watchlistService";

const WatchlistContext = createContext(null);

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error(
      "useWatchlist must be used within a WatchlistProvider"
    );
  }

  return context;
};

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setWatchlist([]);
      return;
    }

    const unsubscribe = subscribeToWatchlist(
      user.uid,
      (movies) => {
        setWatchlist(movies);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const addMovie = async (movie) => {
    if (!user) {
      alert("Please login to add movies to your watchlist.");
      return;
    }

    try {
      const exists = watchlist.some(
        (m) => m.id === movie.id
      );

      if (exists) return;

      await addToWatchlist(user.uid, movie);
    } catch (error) {
      console.error("Failed to add movie", error);
    }
  };

  const removeMovie = async (id) => {
    if (!user) {
      alert("Please login to add movies to your watchlist.");
      return;
    }

    try {
      await removeFromWatchlist(user.uid, id);
    } catch (error) {
      console.error("Failed to remove movie", error);
    }
  };

  const isInWatchlist = (id) => {
    return watchlist.some(
      (movie) => movie.id === id
    );
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addMovie,
        removeMovie,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
























// import React, { createContext, useState, useEffect, useContext } from 'react';

// const WatchlistContext = createContext(null);

// export const useWatchlist = () => {
//   const context = useContext(WatchlistContext);
//   if (!context) {
//     throw new Error('useWatchlist must be used within a WatchlistProvider');
//   }
//   return context;
// };

// export const WatchlistProvider = ({ children }) => {
//   const [watchlist, setWatchlist] = useState(() => {
//     try {
//       const item = window.localStorage.getItem('moviehub_watchlist');
//       return item ? JSON.parse(item) : [];
//     } catch (error) {
//       console.error('Error reading from localStorage', error);
//       return [];
//     }
//   });

//   useEffect(() => {
//     try {
//       window.localStorage.setItem('moviehub_watchlist', JSON.stringify(watchlist));
//     } catch (error) {
//       console.error('Error writing to localStorage', error);
//     }
//   }, [watchlist]);

//   const addMovie = (movie) => {
//     setWatchlist((prevOptions) => {
//       if (!prevOptions.find((m) => m.id === movie.id)) {
//         return [...prevOptions, movie];
//       }
//       return prevOptions;
//     });
//   };

//   const removeMovie = (id) => {
//     setWatchlist((prevOptions) => prevOptions.filter((m) => m.id !== id));
//   };

//   const isInWatchlist = (id) => {
//     return watchlist.some((m) => m.id === id);
//   };

//   return (
//     <WatchlistContext.Provider value={{ watchlist, addMovie, removeMovie, isInWatchlist }}>
//       {children}
//     </WatchlistContext.Provider>
//   );
// };
