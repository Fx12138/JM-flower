<template>
  <div class="box">
    <div class="roomId">房间号</div>
    <div class="roomName">房间名</div>
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
.box {
  width: 100%;
  display: flex;
}
.roomId {
  color: red;
}
</style>