async function getResultsFromBackground() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({action: "getResults"}, (response) => {
      resolve(response);
    });
  });
}

function displayResults(results) {
  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.classList.remove('hidden');
  
  resultsContainer.innerHTML = `
    <div class="card">
      <div class="header">
        <i class="fas fa-clipboard-list logo"></i>
        <h1>Scan Results</h1>
        <p>Found ${results.Nb} underlined elements</p>
      </div>
      
      <div class="results-list">
        ${Object.entries(results)
          .filter(([key]) => key !== "Nb")
          .map(([key, value]) => `
            <div class="result-item ${value.includes('✅') ? 'valid' : 'invalid'}">
              <i class="fas ${value.includes('✅') ? 'fa-check-circle' : 'fa-times-circle'}"></i>
              <span>${value}</span>
            </div>
          `).join('')}
      </div>
      
      <button class="btn back-btn" id="btnBack">
        <i class="fas fa-arrow-left"></i> Back to Scanner
      </button>
    </div>
  `;
  
  document.getElementById('btnBack').addEventListener('click', () => {
    resultsContainer.classList.add('hidden');
  });
}

function setupButtons() {
  document.getElementById('btnScan').addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      
      // Trigger scan in content script
      await chrome.tabs.sendMessage(tab.id, {action: "scanLinks"});
      
      // Get results from background
      const results = await getResultsFromBackground();
      
      if (results) {
        displayResults(results);
      } else {
        console.error("No results available");
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
}

// Initialize
setupButtons();