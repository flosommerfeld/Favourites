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
  var removing = browser.tabs.remove(tabInfo.id);
  removing.then(onClosed, onError);

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
