module.exports = function QQEmail({ code, recipients }) {
  let nodemailer = require("nodemailer");
  return new Promise((res, rej) => {
    let createtrans = nodemailer.createTransport({
      //创建发送对象
      host: "smtp.qq.com", //qq smtp 服务器地址
      secureConnection: true, //是否使用安全连接，对https协议的
      port: 465, //qq邮件服务所占用的端口
      secure: true,
      auth: {
        user: "1445683324@qq.com", //开启SMTP的邮箱，有用发送邮件
        pass: "muqhcoaixizpgfif", //授权码
      },
    });
    let mailOption = {
      from: "1445683324@qq.com", //发送人
      to: recipients, //收件人 邮箱
      subject: "验证码", //主题名
      text: code, // 内容
    };

    createtrans.sendMail(mailOption, (err, info) => {
      if (err) {
        rej(err);
      } else {
        console.log("邮件发送成功");
        res("ok");
      }
    });
  });
};
