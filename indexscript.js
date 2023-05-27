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
  } else if (e.target.dataset.readMore) {
    e.target.parentElement.children[0].classList.remove("line-clamp-3");
  }
});

async function searchTitles() {
  if (searchInputEl.value) {
    const searchTerm = searchInputEl.value.toLowerCase();

    const titleSearchUrl = `${baseUrl}?apikey=${apiKey}&s=${searchTerm}`;

    const response = await fetch(titleSearchUrl);
    const data = await response.json();

    await handleDataResponse(data);
    createReadMoreButtons();
  }
}

function createReadMoreButtons() {
  const plots = document.getElementsByClassName("film-plot");
  Array.prototype.forEach.call(plots, (plot) => {
    if (
      plot.offsetHeight < plot.scrollHeight ||
      plot.offsetWidth < plot.scrollWidth
    ) {
      console.log("overflow");
      console.log(plot.dataset.imdbId);
      plot.parentElement.innerHTML += `<button data-read-more="${plot.dataset.imdbId}">read more</button>`;
      // your element has overflow and truncated
      // show read more / read less button
    } else {
      console.log("no overflow");
      // your element doesn't overflow (not truncated)
    }
  });
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
