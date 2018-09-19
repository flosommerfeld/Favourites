if(localStorage.getItem("screenshots")==null){//zum ersten mal das addon benutzt wird, saktiviere screenshots
	localStorage.setItem("screenshots","off");
}

$("#screenshot-switch").html("<div class='text'>Turn " + localStorage.getItem("screenshots") + " screenshots</div>");

function getCurrentWindowTabs() {
  return browser.tabs.query({currentWindow: true});
}


$("#tab-create").click(function() {//auf klick, erstelle einen neuen tab und lade die seite für die history
  function callOnActiveTab(callback) {
    getCurrentWindowTabs().then((tabs) => {
      for (var tab of tabs) {
        if (tab.active) {
          callback(tab, tabs);
        }
      }
    });
  }
  browser.tabs.create({url: "../history_ui/index.html"});
  window.close();
});

$("#screenshot-switch").click(function() {//screenshot option
	if(localStorage.getItem("screenshots")=="off"){
		localStorage.setItem("screenshots","on");
	}
	else if(localStorage.getItem("screenshots")=="on"){
		localStorage.setItem("screenshots","off");
	}
});
