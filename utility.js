function updateLocalStorage(id) {
  // if id in local storage, remove it!
  if (isIdInLocalStorage(id)) {
    const localIds = JSON.parse(localStorage.getItem("localIds"));
    const idIndexInLocalIds = localIds.indexOf(id);
    localIds.splice(idIndexInLocalIds, 1);
    localStorage.setItem("localIds", JSON.stringify(localIds));
  }
  // if id not in local storage, add it!
  else {
    if (localStorageExists()) {
      const localIds = JSON.parse(localStorage.getItem("localIds"));
      localIds.push(id);
      localStorage.setItem("localIds", JSON.stringify(localIds));
      // if local storage doesn't exist, initialize it!
    } else {
      const initLocalStorage = JSON.stringify([id]);
      localStorage.setItem("localIds", initLocalStorage);
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

export { updateLocalStorage, isIdInLocalStorage };
