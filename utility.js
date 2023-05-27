function updateLocalStorage(id) {
  const localIds = JSON.parse(localStorage.getItem("localIds"));
  // if id in local storage, remove it!
  if (isIdInLocalStorage(id)) {
    const idIndexInLocalIds = localIds.indexOf(id);
    localIds.splice(idIndexInLocalIds, 1);
    if (localIds.length) {
      localStorage.setItem("localIds", JSON.stringify(localIds));
    } else {
      localStorage.removeItem("localIds");
    }
  }
  // if id not in local storage, add it!
  else {
    if (localStorageExists()) {
      localIds.push(id);
      localStorage.setItem("localIds", JSON.stringify(localIds));
      // if local storage doesn't exist, initialize it!
    } else {
      localStorage.setItem("localIds", JSON.stringify([id]));
    }
  }
}

function isIdInLocalStorage(id) {
  const currentLocalStorage = JSON.parse(localStorage.getItem("localIds"));
  return localStorageExists() && currentLocalStorage.includes(id);
}

//short function used for sake of readability
function localStorageExists() {
  return !!localStorage.getItem("localIds");
}

function watchListIconUpdate(e) {
  let currentIconTarget;
  if (e.target.className === "watchlist-button") {
    currentIconTarget = e.target;
  } else {
    currentIconTarget = e.target.parentElement;
  }
  if (currentIconTarget.children[0].classList[1] === "fa-circle-plus") {
    currentIconTarget.innerHTML = `
      <i class="fa-solid fa-circle-minus"></i> Watchlist`;
  } else {
    currentIconTarget.innerHTML = `
      <i class="fa-solid fa-circle-plus"></i> Watchlist`;
  }
}
const baseUrl = "https://www.omdbapi.com/";
const apiKey = "f5d1bb34";

async function getFilmResultsHtml(ids) {
  let html = "";

  for (let id of ids) {
    const imdbIdSearchUrl = `${baseUrl}?apikey=${apiKey}&i=${id}`;

    const response = await fetch(imdbIdSearchUrl);
    const data = await response.json();

    let watchlistIcon;
    if (isIdInLocalStorage(id)) {
      watchlistIcon = `minus`;
    } else {
      watchlistIcon = `plus`;
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
                    <i class="fa-solid fa-circle-${watchlistIcon}"></i>
                    Watchlist
                  </button>
                </div>
                <div class="bottom">
                  <p class="film-plot line-clamp-3" data-imdb-id="${id}">${data["Plot"]}</p>
                </div>
              </div>
          </section>
          `;
  }

  return html;
}

function limitPlotLength(plot) {
  const limitLength = 140;
  if (plot.length > limitLength) {
    const truncatedPlot = plot.slice(0, limitLength);
    return `
    ${truncatedPlot}...
    <button>read more</button>
      `;
  } else {
    return plot;
  }
}

export {
  updateLocalStorage,
  getFilmResultsHtml,
  baseUrl,
  apiKey,
  watchListIconUpdate,
};
