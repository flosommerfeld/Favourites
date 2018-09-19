var title = document.title;//Titel der website
var hostname = window.location.hostname;//Hostname der website
var url = window.location.href;//Url der website



function setCharAt(str, index, chr) {//setze einen char in einem string, an dem index aus dem argument..
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}

if (hostname.charAt(0) == "w" && hostname.charAt(1) == "w" && hostname.charAt(2) == "w" && hostname.charAt(3) == ".") {//entferne das "www."" vom hostname
  for (i = 0; i < 4; i++) {//iteriere die ersten 4 ziffern -> "www."
    hostname = setCharAt(hostname, 0, "");
  }
}

browser.runtime.sendMessage({"msg": "screenshot", "url": url, "title": title, "hostname": hostname}); //nachricht an background script dass er einen screenshot machen soll





function checkUrl() {//überprüfe ob die url sich geändert hat -> youtube kann links öffnen ohne dass der browser das richtig bemerkt..
  if(url != window.location.href){
    console.log("hallo");
    url = window.location.href;
    browser.runtime.sendMessage({"msg": "screenshot", "url": url, "title": title, "hostname": hostname}); //nachricht an background script dass er einen screenshot machen soll
  }
}

setInterval(checkUrl, 1000);//überprüfe jede sekunde ob die url sich geändert hat
