<template>
  <div class="operate-box">
    <div class="coin-box">
      <div
        class="money-coin"
        @click="follow(1)"
        :class="{
          unClickable: roomInfo.bottomCoin > 1 || loginUser.cardStatus,
        }"
      >
        <img src="@/assets/images/coin_1.jpg" alt="" />
      </div>

      <div
        class="money-coin"
        @click="follow(2)"
        :class="{
          unClickable:
            roomInfo.bottomCoin > 2 ||
            (loginUser.cardStatus && roomInfo.bottomCoin > 1),
        }"
      >
        <img src="@/assets/images/coin_2.jpg" alt="" />
      </div>

      <div
        class="money-coin"
        @click="follow(5)"
        :class="{
          unClickable:
            roomInfo.bottomCoin > 5 ||
            (loginUser.cardStatus && roomInfo.bottomCoin > 2.5),
        }"
      >
        <img src="@/assets/images/coin_5.jpg" alt="" />
      </div>

      <div
        class="money-coin"
        @click="follow(10)"
        :class="{
          unClickable:
            roomInfo.bottomCoin > 10 ||
            (loginUser.cardStatus && roomInfo.bottomCoin > 5),
        }"
      >
        <img src="@/assets/images/coin_10.jpg" alt="" />
      </div>
      <div class="money-coin" @click="follow(20)">
        <img src="@/assets/images/coin_20.jpg" alt="" />
      </div>
    </div>
    <div class="operate-button-box">
      <button @click="follow()">跟注</button>
      <button @click="seeCard">看牌</button>
      <button @click="chooseOne">比牌</button>
      <button @click="loseCard">弃牌</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["roomInfo", "loginUser"],
  methods: {
    init() {},
    //跟注
    follow(coinNum) {
      this.$socket.emit("follow", {
        roomId: this.roomInfo.roomId,
        coinNum,
      });
    },
    //看牌
    seeCard() {
      this.$socket.emit("seeCard", {
        roomId: this.roomInfo.roomId,
      });
    },
    //选择一个进行比牌
    chooseOne() {
      this.roomInfo.status = 2;
      //这里应该把this.roomInfo.status emit到父组件,让父组件更改房间状态,从而控制比牌的显隐
      this.$socket.emit("chooseStatus", { roomId: this.roomInfo.roomId });
    },
    //弃牌
    loseCard() {
      //用户弃牌
      this.$socket.emit("loseCard", {
        roomId: this.roomInfo.roomId,
      });
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
@baseFont: 20;
.operate-box {
  display: flex;
  justify-content: center;
  align-items: center;
  .coin-box {
    height: (60rem / @baseFont);

    display: flex;
    justify-content: center;
    align-items: center;
    .money-coin {
      width: (50rem / @baseFont);
      height: (50rem / @baseFont);
      position: relative;
      margin-left: (30rem / @baseFont);

      img {
        width: (50rem / @baseFont);
        height: (50rem / @baseFont);
      }

      .unclick {
        // position: absolute;
        // top: 0;
        // left: 0;
        // width: (60rem / @baseFont);
        // height: (60rem / @baseFont);
        // background-color: red;
        // background-image: url("../../assets/unClickable.png");
        // background-repeat: no-repeat;
        // background-size: 100% 100%;
      }
    }

    .unClickable {
      pointer-events: none; // 禁止鼠标点击事件
      filter: grayscale(100%);
    }
  }
  .operate-button-box {
    height: (60rem / @baseFont);
    margin-left: (40rem / @baseFont);
    display: flex;
    justify-items: center;
    align-items: center;
    button {
      min-width: (70rem / @baseFont);
      min-height: (40rem / @baseFont);
      margin-left: (20rem / @baseFont);
      font-size: (20rem / @baseFont);
      text-align: center;
      border: none;
      border-radius: 10%;
    }
  }
}
</style>