document.addEventListener('DOMContentLoaded', function () {

const bg = chrome.extension.getBackgroundPage()
Object.keys(bg.hello).forEach(function(url) {
    const div = document.createElement('div')
    div.textContent = `${url}: ${bg.hello[url]}`
    document.body.appendChild(div)
})
//press of a button leads to counting of all the hellos on the page
//    document.querySelector('button').addEventListener('click', onclick, false)

 //   function onclick() {
 //       chrome.tabs.query({currentWindow: true, active: true},
  //      function (tabs) {
 //            chrome.tabs.sendMessage(tabs[0].id, 'hi',setCount)
 //           })
 //   }

//    function setCount(res){
 //   const div = document.createElement('div')
 //         div.textContent = `${res.count} hellos`
 //         document.body.appendChild(div)
//    }
}, false)