function isSizeHeader(key_value) {
    var known = ["A&F", "Size"];
    for (var k in known) {
        if (known[k] == key_value) {
            return true;
        }
    }
    return false;
}

function isSizeValue(value) {
    var known = ["XXXS", "XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
    for (var k in known) {
        if (known[k] == value) {
            //console.log("\t input value " + value + " = " + k);
            return true;
        }
    }
    return false;
}

function isMeasurement(header, dimension) {
    var has_dim;
    if (dimension == "waist") {
        has_dim = new RegExp(/waist/i);
    } else if (dimension == "bust") {
        has_dim = new RegExp(/bust/i);
    } else if (dimension == "inseam") {
        has_dim = new RegExp(/inseam/i);
    } else {
        has_dim = new RegExp(/bust/i); //default to something on error, shouldn't ever be called.
    }

    var centimeters = new RegExp(/c.*m/i);
    if (has_dim.test(header) && !centimeters.test(header)) {
        return true;
    }
    return false;
}

function findRange(user_target, dimension) {
    var sizeMap = createSizingMap(dimension);
    var size = "NA";

    sizeMap.forEach((value, key, map) => {
        console.log("checking " + user_target + " in range " + value.lower + " - " + value.upper);
        if (user_target >= parseInt(value.lower)) {
            console.log("passes lower");
            if (user_target <= parseInt(value.upper)) {
                console.log("passes upper");
                size = key;
            }
        }
    });
    return size;
}



function normalizeBounds(given_key) {
    var lower;
    var upper;

    var a = given_key.split("-");

    if (a.length == 2) {
        lower = parseInt(a[0]);
        upper = parseInt(a[1]);
    } else if (a.length == 1) {
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

function createSizingMap(dimension) {
    const sizing_map = new Map();
    for (var size in data) {

        //find a key and a value header, then create map with it
        var size_letters_for_map = "";
        var obj_bounds;
        if (data.hasOwnProperty(size)) {
            for (var key in data[size]) {
                if (data[size].hasOwnProperty(key)) {
                    //need more durable check if it's the size.
                    if (isSizeHeader(key) || isSizeValue(data[size][key])) {
                        size_letters_for_map = data[size][key];
                    }
                    if (isMeasurement(key, dimension)) {
                        var vals = normalizeBounds(data[size][key]);
                        obj_bounds = {
                            "lower": vals.lower,
                            "upper": vals.upper
                        }
                    }
                }
            }
        }
        //check for already existing
        if (typeof obj_bounds !== 'undefined') {

            //update bounds if size already exists
            if (sizing_map.has(size_letters_for_map)) {
                new_low = Math.min(sizing_map.get(size_letters_for_map).lower, obj_bounds.lower);
                new_high = Math.max(sizing_map.get(size_letters_for_map).upper, obj_bounds.upper);
                obj_bounds.lower = new_low;
                obj_bounds.upper = new_high;
            }
            sizing_map.set(size_letters_for_map, obj_bounds);
        }
    }

    console.log(sizing_map);
    return sizing_map;
}

function convertToMessage(val, email) {
    if (val == "NA") {
        document.getElementById('size_display').style.fontSize = "14px"; //small font to make it fit
        return "Sorry, looks like your size isn't in stock :(\nWould you like us to email you at " + email + " when it's available?";
    }
    document.getElementById('size_display').style.fontSize = ""; //normal font

    if (document.getElementById('gender_toggle_box').checked) {
        return "Men's " + val;
    } else {
        return "Women's " + val;
    }
}

window.onload = function() {
    //Start process of getting JSON
    var webName;
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
                webName = match[2].substring(0, cut);
                //store webName in function scope, also store in chrome for future flexibility
                chrome.storage.sync.set({
                    websiteName: webName
                });
            };
        }
    });
    console.log("At website: " + webName);
    var sizing_chart_link;
    //@Krithika TODO: go search for sizing chart with website name webName and store in sizing_chart_link

    //do some checking that sizing_chart_link was found nicely. if it wasn't, we need to discuss how to handle that
    //if it wasn't found nicely, that means they are at like google.com or something, no Sizing Chart available.

    //@Nivetha TODO: with the sizing chart located at web address sizing_chart_link, scrape and generate json
    //store the json in data.json? We can discuss caching some and filename structure

    //use XML request to get the json stored in the chrome extension working directory
    var url = chrome.runtime.getURL("data.json");
    console.log("found json at " + url);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            console.log("grabbing file");
            data = JSON.parse(xhr.responseText);
        }
    }
    xhr.open("GET", url, true);
    xhr.send();

    //fill in all of the frontend elements
    var waist;
    var inseam;
    var chest;
    var email;
    var checked_men;
    chrome.storage.sync.get({
        waistSize: 29,
        inseamSize: 34,
        chestSize: 35,
        userEmail: "empty",
        gender: false
    }, function(items) {
        waist = items.waistSize;
        inseam = items.inseamSize;
        chest = items.chestSize;
        email = items.userEmail;
        checked_men = items.gender;
        document.getElementById('waist_display').innerHTML = (waist) + "\"";
        document.getElementById('inseam_display').innerHTML = (inseam) + "\"";
        document.getElementById('chest_display').innerHTML = (chest) + "\"";
        document.getElementById('gender_toggle_box').checked = checked_men;
    });

    //add event listeners to give action on clicks
    document.getElementById("shirt_img").addEventListener("click", function() {
	introJs().start();
        document.getElementById('selected_size').innerHTML = (convertToMessage(findRange(chest, "bust"), email));
        document.getElementById('size_display').style.visibility = "visible";

    });
    document.getElementById("pants_img").addEventListener("click", function() {
        document.getElementById('selected_size').innerHTML = (convertToMessage(findRange(waist, "waist"), email));
        document.getElementById('size_display').style.visibility = "visible";
    });
    document.getElementById("size_display").addEventListener("click", function() {
        document.getElementById('size_display').style.visibility = "hidden";
    });

    //save the gender toggle state everytime they edit it. we load this next start up
    document.getElementById("gender_toggle_box").addEventListener("change", function() {
        chrome.storage.sync.set({
            gender: document.getElementById("gender_toggle_box").checked
        });
    });

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
}