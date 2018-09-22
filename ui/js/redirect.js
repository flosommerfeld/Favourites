/* Öffne die Optionsseite vom Addon */
var opening = browser.runtime.openOptionsPage();
opening.then(onOpened, onError);

/* Bekomme die ID vom Tab, in welchem dieses Script läuft sodass der Tab danach geschlossen werden kann */
var gettingCurrent = browser.tabs.getCurrent();
gettingCurrent.then(onGotTab, onError);
