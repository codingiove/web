// 操作数据库
let bcrypt = require("../../plugIn/pswEncrypt"); // 引入加密文件
let dbmodel = require("../db"); // 导入所有表 (Model { Group_news }) 打印的是最后一张表
let User = dbmodel.model("User"); // 用户 , 从你导出的表,再导入用户表
let Friends = dbmodel.model("Friends"); // 好友
let Friends_chat = dbmodel.model("Friends_chat"); // 好友聊天
let group = dbmodel.model("group"); // 群
let cluster = dbmodel.model("cluster"); // 群成员
let Group_news = dbmodel.model("Group_news"); // 群消息
let Friend_request = dbmodel.model("Friend_request"); // 好友申请
let token = require("../../plugIn/token"); // token

// code 0 代表有问题
let LastTime = "";
//const headPortrait = "http://47.114.38.181:9999/file/user/";
 const headPortrait = "http://192.168.1.4:3000/file/user/";
function GlobalErr(name, res) {
  return res.send(`${name}  服务器忙,请稍后....`);
}

// 修改方法
function Update(id, rule, res) {
  // 查询条件 / 修改规则(传一个对象)
  return User.findByIdAndUpdate(id, rule, (err) => {
    err && res.status(500).send("服务器忙,请稍后....");
    res.status(200).send({ status: 200, rule });
  });
}

// 注册 ✔
exports.NewUser = function (name, psw, email, res) {
  // 密码加密
  psw = bcrypt.Encrypt(psw);
  // 要添加到数据库的数据
  let DATA = {
    name,
    psw,
    email,
    time: new Date(),
  };
  User.findOne({ email }, (err, data) => {
    err && GlobalErr("NewUser", res);
    // 判断该邮箱是否存在
    if (data) {
      return res.status(200).send({ code: 0, success: "邮箱已被注册" });
    } else {
      // 添加到数据库
      return new User(DATA).save((err) => {
        err
          ? res.status(500).send("注册失败")
          : res.status(200).send({ code: 1 });
      });
    }
  });
};

// 登录 ✔
exports.LogIn = function (data, psw, res) {
  // 解密
  psw = bcrypt.decode(psw);
  // 用户或邮箱
  User.findOne(
    {
      $or: [{ name: data }, { email: data }],
    },
    (err, value) => {
      err && GlobalErr("LogIn", res);
      // 如果没有用户或者邮箱
      !value && res.status(200).send({ code: 0, success: "邮箱或者用户有误" });
      // 有当前用户用户或者邮箱
      if (value) {
        // 判断密码是否一样
        if (psw === value.psw) {
          let instructions = token.GenerateToken(value.id);
          let back = {
            id: value.id,
            name: value.name,
            img: value.user_img,
            token: instructions,
          };
          return res.status(200).send({ code: 1, back });
        } else {
          return res.status(200).send({ code: 0, success: "密码有误" });
        }
      }
    }
  );
};

// 用户搜索  ✔
exports.Search = function (data, res) {
  // $regex 只要包含某个的字全部搜索出来
  let rule = {
    $or: [{ name: { $regex: data } }, { email: { $regex: data } }],
  };
  // 只显示 name,email,user_img  (1显示 0不显示)
  let ShowOnly = { name: 1, email: 1, user_img: 1 };
  User.find(rule, ShowOnly, (err, value) => {
    err && GlobalErr("Search", res);
    // 没有找到返回的是空数组
    value && res.status(200).send(value);
    //  res.status(500).send({ code: 0, success: "没有当前用户" });
  });
};

// 判断是否为好友 ✔
exports.Friend = function (Id, Fid, res) {
  let rule = { user_ID: Id, Friends_ID: Fid, state: "0" };
  Friends.findOne(rule, (err, value) => {
    err && GlobalErr("Friend", res);
    value
      ? res.status(200).send({ status: 200, success: "已是好友" }) // 是好友
      : res.status(200).send({ status: 400, success: "你们还不是好友" }); // 不是好友
  });
};

// 用户详细信息 ✔
exports.UserDetails = function (_id, res) {
  User.findOne({ _id }, (err, value) => {
    err && GlobalErr("UserDetails", res);
    res.status(200).send(value);
  });
};

// 用户信息修改 ✔
exports.UserInformationModify = function (Obj_Data, res) {
  let User_PSW = "";
  User_PSW = Obj_Data.rule.psw;
  if (Obj_Data.psw) {
    User.find({ _id: Obj_Data.id }, { psw: Obj_Data.psw }, (err, value) => {
      err && GlobalErr("UserInformationModify", res);
      if (!value) {
        res.status(200).send({ code: 0, success: "当前用户不存在" });
      } else {
        // 如果是修改的密码,对他进行加密
        Obj_Data.rule.psw &&
          (Obj_Data.rule.psw = bcrypt.Encrypt(Obj_Data.rule.psw));
        // 如果是修改用户名或邮箱
        if (Obj_Data.rule.name || Obj_Data.rule.email) {
          // 看看 User 有没有重复的用户名或邮箱 0 表示没有
          User.countDocuments(Obj_Data.rule, (err, result) => {
            err && GlobalErr("UserInformationModify", res);
            return result === 0
              ? Update(Obj_Data.id, Obj_Data.rule, res)
              : res.send({ code: 0, success: "该邮箱或名称已存在,换一个吧!" });
          });
        } else {
          // 返回给前端不加密的密码
          Obj_Data.rule.User_PSW = User_PSW;
          return Update(Obj_Data.id, Obj_Data.rule, res);
        }
      }
    });
  } else {
    res.status(200).send({ code: 0, success: "请输入密码" });
  }
};

// 添加好友 ✔
exports.AddFriend = function (user_ID, Friends_ID, state) {
  let data = {
    user_ID,
    Friends_ID,
    state,
    time: new Date(),
  };
  new Friends(data).save((err) => err && GlobalErr("AddFriend", res));
};

// 添加一对一信息表 ✔
exports.OneInformationTable = async function (Obj_Data, types) {
  let { user_ID, Friends_ID, message, time } = Obj_Data;
  let data = {
    user_ID,
    Friends_ID,
    types,
    message,
    time,
    state: 1, // 1未读
  };
  await new Friends_chat(data).save();
  let rule = {
    $or: [
      { user_ID: user_ID, Friends_ID: Friends_ID },
      { user_ID: Friends_ID, Friends_ID: user_ID },
    ],
  };
  // 更新聊天时间
  await Friends.updateMany(
    rule,
    { time: new Date() },
    (err) => err && GlobalErr("更新时间失败", err)
  );
};

// 好友申请 ✔
exports.FriendRequest = async function ({ user_ID, Friends_ID, message }, res) {
  let rule = { user_ID, Friends_ID };
  // 查找拒绝的好友或者删除的好友
  await Friends.find(rule, { state: 3 }, (err, state) => {
    if (state.length >= 1) {
      let rule1 = { user_ID: Friends_ID, Friends_ID: user_ID };
      Friends.updateMany(rule, { state: 2 }, () => {});
      Friends.updateMany(rule1, { state: 1 }, () => {});
    }
  });
  // 好友申请
  await Friends.countDocuments(rule, (err, value) => {
    err && GlobalErr("Friends", err);
    // 没有申请好友
    if (!value) {
      // 建立好友关系
      this.AddFriend(user_ID, Friends_ID, 2); // 2我添加别人
      this.AddFriend(Friends_ID, user_ID, 1); // 1别人添加我
      res.send({ status: 200 });
    } else {
      // 重新申请好友
      let AnewRule = {
        $or: [
          { user_ID: user_ID, Friends_ID: Friends_ID },
          { user_ID: Friends_ID, Friends_ID: user_ID },
        ],
      };
      Friends.updateMany(
        AnewRule,
        { time: new Date() },
        (err) => err && GlobalErr("FriendsUpdateOne", err)
      );
      res.send({ status: 200, msg: "更新了" });
    }
    // 添加好友的内容
    new Friend_request({
      user_ID,
      Friends_ID,
      message,
      time: new Date(),
    }).save();
  });
};
// 获取好友添加时的内容
exports.leave = function ({ Friends_ID }, res) {
  Friend_request.find({ user_ID: Friends_ID }, (err, value) => {
    value.length && res.send({ value });
  });
};
// 同意好友 ✔
exports.AgreeWithBuddy = function (Obj_Data, res) {
  const { user_ID, Friends_ID } = Obj_Data;
  let rule = {
    $or: [
      { user_ID: user_ID, Friends_ID: Friends_ID },
      { user_ID: Friends_ID, Friends_ID: user_ID },
    ],
  };
  Friends.updateMany(rule, { state: 0 }, (err) => {
    err && GlobalErr("AgreeWithBuddy", err);
    res.send({ status: 200, success: "确认好友" });
  });
};
// 删除好友 ✔
exports.DeleteFriend = function ({ user_ID, Friends_ID }, res) {
  let rule = {
    $or: [
      { user_ID: user_ID, Friends_ID: Friends_ID },
      { user_ID: Friends_ID, Friends_ID: user_ID },
    ],
  };
  Friends.updateMany(rule, { state: 3 }, (err, value) => {
    err && GlobalErr("DeleteFriend", err);
    res.send({ status: 200, success: "删除好友", value });
  });
};
// 首页数据 (已是好友) ✔
exports.HomePageData = function (Obj_Data, res) {
  let { user_ID, state } = Obj_Data;
  Friends.find({}, (err, value) => {
    err && GlobalErr("HomePageData", err);
    let data = value.map((item) => {
      return {
        id: item.Friends_ID._id,
        name: item.Friends_ID.name,
        img: item.Friends_ID.user_img,
        time: item.time,
      };
    });
    res.send(data);
  })
    .where({ user_ID, state }) // 返回满足条件的数据
    .populate("Friends_ID") // 约束中有 ref 就可以获取(你关联的表的数据)
    .sort({ time: -1 }); //   -1 从大到小排
};

// 一对一信息表 ✔
exports.InformationTable = function ({ user_ID, Friends_ID }, res) {
  // 查询条件
  let criteria = {
    $or: [
      { user_ID: user_ID, Friends_ID: Friends_ID },
      { user_ID: Friends_ID, Friends_ID: user_ID },
    ],
  };
  Friends_chat.find(criteria, (err, value) => {
    err && GlobalErr("InformationTable", err);
    let data = value.map((item) => {
      return {
        message: item.message,
        time: item.time,
        types: item.types,
      };
    });
    res.send(data);
  })
    .where(criteria)
    .sort({ _id: -1 }); // 返回最后一条消息
};

// 消息未读数 ✔
exports.MessageNotRead = function (Obj_Data, res) {
  let { user_ID, Friends_ID } = Obj_Data;
  // 查看好友给我发的消息
  let rule = { user_ID: Friends_ID, Friends_ID: user_ID, state: "1" };
  Friends_chat.countDocuments(rule, (err, value) => {
    err && GlobalErr("MessageNotRead", err);
    res.send({ result: value });
  });
};

// 消息已读 ✔
exports.MessageRead = function ({ user_ID, Friends_ID }, res) {
  let rule = { user_ID: Friends_ID, Friends_ID: user_ID };
  Friends_chat.updateMany(rule, { state: "0" }, (err, value) => {
    err && GlobalErr("MessageRead", err);
    res.send({ status: 200 });
  });
};

// 创建群 ✔
exports.CreateAGroup = async function (Obj_Data, res) {
  try {
    let { user_ID, group_name, group_img, member_arr } = Obj_Data;
    return await new Promise((resolve, reject) => {
      let GroupData = {
        user_ID, // 创建人 ID
        group_name, // 群名
        group_img, // 群头像
        time: new Date(), // 创建群的时间
      };
      // 创群
      new group(GroupData).save((err, result) => {
        err && reject(GlobalErr("创群失败", err));
        resolve(result);
      });
    }).then(async (value) => {
      // 添加群主
      let Groupleader = {
        group_ID: value._id,
        Group_Member_ID: user_ID,
        shield: 0,
      };
      await new cluster(Groupleader).save();
      // 添加群成员
      for (const i in member_arr) {
        let data = {
          group_ID: value._id, // 群 ID
          Group_Member_ID: member_arr[i].id, // 群成员 ID
          shield: 0,
        };
        await new cluster(data).save();
      }
      res.send("OK");
    });
  } catch (error) {
    console.log(err);
  }
};

// 获取群 ✔
exports.GetGroupList = async function ({ user_ID }, res) {
  let Group = [];
  // 看看当前用户是否存在群成员列表中
  let result = await cluster.find({ Group_Member_ID: user_ID });
  // 有 length 就去获取群
  if (result.length) {
    for (let i = 0; i < result.length; i++) {
      const res = await group.find({ _id: result[i].group_ID });
      Group.push(...res);
    }
    res.json(Group);
  }
};
// 获取群详情页✔
exports.GetGroupListDetail = function ({ body: { _id } }, res) {
  group.find({ _id }, (err, value) => {
    res.json(value);
  });
};
// 修改群公告 ✔
exports.ModifyGroupNotice = function (req, res) {
  const { _id, notice, group_name } = req.body;
  const item = notice ? "notice" : "group_name";
  group.findByIdAndUpdate(_id, { [item]: notice || group_name }, () => {
    res.json({ status: 200 });
  });
};

// 获取群成员
exports.GetGroupMembers = async function ({ body: { group_ID } }, res) {
  // 获取群信息 user_ID 群主ID
  const { user_ID } = await group.findOne({ _id: group_ID }, () => {});
  cluster
    .find({ group_ID }, (err, value) => {
      const data = value.map((item) => {
        // 找群主
        const determine = String(user_ID) === String(item.Group_Member_ID._id);
        return {
          id: item.Group_Member_ID._id,
          GroupLeader: determine && determine,
          img: headPortrait + item.Group_Member_ID.user_img,
          name: item.Group_Member_ID.name,
        };
      });
      res.json(data);
    })
    .populate("Group_Member_ID");
};
// 邀请群成员
exports.InviteGroupMembers = async ({ body: { group_ID, user_ID } }, res) => {
  let Members = [];
  // 获取好友
  const Friend = await Friends.find({ user_ID, state: 0 }).populate(
    "Friends_ID"
  );
  for (let i = 0; i < Friend.length; i++) {
    let item = Friend[i];
    // 查看该群的成员列表,有没有我没邀请的好友
    await cluster
      .find({}, (err, value) => {
        if (!value.length) {
          let data = {
            id: Friend[i].Friends_ID._id,
            user_img: headPortrait + Friend[i].Friends_ID.user_img,
            name: Friend[i].Friends_ID.name,
          };
          Members.push(data);
        }
      })
      .where({ group_ID, Group_Member_ID: item.Friends_ID._id });
  }
  setTimeout(() => {
    res.json(Members);
  }, 100);
};
// 发送邀请 (群邀请)
exports.SendInvitation = (req) => {
  const { user_ID, Friends_ID, message, GroupID } = req.body;
  new Friend_request({
    user_ID,
    Friends_ID,
    message,
    GroupID,
    state: 1,
    time: new Date(),
  }).save();
};
// 接收邀请
exports.ReceiveInvitation = function ({ body: { user_ID } }, res) {
  Friend_request.find({ Friends_ID: user_ID, state: 1 }, (err, value) => {
    if (value.length) {
      let {
        state,
        _id,
        time,
        GroupID,
        message,
        user_ID: { user_img, _id: userId },
      } = value[0];
      res.json({
        state,
        _id,
        time,
        GroupID,
        message,
        user_ID: { user_img, _id: userId },
      });
    }
  }).populate("user_ID");
};
// 同意 或 拒绝加群
exports.AgreeOrReject = ({ body: { group_ID, Group_Member_ID, state } }) => {
  Friend_request.updateMany(
    { Friends_ID: Group_Member_ID },
    { state },
    () => {}
  );
  if (!state) {
    cluster.create({ tip: 0, group_ID, Group_Member_ID, shield: 0 }, () => {});
  }
};
// 踢人
exports.Kicking = ({ body: { group_ID, RemoveUserID } }) => {
  cluster.deleteOne({ group_ID, Group_Member_ID: RemoveUserID }, () => {});
};
// 退群 或 解散
exports.WithdrawGroup = ({
  body: { group_ID, GroupLeader, WithdrawUserID },
}) => {
  // 解散
  if (GroupLeader) {
    group.deleteOne({ _id: group_ID }, () => {});
    cluster.deleteMany({ group_ID }, () => {});
  } else {
    // 退群
    cluster.deleteOne({ group_ID, Group_Member_ID: WithdrawUserID }, () => {});
  }
};
// 判断你是否拥有权限
exports.HaveAuthority = function ({ body: { user_ID } }, res) {
  group.findOne({ user_ID }, (err, value) => {
    value ? res.json({ status: 200 }) : res.json({ status: 403 });
  });
};
// 添加群的聊天记录 ✔
exports.Group_news = function (msg) {
  new Group_news(msg).save();
};
// 获取群的聊天记录 ✔
exports.GetGroupMessages = async function (
  { body: { Group_ID, UserID } },
  res
) {
  let RemoveFriend = await cluster
    .find({}, () => {})
    .where({ group_ID: Group_ID, Group_Member_ID: UserID });
  RemoveFriend = RemoveFriend.length ? 1 : 0;

  Group_news.find({}, (err, value) => {
    let data = value.map((item) => {
      return {
        id: item._id,
        img: headPortrait + item.User_ID.user_img,
        message: item.message,
        time: item.time,
        types: item.types,
        formID: item.User_ID._id, // 群成员 ID
        LastTime: item.LastTime,
      };
    });
    res.json({ data, RemoveFriend });
  })
    .where({ Group_ID })
    .sort({ LastTime: 1 })
    .populate("User_ID");
};
// 最后一条群消息和数量 ✔
exports.GetLastGroupMessages = async function ({ body: { Group_ID } }, res) {
  try {
    const arr = await Group_news.find({}).where({ Group_ID }).sort({ _id: -1 });
    let { LastTime, message, types, User_ID } = arr && arr[0];
    const count = await Group_news.countDocuments({ state: "1" });
    const { name } = await User.findOne({ _id: User_ID });
    const data = { LastTime, message, types, User_ID, name, count };
    res.json(data);
  } catch (error) {}
};
// 群消息已读 ✔
exports.GroupMessageRead = function ({ body: { Group_ID } }) {
  Group_news.updateMany({ Group_ID }, { state: "0" }, () => {});
};

// 分页数据  ✔
exports.PagingData = async function (
  { Page, PageSize, user_ID, Friends_ID },
  res
) {
  let criteria = {
    $or: [
      { user_ID: user_ID, Friends_ID: Friends_ID },
      { user_ID: Friends_ID, Friends_ID: user_ID },
    ],
  };
  // 判断还是不是好友
  let RemoveFriend = await Friends.find({ state: 0 }).where(criteria);
  RemoveFriend = RemoveFriend.length ? 1 : 0;
  // 最后聊天时间
  const Time = Promise.resolve(Friends_chat.find(criteria));
  Time.then((res) => {
    for (let i = res.length - 1; i >= 0; i--) {
      if (res[i].time) {
        LastTime = res[i].time;
        break;
      }
    }
  });
  // 找我们两个的聊天记录
  let query = Friends_chat.find({}, (err, value) => {
    err && GlobalErr("PagingData", err);
    let data = value.map((item) => {
      return {
        id: item._id,
        message: item.message,
        time: item.time,
        types: item.types,
        formID: item.user_ID._id,
        img: item.user_ID.user_img,
      };
    });
    res.json({ data, LastTime, RemoveFriend });
  });
  query.where(criteria);
  query.sort({ _id: -1 }); // 从大到小,但只显示 10 条
  query.populate("user_ID");
  query.limit(PageSize); // 展示 10条
  query.skip(Page * PageSize); // 跳过的条 (2 x 10 = 20) 每次跳过之前的 10 再去加载 10 条
};
