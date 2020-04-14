function findRange(user_target) {
  var sizeMap = createSizingMap();
  var size = "NA";
  
  sizeMap.forEach( (value, key, map) => {
	console.log("checking " + user_target + " in range " + value.lower + " - " + value.upper);
    if(user_target >= parseInt(value.lower)) {
	console.log("passes lower");
      if(user_target <= parseInt(value.upper)) {
	console.log("passes upper");
          size = key;
      }
    }
  });
  return size;
}

function isSizeHeader(key_value) {
  var known = ["A&F", "Size"];
  for(var k in known) {
    if(known[k] == key_value) {
      return true;
    }
  }
  return false;
}

function isSizeValue(value) {
  var known = ["XXXS", "XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  for(var k in known) {
    if(known[k] == value) {
      //console.log("\t input value " + value + " = " + k);
      return true;
    }
  }
  return false;
}

function isMeasurement(header) {
  var is_bust = new RegExp(/bust/i);
  var centimeters = new RegExp(/c.*m/i);
  if(is_bust.test(header) && !centimeters.test(header)) {
    return true;
  } 
  return false;
}

function normalizeBounds(given_key) {
  var lower;
  var upper;
  
  var a = given_key.split("-");

  if(a.length == 2) {
    lower = parseInt(a[0]);
    upper = parseInt(a[1]);
  } else if(a.length == 1) {
    lower = parseInt(a[0]);
    upper = parseInt(a[0]);
  } else {
    console.log("***Input Parse Error***");
    lower = -1;
    upper = -1;
  }
  //return 2 elements with labels. format label: value, label: value
  return {
        lower: lower,
        upper: upper,
    };
}
var data;
function createSizingMap() {
console.log("Trying to make sizing map");

//var fs = require('fs');
//var data=fs.readFileSync('data.json', 'utf8');
//var data=JSON.parse(data);

console.log("moving on");
const sizing_map = new Map();
for (var size in data) {
    //go grab the values we're looking for
    var size_letters_for_map = "";
   // var bounds = new BoundPair;
    var obj_bounds;
    if (data.hasOwnProperty(size)) {
      
      for(var key in data[size]) {
        if(data[size].hasOwnProperty(key)) {
          //need more durable check if it's the size.
          if(isSizeHeader(key) || isSizeValue(data[size][key])) {
            //console.log("Found size letters: " + key + " -> " + data[size][key]);
            size_letters_for_map = data[size][key];
            
          }
          if(isMeasurement(key)) {
              //console.log("Found measurement key: " + key + " -> " + data[size][key]);
              var vals = normalizeBounds(data[size][key]);
              obj_bounds = {
                "lower" : vals.lower,
                "upper" : vals.upper
              }
              
          }
        //console.log(key + "->" + data[size][key]);
        }
      }
    } else {
     // console.log("data doesn't have " + key);
    }
    //add them to the Map
    //console.log("adding " + size_letters_for_map + " -> " + bounds.lower() + " - " + bounds.upper());
  //  sizing_map.set(size_letters_for_map, bounds);
    if(typeof obj_bounds !== 'undefined') {
      
    //update bounds if size already exists
      if(sizing_map.has(size_letters_for_map)) {
        new_low = Math.min(sizing_map.get(size_letters_for_map).lower, obj_bounds.lower);
        new_high = Math.max(sizing_map.get(size_letters_for_map).upper, obj_bounds.upper);
        obj_bounds.lower = new_low;
        obj_bounds.upper = new_high;
    }
//console.log("adding " + size_letters_for_map + " -> " + obj_bounds.lower + " - " + obj_bounds.upper);
      sizing_map.set(size_letters_for_map, obj_bounds);
    }
    //console.log("***");
}
console.log(sizing_map);
return sizing_map;
}
function printShirt() {
    alert("Clicking the shirt triggers JS!");
}

function printPants() {
    alert("Clicking the pants triggers JS!");
}

function convertToMessage(val, email) {
	if(val == "NA") {
		document.getElementById('size_display').style.fontSize="14px";
		
		return "Sorry, looks like your size isn't in stock :(\nWould you like us to email you at " + email + " when it's available?";
	} 
	document.getElementById('size_display').style.fontSize="";
	return val;
}

window.onload = function() {
	var url = chrome.runtime.getURL("data.json");
	console.log("found json at " + url);
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			console.log("grabbing file");
			data = JSON.parse(xhr.responseText);
		}
	}


	xhr.open("GET", url, true);
	xhr.send();

    var waist;
    var inseam;
    var chest;
    var email;
    chrome.storage.sync.get({
        waistSize: 29,
        inseamSize: 34,
        chestSize: 35,
	userEmail: "empty"
    }, function(items) {
	waist = items.waistSize;
	inseam = items.inseamSize;
	chest = items.chestSize;
	email = items.userEmail;
        document.getElementById('waist_display').innerHTML = (waist) + "\"";
        document.getElementById('inseam_display').innerHTML = (inseam) + "\"";
        document.getElementById('chest_display').innerHTML = (chest) + "\"";
    });
document.getElementById("shirt_img").addEventListener("click", function() {
        document.getElementById('selected_size').innerHTML = (convertToMessage(findRange(chest), email));
	document.getElementById('size_display').style.visibility="visible";
	
    });
    document.getElementById("pants_img").addEventListener("click", function() {
	document.getElementById('selected_size').innerHTML = (convertToMessage(findRange(waist), email));
	document.getElementById('size_display').style.visibility="visible";
    });
    document.getElementById("size_display").addEventListener("click", function() {
         document.getElementById('size_display').style.visibility="hidden";
    });
}
chrome.identity.getProfileUserInfo(function(userinfo) {
    var email = userinfo.email;
    if (email == null || email == "") {
        chrome.storage.sync.set({
            userEmail: "empty"
        });
    } else {
        chrome.storage.sync.set({
            userEmail: email
        });
    }
});

/*
chrome.tabs.query({
    'active': true,
    'lastFocusedWindow': true
}, function(tabs) {
    var url = tabs[0].url;
    if (url != null) {
        let re = new RegExp("http[s]?:\/\/(www\.)?([^\/]+)\/");
        var match = re.exec(url);
        if (match != null) {
            var cut = match[2].lastIndexOf(".");
            var webName = match[2].substring(0, cut);
            chrome.storage.sync.set({
                websiteName: webName
            });
        };
    }

});
*/