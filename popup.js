document.getElementById('btnScan').addEventListener('click', async () => {
  try {
    // Get active tab
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    
    // Send message to content script
    const response = await chrome.tabs.sendMessage(tab.id, {action: "scanLinks"});
    
    // Process results
    if (response) {
      console.log("Scan results:", response);
      displayResults(response); // You'll need to implement this
    } else {
      console.error("No response received");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

document.getElementById('btnRemoveBorders').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: "removeBorders"}, (response) => {
      console.log('Borders removed:', response);
    });
  });
});

function displayResults(results) {
  // Clear popup and show results
  document.body.innerHTML = '<h1>Scan Results</h1>';
  const container = document.createElement('div');
  
  // Display total count
  const countElem = document.createElement('h3');
  countElem.textContent = `Total underlined elements: ${results.Nb}`;
  container.appendChild(countElem);
  
  // Display each result
  for (let key in results) {
    if (key !== "Nb") {
      const resultElem = document.createElement('p');
      resultElem.textContent = results[key];
      resultElem.style.color = results[key].includes('✅') ? 'green' : 'red';
      container.appendChild(resultElem);
    }
  }
  
  document.body.appendChild(container);
}