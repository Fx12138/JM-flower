<template>
  <div class="operate-box">
    <div class="coin-box">
      <div class="money-coin" @click="follow(1)">
        <img src="@/assets/images/coin_1.jpg" alt="" />
      </div>
      <div class="money-coin" @click="follow(2)">
        <img src="@/assets/images/coin_2.jpg" alt="" />
      </div>
      <div class="money-coin" @click="follow(5)">
        <img src="@/assets/images/coin_5.jpg" alt="" />
      </div>
      <div class="money-coin" @click="follow(10)">
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
  props: ["roomInfo"],
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
    justify-items: center;
    align-items: center;
    img {
      width: (50rem / @baseFont);
      height: (50rem / @baseFont);
      margin-left: (30rem / @baseFont);
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