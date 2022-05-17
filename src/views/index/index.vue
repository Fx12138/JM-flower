<template>
  <div class="content">
    <audio id="myAudio">
      <source src="@/assets/audios/test.mp3" type="audio/ogg" />
      您的浏览器不支持 audio 元素。
    </audio>
    <div class="home-title" @click="play">游戏大厅</div>
    <button class="logout-button btn btn-primary" @click="logout">
      退出登录
    </button>

    <div class="room-list"><room-list :rooms="roomList"></room-list></div>
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
      myAudio: null,
    };
  },
  created() {
    this.getUserInfo();
    //获取房间列表
    this.getAllRoom();
  },
  mounted() {
    let myAudio = document.getElementById("myAudio");
    this.myAudio = myAudio;
  },

  methods: {
    play() {
      this.myAudio.load();
      this.myAudio.play();
    },

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
@baseFont: 20;
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
    margin-bottom: (10rem / @baseFont);
  }
  .room-list {
    width: 90%;
    height: 70%;
    display: flex;
    align-items: center;
    // background-color: aqua;
  }
  .logout-button {
    position: fixed;
    top: (10rem / @baseFont);
    right: (10rem / @baseFont);
  }
}
</style>
