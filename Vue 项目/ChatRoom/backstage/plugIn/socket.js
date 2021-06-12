let operation = require("../mongodb/operation/operation");
// broadcast 可以让别人看到你发的消息,而 emit 只有自己才能看见
module.exports = function (io) {
  let users = {}; //  socket 注册用户
  io.on("connection", (socket) => {
    // 进来
    socket.on("join", (id) => {
      users[id] = socket.id;
      socket.user = id;
      // {'5fa2706acacb242264191790': 'uguKKje-ZTjTn1PNAAAA'}
    });
    // 1 对 1 消息
    socket.on("Chat", (msg, user_ID, Fid) => {
      if (parseInt(msg.types) >= 2) {
        msg.message = JSON.stringify(msg.message);
      }

      if (!msg.time) {
        msg.time = null;
      }
      let data = {
        user_ID: user_ID,
        Friends_ID: Fid,
        message: msg.message || msg.Message,
        time: msg.time,
      };
      if (msg.RemoveFriend) {
        operation.OneInformationTable(data, msg.types);
        // 发给这为好友
        users[Fid] &&
          socket.to(users[Fid]).emit("ReceiveChat", msg, user_ID, 0);
      }
      // 发送自己
      socket.emit("ReceiveChat", msg, Fid, 1);
    });
    // 加入群
    socket.on("Group", (id) => socket.join(id));
    // 接收群消息
    socket.on("GroupChat", (Msg, User_ID, Group_ID) => {
      if (Msg.RemoveFriend) {
        let { message, types, time } = Msg;
        if (parseInt(types) >= 2) message = JSON.stringify(message);
        const data = { message, types, time, User_ID, Group_ID };
        socket.to(Group_ID).emit("GroupInfo", Msg, User_ID, Group_ID, 1);
        operation.Group_news(data);
      }
      socket.emit("GroupInfo", Msg, User_ID, Group_ID);
    });
    // 接收消息 (添加好友)
    socket.on("ReceiveMessages", (Friends_Id, news) => {
      if (news === "更新页面") {
        return socket.emit("ConfirmReception", Friends_Id, news);
      }
      socket.to(users[Friends_Id]).emit("ConfirmReception", news);
      socket.emit("ConfirmReception");
    });
    // 离开
    socket.on("disconnecting", function () {
      if (users.hasOwnProperty(socket.user)) {
        delete users[socket.user];
      }
    });
  });
};
