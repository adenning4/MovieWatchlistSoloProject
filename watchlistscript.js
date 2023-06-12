import { updateLocalStorage, getFilmResultsHtml } from "./utility.js";

const watchListEl = document.getElementById("watchlist");

document.addEventListener("click", (e) => {
  if (e.target.className === "watchlist-button") {
    updateLocalStorage(e.target.dataset.imdbId);
    renderWatchListHtml();
  } else if (e.target.parentElement.className === "watchlist-button") {
    updateLocalStorage(e.target.parentElement.dataset.imdbId);
    renderWatchListHtml();
  }
});

renderWatchListHtml();

function renderWatchListHtml() {
  const watchlist = localStorage.getItem("localIds");

  if (watchlist) {
    getFilmResultsHtml(JSON.parse(watchlist)).then(
      (data) => (watchListEl.innerHTML = data)
    );
  } else {
    watchListEl.innerHTML = `
      <div class="empty-watchlist-notice">
        <p>Your watchlist is looking a little empty...</p>
        <a href="./index.html">
          <i class="fa-solid fa-circle-plus"></i> Let's add some movies!
        </a>
      </div>
    `;
  }
}
