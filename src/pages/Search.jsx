import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { movieService } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import { MovieCardSkeleton } from "../components/SkeletonLoader";
import { useDebounce } from "../hooks/useDebounce";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const rawQuery = searchParams.get("q") || "";
  const debouncedQuery = useDebounce(rawQuery, 500);

  const [searchInput, setSearchInput] = useState(rawQuery);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSearchInput(rawQuery);
  }, [rawQuery]);

  useEffect(() => {
    setResults([]);
    setPage(1);
    setError(null);
  }, [debouncedQuery]);

  useEffect(() => {
    if (!debouncedQuery) return;

    const fetchResults = async () => {
      try {
        setLoading(true);

        const data = await movieService.searchMovies(
          debouncedQuery,
          page
        );

        setResults((prev) =>
          page === 1
            ? data.results
            : [...prev, ...data.results]
        );

        setHasMore(data.page < data.total_pages);
      } catch (err) {
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, page]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchInput.trim()) return;

    navigate(
      `/search?q=${encodeURIComponent(searchInput.trim())}`
    );
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((p) => p + 1);
    }
  };

  const lastElementRef = useInfiniteScroll(
    loadMore,
    hasMore,
    loading
  );

  return (
    <div className="w-full min-h-screen pt-24 px-4 md:px-12">
      <form
        onSubmit={handleSearch}
        className="flex gap-2 mb-8 sm:hidden"
      >
        <input
          type="text"
          placeholder="Search movies..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 bg-gray-800 text-white px-4 py-3 rounded outline-none border border-gray-700 focus:border-red-500"
        />

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold"
        >
          Search
        </button>
      </form>

      <h1 className="text-white text-2xl mb-8">
        {debouncedQuery
          ? `Search Results for "${debouncedQuery}"`
          : "Type to search..."}
      </h1>

      {error && (
        <p className="text-red-500">{error}</p>
      )}

      {!debouncedQuery && !loading && (
        <p className="text-gray-400">
          Search for a movie above to get started.
        </p>
      )}

      {debouncedQuery &&
        results.length === 0 &&
        !loading && (
          <p className="text-gray-400">
            No results found.
          </p>
        )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {results.map((movie, idx) => {
          const isLast =
            idx === results.length - 1;

          return (
            <div
              ref={isLast ? lastElementRef : null}
              key={`${movie.id}-${idx}`}
            >
              <MovieCard item={movie} />
            </div>
          );
        })}

        {loading &&
          [...Array(5)].map((_, i) => (
            <MovieCardSkeleton
              key={`skeleton-${i}`}
            />
          ))}
      </div>
    </div>
  );
};

export default Search;