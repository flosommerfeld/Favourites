/********************* Global variables *********************/
var favouriteImage; /* image of the favourite */
var favouriteName; /* Name/title of the favourite */
var favouriteURL; /* URL of the favourite */

var arrayIndex; /* Index of favourite inside the JSON object array */
/*************************************************************/



/* Name of the function:
 * onError
 *
 * Description:
 * Promise - Logs errors in case something goes wrong
 *
 */
function onError(error) {
  console.log("Error: ${error}");
}



/* Name of the function:
 * encodeImageFileAsURL
 *
 * Description:
 * Encode an image to an Base64 string which makes it possible to save images via the Storage API
 *
 * Parameterss:
 * - element: image which will be encoded, as an element
 *
 */
function encodeImageFileAsURL(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    favouriteImage = reader.result;//set the global variable
  }
  reader.readAsDataURL(file);
}



/* Name of the function:
 * isUrlValid
 *
 * Description:
 * Validates an URL
 *
 * Parameters:
 * - url: URL which should be validated
 *
 * Return type:
 * Boolean -> (true/flase)
 *
 */
function isUrlValid(url) {
  var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  if (res == null)
    return false;
  else
    return true;
}



/* Name of the function:
 * isImageValid
 *
 * Description:
 * Checks if the image type is one of the following: .png, .jpg, .jpeg
 *
 * Parameters:
 * - element: image which will be checked, as an element
 *
 * Return type:
 * Boolean -> (true/flase)
 *
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
 * Name of the function:
 * visualizeFavourites
 *
 * Description:
 * Promise - Visualizes the favourites by creating certain elements and adding them to the DOM. This function also
 * adds buttons next to each favourite so that favourites can be edited/deleted
 *
 * Parameters:
 * - item: The current favourites list from the storage - received via promise
 *
 */
function visualizeFavourites(item) {
  var tabs = item.tabs;//JSON object array where all the favourites are saved
  var tabContainer = document.getElementById("tab-container");

  tabContainer.innerHTML = "";


  /* Check if the JSON object array was initialized */
  if (tabs == undefined || tabs == null || tabs.length == 0) {
    browser.storage.local.set({ //Initialize if it is currently uninitialized
      tabs: []
    });
  }

  /* Go through each favourite and add it to the DOM */
  for (i in tabs) {
    /* Assure that the url is really a url and that the image is really an image */
    if (tabs[i].url.startsWith("http") && (tabs[i].image.startsWith("data:image/jpeg;base64,") || tabs[i].image.startsWith("data:image/png;base64,") || tabs[i].image.startsWith("http") || tabs[i].image == "img/noImage.png")) {

      /* Example strucure of a favourite/tab in the settings page in HTML:
       *
       * <a id="0">
       *   <div class="button button-delete"><i class="far fa-trash-alt button-text"></i></div>
       *   <div class="button button-edit"><i class="far fa-edit button-text"></i></div>
       *   <img src="img/firefox.png">
       *   <div class="text">Firefox</div>
       *   <div class="url">http://firefox.com</div>
       * </a>
       *
       */


      /* Create <a> element und set the id of the tab to the index of the loop */
      let a = document.createElement("a");
      a.id = "" + i;


      /* Create <div> element and set the classes&innerHTML
      * Also add an event listener for click handling
      */
      let divBtnDelete = document.createElement("div");
      divBtnDelete.className = "button button-delete";
      divBtnDelete.innerHTML = "<i class='far fa-trash-alt button-text'></i>";
      divBtnDelete.addEventListener('click', masterEventHandler, false);

      /* Create <div> element and set the classes&innerHTML
      * Also add an event listener for click handling
      */
      let divBtnEdit = document.createElement("div");
      divBtnEdit.className = "button button-edit";
      divBtnEdit.innerHTML = "<i class='far fa-edit button-text'></i>";
      divBtnEdit.addEventListener('click', masterEventHandler, false);

      /* Create <img> element and set the image */
      let img = document.createElement("img");
      img.src = tabs[i].image;

      /* Create <div> element and set the classes&innerHTML */
      let divText = document.createElement("div");
      divText.className = "text";
      divText.innerHTML = tabs[i].title;

      /* Create <div> element and set the classes&innerHTML */
      let divURL = document.createElement("div");//This element will be hidden
      divURL.className = "url";
      divURL.innerHTML = tabs[i].url;//The url is saved here


      /* Append all the <div> and <img> elements to the <a> element */
      a.appendChild(divBtnDelete);
      a.appendChild(divBtnEdit);
      a.appendChild(img);
      a.appendChild(divText);
      a.appendChild(divURL);

        /* Append the favourite/tab/<a> element to the tabContainer */
      tabContainer.appendChild(a);
    }
  }
}



/*
 * Name of the function:
 * removeFavourite
 *
 * Description:
 * Promise - Deletes a favourite from the JSON object array with the help of the global variables
 * 'arrayIndex' which knows the index of the favourite
 *
 * Parameters:
 * - item: The JSON object array in which the favourite is saved which will get deleted
 *
 */
function removeFavourite(item) {
  /* Delete content at 'arrayIndex' : https://www.w3schools.com/jsref/jsref_splice.asp*/
  item.tabs.splice(arrayIndex, 1);

  /* Save all changes that were made to the JSON object array */
  browser.storage.local.set({
    tabs: item.tabs
  });

  /* Visualize the favourites again (the delete favourite should now be gone) */
  let tabs = browser.storage.local.get("tabs");
  tabs.then(visualizeFavourites, onError);
}



/*
 * Name of the function:
 * changeFavourite
 *
 * Description:
 * Changes a favourite with the help of the global variables and saves the changes
 * After the changes were saved, the favourites get visualized again -> visualizeFavourites()
 *
 * Parameters:
 * - item: The JSON object array in which the favourite is which will be changed
 *
 */
function changeFavourite(item) {
  item.tabs[arrayIndex].url = favouriteURL;
  item.tabs[arrayIndex].image = favouriteImage;
  item.tabs[arrayIndex].title = favouriteName;

  /* Save all changes that were made to the JSON object array */
  browser.storage.local.set({
    tabs: item.tabs
  });

  let tabs = browser.storage.local.get("tabs");
  tabs.then(visualizeFavourites, onError);
}



/*
 * Name of the function:
 * addFavourite
 *
 * Description:
 * Adds a favourite with the help of the global variables to the JSON object array and saves it
 *
 * Parameters:
 * - item: The JSON object array in which the favourite will be saved
 *
 */
function addFavourite(item) {
  item.tabs.push({
    "image": favouriteImage,
    "url": favouriteURL,
    "title": favouriteName
  });

  /* Save all changes that were made to the JSON object array */
  browser.storage.local.set({
    tabs: item.tabs
  });

  let tabs = browser.storage.local.get("tabs");
  tabs.then(visualizeFavourites, onError);
}





/********************* Event handler functions *********************/



/* Name of the function:
 * masterEventHandler
 *
 * Description:
 * Event handler for the buttons of a favourite. (This functions can also find out at which index a specific favourite is inside
 * the JSON object array
 *
 * Little explanation of what's what:
 *  <a id="0"> <------------------------------------------------ I want to find out this ID (ID = e.target.parentElement.parentElement.id)
 *    <div class="button button-delete"> <---------------------- This button gets clicked (div = e.target.parentElement)
 *      <i class="far fa-trash-alt button-text"></i>
 *    </div>
 *    <div class="button button-edit"> <------------------------ OR this button gets clicked (div = e.target.parentElement)
 *      <i class="far fa-edit button-text"></i>
 *    </div>
 *    <img src="img/firefox.png">
 *    <div class="text">Firefox</div>
 *    <div class="url">http://firefox.com</div>
 *  </a>
 *
 */
function masterEventHandler(e) {

  arrayIndex = e.target.parentElement.parentElement.id;
  let buttonElement = e.target.parentElement;
  let aElement = e.target.parentElement.parentElement;

  /* Find out if an edit button or else was clicked by looking at the class name */
  if (buttonElement.className.indexOf("edit") !== -1) {

    /* Nachden der Change Button geklickt wurde soll man die Werte ändern können
    -> Erstelle Elemente (bzw. input Elemente) und ersetze die alten Elemente */
    /* After the edit button was clicked it will update the favourites innerHTML so that there are input fields.
     * These input fields get created and added to the DOM here
     */
    let applyButton = document.createElement("div");
    applyButton.className = "button button-change"
    applyButton.innerHTML = "<i class='fas fa-check button-text'></i>"
    applyButton.addEventListener('click', masterEventHandler, false);
    aElement.replaceChild(applyButton, aElement.childNodes[1]);//The element which gets replaced always has the index 1 inside element <a>

    let inputImg = document.createElement("input");
    inputImg.type = "file";
    inputImg.name = "favouriteImage";
    inputImg.accept = ".png, .jpg, .jpeg";
    aElement.replaceChild(inputImg, aElement.childNodes[2]);//The element which gets replaced always has the index 2 inside element <a>

    let inputName = document.createElement("input");
    inputName.type = "text";
    inputName.name = "favouriteName";
    inputName.value = aElement.childNodes[3].innerHTML;
    aElement.replaceChild(inputName, aElement.childNodes[3]);//The element which gets replaced always has the index 3 inside element <a>


    let inputURL = document.createElement("input");
    inputURL.type = "text";
    inputURL.name = "favouriteURL";
    inputURL.value = aElement.childNodes[4].innerHTML;
    aElement.replaceChild(inputURL, aElement.childNodes[4]);//The element which gets replaced always has the index 4 inside element <a>


    /* The user will now type in any changes and should be clicking the apply button.
     * Once the apply button is clicked, this masterEventHandler function gets called again and handles the click of the apply button
     */


  } else if (buttonElement.className.indexOf("delete") !== -1) {//If the delete button was clicked

    /* Call function which deletes the favourite */
    let tabs1 = browser.storage.local.get("tabs");
    tabs1.then(removeFavourite, onError);

  } else { //Apply button was clicked //TODO improve code..

    /* Get the URL and the title/name from the input fields (childs of <a>)*/
    favouriteURL = aElement.childNodes[4].value
    favouriteName = aElement.childNodes[3].value;

    /* If no new image was uploaded after editing */
    if (aElement.childNodes[2].files.length == 0) {

      let tabs1 = browser.storage.local.get("tabs"); //get the JSON object array
      tabs1.then(function(item) {
        /* Überprüfe, ob bereits ein Bild vor dem editieren existierte (wenn nicht dann nimm standardbild) */
        /* Check if there was an image before editing - if not then set the default image */
        if (item.tabs[arrayIndex].image.startsWith("data:image") == false) {
          favouriteImage = "img/noImage.png";
        }

        /* If there was an image before editing (but this image is from a website) save this image again */
        if (item.tabs[arrayIndex].image.startsWith("http") == true || item.tabs[arrayIndex].image.startsWith("data:image") == true) {
          favouriteImage = item.tabs[arrayIndex].image + ""; //TODO check if all of this is really necessary - is there another way?
        }


      }, onError); //promise

    } else { /* If a new image was uploaded after editing */

      /* Check if the image is a .png/.jpeg/.jpg */
      if (isImageValid(aElement.childNodes[2])) {
        /* Encode image to Base64 string */
        encodeImageFileAsURL(aElement.childNodes[2]);
      } else {
        /* Set default image */
        favouriteImage = "img/noImage.png";
      }

    }

    /* -> changeFavourite: Save changes, and reload favourites to DOM */
    let tabs1 = browser.storage.local.get("tabs");
    tabs1.then(changeFavourite, onError);
  }

}



/*
 * Eventhandler - onclick
 *
 * Description:
 * Event handler for the button which adds new favourites. This function gets the data from the input fields and
 * creates a new favourite with this data (the favourite is actually create inside addFavourite())
 *
 */
document.getElementById("add-favourite").onclick = function() {
  /* Get input fields (image, title/name, url/address) */
  let imageElement = document.getElementById("image");
  let titleElement = document.getElementById("name");
  let urlElement = document.getElementById("url");

  /* Check if the URL is valid and if the user gave the favourite a title */
  if (isUrlValid(urlElement.value) && titleElement.value.length > 0) {
    favouriteName = titleElement.value;
    favouriteURL = urlElement.value;

    /* Remove the border-color which might have been added if the previous inputs were not valid */
    url.style.removeProperty('border-color');
    titleElement.style.removeProperty('border-color');


    /* If the user DID NOT upload an image */
    if (imageElement.files.length == 0) {
      /* Set default image */
      favouriteImage = "img/noImage.png";
    } else { //if the user actually DID upload an image

      /* Check if the image is a .png/.jpeg/.jpg */
      if (isImageValid(imageElement)) {
        /* Encode image to Base64 string */
        encodeImageFileAsURL(imageElement);
      } else {
        /* Set default image */
        favouriteImage = "img/noImage.png";
      }

    }

    /* Call function which adds the new favourite via global variables */
    let tabs1 = browser.storage.local.get("tabs");
    tabs1.then(addFavourite, onError);

  } else { /*If one of the inputs were not valid, then find out which one is not valid and highlight it by changing the border-color to red */
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
