//keeps track of the pages and the required data
window.hello = {}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    window.hello[request.url] = request.count
})

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({url: 'popup.html'})
})