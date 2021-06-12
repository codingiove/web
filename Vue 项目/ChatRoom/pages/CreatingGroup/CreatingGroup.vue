<template>
  <view>
    <common-head>
      <view slot="left" class="cancel" @tap="cancelindex">取消</view>
      <view slot="content" class="CreatingGroup">创建群聊</view>
    </common-head>
    <!-- 群logo -->
    <view class="Group-logo">
      <view class="modify">
        <image-cropper
          :src="tempFilePath"
          @confirm="confirm"
          @cancel="cancel"
        ></image-cropper>
        <!-- 剪辑的群头像 -->
        <image :src="cropFilePath" class="Group-logo-img" />
        <image src="../../static/img/CreateGroup/modify.png" @tap="upload"
      /></view>
    </view>
    <!-- 输入框 -->
    <view class="GroupName">
      <input type="text" placeholder="群名称群名称" v-model="GroupName" />
    </view>
    <!-- 好友 -->
    <view class="User">
      <view class="User-title">用户</view>
      <view class="User-list" v-for="item in FriendArr" :key="item.id">
        <checkbox
          class="User-checkbox"
          :checked="item.checked"
          @tap="ChangeChecked(item)"
        />
        <image :src="item.img" class="User-img" />
        <view class="User-name">{{ item.name }}</view>
      </view>
    </view>
    <!-- 建群 -->
    <view
      class="GroupBuilding"
      @tap="GroupBuilding"
      :class="{ allowClass: AllowComputed }"
      >创建({{ checked.length }})</view
    >
  </view>
</template>

<script>
import CommonHead from "../../components/Common/CommonHead";
import ImageCropper from "../../components/ling-imgcropper/ling-imgcropper";
export default {
  components: { CommonHead, ImageCropper },
  data() {
    return {
      tempFilePath: "", // 存储上传图片
      cropFilePath: "/static/img/CreateGroup/qun.png", // 裁剪后的图片
      FriendArr: [], // 好友数组
      GroupName: "", // 群名称
      User_Id: "", // 用户 ID
    };
  },
  onLoad() {
    let { id } = uni.getStorageSync("user");
    this.User_Id = id;
    this.Friends();
  },
  methods: {
    // 回首页
    cancelindex() {
      uni.navigateTo({
        url: "/pages/index/index",
      });
    },
    // 裁剪图片
    confirm(e) {
      this.tempFilePath = "";
      this.cropFilePath = e.detail.tempFilePath;
      uni.uploadFile({
        url: `${this.Pictures}files/upload`,
        filePath: this.cropFilePath, // 返回给后端的图片
        name: "file",
        fileType: "image",
        formData: {
          url: "Group", // 创建文件夹
          name: this.User_Id + Math.ceil(Math.random() * 10), // 文件名
        }, //传递参数
        fail(e) {
          console.log("this is errormes " + e.message);
        },
        success: (res) => {
          let result = JSON.parse(res.data);
          result = result[0].path.replace(/\\/g, "/");
          this.tempFilePath = result;
        },
      });
    },
    // 取消裁剪
    cancel() {
      this.tempFilePath = "";
    },
    // 上传头像
    upload() {
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
    // 选中好友
    ChangeChecked(item) {
      return item.checked ? (item.checked = false) : (item.checked = true);
    },
    // 创群
    GroupBuilding() {
      if (this.checked.length >= 1 && this.GroupName.length >= 1) {
        this.$http({
          url: "Create/A/Group",
          data: {
            user_ID: this.User_Id,
            group_name: this.GroupName,
            group_img: this.tempFilePath || "file/Group/Group.png",
            member_arr: this.checked,
          },
        }).then((res) => {
          uni.navigateTo({
            url: `/pages/index/index`,
          });
        });
      }
    },
    // 选择好友
    Friends() {
      this.$http({
        url: "Home/Page/Data",
        data: {
          user_ID: this.User_Id,
          state: "0",
        },
      }).then((res) => {
        for (const item of res.data) {
          item.checked = false;
          item.img = this.$user(item.img);
          this.FriendArr.push(item);
        }
      });
    },
  },
  computed: {
    // 返回 checkbox 为 选中状态
    checked() {
      return this.FriendArr.filter((item) => item.checked);
    },
    // 是否满足创群条件
    AllowComputed() {
      return this.checked.length >= 1 && this.GroupName.length >= 1
        ? false
        : true;
    },
  },
};
</script>
<style lang="scss" scoped>
.cancel {
  font-size: 32rpx;
}
.Group-logo {
  background: $uni-color-primary;
  box-shadow: 0 18rpx 20rpx 0 rgba(39, 40, 50, 0.1);
  border-radius: 20rpx;
  width: 196rpx;
  height: 196rpx;
  margin: 76rpx auto 0 auto;
  .modify {
    width: 196rpx;
    height: 196rpx;
    position: relative;
    image {
      width: 50rpx;
      height: 50rpx;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  image.Group-logo-img {
    width: 196rpx;
    height: 196rpx;
    border-radius: 20rpx;
  }
}
.GroupName {
  width: 686rpx;
  height: 92rpx;
  padding: 26rpx 24rpx 0 24rpx;
  box-sizing: border-box;
  background: #f3f4f6;
  border-radius: 50rpx;
  text-align: center;
  margin: 62rpx auto;
}
.User {
  margin-left: 32rpx;
  height: 580rpx;
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 15rpx;
  }
  /* 滚动槽 */
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.9);
    border-radius: 10rpx;
  }
  /* 滚动条滑块 */
  &::-webkit-scrollbar-thumb {
    border-radius: 50rpx;
    background: rgba(0, 0, 0, 0.4);
  }
  .User-title {
    font-size: 44rpx;
    color: #272832;
    margin-bottom: 20rpx;
  }

  .User-list {
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;
    .User-img {
      width: 80rpx;
      height: 80rpx;
      border-radius: 20rpx;
      margin-left: 32rpx;
      margin-right: 32rpx;
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
}
.GroupBuilding {
  width: 686rpx;
  background: $uni-color-primary;
  border-radius: 10rpx;
  text-align: center;
  line-height: 80rpx;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
}
.allowClass {
  background: #dad8d8;
}
</style>
