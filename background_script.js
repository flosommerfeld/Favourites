function onGot(item) {
  /*console.log("1");
  console.log(item);
  console.log(JSON.stringify(item));*/


  item.pages.push({
    "image": localStorage.getItem("screenshotUri"),
    "url": varUrl,
    "title": varTitle,
    "hostname": varHostname
  });

  let setting = browser.storage.local.set(item);
// just check for errors
  setting.then(null, onError);


  /*console.log("2");
  console.log(item);
  console.log(JSON.stringify(item));*/

	/*for (i in item.pages) {
    console.log(item.pages[i].url);
  }*/
}




if (localStorage.getItem("screenshots") == null) {
  console.log("lets go");
  localStorage.setItem("screenshots", "off");
  browser.storage.local.set({
    pages: []
  });
}


var varUrl = "";
var varTitle = "";
var varHostname = "";

function onCaptured(screenshotUri) { //sobald der screenshot gemacht wurde
  localStorage.setItem("screenshotUri",screenshotUri);
  let gettingItem = browser.storage.local.get("pages");
  gettingItem.then(onGot, onError);

}

function onError(error) {
  console.log(`Error: ${error}`);
}

browser.runtime.onMessage.addListener(getMessage); //wartet auf messages
function getMessage(message) {
  varUrl = message.url;
  varTitle = message.title;
  varHostname = message.hostname;
  if (message.msg == "screenshot") { //wenn der key "msg" vom objekt message "screenshot" ist dann mache
    var screenshot = browser.tabs.captureVisibleTab(); //einen screenshot
    screenshot.then(onCaptured, onError); //und gebe die Uri aus
  }

}
