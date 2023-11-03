function isTargetWebsite(url) {
  return url.startsWith('https://trello.com/');
}

// Listen for tab updates
/** 
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && isTargetWebsite(tab.url)) {
    // Execute your code here when the target website is opened
    // For example, you can send a message to your content script to trigger an action
    setTimeout(() => {
      chrome.tabs.sendMessage(
        tab.id,
        { action: 'executeScript' },
        function (response) {
          console.log('rest', response);
        }
      );
    }, 1000);
  }
});
*/
