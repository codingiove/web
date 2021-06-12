const express = require("express");
const app = express();
let cors = require("cors");
app.use(cors());// 设置跨域访问
let token = require("./plugIn/token"); // token
let path = require("path");

const io = require("socket.io")(app.listen(8240));

require("./plugIn/socket")(io); // 聊天室

const url = ["/LogIn", "/signin"];


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 判断前端传 token 过来没
app.use((req, res, next) => {
  if (url.includes(req.url) || req.url.includes("/file")) return next();
  // 有 token
  if (req.headers.token) {
    token.DecodeToken(req.headers.token) !== 0
      ? next()
      : res.status(400).send({ code: 8, success: "Token 失效" });
  } else {
    res.status(400).send({ code: 8, success: "没有 token" });
  }
});


// 导出静态资源,动态拼接路径,只要通过 /file 就能访问里面的内容 (动态获取,"./file"的绝对路径)
app.use("/file", express.static(path.join(__dirname, "./file")));

require("./router/router")(app); // 路由
require("./plugIn/multer")(app); // 文件上传

// 404页面
app.use((req, res, next) => {
  res.send("抱歉！页面无法访问……");
});

app.listen(3000, () => console.log("启动"));
