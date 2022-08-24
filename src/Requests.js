const API_KEY = '64887d01ce3b7648c3958376e66c5c57'

const requests = {
  fetchTrending: `https://api.themoviedb.org/3/movie/550?api_key=64887d01ce3b7648c3958376e66c5c57`,
  fetchNetflixOriginals: `https://api.themoviedb.org/3/discover/movie?api_key=64887d01ce3b7648c3958376e66c5c57&with_networks=213`,
  fetchComedyMovies: `https://api.themoviedb.org/3/discover/movie?api_key=64887d01ce3b7648c3958376e66c5c57&with_genres=35`,
  fetchHorrorMovies: `https://api.themoviedb.org/3/discover/movie?api_key=64887d01ce3b7648c3958376e66c5c57&with_genres=27`,
  fetchRomanceMovies: `https://api.themoviedb.org/3/discover/movie?api_key=64887d01ce3b7648c3958376e66c5c57&with_genres=10749`,
  fetchDocumentaries: `https://api.themoviedb.org/3/discover/movie?api_key=64887d01ce3b7648c3958376e66c5c57&with_genres=99`,
}

export default requests
