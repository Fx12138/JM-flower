<template>
  <div class="user-box" :class="userInfo.liveStatus ? '' : 'lose'">
    <div class="coin-area"><slot name="coin-follow"></slot></div>

    <!-- 用户基本信息 -->
    <div class="user-info-box">
      <!-- 用户头像 -->
      <div class="user-avatar">
        <img :src="userInfo.avatar" alt="" />

        <div
          class="contrast-button"
          v-show="
            roomInfo.status == 2 &&
            userInfo.liveStatus &&
            userInfo.username != roomInfo.activeUser.username
          "
          @click="contrast(roomInfo.activeUser, userInfo)"
        >
          比牌
        </div>
      </div>
      <!-- 用户名 -->
      <div class="user-username">{{ userInfo.username }}</div>
      <!-- 用户金币 -->
      <div class="user-coin">
        <img src="@/assets/coin-pocket.png" class="user-coin-img" alt="" />
        <div class="user-coin-number">{{ userInfo.coin }}</div>
      </div>
    </div>

    <!-- 用户的牌 -->
    <div class="user-card-box">
      <!-- 登录用户看牌 显示牌 -->
      <div
        v-if="userInfo.cardStatus && loginUser.username === userInfo.username"
        class="user-card"
      >
        <div v-for="(card, index) in userInfo.card" :key="index">
          <img class="card" :src="card.path" alt="" />
        </div>
      </div>

      <!-- 非登录用户显示 -->
      <div v-else>
        <div class="nosee" :class="userInfo.liveStatus ? '' : 'lose'">
          <div v-show="userInfo.cardStatus" class="see-status">已看牌</div>
        </div>
      </div>
      <!-- 计时器插槽 -->
      <slot name="countTime"></slot>
    </div>
  </div>
</template>
<script>
import { getRoomById } from "../../network/room";
import { getCookie } from "../../utils/cookieUtil";
export default {
  data() {
    return {
      loginUser: {
        id: 0,
        avatar:
          "https://img1.baidu.com/it/u=3583591450,2292153595&fm=26&fmt=auto&gp=0.jpg",
        username: "等待玩家",
        card: [
          {
            color: "",
            number: null,
            name: "",
            order: null,
            power: null,
            path: null,
          },
          {
            color: "",
            number: null,
            name: "",
            order: null,
            power: null,
            path: null,
          },
          {
            color: "",
            number: null,
            name: "",
            order: null,
            power: null,
            path: null,
          },
        ],
        cardType: null,
        coin: 0,
        isDown: 0,
        cardStatus: 0, //是否看牌 0未看,1看了
        liveStatus: 0, //是否弃牌或输 0输,1活着
      },
    };
  },
  props: ["userInfo", "roomInfo"],
  methods: {
    init() {},

    contrast(contrastinger, contrasteder) {
      this.$socket.emit("contrastResult", {
        roomId: this.roomInfo.roomId,
        contrastinger,
        contrasteder,
      });
    },
  },
  components: {},
  created() {
    this.loginUser = JSON.parse(getCookie("userInfo"));
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
@baseFont: 20;
.user-box {
  width: (340rem / @baseFont);
  height: (130rem / @baseFont);
  display: flex;

  //扔硬币产生的区域
  .coin-area {
    position: relative;
    .coin-follow {
      position: absolute;
    }
  }

  .user-info-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    .user-avatar {
      width: 100%;
      height: (75rem / @baseFont);
      text-align: center;
      position: relative;
      img {
        width: (75rem / @baseFont);
        height: (75rem / @baseFont);
        border-radius: (75rem / @baseFont);
      }
      .contrast-button {
        width: (75rem / @baseFont);
        height: (75rem / @baseFont);
        line-height: (75rem / @baseFont);
        border-radius: (75rem / @baseFont);
        font-size: (20rem / @baseFont);
        background-color: antiquewhite;
        opacity: 0.7;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .user-username {
      width: 100%;
      // background-color: aliceblue;
      color: white;
      height: (20rem / @baseFont);
      line-height: (20rem / @baseFont);
      overflow: hidden;
      text-align: center;
      font-size: (20rem / @baseFont);
    }
    .user-coin {
      display: flex;
      justify-content: center;
      align-items: center;
      height: (35rem / @baseFont);
      font-size: (16rem / @baseFont);
      img {
        height: (35rem / @baseFont);
        width: (35rem / @baseFont);
      }
    }
  }
  .user-card-box {
    flex: 3;
    border-radius: (35rem / @baseFont);
    position: relative;
    //当前用户为活跃用户 倒计时
    .active {
      width: 100%;
      height: (130rem / @baseFont);
      line-height: (130rem / @baseFont);
      border-radius: (35rem / @baseFont);
      color: white !important;
      // background-color: skyblue;
      font-size: (30rem / @baseFont);
      // opacity: 0.3;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: (80rem / @baseFont);
      }
    }
    .user-card {
      width: 100%;
      height: (130rem / @baseFont);
      display: flex;
      .card {
        flex: 1;
        width: 100%;
        height: (130rem / @baseFont);
        border-radius: (15rem / @baseFont);
      }
    }
    //未看牌样式
    .nosee {
      width: 100%;
      height: (130rem / @baseFont);
      line-height: (130rem / @baseFont);
      text-align: center;
      background-image: url("../../assets/nosee.png");
      background-size: 100% 100%;
      border-radius: (35rem / @baseFont);
    }

    //已看牌样式
    .see-status {
      color: red;
      background-color: aqua;
      opacity: 0.7;
      border-radius: (35rem / @baseFont);
      font-size: (20rem / @baseFont);
      font-weight: bold;
    }
  }
}

// 存活状态为0
.lose {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
}
</style>