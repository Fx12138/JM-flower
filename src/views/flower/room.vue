<template>
  <div class="outer">
    <!-- 页面音频 -->
    <audio id="sendAudio">
      <source src="@/assets/audios/shufflePoker.mp3" type="audio/ogg" />
      您的浏览器不支持 audio 元素。
    </audio>

    <div class="sendcard">
      <button
        v-if="roomInfo.status == 0"
        type="default"
        class="btn btn-primary btn-lg"
        @click="beginGame()"
      >
        开始游戏
      </button>
    </div>

    <!-- 房间信息组件 -->
    <room-info :roomInfo="roomInfo" class="room-info"></room-info>

    <!-- 当前用户计时器 -->
    <div
      class="login-user-count-time"
      v-show="roomInfo.activeUser.id == loginUser.id && roomInfo.status != 3"
    >
      <img src="../../assets/clock.png" alt="" />{{ countTime }}
    </div>

    <!-- 当前用户 -->
    <flower-user-com class="curUser" :userInfo="loginUser" :roomInfo="roomInfo"
      ><div slot="coin-follow" class="curUser-follow coin-follow"></div
    ></flower-user-com>

    <flower-user-com
      class="user0"
      :userInfo="flowerUserList[0]"
      :roomInfo="roomInfo"
    >
      <div slot="coin-follow" class="user0-follow coin-follow"></div>
      <!-- 计时器 -->
      <div
        class="active"
        slot="countTime"
        v-show="
          roomInfo.activeUser.id == flowerUserList[0].id &&
          flowerUserList[0].username != loginUser.username &&
          roomInfo.status != 3
        "
      >
        <img src="../../assets/clock.png" alt="" />{{ countTime }}
      </div>
    </flower-user-com>

    <flower-user-com
      class="user1"
      :userInfo="flowerUserList[1]"
      :roomInfo="roomInfo"
    >
      <div slot="coin-follow" class="user1-follow coin-follow"></div>
      <!-- 计时器 -->
      <div
        class="active"
        slot="countTime"
        v-show="
          roomInfo.activeUser.id == flowerUserList[1].id &&
          flowerUserList[1].username != loginUser.username &&
          roomInfo.status != 3
        "
      >
        <img src="../../assets/clock.png" alt="" />{{ countTime }}
      </div>
    </flower-user-com>

    <flower-user-com
      class="user2"
      :userInfo="flowerUserList[2]"
      :roomInfo="roomInfo"
    >
      <div slot="coin-follow" class="user2-follow coin-follow"></div>
      <!-- 计时器 -->
      <div
        class="active"
        slot="countTime"
        v-show="
          roomInfo.activeUser.id == flowerUserList[2].id &&
          flowerUserList[2].username != loginUser.username &&
          roomInfo.status != 3
        "
      >
        <img src="../../assets/clock.png" alt="" />{{ countTime }}
      </div>
    </flower-user-com>

    <flower-user-com
      class="user3"
      :userInfo="flowerUserList[3]"
      :roomInfo="roomInfo"
    >
      <div slot="coin-follow" class="user3-follow coin-follow"></div>
      <!-- 计时器 -->
      <div
        class="active"
        slot="countTime"
        v-show="
          roomInfo.activeUser.id == flowerUserList[3].id &&
          flowerUserList[3].username != loginUser.username &&
          roomInfo.status != 3
        "
      >
        <img src="../../assets/clock.png" alt="" />{{ countTime }}
      </div>
    </flower-user-com>

    <!-- 操作按钮组件 -->
    <operate-bar
      class="operate-bar"
      :roomInfo="roomInfo"
      v-show="
        loginUser.username == roomInfo.activeUser.username &&
        roomInfo.status == 1
      "
    ></operate-bar>

    <div class="fast-message-button" @click="showFastList = !showFastList">
      发消息
    </div>
    <div
      class="fast-message-box"
      v-show="showFastList"
      @click="showFastList = !showFastList"
    >
      <fast-message-list
        :roomId="roomId"
        @sendFastMessage="sendFastMessage"
      ></fast-message-list>
    </div>

    <!-- 进出房间,比牌结果,游戏结束提示框 -->
    <div
      id="alertMessage"
      class="alert alert-primary"
      role="alert"
      v-show="showAlertMessage"
    >
      {{ alertMessage }}
    </div>

    <!-- 右下角快捷语音提示框 -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div
        id="liveToast"
        class="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <img :src="talkItem.avatar" class="rounded me-2" alt="..." />
          <strong class="me-auto">{{ talkItem.username }}</strong>
          <small>1 second ago</small>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body">
          {{ talkItem.messageContent }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie } from "../../utils/cookieUtil";
import { getRoomById } from "../../network/room";
// 组件
import roomInfo from "components/room/roomInfo.vue";
import fastMessageList from "../../components/room/fastMessageList.vue";
import flowerUserCom from "components/user/flowerUserCom.vue";
import operateBar from "components/room/operateBar.vue";
import loginVue from "../login/login.vue";
export default {
  components: { fastMessageList, roomInfo, flowerUserCom, operateBar },
  data() {
    return {
      loginUser: {
        id: 10,
        avatar:
          "https://img1.baidu.com/it/u=3583591450,2292153595&fm=26&fmt=auto&gp=0.jpg",
        username: "等待玩家",
        card: [
          {
            color: "",
            number: null,
            name: "",
            order: null,
            power: null,
            path: null,
          },
          {
            color: "",
            number: null,
            name: "",
            order: null,
            power: null,
            path: null,
          },
          {
            color: "",
            number: null,
            name: "",
            order: null,
            power: null,
            path: null,
          },
        ],
        cardType: null,
        coin: 0,
        isDown: 0,
        cardStatus: 0, //是否看牌 0未看,1看了
        liveStatus: 0, //是否弃牌或输 0输,1活着
      },
      roomInfo: {
        status: 0, //开局状态,0未开局,1已开局,2比牌等待选择
        roomId: null,
        activeUser: {
          id: null,
          username: "",
        },
        lastWinner: {
          id: 0,
        },
        coinPool: 0,
        gamesNumber: 1,
        bottomCoin: 1,
        aliveNumber: 0,
        userNumber: 0,
      },
      flowerUserList: [
        {
          id: 10,
          avatar:
            "https://img1.baidu.com/it/u=3583591450,2292153595&fm=26&fmt=auto&gp=0.jpg",
          username: "等待玩家",
          card: [
            {
              color: "",
              number: null,
              name: "",
              order: null,
              power: null,
              path: null,
            },
            {
              color: "",
              number: null,
              name: "",
              order: null,
              power: null,
              path: null,
            },
            {
              color: "",
              number: null,
              name: "",
              order: null,
              power: null,
              path: null,
            },
          ],
          cardType: null,
          coin: 0,
          isDown: 0,
          cardStatus: 0, //是否看牌 0未看,1看了
          liveStatus: 0, //是否弃牌或输 0输,1活着
        },
        {
          id: 10,
          avatar:
            "https://img1.baidu.com/it/u=3583591450,2292153595&fm=26&fmt=auto&gp=0.jpg",
          username: "等待玩家",
          card: [
            {
              color: "",
              number: null,
              name: "",
              order: null,
              power: null,
              path: null,
            },
            {
              color: "",
              number: null,
              name: "",
              order: null,
              power: null,
              path: null,
            },
            {
              color: "",
              number: null,
              name: "",
              order: null,
              power: null,
              path: null,
            },
          ],
          cardType: null,
          coin: 0,
          isDown: 0,
          cardStatus: 0, //是否看牌 0未看,1看了
          liveStatus: 0, //是否弃牌或输 0输,1活着
        },
        {
          id: 10,
          avatar:
            "https://img1.baidu.com/it/u=3583591450,2292153595&fm=26&fmt=auto&gp=0.jpg",
          username: "等待玩家",
          card: [
            {
              color: "",
              number: null,
              name: "",
              order: null,
              power: null,
              path: null,
            },
            {
              color: "",
              number: null,
              name: "",
              order: null,
              power: null,
              path: null,
            },
            {
              color: "",
              number: null,
              name: "",
              order: null,
              power: null,
              path: null,
            },
          ],
          cardType: null,
          coin: 0,
          isDown: 0,
          cardStatus: 0, //是否看牌 0未看,1看了
          liveStatus: 0, //是否弃牌或输 0输,1活着
        },
        {
          id: 10,
          avatar:
            "https://img1.baidu.com/it/u=3583591450,2292153595&fm=26&fmt=auto&gp=0.jpg",
          username: "等待玩家",
          card: [
            {
              color: "",
              number: null,
              name: "",
              order: null,
              power: null,
              path: null,
            },
            {
              color: "",
              number: null,
              name: "",
              order: null,
              power: null,
              path: null,
            },
            {
              color: "",
              number: null,
              name: "",
              order: null,
              power: null,
              path: null,
            },
          ],
          cardType: null,
          coin: 0,
          isDown: 0,
          cardStatus: 0, //是否看牌 0未看,1看了
          liveStatus: 0, //是否弃牌或输 0输,1活着
        },
      ],
      //页面语音
      sendAudio: null,
      //快捷语音消息列表
      showFastList: false,
      //快捷语音消息列表显示开关
      alertMessage: null,
      //页面信息提示显示开关
      showAlertMessage: false,
      //语音项
      talkItem: {
        username: null,
        avatar: null,
        messageContent: null,
      },
      optionAudioList: {
        bipai: null,
        qipai: null,
        kanpai: null,
        follow: null,
        gameFinish: null,
      },
      coin20: null,
      countTime: 30,
      interval: null,
    };
  },
  watch: {
    "roomInfo.activeUser.id": {
      handler(newValue, oldValue) {
        clearInterval(this.interval);
        this.countTime = 30;
        this.interval = setInterval(() => {
          this.countTime--;
        }, 1000);
      },
    },
    "roomInfo.gamesNumber": {
      handler(newValue, oldValue) {
        clearInterval(this.interval);
        this.countTime = 30;
        this.interval = setInterval(() => {
          this.countTime--;
        }, 1000);
      },
    },
    countTime: {
      handler(newValue, oldValue) {
        //到时未操作自动弃牌
        if (!newValue) {
          this.loseCard();
        }
      },
    },
  },
  computed: {
    roomId() {
      this.roomInfo.roomId = this.$route.params.roomId;
      return this.$route.params.roomId;
    },
  },
  created() {
    //获取房间信息和用户信息
    this.getUserInfo();
  },
  mounted() {
    this.coin20 = require("@/assets/images/coin_20.jpg");

    this.sendAudio = document.getElementById("sendAudio");
    this.showAlertMessage = false;

    //加载声音文件
    this.optionAudioList.gameFinish = require("@/assets/audios/gameFinish.mp3");
    this.optionAudioList.kanpai = require("@/assets/audios/kanpai.mp3");
    this.optionAudioList.follow = require("@/assets/audios/follow.mp3");
    this.optionAudioList.bipai = require("@/assets/audios/bipai.mp3");
    this.optionAudioList.qipai = require("@/assets/audios/qipai.mp3");
  },
  methods: {
    //获取用户信息
    getUserInfo() {
      getRoomById(this.roomId).then((res) => {
        this.roomInfo = res.data.data.roomInfo;
        let userNumber = res.data.data.flowerUserList.length;
        //获取所有用户信息
        for (let i = 0; i < res.data.data.flowerUserList.length - 1; i++) {
          let user = res.data.data.flowerUserList.filter((user) => {
            return user.id == (this.loginUser.id + i + 1) % userNumber;
          })[0];
          if (user) {
            this.flowerUserList[i].id = user.id;
            this.flowerUserList[i].avatar = user.avatar;
            this.flowerUserList[i].username = user.username;
            this.flowerUserList[i].coin = user.coin;
            this.flowerUserList[i].isDown = user.isDown;
            this.flowerUserList[i].cardStatus = user.cardStatus;
            this.flowerUserList[i].liveStatus = user.liveStatus;
          }
        }
        //获取登录用户信息
        let curUser = res.data.data.flowerUserList.filter((user) => {
          return user.username == JSON.parse(getCookie("userInfo")).username;
        })[0];
        this.loginUser.id = curUser.id;
        this.loginUser.avatar = curUser.avatar;
        this.loginUser.username = curUser.username;
        this.loginUser.coin = curUser.coin;
        this.loginUser.isDown = curUser.isDown;
        this.loginUser.cardStatus = curUser.cardStatus;
        this.loginUser.liveStatus = curUser.liveStatus;

        //如果登录用户看牌了 则加载牌的图片
        if (curUser.cardStatus) {
          for (let j = 0; j < curUser.card.length; j++) {
            this.loginUser.card[j].color = curUser.card[j].color;
            this.loginUser.card[j].number = curUser.card[j].number;
            this.loginUser.card[j].name = curUser.card[j].name;
            this.loginUser.card[j].order = curUser.card[j].order;
            this.loginUser.card[j].color = curUser.card[j].color;
            this.loginUser.card[j].power = curUser.card[j].power;
            this.loginUser.card[j].path = require("../../assets/images" +
              curUser.card[j].path.replace("../../assets/images", ""));
          }
        }
        let sendData = {
          userInfo: this.loginUser,
          roomId: this.roomId,
        };
        this.$socket.emit("toFlowerRoom", sendData);
      });
    },
    //初始化一些数据
    initData() {
      this.userNumber = 0;
      //计算房间内玩家的数量
      this.flowerUserList.forEach((user) => {
        if (user.username !== "等待玩家") {
          this.userNumber += 1;
        }
      });
    },

    //接收子组件发射的快捷消息
    sendFastMessage(data) {
      this.talkItem.username = data.data.user.username;
      this.talkItem.avatar = data.data.user.avatar;
      this.talkItem.messageContent = data.data.messageContent;
      var toastLiveExample = document.getElementById("liveToast");
      var toast = new bootstrap.Toast(toastLiveExample);

      toast.show();
    },

    //发牌
    beginGame() {
      //房间内人数
      this.initData();
      this.$socket.emit("sendPokers", { roomId: this.roomId });
    },
    //跟注
    follow(coinNum) {
      this.$socket.emit("follow", {
        roomId: this.roomId,
        flowerUserList: this.flowerUserList,
        coinNum,
      });
    },

    //看牌
    seeCard() {
      this.$socket.emit("seeCard", {
        roomId: this.roomId,
        activeUserId: this.roomInfo.activeUser.id,
      });
    },

    //弃牌
    loseCard() {
      //用户弃牌
      this.$socket.emit("loseCard", {
        roomId: this.roomId,
        activeUser: this.roomInfo.activeUser,
      });
    },

    //选择一个进行比牌
    chooseOne() {
      this.initData();
      this.roomInfo.status = 2;
      this.$socket.emit("chooseStatus", { roomId: this.roomId });
    },

    //信息提示(包括用户进入和退出,比牌结果,当前局结束提示)
    showMessage(mes) {
      this.alertMessage = mes;
      this.showAlertMessage = true;
      setTimeout(() => {
        this.showAlertMessage = false;
      }, 3000);
    },

    //比牌
    contrast(contrastinger, contrasteder) {
      contrastinger = this.flowerUserList.filter((user) => {
        return user.username == contrastinger.username;
      })[0];
      this.$socket.emit("contrastResult", {
        roomId: this.roomId,
        contrastinger,
        contrasteder,
      });
    },
  },
  sockets: {
    //用户进入斗地主房间
    inFlowerRoom: function (data) {
      if (data.code == 200) {
        let newUsername = data.data.newUser.username;
        this.showMessage(newUsername + "进入了房间");

        //更新房间信息
        this.roomInfo = data.data.room.roomInfo;

        let userNumber = data.data.room.flowerUserList.length;
        //获取所有用户信息
        for (let i = 0; i < data.data.room.flowerUserList.length - 1; i++) {
          let user = data.data.room.flowerUserList.filter((user) => {
            return user.id == (this.loginUser.id + i + 1) % userNumber;
          })[0];
          if (user) {
            this.flowerUserList[i].id = user.id;
            this.flowerUserList[i].avatar = user.avatar;
            this.flowerUserList[i].username = user.username;
            this.flowerUserList[i].coin = user.coin;
            this.flowerUserList[i].isDown = user.isDown;
            this.flowerUserList[i].cardStatus = user.cardStatus;
            this.flowerUserList[i].liveStatus = user.liveStatus;
          }
        }
      } else {
        alert(flowerUserList.msg);
      }
    },
    //用户退出炸金花房间
    outFlowerRoom(data) {
      this.flowerUserList.map((user, index) => {
        if (user.username == data.username) {
          user.username = "等待玩家";
          user.avatar =
            "https://img1.baidu.com/it/u=3583591450,2292153595&fm=26&fmt=auto&gp=0.jpg";
        }
      });
      let newUsername = data.username;
      this.showMessage(newUsername + "退出了房间");
    },

    //发牌
    sendPokers(room) {
      //播放音效
      this.sendAudio.load();
      this.sendAudio.play();
      //更新房间信息
      this.roomInfo = room.roomInfo;
      //更新玩家信息
      let curUser = room.flowerUserList.filter((user) => {
        return user.username == this.loginUser.username;
      })[0];
      this.loginUser.id = curUser.id;
      this.loginUser.coin = curUser.coin;
      this.loginUser.isDown = curUser.isDown;
      this.loginUser.cardStatus = curUser.cardStatus;
      this.loginUser.liveStatus = curUser.liveStatus;
      let userNumber = room.flowerUserList.length;
      //获取所有用户信息
      for (let i = 0; i < room.flowerUserList.length - 1; i++) {
        let user = room.flowerUserList.filter((user) => {
          return user.id == (this.loginUser.id + i + 1) % userNumber;
        })[0];
        if (user) {
          this.flowerUserList[i].coin = user.coin;
          this.flowerUserList[i].isDown = user.isDown;
          this.flowerUserList[i].cardStatus = user.cardStatus;
          this.flowerUserList[i].liveStatus = user.liveStatus;
        }
      }
    },

    //跟注
    follow(room) {
      //播放音效
      this.sendAudio.src = this.optionAudioList.follow;
      this.sendAudio.load();
      this.sendAudio.play();
      this.initData();

      // 扔筹码
      let activeId = this.roomInfo.activeUser.id;
      let userIndex = this.flowerUserList.findIndex(
        (user, index, array) => user.id == activeId
      );
      let followUserImg = null;
      if (userIndex == -1) {
        followUserImg = document.getElementsByClassName("curUser-follow")[0];
      } else {
        followUserImg = document.getElementsByClassName(
          "user" + userIndex + "-follow"
        )[0];
      }

      function randomNum(minNum, maxNum) {
        var comt = maxNum - minNum + 1;
        return Math.floor(Math.random() * comt + minNum);
      }
      var plusOrMinus = Math.random() < 0.5 ? -1 : 1; //随机+1或-1
      var img = document.createElement("img"); //创建一个标签
      let transX = 0;
      let transY = 0;
      let rotateAngle = randomNum(0, 360);
      switch (userIndex) {
        //20rem 5rem
        case -1:
          transX = randomNum(-7, 20);
          transY = randomNum(-20, -5);
          break;
        case 0:
          transX = randomNum(30, 50);
          transY = randomNum(0, 6) * plusOrMinus;
          break;
        case 1:
          transX = randomNum(10, 40);
          transY = randomNum(10, 27);
          break;
        case 2:
          transX = randomNum(-10, -30);
          transY = randomNum(7, 27);
          break;
        case 3:
          transX = randomNum(-27, -40);
          transY = randomNum(0, 6);
          break;
      }
      img.src = this.coin20;
      img.style.width = "1rem";
      img.style.height = "1rem";
      img.style.position = "absolute";
      followUserImg.appendChild(img); //放到指定的id里
      setTimeout(() => {
        img.style.width = "3rem";
        img.style.height = "3rem";
        img.style.transition = "1" + "s";
        img.style.transform = `scale(.6) translate(${transX}rem,${transY}rem) rotate(${rotateAngle}deg) `;
      }, 20);

      //更新房间信息
      this.roomInfo = room.roomInfo;
      //更新玩家信息
      let curUser = room.flowerUserList.filter((user) => {
        return user.username == this.loginUser.username;
      })[0];
      this.loginUser.id = curUser.id;
      this.loginUser.coin = curUser.coin;
      this.loginUser.isDown = curUser.isDown;
      this.loginUser.cardStatus = curUser.cardStatus;
      this.loginUser.liveStatus = curUser.liveStatus;
      let userNumber = room.flowerUserList.length;
      //获取所有用户信息
      for (let i = 0; i < room.flowerUserList.length - 1; i++) {
        let user = room.flowerUserList.filter((user) => {
          return user.id == (this.loginUser.id + i + 1) % userNumber;
        })[0];
        if (user) {
          this.flowerUserList[i].coin = user.coin;
          this.flowerUserList[i].isDown = user.isDown;
          this.flowerUserList[i].cardStatus = user.cardStatus;
          this.flowerUserList[i].liveStatus = user.liveStatus;
        }
      }
    },

    //看牌
    seeCard(room) {
      //播放音效
      this.sendAudio.src = this.optionAudioList.kanpai;
      this.sendAudio.load();
      this.sendAudio.play();

      //更新房间信息
      this.roomInfo = room.roomInfo;
      //更新玩家信息
      let curUser = room.flowerUserList.filter((user) => {
        return user.username == this.loginUser.username;
      })[0];
      this.loginUser.id = curUser.id;
      this.loginUser.coin = curUser.coin;
      this.loginUser.isDown = curUser.isDown;
      this.loginUser.cardStatus = curUser.cardStatus;
      this.loginUser.liveStatus = curUser.liveStatus;
      let userNumber = room.flowerUserList.length;
      //获取所有用户信息
      for (let i = 0; i < room.flowerUserList.length - 1; i++) {
        let user = room.flowerUserList.filter((user) => {
          return user.id == (this.loginUser.id + i + 1) % userNumber;
        })[0];
        if (user) {
          this.flowerUserList[i].coin = user.coin;
          this.flowerUserList[i].isDown = user.isDown;
          this.flowerUserList[i].cardStatus = user.cardStatus;
          this.flowerUserList[i].liveStatus = user.liveStatus;
        }
      }
    },

    showCards(data) {
      this.roomInfo = data.room.roomInfo;
      this.loginUser.cardStatus = data.activeUser.cardStatus;
      for (let j = 0; j < data.activeUser.card.length; j++) {
        console.log(j);

        console.log(this.loginUser.card[j]);

        this.loginUser.card[j].path = require("../../assets/images" +
          data.activeUser.card[j].path.replace("../../assets/images", ""));
      }
    },

    //弃牌
    loseCard(data) {
      //还有存活玩家 弃牌只需更改弃牌用户状态和房间信息
      this.sendAudio.src = this.optionAudioList.qipai;
      this.sendAudio.load();
      this.sendAudio.play();

      let loseId = data.loseId;
      if (loseId == this.loginUser.id) {
        this.loginUser.liveStatus = 0;
      } else {
        this.flowerUserList.filter((user) => {
          return user.id == loseId;
        })[0].liveStatus = 0;
      }

      this.roomInfo = data.room.roomInfo;
    },

    //等待比牌状态
    chooseStatus() {
      this.sendAudio.src = this.optionAudioList.bipai;
      this.sendAudio.load();
      this.sendAudio.play();
    },

    //比牌结果
    contrastResult(data) {
      //仍有玩家存活只需更新败者的存活状态和房间信息
      this.roomInfo = data.room.roomInfo;
      this.flowerUserList.filter((user) => {
        return user.username == data.loser.username;
      })[0].liveStatus = 0;
      this.showMessage(data.winner.username + "赢了");
    },

    //当前局结束
    nowGameEnd(data) {
      this.sendAudio.src = this.optionAudioList.gameFinish;
      this.sendAudio.load();
      this.sendAudio.play();

      //更新房间信息
      this.roomInfo = data.room.roomInfo;
      let loserUser = this.flowerUserList.filter((user) => {
        return user.username == data.loser.username;
      })[0];
      if (loserUser) {
        loserUser.liveStatus = 0;
      }

      //更新玩家信息
      let curUser = data.room.flowerUserList.filter((user) => {
        return user.username == this.loginUser.username;
      })[0];
      this.loginUser.id = curUser.id;
      this.loginUser.coin = curUser.coin;
      this.loginUser.isDown = curUser.isDown;
      this.loginUser.cardStatus = curUser.cardStatus;
      this.loginUser.liveStatus = curUser.liveStatus;
      let userNumber = data.room.flowerUserList.length;
      //获取所有用户信息
      for (let i = 0; i < data.room.flowerUserList.length - 1; i++) {
        let user = data.room.flowerUserList.filter((user) => {
          return user.id == (this.loginUser.id + i + 1) % userNumber;
        })[0];
        if (user) {
          this.flowerUserList[i].coin = user.coin;
          this.flowerUserList[i].isDown = user.isDown;
          this.flowerUserList[i].cardStatus = user.cardStatus;
          this.flowerUserList[i].liveStatus = user.liveStatus;
        }
      }

      this.alertMessage =
        this.roomInfo.lastWinner.username +
        "赢了!本局已结束,5秒后自动开始下一局!";
      this.showAlertMessage = true;
    },

    //非首局发牌
    sendNewCards(room) {
      //删除上局扔的筹码图片
      let followUserImg = document.getElementsByClassName("coin-follow");
      for (let i = 0; i < this.flowerUserList.length; i++) {
        var child = followUserImg[i].lastElementChild;
        while (child) {
          followUserImg[i].removeChild(child);
          child = followUserImg[i].lastElementChild;
        }
      }
      //取消显示alertMessage
      this.showAlertMessage = false;

      this.roomInfo = room.roomInfo;
      //更新玩家信息
      let curUser = room.flowerUserList.filter((user) => {
        return user.username == this.loginUser.username;
      })[0];
      this.loginUser.id = curUser.id;
      this.loginUser.coin = curUser.coin;
      this.loginUser.isDown = curUser.isDown;
      for (let j = 0; j < this.loginUser.card.length; j++) {
        this.loginUser.card[j].color = null;
        this.loginUser.card[j].number = null;
        this.loginUser.card[j].name = null;
        this.loginUser.card[j].order = null;
        this.loginUser.card[j].color = null;
        this.loginUser.card[j].power = null;
        this.loginUser.card[j].path = null;
      }
      // this.loginUser.card.splice(0, this.loginUser.card.length);
      this.loginUser.cardStatus = curUser.cardStatus;
      this.loginUser.liveStatus = curUser.liveStatus;
      let userNumber = room.flowerUserList.length;
      //获取所有用户信息
      for (let i = 0; i < room.flowerUserList.length - 1; i++) {
        let user = room.flowerUserList.filter((user) => {
          return user.id == (this.loginUser.id + i + 1) % userNumber;
        })[0];
        if (user) {
          this.flowerUserList[i].coin = user.coin;
          this.flowerUserList[i].isDown = user.isDown;
          this.flowerUserList[i].cardStatus = user.cardStatus;
          this.flowerUserList[i].liveStatus = user.liveStatus;
        }
      }
    },
  },
};
</script>

<style lang="less">
@baseFont: 20;
body {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/bg.jpeg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.outer {
  width: 100%;
  height: 100%;
}
.sendcard {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.room-info {
  position: absolute;
  top: (10rem / @baseFont);
  left: (10rem / @baseFont);
  z-index: 99999;
}

.curUser {
  width: (320rem / @baseFont);
  height: (130rem / @baseFont);
  position: fixed;
  bottom: 10%;
  left: 40%;
  z-index: 999;
}

.user0 {
  width: (320rem / @baseFont);
  height: (130rem / @baseFont);
  position: fixed;
  top: 40%;
  left: 2%;
  z-index: 999;
}
.user1 {
  width: (320rem / @baseFont);
  height: (130rem / @baseFont);
  position: fixed;
  top: 2%;
  left: 18%;
  z-index: 999;
}
.user2 {
  width: (320rem / @baseFont);
  height: (130rem / @baseFont);
  position: fixed;
  top: 2%;
  left: 57%;
  z-index: 999;
}

.user3 {
  width: (320rem / @baseFont);
  height: (130rem / @baseFont);
  position: fixed;
  top: 40%;
  right: 2%;
  z-index: 999;
}

.operate-bar {
  width: 100%;
  height: (60rem / @baseFont);
  position: fixed;
  bottom: 0;
}
// 当前登录用户计时器
.login-user-count-time {
  position: fixed;
  height: (80rem / @baseFont);
  line-height: (50rem / @baseFont);
  font-size: (40rem / @baseFont);
  z-index: 999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  img {
    height: (80rem / @baseFont);
  }
}

// bootstrap
.fast-message-button {
  position: fixed;
  bottom: (15rem / @baseFont);
  right: (15rem / @baseFont);
  z-index: 999;
  color: white;
}
.fast-message-box {
  position: fixed;
  bottom: (60rem / @baseFont);
  right: (5rem / @baseFont);
}
#alertMessage {
  position: fixed;
  width: 30%;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  text-align: center;
}
#liveToast {
  position: fixed;
  bottom: (65rem / @baseFont);
  right: (10rem / @baseFont);
  img {
    width: (40rem / @baseFont);
    // height: 100%;
  }
}
</style>