let multer = require("multer");
let fs = require("fs");
var storage = multer.diskStorage({
  destination(req, file, cb) {
    let files = `./file/${req.body.url}`;
    fs.mkdir(files, function (error) {
      //存储的位置
      cb(null, files);
    });
  },
  filename(req, file, cb) {
    // 获取文件后缀名
    let type = file.originalname.replace(/.+\./, ".");
    // 存储文件命名
    cb(null, req.body.name + type);
  },
});

var upload = multer({ storage });

module.exports = function (app) {
  app.post("/files/upload", upload.array("file", 10), (req, res, next) => {
    res.send(req.files);
  });
};
