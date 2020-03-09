chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript({
    file: 'scripts/get-name.js'
    // code: "alert(window.getSelection().toString());"
  });
});
