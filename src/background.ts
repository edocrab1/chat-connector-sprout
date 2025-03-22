
// Chrome extension background script
chrome.runtime.onInstalled.addListener(() => {
  console.log('Telegram-style Chat Extension installed!');
  
  // Initialize storage with default values
  chrome.storage.local.set({
    messages: [],
    settings: {
      notifications: true,
      theme: 'light'
    }
  });
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SAVE_MESSAGES') {
    chrome.storage.local.set({ messages: request.messages });
    sendResponse({ status: 'Messages saved' });
  }
  
  if (request.type === 'GET_MESSAGES') {
    chrome.storage.local.get('messages', (data) => {
      sendResponse({ messages: data.messages || [] });
    });
    return true; // Required for async response
  }
  
  return true;
});
