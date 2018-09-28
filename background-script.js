/*
 * Name der Funktion:
 * onError
 *
 * Beschreibung:
 * Gibt Fehler aus, wenn bei einem 'Versprechen'/'Promise' ein Fehler auftritt
 *
 */
function onError(error) { //log errors
  console.log("Error: ${error}");
}



/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}


/* Erstelle 'contextMenu' item/button */
browser.contextMenus.create({
  id: "add-to-favourites",
  title: "Add website to favourites",
  contexts: ["all"]
}, onCreated);


/* Eventhandler für die buttons aus dem 'contextMenu' */
browser.contextMenus.onClicked.addListener(function(info, tab) {
  switch (info.menuItemId) {
    case "add-to-favourites":

      /* Dank der 'activeTab' Permission gibt es hier mehr Infos über 'tab' */

      /* Lade die Tabs aus dem lokalen Speicher */
      let tabs = browser.storage.local.get("tabs");
      tabs.then(function(item) {
        let image = tab.favIconUrl;
        let url = tab.url
        let title = tab.title;

        //Sorge dafür, dass wenn das faviconbild nicht exisitert für standardbild
        //TODO Allg. Funktion fürs Hinzufügen von fvourites, die alles überprüft
        if (image == null) {
          image = "img/noImage.png";
        }

          /* Füge die aktuelle Seite zu den Favourite hinzu */
          item.tabs.push({
            "image": image,
            "url": url,
            "title": title
          });

          /* Speicher alle Änderungen, die dem Item zugefügt wurden */
          browser.storage.local.set({ //JSON object initialization
            tabs: item.tabs
          });

      }, onError);

      break;

  }
})
