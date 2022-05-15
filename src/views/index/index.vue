<template>
  <div class="content">
    <h2 class="title-text">show hands</h2>
    <div class="room-number">
      <input
        id="roomNumber"
        type="text"
        v-model="roomId"
        placeholder="请输入房间号"
      />
    </div>
    <div class="option">
      <button class="option-btn" type="default" @click="inRoom">
        进入房间
      </button>
      <button class="option-btn" @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script>
import { getCookie, delCookie } from "../../utils/cookieUtil";
import { inFlowerRoom } from "../../network/room";
export default {
  data() {
    return {
      userInfo: null,
      roomId: null,
    };
  },
  created() {
    this.getUserInfo();
    // console.log(this.userInfo);
  },

  methods: {
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
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .title-text {
    font-size: (70rem / @baseFont);
    margin: 0;
  }
}
.room-number {
  height: (50rem / @baseFont);
  width: (230rem / @baseFont);
  margin-top: (20rem / @baseFont);
  position: relative;
  border-radius: (50rem / @baseFont);
  overflow: hidden;
}
.room-number input {
  display: flex;
  height: (50rem / @baseFont);
  width: (230rem / @baseFont);
  text-align: center;
  padding: 0;
  margin: 0;
  background-color: #aaaaaa;
  border: none;
  outline: none;
}
.room-number::before {
  content: "";
  position: absolute;
  left: 0;
  height: (2rem / @baseFont);
  bottom: 0;
  width: 100%;
  background-color: #00ffff;
  transform: translate(-100%);
  transition: 2s;
  z-index: 2;
}
.room-number:hover::before {
  transform: translateX(100%);
}
.option {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: (10rem / @baseFont);
}
.option-btn {
  margin: (10rem / @baseFont) (10rem / @baseFont);
}
</style>
