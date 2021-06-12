// 宏任务(macrotask) : setTimeout 、 setInterval 、 IO事件 、 setImmediate 、 close事件;
// 微任务(microtask) : Promise.then回调 、 process.nextTick 、 queueMicrotask ;
//  script ---> nextTick ---> microtask ---> macrotask ---> immediate
async function async1() {
  console.log("async1开始");
  await async2();
  console.log("async1结束");
}

async function async2() {
  console.log("async2");
}

console.log("script");

setTimeout(() => {
  console.log("setTimeout1");
}, 0);

setTimeout(() => {
  console.log("setTimeout2");
}, 300);

setImmediate(() => {
  console.log("setImmediate");
});

process.nextTick(() => {
  console.log("nextTick1");
});

async1();

process.nextTick(() => {
  console.log("nextTick2");
});

new Promise(function(resolve){
  console.log("Promise1");
  resolve()
  console.log("Promise2");
}).then(()=>{
  console.log("Promise3");
})

console.log("script");
/* 
script
async1开始
async2
Promise1
Promise2
script
nextTick1
nextTick2
async1结束
Promise3
setTimeout1
setImmediate
setTimeout2
*/