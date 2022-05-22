<template>
  <div class="box">
    <div class="room-img-box">
      <img
        :src="
          room.flowerUserList[0] ? room.flowerUserList[0].avatar : roomAvatar
        "
        alt=""
      />
    </div>
    <div class="room-info-box">
      <div class="roomName">{{ room.roomName }}</div>
      <div class="roomId">房间ID:{{ room.roomId }}</div>
    </div>

    <button class="inroom-button" type="default">进入房间</button>
  </div>
</template>
<script>
import { getCookie, delCookie } from "@/utils/cookieUtil";
import { inFlowerRoom, getRooms } from "@/network/room";
export default {
  data() {
    return {
      roomAvatar:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F43%2F21%2F5810a58920ead_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655201400&t=53494c6fd29513798042ecfba78ab752",
      userInfo: {},
    };
  },
  props: ["room"],
  methods: {
    init() {
      this.userInfo = JSON.parse(getCookie("userInfo"));
    },
    //进入房间
    inRoom: function () {
      inFlowerRoom(this.room.roomId, this.userInfo).then((res) => {
        if (res.data.code == 200) {
          this.$router.push("/flowerRoom/" + this.room.roomId);
        } else {
          alert(res.data.msg);
        }
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
.box {
  padding: 0 (20rem / @baseFont);
  width: 95%;
  min-height: (60rem / @baseFont);
  display: flex;
  align-items: center;
  margin-bottom: (10rem / @baseFont);
  // font-size: (30rem / @baseFont);
  background-color: rgba(222, 255, 255, 0.5);
  border-radius: (20rem / @baseFont);
  .room-img-box {
    width: (40rem / @baseFont);
    height: (40rem / @baseFont);
    img {
      width: (40rem / @baseFont);
      height: (40rem / @baseFont);
      border-radius: (40rem / @baseFont);
    }
  }
  .room-info-box {
    margin-left: (15rem / @baseFont);
    width: (300rem / @baseFont);

    .roomName {
      font-size: (20rem / @baseFont);
    }
    .roomId {
      color: red;
      font-size: (15rem / @baseFont);
    }
  }
  .inroom-button {
    margin-left: auto;
    border: 0;
    // width: (80rem / @baseFont);
    height: (40rem / @baseFont);
    border-radius: (17rem / @baseFont);
    background-color: #5a9af0;
    font-size: (15rem / @baseFont);
  }
}
</style>