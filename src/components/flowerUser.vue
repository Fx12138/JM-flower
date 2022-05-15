<template>
  <div class="user-box">
    <div class="info-box">
      <div>
        <img class="head-photo" :src="user.avatar" alt="" />
      </div>
      <div class="user-name">{{ user.username }}</div>
      <img class="coin-img" src="@/assets/coin-pocket.png" alt="" />
      <span class="coin-number">9u09</span>
    </div>
    <div class="card">
      <div
        v-if="user.cardStatus && userInfo.username == user.username"
        class="user-card"
      >
        <div v-for="(card, index) in user.card" :key="index">
          <img class="card" :src="card.path" alt="" />
        </div>
      </div>
      <div v-else>
        <div class="nosee" :class="user.liveStatus ? '' : 'lose'">
          <div v-if="user.cardStatus" class="see-status">已看牌</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCookie, setCookie, delCookie } from "../utils/cookieUtil";
export default {
  data() {
    return {
      userInfo: {
        username: null,
      },
    };
  },
  props: {
    user: {
      name: {
        type: String,
        default: "等待玩家",
      },
      avatar: {
        type: String,
        default:
          "https://img1.baidu.com/it/u=3583591450,2292153595&fm=26&fmt=auto&gp=0.jpg",
      },
      card: [],
    },
  },
  methods: {
    init() {
      this.userInfo = JSON.parse(getCookie("userInfo"));
    },
  },
  components: {},
  created() {},
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
@import "../assets/css/common.css";
@baseFont: 50;
.user-box {
  width: (280rem / @baseFont);
  height: (170rem / @baseFont);
  display: flex;
  flex-wrap: nowrap;
  background-color: aquamarine;
  .info-box {
    width: 30%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;

    .head-photo {
      border-radius: 50%;
      width: (55rem / @baseFont);
      height: (55rem / @baseFont);
    }
    .user-name {
      width: (70rem / @baseFont);
      font-size: (10rem / @baseFont);
      display: flex;
      justify-content: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .coin-img {
      width: (24rem / @baseFont);
      height: (24rem / @baseFont);
    }
    .coin-number {
      height: (24rem / @baseFont);
      line-height: (24rem / @baseFont);
      font-size: (10rem / @baseFont);
      display: flex;
      justify-content: center;
    }
  }
  .card {
    width: 70%;
    height: (170rem / @baseFont);
    line-height: (170rem / @baseFont);
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: black;
  }

  .card-img {
    width: 100%;
    height: 70%;
    border-radius: (5rem / @baseFont);
  }
}
</style>