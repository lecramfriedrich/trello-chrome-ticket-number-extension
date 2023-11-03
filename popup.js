chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const tab = tabs[0];
  chrome.tabs.sendMessage(
    tab.id,
    { action: 'executeScript' },
    function (response) {
      console.log('rest', response);
    }
  );
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Action Called', request.action);
  if (request.action === 'executeScript') {
    // Execute your script on the web page here
    //const cardNumbers = addCardNumbers();
    sendResponse('ASDSADASASD');
  }
});
