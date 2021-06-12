let express = require("express");
let router = require("./router/router.js");
let app = express(); // 使用这个框架
let bodyparser = require("body-parser"); // 解析前端返回的数据

//跨域
let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
};
//挂载到 express 服务中
app.use(bodyparser.json()); // 解析 json
app.use(bodyparser.urlencoded({ extended: true })); //解析表单的方式
app.use(allowCrossDomain); // 添加到 express 服务中
app.use(router);

app.listen(8024, () => {
  console.log("启动成功");
});
