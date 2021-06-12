let express = require("express");
let router = express.Router();
let code = null; //全局存储 验证码
let QQEmail = require("../PlugIn/nodemailer"); // 发送验证码
let dbmodel = require("../MongoDB/db"); // 数据库
let articles = dbmodel.model("article"); // 表
let personalwork = dbmodel.model("PersonalWork"); // 表
let md5 = require("blueimp-md5"); // 加密
let jwt = require("jsonwebtoken"); // token
let secret = "kobe@824"; // 加密/解密
// 发送验证码
router.get("/register", (req, res) => {
  // 加密
  req.query.password = md5(md5(req.query.password)); // 双成加密
  // 前端传过来的值有没有 @qq这个字符串
  let email = req.query.email.indexOf("@qq");
  if (email == -1) {
    return res.json({
      status: 0,
      message: "目前不支持其他邮箱验证",
    });
  } else {
    let newvalue = req.query.email;
    // 查找有没有重复的邮箱  email: req.query.email,
    personalwork.find({ email: req.query.email }, (err, existData) => {
      if (err) {
        return res.send("服务器忙,请稍后");
      }
      // 数据库有数据才执行
      if (existData.length !== 0) {
        return res.send({
          status: 0,
          message: "邮箱已存在",
        });
      }
      // 0 到 @qq 刚刚好10位
      newvalue = newvalue.substring(0, newvalue.indexOf("@qq"));
      // 等于 false 就是数字 并且 长度大于等 10
      if (isNaN(newvalue) === false && Number(newvalue.length) >= 10) {
        setTimeout(() => {
          // 36进制
          code = Math.random().toString(36).substr(2, 6); //存入验证码
          QQEmail({ code, recipients: req.query.email }).then(
            (ok) => {
              if (ok) {
                return res.json({
                  status: 200,
                  message: "邮件已发送,请注意查收",
                });
              }
            },
            (err) => {
              return res.json({
                err,
                message: "请输入正确的QQ邮箱",
                status: 0,
              });
            }
          );
        }, 1000);
        // 没有重复的就新增进数据库
        new personalwork(req.query).save((err, data) => {
          if (err) {
            return res.send(err);
          } else {
            console.log(data);
          }
        });
      } else {
        return res.json({
          status: 0,
          message: "QQ邮箱是否正确,或长度小于10位",
        });
      }
    });
  }
});
// 验证
router.get("/verification", (req, res) => {
  if (req.query.value !== code) {
    return res.send({
      status: 0,
    });
  }
  return res.json({
    message: "注册成功",
    status: 1,
  });
});
// 登录
router.get("/login", (req, res) => {
  let { email, password } = req.query;
  // 解密
  personalwork.findOne({ email, password: md5(md5(password)) }, (err, data) => {
    if (!data) {
      return res.send({
        status: 0,
        message: "邮箱或者密码不存在",
      });
    } else {
      let token = jwt.sign(req.query, secret, { expiresIn: "1day" });
      return res.send({
        status: 1,
        message: "登录成功",
        token,
      });
    }
  });
});
// 首页
router.get("/home", async (req, res) => {
  let Decode_token;
  // token 验证
  await jwt.verify(req.headers.token, secret, (err) => {
    err ? (Decode_token = 0) : (Decode_token = 1);
  });
  if (Decode_token === 0) {
    res.send({ state: 400, news: "token过期" });
  } else {
    let result = await articles.find({ classify: req.query.classify });
    res.send({
      state: 200,
      data: [
        { id: 0, name: "后端开发" },
        { id: 1, name: "职场生活" },
        { id: 2, name: "前端开发" },
        { id: 3, name: "人工智能" },
        { id: 4, name: "移动开发" },
        { id: 5, name: "其他" },
      ],
      result,
    });
  }
});
module.exports = router;
