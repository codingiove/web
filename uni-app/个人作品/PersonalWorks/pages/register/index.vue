<template>
  <view class="register">
    <text class="headline">注册</text>
    <view class="register_wrap">
      <!-- 账号输入框 -->
      <view class="register_item">
        <input
          type="text"
          class="register_account"
          placeholder="账号"
          :class="{ actvie: limit, account_after: Sliding }"
          v-model.trim="account"
          :maxlength="size"
          @focus="Sliding = true"
          @blur="Sliding = false"
        />
        <view
          v-show="account"
          class="iconfont icon-qingchu qingchu"
          @click="account = ''"
        ></view>
      </view>
      <view class="register_warning" v-show="limit">账号长度不能超过8位</view>
      <!-- 密码输入框 -->
      <view class="register_item">
        <input
          :type="passwordtype ? 'password' : 'text'"
          :class="{ account_after: Slidingtwo }"
          class="register_account"
          v-model.trim="passwordOne"
          placeholder="密码"
          @focus="Slidingtwo = true"
          @blur="Slidingtwo = false"
        />
        <view
          class="iconfont icon-xianshi qingchu2"
          @click="passwordtype = !passwordtype"
          v-show="passwordOne ? (eyehid = true) : (eyehid = false)"
        ></view>
        <view class="wrap">
          <view class="input_span">
            <text class="one" ref="one"></text>
            <text class="two" ref="two"></text>
            <text class="three" ref="three"></text>
          </view>
          <view class="font">
            <text>弱</text>
            <text>中</text>
            <text>强</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 邮箱 -->
    <view class="email">
      <text class="title" :class="{ titleTop: styleTop }">邮箱</text>
      <input
        type="text"
        v-model.trim="email"
        @focus="oneclick"
        @blur="styleTopclick"
      />
      <!-- 错误提示 -->
      <text class="towtext" v-if="emailnorm">{{ hint }}</text>
      <!-- 发送验证码 -->
      <button
        type="default"
        size="mini"
        hover-class="none"
        @click="check"
        :disabled="count"
      >
        {{ Sendverificationcode }}
      </button>
    </view>
    <!-- 验证码 -->
    <view class="verificationcss">
      <text>验证码</text
      ><input
        type="text"
        v-model.trim="pwdee"
        @focus="(pwdeenorm = true), (securityfalse = false)"
      />
      <view v-if="securityfalse">验证码不正确</view>
    </view>
    <!-- 登录 -->
    <view
      @click="login"
      class="login"
      @touchstart="rightstyle = true"
      :class="{ right: rightstyle }"
      @touchend="rightstyle = false"
      >点击注册
    </view>
    <view class="Switchdisplay"
      >已有账号<text>|</text>
      <navigator url="../login/index" hover-class="none" open-type="redirect">
        点击登录
      </navigator></view
    >
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      account: "", // 账号的 value
      size: 8, // 账号的最大长度
      passwordOne: "", // 密码
      eyehid: false, //密码显示隐藏
      passwordtype: true, // 切换密码 type 类型
      type: "password", // password 和 text
      rightstyle: false, // 触摸样式
      email: "", // 邮箱
      emailnorm: false, // 邮箱规范提示
      hint: "邮箱不规范", //邮箱错误提示
      onexecute: true, // 后端返回错误就不执行了
      time: 60, // 下一次发送验证码
      cleartimer: null, // 清除定时器
      Sendverificationcode: "发送验证码",
      count: false, //决定按钮禁不禁用
      Sliding: false, //  账号下滑动画
      Slidingtwo: false, // 密码下滑动画
      styleTop: false, // 邮箱字符样式
      msgText: "", //判断的值,密码强度
      pwdee: "", // 验证码
      pwdeenorm: true, // 后端返回错误就不执行了
      securityfalse: false, // 验证码不正确
    };
  },
  computed: {
    limit() {
      return this.size === this.account.length; // 限制 input的长度 === v-model 的长度
    },
  },
  methods: {
    oneclick() {
      this.emailnorm = false; // 邮箱输入框获取焦点,让邮箱规范提示隐藏
      this.onexecute = true; // 邮箱再次获得焦点可重新发送网络请求
      this.styleTop = true;
    },
    styleTopclick() {
      if (this.email) return (this.styleTop = true); // 有内容效果继续呆在上面
      this.styleTop = false;
    },
    async check() {
      let reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      let isok = reg.test(this.email.trim()); // 正则校验
      // 不规范(true)文字显示  规范(false)文字隐藏
      !isok ? (this.emailnorm = true) : (this.emailnorm = false);
      if (this.emailnorm || !this.onexecute) {
        // 邮箱为空,不发送网络请求 ,有错误信息
        // 默认可以执行,但后端如果有返回错误,就不在发送网络请求了,影响性能
        this.emailnorm = true; // 邮箱规范提示
        console.log("邮箱获得焦点重新发送网络请求");
        return;
      }
      // 前面都没问题就发起网络请求
      let res = await this.$http({
        url: "/register",
        data: {
          name: this.account,
          password: this.passwordOne,
          email: this.email,
        },
      });
      console.log(res);
      // 后端发送的错误信息
      if (res.data.status === 0 || undefined) {
        this.hint = res.data.message; // 错误信息覆盖原来的文字
        this.emailnorm = true; // 邮箱规范提示
        this.onexecute = false; // 不允许发送网络请求了
        return false;
      }
      // 60后重新发送请求
      this.cleartimer = setInterval(() => {
        if (this.time === 0) {
          clearInterval(this.cleartimer); //清除定时器
          this.Sendverificationcode = "发送验证码"; // 重新赋值
          this.time = 60; // 重新赋值
          this.count = false; // 不禁用按钮
          return;
        }
        this.time--;
        this.Sendverificationcode = `倒计时${this.time}`; // 按钮文字(倒计时60)
        this.count = true; // 禁用按钮
      }, 1000);
    },
    checkStrong(newname) {
      // newname是v-model实时输入的值
      let modes = 0;
      //正则表达式验证符合要求的 (1步,查看都输入了哪些字)
      if (newname.length < 1) return modes;
      if (/\d/.test(newname)) modes++; //匹配数字
      if (/[a-z]/.test(newname)) modes++; //小写
      if (/[A-Z]/.test(newname)) modes++; //大写
      if (/\W/.test(newname)) modes++; //特殊字符
      //逻辑处理,处理强度 (2步,根据输入的字,处理对应的强度)(比如 1 对应的是最弱的 2 对应的中等)
      switch (modes) {
        case 1:
          return 1;
          break;
        case 2:
          return 2;
          break;
        case 3:
        case 4:
          return newname.length < 4 ? 3 : 4; // 判断强度 (1是红色,2,3是黄色,4是绿色)
          break;
      }
      return modes;
    },
    async login() {
      if (this.pwdeenorm) {
        if (this.account && this.passwordOne && this.email && this.pwdee) {
          let regular = /\s/g;
          let newres =
            regular.test(this.account) ||
            regular.test(this.passwordOne) ||
            regular.test(this.email) ||
            regular.test(this.pwdee);
          if (newres) {
            return uni.showToast({
              title: "不能包含空格",
              duration: 2000,
              icon: "none",
            });
          }
          let res = await this.$http({
            url: "/verification",
            data: {
              name: this.account,
              password: this.passwordOne,
              email: this.email,
              value: this.pwdee,
            },
          });
          if (res.data.status === 0)
            // 验证码不正确就,禁止发送网络请求
            return (this.pwdeenorm = false), (this.securityfalse = true);
          // 成功跳转
          if (res.data.status === 1) {
            (this.account = ""),
              (this.passwordOne = ""),
              (this.email = ""),
              (this.pwdee = "");
            clearInterval(this.cleartimer);
            this.Sendverificationcode = "发送验证码";
            this.count = false;
            return uni.redirectTo({
              url: "/pages/login/index",
            });
          }
        } else {
          uni.showToast({
            title: "请检查,各项有没有误",
            duration: 2000,
            icon: "none",
          });
        }
      }
    },
  },
  watch: {
    //监听输入的值
    passwordOne(newname) {
      // (3步,根据返回的处理结果,进行颜色调配)
      this.msgText = this.checkStrong(newname); //逻辑处理的结果
      if (this.msgText > 1 || this.msgText == 1) {
        this.$refs.one.$el.style.backgroundColor = "red";
      } else {
        this.$refs.one.$el.style.backgroundColor = "#eee";
      }
      if (this.msgText > 2 || this.msgText == 2) {
        this.$refs.two.$el.style.backgroundColor = "orange";
      } else {
        this.$refs.two.$el.style.backgroundColor = "#eee";
      }
      if (this.msgText == 4) {
        this.$refs.three.$el.style.backgroundColor = "#00D1B2";
      } else {
        this.$refs.three.$el.style.backgroundColor = "#eee";
      }
    },
    //
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
  min-height: 100vh;
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
        width: 100%;
        border-bottom: 1px solid #adadad;
        outline: none;
        height: 90rpx;
        font-size: 30rpx;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          bottom: 0px;
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
      .actvie {
        border-bottom: 4rpx solid red;
      }
    }
    .register_warning {
      font-size: 30rpx;
      position: absolute;
      top: 90rpx;
      left: 0;
      color: red;
    }
  }
  .wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .input_span text {
    display: inline-block;
    width: 140rpx;
    height: 20rpx;
    background: #eee;
    line-height: 40rpx;
  }
  .one {
    border-top-left-radius: 10rpx;
    border-bottom-left-radius: 10rpx;
    border-right: 0 solid;
    margin-left: 40rpx;
    margin-right: 6rpx;
    background-color: #eee;
  }
  .two {
    border-left: 0 solid;
    border-right: 0 solid;
    margin-left: -10rpx;
    margin-right: 6rpx;
  }
  .three {
    border-top-right-radius: 10rpx;
    border-bottom-right-radius: 10rpx;
    border-left: 0 solid;
    margin-left: -10rpx;
  }
  .font text:nth-child(1) {
    color: red;
  }
  .font text:nth-child(2) {
    color: orange;
    margin: 0 120rpx;
  }
  .font text:nth-child(3) {
    color: #00d1b2;
  }
  .email {
    position: relative;
    .title {
      color: #adadad;
      position: absolute;
      left: 0;
      top: 0;
      font-size: 28rpx;
      transition: all 0.5s;
    }
    .titleTop {
      top: -40rpx;
      left: 20rpx;
    }
    input {
      border-bottom: 1px solid #adadad;
      float: left;
      width: 70%;
      position: relative;
    }
    button {
      width: 40%;
      height: 55rpx;
      line-height: 55rpx;
      position: relative;
      left: 340rpx;
      top: -60rpx;
    }
    .towtext {
      font-size: 30rpx;
      color: red;
      position: absolute;
      left: 0;
      top: 48rpx;
    }
  }
  .verificationcss {
    position: relative;
    font-size: 30rpx;
    margin-top: 40rpx;
    display: flex;
    input {
      border-bottom: 1px solid #adadad;
      margin-left: 20rpx;
      font-size: 30rpx;
      width: 45%;
    }
    view {
      font-size: 25rpx;
      color: red;
      height: 40rpx;
      line-height: 40rpx;
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

  .right {
    background-position: right;
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
</style>
