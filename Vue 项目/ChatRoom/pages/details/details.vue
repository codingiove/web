<template>
  <view>
    <!-- 本人 -->
    <view v-if="id === Fid">
      <!-- 头部 -->
      <view class="details-top">
        <image
          src="/static/img/register/jtou.png"
          class="details-arrow"
          @tap="back"
        />
        <image
          src="/static/img/details/more.png"
          class="details-more"
          @tap="UserDetails"
        />
      </view>
      <!-- 背景 -->
      <view class="details-bg">
        <image :src="user.user_img" />
      </view>
      <!-- 头像 -->
      <view class="details-head-portrait">
        <view class="portrait">
          <image :src="user.user_img" />
        </view>
        <view class="Gender" :style="{ background: sexBg }">
          <image :src="seximg" class="Gender-img" />
        </view>
      </view>
      <!-- 内容 -->
      <view class="details-resume-wrap">
        <view class="resume">{{ user.name }}</view>
        <view class="Nickname">昵称： {{ user.name }}</view>
        <view class="introduce">{{ referral }}</view>
      </view>
    </view>
    <!-- 好友 -->
    <view v-else>
      <!-- 头部 -->
      <view class="details-top">
        <image
          src="/static/img/register/jtou.png"
          class="details-arrow"
          @tap="back"
        />
        <image
          src="/static/img/details/more.png"
          class="details-more"
          v-if="Judge === 0 || Judge === 1"
          @tap="UserDetails"
        />
      </view>
      <!-- 背景 -->
      <view class="details-bg">
        <image :src="user.user_img" />
      </view>
      <!-- 头像 -->
      <view class="details-head-portrait">
        <view class="portrait">
          <image :src="user.user_img" :animation="Animation.library2" />
        </view>
        <view
          class="Gender"
          :animation="Animation.library3"
          :style="{ background: sexBg }"
        >
          <image :src="seximg" class="Gender-img" />
        </view>
      </view>
      <!-- 内容 -->
      <view class="details-resume-wrap">
        <view class="resume">{{ user.name }}</view>
        <view class="Nickname">昵称： {{ user.name }}</view>
        <view class="introduce">{{ referral }}</view>
      </view>
      <!-- 已是好友 -->
      <view class="addFriends" v-if="Judge === 1">
        <button>发送信息</button>
      </view>
      <!-- 添加好友按钮 -->
      <view class="addFriends" @tap="Add_friends_animation" v-if="Judge === 2">
        <button>加为好友</button>
      </view>
      <!-- 添加好友信息 -->
      <view
        class="Add-friend-information-wrap"
        :style="{ height: height + 'px', bottom: -+height + 'px' }"
        :animation="Animation.library1"
      >
        <view class="information-resume">{{ user.name }}</view>
        <view class="Add-information">
          <textarea
            class="title"
            maxlength="120"
            :value="Nickname + ' 请求添加好友'"
            @input="AddFriendInfo"
          ></textarea>
        </view>
      </view>
      <!-- 按钮 -->
      <view class="Friends-button-wrap" :animation="Animation.library1">
        <view class="cancel-btn" @tap="Add_friends_animation">取消</view>
        <view class="send-btn" @tap="FriendApplication">发送</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 用户详细信息
      user: {},
      id: "", // 用户ID
      Fid: "", // 好友ID
      token: "", // token
      Nickname: "", // 用户名
      Judge: "", // 判断关系
      seximg: "/static/img/details/nan.png", //性别图片
      sexBg: "rgba(87,153,255,1)", // 性别颜色
      referral: "这个人很懒,什么都没留下~~", // 简介
      Animation: {
        // 动画库
        library1: {},
        library2: {},
        library3: {},
      },
      isADD: false, // 控制动画显示隐藏
      height: "", // 动态获取高度
      info: "",
    };
  },
  onLoad(e) {
    this.Fid = e.id;
    this.getStorage();
    this.Judge_Friend();
    this.Get_User_Information();
  },
  onReady() {
    this.id !== this.Fid && this.GetHeight();
  },
  onShow() {
    console.log("显示");
    this.$forceUpdate();
  },

  methods: {
    // 动态获取高度
    GetHeight() {
      console.log(1);
      const query = uni.createSelectorQuery().in(this);
      query
        .select(".Add-friend-information-wrap")
        .boundingClientRect((data) => {
          this.height = data.height - 88;
        })
        .exec();
    },
    // 添加好友动画
    Add_friends_animation() {
      this.isADD = !this.isADD;
      var animation = uni.createAnimation({
        duration: 300,
        timingFunction: "ease",
      });
      var animation2 = uni.createAnimation({
        duration: 300,
        timingFunction: "ease",
      });
      var animation3 = uni.createAnimation({
        duration: 300,
        timingFunction: "ease",
      });
      if (this.isADD) {
        animation.bottom(0).step();
        animation2.width(100).height(100).step();
        animation3.opacity(0).step();
      } else {
        animation.bottom(-this.height).step();
        animation2.width(150).height(150).step();
        animation3.opacity(1).step();
      }
      // 导出动画给组件使用
      this.Animation.library1 = animation.export();
      this.Animation.library2 = animation2.export();
      this.Animation.library3 = animation3.export();
    },
    // 由于层级问题, details-bg 开启了 fixed, 压住了返回箭头,设置一下 details-bg 的 z-index: -2;
    back() {
      uni.navigateBack({
        delta: 1,
      });
    },
    // 获取用户信息
    Get_User_Information() {
      this.$http({
        url: "User/Details",
        data: {
          _id: this.Fid,
          token: this.token,
        },
      }).then((res) => {
        let { user_img, referral, name, sex } = res.data;
        referral && (this.referral = referral);
        this.user = res.data;
        // 好友图片拼接
        this.user.user_img = this.$user(user_img);
        this.DetermineGender(sex);
      });
    },
    // 判断性别
    DetermineGender(sex) {
      if (sex === "男") {
        this.seximg = "/static/img/details/nan.png";
        this.sexBg = "rgba(87,153,255,1)";
      } else {
        this.seximg = "/static/img/details/nv.png";
        this.sexBg = "rgba(255, 93, 91, 1)";
      }
    },
    // 判断是否是好友
    Judge_Friend() {
      if (this.id === this.Fid) {
        // 本人
        this.Judge = 0;
      } else {
        // 不是自己
        this.$http({
          url: "Friend",
          data: {
            Id: this.id,
            Fid: this.Fid,
            token: this.token,
          },
        }).then((res) => {
          let { status } = res.data;
          //  200代表是好友
          status === 200 ? (this.Judge = 1) : (this.Judge = 2);
        });
      }
    },
    // 添加好友
    FriendApplication() {
      this.info.length <= 0
        ? (this.info = this.Nickname + " 请求添加好友")
        : this.info;
      this.$http({
        url: "Friend/Request",
        data: {
          user_ID: this.id,
          Friends_ID: this.Fid,
          message: this.info,
        },
      }).then((res) => {
        if (res.data.status === 200) {
          uni.showToast({
            title: "好友请求发送成功",
            duration: 2000,
            icon: "none",
          });
          this.Add_friends_animation();
        }
      });
    },
    // 跳转用户详细信息
    UserDetails() {
      uni.navigateTo({
        url: `/pages/personal/personal?id=${this.Fid}`,
      });
    },
    // 获取本地信息
    getStorage() {
      let value = uni.getStorageSync("user");
      if (value) {
        this.id = value.id;
        this.token = value.token;
        this.Nickname = value.name;
      } else {
        uni.navigateTo({
          url: "/pages/Signin/Signin",
        });
      }
    },
    // 添加好友信息
    AddFriendInfo(e) {
      this.info = e.detail.value;
    },
  },
};
</script>

<style lang="scss">
.details-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50rpx 50rpx;

  .details-arrow {
    transform: rotate(180deg);
    width: 48rpx;
    height: 48rpx;
  }
  .details-more {
    width: 52rpx;
    height: 12rpx;
  }
}
.details-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 101%;
  height: 101%;
  z-index: -2;

  image {
    z-index: -10;
    opacity: 0.4;
    position: absolute;
    top: -10rpx;
    left: -10rpx;
    width: 100%;
    height: 100%;
    filter: blur(16px);
  }
}
.details-head-portrait {
  padding-top: 60rpx;
  text-align: center;
  position: relative;
  margin: 0 auto;
  max-width: max-content;

  z-index: 66;
  .portrait {
    image {
      width: 300rpx;
      height: 300rpx;
      border: 4rpx solid #ffffff;
      border-radius: 50rpx;
    }
  }
  .Gender {
    position: absolute;
    bottom: 20rpx;
    right: 12rpx;
    width: 64rpx;
    line-height: 64rpx;
    border-radius: 50%;
    box-sizing: border-box;

    .Gender-img {
      width: 32rpx;
      height: 32rpx;
    }
  }
}
.details-resume-wrap {
  padding-top: 48rpx;

  text-align: center;
  color: rgb(0, 0, 0);
  .resume {
    font-size: 50rpx;
    padding-bottom: 10rpx;
    font-weight: 500;
  }
  .Nickname {
    font-size: 28rpx;
    margin-bottom: 20rpx;
  }

  .introduce {
    font-size: 28rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    padding: 0 98rpx 0 100rpx;
  }
}
.addFriends {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 104rpx;
  z-index: 0;
  button {
    width: 684rpx;
    line-height: 80rpx;
    height: 80rpx;
    background: rgba(255, 228, 49, 1);
    border-radius: 10rpx;
    color: rgba(39, 40, 50, 1);
    font-size: 32rpx;
  }
}
.Add-friend-information-wrap {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1200rpx;
  background: rgba(255, 255, 255, 1);
  border-radius: 40rpx 40rpx 0 0;
  .information-resume {
    margin: 0 50rpx;
    padding-top: 200rpx;
    font-size: 52rpx;
    color: rgba(39, 40, 50, 1);
    line-height: 74rpx;
  }

  .Add-information {
    width: 638rpx;
    height: 520rpx;
    background: rgba(243, 244, 246, 1);
    border-radius: 20rpx;
    margin: 30rpx auto;
    .title {
      padding: 18rpx 22rpx;
      box-sizing: border-box;
      font-size: 32rpx;
      width: 100%;
      line-height: 44rpx;
      height: 420rpx;
    }
  }
}
.Friends-button-wrap {
  display: flex;
  position: fixed;
  bottom: -104rpx;
  height: 104rpx;
  width: 100%;
  padding: 0 20rpx;
  box-sizing: border-box;
  text-align: center;
  font-size: 32rpx;

  .cancel-btn {
    flex: auto;
    line-height: 80rpx;
    height: 80rpx;
    margin-right: 32rpx;
    width: 172rpx;
    background: rgba(39, 40, 50, 0.1);
    border-radius: 10rpx;
  }

  .send-btn {
    flex: auto;
    width: 480rpx;
    line-height: 80rpx;
    height: 80rpx;
    background: rgba(255, 228, 49, 1);
    border-radius: 10rpx;
  }
}
</style>
