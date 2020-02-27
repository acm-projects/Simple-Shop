
//chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {  //gives access to all data on page
//    const re = new RegExp('hello', 'gi') //case insensitive looks for all instances of hello
//    const matches = document.documentElement.innerHTML.match(re)
//    sendResponse({count: matches.length})
//})

const re = new RegExp('hello', 'gi') //case insensitive looks for all instances of hello
const matches = document.documentElement.innerHTML.match(re) || []

chrome.runtime.sendMessage({
    url: window.location.href,
    count: matches.length
})