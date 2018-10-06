/********************* Global constants *********************/
const DEFAULT_IMAGE = "img/noImage.png";
/*************************************************************/



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



/* Name of the function:
 * onCreated
 *
 * Description:
 * Is called when the context menu item has been created, or when creation failed due to an error.
 * I'll just log success/failure here.
 */
function onCreated() {
    if (browser.runtime.lastError) {
      console.log("Error: ${browser.runtime.lastError}");
    } else {
        console.log("Item created successfully");
    }
}







/* Create 'contextMenu' item/button */
browser.contextMenus.create({
    id: "add-to-favourites",
    title: "Add website to favourites",
    contexts: ["all"]
}, onCreated);//promise


/* Eventhandler for item/button from the 'contextMenu' */
browser.contextMenus.onClicked.addListener(function(info, tab) {
    switch (info.menuItemId) {
        case "add-to-favourites":

            /* Thanks to the 'activeTab' permission i can get more information about 'tab' (see parameter) */

            /* Load the JSON object array in which all the favourites are saved */
            let tabs = browser.storage.local.get("tabs");
            tabs.then(function(item) {
                /* Give the new favourite the data of this active tab */
                let image = tab.favIconUrl;
                let url = tab.url;
                let title = tab.title;


                /* If the website/active tab doesn't have a favicon then set the default image */
                if (image == null) {
                    image = DEFAULT_IMAGE;
                }

                /* Add the website of the active tab to the JSON object array */
                item.tabs.push({
                    "image": image,
                    "url": url,
                    "title": title
                });

                /* Save alls changes that were made to the JSON object array */
                browser.storage.local.set({
                    tabs: item.tabs
                });

            }, onError);//promise

            break;

    }
})
