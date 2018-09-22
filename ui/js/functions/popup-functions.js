
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
 * Name der Funktion:
 * onGot
 *
 * Beschreibung:
 * Wird ausgeführt, wenn bei einem 'Versprechen'/'Promise' KEIN Fehler auftritt
 *
 */
function onGot(item) {

  var tabs = item.tabs;
  var tabContainer = document.getElementById("tab-container");

  tabContainer.innerHTML = "";

  /* Überprüfe, ob das JSON Objekt leer ist */
  if (tabs.length == 0) {
    /* TODO Gib Nachricht aus: Bitte setzen sie ihre Favourites in den Einstellungen */
  } else {

    /* Iterriere jeden Tab und füge ihn zur HTML-Seite hinzu */
    for (i in tabs) {

       /* Sicherstellen, dass die url eine url ist und, dass das Bild auch wirklich ein Bild ist */
      if (tabs[i].url.startsWith("http") && (tabs[i].image.startsWith("data:image/jpeg;base64,") || tabs[i].image.startsWith("data:image/png;base64,") || tabs[i].image == "img/noImage.png")) {

        /* Aufbau eines Tabs:
         *
         * <a href="https://www.aulis.hs-bremen.de/" target="_blank">
         *   <img src="img/aulis.png">
         *   <div class="text">Aulis</div>
         * </a>
         *
         */


        /* Erstelle <a> Element und weise dem Element die url zu */
        let a = document.createElement("a");
        a.href = tabs[i].url;
        if(i == 0){
           a.id="first-tab";
        }

        /* Erstelle <img> Element und weise dem Element das Bild zu */
        let img = document.createElement("img");
        img.src = tabs[i].image;

        /* Erstelle div Element und setze die Klasse des Elements */
        let div = document.createElement("div");
        div.className = "text";
        div.innerHTML = tabs[i].title;


        /* Hänge das <img> und <div> Element an das <a> Element */
        a.appendChild(img);
        a.appendChild(div);


        /* Hänge den fertigen Tab an den Tab-Container */
        tabContainer.appendChild(a);

      }
    }

  }

}
