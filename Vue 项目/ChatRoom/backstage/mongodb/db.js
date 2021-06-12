//  加载模块
let mongoose = require("mongoose");
// 连接数据库
mongoose.connect(
  "mongodb://localhost/yike",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);
mongoose.set("useFindAndModify", false);
// 用户表
let User = new mongoose.Schema({
  name: { type: String }, // 用户名
  psw: { type: String }, // 密码
  email: { type: String }, // 邮箱
  sex: { type: String, default: "男" }, // 性别
  birthday: { type: Date }, // 生日
  phone: { type: Number }, // 电话
  referral: { type: String }, // 介绍
  user_img: { type: String, default: "user.png" }, // 用户头像
  time: { type: Date }, // 注册时间
});

// 好友表
let Friends = new mongoose.Schema({
  // ref 关联  User 表
  user_ID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 用户 ID
  Friends_ID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 好友ID
  state: { type: String }, // 状态    0已是好友 , 1别人添加我 , 2我添加别人, 3拒绝或删除好友
  time: { type: Date }, // 生成时间
});

// 好友聊天表
let Friends_chat = new mongoose.Schema({
  user_ID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 用户ID
  Friends_ID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 好友ID
  message: { type: String }, // 内容
  types: { type: String }, // 内容类型 (0文字,1图片,2音频连接,3地图)
  time: { type: Date }, // 发送时间
  state: { type: String }, // 状态 (0已读,1未读)
});

// 群表
let group = new mongoose.Schema({
  user_ID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 用户 ID
  group_name: { type: String }, // 群名
  group_img: { type: String, default: "group.png" }, // 群头像
  time: { type: Date }, // 创建群的时间
  notice: { type: String }, // 公告
});

// 群成员表
let cluster = new mongoose.Schema({
  group_ID: { type: mongoose.Schema.Types.ObjectId, ref: "group" }, // 群 ID
  Group_Member_ID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 群成员 ID
  MyGroupNickname: { type: String }, //  群内名称
  tip: { type: Number, default: 0 }, // 未读消息数
  time: { type: Date }, // 加入时间
  shield: { type: Number }, // 是否屏蔽群 (0不屏蔽,1屏蔽)
});

// 群消息表
let Group_news = new mongoose.Schema({
  Group_ID: { type: mongoose.Schema.Types.ObjectId, ref: "group" }, // 群 ID
  User_ID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 用户 ID
  message: { type: String }, // 内容
  types: { type: String }, // 内容类型 (0文字,1图片,2音频连接,3地图)
  time: { type: Date }, // 发送时间
  state: { type: String, default: "1" }, // 状态 (0已读,1未读)
  LastTime: { type: Date, default: Date.now },
});
// 添加好友内容
let Friend_request = new mongoose.Schema({
  user_ID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 用户 ID
  Friends_ID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 好友ID
  message: { type: String }, // 内容
  state: { type: String, default: "0" }, // 0好友申请 , 1邀请进群
  GroupID: { type: String },
  time: { type: Date }, // 生成时间
});

// 导出模型(表结构)             (模型名,约束)
module.exports = mongoose.model("User", User);
module.exports = mongoose.model("Friends", Friends);
module.exports = mongoose.model("Friends_chat", Friends_chat);
module.exports = mongoose.model("group", group);
module.exports = mongoose.model("cluster", cluster);
module.exports = mongoose.model("Group_news", Group_news);
module.exports = mongoose.model("Friend_request", Friend_request);
