<template>
  <div class="box">
    <div>房间号:{{ roomInfo.roomId }}</div>
    <div>锅里的钱:{{ roomInfo.coinPool }}</div>
    <div>当前底分(闷牌):{{ roomInfo.bottomCoin }}</div>
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
.box {
  background-color: silver;
  opacity: 0.8;
  padding: (13rem / @baseFont);
  border: 2px black solid;
  border-radius: (13rem / @baseFont);
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  div {
    font-size: (1rem / @baseFont);
  }
  :nth-child(1) {
    margin-bottom: (5rem / @baseFont);
    font-size: (20rem / @baseFont);
  }
}
</style>