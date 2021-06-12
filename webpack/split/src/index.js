function add(a, x) {
  return a + x;
}

console.log(add(1, 2));

import(/* webpackChunkName: 'test' */ "./test").then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log("文件加载失败");
  }
);
 