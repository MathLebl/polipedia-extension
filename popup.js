chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript({
    file: 'scripts/modal.js'
    // code: "alert(window.getSelection().toString());"
  });
});
