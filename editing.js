function save_options() {
    var waist = document.getElementById('waist_input').value;
    var chest = document.getElementById('chest_input').value;
    var inseam = document.getElementById('inseam_input').value;
    chrome.storage.sync.set({
        waistSize: waist,
      	chestSize: chest,
      	inseamSize: inseam
    });
}

function load_options() {
    chrome.storage.sync.get({
        waistSize: 29,
        inseamSize: 34,
        chestSize: 35
    }, function(items) {
        document.getElementById('waist_input').value = items.waistSize;
        document.getElementById('inseam_input').value = items.inseamSize;
        document.getElementById('chest_input').value = items.chestSize;
    });
}

document.addEventListener('DOMContentLoaded', load_options);
document.getElementById('save_btn').addEventListener('click', save_options);