<template>
  <view>
    <view class="Group">
      <view class="Group-top" :animation="animationData">
        <image
          src="../../static/img/register/jtou.png"
          class="Group-return"
          @tap="Back"
        />
        <image src="../../static/img/details/more.png" class="Group-more" />
      </view>
      <image :src="GroupInfo.img" class="Group-bg" />
      <view class="wrap">
        <!-- 群简介 -->
        <view class="Group-introduce">
          <view class="Group-introduce-top">
            <view class="Group-introduce-name">{{ GroupName }}</view>
            <view class="Group-introduce-time">{{ GroupTime }}</view>
          </view>
          <view class="Group-introduce-detailed">{{ GroupNotice }} </view>
        </view>
        <!-- 群人数 -->
        <view class="Group-Number-wrap">
          <view class="Group-Number-top">
            <view class="Group-Members">群成员</view>
            <view class="Group-Membe-warp">
              <view class="Group-Member-Management">成员管理</view>
              <image
                src="../../static/img/register/jtou.png"
                class="Group-return"
              />
            </view>
          </view>
          <view class="Group-Number">
            <view
              class="Group-content"
              v-for="item in GroupMembers"
              :key="item.id"
            >
              <image class="Number-img" :src="item.img" />
              <view class="Number-name">{{ item.name }}</view>

              <text v-if="item.GroupLeader" class="GroupLeader"> 群主</text>
              <view
                class="delete-bg"
                v-if="HaveAuthority && !item.GroupLeader"
                @tap="Kicking(item.id)"
              >
                <view class="Number-delete"></view>
              </view>
            </view>
            <!-- 邀请 -->
            <view class="Group-invite" @tap="GroupInvite">
              <view class="invite-add"></view>
            </view>
          </view>
        </view>
        <!-- 群名称  -->
        <view
          class="Group-name-wrap"
          @tap="Add_friends_animation('群名称', GroupName)"
        >
          <view class="Group-title">群名称</view>
          <view class="Group-name">{{ GroupName }}</view>
          <image
            v-if="HaveAuthority"
            src="../../static/img/register/jtou.png"
            class="Group-return"
          />
        </view>
        <!-- 群头像 -->
        <view class="Group-head" @tap="upload">
          <view class="Group-head-name">群头像</view>
          <image-cropper
            :src="tempFilePath"
            @confirm="confirm"
            @cancel="cancel"
          ></image-cropper>
          <image :src="GroupInfo.img" />
          <image
            v-if="HaveAuthority"
            src="../../static/img/register/jtou.png"
            class="Group-return"
          />
        </view>
        <!-- 群公告 -->
        <view
          class="Group-name-wrap"
          @tap="Add_friends_animation('群公告', GroupNotice)"
        >
          <view class="Group-title">群公告</view>
          <view class="Group-name">{{ GroupNotice }}</view>
          <image
            v-if="HaveAuthority"
            src="../../static/img/register/jtou.png"
            class="Group-return"
          />
        </view>
        <!-- 我的本群昵称 -->
        <view class="Group-name-wrap">
          <!-- @tap="Add_friends_animation('我的本群昵称', ' KOKO')" -->
          <view class="Group-title">我的本群昵称</view>
          <view class="Group-name">KOKO</view>
          <image
            v-if="HaveAuthority"
            src="../../static/img/register/jtou.png"
            class="Group-return"
          />
        </view>
        <!-- 消息免打扰 -->
        <view class="Group-NO-News">
          <view class="NO-News">消息免打扰</view>
          <switch class="switch" color="rgba(255,228,49,1)" />
        </view>
        <!-- 退出 -->
        <view class="Group-quit" @tap="WithdrawGroup">{{
          HaveAuthority ? "解散群聊" : "退出该群"
        }}</view>
      </view>
      <!-- 弹出框 -->
      <view
        v-if="HaveAuthority"
        class="personal-popover"
        :animation="library"
        :style="{ bottom: -WholePage + 'px' }"
      >
        <view class="popover-top">
          <view class="popover-cancel" @tap="Add_friends_animation">取消</view>
          <view class="popover-create"> {{ ClickTitle }} </view>
          <view class="popover-confirm" @tap="Add_friends_animation('确定')"
            >确定</view
          >
        </view>
        <view class="content-block">
          <view class="information-block">
            <textarea v-model="ClickContent" />
          </view>
        </view>
      </view>
      <!-- 邀请好友-->
      <view class="Invitation" :style="{ top: InvitationTop }">
        <view class="User">
          <view class="User-wrap">
            <view class="User-top">邀请好友</view>
            <view class="User-btn">
              <view class="cancel" @tap="cancel">取消</view>
              <view class="confirm" @tap="confirm">邀请</view>
            </view>
          </view>
          <view class="User-list" :style="{ height: height + 'px' }">
            <view
              class="item"
              v-for="item in Friend"
              :key="item.id"
              @tap="ChangeChecked(item)"
            >
              <checkbox class="User-checkbox" :checked="item.checked" />
              <image :src="item.user_img" class="User-img" />
              <view class="User-name">{{ item.name }}</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 提示区 -->
      <view class="ap-toast" :class="{ 'ap-toast-hide': error }">
        您暂时还没有好友
      </view>
    </view>
  </view>
</template>

<script>
const body = document.body.clientHeight;
import ImageCropper from "../../components/ling-imgcropper/ling-imgcropper";
import Time from "../../resource/js/Date.js";

export default {
  components: {
    ImageCropper,
  },
  data() {
    return {
      user_ID: "", // 用户 ID
      user_name: "", // 用户名
      top: 0,
      animationData: {}, // 顶部动画
      library: {}, // 修改动画
      WholePage: 0, // 整个页面的高度
      ClickTitle: "", // 点击的标题
      ClickContent: "", //  内容
      isADD: false, // 动画条件
      tempFilePath: "", // 剪辑
      cropFilePath: "", // 剪辑的群头像
      GroupInfo: {}, // 群信息
      GroupTime: "", // 创建群的时间
      GroupNotice: "", // 公告
      GroupName: "", // 群名
      Modifyitem: "", // 修改项
      OldValue: "", // 旧值
      GroupMembers: [], // 群成员
      HaveAuthority: false, // 判断你是否拥有权限
      InvitationTop: body + "px",
      height: 0,
      Friend: [],
      error: true,
    };
  },
  onLoad(e) {
    let { id, name } = uni.getStorageSync("user");
    this.GroupInfo = e;
    this.$http({ url: "Have/Authority", data: { user_ID: id } }).then((res) => {
      if (res.data.status === 200) this.HaveAuthority = true;
    });
    this.user_ID = id;
    this.user_name = name;
    this.InviteGroupMembers();
    this.GetGroupDetails();
    this.GetGroupMembers();
  },
  mounted() {
    uni
      .createSelectorQuery()
      .in(this)
      .select(".Group")
      .boundingClientRect((data) => (this.WholePage = data.height))
      .exec();
  },

  methods: {
    cancelInvitation(e) {
      this.translateY = e;
      this.Invitation = !this.Invitation;
    },
    // 获取顶部距离
    getTop() {
      uni
        .createSelectorQuery()
        .in(this)
        .select(".wrap")
        .boundingClientRect((data) => {
          this.top = data.top;
        })
        .exec();
    },
    // 顶部动画
    Animation() {
      let animation = uni.createAnimation({
        duration: 300,
        timingFunction: "linear",
      });
      // 0 > 负166 透明  负167 > 负166 白色
      this.top > -166
        ? animation.backgroundColor("transparent").step()
        : animation.backgroundColor("white").step();
      this.animationData = animation.export();
    },
    // 修改动画
    Add_friends_animation(title, name) {
      if (!this.HaveAuthority) return;
      const NewContent = this.ClickContent;
      !this.OldValue && (this.OldValue = name);
      this.ClickTitle = title;
      this.ClickContent = name;
      this.isADD = !this.isADD;
      let animation = uni.createAnimation({
        duration: 300,
        timingFunction: "ease",
      });
      if (title === "群名称") {
        this.Modifyitem = "group_name";
      } else if (title === "群公告") {
        this.Modifyitem = "notice";
      } else if (title === "确定") {
        const NoSpaces = NewContent.replace(/\s/g, "");
        const satisfy = this.OldValue !== NoSpaces;
        satisfy && this.ModifyGroupNotice(this.Modifyitem, NoSpaces);
      }
      if (this.isADD) {
        animation.bottom(0).step();
      } else {
        animation.bottom(-this.WholePage).step();
        this.ClickTitle = "";
        this.ClickContent = "";
        this.OldValue = "";
      }
      this.library = animation.export();
    },
    // 上传图片
    confirm(e) {
      this.tempFilePath = "";
      this.cropFilePath = e.detail.tempFilePath;
      uni.uploadFile({
        url: ``, // http://192.168.0.105:3000/files/upload
        filePath: "",
        name: "file",
        fileType: "image",
        formData: {
          url: "user", // 创建文件夹
          name: "", // 文件名
        }, //传递参数
        fail(e) {
          console.log("this is errormes " + e.message);
        },
      });
    },
    // 取消裁剪
    cancel() {
      this.tempFilePath = "";
    },
    // 头像插件
    upload() {
      if (!this.HaveAuthority) return;
      uni.chooseImage({
        count: 9, //默认9
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          // 存储上传图片
          this.tempFilePath = res.tempFilePaths.shift();
        },
      });
    },
    Back() {
      uni.navigateBack({
        delta: 1,
      });
    },
    // 获取群详情
    GetGroupDetails() {
      this.$http({
        url: "Get/Group/List/Detail",
        data: { _id: this.GroupInfo.id },
      }).then((result) => {
        this.GroupTime = Time.check(result.data[0].time, "-");
        this.GroupNotice = result.data[0].notice;
        this.GroupName = result.data[0].group_name;
      });
    },
    // 修改群数据
    async ModifyGroupNotice(key, value) {
      const data = { _id: this.GroupInfo.id, [key]: value };
      // await 没有结果时,不会执行 await 下面的代码
      await this.$http({ url: "Modify/Group/Notice", data });
      key == "notice" ? (this.GroupNotice = value) : (this.GroupName = value);
    },
    // 获取群成员
    GetGroupMembers() {
      this.$http({
        url: "Get/Group/Members",
        data: { group_ID: this.GroupInfo.id, user_ID: this.user_ID },
      }).then((res) => {
        this.GroupMembers.push(...res.data);
      });
    },
    // 邀请群成员
    async InviteGroupMembers() {
      if (!this.Friend.length) {
        const res = await this.$http({
          url: "Invite/Group/Members",
          data: { group_ID: this.GroupInfo.id, user_ID: this.user_ID },
        });
        if (!res.data.length) return;
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].checked = false;
          this.Friend.push(res.data[i]);
        }
      }
    },
    // 拉起邀请页面
    GroupInvite() {
      if (!this.Friend.length) {
        this.error = false;
      } else {
        this.InvitationTop = 0;
        this.height = this.WholePage;
      }
      setTimeout(() => {
        this.error = true;
      }, 800);
    },
    // 取消邀请
    cancel() {
      this.InvitationTop = body + "px";
      const array = this.Friend;
      this.Friend = [];

      for (let i = 0; i < array.length; i++) {
        array[i].checked = false;
      }

      this.Friend.push(...array);
    },
    // 设置选中状态
    ChangeChecked(item) {
      item.checked ? (item.checked = false) : (item.checked = true);
    },
    // 发送邀请
    confirm() {
      this.InvitationTop = body + "px";
      for (let i = 0; i < this.Friend.length; i++) {
        let item = this.Friend[i];
        if (item.checked) {
          this.$http({
            url: "Send/Invitation",
            data: {
              user_ID: this.user_ID,
              Friends_ID: item.id,
              GroupID: this.GroupInfo.id,
              message: this.user_name + `: 邀请你加入${this.GroupName}群聊`,
            },
          });
          this.socket.emit("ReceiveMessages", item.id, "群");
        }
      }
    },
    // 踢人
    Kicking(UserID) {
      this.$http({
        url: "Kicking",
        data: { group_ID: this.GroupInfo.id, RemoveUserID: UserID },
      });
      for (let i = 0; i < this.GroupMembers.length; i++) {
        const item = this.GroupMembers[i];
        if (item.id === UserID) {
          this.GroupMembers.splice(i, 1);
        }
      }
    },
    // 退群 或 解散
    WithdrawGroup() {
      const dissolve = { GroupLeader: this.user_ID };
      const leaveGroup = { WithdrawUserID: this.user_ID };
      const value = this.HaveAuthority ? dissolve : leaveGroup;
      this.$http({
        url: "Withdraw/Group",
        data: { group_ID: this.GroupInfo.id, ...value },
      });
      uni.navigateTo({ url: "/pages/index/index" });
    },
  },
  // 滚动周期
  onPageScroll() {
    this.getTop();
    this.Animation();
  },
};
</script>
<style lang="scss" scoped>
.Group {
  position: relative;
  overflow: hidden;
}
.Invitation {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 6;
  transition: 0.5s;
}

.wrap {
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 400rpx;
}
.Group-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100rpx;
  position: relative;
  padding: 0 20rpx;
  z-index: 1;
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  box-sizing: border-box;
  .Group-return {
    transform: rotate(180deg);
    width: 50rpx;
    height: 50rpx;
  }
  .Group-more {
    width: 52rpx;
    height: 12rpx;
  }
}
.Group-bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
}
.Group-introduce {
  background: #ffffff;
  position: relative;
  z-index: 1;
  border-radius: 40rpx 40rpx 0 0;
  height: 240rpx;
  // border-bottom: 1px solid #eeeeee;
  .Group-introduce-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40rpx 20rpx 30rpx 20rpx;
    .Group-introduce-name {
      font-size: 48rpx;
    }
    .Group-introduce-time {
      color: #272832;
      font-size: 28rpx;
    }
  }
  .Group-introduce-detailed {
    padding: 0 20rpx;
    box-sizing: border-box;
    font-size: 30rpx;
    color: #272832;
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
.Group-Number-wrap {
  width: 100%;
  background: #ffffff;
  border-top: 1rpx solid #eeeeee;
  padding-bottom: 40rpx;
  color: #272832;
  border-bottom: 1rpx solid #efefef;
  .Group-Number-top {
    padding: 42rpx 20rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .Group-Members {
    font-size: 48rpx;
  }
  .Group-Membe-warp {
    display: flex;
    align-items: center;
    .Group-Member-Management {
      font-size: 28rpx;
      color: #272832;
    }
  }
  .Group-return {
    width: 28rpx;
    height: 28rpx;
  }
  .Group-Number {
    display: flex;
    flex-wrap: wrap;
    .Group-content {
      text-align: center;
      padding: 0 16rpx 10rpx 16rpx;
      position: relative;
      .Number-img {
        width: 110rpx;
        height: 110rpx;
        border-radius: 20rpx;
      }
      .Number-name {
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 30rpx;
      }
      .delete-bg {
        width: 40rpx;
        height: 40rpx;
        background: #ff5d5b;
        border-radius: 50%;
        position: absolute;
        top: -12rpx;
        right: 0;
        .Number-delete {
          background: #fff;
          font-size: 0;
          position: absolute;
          top: 20rpx;
          left: 10rpx;
          width: 20rpx;
          height: 5rpx;
          /* -webkit-transform: rotate(45deg); */
          transform: rotate(45deg);
            &:after {
            content: "/";
            display: block;
            width: 20rpx;
            height: 5rpx;
            background: #fff;
            /* -webkit-transform: rotate(-90deg); */
            transform: rotate(-90deg);
          }
        }
      }
    }
    .Group-invite {
      width: 110rpx;
      height: 110rpx;
      background: $uni-color-primary;
      border-radius: 20rpx;
      position: relative;
      margin-left: 20rpx;
      .invite-add {
        background: #272832;
        font-size: 0;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 40rpx;
        height: 5rpx;
        transform: translate(-50%, -50%);
          &:after {
          content: "/";
          display: block;
          width: 40rpx;
          height: 5rpx;
          background: #272832;
          /* -webkit-transform: rotate(-90deg); */
          transform: rotate(-90deg);
        }
      }
    }
    .GroupLeader {
      font-size: 32rpx;
      color: #ffe431;
    }
  }
}
.Group-name-wrap {
  width: 100%;
  height: 112rpx;
  line-height: 70rpx;
  color: rgba(39, 40, 50, 0.6);
  padding: 22rpx 20rpx;
  box-sizing: border-box;
  .Group-title {
    float: left;
    font-size: 40rpx;
    color: #272832;
    margin-right: 30rpx;
  }

  .Group-name {
    float: left;
    width: 400rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .Group-return {
    width: 28rpx;
    height: 28rpx;
    float: right;
    margin-top: 22rpx;
  }
}
.Group-NO-News {
  width: 100%;
  height: 112rpx;
  padding: 22rpx 20rpx;
  box-sizing: border-box;
  .NO-News {
    display: inline-block;
    vertical-align: middle;
  }

  .switch {
    float: right;
  }
}
.Group-quit {
  font-size: 32rpx;
  color: rgba(255, 93, 91, 1);
  text-align: center;
  height: 110rpx;
  line-height: 110rpx;
}
.personal-popover {
  width: 100%;
  height: 100%;
  background: #fff;
  position: fixed;
  bottom: 0;
  z-index: 2;
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
.Group-head {
  width: 100%;
  height: 112rpx;
  padding: 0 20rpx;
  line-height: 110rpx;
  box-sizing: border-box;
  .Group-head-name {
    float: left;
  }
  image {
    width: 110rpx;
    height: 110rpx;
    border-radius: 30rpx;
    margin-left: 30rpx;
  }
  .Group-return {
    width: 28rpx;
    height: 28rpx;
    float: right;
    margin-top: 44rpx;
  }
}
.User {
  background: white;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
  /* .User-wrap {
  } */
  .User-top {
    position: relative;
    font-size: 40rpx;
    color: #272832;
    text-align: center;
    border-bottom: 2rpx solid #e5e6ea;
    padding: 20rpx 0;
  }
  .User-list {
    padding-top: 20rpx;
    height: 370rpx;
    position: relative;
    z-index: 6;
    overflow-y: scroll;
  }
  .item {
    display: flex;
    align-items: center;
    padding: 20rpx 20rpx;
    .User-img {
      width: 80rpx;
      height: 80rpx;
      border-radius: 20rpx;
      margin-left: 20rpx;
      margin-right: 20rpx;
    }
    .User-name {
      font-size: 36rpx;
      color: #272832;
      overflow: hidden;
      width: 400rpx;
      text-overflow: ellipsis; /* 省略号  */
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  .User-btn {
    font-size: 32rpx;
    .cancel {
      top: 24rpx;
      left: 16rpx;
      position: absolute;
    }
    .confirm {
      top: 24rpx;
      right: 16rpx;
      position: absolute;
    }
  }
}
.ap-toast {
  position: absolute;
  bottom: 640rpx;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  padding: 20rpx 40rpx;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8rpx;
  font-size: 32rpx;
  color: #fff;
  opacity: 1;
  pointer-events: none;
  transition: 0.3s;
}
.ap-toast-hide {
  opacity: 0;
  -webkit-transform: translate(-50%, 12px);
  transform: translate(-50%, 12px);
}
</style>
