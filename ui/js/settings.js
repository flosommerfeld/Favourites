/* Lade die Tabs aus dem lokalen Speicher und füge sie dem DOM hinzu (-> Funktion visualizeFavourites) */
let tabs = browser.storage.local.get("tabs"); //get the JSON object
tabs.then(visualizeFavourites, onError); //promise
