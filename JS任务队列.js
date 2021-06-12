// 先执行主线程 , 再执行任务队列 , 任务队列又先执行微任务 , 最后执行宏任务(微任务都执行完 , 才能执行宏任务)
// 微任务:(microtask queue) Promise.then、 Mutation Observer API、queueMicrotask()、process.nextTick
// 宏任务:(macrotask queue) ajax、setTimeout、setInterval、DOM监听、UI Rendering
async function async1() {
  console.log("async1 开始");
  await async2();
  console.log("async1 结束");
}
/*
 function async1() {
  console.log("async1 开始");
  
  new Promise((resolve) => {
    function async2() {
      console.log("async2");
    }
    async2();

    resolve();
    
  }).then(() => {
    console.log("async1 结束");
  });
}
 */
async function async2() {
  console.log("async2");
}

console.log("主线程");

setTimeout(() => {
  console.log("定时器");
}, 0);

async1();

new Promise((resolve) => {
  console.log("Promise1");
  resolve();
}).then(() => {
  console.log("Promise2");
});

console.log("结束");
/*
主线程
async1 开始  
async2
Promise1
结束
async1 结束
Promise2
定时器
 */

function async1() {
  console.log("async1 开始");
  new Promise((resolve) => {
    function async2() {
      console.log("async2");
    }
    async2();
    resolve();
  }).then(() => {
    console.log("async1 结束");
  });
}

console.log("主线程");
setTimeout(() => {
  console.log("定时器");
}, 0);

async1();

new Promise((resolve) => {
  console.log("Promise1");
  resolve();
}).then(() => {
  console.log("Promise2");
});

console.log("结束");
