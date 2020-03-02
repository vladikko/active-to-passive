let entry={};

var dict;
//скачивание словаря с сервера
$.get("https://vladikko.com/dict.txt", function(contents) {
  dict=new Set(contents.split('\n'));
},"text")
//


//check page for passive
var i = 0;
$(document).ready(function () {
    var page_text = document.body.innerText.split(/[ .:;?!~,`"&|()<>{}\[\]\r\n/\\]+/);
    console.log(page_text);
    function passive_check(){
    setTimeout(function () {
      if (i<page_text.length) {
        if(dict.has(page_text[i].toLowerCase())){
         save1(page_text[i],"passive");
     }
     passive_check();
      }

   i++;
 }, 1);
}
passive_check();
});
//

//сохранение в БД в случае пассивного запаса
function save2_passive(word, entry) {
  if (!entry) {
    entry = {passive: 1, active: 0};
  } else {
    entry = {passive: entry.passive+1, active: entry.active};
    console.log(entry);
  }
  var value = {};
  value[word] = entry;
   chrome.storage.local.set(value);
}
////////////

//сохранение в БД в случае активного запаса
function save2_active(word, entry) {
  if (!entry) {
    entry = {passive: 0, active: 1};
    alert("Слово использовано в первый раз");
  } else {
     entry = {passive: entry.passive, active: entry.active + 1};
    alert("Слово использовано в " + entry.active + " раз");
  }
  var value = {};
  value[word] = entry;
  chrome.storage.local.set(value);

}
//сохранние в БД
function save1(word,word_type) {
  chrome.storage.local.get(word,function(result){
    var entry = result[word];
    if (word_type=="active") {
    save2_active(word, entry);
    }
    else if (word_type=="passive") {
    save2_passive(word,entry);
    }
    if (word_type=="passive>active") {
      save2_p_a(word,entry);
    }
  })
}

//var lemma = require.('./lemma.js');
keys = '';

document.addEventListener('keypress', function (e) { // создаёт событие для отслеживания ввода с клавиатуры
  var key;
  key = String.fromCharCode(event.keyCode);
  if (key.match(/[ .:;?!~,`"&|()<>{}\[\]\r\n/\\]+/)) {
    if (dict.has(keys)) {
      alert("+");
      save1(keys,"active");
    } else {
      alert("-");
    }
    keys="";
  } else {
    keys += key;
  }
});
