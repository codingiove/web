<template>
  <view class="submit">
    <view class="submit-chat">
      <view class="chat">
        <view class="bt-img" @tap="records">
          <image :src="change_image" class="changeimg" />
        </view>
        <textarea
          auto-height="true"
          class="chat-send btn"
          :class="{ change: whether_change }"
          v-model.trim="written_words"
          @focus="focus_close"
        ></textarea>
        <view
          class="record btn"
          :class="{ change: !whether_change }"
          @touchstart="Sendvoice"
          @touchend="Endvoice"
          @touchmove="moveVoice"
          >按住说话</view
        >

        <view class="bt-img" @tap="change_tap">
          <image src="/static/img/typewriting/expression.png" />
        </view>
        <view class="bt-img">
          <image
            src="/static/img/typewriting/add.png"
            :class="{ change: text_change }"
            @tap="add_changemsg"
          />
          <view
            class="chat-send-text"
            :class="{ change: !text_change }"
            @tap="send_text(written_words, '0')"
            >发送</view
          >
        </view>
      </view>
      <!-- 表情 -->
      <view class="face" :class="{ change: !change_face }">
        <emoji @Send_emoji="Send_emoji"></emoji>
      </view>
      <!-- 更多功能 -->
      <view class="More_features" :class="{ change: !add_change }">
        <view class="More_features_list" @tap="send_img('album')">
          <image src="../../static/img/More_features/tp.png" mode="" />
          <view>图片</view>
        </view>
        <view class="More_features_list" @tap="send_img('camera')">
          <image src="../../static/img/More_features/pz.png" mode="" />
          <view>拍照</view>
        </view>
        <view class="More_features_list" @tap="location">
          <image src="../../static/img/More_features/dw.png" mode="" />
          <view>定位</view>
        </view>
        <view class="More_features_list">
          <image src="../../static/img/More_features/sp.png" mode="" />
          <view>视频</view>
        </view>
        <view class="More_features_list">
          <image src="../../static/img/More_features/wj.png" mode="" />
          <view>文件</view>
        </view>
      </view>
      <!-- 语音时长 -->
      <view class="voice-bg" :class="{ change: vlenght }">
        <view class="voice-bg-len">
          <view class="voice-bg-item" :style="{ width: lenght / 0.6 + '%' }">{{
            `${lenght} "`
          }}</view>
        </view>
        <view class="voice-del" ref="abolish">上滑取消语音</view>
      </view>
    </view>
  </view>
</template>

<script>
import emoji from "./expression";
// 录音
const recorderManager = uni.getRecorderManager();
export default {
  data() {
    return {
      whether_change: false, // 按住说话隐藏样式
      change_image: "/static/img/typewriting/voice.png",
      change_face: false, // 表情隐藏样式
      written_words: "", // 输入框
      text_change: false, // 发送隐藏样式
      add_change: false, // 更多功能隐藏样式
      tiem: 0, // 语音时间
      lenght: 0, // 音频时长
      vlenght: true, // 上滑取消语音遮罩层
      pageY: 0, // 取消语音的位置
      query: "",
    };
  },
  onReady() {
    this.getHight();
  },
  methods: {
    // 发送语音
    records() {
      this.whether_change = !this.whether_change;
      this.add_change = false; // 关闭更多功能
      this.change_face = false; // 关闭表情
      if (this.whether_change) {
        this.change_image = "/static/img/typewriting/jp.png";
      } else {
        this.change_image = "/static/img/typewriting/voice.png";
      }
      this.getHight();
    },
    // 点击表情
    change_tap() {
      this.change_face = !this.change_face;
      this.add_change = false; // 关闭更多功能
      this.whether_change = false; // 关闭语音功能
      this.change_image = "/static/img/typewriting/voice.png";
      this.getHight();
    },
    // 文本框获取焦点隐藏其他选项
    focus_close() {
      this.add_change = false; // 关闭更多功能
      this.change_face = false; // 关闭表情
      this.getHight();
    },
    // 发送按钮
    send_text(Message, types) {
      let data = {
        Message,
        types,
      };
      this.$emit("send_text", data);
      this.written_words = "";
    },
    // 发送表情
    Send_emoji(item) {
      this.written_words += item;
    },
    // 更多功能
    add_changemsg() {
      this.add_change = !this.add_change;
      this.change_face = false; // 关闭其他选项
      this.whether_change = false; // 关闭语音功能
      this.change_image = "/static/img/typewriting/voice.png";
      this.getHight();
    },
    // 获取 DIV 高度
    getHight() {
      this.$nextTick(() => {
        this.query = uni
          .createSelectorQuery()
          .in(this)
          .select(".submit")
          .boundingClientRect((data) => this.$emit("change_tap", data.height))
          .exec();
      });
    },
    // 上传图片和拍照
    send_img(sourceType) {
      uni.chooseImage({
        count: 9,
        sizeType: ["original", "compressed"],
        sourceType: [sourceType],
        success: (result) => {
          for (const item of result.tempFilePaths) {
            this.send_text(item, 1);
          }
        },
      });
    },
    // 发送语音
    Sendvoice(e) {
      let i = 0;
      this.vlenght = false;
      this.pageY = e.changedTouches[0].pageY;
      this.tiem = setInterval(() => {
        this.lenght = i += 1;
        i > 60 ? (clearInterval(this.tiem), this.Endvoice()) : "";
      }, 900);
      recorderManager.start();
      this.getHight();
    },
    // 结束语音
    Endvoice() {
      clearInterval(this.tiem);
      recorderManager.stop();
      recorderManager.onStop((res) => {
        let data = {
          voice: res.tempFilePath,
          times: this.lenght,
        };
        if (this.lenght === 0) {
          this.vlenght = false;
          uni.showToast({
            title: "说话时间太短",
            duration: 1000,
            icon: "none",
          });
        } else {
          // 当遮罩层没隐藏才调用该方法
          !this.vlenght ? this.send_text(data, 2) : "";
        }
        this.lenght = 0;
        this.vlenght = true;
        this.getHight();
      });
    },
    // 取消发送语音
    moveVoice(e) {
      // 从点击 (发送语音的坐标) - (手指滚动的坐标) > 100
      if (this.pageY - e.changedTouches[0].pageY > 100) {
        this.vlenght = true;
      }
    },
    // 打开定位
    location() {
      uni.chooseLocation({
        success: (res) => {
          let data = {
            name: res.name,
            address: res.address,
            latitude: res.latitude,
            longitude: res.longitude,
          };
          this.send_text(data, 3);
        },
      });
    },
  },

  watch: {
    written_words(newval) {
      return newval ? (this.text_change = true) : (this.text_change = false);
    },
  },
  components: {
    emoji,
  },
};
</script>

<style lang="scss">
.submit {
  background: rgba(244, 244, 244, 0.96);
  border-top: 1rpx solid rgba(0, 0, 0, 0.1);
  width: 100%;
  position: fixed;
  bottom: 0;

  .submit-chat {
    .chat {
      width: 100%;
      display: flex;
      align-items: flex-end;
      box-sizing: border-box;
      padding: 10rpx 10rpx;

      image {
        width: 56rpx;
        height: 56rpx;
        margin: 0 10rpx;
        flex: auto;
      }

      .btn {
        flex: auto;
        background: #fff;
        border-radius: 10rpx;
        padding: 20rpx;
        max-height: 160rpx;
        margin: 0 10rpx;
      }

      .chat-send-text {
        width: 100rpx;
        margin-bottom: 4.5rpx;
        text-align: center;
        background: $uni-color-primary;
        height: 70rpx;
        line-height: 70rpx;
        color: white;
        border-radius: 24rpx;
      }

      .changeimg {
        font-size: 120rpx;
      }

      .record {
        text-align: center;
        color: rgba(39, 40, 50, 0.6);
        font-size: 32rpx;
      }
    }

    .face,
    .More_features {
      width: 100%;
      height: 460rpx;
      background: rgba(236, 237, 238, 1);
      transition: all 0.6s;
    }
  }

  .More_features {
    padding-bottom: env(safe-area-inset-bottom);
    padding: 20rpx;
    box-sizing: border-box;

    .More_features_list {
      text-align: center;
      width: 25%;
      padding-top: 32rpx;
      float: left;

      image {
        width: 72rpx;
        height: 72rpx;
        padding: 24rpx;
        background: rgba(255, 255, 255, 1);
        border-radius: 24rpx;
      }

      view {
        font-size: 24rpx;
        color: rgba(30, 40, 50, 1);
        line-height: 34rpx;
      }
    }
  }

  .voice-bg {
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.3);
    top: 0;
    bottom: 0;
    position: fixed;

    .voice-bg-len {
      height: 84rpx;
      width: 600rpx;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 42rpx;
      text-align: center;

      .voice-bg-item {
        line-height: 84rpx;
        background: $uni-color-primary;
        border-radius: 42rpx;
        min-width: 120rpx;
        display: inline-block;
        transition: all 0.5s;
      }
    }

    .voice-del {
      position: absolute;
      bottom: 140rpx;
      padding-bottom: env(safe-area-inset-bottom);
      width: 100%;
      text-align: center;
      font-size: 28rpx;
      color: #fff;
    }
  }

  .change {
    display: none;
  }
}
</style>
