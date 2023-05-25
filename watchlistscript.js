import { updateLocalStorage, isIdInLocalStorage } from "./utility.js";

const baseUrl = "https://www.omdbapi.com/";
const apiKey = "f5d1bb34";

const watchListEl = document.getElementById("watchlist");

document.addEventListener("click", (e) => {
  if (e.target.className === "watchlist-button") {
    updateLocalStorage(e.target.dataset.imdbId);
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
        <p>Your watchlist is looking a little empty...</p>
        <a href="./index.html">Let's add some movies!</a>
    `;
  }
}

async function getFilmResultsHtml(ids) {
  let html = "";

  for (let id of ids) {
    const imdbIdSearchUrl = `${baseUrl}?apikey=${apiKey}&i=${id}`;

    const response = await fetch(imdbIdSearchUrl);
    const data = await response.json();

    let watchlistIcon;
    if (isIdInLocalStorage(id)) {
      watchlistIcon = `<i class="fa-solid fa-circle-minus"></i>`;
    } else {
      watchlistIcon = `<i class="fa-solid fa-circle-plus"></i>`;
    }

    html += `
          <section class="film-summary">
              <div class="film-poster">
                  <img src="${data["Poster"]}" />
              </div>
              <div class="film-details-box">
                <div class="top">
                  <p class="film-title">${data["Title"]}</p>
                  <i class="fa-solid fa-star"></i>
                  <p class="film-rating">${data["imdbRating"]}</p>
                </div>
                <div class="middle">
                  <p class="film-details">${data["Runtime"]}</p>
                  <p class="film-details">${data["Genre"]}</p>
                  
                  <button 
                    data-imdb-id="${id}" 
                    class="watchlist-button">
                    ${watchlistIcon} 
                    Watchlist
                  </button>
                </div>
                <div class="bottom">
                  <p class="film-plot">${data["Plot"]}</p>
                </div>
              </div>
          </section>
          `;
  }

  return html;
}
