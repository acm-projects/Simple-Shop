// Saves options to chrome.storage
function save_options() {
  var waist = document.getElementById('waist').value;
  var inseam = document.getElementById('inseam').value;
  var shirt = document.getElementById('shirt').value;
  chrome.storage.sync.set({
    waistSize: waist,
    inseamSize: inseam,
    shirtSize: shirt
  }, function() {

    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    waistSize: 29,
    inseamSize: 34,
    shirtSize: "M"
  }, function(items) {
    document.getElementById('waist').value = items.waistSize;
    document.getElementById('inseam').value = items.inseamSize;
    document.getElementById('shirt').value = items.shirtSize;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);