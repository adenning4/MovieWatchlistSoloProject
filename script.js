const baseUrl = "https://www.omdbapi.com/";
const apiKey = "f5d1bb34";

const searchInputEl = document.getElementById("search-input-el");
const searchButtonEl = document.getElementById("search-button-el");
const searchResultsEl = document.getElementById("search-results");

searchButtonEl.addEventListener("click", searchTitles);

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

async function getFilmResultsHtml(ids) {
  let html = "";

  for (let id of ids) {
    const imdbIdSearchUrl = `${baseUrl}?apikey=${apiKey}&i=${id}`;

    const response = await fetch(imdbIdSearchUrl);
    const data = await response.json();
    html += `
          <section class="film-summary">
              <div class="film-poster">
                  <img src="${data["Poster"]}" />
              </div>
              <div class="film-details-box">
                <div class="top">
                  <p class="film-title">${data["Title"]}</p>
                  <img src="./icons/star-icon.png" />
                  <p class="film-rating">${data["imdbRating"]}</p>
                </div>
                <div class="middle">
                  <p class="film-details">${data["Runtime"]}</p>
                  <p class="film-details">${data["Genre"]}</p>
                  <button class="watchlist-button">Watchlist</button>
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
