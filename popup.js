let displayBox = document.getElementById("size-box");

let query = { active: true, currentWindow: true };
chrome.tabs.query(query, callback);

function callback(tabs) {
  let currentTab = tabs[0];
  let url = currentTab.url.split("/");
  let vendorRepo = `${url[url.length - 2]}/${url[url.length - 1]}`;

  fetch(`http://api.github.com/repos/${vendorRepo}`)
    .then(r => r.json())
    .then(result => {
      let size = parseFloat(parseInt(result.size)).toFixed(2);
      let sizeUnit = "Kb";
      if (isNaN(size)) {
        displayBox.innerHTML = "Please visit a public repository";
      } else {
        if (size > 1024) {
          size = (size / 1024).toFixed(2);
          sizeUnit = "Mb";
          if (size > 1024) {
            size = (size / 1024).toFixed(2);
            sizeUnit = "Gb";
          }
        }
        displayBox.innerHTML = vendorRepo + "<br>" + size + " " + sizeUnit;
      }
    });
}
