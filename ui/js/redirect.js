/* Open the options/settings page of the WebExtension */
var opening = browser.runtime.openOptionsPage();
opening.then(onOpened, onError);

/* Get the ID of the tab in which redirect.html and thus this script were loaded
in order to close the tab after opening the options page */
var gettingCurrent = browser.tabs.getCurrent();
gettingCurrent.then(onGotTab, onError);



/*
 * Name of the function:
 * onError
 *
 * Description:
 * Logs errors in case something goes wrong
 *
 */
function onError(error) {
    console.log("Error: ${error}");
}



/*
 * Name of the function:
 * onClosed
 *
 * Description:
 * Promise - Logs that the tab was closed
 *
 */
function onClosed() {
    console.log("Tab successfully closed");
}



/*
 * Name of the function:
 * onOpened
 *
 * Description:
 * Promise - Logs that the options page was opened
 *
 */
function onOpened() {
    console.log("Options page opened");
}


/*
 * Name of the function:
 * onGotTab
 *
 * Description:
 * Promise - Gets the current tab ID and closes it
 *
 */
function onGotTab(tabInfo) {
    console.log(tabInfo);

    /* Close the tab */
    let removing = browser.tabs.remove(tabInfo.id);
    removing.then(onClosed, onError);
}
