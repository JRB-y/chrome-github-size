const APIUrl = `http://api.github.com/repos/`
const INVALID_MSG = `Please visit a public repository`
const displayBox = document.getElementById("size-box");

// Get the query of the current tab
let query = { active: true, currentWindow: true }

const callback = async function (tabs) {
  let vendorRepo = vendorReporFormat(tabs);

  const response = await fetch(`${APIUrl}${vendorRepo}`)
  const result = await response.json()
  const size = parseFloat(parseInt(result.size)).toFixed(2)

  !isNaN(size) ?
    displayBox.innerHTML = vendorRepo + "<br>" + fileSize(size) :
    displayBox.innerHTML = INVALID_MSG
}

chrome.tabs.query(query, callback)

const vendorReporFormat = (tabs) => {
  let currentTab = tabs[0]
  let url = currentTab.url.split("/")
  return `${url[url.length - 2]}/${url[url.length - 1]}`
}

/**
 * Convert a String or a Number to a human readeble format.
 * 
 * https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string/10420404
 * @param {string|Number} size 
 */
const fileSize = (size) => {
  let i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['kB', 'MB', 'GB', 'TB'][i]
}