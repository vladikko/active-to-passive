chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
    if (changeInfo.status === 'complete') {
		chrome.tabs.executeScript(tabId, { // вставка скриптов в главную страницу
            allFrames: true,
            file: 'jquery-3.3.1.min.js'
        });
        chrome.tabs.executeScript(tabId, {
            allFrames: true,
            file: 'keylogger.js'
        });
    }
});

//создание диаграммы с статистикой
chrome.contextMenus.create({
 title: "Статистика по слову",
 contexts:["selection"],
 onclick: showChart
});
function chart(entry){
  var htmlCode = '<html><head><title>Statistics</title></head><body><div width="400px" height="400px"><canvas id="myChart" width="400" height="400"></canvas></div><script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script><script>new Chart(document.getElementById("myChart"),{"type":"doughnut","data":{"labels":["Passive","Active"],"datasets":[{"label":"My First Dataset","data":['+entry.passive+','+entry.active+',],"backgroundColor":["rgb(54, 162, 235)","rgb(255, 99, 132)"]}]}});</script></body></html>';
var url = "data:text/html," + encodeURIComponent(htmlCode);
chrome.windows.create({url: url,type:"popup",width:400,height:400});
}
function showChart(word){
  var slovo = word.selectionText.toLowerCase();
    chrome.storage.local.get(slovo,function(result){
      var entry = result[slovo];
      chart(entry);
});

}
