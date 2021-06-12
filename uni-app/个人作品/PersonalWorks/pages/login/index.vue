<template>
  <view class="register">
    <text class="headline">登录</text>
    <view class="register_wrap">
      <!-- 账号输入框 -->
      <view class="register_item">
        <input
          type="text"
          class="register_account"
          placeholder="邮箱"
          v-model.trim="account"
          @focus="(Sliding = true), (errorif = false), (onexecute = true)"
          @blur="Sliding = false"
          :class="{ account_after: Sliding }"
        />
        <!-- 清除按钮 -->
        <view
          v-show="account"
          class="iconfont icon-qingchu qingchu"
          @click="account = ''"
        ></view>
      </view>
      <!-- 密码输入框 -->
      <view class="register_item">
        <input
          :type="passwordtype ? 'password' : 'text'"
          class="register_account"
          v-model.trim="passwordOne"
          placeholder="密码"
          :class="{ account_after: Sliding2 }"
          @focus="(Sliding2 = true), (errorif = false), (onexecute = true)"
          @blur="Sliding2 = false"
        />
        <view
          class="iconfont icon-xianshi qingchu2"
          @click="passwordtype = !passwordtype"
          v-show="passwordOne ? (eyehid = true) : (eyehid = false)"
        ></view>
        <!-- 错误信息 -->
        <view class="ErrorMessage" v-if="errorif">{{ ErrorMessage }}</view>
      </view>
    </view>
    <!-- 登录 -->
    <view class="login" @click="login">点击登录 </view>
    <view class="Switchdisplay"
      >没有账号<text>|</text>
      <navigator
        url="../register/index"
        hover-class="none"
        open-type="redirect"
      >
        点击注册
      </navigator></view
    >
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      account: "", // 邮箱的value
      passwordOne: "", // 密码
      eyehid: false, //密码显示隐藏
      passwordtype: true, // 切换密码 type 类型
      Sliding: false, //  账号下滑动画
      Sliding2: false, //  账号下滑动画
      ErrorMessage: "", // 错误提示
      errorif: false, // 错误展示
      onexecute: true, // 后端返回错误就不执行了
    };
  },
  methods: {
    async login() {
      if (this.account && this.passwordOne) {
        if (this.onexecute) {
          let regular = /\s/g;
          // 判断输入框有没有空格
          let resultRE =
            regular.test(this.account) || regular.test(this.passwordOne);
          if (resultRE) {
            uni.showToast({
              title: "不能包含空格",
              duration: 1000,
              icon: "none",
            });
          } else {
            let res = await this.$http({
              url: "/login",
              data: {
                password: this.passwordOne,
                email: this.account,
              },
            });
            // 后端返回错误就不在执行
            if (res.data.status === 0) {
              // 后端返回的错误
              this.ErrorMessage = res.data.message; // 错误提示
              this.errorif = true; // 错误展示
              this.onexecute = false;
            }
            // 成功跳转
            if (res.data.status === 1) {
              (this.account = ""), (this.passwordOne = "");
              uni.setStorage({
                key: "token",
                data: res.data.token,
              });
              uni.reLaunch({
                url: `/pages/index/index`,
              });
            }
          }
        }
      } else {
        uni.showToast({
          title: "请输入邮箱或密码",
          duration: 1000,
          icon: "none",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
page {
  background-color: #f2f2f2;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 30rpx;
  background: #f2f2f2;
  min-height: 100%;
}
.register {
  width: 780rpx;
  background: #fff;
  border-radius: 20rpx;
  overflow: hidden;
  padding: 154rpx 110rpx 66rpx 110rpx;
  box-shadow: 0 10rpx 20rpx 0 rgba(0, 0, 0, 0.1);
  position: relative;
  .headline {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 60rpx;
    display: block;
  }
  .register_wrap {
    width: 100%;
    position: relative;
    .register_item {
      width: 100%;
      position: relative;
      margin-bottom: 74rpx;
      .register_account {
        position: relative;
        width: 100%;
        border-bottom: 2rpx solid #adadad;
        outline: none;
        height: 90rpx;
        font-size: 30rpx;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 4rpx;
          transition: all 0.5s;
          background: #6a7dfe;
          background: linear-gradient(left, #21d4fd, #b721ff);
        }
      }
      .account_after::after {
        width: 100%;
      }
      .qingchu {
        position: absolute;
        bottom: 10rpx;
        right: 10rpx;
        font-size: 48rpx;
        color: #ccc;
      }
      .qingchu2 {
        position: absolute;
        top: 20rpx;
        right: 0;
        font-size: 48rpx;
        color: #ccc;
      }
    }
  }

  .login {
    text-align: center;
    margin-top: 40rpx;
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    background: linear-gradient(120deg, #3498db, #8e44ad, #3498db);
    background-size: 200%;
    transition: 0.5s;
    border-radius: 50rpx;
    color: white;
    font-size: 32rpx;
  }
}
.Switchdisplay {
  display: flex;
  justify-content: center;
  height: 90rpx;
  align-items: center;
  font-size: 30rpx;
  text {
    padding: 0 20rpx;
  }
  navigator {
    color: #007bff;
  }
}
.ErrorMessage {
  font-size: 32rpx;
  position: absolute;
  color: red;
}
</style>
