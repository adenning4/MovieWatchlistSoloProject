import {
  updateLocalStorage,
  watchListIconUpdate,
  getFilmResultsHtml,
  baseUrl,
  apiKey,
} from "./utility.js";

const searchInputEl = document.getElementById("search-input-el");
const searchResultsEl = document.getElementById("search-results");

document.addEventListener("click", (e) => {
  if (e.target.id === "search-button-el") {
    searchTitles();
  } else if (e.target.className === "watchlist-button") {
    updateLocalStorage(e.target.dataset.imdbId);
    watchListIconUpdate(e);
  } else if (e.target.parentElement.className === "watchlist-button") {
    updateLocalStorage(e.target.parentElement.dataset.imdbId);
    watchListIconUpdate(e);
  }
});

async function searchTitles() {
  if (searchInputEl.value) {
    const searchTerm = searchInputEl.value.toLowerCase();

    const titleSearchUrl = `${baseUrl}?apikey=${apiKey}&s=${searchTerm}`;

    const response = await fetch(titleSearchUrl);
    const data = await response.json();

    handleDataResponse(data);
  }
}

async function handleDataResponse(data) {
  if (data.Response === "True") {
    const imdbIDs = [];
    data.Search.forEach((film) => {
      imdbIDs.push(film.imdbID);
    });
    const filmResultsHtml = await getFilmResultsHtml(imdbIDs);
    searchResultsEl.innerHTML = filmResultsHtml;
  } else {
    searchResultsEl.innerHTML = `
          <div class="empty-search-results">
              Unable to find what you're looking for. Please try another search.
          </div>
      `;
  }
}