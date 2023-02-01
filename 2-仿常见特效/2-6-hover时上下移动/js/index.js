function $(id) {
  return document.getElementById(id);
}

var timer = null;
var num = 0;
var img = $("img");

$("picUp").onmouseover = function () {
  clearInterval(timer);
  console.log("11");
  timer = setInterval(function () {
    num -= 3;
    num >= -1070 ? (img.style.top = num + "px") : clearInterval(timer);
  }, 30);
};
$("picDown").onmouseover = function () {
  clearInterval(timer);
  timer = setInterval(function () {
    num += 3;
    num < 0 ? (img.style.top = num + "px") : clearInterval(timer);
  }, 30);
};

$("picUp").parentNode.onmouseout = function () {
  clearInterval(timer);
};
