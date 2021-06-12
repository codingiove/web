<template>
  <view class="warp">
    <view class="Signin-bar">
      <view class="Signin-bar-title" @tap="ToLanding">
        <image src="/static/img/register/jtou.png" />
      </view>
      <view class="Signin-logo">
        <image src="/static/img/Signin/Signin.png" />
      </view>
    </view>
    <view class="Signin">
      <view class="Signin-title">注册</view>
    </view>
    <view class="Signin-frame">
      <view class="text-frame">
        <input type="text" placeholder="请输入名称" v-model="wrap.name" />
      </view>
      <view class="text-frame">
        <input
          type="email"
          placeholder="请输入邮箱"
          @blur="MailboxVerification"
          v-model="wrap.email"
          @focus="Emailerror = false"
        />
        <text class="errTips" v-if="Emailerror">{{ Email }}</text>
      </view>
      <view class="text-frame">
        <input :type="type" placeholder="请输入密码" ref="password" />
        <view @tap="ToggleDisplay">
          <view class="success-Tips">
            <image :src="picture" />
          </view>
        </view>
      </view>
    </view>
    <button
      type="button"
      class="login"
      :class="{ ButtonStyle: value }"
      @tap="register"
    >
      注册
    </button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      DisplayPassword: true,
      type: "password", // 密码框类型
      Emailerror: false, // 邮箱框错误提示
      picture: "/static/img/register/Closeeyes.png",
      ButtonStyle: false,
      Email: "请输入正确邮箱",
      wrap: {
        name: "", // 用户名
        psw: "", // 密码
        email: "", // 邮箱
      },
    };
  },
  methods: {
    // 显示与隐藏
    ToggleDisplay() {
      let url = "/static/img/register/";
      if (this.DisplayPassword) {
        this.type = "text";
        this.DisplayPassword = false;
        this.picture = url + "Openeyes.png";
      } else {
        this.type = "password";
        this.DisplayPassword = true;
        this.picture = url + "Closeeyes.png";
      }
    },
    // 邮箱判断
    MailboxVerification() {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (this.wrap.email.length > 0 && reg.test(this.wrap.email)) {
        this.Emailerror = false;
      } else {
        this.Emailerror = true;
      }
    },
    // 去登录页
    ToLanding() {
      uni.navigateTo({
        url: `/pages/Signin/Signin?name=${this.wrap.name}`,
      });
      this.Empty_words();
    },
    // 注册
    register() {
      this.wrap.psw = this.$refs.password.valueSync;
      if (this.wrap.email && this.wrap.psw && this.wrap.name) {
        if (this.Emailerror) return;
        this.$http({ url: "signin", method: "POST", data: this.wrap }).then(
          (res) => {
            this.Email = res.data.success; // 根据后端返回错误显示到页面上
            this.Emailerror = true;
            if (res.data.code === 1) {
              uni.showToast({
                title: "注册成功",
                duration: 2000,
                icon: "none",
              });
              setTimeout(() => {
                this.ToLanding();
              }, 2000);
            }
          }
        );
      }
    },
    // 清除表单中的值
    Empty_words() {
      this.wrap.email = "";
      this.wrap.name = "";
      this.$refs.password.valueSync = "";
    },
  },
  computed: {
    // 当输入框都有值,显示按钮
    value() {
      return this.wrap.email && this.$refs.password.valueSync && this.wrap.name
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
      padding: 50rpx 0 0 50rpx;
      text-align: left;
      font-size: 36rpx;
      color: rgba(51, 51, 51, 1);
      font-weight: 600;

      image {
        transform: rotate(180deg);
        width: 48rpx;
        height: 48rpx;
      }
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
    .errTips {
      position: absolute;
      top: 90rpx;
      right: 0;
      color: rgba(255, 93, 91, 1);
      font-size: 28rpx;
    }
    .success-Tips {
      image {
        width: 42rpx;
        height: 32rpx;
        position: absolute;
        top: 30rpx;
        right: 0;
      }
    }
    .text-frame {
      font-size: 32rpx;
      border-bottom: 2rpx solid rgba(39, 40, 50, 0);
      padding-bottom: 50rpx;
      position: relative;
      width: 626rpx;
      &:last-child {
        padding-bottom: 0;
      }
    }
    input {
      width: 100%;
      box-sizing: border-box;
      font-size: 32rpx;
      border-bottom: 4rpx solid rgba(39, 40, 50, 0.08);
      height: 40px;
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
