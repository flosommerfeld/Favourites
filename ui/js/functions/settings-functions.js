/********************* Globale Variablen *********************/
var favouriteImage; /* Das Bild von dem Favourite */
var favouriteName; /* Der Name von dem Favourite */
var favouriteURL; /* Die URL von dem Favourite */

var arrayIndex; /* Der Index vom JSON Objektarray in welchem sich der Favourite befindet */
/*************************************************************/



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
    favouriteImage = reader.result;
  }
  reader.readAsDataURL(file);
}



/* Name der Funktion:
 * isUrlValid
 *
 * Beschreibung:
 * Validiert eine URL
 *
 * Parameter:
 * url: Die url, welche validiert werden soll
 */
function isUrlValid(url) {
  var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  if (res == null)
    return false;
  else
    return true;
}



/* Name der Funktion:
 * isImageValid
 *
 * Beschreibung:
 * Validiert die hochgeladenen Datei, welche ein Bild sein sollte -> .png, .jpg, .jpeg
 *
 * Parameter:
 * element: Das Bild (als element), welches validiert werden soll
 */
function isImageValid(element) {
  var supportedTypes = ["image/png", "image/jpg", "image/jpeg"];

  for (var i = 0; i < supportedTypes.length; i++) {
    if (supportedTypes[i] == element.files[0].type) {
      return true;
    }
  }

  return false;
}



/*
 * Name der Funktion:
 * visualizeFavourites
 *
 * Beschreibung:
 * Wird ausgeführt, wenn bei einem 'Versprechen'/'Promise' KEIN Fehler auftritt
 *
 */
function visualizeFavourites(item) {
  var tabs = item.tabs;
  var tabContainer = document.getElementById("tab-container");

  tabContainer.innerHTML = "";


  /* Überprüfe, ob der JSON Objektarray, der die Favourites beinhaltet scon initalisiert ist */
  if (tabs == undefined || tabs == null || tabs.length == 0) {
    browser.storage.local.set({ //JSON-Objektinitialisierung - Wird gemacht wenn vorher noch nicht initialisiert
      tabs: []
    });
  }

  /* Iterriere jeden Tab und füge ihn zur HTML-Seite hinzu */
  for (i in tabs) {
    /* Sicherstellen, dass die url eine url ist und, dass das Bild auch wirklich ein Bild ist */
    if (tabs[i].url.startsWith("http") && (tabs[i].image.startsWith("data:image/jpeg;base64,") || tabs[i].image.startsWith("data:image/png;base64,") || tabs[i].image.startsWith("http") || tabs[i].image == "img/noImage.png")) {

      /* Aufbau eines Tabs in der Settings-Seite:
       *
       * <a id="0">
       *   <div class="button button-delete" style=""><i class="far fa-trash-alt button-text"></i></div>
       *   <div class="button button-edit" style=""><i class="far fa-edit button-text"></i></div>
       *   <img src="img/office.png">
       *   <div class="text">Office 365</div>
       * </a>
       *
       */


      /* Erstelle <a> Element und setze die ID auf den Index der for-Loop */
      let a = document.createElement("a");
      a.id = "" + i;


      /* Erstelle div Element und setze die Klasse des Elements */
      let divBtnDelete = document.createElement("div");
      divBtnDelete.className = "button button-delete";
      divBtnDelete.innerHTML = "<i class='far fa-trash-alt button-text'></i>";
      divBtnDelete.addEventListener('click', masterEventHandler, false);

      /* Erstelle div Element und setze die Klasse des Elements */
      let divBtnEdit = document.createElement("div");
      divBtnEdit.className = "button button-edit";
      divBtnEdit.innerHTML = "<i class='far fa-edit button-text'></i>";
      divBtnEdit.addEventListener('click', masterEventHandler, false);

      /* Erstelle <img> Element und weise dem Element das Bild zu */
      let img = document.createElement("img");
      img.src = tabs[i].image;

      /* Erstelle div Element und setze die Klasse des Elements */
      let divText = document.createElement("div");
      divText.className = "text";
      divText.innerHTML = tabs[i].title;

      /* Speichere die url im Tab damit sie später verarbeitet werden kann */
      let divURL = document.createElement("div");
      divURL.className = "url";
      divURL.innerHTML = tabs[i].url;


      /* Hänge das <img> und alle <div> Element an das <a> Element */
      a.appendChild(divBtnDelete);
      a.appendChild(divBtnEdit);
      a.appendChild(img);
      a.appendChild(divText);
      a.appendChild(divURL);

      /* Hänge den fertigen Tab an den Tab-Container */
      tabContainer.appendChild(a);
    }
  }
}



/*
 * Name der Funktion:
 * removeFavourite
 *
 * Beschreibung:
 * Löscht einen Favourite aus dem JSON Object Array mit Hilfe der vorher
 * definierten globalen Variable 'arrayIndex', die die Stelle angibt
 *
 * Parameter:
 * item: Das JSON Objekt in welchem sich der zu löschende Index befindet
 *
 */
function removeFavourite(item) {
  /* Lösche an der Stelle 'arrayIndex' : https://www.w3schools.com/jsref/jsref_splice.asp*/
  item.tabs.splice(arrayIndex, 1);

  /* Speicher alle Änderungen, die dem Item zugefügt wurden */
  browser.storage.local.set({ //JSON object initialization
    tabs: item.tabs
  });

  /* Aktualisiere die Änderungen im DOM */
  let tabs = browser.storage.local.get("tabs");
  tabs.then(visualizeFavourites, onError);
}



/*
 * Name der Funktion:
 * changeFavourite
 *
 * Beschreibung:
 * Ändert die Werte im Array und speichert ihn
 * Danach wird visualizeFavourites() aufgerufen, damit der DOM refreshed wird
 *
 * Parameter:
 * item: Das JSON Objekt bzw. der zu ändernde Array
 *
 */
function changeFavourite(item) {
  item.tabs[arrayIndex].url = favouriteURL;
  item.tabs[arrayIndex].image = favouriteImage;
  item.tabs[arrayIndex].title = favouriteName;

  browser.storage.local.set({ //Speichern
    tabs: item.tabs
  });

  let tabs = browser.storage.local.get("tabs");
  tabs.then(visualizeFavourites, onError);
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
  tabs.then(visualizeFavourites, onError); //promise
}





/********************* Event Handler Funktionen *********************/



/* Name der Funktion:
 * masterEventHandler
 *
 * Beschreibung:
 * Ist ein Eventhandler für alle Buttons eines 'Favourites' und findet heraus welche ID bzw. welchen Index der Favourite hat
 *
 *
 *  <a id="0"> <------------------------------------------------ Diese ID möchte ich herausbekommen (ID = e.target.parentElement.parentElement.id)
 *    <div class="button button-delete"> <---------------------- Dieser Button wird geklickt (div = e.target.parentElement)
 *      <i class="far fa-trash-alt button-text"></i>
 *    </div>
 *    <div class="button button-edit"> <------------------------ Oder dieser Button wird geklickt (div = e.target.parentElement)
 *      <i class="far fa-edit button-text"></i>
 *    </div>
 *    <img src="img/noImage.png">
 *    <div class="text">Beispiel</div>
 *    <div class="url">http://beispiel.de</div>
 *  </a>
 *
 */
function masterEventHandler(e) {

  arrayIndex = e.target.parentElement.parentElement.id;
  let buttonElement = e.target.parentElement;
  let aElement = e.target.parentElement.parentElement;

  /* Finde durch den Klassenname heraus, ob der Edit oder ein anderer Button der den masterEventHandler benutzt geklickt wurde --->(Remove Button)*/
  if (buttonElement.className.indexOf("edit") !== -1) {

    /* Nachden der Change Button geklickt wurde soll man die Werte ändern können
    -> Erstelle Elemente (bzw. input Elemente) und ersetze die alten Elemente */

    let applyButton = document.createElement("div");
    applyButton.className = "button button-change"
    applyButton.innerHTML = "<i class='fas fa-check button-text'></i>"
    applyButton.addEventListener('click', masterEventHandler, false);
    aElement.replaceChild(applyButton, aElement.childNodes[1]);

    let inputImg = document.createElement("input");
    inputImg.type = "file";
    inputImg.name = "favouriteImage";
    inputImg.accept = ".png, .jpg, .jpeg";
    aElement.replaceChild(inputImg, aElement.childNodes[2]); //Das img Element ist immer das 3 child von a im DOM

    let inputName = document.createElement("input");
    inputName.type = "text";
    inputName.name = "favouriteName";
    inputName.value = aElement.childNodes[3].innerHTML;
    aElement.replaceChild(inputName, aElement.childNodes[3]); //Das div Element ist immer das 4 child von a im DOM


    let inputURL = document.createElement("input");
    inputURL.type = "text";
    inputURL.name = "favouriteURL";
    inputURL.value = aElement.childNodes[4].innerHTML;
    aElement.replaceChild(inputURL, aElement.childNodes[4]); //Das div Element ist immer das 5 child von a im DOM


  } else if (buttonElement.className.indexOf("delete") !== -1) {
    /* Funktion aufrufen, die den Favourite löscht */
    let tabs1 = browser.storage.local.get("tabs"); //get the JSON object
    tabs1.then(removeFavourite, onError); //promise
  } else { //Change button wurde geklcikt! TODO auf switch case wechseln?! default: fehler konnte nicht klick zuordnen

    /* Bekomme die URL und den Namen aus den Input Elementen, welche in a sind */
    favouriteURL = aElement.childNodes[4].value
    favouriteName = aElement.childNodes[3].value;

    /* Wenn kein neues Bild beim Editieren hochgeladen wird */
    if (aElement.childNodes[2].files.length == 0) {

      let tabs1 = browser.storage.local.get("tabs"); //get the JSON object
      tabs1.then(function(item) {
        //TODO if abfrage entfernen...
        /* Überprüfe, ob bereits ein Bild vor dem editieren existierte (wenn nicht dann nimm standardbild) */
        if (item.tabs[arrayIndex].image.startsWith("data:image") == false) {
          favouriteImage = "img/noImage.png";
        }

        /* Wenn das Bild über url geholt wird */
        if (item.tabs[arrayIndex].image.startsWith("http") == true || item.tabs[arrayIndex].image.startsWith("data:image") == true) {
          favouriteImage = item.tabs[arrayIndex].image + ""; //TODO herausfinden weshalb hier favouriteImage geändert werden muss
        }


      }, onError); //promise

    } else { /* Wenn ein neues Bild beim Editieren hochgeladen wurde */

      /* Überprüfen, ob das hochgeladene Bild valid ist */
      if (isImageValid(aElement.childNodes[2])) {
        /* Hochgeladenes Bild zu Base64 encoden */
        encodeImageFileAsURL(aElement.childNodes[2]);
      } else {
        /* Setze default Bild */
        favouriteImage = "img/noImage.png";
      }

    }

    /* -> changeFavourite: Ändere die Werte, speicher den Array und refreshe den DOM */
    let tabs1 = browser.storage.local.get("tabs"); //get the JSON object
    tabs1.then(changeFavourite, onError); //promise
  }

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
  let imageElement = document.getElementById("image");
  let titleElement = document.getElementById("name");
  let urlElement = document.getElementById("url");

  /* Überprüfe, ob die Benutzereingaben korrekt sind und füge dann den favourite hinzu */
  if (isUrlValid(urlElement.value) && titleElement.value.length > 0) {
    favouriteName = titleElement.value;
    favouriteURL = urlElement.value;

    /* Entferne die border-color die vorher möglicherweise durch falsche Eingaben gesetzt wurde */
    url.style.removeProperty('border-color');
    titleElement.style.removeProperty('border-color');


    /* Überprüfe, ob der Benutzer KEIN Bild hochgeladen hat */
    if (imageElement.files.length == 0) {
      /* Setze default Bild */
      favouriteImage = "img/noImage.png";
    } else {

      //Überprüfe, ob das Bild valid ist
      if (isImageValid(imageElement)) {
        /* Hochgeladenes Bild zu Base64 encoden */
        encodeImageFileAsURL(imageElement);
      } else {
        /* Setze default Bild */
        favouriteImage = "img/noImage.png";
      }

    }

    /* Funktion aufrufen, die die input Daten zu einem Favourite macht und ihn hinzufügt */
    let tabs1 = browser.storage.local.get("tabs"); //get the JSON object
    tabs1.then(addFavourite, onError); //promise

  } else { /* Wenn eine der Angaben nicht korrekt war, überprüfe welche und färbe die Border des Elements ein */
    if (!isUrlValid(urlElement.value)) {
      url.style.setProperty('border-color', '#D32F2F');
    } else {
      url.style.removeProperty('border-color');
    }
    if (titleElement.value.length == 0) {
      titleElement.style.setProperty('border-color', '#D32F2F');
    } else {
      titleElement.style.removeProperty('border-color');
    }
  }

}
/***********************************************************/
