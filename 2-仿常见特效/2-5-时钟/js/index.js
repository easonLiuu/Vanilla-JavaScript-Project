window.onload = function () {
  var hour = document.getElementById("hour");
  var minute = document.getElementById("minute");
  var second = document.getElementById("second");

  // 谷歌和safiri 用webkit前缀  火狐 用Moz  IE 用Ms   opera 用 O
  var h = 0,
    m = 0,
    s = 0,
    ms = 0;
  setInterval(function () {
    // 获得当前的秒数  分数  时数
    var date = new Date();
    ms = date.getMilliseconds();
    s = date.getSeconds() + ms / 1000;
    m = date.getMinutes() + s / 60;
    h = (date.getHours() % 12) + m / 60;

    second.style.webkitTransform = "rotate(" + 6 * s + "deg)";
    minute.style.webkitTransform = "rotate(" + 6 * m + "deg)";
    hour.style.webkitTransform = "rotate(" + 30 * h + "deg)";
  }, 100);
};
