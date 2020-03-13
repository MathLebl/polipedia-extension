chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript({
    file: 'scripts/get-name.js'
  });
});

chrome.contextMenus.create({
  title: "Polipedia Info",
  contexts:["selection"]
});

chrome.contextMenus.onClicked.addListener(() => {
  alert('Coming soon...');
})
