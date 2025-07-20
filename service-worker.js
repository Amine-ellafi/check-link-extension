// Store scan results in memory
let scanResults = null;

// Handle messages from content script and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Content script sends scan results
  if (sender.tab && request.action === "scanResults") {
    scanResults = request.data;
    console.log("Received scan results from content script");
    sendResponse({status: "received"});
  }
  
  // Popup requests scan results
  else if (request.action === "getResults") {
    console.log("Providing scan results to popup");
    sendResponse(scanResults);
  }
  
  return true; // Required for async responses
});