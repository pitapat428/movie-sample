const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTAyNzcxYTQ3YTI4YzIzMDk1OGE0NjJjYmQzMDA2OSIsInN1YiI6IjY2MjlmYTBlZDE4YjI0MDA5YmRlMDEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RmDcbNB7AxtkDNgTYr301oBdcuZiuniDqQyZ2emzlWo",
  },
};

const apiKey = "4102771a47a28c230958a462cbd30069";
const apiUrl = "https://api.themoviedb.org/3/movie/top_rated";
const posterBaseUrl = "https://image.tmdb.org/t/p/w500";
let allMovieList = [];

function createAndAppendMovieCard(movie, container) {
  const { poster_path, title, release_date, overview, vote_average, id } =
    movie;
  const posterUrl = `${posterBaseUrl}${poster_path}`;

  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  movieCard.addEventListener("click", function () {
    alert(`Movie ID: ${id}`);
  });

  movieCard.innerHTML = `
      <img class="movie-poster" src="${posterUrl}" alt="${title}">
      <h2>${title}</h2>
      <p>Released: ${release_date}</p>
      <p>${overview}</p>
      <p>Rating: ${vote_average}</p>
  `;

  container.appendChild(movieCard);
}

async function fetchTopRatedMovies() {
  try {
    const response = await fetch(`${apiUrl}?api_key=${apiKey}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTAyNzcxYTQ3YTI4YzIzMDk1OGE0NjJjYmQzMDA2OSIsInN1YiI6IjY2MjlmYTBlZDE4YjI0MDA5YmRlMDEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RmDcbNB7AxtkDNgTYr301oBdcuZiuniDqQyZ2emzlWo",
      },
    });
    const data = await response.json();
    allMovieList = data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
  }
}

async function initializePage() {
  const movieContainer = document.getElementById("movie-container");
  await fetchTopRatedMovies();
  displayMovies(allMovieList, movieContainer);
}

initializePage();

function displayMovies(data, container) {
  container.innerHTML = "";

  data.forEach((movie) => {
    createAndAppendMovieCard(movie, container);
  });
}

function searchFilter(data, search) {
  const searchKeywords = search.toLowerCase().split(" ");

  return data.filter((movie) => {
    const movieTitle = movie.title.toLowerCase().replace(/\s/g, "");

    return searchKeywords.every((keyword) => movieTitle.includes(keyword));
  });
}

function search(searchTerm) {
  const searchText = searchTerm.trim().toLowerCase();

  if (searchText === "") {
    displayMovies(allMovieList, document.getElementById("movie-container"));
    return;
  }

  const filteredMovies = searchFilter(allMovieList, searchText);
  displayMovies(filteredMovies, document.getElementById("movie-container"));
}

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const searchTerm = document.getElementById("search-input").value;
    search(searchTerm);
  });

document
  .getElementById("search-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const searchTerm = document.getElementById("search-input").value;
    search(searchTerm);
  });
