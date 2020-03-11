window.onload=function() {
  
chrome.storage.sync.get({
    waistSize: 29,
    inseamSize: 34,
    chestSize: 35
  }, function(items) {
    document.getElementById('waist_display').innerHTML = items.waistSize;
    document.getElementById('inseam_display').innerHTML = items.inseamSize;
    document.getElementById('chest_display').innerHTML = items.chestSize;
  });
}


document.getElementById("edit_btn").addEventListener("click", openOptions);

function openOptions(){
  var optionsURL = chrome.extension.getURL("options.html");
  chrome.tabs.create({url: optionsURL });
}

//for whatever reason, the email is blank.
  chrome.identity.getProfileUserInfo(function(userinfo) {
	var email = userinfo.email;
	if(email == null || email == "") { document.getElementById('disp_email').innerHTML="email not found"; } else {
	document.getElementById('disp_email').innerHTML = email; }
  });  	

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    	var url = tabs[0].url;
	if(url != null) {
		let re = new RegExp("http[s]?:\/\/(www\.)?([^\/]+)\/");
		var match = re.exec(url);
		document.getElementById('curr_url').innerHTML = url
		if(match != null) {
			var cut = match[2].lastIndexOf(".");
			document.getElementById('curr_url').innerHTML = match[2].substring(0, cut);
		}
	}
  });