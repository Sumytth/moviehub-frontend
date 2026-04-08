import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WatchlistProvider } from './context/WatchlistContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <WatchlistProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </Router>
    </WatchlistProvider>
  );
}

export default App;
