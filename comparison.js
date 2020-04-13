//Get user input
waist = -1;
inseam = -1;
chest = -1;
chrome.storage.sync.get({
    waistSize: -1,
    inseamSize: -1,
    chestSize: -1
  }, function(items) {
    waist = items.waistSize;
    inseam = items.inseamSize;
    chest = items.chestSize;
  });
}
//Get the data from the json
let myRequest = new Request("./data.json");

fetch(myRequest)
    .then(function(resp) {
        return resp.json();
    })
    .then (function(data){
     //create array to traverse through

    })
var size  = ["XXS","XS","S","M","L","XL"];
var chestData = ["32","33","34","35","35","36"];
var waistData = ["24","25","26","27","28","29"];
var inseamData = ["24","25","26","27","28","29"];
String correctSize = " ";
boolean hips = false;
boolean waist = false;
correctSize = comparison();




function comparison(){
    if(chest != -1)
    {
        var tempIndex = chestData.indexOf(chest)
        if(tempIndex != -1)
        {
            return size[tempIndex];
        }

    }
    if(waist != -1 && inseam != 1)
        {
            var tempIndex1 = waistData.indexOf(waist);
            var tempIndex2 = inseamData.indexOf(inseam);
            if(tempIndex1 != -1 && tempIndex2 != -1)
            {
                return biggerSize();
            }
        }

    return "Sorry, your size is not available at this outlet"
}

function biggerSize(){
    var big = Math.max(tempIndex1, tempIndex2)
    return size[big];
}
