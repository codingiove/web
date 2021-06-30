// 技巧
let arr2 = [1, 2, 3, 5];
let end = arr2.pop(); // 这样就可以直接获取最后一个值了,忽略传参
console.log(end); // 5

let arr = ["最新", "热门", "流行"];
let req = "热门";
console.log(arr.some((item) => item === req));

// 截取最后两位
const addZero1 = (num, len = 2) => {
  // 09
  // 010
  return `0${num}`.slice(-len);
};
console.log(addZero1(9));

// reduce 方法同时实现 map 和 filter
const numbers = [10, 20, 30, 40, 60];
const doubledOver50 = numbers.reduce((initialValue, item) => {
  item = item * 2; // map
  if (item > 50) {
    // filter
    initialValue.push(item);
  }
  return initialValue;
}, []);
console.log(doubledOver50); // [ 60, 80, 120 ]

let operation = {
  1: "启用",
  2: "停用",
  3: "注销",
  4: "修改",
  5: "详情",
};
// operation[status]

let person = {};
console.log(person.name.toString()); // 报错
console.log(person.name?.toString()); // undefined

// 递归数组
var arr = [
  {
    name: "一级",
    children: [
      {
        name: "二级",
        children: [
          {
            name: "三级",
            children: [
              {
                name: "四级",
                children: [
                  {
                    name: "五级",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
// 递归
function Recursion(arr) {
  for (let item of arr) {
    if (item.children.length) {
      Recursion(item.children);
    }
  }
}
Recursion(arr);

let a = { name: "张三" }; // ox1
let list = [];
list.push(a);// ox1
list.push(a);// ox1
list[0].name = "李四";
console.log(list[1].name);

var day3 = new Date();// 明天
day3.getTime() + 24 * 60 * 60 * 1000
// 一天 24 小时,
// 1小时 60 分钟,
// 1分钟 60 秒,
// 1秒 1000 毫秒
var day3 = new Date(); // 星期
day3.getTime() + 7 * 24 * 60 * 60 * 1000
