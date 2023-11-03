function addCardNumbers() {
  const board = document.getElementById('board');
  if (!board) {
    console.log('board does not exits');
    return;
  }
  const cardNumbers = [];
  const cardLinks = board.querySelectorAll('a[data-testid="card-name"]');
  cardLinks.forEach((cardLink) => {
    const prefix = getPrefix();
    const cardNumber = getCardNumberFromHref(cardLink.getAttribute('href'));
    const previousText = cardLink.textContent.trim(); // Get the existing text content and trim whitespace
    if (!previousText.startsWith(`${prefix}-`)) {
      cardLink.textContent = `${prefix}-${cardNumber} ${previousText}`;
    }
  });

  return cardNumbers;
}

function getPrefix() {
  const currentURL = window.location.href;
  if (currentURL.endsWith('smartwod-workout-generator')) {
    return 'SWG';
  } else if (currentURL.endsWith('smartwod-timer')) {
    return 'SW';
  }
  return undefined;
}

// Function to extract card number from the href attribute
function getCardNumberFromHref(href) {
  const matches = href.match(/\/c\/[^/]+\/(\d+)/);
  if (matches && matches[1]) {
    return matches[1];
  }
  return '';
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Action Called', request.action);
  if (request.action === 'executeScript') {
    // Execute your script on the web page here
    addCardNumbers();
  }
});

function waitForElementToAppear() {
  // Define the target element you want to wait for
  const targetElement = document.getElementById('board'); // Change to your target selector
  if (targetElement) {
    // The target element is already present, you can perform your manipulation here
    // For example, you can modify the target element or its parent
    addCardNumbers();
  } else {
    // If the target element is not present yet, set up a MutationObserver
    const observer = new MutationObserver(function (mutationsList, observer) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          // Check if the target element has been added
          const cardLinks = mutation.target.querySelectorAll(
            'a[data-testid="card-name"]'
          );

          if (cardLinks.length > 0) {
            console.log('CHANGE', cardLinks.length);
            // Target element is now present, you can perform your manipulation here
            addCardNumbers();
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

window.addEventListener('load', () => {
  waitForElementToAppear();
});
