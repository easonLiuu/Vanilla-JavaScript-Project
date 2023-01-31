/* 思路：1.将所有图片的路径设置为懒加载图片，真实图片路径通过data-XXX存储起来
          2.判断图片是否可见，如果可见，将图片的路径设置为真实路径
            2.1 获取可见视口的高度
            2.2 获取图片距离可视窗口顶部的距离
            2.3 获取浏览器滚动条的高度
            2.4 判断图片是否可见
            2.5 设置图片路径
  */

  window.onload = function () {
    var imgs = document.getElementsByClassName("lazy-img");

    // 加载首屏的图片
    lazyLoad(imgs);
    // 窗口滚动时，触发懒加载函数
    window.onscroll = function () {
      lazyLoad(imgs);
    };
  };

  function lazyLoad(images) {
    // 2.1 获取可视窗口的高度
    var viewHeight = window.innerHeight;

    // 2.3 获取浏览器滚动条的高度（也就是内容向上滚动了多高）
    var scrollTop =
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      window.pageYOffset;

    for (var i = 0; i < images.length; i++) {
      (function (i) {
        // 2.2 获取图片距离视图窗口顶部的距离
        var imageToTop = images[i].offsetTop;

        // 2.4 判断图片是否可见，如果图片距可视窗口顶部的距离小于可视窗口的高度与滚动条高度之和，则该图片可见；
        if (imageToTop - viewHeight - scrollTop < 0) {
          // 制造图片延迟加载的动画效果
          setTimeout(function () {
            // 2.5 设置图片路径
            // 获取真实图片的路径
            var realSrc = images[i].getAttribute("data-src");
            // 设置图片的路径
            images[i].setAttribute("src", realSrc);
          }, 500);
        }
      })(i);
    }
  }

