<template>
  <div class="box">
    <room-item v-for="room in rooms" :key="room.id" :room="room"></room-item>
  </div>
</template>
<script>
import { RoomItem } from "./roomItem.vue";
export default {
  data() {
    return {};
  },
  props: [rooms],
  methods: {
    init() {},
  },
  components: { RoomItem },
  created() {},
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
.box {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>