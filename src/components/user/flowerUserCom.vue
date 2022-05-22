<template>
  <div class="user-box" :class="[lose, { 'active-box': isActived }]">
    <div class="content">
      <!-- 用户扔硬币时产生硬币的区域 -->
      <div class="coin-area"><slot name="coin-follow"></slot></div>

      <!-- 用户基本信息 -->
      <div class="user-info-box">
        <!-- 用户头像 -->
        <div class="user-avatar">
          <img :class="{ lose: !lose }" :src="userInfo.avatar" alt="" />

          <div
            class="contrast-button"
            v-show="
              roomInfo.status == 2 &&
              userInfo.liveStatus &&
              userInfo.username != roomInfo.activeUser.username &&
              loginUser.username == roomInfo.activeUser.username
            "
            @click="contrast(roomInfo.activeUser, userInfo)"
          >
            比牌
          </div>
        </div>
        <!-- 用户名 -->
        <div class="user-username" :class="{ lose: !lose }">
          {{ userInfo.username }}
        </div>
        <!-- 用户金币 -->
        <div class="user-coin" :class="{ lose: !lose }">
          <img src="@/assets/coin-pocket.png" class="user-coin-img" alt="" />
          <div class="user-coin-number">{{ userInfo.coin }}</div>
        </div>
      </div>

      <!-- 用户的牌 -->
      <div class="user-card-box" :class="{ lose: !lose }">
        <!-- 登录用户看牌 显示牌 -->
        <div
          v-if="
            (userInfo.cardStatus && loginUser.username === userInfo.username) ||
            (userInfo.showCardsIdList.indexOf(loginUser.username) != -1 &&
              loginUser.username != userInfo.username)
          "
          class="user-card"
        >
          <user-card :cardList="userInfo.card"></user-card>
        </div>

        <!-- 非登录用户显示 -->
        <div v-else>
          <div v-if="userInfo.cardStatus" class="see-status">
            <div>已看牌</div>
          </div>
          <div
            v-else
            class="nosee"
            :class="userInfo.liveStatus ? '' : 'lose'"
          ></div>
        </div>
        <!-- 计时器插槽 -->
        <slot name="countTime"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { getCookie } from "../../utils/cookieUtil";
import UserCard from "./userCard.vue";
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
        lose: false, //不存活
        isActived: false, //是否活跃
      },
    };
  },
  props: ["userInfo", "roomInfo", "showCardsIdList"],
  computed: {
    lose: function () {
      return this.userInfo.liveStatus;
    },
    isActived: function () {
      return (
        this.roomInfo.activeUser.id == this.userInfo.id &&
        this.roomInfo.status != 3 &&
        this.roomInfo.status != 4
      );
    },
  },
  methods: {
    init() {},

    contrast(contrastinger, contrasteder) {
      //将所有的组件的房间信息置为等待比牌的3
      this.$socket.emit("waitContrastResult", {
        roomId: this.roomInfo.roomId,
        contrastinger,
        contrasteder,
      });
      //先让玩家看到自己的牌
      this.$socket.emit("seeCard", {
        roomId: this.roomInfo.roomId,
        activeUserId: this.roomInfo.activeUser.id,
        isContrast: true,
      });
      setTimeout(() => {
        this.$socket.emit("contrastResult", {
          roomId: this.roomInfo.roomId,
          contrastinger,
          contrasteder,
        });
      }, 3000);
    },
  },
  components: { UserCard },
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: (360rem / @baseFont);
  height: (150rem / @baseFont);
  box-sizing: content-box;
  border-radius: (20rem / @baseFont);

  .content {
    width: (350rem / @baseFont);
    height: (140rem / @baseFont);
    border-radius: (20rem / @baseFont);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    background-color: black;
    // position: relative;
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
      flex-wrap: nowrap;
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
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        height: (35rem / @baseFont);
        font-size: (16rem / @baseFont);
        color: white;
        img {
          height: (35rem / @baseFont);
          width: (35rem / @baseFont);
        }
      }
    }
    .user-card-box {
      flex: 3;
      border-radius: (20rem / @baseFont);
      position: relative;
      //当前用户为活跃用户 计时器
      .active {
        width: 100%;
        height: (140rem / @baseFont);
        line-height: (140rem / @baseFont);
        border-radius: (35rem / @baseFont);
        color: #a82be2 !important;
        font-size: (40rem / @baseFont);
        font-weight: 900;
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
        flex-direction: row;
        flex-wrap: nowrap;
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
        width: 100%;
        height: (130rem / @baseFont);
        // text-align: center;
        color: red;
        display: flex;
        flex-direction: column-reverse;
        background-image: url("../../assets/seeCard.jpg");
        background-size: 100% 100%;
        border-radius: (35rem / @baseFont);
        font-size: (30rem / @baseFont);
        font-weight: bold;
        padding-left: (6rem / @baseFont);
      }
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
//当前活跃用户外圈高亮提示
.active-box {
  background: linear-gradient(
    135deg,
    rgb(1, 255, 234),
    rgb(255, 251, 14),
    rgb(0, 247, 255)
  );
  animation: color 3s linear infinite;
}
@keyframes color {
  to {
    filter: hue-rotate(360deg);
  }
}
</style>