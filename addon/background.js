function onResponse(response) {
  console.log("Received " + response.text);
}

function onError(error) {
  console.log(`Error: ${error}`);
}


function logTabs(tabs) {
  for (let tab of tabs) {
    // tab.url requires the `tabs` permission
    var sendMe = JSON.stringify(tab.url);
    var sending = browser.runtime.sendNativeMessage(
      "youtubedlbutton",
      sendMe);
    sending.then(onResponse, onError);
  }
}



/*
On a click on the browser action, send the app a message.
*/
browser.browserAction.onClicked.addListener(() => {  
    var querying = browser.tabs.query({currentWindow: true, active: true});
    querying.then(logTabs, onError);

});