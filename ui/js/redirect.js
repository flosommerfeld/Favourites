/* Open the options/settings page of the WebExtension */
var opening = browser.runtime.openOptionsPage();
opening.then(onOpened, onError);

/* Get the ID of the tab in which redirect.html and thus this script were loaded
in order to close the tab after opening the options page */
var gettingCurrent = browser.tabs.getCurrent();
gettingCurrent.then(onGotTab, onError);
