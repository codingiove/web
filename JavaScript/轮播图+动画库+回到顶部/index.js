window.addEventListener("load", function () {
  var banner = document.querySelector(".banner");
  var zuoo = banner.querySelector(".zuo");
  var you = banner.querySelector(".you");

  //动态生成小圆圈,有几张图片就生成几个小圆圈
  var ul = banner.querySelector("ul");
  var ol = banner.querySelector("ol");
  var tupd = document.querySelector(".tupd");
  var bannerWidth = tupd.offsetWidth;
  var key = true;
  for (var i = 0; i < ul.children.length; i++) {
    //创建 li
    var li = document.createElement("li");
    //创建索引号,记录当前索引号
    li.setAttribute("index", i);
    //插入到 ol里
    ol.appendChild(li);
    //给 ol li加点击事件
    li.addEventListener("click", function () {
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = "";
      }
      this.className = "current";
      //移动图片,移动的 ul,ul的移动距离就是(小圆圈的索引号 x 图片的宽度)(是负值)
      //this.getAttribute("index"),这个 this 是当前 li 里的那个 index
      var index = this.getAttribute("index");
      //当我点击了小圆圈,就要把它的索引值给我箭头
      num = index;
      //图片和小圆圈的位置不相同的问题
      circle = index;
      // num = circle = index //简写;
      Animation(ul, -index * bannerWidth);
    });
  }
  ol.children[0].className = "current";
  //克隆第一张图片放到 ul 最后面
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);
  //点击箭头滚动
  var num = 0;
  var circle = 0;
  you.addEventListener("click", function () {
    if (key) {
      key = false;
      if (num == ul.children.length - 1) {
        //如果走到了最后复制的一张图,此时 我们的 ul 要快速复原 left 改为 0
        ul.style.left = 0;
        num = 0;
      }
      num++;
      Animation(ul, - num * bannerWidth, function () {
        key = true;
      });
      //小圆圈跟着一箭头变化
      circle++;
      circle == ol.children.length ? (circle = 0) : circle;
      Clearstyle();
    }
  });

  zuoo.addEventListener("click", function () {
    if (key) {
      key = false;
      if (num == 0) {
        //如果是第一张点击了左箭头,那么就立马跳到最后一张
        num = ul.children.length - 1;
        ul.style.left = -num * bannerWidth + "px";
      }
      num--;
      Animation(ul, -num * bannerWidth, function () {
        key = true;
      });
      //小圆圈跟着一箭头变化
      circle--;
      circle < 0 ? (circle = ol.children.length - 1) : circle;
      Clearstyle();
    }
  });

  function Clearstyle() {
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = "";
    }
    //留下当前的小圆圈为 current 类名
    ol.children[circle].className = "current";
  }

  var timer = setInterval(function () {
    //手动调用点击事件
    you.click();
  }, 2000);
});


