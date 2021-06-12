let jwt = require("jsonwebtoken");
let secret = "kobe@824"; // 加密/解密
// Info:      传入的参数,可以把用户信息传入
// secret:    自定义秘钥,用来加密/解密
// expiresIn: 过期时间,如 expiresIn: 60 * 60, expiresIn: 1day, expiresIn: 1h

// 生成 token
exports.GenerateToken = function (UserId) {
  let Info = { UserId, time: new Date() };
  let token = jwt.sign(Info, secret, { expiresIn: "1day" });
  return token;
};

// 通过 token 解密
exports.DecodeToken = function (token) {
  let Decode_token;
  jwt.verify(token, secret, (err, res) => {
    err ? (Decode_token = 0) : (Decode_token = 1);
  });
  return Decode_token;
};
