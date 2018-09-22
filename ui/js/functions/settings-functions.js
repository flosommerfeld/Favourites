
/* Name der Funktion:
 * onError
 *
 * Beschreibung:
 * Gibt Fehler aus, wenn bei einem 'Versprechen'/'Promise' ein Fehler auftritt
 *
 */
function onError(error) { //log errors
  console.log("Error: ${error}");
}



/* Name der Funktion:
 * encodeImageFileAsURL
 *
 * Beschreibung:
 * Konvertiert ein Bild zu einem Base64 String, sodass man diesen in lokalen Speicher sichern kann
 *
 */
function encodeImageFileAsURL(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    console.log('RESULT', reader.result);
    favouriteImage = reader.result;
    console.log("Favouriteimage:"+favouriteImage);
  }
  reader.readAsDataURL(file);
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
    /* Mache.. */
    console.log("tabslaenge ist 0");
  } else {

    /* Iterriere jeden Tab und füge ihn zur HTML-Seite hinzu */
    for (i in tabs) {

      /* Sicherstellen, dass die url eine url ist und, dass das Bild auch wirklich ein Bild ist */
      if (tabs[i].url.startsWith("http") && (tabs[i].image.startsWith("data:image/jpeg;base64,") || tabs[i].image.startsWith("data:image/png;base64,") || tabs[i].image == "img/noImage.png")) {

        /* Aufbau eines Tabs in der Settings-Seite:
         *
         * <a>
         *   <div class="button button-delete" style=""><i class="far fa-trash-alt button-text"></i></div>
         *   <div class="button button-edit" style=""><i class="far fa-edit button-text"></i></div>
         *   <img src="img/office.png">
         *   <div class="text">Office 365</div>
         * </a>
         *
         */


        /* Erstelle <a> Element */
        let a = document.createElement("a");


        /* Erstelle div Element und setze die Klasse des Elements */
        let divBtnDelete = document.createElement("div");
        divBtnDelete.className = "button button-delete";
        divBtnDelete.innerHTML = "<i class='far fa-trash-alt button-text'></i>";

        /* Erstelle div Element und setze die Klasse des Elements */
        let divBtnEdit = document.createElement("div");
        divBtnEdit.className = "button button-edit";
        divBtnEdit.innerHTML = "<i class='far fa-edit button-text'></i>";

        /* Erstelle <img> Element und weise dem Element das Bild zu */
        let img = document.createElement("img");
        img.src = tabs[i].image;

        /* Erstelle div Element und setze die Klasse des Elements */
        let divText = document.createElement("div");
        divText.className = "text";
        divText.innerHTML = tabs[i].title;


        /* Hänge das <img> und alle <div> Element an das <a> Element */
        a.appendChild(divBtnDelete);
        a.appendChild(divBtnEdit);
        a.appendChild(img);
        a.appendChild(divText);

        /* Hänge den fertigen Tab an den Tab-Container */
        tabContainer.appendChild(a);

      }
    }
  }
}



/*
 * Name der Funktion:
 * addFavourite
 *
 * Beschreibung:
 * Fügt ein vorher definierten Favoriten der Favoritenliste hinzu
 *
 * Parameter:
 * item: Das JSON Objekt in welchem der vorher definierte Favorit gespeichert werden soll
 *
 */
function addFavourite(item) {

  item.tabs.push({
    "image": favouriteImage,
    "url": favouriteURL,
    "title": favouriteName
  });

  /* Speicher alle Änderungen, die dem Item zugefügt wurden */
  browser.storage.local.set({ //JSON object initialization
      tabs: item.tabs
  });

  let tabs = browser.storage.local.get("tabs"); //get the JSON object
  tabs.then(onGot, onError); //promise
}


/*
 * Eventhandler - onclick
 *
 * Beschreibung:
 * Erfasst wann der Benutzer den 'Add' Button klickt und verarbeitet die vom Nutzer eingegebenen Daten.
 * Die Daten werden dann in der Funktion addFavorite weiterbenutzt
 *
 */
document.getElementById("add-favourite").onclick = function() {

  var image = document.getElementById("image");

  if(image.files.length == 0){
    //Setze default Bild
    favouriteImage = "img/noImage.png";
  }else{
    encodeImageFileAsURL(image);
  }

  favouriteName = document.getElementById("name").value;
  favouriteURL = document.getElementById("url").value;

  let tabs1 = browser.storage.local.get("tabs"); //get the JSON object
  tabs1.then(addFavourite, onError); //promise
}
