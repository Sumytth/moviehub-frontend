import axiosInstance from './axiosInstance';

export const movieService = {
  getTrendingMovies: async () => {
    const response = await axiosInstance.get('/trending/movie/week');
    return response.data;
  },
  
  getPopularMovies: async () => {
    const response = await axiosInstance.get('/movie/popular');
    return response.data;
  },
  
  getTopRatedMovies: async () => {
    const response = await axiosInstance.get('/movie/top_rated');
    return response.data;
  },
  
  getUpcomingMovies: async () => {
    const response = await axiosInstance.get('/movie/upcoming');
    return response.data;
  },
  
  searchMovies: async (query, page = 1) => {
    const response = await axiosInstance.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  },
  
  getMovieDetails: async (id) => {
    const response = await axiosInstance.get(`/movie/${id}`, {
      params: { append_to_response: 'videos' }
    });
    return response.data;
  }
};
