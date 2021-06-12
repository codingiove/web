<template>
  <view class="atuo">
    <!-- 头部 -->
    <common-Head>
      <view slot="content">详情</view>
    </common-Head>
    <!-- 信息 -->
    <view class="personal-information-wrap">
      <view class="information-list">
        <view class="information-head-portrait">头像</view>
        <!-- 自己,可以编辑图片 -->
        <view v-if="User_Id === Fid">
          <image-cropper
            :src="tempFilePath"
            @confirm="confirm"
            @cancel="cancel"
          ></image-cropper>
          <image :src="cropFilePath" class="meslist_img" @tap="upload"></image>
          <image class="information-more" src="/static/img/register/jtou.png" />
        </view>

        <!-- 好友 -->
        <view v-else>
          <image :src="user.user_img" class="meslist_img"></image>
        </view>
      </view>

      <view class="information-list" v-for="item in list_Data" :key="item.id">
        <view class="information-head-portrait">{{ item.label }}</view>
        <!-- 性别选择器 -->
        <picker
          v-if="item.label === '性别' && User_Id === Fid"
          @change="bindPickerChange"
          :value="index"
          :range="array"
        >
          <view class="information-head-title"> {{ array[index] }}</view>
        </picker>
        <!-- 日期选择器 不加if判断所有内容都可以调用日期选择器-->
        <picker
          v-else-if="item.label === '生日' && User_Id === Fid"
          mode="date"
          :value="date"
          :start="startDate"
          :end="endDate"
          @change="bindDateChange"
        >
          <view class="information-head-title">{{ date }}</view>
        </picker>
        <view
          class="information-head-title"
          v-else
          @tap="Add_friends_animation(item)"
          >{{ item.content }}</view
        >
        <image
          class="information-more"
          src="/static/img/register/jtou.png"
          v-if="item.id !== 1 && User_Id === Fid"
        />
      </view>
      <!-- 退出登录 -->
      <view class="personal-Exit-editing" v-if="User_Id === Fid" @tap="Logout">
        退出登录
      </view>
      <!-- 删除好友 -->
      <view class="personal-Exit-editing" v-else @tap="CutOut"> 删除好友 </view>
      <!-- 弹出框 -->
      <view
        class="personal-popover"
        :animation="library"
        :style="{ bottom: -height + 'px' }"
      >
        <view class="popover-top">
          <view class="popover-cancel" @tap="Add_friends_animation">取消</view>
          <view class="popover-create">{{ Formtitle }}</view>
          <view class="popover-confirm" @tap="modify">确定</view>
        </view>
        <view class="content-block">
          <view class="information-block">
            <textarea :value="FormValue" @blur="ModifyContent" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import ImageCropper from "../../components/ling-imgcropper/ling-imgcropper";
import commonHead from "../../components/Common/CommonHead";
import myTime from "../../resource/js/Date";
export default {
  components: { ImageCropper, commonHead },
  data() {
    const currentDate = this.getDate({
      format: true,
    });
    return {
      date: currentDate,
      array: ["男", "女"],
      index: 0,
      list: [
        {
          id: 0,
          label: "签名",
          content: "",
          rule: "referral",
        },
        {
          id: 1,
          label: "注册",
          content: "1988-01-26",
        },
        {
          id: 2,
          label: "昵称",
          content: "无",
          rule: "name",
        },
        {
          id: 3,
          label: "性别",
          content: "男",
          rule: "sex",
        },
        {
          id: 4,
          label: "生日",
          content: "0000-00-00",
          rule: "birthday",
        },
        {
          id: 5,
          label: "电话",
          content: "无",
          rule: "phone",
        },
        {
          id: 6,
          label: "邮箱",
          content: "无",
          rule: "email",
        },
        {
          id: 7,
          label: "密码",
          content: "无",
          rule: "psw",
        },
      ],
      tempFilePath: "", // 存储上传图片
      // 默认图片
      cropFilePath: "", // 本人头像
      headimg: "",
      library: {}, // 动画
      isADD: false, // 控制动画显示隐藏
      height: "", // 动态高度
      FormValue: "", //  动态获取 content 的值
      Formtitle: "", // 动态获取 title 的值
      PasswordBox: false, // 控制密码框的显示隐藏
      User_Id: "", // 用户 ID
      Fid: "", // 好友 ID
      name: "", // 用户名
      user: {}, // 用户信息
      token: "",
      FormValueModel: "", // 拿到要修改的值
      referral: "这个人很懒,什么都没留下~", // 签名
      rule: "", // 动态修改内容
      oldData: "", // 旧值
      User_PSW: "", // 新密码
    };
  },
  onLoad(e) {
    this.Fid = e.id;
  },
  onReady() {
    this.GetHeight();
    this.getStorage();
    this.Get_User_Information();
  },

  methods: {
    // 性别选择器
    bindPickerChange: function (e) {
      this.index = e.target.value;
      // 因为性别选择器没有调用 Add_friends_animation,所以  switch (this.rule){} 判断为  undefined
      this.rule = "sex";
      this.modify();
    },
    // 日期选择器
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    },
    bindDateChange: function (e) {
      this.date = e.target.value;
      // 日期选择器没有调用 Add_friends_animation,所以  switch (this.rule){} 判断为  undefined
      this.rule = "birthday";
      this.modify();
    },
    // 头像插件
    upload() {
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 从相册选择
        success: (res) => {
          // 存储上传图片
          this.tempFilePath = res.tempFilePaths.shift();
        },
      });
    },
    confirm(e) {
      this.tempFilePath = "";
      this.cropFilePath = e.detail.tempFilePath;
      this.headimg = e.detail.tempFilePath;
      uni.uploadFile({
        url: `${this.Pictures}files/upload`,
        filePath: this.headimg,
        name: "file",
        fileType: "image",
        formData: {
          url: "user", // 创建文件夹
          name: this.User_Id, // 文件名
        }, //传递参数
        success: (uploadFileRes) => {
          let backstr = JSON.parse(uploadFileRes.data);

          this.$http({
            url: "User/Information/Modify",
            data: {
              id: this.User_Id,
              psw: this.user.psw,
              // rule 修改项
              rule: { user_img: backstr[0].filename },
            },
          });
          // 修改的头像
          try {
            uni.removeStorage({ key: "user" });
            uni.setStorageSync("user", {
              id: this.User_Id,
              img: backstr[0].filename,
              name: this.name,
              token: this.token,
            });
          } catch (error) {
            console.log("修改头像失败");
          }

          //自定义操作
        },
        complete() {},
        fail(e) {
          console.log("this is errormes " + e.message);
        },
      });
    },
    // 取消裁剪
    cancel() {
      this.tempFilePath = "";
    },
    // 动画
    Add_friends_animation(value) {
      // 本人
      if (this.User_Id == this.Fid) {
        // 动态修改内容
        this.rule = value && value.rule;
        this.isADD = !this.isADD;
        // 传了值,就执行对应的赋值操作,解决取消隐藏对话框问题
        if (value) {
          this.FormValue = value.content;
          this.Formtitle = value.label;
        }
        // 如果是注册就不进行修改
        if (value && value.label === "注册") return;
        // 只有点击修改密码时才显示密码框
        value && value.label === "密码"
          ? (this.PasswordBox = true)
          : (this.PasswordBox = false);
        var animation = uni.createAnimation({
          duration: 300,
          timingFunction: "ease",
        });
        this.isADD
          ? animation.bottom(0).step()
          : animation.bottom(-this.height).step();
        this.library = animation.export();
      }
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
    // 获取本地信息
    getStorage() {
      let value = uni.getStorageSync("user");
      if (value) {
        this.User_Id = value.id;
        this.name = value.name;
        this.token = value.token;
        this.cropFilePath = this.$user(value.img);
      } else {
        uni.navigateTo({
          url: "/pages/Signin/Signin",
        });
      }
    },
    // 获取用户信息
    Get_User_Information() {
      this.$http({
        url: "User/Details",
        data: {
          _id: this.Fid,
        },
      }).then((res) => {
        // 头像
        res.data.user_img = this.$user(res.data.user_img);
        // 签名
        res.data.referral && (this.referral = res.data.referral);
        this.user = res.data;
      });
    },
    // 点击确认修改内容
    modify() {
      // 两个值一样就不发送网络请求
      this.oldData.length <= 0 ? (this.oldData = this.FormValue) : this.oldData;
      // 我没有输入直接点确认那就是(空),判断条件会成立
      // 空代表用户没有做修改,所以不发送请求
      this.FormValueModel.length <= 0
        ? (this.FormValueModel = this.FormValue)
        : this.FormValueModel;
      // 动态传入修改项
      let Item = this.ModificationItem();
      if (Item === "") return;
      // 如果是生日或性别就让他执行
      if (Item.sex || Item.birthday) {
        this.oldData = true;
        this.FormValueModel = false;
      }
      if (this.oldData !== this.FormValueModel) {
        this.$http({
          url: "User/Information/Modify",
          data: {
            id: this.User_Id,
            psw: this.user.psw,
            // rule 修改项
            rule: Item,
          },
        }).then((res) => {
          if (res.data.code === 0) {
            uni.showToast({
              title: "邮箱已存在",
              duration: 2000,
              icon: "none",
            });
          }
          // 没加密的密码
          this.User_PSW = res.data.rule.User_PSW;
          //  不是这个两个调用这个方法
          if (!Item.sex && !Item.birthday) {
            this.Get_User_Information();
            this.Add_friends_animation();
          }
        });
      } else {
        this.Add_friends_animation();
      }
    },
    // 拿到修改的内容
    ModifyContent(e) {
      this.FormValueModel = e.detail.value.trim();
    },
    // 动态传入修改项
    ModificationItem() {
      const Array = ["name", "psw", "email", "phone", "referral"];
      // 判断用户是否修改了值
      let size = this.FormValueModel;
      let sex = this.array[this.index];
      let birthday = this.date;

      let result = Array.map((item) => {
        if (this.rule === item) {
          // [item] 是变量
          return { [item]: size };
        }
      }).filter((item) => item);

      if (this.rule === "sex") {
        return { sex };
      } else if (this.rule === "birthday") {
        return { birthday: birthday };
      } else if (this.rule === "phone") {
        if (isNaN(size)) {
          uni.showToast({ title: "请输入数字", duration: 2000, icon: "none" });
          return "";
        } else {
          return { phone: size };
        }
      }
      return result[0];
    },
    // 删除好友
    CutOut() {
      uni.showModal({
        content: "确认删除该好友吗",
        success: (res) => {
          if (res.confirm) {
            this.$http({
              url: "Delete/Friend",
              data: { user_ID: this.User_Id, Friends_ID: this.Fid },
            });
            uni.navigateTo({ url: "/pages/index/index" });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
    // 退出登录
    Logout() {
      uni.removeStorage({ key: "user" });
      uni.navigateTo({ url: "/pages/Signin/Signin" });
      window.location.reload();
    },
  },
  computed: {
    // 日期选择器
    startDate() {
      return this.getDate("start");
    },
    endDate() {
      return this.getDate("end");
    },
    list_Data() {
      return this.list.filter((item) => {
        switch (item.id) {
          case 0:
            item.content = this.referral;
            break;
          case 1:
            item.content = myTime.check(this.user.time, "-");
            break;
          case 2:
            item.content = this.user.name;
            break;
          case 3:
            this.index = this.user.sex === "男" ? 0 : 1;
            break;
          case 4:
            const result = myTime.check(this.user.birthday, "-") || "0000-0-0";
            this.date = result;
            break;
          case 5:
            item.content = this.user.phone || "空";
            break;
          case 6:
            item.content = this.user.email;
            break;
          case 7:
            item.content = this.User_PSW || "********";
            break;
        }

        return item;
      });
    },
  },
};
</script>

<style lang="scss">
.atuo {
  overflow-y: hidden;
}
.personal-information-wrap {
  height: 1120rpx;

  .information-list {
    width: 100%;
    height: 124rpx;
    display: flex;
    align-items: center;
    .information-head-portrait {
      font-size: 32rpx;
      color: rgba(39, 40, 50, 1);
      padding: 0 32rpx;
      font-weight: 600;
    }

    image {
      width: 104rpx;
      height: 104rpx;
      border-radius: 20rpx;
    }
    .information-head-title {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      width: 500rpx;
      color: rgba(39, 40, 50, 0.6);
    }

    .information-more {
      width: 28rpx;
      height: 28rpx;
      position: absolute;
      right: 26rpx;
    }
    &:first-of-type {
      margin-top: 42rpx;
    }
  }
}
.personal-Exit-editing {
  width: 684rpx;
  color: rgba(255, 93, 91, 1);
  font-size: 32rpx;
  text-align: center;
  line-height: 80rpx;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
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
