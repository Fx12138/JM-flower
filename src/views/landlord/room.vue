<template>
  <div class="outer">
    首页
    <div v-if="inOut">{{ inOutMes }}</div>
    <button type="default" @click="sendCard(pokers)">发牌</button>
    <div class="left-box">
      <div class="userAvatar">
        <img :src="leftUser.avatar" alt="" />
        <span>{{ leftUser.username }}</span>
      </div>
      <div
        class="user-card"
        v-for="(card, index) in cardsOfLeftUser"
        :key="index"
      >
        {{ card.name }}
      </div>
    </div>

    <div class="right-box">
      <div class="userAvatar">
        <img :src="rightUser.avatar" alt="" />
        <span>{{ rightUser.username }}</span>
      </div>
      <div
        class="user3-card"
        v-for="(card, index) in cardsOfRightUser"
        :key="index"
      >
        {{ card.name }}
      </div>
    </div>

    <div class="user3-box">
      <div class="userAvatar">
        <img :src="userInfo.avatar" alt="" />
        <span>{{ userInfo.username }}</span>
      </div>
      <div
        class="user3-card"
        v-for="(card, index) in cardsOfUser3"
        :key="index"
      >
        {{ card.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie } from "../../utils/cookieUtil";
export default {
  data() {
    return {
      pokers: [],
      userInfo: {
        username: null,
        avatar: null,
      },
      inOut: false,
      inOutMes: null,
      landlordUserList: [],
      leftUser: {
        avatar:
          "https://img1.baidu.com/it/u=3583591450,2292153595&fm=26&fmt=auto&gp=0.jpg",
        username: "等待玩家",
      },
      rightUser: {
        avatar:
          "https://img1.baidu.com/it/u=3583591450,2292153595&fm=26&fmt=auto&gp=0.jpg",
        username: "等待玩家",
      },
      cardsOfLeftUser: [],
      cardsOfRightUser: [],
      cardsOfUser3: [],
    };
  },
  created() {
    this.getUserInfo();
    this.$socket.emit("toLandlordRoom", this.userInfo);
    // this.distributeSet(this.landlordUserList);
    this.pokers = this.creatPoker();
    this.shufflePoker(this.pokers);
  },
  mounted() {
    window.addEventListener("beforeunload", (e) => this.beforeunloadHandler(e));
  },
  destroyed() {
    console.log("销毁");
    this.$socket.emit("outLandlordRoom", this.userInfo);
    window.removeEventListener("beforeunload", (e) =>
      this.beforeunloadHandler(e)
    );
  },
  methods: {
    creatPoker: function () {
      let pokers = [];
      let color = ["黑桃", "红桃", "梅花", "方块"];
      let number = [
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
        "A",
        "2",
      ];
      for (let i = 0; i < number.length; i++) {
        let forColor = number[i];
        for (let j = 0; j < color.length; j++) {
          let forNum = color[j];
          pokers.push({
            name: forNum + forColor,
            order: i * 4 + j,
            power: i,
            path: "../img/" + (i + 3) + "_" + (j + 1) + ".jpg",
          });
        }
      }
      pokers.push({
        name: "小王",
        order: 52,
        power: 13,
        path: "../img/16_1.jpg",
      });
      pokers.push({
        name: "大王",
        order: 53,
        power: 14,
        path: "../img/17_1.jpg",
      });
      return pokers;
    },

    //洗牌
    shufflePoker: function (pokers) {
      for (let i = 0; i < pokers.length; i++) {
        //通过循环随机的将牌进行交换，实现洗牌
        let ranNum = parseInt(Math.random() * pokers.length);
        [pokers[i], pokers[ranNum]] = [pokers[ranNum], pokers[i]];
      }
    },

    //排序
    orderPoker: function () {
      let players = [
        this.cardsOfLeftUser,
        this.cardsOfRightUser,
        this.cardsOfUser3,
      ];
      players.forEach(function (player) {
        //每个玩家将手里的牌理好
        //  players
        player.sort(function (a, b) {
          //a,b代表着排序过程中两个相互比较的元素
          return a.order - b.order;
        });
      });
    },

    //发牌
    sendCard(pokers) {
      let players = [
        this.cardsOfLeftUser,
        this.cardsOfRightUser,
        this.cardsOfUser3,
      ];
      while (pokers.length > 3) {
        //只要牌堆的牌大于3张，玩家继续摸牌
        for (let i = 0; i < players.length; i++) {
          //玩家3人轮流摸牌
          players[i].push(pokers.pop());
        }
      }
      this.orderPoker();
    },

    //获取用户信息
    getUserInfo() {
      this.userInfo = JSON.parse(getCookie("userInfo"));
    },
    //浏览器或窗口关闭后的操作
    beforeunloadHandler(e) {
      this.$socket.emit("outLandlordRoom", this.userInfo);
    },
  },
  sockets: {
    //用户进入斗地主房间
    inLandlordRoom: function (landlordUserList) {
      this.inOut = true;
      let newUsername = landlordUserList[landlordUserList.length - 1].username;
      this.inOutMes = newUsername + "用户加入了斗地主房间";
      setTimeout(() => {
        this.inOut = false;
      }, 3000);
      this.landlordUserList.splice(
        0,
        this.landlordUserList.length,
        ...landlordUserList
      );
    },
    //用户退出斗地主房间
    outLandlordRoom(data) {
      this.landlordUserList.map((user, index) => {
        if (user.username == data.username) {
          this.landlordUserList.splice(index, 1);
        }
      });
      let outUsername = data.username;
      if (this.leftUser.username == outUsername) {
        this.leftUser.username = "等待玩家";
        this.leftUser.avatar =
          "https://img1.baidu.com/it/u=3583591450,2292153595&fm=26&fmt=auto&gp=0.jpg";
      } else if (this.rightUser.username == outUsername) {
        this.rightUser.username = "等待玩家";
        this.rightUser.avatar =
          "https://img1.baidu.com/it/u=3583591450,2292153595&fm=26&fmt=auto&gp=0.jpg";
      }
      this.inOutMes = outUsername + "用户退出斗地主房间";
      this.inOut = true;
      setTimeout(() => {
        this.inOut = false;
      }, 3000);

      console.log(this.landlordUserList);
    },
    //分配座位
    distributeSet: function (userList) {
      let mySetNumber = this.userInfo.setNumber;
      userList.forEach((user) => {
        if (user.setNumber > mySetNumber && user.setNumber - mySetNumber == 1) {
          this.rightUser.username = user.username;
          this.rightUser.avatar = user.avatar;
        } else if (
          user.setNumber > mySetNumber &&
          user.setNumber - mySetNumber == 2
        ) {
          this.leftUser.username = user.username;
          this.leftUser.avatar = user.avatar;
        } else if (
          user.setNumber < mySetNumber &&
          mySetNumber - user.setNumber == 1
        ) {
          this.leftUser.username = user.username;
          this.leftUser.avatar = user.avatar;
        } else if (
          user.setNumber < mySetNumber &&
          mySetNumber - user.setNumber == 2
        ) {
          this.rightUser.username = user.username;
          this.rightUser.avatar = user.avatar;
        }
      });
      console.log(this.leftUser);
      console.log(this.rightUser);
    },
  },
};
</script>

<style>
.outer {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
  overflow-x: auto;
}
.userAvatar {
  width: 55px;
  height: 55px;
}
.userAvatar img {
  width: 55px;
  height: 55px;
}
.left-box {
  width: 100px;
  height: 100px;
  position: fixed;
  top: 10%;
  left: 3%;
  background-color: #007aff;
}

.right-box {
  width: 100px;
  height: 100px;
  position: fixed;
  top: 10%;
  right: 3%;
  background-color: #3f536e;
}

.user3-box {
  width: 500px;
  height: 100px;
  position: fixed;
  bottom: 3%;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #4cd964;
  display: flex;
}
</style>
