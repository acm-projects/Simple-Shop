window.onload=function() {
  chrome.storage.sync.get({
    waistSize: 29,
    inseamSize: 34,
    chestSize: 35
  }, function(items) {
    document.getElementById('waist_display').innerHTML = "waist" + items.waistSize;
    document.getElementById('inseam_display').innerHTML = "inseam" + items.inseamSize;
    document.getElementById('chest_display').innerHTML = "chest" + items.chestSize;
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