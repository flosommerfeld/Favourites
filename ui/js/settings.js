/* Wenn das JSON-Objekt noch nicht initialisiert wurde, dann initalisiere es */
if (localStorage.getItem("initialized") == null || localStorage.getItem("initialized") != "true") {
  localStorage.setItem("initialized", "true");
  browser.storage.local.set({ //JSON object initialization
      tabs: []
  });

}


let tabs = browser.storage.local.get("tabs"); //get the JSON object
tabs.then(visualizeFavourites, onError); //promise
