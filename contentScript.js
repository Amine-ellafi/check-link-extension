let allU = document.getElementsByTagName('u');
let result = new Object();
result["Nb"] = allU.length;

function checkMe(allU) {
  for (let i = 0; i < allU.length; i++) {
    let x = allU[i].getElementsByTagName('a');
    
    if (x.length > 0) {
      if (x[0].getAttribute("href") !== "") {
        let y = x[0].getAttribute("href");
        result[`${i}`] = `✅ ${allU[i].textContent.trim()}`;
        allU[i].style.border = "1px solid green";
      } else {
        result[i] = `❌ ${allU[i].textContent.trim()}`;
        allU[i].style.border = "1px solid red";
      }
    }
    else if (allU[i].parentElement.tagName.toLowerCase() === "a") {
      let z = allU[i].parentElement.getAttribute('href');
      if (z !== "") {
        result[i] = `✅ ${allU[i].textContent.trim()}`;
        allU[i].style.border = "1px solid green";
      }
    }
    else {
      result[i] = `❌ ${allU[i].textContent.trim()}`;
      allU[i].style.border = "1px solid red";
    }
  }
  return result;
}

function removeBorders() {
  const allU = document.getElementsByTagName('u');
  for (let i = 0; i < allU.length; i++) {
    allU[i].style.border = "none";
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scanLinks") {
    const allU = document.getElementsByTagName('u');
    const result = checkMe(allU);
    
    // Send results to background script
    chrome.runtime.sendMessage({
      action: "scanResults", 
      data: result
    });
    
    sendResponse(result);
  }
  else if (request.action === "removeBorders") {
    removeBorders();
    sendResponse({status: "borders removed"});
  }
  return true;
});