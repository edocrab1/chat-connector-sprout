
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set a specific size for the popup
document.body.style.width = '600px';
document.body.style.height = '600px';
document.body.style.margin = '0';
document.body.style.overflow = 'hidden';

createRoot(document.getElementById("root")!).render(<App />);

// Add message listeners for extension communication if needed
if (chrome?.runtime) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Message received:', request);
    sendResponse({ status: 'Message received' });
    return true;
  });
}
