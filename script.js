const baseUrl = "https://www.omdbapi.com/";
const apiKey = "f5d1bb34";

const searchInputEl = document.getElementById("search-input-el");
const searchButtonEl = document.getElementById("search-button-el");

searchButtonEl.addEventListener("click", performSearch);

function performSearch() {
  if (searchInputEl.value) {
    const searchWord = searchInputEl.value.toLowerCase();

    const url = `${baseUrl}?apikey=${apiKey}&s=${searchWord}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
}
