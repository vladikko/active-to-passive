
var dict;
$.get("https://vladikko.com/dict.txt", function(contents) {
  dict=new Set(contents.split('\n'));
},"text")

var html = "<table id = 'myTable'><tr><th id='td0'>Word</th><th id='td1'>Passive</th><th id='td2'>Active</th></tr><tr>";
function save2_table(word,entry){
  if (!entry) {
      entry = {passive: 0, active: 0};
  }
  html += "<td>" + word + "</td>";
  html += "<td>" + entry.passive + "</td>";
  html += "<td>" + entry.active + "</td>";
  html += "</tr><tr>";
}

$(document).ready(function() {
function p_a(){
chrome.tabs.executeScript(null, {
    allFrames: true,
    file: 'color.js'
});
}




var perrow = 2;
let entry={};
dict.forEach(function(item,i,arr) {
  chrome.storage.local.get(item,function(result){
    entry=result[item];
    save2_table(item,entry);
  });
});
setTimeout(function() {
    html += "</tr></table>";
    document.getElementById("container").innerHTML = html;
    el = document.getElementById('p_a');
    el.addEventListener('click', p_a);

    td0 = document.getElementById('td0');
    td0.addEventListener('click',sortTable0);

    td1 = document.getElementById('td1');
    td1.addEventListener('click',sortTable1);

    td2 = document.getElementById('td2');
    td2.addEventListener('click',sortTable2);
}, 15);

function sortTable0(){
  sortTable(0);
}
function sortTable1(){
  sortTable(1);
}
function sortTable2(){
  sortTable(2);
}





function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 2); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
  shouldSwitch = true;
  break;
}
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
  shouldSwitch = true;
  break;
}
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

});
