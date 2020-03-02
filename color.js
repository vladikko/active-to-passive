function save2_p_a(word,entry){
  if (entry.passive>entry.active) {
    var $els = $('body *'); // переглядає усі елементи

    $.fn.changeWord = function (str) {
        var regex = new RegExp(str, "gi"); // g - глобальне зіставлення, і - ігнорування регістра при зіставленні
        return this.each(function () {
            this.innerHTML = this.innerHTML.replace(regex, function(matched) {
                return "<span style='color:blue'>" + matched + "</span>"; // шукає слова з словника та виділяє потрібні синім кольором
            });
        });
    };

    $els.changeWord(word);
}
}

var page_text = document.body.innerText.split(/[ .:;?!~,`"&|()<>{}\[\]\r\n/\\]+/);
    page_text.forEach(function(item, i, arr) {
      if (dict.has(item)) {
        save1(item,"passive>active");

      }
  });
