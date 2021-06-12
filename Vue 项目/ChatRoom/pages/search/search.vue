<template>
  <view class="warp">
    <view class="Search-box">
      <view class="Searc">
        <input type="text" placeholder="搜索用户 / 群" v-model="SearcValue" />
        <!-- <image src="/static/img/index/search.png" /> -->
      </view>
      <text @tap="JumpIndex">取消</text>
    </view>
    <view class="Search-result">
      <view class="Result-title" v-if="SearchList.length > 0">用户</view>
      <view v-for="item in SearchList" :key="item.id" class="Result-list">
        <navigator
          class="navigator"
          :url="`/pages/details/details?id=${item._id}`"
          redirect
          hover-class="className"
        >
          <image class="List-img" :src="item.user_img" />
          <view class="List-describe">
            <view class="List-name" v-html="item.name"></view>
            <view class="List-news" v-html="item.email"></view>
          </view>
        </navigator>
        <!-- 添加好友 -->
        <view
          class="List-btn2"
          v-if="item.ConfirmFriends === 0"
          @tap="Add_friends_animation(item._id)"
          >加好友</view
        >
        <view
          class="List-btn"
          v-else-if="item.ConfirmFriends === 1"
          @tap="ChatPage(item)"
          >发消息</view
        >
        <view class="List-btn3" v-else></view>
      </view>

      <!-- <view class="Group-result-title">群组</view>
      <view class="Group-list">
        <image class="List-img" src="/static/img/Snipaste2.png" />
        <view class="List-name">确实力力就这确实力力就这确实力力就这</view>
        <view class="List-btn">加好友</view>
      </view> -->
    </view>
    <!-- 没有搜索到 -->
    <non-existent v-if="NoExistent === 1">
      <view>没有找到该用户</view>
    </non-existent>
    <!-- 弹出框 -->
    <view
      class="personal-popover"
      :animation="library"
      :style="{ bottom: -height + 'px' }"
    >
      <view class="popover-top">
        <view class="popover-cancel" @tap="Add_friends_animation">取消</view>
        <view class="popover-create">添加好友</view>
        <view class="popover-confirm" @tap="FriendApplication">确定</view>
      </view>
      <view class="content-block">
        <view class="information-block">
          <textarea v-model="msg" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// 导入防抖
import { debounce } from "../../resource/js/AntiShake";
import NonExistent from "../../components/Common/empty";
export default {
  components: {
    NonExistent,
  },
  data() {
    return {
      SearcValue: "", // 搜索双向数据绑定
      SearchList: [], // 数据
      unWatch: null, // 清空防抖
      token: "", // token
      Id: "", // 用户 ID
      Fid: "", // 好友 ID
      name: "", //用户名
      library: {}, // 动画
      height: "", // 动态高度
      isADD: false, // 控制动画显示隐藏
      msg: "", // 添加好友信息
      NoExistent: "", //搜索用户是否存在
    };
  },
  created() {
    this.unWatch = this.$watch(
      "SearcValue",
      debounce(() => {
        this.FindFriends();
      }, 1000)
    );
  },
  mounted() {
    let { token, id, name } = uni.getStorageSync("user");
    this.token = token;
    this.Id = id; // 用户 ID
    this.name = name; // 用户名
    this.GetHeight();
  },
  onUnload() {
    this.unWatch();
    this.debounce = null;
    this.unWatch = null;
  },
  methods: {
    // 搜索用户
    FindFriends() {
      // 调用这个方法就清空数组,不然页面会有上次搜索结果
      this.SearchList = [];
      this.NoExistent = 0;
      if (this.SearcValue.length > 0) {
        this.$http({
          url: "Search/User",
          data: {
            data: this.SearcValue,
            token: this.token,
          },
        }).then((res) => {
          let data = res.data;
          // 没有当前用户
          data.length <= 0 ? (this.NoExistent = 1) : (this.NoExistent = 0);
          for (const item of data) {
            // 拼接头像图片地址
            item.user_img = this.$user(item.user_img);
            if (
              item.name.includes(this.SearcValue) ||
              item.email.includes(this.SearcValue)
            ) {
              this.judgmentChina(this.Id, item);
            }
          }
        });
      }
    },
    // 判断是不是好友
    judgmentChina(Id, item) {
      let tip = 0;
      this.$http({
        url: "Friend",
        data: {
          Id: Id,
          Fid: item._id,
        },
      }).then((res) => {
        let { status } = res.data;
        // 本人
        if (Id === item._id) {
          tip = 3;
          item.ConfirmFriends = tip;
          this.SearchList.push(item);
        } else {
          //  200代表是好友
          status === 200 ? (tip = 1) : (tip = 0);
          // 通过 ConfirmFriends 来显示按钮颜色
          item.ConfirmFriends = tip;
          // 给搜索关键字设置高亮
          item.name = item.name.replace(
            this.SearcValue,
            `<view style="color:#4AAAFF">${this.SearcValue}</view>`
          );
          item.email = item.email.replace(
            this.SearcValue,
            `<view style="color:#4AAAFF">${this.SearcValue}</view>`
          );
          this.SearchList.push(item);
        }
      });
    },
    // 返回首页页面
    JumpIndex() {
      uni.navigateBack({
        delta: 1,
      });
    },
    // 动态获取高度
    GetHeight() {
      uni
        .createSelectorQuery()
        .in(this)
        .select(".personal-popover")
        .boundingClientRect((data) => (this.height = data.height))
        .exec();
    },
    // 添加好友动画
    Add_friends_animation(Fid) {
      Fid && (this.Fid = Fid);
      this.isADD = !this.isADD;
      this.msg = this.name + " 请求添加好友~";
      var animation = uni.createAnimation({
        duration: 300,
        timingFunction: "ease",
      });
      this.isADD
        ? animation.bottom(0).step()
        : animation.bottom(-this.height).step();
      this.library = animation.export();
    },
    // 确认添加好友
    FriendApplication() {
      this.$http({
        url: "Friend/Request",
        data: {
          user_ID: this.Id,
          Friends_ID: this.Fid,
          message: this.msg,
        },
      }).then((res) => {
        if (res.data.status === 200) {
          uni.showToast({
            title: "好友请求发送成功",
            duration: 2000,
            icon: "none",
          });
          this.socket.emit("ReceiveMessages", this.Fid);
          this.Add_friends_animation();
        }
      });
    },
    // 聊天页面
    ChatPage(data) {
      let { _id, name } = data;
      name = name.replace(
        `<view style="color:#4AAAFF">${this.SearcValue}</view>`,
        `${this.SearcValue}`
      );
      this.GetChatPage(_id, name);
      this.MessageRead(_id);
    },
    // 1 对 1 消息已读
    MessageRead(Fid) {
      this.$http({
        url: "Message/Read",
        data: { user_ID: this.Id, Friends_ID: Fid },
      });
    },
    // 跳转聊天页面
    GetChatPage(id, name) {
      return uni.navigateTo({
        url: `/pages/ChatPage/ChatPage?id=${id}&name=${name}&code=${0}`,
      });
    },
  },
};
</script>

<style lang="scss">
.warp {
  padding-top: var(--status-bar-height);
}
.Search-box {
  display: flex;
  justify-content: space-evenly;
  padding: 20rpx;
  align-items: center;
  border-bottom: 2rpx solid rgb(233, 233, 233);
  .Searc {
    position: relative;
    width: 600rpx;
    input {
      background: rgba(243, 244, 246, 1);
      padding-left: 10rpx;
      border-radius: 10rpx;
      height: 60rpx;
      padding-right: 30px;
      font-size: 26rpx;
    }
    image {
      position: absolute;
      width: 40rpx;
      height: 40rpx;
      top: 9rpx;
      right: 12rpx;
    }
  }

  text {
    font-size: 28rpx;
    color: rgba(39, 40, 50, 1);
  }
}
.Search-result {
  width: 700rpx;
  margin: 34rpx 25rpx 0 25rpx;
  .Result-title,
  .Group-result-title {
    font-size: 44rpx;
    color: rgba(39, 40, 50, 1);
    font-weight: 500;
  }
  .Result-list,
  .Group-list {
    display: flex;
    margin-top: 20rpx;
    align-items: center;
    justify-content: space-between;
    .navigator {
      display: contents;
    }
    .List-img {
      width: 80rpx;
      height: 80rpx;
      border-radius: 8rpx;
    }

    .List-describe {
      position: relative;
      .List-name {
        font-size: 36rpx;
        width: 432rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        margin-top: -48rpx;
      }
      .List-news {
        position: absolute;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        font-size: 32rpx;
      }
    }

    .List-btn,
    .List-btn2 {
      width: 120rpx;
      line-height: 48rpx;
      background: rgba(255, 228, 49, 1);
      border-radius: 50rpx;
      color: rgb(0, 0, 0);
      font-size: 24rpx;
      text-align: center;
      padding: 6rpx 0;
    }
    .List-btn2 {
      background: rgba(74, 170, 255, 0.1);
      color: rgba(74, 170, 255, 1);
    }
    .List-btn3 {
      width: 120rpx;
      line-height: 48rpx;
    }
  }
  .Group-result-title {
    margin-top: 60rpx;
  }
}
.personal-popover {
  width: 100%;
  height: 100%;
  background: #fff;
  position: fixed;
  bottom: 0;
  color: rgba(39, 40, 50, 1);
  font-size: 32rpx;
  .popover-top {
    display: flex;
    align-items: center;
    height: 88rpx;
    justify-content: space-between;
    padding: 0 32rpx;

    .popover-create {
      font-size: 40rpx;
    }

    .popover-confirm {
      color: rgba(74, 170, 255, 1);
    }
  }
  .content-block {
    width: 686rpx;
    margin: 34rpx auto;
    .password-block,
    .information-block {
      border-radius: 15rpx;
      background: rgba(243, 244, 246, 1);
      input {
        height: 80rpx;
        padding: 0 15rpx;
      }
    }
    .information-block {
      margin-top: 30rpx;
      height: 300rpx;
      textarea {
        width: 100%;
        padding: 20rpx 20rpx;
        box-sizing: border-box;
      }
    }
  }
}
</style>
