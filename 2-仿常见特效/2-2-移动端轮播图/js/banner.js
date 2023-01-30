(function () {
    window.onload = function () {
        var banner = document.querySelector("#banner-wrap");
        var list = document.querySelector("#banner-wrap>#banner-list");
        var rootWidth = -document.documentElement.clientWidth;
        var startX = 0;
        var index = 0;
        var translateX = 0;
        var tid = null;
        var lis = null;
        var points = null;

        init();
        autoPlay();

        //手指按下
        banner.addEventListener('touchstart', function (ev) {
            //禁止浏览器默认滑动事件
            ev.preventDefault();

            startX = ev.changedTouches[0].clientX;

            //关闭过渡效果
            list.style.transition = "0s";

            //关闭自动轮播
            clearInterval(tid);

            //无缝滑屏 改变index
            changeIndex();
        });

        //手指滑动
        banner.addEventListener('touchmove', function (ev) {
            //滑动差值
            var dis = ev.changedTouches[0].clientX - startX;

            //当前list总平移长度
            translateX = rootWidth * index + dis;

            //响应list滑动平移
            changePage(0, translateX);
        });

        //手指抬起
        banner.addEventListener('touchend', function () {
            //根据滑动长度求索引
            index = Math.round(translateX / rootWidth);

            //越界判断
            if (index < 0) {
                index = 0;
            } else if (index > lis.length - 1) {
                index = lis.length - 1;
            }

            changePage(.3, rootWidth * index);
            changePoint();
            autoPlay();
        });

        //自动轮播
        function autoPlay() {
            tid = setInterval(function () {
                changeIndex();
                changePage(0, rootWidth * index);

                //延时执行，为了让页面切换完毕
                setTimeout(function () {
                    index++;
                    changePage(.3, rootWidth * index);
                    changePoint();
                }, 500);

            }, 3000);
        }

        //更改索引 实现无缝滑屏
        function changeIndex() {
            if (index == 0) {
                //当显示第一张图片 切换到下一组的第一张
                index = points.length;
            } else if (index == lis.length - 1) {
                //当显示最后一张 切换到上一组的最后一张
                index = points.length - 1;
            }
        }

        //设置小圆点
        function changePoint() {
            for (var i = 0; i < points.length; i++) {
                points[i].classList.remove('active');
            }
            points[index % (points.length)].classList.add('active');
        }

        //滑动页面 平移list
        function changePage(duration, translateVal) {
            list.style.transition = duration + "s";
            list.style.transform = "translateX(" + translateVal + "px)";
        }

        //初始化list和point
        function init() {
            //添加一组
            list.innerHTML += list.innerHTML;

            //设置list宽度
            lis = document.querySelectorAll("#banner-wrap>#banner-list li");
            list.style.width = lis.length + "00%";

            //设置li宽度
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.width = 100 / lis.length + "%";
            }

            //创建point div
            var pointDiv = document.createElement("div");
            pointDiv.setAttribute("id", "point");
            for (var i = 0; i < lis.length / 2; i++) {
                var span = document.createElement("span");
                if (i == 0) {
                    span.classList.add('active');
                }
                pointDiv.appendChild(span);
            }
            banner.appendChild(pointDiv);
            points = document.querySelectorAll("#banner-wrap>#point span");
        }
    };
})();