chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript({
    file: 'scripts/get-name.js'
    // file: 'scripts/insert_modal.js'
  });
});
