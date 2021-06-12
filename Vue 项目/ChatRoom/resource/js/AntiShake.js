export function debounce(func, delay) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      // func 需要执行防抖的函数 , apply 改变 this 指向,指向当前传进来的函数
      func.apply(this, arguments);
      console.log("OK执行完了");
    }, delay);
  };
}
