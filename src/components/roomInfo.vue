<template>
  <div class="box">
    <div class="message">
      <h5>房间号:{{ roomId }}</h5>
      <div>锅里的钱:{{ roomInfo.coinPool }}</div>
      <div>当前底分(闷牌):{{ roomInfo.bottomCoin }}</div>
    </div>

    <div v-if="inOut" class="inout-msg">{{ inOutMes }}</div>
    <div class="sendcard">
      <button
        v-if="roomInfo.status == 0"
        type="default"
        class="sendcard-btn"
        @click="beginGame(pokers)"
      >
        发牌
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    init() {},
  },
  components: {},
  created() {},
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/css/common.css";
@baseFont: 50;
// 左上角游戏状态显示框
.message {
  width: (150rem / @baseFont);
  height: (110rem / @baseFont);
  border: red solid 1px;
  background-color: silver;
  position: absolute;
  top: (10rem / @baseFont);
  left: (10rem / @baseFont);
  z-index: 99999;
  margin: auto;
  font-size: (10rem / @baseFont);
}
</style>