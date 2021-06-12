let md5 = require("blueimp-md5");
// 加密方法
exports.Encrypt = function (psw) {
  let hash = md5(md5(psw));
  return hash;
};

// 解密
exports.decode = function (psw) {
  let verif = md5(md5(psw));
  return verif;
};
