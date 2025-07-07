let allU = document.getElementsByTagName('u');

let result = new Object();
result["Nb"] = allU.length;


function checkMe(allU){

  for (let i =0 ; i < allU.length; i++){
  //check if there is a inside u
  let x=allU[i].getElementsByTagName('a');
  console.log(x);
  
  if (x.length > 0)  {
    if (x[0].getAttribute("href") !== ""){
      let y= x[0].getAttribute("href");
      //let x = allU[i].getElementsByTagName('a')[0];
      //console.log(allU[i].getElementsByTagName('a'));
      console.log(`🔗✅ ${allU[i].textContent.trim()}`);
      result[`${i}`] =`🔗✅ ${allU[i].textContent.trim()}`;
      allU[i].style.border = "1px solid green";
      //console.log(x.getAttribute("href"));
    }else{
      console.log("🔗❌ ",allU[i].textContent.trim());
      result[i] = `🔗❌ ${allU[i].textContent.trim()}`;
      allU[i].style.border = "1px solid red";
    }

  }
  // if there is no a inside u
  else if (allU[i].parentElement.tagName.toLowerCase() === "a" ){ 
      console.log(typeof allU[i].parentElement); 
      console.log(allU[i].parentElement.getAttribute('href'));
      let z = allU[i].parentElement.getAttribute('href');
      if (z !== ""){
        console.log("🔗✅",allU[i].textContent.trim());
        result[i] = `🔗✅ ${allU[i].textContent.trim()}`;
        allU[i].style.border = "1px solid green";
      }
  }
  else{
    console.log("🔗❌ ",allU[i].textContent.trim());
    result[i] = `🔗❌ ${allU[i].textContent.trim()}`;
    allU[i].style.border = "1px solid red";

    console.log(`This is %c${allU[i].innerHTML.trim()}%c Not a link`,'color: red; font-weight: bold;','color:black');
  }
  
}
return result;
}



console.log("starting ...");
// checkMe(allU);
// Send message to the background service worker
//chrome.runtime.sendMessage({type: "scanResults", data: result});
console.log("finished!!!");
console.log("***********************************************************************************");
console.log(result);
// 1. Send a message to the service worker requesting the user's data
// Only send message when requested by popup
// Add this function to remove borders
function removeBorders() {
  const allU = document.getElementsByTagName('u');
  for (let i = 0; i < allU.length; i++) {
    allU[i].style.border = "none";
  }
}

// Modify your message listener to handle the remove borders request
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scanLinks") {
    const allU = document.getElementsByTagName('u');
    const result = checkMe(allU);
    sendResponse(result);
  }
  else if (request.action === "removeBorders") {
    removeBorders();
    sendResponse({status: "borders removed"});
  }
  return true;
});
console.log("send")