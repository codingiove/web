let mongoose = require("mongoose");
// 2 连接数据库
mongoose.connect("mongodb://localhost/PersonalWorks");
// 3 约束
let PersonalWorks = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

let articles = new mongoose.Schema({
  article: {
    type: String,
  },
});
// 4 创建模型                     (表结构) (模型名,约束)
module.exports = mongoose.model("PersonalWork", PersonalWorks);
module.exports = mongoose.model("article", articles);
// 让外面添加数据
