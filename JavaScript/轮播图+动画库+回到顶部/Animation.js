/* 
当我一直点击 button,会不断的调用定时器,BUG
clearInterval(obj.timer);写上定时器的上面,
代码从上往下执行,先清除原先的定时器清除
清除完后在开启一个新的定时器

 匀速运动 就是 盒子当前的位置 + 固定的值(传过来的值) 
 缓动动画 就是 盒子当前的位置 + 变化的值(目标值 - 现在的位置) /10
 (target - obj.offsetLeft) / 10;

 */
function Animation(obj, target, callback) {
  clearInterval(obj.timer);
  // 给自己添加定时器
  obj.timer = setInterval(function () {
    //(目标值 - 现在的位置) /10
    var step = (target - obj.offsetLeft) / 10;
    // floor, 小数部分会被舍掉
    // ceil , 小数位只要有值就(当前数字 + 1 )
    //如果是正值我就往大的取,如果是负的值我就往小的取
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (obj.offsetLeft == target) {
      clearInterval(obj.timer);
      callback && callback();
    }
    obj.style.left = obj.offsetLeft + step + "px";
  }, 24);
}

//回到顶部
function BackToTop(obj, target, callback) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var step = (target - pageYOffset) / 10; // 速度
    // ceil , 小数位只要有值就(当前数字 + 1 )
    // floor, 小数部分会被舍掉
    // pageYOffset 返回当前离顶部的距离
    // 正值(ceil) 负值(floor)
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (pageYOffset === target) {
      clearInterval(obj.timer);
      // 有传就调用(因为传了就是 true),当前函数执行完,在执行回调函数
      callback && callback();
    }
    scroll(0, pageYOffset + step);
  }, 24);
}
