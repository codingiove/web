<template>
  <view>
    <!-- 头部 -->
    <view class="personal-top">
      <image
        src="/static/img/register/jtou.png"
        class="personal-arrow"
        @tap="GoHome"
      />
      <view class="personal-words"> 消息 </view>
      <view class="kong"> </view>
    </view>
    <!-- 主体 -->
    <view class="first">
      <view
        class="Friend-Request-wrap"
        v-for="(item, index) in FriendRequest"
        :key="item.id"
      >
        <view class="Friend-Request-list">
          <view class="list-reject" @tap="identical(index, 'Delete/Friend')"
            >拒绝</view
          >
          <view class="list-images">
            <image :src="item.img || $user(item.user_ID.user_img)" />
          </view>
          <view class="list-consent" @tap="identical(index, 'Agree/With/Buddy')"
            >同意</view
          >
        </view>
        <view class="news-wrap">
          <view class="news-name">{{ item.name }}</view>
          <view class="news-time">{{ item.time | Date_Time }}</view>
        </view>
        <view class="Leaving-Amessage"> 对方留言：{{ item.message }} </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      Id: "", //本人id
      FriendRequest: [],
      Fid: "", // 好友ID
    };
  },
  onLoad(e) {
    this.Id = e.id;
    this.HomePageData();
    this.GroupInvitation();
  },

  methods: {
    // 别人申请加我好友
    HomePageData() {
      this.$http({
        url: "Home/Page/Data",
        data: {
          user_ID: this.Id,
          state: "1", // 0已是好友 , 1别人添加我 , 2我添加别人, 3拒绝或删除好友
        },
      }).then((res) => {
        for (const item of res.data) {
          this.Fid = item.id;
          item.img = this.$user(item.img);
          // 传入每一项
          this.InformationTable(item.id, item);
        }
      });
    },
    // 留言
    InformationTable(Fid, itemData) {
      this.$http({
        url: "leave",
        data: {
          Friends_ID: Fid,
        },
      }).then((res) => {
        itemData.message = res.data.value[res.data.value.length - 1].message;
        this.FriendRequest.push(itemData);
      });
    },
    // 同意拒绝
    identical(index, url) {
      const { state, GroupID } = this.FriendRequest[index];
      if (state) {
        const state = url === "Delete/Friend" ? 2 : 0;
        this.$http({
          url: "Agree/Or/Reject",
          data: { group_ID: GroupID, Group_Member_ID: this.Id, state },
        });
      } else {
        this.$http({ url, data: { user_ID: this.Id, Friends_ID: this.Fid } });
      }
      this.FriendRequest.splice(index, 1);
      this.socket.emit(
        "ReceiveMessages",
        this.FriendRequest.length,
        "更新页面"
      );
    },
    // 群邀请
    GroupInvitation() {
      this.$http({
        url: "Receive/Invitation",
        data: {
          user_ID: this.Id,
        },
      }).then((res) => {
        this.FriendRequest.push(res.data);
      });
    },
    // 回首页
    GoHome() {
      uni.navigateTo({ url: `/pages/index/index` });
    },
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
.Friend-Request-wrap {
  padding-top: var(--status-bar-height);
  margin: 80rpx 20rpx;
  padding: 20rpx;
  background: #fff;
  box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.2);
  border-radius: 20rpx;

  .Friend-Request-list {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 20rpx;
    .list-reject,
    .list-consent {
      width: 150rpx;
      height: 70rpx;
      line-height: 70rpx;
      text-align: center;
      border-radius: 40rpx;
      color: #f75262;
      background: #ffe7e6;
    }
    .list-images {
      margin-top: -110rpx;
      background: blueviolet;
      border-radius: 100rpx;
      width: 128rpx;
      height: 128rpx;
      image {
        width: 128rpx;
        height: 128rpx;
        border-radius: 100rpx;
      }
    }
    .list-consent {
      color: #000;
      background: rgba(255, 228, 49, 1);
    }
  }
  .news-wrap {
    text-align: center;
    .news-name {
      color: 38rpx;
    }
    .news-time {
      font-size: 32rpx;
      color: rgb(190, 188, 188);
      padding-top: 5rpx;
    }
  }
  .Leaving-Amessage {
    background: #eff2f2;
    border-radius: 20rpx;
    padding: 10rpx;
    margin: 20rpx auto;
    box-sizing: border-box;
    font-size: 30rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    width: 652rpx;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
}
.first {
  padding-top: var(--status-bar-height);
}
.personal-top {
  display: flex;
  padding: 20rpx 20rpx;
  height: 110rpx;
  box-sizing: border-box;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  align-items: center;
  .personal-arrow {
    transform: rotate(180deg);
    width: 50rpx;
    height: 50rpx;
  }
  .personal-words {
    color: rgba(39, 40, 50, 1);
    font-size: 32rpx;
  }
  .kong {
    width: 50rpx;
  }
}
</style>
