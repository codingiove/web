<template>
  <view class="warp">
    <!-- 头部 -->
    <view class="top-bar">
      <navigator
        hover-class="none"
        :url="`/pages/details/details?id=${user.id}`"
        redirect
        class="top-bar-left"
      >
        <!-- 本人头像 -->
        <image :src="user.img"></image>
      </navigator>
      <view class="top-bar-right">
        <navigator
          class="search"
          url="/pages/search/search"
          redirect
          hover-class="none"
        >
          <image src="../../static/img/index/search.png"></image>
        </navigator>
        <view class="add" @tap="Group">
          <image src="../../static/img/index/group.png"></image>
        </view>
      </view>
    </view>
    <!-- 主体 -->
    <view class="mian">
      <!-- 好友申请 -->
      <navigator
        v-if="tip > 0"
        :url="`/pages/FriendRequest/FriendRequest?id=${user.id}`"
        hover-class="none"
        class="friends"
      >
        <view class="friends-list">
          <view class="friends-list-l">
            <text class="friends-tip"></text>
            <image src="/static/img/Snipaste.png" />
          </view>
          <view class="friends-list-r">
            <view class="top">
              <view class="name">消息</view>
              <view class="time">{{ time | Date_Time }}</view>
            </view>
            <view class="content">{{ NewLeave }}</view>
          </view>
        </view>
      </navigator>
      <!-- 好友列表   -->
      <view class="friends">
        <view
          class="friends-list"
          v-for="item in FriendsData"
          :key="item.id"
          @tap="ChatPage(item)"
        >
          <view class="friends-list-l">
            <text class="tip" v-if="item.tip > 0">{{ item.tip }}</text>
            <image :src="item.img" />
          </view>
          <view class="friends-list-r">
            <view class="top">
              <view class="name">{{ item.name }}</view>
              <view class="time">{{ item.time | Date_Time }}</view>
            </view>
            <text class="content2">{{ item.message }} </text>
          </view>
        </view>
      </view>
      <!-- 群 -->
      <view class="group">
        <view
          class="group-list"
          v-for="item in GroupArr"
          :key="item.group_id"
          @tap="ChatPage(item)"
        >
          <view class="group-list-l">
            <text class="group-tip" v-if="item.tip > 0"></text>
            <image :src="item.group_img" />
          </view>
          <view class="group-list-r">
            <view class="top">
              <view class="name">{{ item.group_name }}</view>
              <view class="time">{{ item.time | Date_Time }}</view>
            </view>
            <text class="content2">{{ item.message }}</text>
          </view>
        </view>
      </view>
      <!-- 没有好友 -->
      <non-existent v-if="Friendshow">
        <view>您占时没有好友</view>
        <navigator
          url="/pages/search/search"
          class="AddSearch"
          hover-class="none"
        >
          搜索好友</navigator
        >
      </non-existent>
    </view>
  </view>
</template>

<script>
import nonExistent from "../../components/Common/empty";
export default {
  components: {
    nonExistent,
  },
  data() {
    return {
      user: {}, // 用户信息
      tip: 0, // 信息数量
      time: "", // 好友申请时间
      FriendsData: [], //好友
      Friendshow: false, // 没有好友
      GroupArr: [], // 群
      NewLeave: "", // 留言
    };
  },
  onLoad() {
    this.Getfriends();
    this.Initialization();
    this.ChatTypeConversion();
    this.ReceiveGroupMessages();
    this.ReceiveMessages();
  },

  methods: {
    // 初始化
    Initialization() {
      this.HomePageData();
      this.Friends();
      this.GetGroup();
      this.GroupInvitation();
    },
    // 本地数据
    Getfriends() {
      let value = uni.getStorageSync("user");
      if (value) {
        this.user = value;
        this.user.img = this.$user(value.img);
        this.socket.emit("join", value.id);
      } else {
        uni.navigateTo({
          url: "/pages/Signin/Signin",
        });
      }
    },
    // 好友申请
    async HomePageData() {
      let DataArr = await this.$http({
        url: "Home/Page/Data",
        data: {
          user_ID: this.user.id,
          state: "1", // 1别人添加我
        },
      }).then((res) => {
        this.tip = res.data.length;
        this.tip >= 1 && (this.Friendshow = false);
        return res.data;
      });
      for (const item of DataArr) {
        this.time = item.time;
        this.leave(item.id);
      }
    },
    // 添加好友的内容
    leave(Fid) {
      this.$http({
        url: "leave",
        data: { Friends_ID: Fid },
      }).then((res) => {
        this.NewLeave = res.data.value[0].message;
      });
    },
    // 群邀请
    GroupInvitation() {
      this.$http({
        url: "Receive/Invitation",
        data: {
          user_ID: this.user.id,
        },
      }).then((res) => {
        if (res.data) {
          this.tip = 1;
          this.time = res.data.time;
          this.NewLeave = res.data.message;
        }
      });
    },
    // 好友列表
    async Friends() {
      let item = await this.$http({
        url: "Home/Page/Data",
        // 0 已是好友
        data: { user_ID: this.user.id, state: "0" },
      });
      item.data.length <= 0
        ? (this.Friendshow = true)
        : (this.Friendshow = false);
      for (const list of item.data) {
        const [Info, Quantity] = await this.LastInfoAndQuantity(list.id);
        if (Info.length > 0) {
          const item = Info[0];
          list.message = this.TypeCasting(item.types, item.message);
        }
        list.tip = Quantity;
        list.code = 0; // 好友聊天
        list.img = this.$user(list.img);
        this.FriendsData.push(list);
      }
    },
    // 最后信息和数量
    async LastInfoAndQuantity(Friends_ID) {
      const user_ID = this.user.id;
      const data = { user_ID, Friends_ID };
      let Info = await this.$http({ url: "Information/Table", data });
      let Quantity = await this.$http({ url: "Message/Not/Read", data });
      return [Info.data, Quantity.data.result];
    },
    // socket 聊天置顶 , 接收好友消息
    ChatTypeConversion() {
      this.socket.on("ReceiveChat", (msg, Fid) => {
        let Info = this.TypeCasting(msg.types, msg.message);
        this.FriendsData.some((item, i) => {
          // 判断有没有该好友
          if (item.id === Fid) {
            item.time = new Date(); // 更新时间
            item.message = Info;
            this.FriendsData.splice(i, 1); // 删除之前的
            this.FriendsData.unshift(item); // 发送的最新消息放到最上面
          }
        });
        // 消息数量
        this.$http({
          url: "Message/Not/Read",
          data: { user_ID: this.user.id, Friends_ID: Fid },
        }).then((res) => (this.FriendsData[0].tip = res.data.result));
      });
    },
    // 接收群消息
    ReceiveGroupMessages() {
      this.socket.on(
        "GroupInfo",
        ({ name, message, types }, User_ID, Group_ID, state) => {
          this.GroupArr.some((item) => {
            if (item._id === Group_ID) {
              message = this.TypeCasting(types, message);
              // 有 state 表示别人发的
              if (state) {
                item.message = name + ": " + message;
              } else {
                item.message = message;
              }
              item.time = new Date();
            }
          });
        }
      );
    },
    // 类型转换
    TypeCasting(types, message) {
      if (types === "0") return message;
      ["[图片]", "[语音]", "[位置]"].some((item, index) => {
        if (index + 1 == types) {
          message = item;
        }
      });
      return message;
    },
    // 1 v 1 和 群聊页面
    ChatPage(data) {
      let { code, id, img, name, group_img, group_name, _id } = data;
      if (code == 0) {
        this.GetChatPage(id, name, code, img);
        this.MessageRead(id);
      } else {
        // 群聊
        this.GetChatPage(_id, group_name, code, group_img);
        this.MessageRead(_id, 1);
      }
    },
    // 消息已读
    MessageRead(id, mark) {
      let url = "";
      let data = "";
      let list = "";
      if (mark) {
        url = "Group/Message/Read";
        data = { User_ID: this.user.id, Group_ID: id };
        list = this.GroupArr;
      } else {
        url = "Message/Read";
        data = { user_ID: this.user.id, Friends_ID: id };
        list = this.FriendsData;
      }
      this.$http({ url, data });
      for (const item of list) {
        if (item.id || item._id === id) item.tip = 0;
      }
    },
    // 上拉刷新
    onPullDownRefresh() {
      setTimeout(() => {
        this.FriendsData = [];
        this.GroupArr = [];
        this.Initialization();
        uni.stopPullDownRefresh();
      }, 1000);
    },
    // 创群
    Group() {
      uni.navigateTo({ url: "/pages/CreatingGroup/CreatingGroup" });
    },
    // 获取群 + 最后一条群消息和数量
    async GetGroup() {
      const user_ID = this.user.id;
      let res = await this.$http({
        url: "Get/Group/List",
        data: { user_ID },
      });
      for (let i = 0; i < res.data.length; i++) {
        let item = res.data[i];
        setTimeout(async () => {
          if (this.GroupArr.length) {
            let {
              data: { LastTime, count, message, types, User_ID, name },
            } = await this.$http({
              url: "Get/Last/Group/Messages",
              data: { Group_ID: item._id },
            });
            item.tip = count;
            item.time = LastTime;
            item.message = this.TypeCasting(types, message);
            if (this.user.id !== User_ID) {
              item.message = name + ": " + message;
            }
          }
        }, 100);
        item.code = 1;
        item.group_img = this.Pictures + item.group_img;
        this.socket.emit("Group", item._id);
        this.GroupArr.push(item);
      }
    },
    // 跳转聊天页面
    GetChatPage(id, name, code, img) {
      uni.navigateTo({
        url: `/pages/ChatPage/ChatPage?id=${id}&name=${name}&code=${code}&img=${img}`,
      });
    },
    // socket 接收群邀请 和 好友申请
    ReceiveMessages() {
      this.socket.on("ConfirmReception", (length, news) => {
        if (news === "更新页面") {
          this.tip = 0;
          this.FriendsData.length <= 0
            ? (this.Friendshow = true)
            : (this.Friendshow = false);
          this.FriendsData = [];
          this.GroupArr = [];
          this.Friends();
          this.GetGroup();
        }
        if (news || length === "群") {
          this.GroupInvitation();
        } else {
          this.HomePageData();
        }
      });
    },
  },
};
</script>

<style lang="scss">
.AddSearch {
  width: 240rpx;
  line-height: 96rpx;
  display: inline-block;
  background: $uni-color-primary;
  box-shadow: 0 26px 18px -16px rgba(255, 228, 49, 0.4);
  font-size: 28rpx;
  border-radius: 64rpx;
  margin-top: 32rpx;
}

.warp {
  padding-top: var(--status-bar-height);
}

.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 88rpx;
  box-sizing: border-box;
  background: $uni-bg-color;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  padding-left: $uni-spacing-col-base;
  padding-right: $uni-spacing-col-base;
}

.top-bar-left {
  float: left;

  image {
    margin-top: 10rpx;
    width: 68rpx;
    height: 68rpx;
    border-radius: 16rpx;
  }
}

.top-bar-center {
  margin: 88rpx 0;
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: -1;

  image {
    padding-top: 19rpx;
    width: 88rpx;
    height: 42rpx;
  }
}

.top-bar-right {
  float: right;

  .search {
    width: 88rpx;
    height: 88rpx;
    display: inline-block;
  }

  .add {
    width: 88rpx;
    height: 88rpx;
    display: inline-block;
  }

  image {
    padding: 18rpx 0 0 18rpx;
    width: 52rpx;
    height: 52rpx;
  }
}

.mian {
  width: 100%;
  position: absolute;
  top: 88rpx;
}

.friends {
  .friends-list {
    margin-top: 20rpx;
    width: 100%;
    display: flex;
    margin-left: $uni-spacing-col-base;
    left: 0;
    position: relative;

    .friends-list-l {
      position: relative;
      height: 96rpx;

      .tip {
        position: absolute;
        right: -12rpx;
        top: -12rpx;
        width: 32rpx;
        height: 32rpx;
        border: 4rpx solid red;
        background: red;
        color: white;
        border-radius: 50%;
        text-align: center;
        z-index: 2;
        font-size: 24rpx;
      }

      image {
        border-radius: 10%;
        width: 96rpx;
        height: 96rpx;
      }
    }

    .friends-list-r {
      margin-left: 20rpx;
      width: 100%;

      .top {
        .name {
          font-size: 32rpx;
          color: rgba(39, 40, 50, 1);
          float: left;
        }

        .time {
          font-size: 24rpx;
          float: right;
          color: rgba(39, 40, 50, 0.4);
          padding-right: 40rpx;
        }

        &::after {
          content: "";
          clear: both;
          display: table;
        }
      }

      .content,
      .content2 {
        color: rgba(39, 40, 50, 0.6);
        max-width: 500rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        font-size: 28rpx;
      }

      .content2 {
        font-size: 32rpx;
        box-sizing: border-box;
        padding-top: 8rpx;
      }
    }
  }
}

.group {
  .group-list {
    margin-top: 20rpx;
    width: 100%;
    display: flex;
    margin-left: $uni-spacing-col-base;
    left: 0;
    position: relative;

    .group-list-l {
      position: relative;
      height: 96rpx;
      .group-tip {
        position: absolute;
        right: -6rpx;
        top: -6rpx;
        width: 10rpx;
        height: 10rpx;
        border: 4rpx solid red;
        background: red;
        color: white;
        border-radius: 50%;
        text-align: center;
        z-index: 2;
        font-size: 24rpx;
      }

      image {
        border-radius: 10%;
        width: 96rpx;
        height: 96rpx;
      }
    }

    .group-list-r {
      margin-left: 20rpx;
      width: 100%;

      .top {
        .name {
          font-size: 32rpx;
          color: rgba(39, 40, 50, 1);
          float: left;
        }

        .time {
          font-size: 24rpx;
          float: right;
          color: rgba(39, 40, 50, 0.4);
          padding-right: 40rpx;
        }

        &::after {
          content: "";
          clear: both;
          display: table;
        }
      }

      .content,
      .content2 {
        color: rgba(39, 40, 50, 0.6);
        max-width: 500rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        font-size: 28rpx;
      }

      .content2 {
        font-size: 32rpx;
        box-sizing: border-box;
        padding-top: 8rpx;
      }
    }
  }
}
.friends-tip {
  position: absolute;
  right: -6rpx;
  top: -6rpx;
  width: 10rpx;
  height: 10rpx;
  border: 4rpx solid red;
  background: red;
  color: white;
  border-radius: 50%;
  text-align: center;
  z-index: 2;
  font-size: 24rpx;
}
</style>
