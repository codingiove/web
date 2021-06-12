<template>
  <view>
    <view class="mine_BackgroundPicture"></view>
    <view class="mine_warp">
      <view class="warp_info">
        <view class="InformationHead" @click="upload_photo">
          <img src="../../static/image/24.jpg" alt="" />
        </view>
        <view class="Informationtitle"> koko </view>
      </view>
    </view>
    <view class="sb">
      <view class="warp_Concern">
        <view class="beConcerni">
          <view class="Concern_bei">被关注</view>
          <view class="Concern_num">0</view>
        </view>
      </view>
      <view class="warp_Concern">
        <view class="beConcerni">
          <view class="Concern_bei">粉丝</view>
          <view class="Concern_num">0</view>
        </view>
      </view>
      <view class="warp_Concern">
        <view class="beConcerni">
          <view class="Concern_bei">粉丝</view>
          <view class="Concern_num">0</view>
        </view>
      </view>
    </view>
    <view class="Logout">
      <button @click="Tooltipshow = true">退出登录</button>
    </view>
    <view class="Tooltip" v-if="Tooltipshow">
      <view class="Tooltipbj">
        <view class="title">确定要退出登录吗?</view>
        <view class="hint_btn">
          <view class="btn_cancel" @click="Tooltipshow = false">取消</view>
          <view class="btn_confirm" @click="Logout">确定</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      Tooltipshow: false,
    };
  },
  methods: {
    Logout() {
      this.Tooltipshow = false;
      uni.navigateTo({
         url: '/pages/login/index'
      });
    },
    upload_photo() {
      console.log("1");
    },
  },
};
</script>
<style scoped lang="scss">
.mine_BackgroundPicture {
  background: url("../../static/image/24.jpg");
  -webkit-filter: blur(20px);
  filter: blur(8px);
  width: 100%;
  height: 270px;
  background-size: cover;
  background-position: 55%, 55%;
}
.mine_warp {
  position: absolute;
  color: white;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  .warp_info {
    display: flex;
    flex-direction: column;
    .InformationHead {
      display: flex;
      img {
        margin: 0 auto;
        width: 50%;
        border-radius: 60px;
      }
    }

    .Informationtitle {
      text-align: center;
      font-weight: bold;
      color: #fff;
      margin-top: 10px;
    }
  }
}
.sb {
  position: relative;
  top: -81px;
  color: white;
  text-align: center;
  .warp_Concern {
    display: inline-block;
    width: 100px;
    .beConcerni {
      .Concern_bei {
        font-size: 17px;
      }

      .Concern_num {
        font-size: 14px;
        color: #fff;
      }
    }
  }
}
.Logout {
  padding: 0 20px;
  button {
    background-color: #f07373;
    color: white;
  }
}

.Tooltip {
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  .Tooltipbj {
    position: fixed;
    z-index: 99;
    width: 80%;
    max-width: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
    .hint {
      margin-top: 20px;
      font-size: 20px;
      font-weight: 500;
    }
    .title {
      padding: 20px;
      color: #999;
    }

    .hint_btn {
      display: flex;
      border-top: 1px solid #f1f1f1;
      line-height: 60px;
      .btn_cancel {
        flex: 1;
        border-right: 1px solid #f1f1f1;
      }

      .btn_confirm {
        flex: 1;
        color: #f07373;
      }
    }
  }
}
</style>
