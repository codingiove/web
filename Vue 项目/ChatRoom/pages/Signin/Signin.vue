<template>
  <view class="warp">
    <view class="Signin-bar">
      <view class="Signin-bar-title" @tap="ToRegistration">注册</view>
      <view class="Signin-logo">
        <image src="/static/img/Signin/Signin.png" />
      </view>
    </view>
    <view class="Signin">
      <view class="Signin-title">登录</view>
    </view>
    <view class="Signin-frame">
      <view class="text-frame">
        <input
          type="text"
          placeholder="用户名 / 邮箱"
          v-model="username"
          @focus="errTips = false"
        />
      </view>
      <view>
        <input
          type="password"
          placeholder="请输入密码"
          v-model="password"
          @focus="errTips = false"
        />
      </view>
      <view class="errTips" v-if="errTips">{{ PasswordNews }}</view>
    </view>
    <button
      type="button"
      class="login"
      :class="{ ButtonStyle: value }"
      @tap="SignIn"
    >
      登录
    </button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: "", // 用户框
      password: "", // 密码框
      errTips: false,
      PasswordNews: "账号或密码有误",
      ButtonStyle: false, // 登录按钮样式
    };
  },
  methods: {
    onLoad({ name }) {
      name && (this.username = name);
    },
    //注册页面
    ToRegistration() {
      uni.navigateTo({
        url: "/pages/register/register",
      });
    },
    // 登录
    SignIn() {
      if (this.username && this.password) {
        if (this.errTips) return;
        this.$http({
          url: "LogIn",
          data: {
            data: this.username,
            psw: this.password,
          },
        }).then((res) => {
          this.PasswordNews = res.data.success; // 根据后端返回错误显示到页面上
          this.errTips = true;
          if (res.data.code === 1) {
            // 清除表单中的值
            this.username = "";
            this.password = "";
            let { id, img, name, token } = res.data.back;
            // 存储用户信息
            try {
              uni.setStorageSync("user", { id, img, name, token });
            } catch (error) {
              console.log("存储数据失败");
            }
            uni.navigateTo({
              url: "/pages/index/index",
            });
          }
        });
      }
    },
  },
  computed: {
    // 当前 username 和  password 发生改变就设置样式,发生改变证明有值了
    value() {
      return this.username && this.password
        ? (this.ButtonStyle = true)
        : (this.ButtonStyle = false);
    },
  },
};
</script>

<style lang="scss">
.warp {
  padding-top: var(--status-bar-height);
  .Signin-bar {
    .Signin-bar-title {
      padding: 50rpx 50rpx 0 0;
      text-align: right;
      font-size: 36rpx;
      color: rgba(51, 51, 51, 1);
      font-weight: 600;
    }
    .Signin-logo {
      width: min-content;
      margin: 0 auto;
      image {
        width: 192rpx;
        height: 92rpx;
      }
    }
  }
  .Signin {
    display: flex;
    flex-direction: column;
    margin-top: 55rpx;
    margin-left: 62rpx;
    .Signin-title {
      font-size: 56rpx;
      color: rgba(39, 40, 50, 1);
      margin-bottom: 14rpx;
    }
  }
  .Signin-frame {
    margin: 55rpx 0 0 62rpx;
    color: rgba(39, 40, 50, 1);
    .text-frame {
      font-size: 32rpx;
      border-bottom: 2rpx solid rgba(39, 40, 50, 0);
      padding-bottom: 50rpx;
    }
    input {
      width: 626rpx;
      font-size: 32rpx;
      border-bottom: 4rpx solid rgba(39, 40, 50, 0.08);
      height: 40px;
    }
    .errTips {
      font-size: 32rpx;
      color: red;
    }
  }
  .login {
    background: rgba(39, 40, 50, 0.2);
    color: #fff;
    width: 520rpx;
    line-height: 96rpx;
    font-weight: 600;
    text-align: center;
    border-radius: 48rpx;
    margin: 80rpx auto auto;
    font-size: 32rpx;
    transition: all 0.5s;
  }
  .ButtonStyle {
    background: rgb(255, 221, 0);
    color: #000;
  }
}
</style>
