/*
 * Name der Funktion:
 * onError
 *
 * Beschreibung:
 * Gibt Fehler aus, wenn bei einem 'Versprechen'/'Promise' ein Fehler auftritt
 *
 */
function onError(error) {
  console.log(`Error: ${error}`);
}


/*
 * Name der Funktion:
 * onOpened
 *
 * Beschreibung:
 * Promise/Versprechen - Wird ausgeführt wenn die Options page geöffnet wurde
 *
 */
 function onOpened() {
  console.log(`Options page opened`);
}


/*
 * Name der Funktion:
 * onGotTab
 *
 * Beschreibung:
 * Promise/Versprechen - Wird ausgeführt wenn die aktuelle Tab ID erfragt wird und soll dann den Tab schließen
 *
 */
function onGotTab(tabInfo) {
  console.log(tabInfo);

  /* Schließe den Tab */
  var removing = browser.tabs.remove(tabInfo.id);
  removing.then(onClosed, onError);

}


/*
 * Name der Funktion:
 * onClosed
 *
 * Beschreibung:
 * Promise/Versprechen - Wird ausgeführt wenn der Tab geschlossen wurde
 *
 */
function onClosed() {
  console.log(`Tab geschlossen`);
}
