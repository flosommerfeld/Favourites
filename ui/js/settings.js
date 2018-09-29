/* Load the tabs via the Storage API and add them to the DOM -> function: visualizeFavourites() */
let tabs = browser.storage.local.get("tabs");//get the JSON object array
tabs.then(visualizeFavourites, onError);//promise
