<template>
  <view>
    <common-Head class="fixed">
      <view slot="content">{{ information.name }}</view>
      <!-- 群聊天才显示头像 -->
      <view slot="unknown" v-if="information.code == 1" @tap="GroupDetails">
        <image :src="information.img" class="portrait" />
      </view>
    </common-Head>

    <!-- 主体  scroll-into-view  配合 :id="`lwh${item.id}`" 设置瞄点  要设置高度 , 否则无法滚动 -->
    <view class="ChatPage-wrap" :style="{ bottom: `${bottom_height}px` }">
      <scroll-view
        scroll-y
        :scroll-into-view="scrollToView"
        class="distance"
        scroll-with-animation="true"
        @scrolltoupper="Load_next_one"
      >
        <!-- 加载数据 -->
        <view class="loading">
          <image
            src="../../static/img/load.png"
            class="loading_img"
            :animation="loading"
            v-show="Hideloading"
          />
        </view>
        <view
          v-for="(item, index) in MessageData"
          :key="index"
          :id="`lwh${item.id}`"
        >
          <!-- 好友 -->

          <view class="ChatPage-left-news" v-if="item.formID !== user_ID">
            <view
              class="left-time"
              v-if="item.time !== '' && item.time != null"
              >{{ item.time | ChatTime }}</view
            >
            <view class="left-subject">
              <!-- 好友头像 -->
              <image :src="item.img" class="left-head-portrait" />
              <!-- 好友发送的图片 -->
              <image
                v-if="item.types == 1"
                :src="item.message"
                mode="widthFix"
                class="left-msg-img"
                @tap="Picture_preview(item.message)"
              />
              <!-- 好友音频 -->
              <view
                class="left-friend-audio"
                v-else-if="item.types == 2"
                :style="{ width: item.message.time * 4 + 'px' }"
                @tap="Playvoice(item.message.voice)"
              >
                <view class="list">
                  <text class="list-title"> {{ item.message.times }}</text>
                  <image src="/static/img/audio/yy.png" class="list-image" />
                </view>
              </view>
              <!-- 好友定位 -->
              <view
                v-else-if="item.types == 3"
                class="map-wrap"
                @tap="gonavigation(item.message)"
              >
                <view class="map-name">{{ item.message.name }}</view>
                <view class="map-address">{{ item.message.address }}</view>
              </view>
              <!-- 好友发送的文字 -->
              <view class="left-reply" v-else-if="item.types === '0'">{{
                item.message
              }}</view>
            </view>
          </view>
          <!-- 本人  -->
          <view class="ChatPage-right-news" v-if="item.formID === user_ID">
            <view
              class="right-time"
              v-if="item.time !== '' && item.time != null"
              >{{ item.time | ChatTime }}</view
            >
            <view class="right-subject">
              <!-- 本人头像 -->
              <image :src="item.img" class="right-head-portrait" />
              <!-- 本人发送的图片 -->
              <image
                :src="item.message"
                mode="widthFix"
                class="right-msg-img"
                v-if="item.types == 1"
                @tap="Picture_preview(item.message)"
              />
              <!-- 本人音频 -->
              <view
                class="right-friend-audio"
                v-else-if="item.types == 2"
                :style="{ width: item.message.times * 4 + 'px' }"
                @tap="Playvoice(item.message.voice)"
              >
                <view class="list">
                  <text class="list-title"> {{ item.message.times }}</text>
                  <image src="/static/img/audio/yy.png" class="list-image" />
                </view>
              </view>
              <!-- 本人定位 -->
              <view
                v-else-if="item.types == 3"
                class="map-wrap"
                @tap="gonavigation(item.message)"
              >
                <view class="map-name">{{ item.message.name }}</view>
                <view class="map-address">{{ item.message.address }}</view>
              </view>
              <!-- 本人发送的文字 -->
              <view class="right-reply" v-else-if="item.types == '0'">
                {{ item.message }}
              </view>
              <!-- 感叹号 -->
              <view class="exclamation" v-if="item.RemoveFriend == 0">
                <text>i</text>
              </view>
            </view>
          </view>
        </view>
        <view class="num"></view>
      </scroll-view>
      <!-- 键盘 -->
      <typewriting @change_tap="change_tap" @send_text="send_text" />
    </view>
  </view>
</template>

<script>
import myTime from "../../resource/js/Date";
import commonHead from "../../components/Common/CommonHead";
import typewriting from "../../components/Common/typewriting";

const innerAudioContext = uni.createInnerAudioContext();
export default {
  data() {
    return {
      MessageData: [], // 聊天内容
      Picture_data: [], // 图片预览数据
      bottom_height: "", // 动态获取键盘高度
      scrollToView: "", // 滚动到最底部
      Time: "2002 08-31", //  存储对比时间
      GroupTime: new Date(),
      loading: {}, // 加载动画
      information: {}, // 好友信息 code 0 好友聊天  1群聊
      user_ID: "", //用户 ID
      user_img: "", // 用户头像
      user_name: "", // 用户名
      Page: 1, // 条数
      PageSize: 10, // 1条10页数据
      once: true, // 进来一次,执行一次
      timer: null, // 定时器
      timer2: null, // 定时器
      Hideloading: false, // 隐藏
      noneData: true, // 没数据就不执行
      RemoveFriend: 1, // 0 表示删除了好友
    };
  },
  onLoad(e) {
    this.information = e;
    this.Getfriends(); // 获取本地信息
    this.ChatReception(); // 聊天消息接收
    if (+e.code) {
      this.GroupData();
      this.GroupChat();
    } else {
      this.InformationTable(); // 获取聊天内容
    }
  },
  // 进来一次,执行一次
  updated() {
    if (this.once && this.MessageData.length) {
      setTimeout(() => {
        this.scrollToView = "";
        let arr = this.MessageData.length - 1;
        this.scrollToView = "lwh" + this.MessageData[arr].id;
        this.once = false;
      }, 10);
    }
  },
  methods: {
    // 本地数据
    Getfriends() {
      let value = uni.getStorageSync("user");
      this.user_name = value.name;
      this.user_ID = value.id;
      this.user_img = value.img;
    },
    // 图片预览
    Picture_preview(e) {
      let index = 0;
      // 点击当前图片,然后显示当前点击的图片
      for (let i = 0; i < this.Picture_data.length; i++) {
        if (this.Picture_data[i] == e) {
          index = parseInt(i);
        }
      }
      uni.previewImage({
        urls: this.Picture_data,
        current: index, // 显示当前点击图片
        longPressActions: {
          itemList: ["发送给朋友", "保存图片", "收藏"],
        },
      });
    },
    // 键盘高度
    change_tap(e) {
      this.bottom_height = e;
      this.Scroll_to_bottom();
    },
    // 看见自己输入的东西
    send_text(e) {
      // 间隔时间
      let time = myTime.Interval_time(this.Time, new Date());
      time && (this.Time = time); // 存储上一次返回的时间,然后用来做对比
      let new_title = {
        id: Math.ceil(Math.random() * 1000),
        formID: this.user_ID,
        img: this.$user(this.user_img),
        message: e.Message,
        types: e.types,
        time,
        RemoveFriend: this.RemoveFriend,
      };
      if (e.types == 0 || e.types == 3)
        this.SocketChat({ message: e.Message, types: e.types, time }); // 文字或定位
      e.types == 1 && (this.Picture_data.push(e.Message), this.ImgServer(e)); // 图片预览,图片上传
      e.types == 2 && this.ImgServer(e); // 语音
      this.MessageData.push(new_title);
      this.Scroll_to_bottom();
    },
    // socket 聊天 0 好友聊天 1群聊
    SocketChat(Info) {
      let { code, id } = this.information; // 好友信息
      const state = code == 0 ? "Chat" : "GroupChat";
      code == 1 && (Info.name = this.user_name);
      Info.RemoveFriend = this.RemoveFriend;
      this.socket.emit(state, Info, this.user_ID, id);
    },
    // 1 对 1 好友聊天
    ChatReception() {
      this.socket.on("ReceiveChat", (msg, sender, number) => {
        // 判断是不是点击的那个好友
        if (sender === this.information.id && number == 0) {
          if (parseInt(msg.types) >= 2) {
            msg.message = JSON.parse(msg.message);
            this.Picture_data.push(msg.message); // 预览好友发的图片
          }
          // 间隔时间
          let time = myTime.Interval_time(this.Time, new Date());
          time && (this.Time = time); // 存储上一次返回的时间,然后用来做对比
          let new_title = {
            id: Math.ceil(Math.random() * 1000),
            formID: sender,
            img: this.information.img,
            message: msg.message,
            types: msg.types, // 0文字,1图片,2音频连接,3地图
            time,
          };
          this.MessageData.push(new_title);
          this.Scroll_to_bottom();
        }
      });
    },
    // socket 群聊
    GroupChat() {
      this.socket.on("GroupInfo", (Msg, User_ID, Group_ID, state) => {
        if (state) {
          Msg.types == 1 && this.Picture_data.push(Msg.message);
          let time = myTime.Interval_time(this.GroupTime, new Date());
          time && (this.GroupTime = time);
          let data = {
            id: Math.ceil(Math.random() * 1000),
            formID: User_ID,
            img: this.$user(User_ID) + ".png",
            message: Msg.message,
            types: Msg.types, // 0文字,1图片,2音频连接,3地图
            time,
          };
          this.MessageData.push(data);
          this.Scroll_to_bottom();
        }
      });
    },
    // 图片 语音  定位 上传到服务器
    ImgServer(e) {
      let url = new Date();
      let Time = url.getTime();
      let N = url.getFullYear();
      let Y = url.getMonth() + 1;
      url = `${N}-${Y}`;
      uni.uploadFile({
        url: `${this.Pictures}files/upload`,
        filePath: e.Message.voice || e.Message, // 音频或图片
        name: "file",
        formData: {
          url: `${url}`, // 创建文件夹
          name: this.user_ID + Time + Math.ceil(Math.random() * 10), // 文件名
        },
        success: (uploadFileRes) => {
          // 对路径进行转换
          let Message = JSON.parse(uploadFileRes.data);
          Message = this.Pictures + Message[0].path.replace(/\\/g, "/");
          e.types == 1 && (e.Message = Message);
          e.Message.voice && (e.Message.voice = Message);
          this.SocketChat({ message: e.Message, types: e.types });
        },
      });
    },
    // 播放语音
    Playvoice(e) {
      innerAudioContext.src = e;
      innerAudioContext.play();
      // innerAudioContext.onEnded(() => {});
    },
    // 点击进入导航
    gonavigation(e) {
      uni.openLocation({
        name: e.name,
        address: e.address,
        latitude: e.latitude,
        longitude: e.longitude,
      });
    },
    // 滚动到最底部
    Scroll_to_bottom() {
      if (this.MessageData.length) {
        this.scrollToView = "";
        let arr = this.MessageData.length - 1;
        this.$nextTick(() => {
          this.scrollToView = "lwh" + this.MessageData[arr].id;
        });
      }
    },
    // 聊天数据
    InformationTable() {
      this.$http({
        url: "Paging/Data",
        data: {
          Page: 0, // 条数
          PageSize: this.PageSize, // 10条
          user_ID: this.user_ID,
          Friends_ID: this.information.id,
        },
      }).then((res) => {
        let { data, LastTime, RemoveFriend } = res.data;
        this.RemoveFriend = RemoveFriend;
        console.log(LastTime)
        this.Time = LastTime && LastTime;
        // 获取聊天最后一条时间
        for (let i = data.length - 1; i >= 0; i--) {
          const item = data[i];
          item.img = this.$user(item.img);
          item.types == 1 && this.Picture_data.push(item.message);
          if (parseInt(item.types) >= 2) {
            item.message = JSON.parse(item.message);
          }

          this.MessageData.push(item);
        }
      });
    },
    // 群数据
    GroupData() {
      this.$http({
        url: "Get/Group/Messages",
        data: { Group_ID: this.information.id, UserID: this.user_ID },
      }).then((res) => {
        const length = res.data.data.length;
        if (length) {
          this.RemoveFriend = res.data.RemoveFriend;
          const { LastTime } = res.data.data[length - 1];
          this.GroupTime = LastTime;
          // this.Time = LastTime;
        }
        for (let i = 0; i < length; i++) {
          let item = res.data.data[i];
          item.types == 1 && this.Picture_data.push(item.message);
          if (parseInt(item.types) >= 2) {
            item.message = JSON.parse(item.message);
          }
          this.MessageData.push(item);
        }
      });
    },
    // 加载下一条
    Load_next_one() {
      if (this.noneData) {
        let i = 1;
        clearInterval(this.timer);
        clearTimeout(this.timer2);
        var animation = uni.createAnimation({
          duration: 300,
          timingFunction: "step-start",
        });
        this.Hideloading = true;
        this.timer = setInterval(() => {
          i++;
          animation.rotate(i * 30).step();
          this.loading = animation.export();
        }, 200);
        this.timer2 = setTimeout(() => {
          this.$http({
            url: "Paging/Data",
            data: {
              Page: this.Page++, // 条数
              PageSize: this.PageSize, // 10条
              user_ID: this.user_ID,
              Friends_ID: this.information.id,
            },
          }).then((res) => {
            let { data } = res.data;
            if (data.length > 0) {
              data.reverse(); // 返回的数据是从大到小,而我们想要的是从小到大
              for (let i = 0; i < data.length; i++) {
                // 加载下一条数据,图片头像
                data[i].img = this.$user(data[i].img);
                // 加载下一条数据,图片预览
                data[i].types == "1" && this.Picture_data.push(data[i].message);
                if (data[i].types == 2 || data[i].types == 3) {
                  data[i].message = JSON.parse(data[i].message);
                }
              }
              this.MessageData.unshift(...data);
            } else {
              this.noneData = false;
            }
            clearInterval(this.timer);
            this.loading = {};
            this.Hideloading = false;
          });
        }, 2000);
      }
    },
    // 群详情
    GroupDetails() {
      const { id, name, img } = this.information;
      uni.navigateTo({
        url: `/pages/Group/Group?id=${id}&name=${name}&img=${img}`,
      });
    },
  },
  components: {
    commonHead,
    typewriting,
  },
};
</script>

<style lang="scss">
.fixed {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background: #fff;
  z-index: 6;
}

.portrait {
  width: 68rpx;
  height: 68rpx;
  border-radius: 8rpx;
  vertical-align: middle;
}

.ChatPage-wrap {
  position: fixed;
  right: 0;
  left: 0;
  top: 110rpx;
  bottom: 103rpx;
  overflow: auto;
  padding-bottom: var(--status-bar-height);
  background: rgba(244, 244, 244, 0.6);

  .loading {
    text-align: center;

    .loading_img {
      width: 60rpx;
      height: 60rpx;
    }
  }

  .ChatPage-left-news {
    margin-top: 40rpx;

    .left-time {
      font-size: 24rpx;
      text-align: center;
      color: rgba(39, 40, 50, 0.3);
      padding-bottom: 40rpx;
    }

    .left-subject {
      display: flex;
      border-radius: 0 20rpx 20rpx 20rpx;
      font-size: 32rpx;
      position: relative;

      .left-head-portrait {
        width: 80rpx;
        height: 80rpx;
        border-radius: 10rpx;
        margin: 0 16rpx 0 32rpx;
      }

      .left-reply {
        background: rgb(255, 255, 255);
        border-radius: 20rpx;
        padding: 20rpx;
        max-width: 480rpx;
      }

      .left-msg-img {
        max-width: 400rpx;
        border-radius: 10rpx;
      }

      .left-friend-audio {
        min-width: 150rpx;
        max-width: 400rpx;
        background: rgba(255, 255, 255, 1);
        border-radius: 20rpx;
        line-height: 80rpx;
        .list {
          display: flex;
          align-items: center;
          padding-left: 16rpx;
          position: relative;
          .list-title {
            font-size: 32rpx;
            padding-left: 20rpx;
          }

          .list-image {
            width: 48rpx;
            height: 48rpx;
            padding-left: 20rpx;
          }
          // 播放音频
          .list-image-box {
            width: 48rpx;
            height: 48rpx;

            .box {
              position: absolute;
              top: -11rpx;
              right: -38rpx;
            }
            .wifi-symbol {
              width: 100rpx;
              height: 100rpx;
              box-sizing: border-box;
              overflow: hidden;
              transform: rotate(135deg);
            }
            .wifi-circle {
              border: 5rpx solid #000000;
              border-radius: 50%;
              position: absolute;
            }

            .first {
              // width: 10rpx;
              // height: 10rpx;
              background: #000000;
              top: 94rpx;
              left: 94rpx;
            }

            .second {
              width: 40rpx;
              height: 40rpx;
              top: 80rpx;
              left: 80rpx;
              animation: fadeInOut 1s infinite 0.2s;
            }

            .third {
              width: 59rpx;
              height: 59rpx;
              top: 70rpx;
              left: 70rpx;
              animation: fadeInOut 1s infinite 0.4s;
            }

            @keyframes fadeInOut {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
          }
        }
      }

      .map-wrap {
        background: #fff;
        width: 464rpx;
        border-radius: 0 20rpx 20rpx 20rpx;
        overflow: hidden;

        .map-name {
          font-size: 32rpx;
          color: #000;
          line-height: 44rpx;
          padding: 8rpx 24rpx 0 24rpx;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }

        .map-address {
          font-size: 24rpx;
          color: rgba(39, 40, 50, 0.4);
          padding: 0 24rpx 8rpx 24rpx;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      }
    }
  }

  .ChatPage-right-news {
    margin-top: 40rpx;
    .right-time {
      font-size: 24rpx;
      text-align: center;
      color: rgba(39, 40, 50, 0.3);
      padding-bottom: 40rpx;
    }
    .right-subject {
      display: flex;
      flex-direction: row-reverse;
      font-size: 32rpx;

      .right-head-portrait {
        width: 80rpx;
        height: 80rpx;
        border-radius: 10rpx;
        margin: 0 32rpx 0 16rpx;
      }

      .right-reply {
        background: rgba(28, 188, 246, 1);
        color: #fff;
        font-size: 32rpx;
        border-radius: 20rpx;
        padding: 20rpx;
        max-width: 480rpx;
        word-wrap: break-word;
        word-break: break-all;
      }

      .right-msg-img {
        max-width: 400rpx;
        border-radius: 10rpx;
      }

      .right-friend-audio {
        min-width: 150rpx;
        max-width: 400rpx;
        background: rgba(255, 255, 255, 1);
        border-radius: 20rpx;
        line-height: 80rpx;

        .list {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-right: 16rpx;
          position: relative;

          .list-title {
            padding-right: 10rpx;
            font-size: 32rpx;
          }
          .list-image {
            width: 48rpx;
            height: 48rpx;
            transform: rotate(180deg);
          }
          // 播放音频
          .list-image-box {
            width: 48rpx;
            height: 48rpx;
            .box {
              position: absolute;
              top: -11rpx;
              left: 0;
            }
            .wifi-symbol {
              width: 100rpx;
              height: 100rpx;
              box-sizing: border-box;
              overflow: hidden;
              transform: rotate(315deg);
            }
            .wifi-circle {
              border: 5rpx solid #000000;
              border-radius: 50%;
              position: absolute;
            }

            .first {
              // width: 10rpx;
              // height: 10rpx;
              background: #000000;
              top: 94rpx;
              left: 94rpx;
            }

            .second {
              width: 40rpx;
              height: 40rpx;
              top: 80rpx;
              left: 80rpx;
              animation: fadeInOut 1s infinite 0.2s;
            }

            .third {
              width: 59rpx;
              height: 59rpx;
              top: 70rpx;
              left: 70rpx;
              animation: fadeInOut 1s infinite 0.4s;
            }

            @keyframes fadeInOut {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
          }
        }
      }

      .map-wrap {
        background: #fff;
        width: 464rpx;
        border-radius: 20rpx 0 20rpx 20rpx;
        overflow: hidden;

        .map-name {
          font-size: 32rpx;
          color: #000;
          line-height: 44rpx;
          padding: 8rpx 24rpx 0 24rpx;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }

        .map-address {
          font-size: 24rpx;
          color: rgba(39, 40, 50, 0.4);
          padding: 0 24rpx 8rpx 24rpx;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      }
    }
    .exclamation {
      width: 40rpx;
      height: 40rpx;
      background-color: #ff0000;
      border-radius: 100rpx;
      position: relative;
      top: 20rpx;
      right: 10rpx;
      text {
        line-height: 40rpx;
        display: block;
        color: #fff;
        text-align: center;
        font-size: 32rpx;
      }
    }
  }
}

.distance {
  height: 100%;
}

.num {
  height: 50rpx;
}
</style>
