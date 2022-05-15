<template>
  <div class="content">
    <div class="home-title">游戏大厅</div>
    <button class="logout-button btn btn-primary" @click="logout">
      退出登录
    </button>

    <room-list class="room-list" :rooms="roomList"></room-list>
  </div>
</template>

<script>
import { getCookie, delCookie } from "../../utils/cookieUtil";
import { inFlowerRoom, getRooms } from "../../network/room";
import RoomList from "../../components/room/roomList.vue";
export default {
  data() {
    return {
      userInfo: null,
      roomId: null,
      roomList: [],
    };
  },
  created() {
    this.getUserInfo();
    //获取房间列表
    this.getAllRoom();
  },

  methods: {
    //获取房间列表
    getAllRoom() {
      getRooms().then((res) => {
        this.roomList = res.data.data;
      });
    },

    //进入房间
    inRoom: function () {
      inFlowerRoom(this.roomId, this.userInfo).then((res) => {
        if (res.data.code == 200) {
          this.$router.push("/flowerRoom/" + this.roomId);
        } else {
          alert(res.data.msg);
        }
      });
    },

    //获取用户信息
    getUserInfo() {
      this.userInfo = JSON.parse(getCookie("userInfo"));
    },
    logout() {
      delCookie("token");
      delCookie("userInfo");
      this.$router.replace("/login");
    },
  },
  components: { RoomList },
};
</script>

<style lang="less">
@baseFont: 50;
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/index3.jpeg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
#app {
  width: 100%;
  height: 100%;
}
.content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .home-title {
    color: aliceblue;
    font-size: (30rem / @baseFont);
    margin-bottom: (50rem / @baseFont);
  }
  .room-list {
    width: 90%;
  }
  .logout-button {
    position: fixed;
    top: (10rem / @baseFont);
    right: (10rem / @baseFont);
  }
}
</style>
