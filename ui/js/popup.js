/* Lade die Tabs aus dem lokalen Speicher und füge sie dem DOM hinzu (-> Funktion visualizeFavourites) */
let tabs = browser.storage.local.get("tabs");
tabs.then(visualizeFavourites, onError);
