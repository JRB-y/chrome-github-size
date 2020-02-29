let displayBox = document.getElementById('size-box');

let query = { active: true, currentWindow: true };
chrome.tabs.query(query, callback);

function callback(tabs) {

  let currentTab = tabs[0]
  let url = currentTab.url.split("/")
  let vendorRepo = `${url[url.length - 2]}/${url[url.length - 1]}`

  fetch(`http://api.github.com/repos/${vendorRepo}`).then(r => r.json()).then(result => {
    let sizeInMb = parseFloat(parseInt(result.size) / 1024).toFixed(2)
    // display
    if (isNaN(sizeInMb)) {
      displayBox.innerHTML = "Please visite a public repository"
    } else {
      displayBox.innerHTML = vendorRepo + "<br>" + sizeInMb + " Mb"
    }
  })
}