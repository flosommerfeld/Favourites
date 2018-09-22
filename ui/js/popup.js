/* Wenn das JSON-Objekt noch nicht initialisiert wurde, dann initalisiere es */
if (localStorage.getItem("initialized") == null || localStorage.getItem("initialized") != "true") {
  localStorage.setItem("initialized", "true");
  browser.storage.local.set({ //JSON-Objektinitialisierung
      tabs: []
  });
}


/* Lade die Tabs aus dem lokalen Speicher und füge sie dem DOM hinzu (-> Funktion onGot) */
let tabs = browser.storage.local.get("tabs");
tabs.then(onGot, onError);
