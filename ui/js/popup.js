/* Load the tabs via the Storage API and add them to the DOM -> function: visualizeFavourites() */
let tabs = browser.storage.local.get("tabs");//get the JSON object array
tabs.then(visualizeFavourites, onError);//promise




/*
 * Name of the function:
 * onError
 *
 * Description:
 * Promise - Logs errors in case something goes wrong
 *
 */
function onError(error) {
    console.log("Error: ${error}");
}



/*
 * Name of the function:
 * visualizeFavourites
 *
 * Description:
 * Promise - Visualizes the favourites by creating certain elements and adding them to the DOM
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

        /* Show message: Add favourites via settings page... */
        document.getElementById("no-favourites-message").style.display = "flex"; /* change from display none to flex */
    }


    /* Go through each favourite and add it to the DOM */
    for (i in tabs) {

        /* Assure that the url is really a url and that the image is really an image */
        if (tabs[i].image != undefined && tabs[i].url.startsWith("http") && (tabs[i].image.startsWith("data:image") || tabs[i].image.startsWith("http")
          || tabs[i].image == "img/noImage.png")) {

            /*
             * Example strucure of a favourite/tab in HTML:
             *
             * <a href="https://www.firefox.com/" target="_blank">
             *   <img src="img/firefox.png">
             *   <div class="text">Firefox</div>
             * </a>
             *
             */

            /* Create <a> element and set the url */
            let a = document.createElement("a");
            a.href = tabs[i].url;

            /* Create <img> element and set the image */
            let img = document.createElement("img");
            img.src = tabs[i].image;

            /* Create <div> element and set the classes&innerHTML */
            let div = document.createElement("div");
            div.className = "text";
            div.innerHTML = tabs[i].title;


            /* Append the <img> and <div> element to the <a> element */
            a.appendChild(img);
            a.appendChild(div);

            /* Append the favourite/tab/<a> element to the tabContainer */
            tabContainer.appendChild(a);
        }
    }
}
