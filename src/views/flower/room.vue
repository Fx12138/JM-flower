<template>
  <div class="outer">
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

    <div class="user0-box" :class="flowerUserList[0].liveStatus ? '' : 'lose'">
      <div
        class="userAvatar"
        :class="roomInfo.activeUser.id == flowerUserList[0].id ? 'active' : ''"
      >
        <img
          :src="flowerUserList[0].avatar"
          :class="flowerUserList[0].liveStatus ? '' : 'lose'"
          class="userAvatarImg"
          alt=""
        />
        <div class="coin-follow coin-follow0"></div>

        <div class="user-info">
          <span class="username">{{ flowerUserList[0].username }}</span>
          <div class="user-coin-box">
            <img class="coin-pocket" src="@/assets/coin-pocket.png" alt="" />
            <span class="user-coin">{{ flowerUserList[0].coin }}</span>
          </div>
        </div>

        <button
          v-if="
            flowerUserList[0].username !== this.userInfo.username &&
            flowerUserList[0].liveStatus &&
            flowerUserList[0].cardStatus &&
            roomInfo.status == 2
          "
          @click="
            contrast(flowerUserList[roomInfo.activeUser.id], flowerUserList[0])
          "
        >
          比牌
        </button>
      </div>
      <div class="card-box">
        <div
          v-if="
            flowerUserList[0].cardStatus &&
            userInfo.username == flowerUserList[0].username
          "
          class="user-card"
        >
          <div v-for="(card, index) in flowerUserList[0].card" :key="index">
            <img class="card" :src="card.path" alt="" />
          </div>
        </div>
        <div v-else>
          <div
            class="nosee"
            :class="flowerUserList[0].liveStatus ? '' : 'lose'"
          >
            <div v-if="flowerUserList[0].cardStatus" class="see-status">
              已看牌
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="user1-box" :class="flowerUserList[1].liveStatus ? '' : 'lose'">
      <div
        class="userAvatar"
        :class="roomInfo.activeUser.id == flowerUserList[1].id ? 'active' : ''"
      >
        <img
          :src="flowerUserList[1].avatar"
          :class="flowerUserList[1].liveStatus ? '' : 'lose'"
          class="userAvatarImg"
          alt=""
        />
        <div class="coin-follow coin-follow1"></div>
        <div class="user-info">
          <span class="username">{{ flowerUserList[1].username }}</span>
          <div class="user-coin-box">
            <img class="coin-pocket" src="@/assets/coin-pocket.png" alt="" />
            <span class="user-coin">{{ flowerUserList[1].coin }}</span>
          </div>
        </div>
        <button
          v-if="
            flowerUserList[1].username !== userInfo.username &&
            flowerUserList[1].liveStatus &&
            flowerUserList[1].cardStatus &&
            roomInfo.status == 2
          "
          @click="
            contrast(flowerUserList[roomInfo.activeUser.id], flowerUserList[1])
          "
        >
          比牌
        </button>
      </div>
      <div
        v-if="
          flowerUserList[1].cardStatus &&
          userInfo.username == flowerUserList[1].username
        "
        class="user-card"
      >
        <div v-for="(card, index) in flowerUserList[1].card" :key="index">
          <img class="card" :src="card.path" alt="" />
        </div>
      </div>
      <div v-else>
        <div class="nosee" :class="flowerUserList[1].liveStatus ? '' : 'lose'">
          <div v-if="flowerUserList[1].cardStatus" class="see-status">
            已看牌
          </div>
        </div>
      </div>
    </div>

    <div class="user2-box" :class="flowerUserList[2].liveStatus ? '' : 'lose'">
      <div
        class="userAvatar"
        :class="roomInfo.activeUser.id == flowerUserList[2].id ? 'active' : ''"
      >
        <img
          :src="flowerUserList[2].avatar"
          :class="flowerUserList[2].liveStatus ? '' : 'lose'"
          class="userAvatarImg"
          alt=""
        />
        <div class="coin-follow coin-follow2"></div>
        <div class="user-info">
          <span class="username">{{ flowerUserList[2].username }}</span>
          <div class="user-coin-box">
            <img class="coin-pocket" src="@/assets/coin-pocket.png" alt="" />
            <span class="user-coin">{{ flowerUserList[2].coin }}</span>
          </div>
        </div>
        <button
          v-if="
            flowerUserList[2].username !== userInfo.username &&
            flowerUserList[2].liveStatus &&
            flowerUserList[2].cardStatus &&
            roomInfo.status == 2
          "
          @click="
            contrast(flowerUserList[roomInfo.activeUser.id], flowerUserList[2])
          "
        >
          比牌
        </button>
      </div>
      <div
        v-if="
          flowerUserList[2].cardStatus &&
          userInfo.username == flowerUserList[2].username
        "
        class="user-card"
      >
        <div v-for="(card, index) in flowerUserList[2].card" :key="index">
          <img class="card" :src="card.path" alt="" />
        </div>
      </div>
      <div v-else>
        <div class="nosee" :class="flowerUserList[2].liveStatus ? '' : 'lose'">
          <div v-if="flowerUserList[2].cardStatus" class="see-status">
            已看牌
          </div>
        </div>
      </div>
    </div>

    <div class="user3-box" :class="flowerUserList[3].liveStatus ? '' : 'lose'">
      <div
        v-if="
          flowerUserList[3].cardStatus &&
          userInfo.username == flowerUserList[3].username
        "
        class="user-card"
      >
        <div v-for="(card, index) in flowerUserList[3].card" :key="index">
          <img class="card" :src="card.path" alt="" />
        </div>
      </div>
      <div v-else>
        <div class="nosee" :class="flowerUserList[3].liveStatus ? '' : 'lose'">
          <div v-if="flowerUserList[3].cardStatus" class="see-status">
            已看牌
          </div>
        </div>
      </div>

      <div
        class="userAvatar"
        :class="roomInfo.activeUser.id == flowerUserList[3].id ? 'active' : ''"
      >
        <img
          :src="flowerUserList[3].avatar"
          :class="flowerUserList[3].liveStatus ? '' : 'lose'"
          class="userAvatarImg"
          alt=""
        />
        <div class="coin-follow coin-follow3"></div>
        <div class="user-info">
          <span class="username">{{ flowerUserList[3].username }}</span>
          <div class="user-coin-box">
            <img class="coin-pocket" src="@/assets/coin-pocket.png" alt="" />
            <span class="user-coin">{{ flowerUserList[3].coin }}</span>
          </div>
        </div>
        <button
          v-if="
            flowerUserList[3].username !== userInfo.username &&
            flowerUserList[3].liveStatus &&
            flowerUserList[3].cardStatus &&
            roomInfo.status == 2
          "
          @click="
            contrast(flowerUserList[roomInfo.activeUser.id], flowerUserList[3])
          "
        >
          比牌
        </button>
      </div>
    </div>

    <div class="user4-box" :class="flowerUserList[4].liveStatus ? '' : 'lose'">
      <div
        class="userAvatar"
        :class="roomInfo.activeUser.id == flowerUserList[4].id ? 'active' : ''"
      >
        <img
          :src="flowerUserList[4].avatar"
          :class="flowerUserList[4].liveStatus ? '' : 'lose'"
          class="userAvatarImg"
          alt=""
        />
        <div class="coin-follow coin-follow4"></div>
        <div class="user-info">
          <span class="username">{{ flowerUserList[4].username }}</span>
          <div class="user-coin-box">
            <img class="coin-pocket" src="@/assets/coin-pocket.png" alt="" />
            <span class="user-coin">{{ flowerUserList[4].coin }}</span>
          </div>
        </div>
        <button
          v-if="
            flowerUserList[4].username !== userInfo.username &&
            flowerUserList[4].liveStatus &&
            flowerUserList[4].cardStatus &&
            roomInfo.status == 2
          "
          @click="
            contrast(flowerUserList[roomInfo.activeUser.id], flowerUserList[4])
          "
        >
          比牌
        </button>
      </div>
      <div
        v-if="
          flowerUserList[4].cardStatus &&
          userInfo.username == flowerUserList[4].username
        "
        class="user-card"
      >
        <div v-for="(card, index) in flowerUserList[4].card" :key="index">
          <img class="card" :src="card.path" alt="" />
        </div>
      </div>
      <div v-else>
        <div class="nosee" :class="flowerUserList[4].liveStatus ? '' : 'lose'">
          <div v-if="flowerUserList[4].cardStatus" class="see-status">
            已看牌
          </div>
        </div>
      </div>
    </div>

    <div class="user5-box" :class="flowerUserList[5].liveStatus ? '' : 'lose'">
      <div
        class="userAvatar"
        :class="roomInfo.activeUser.id == flowerUserList[5].id ? 'active' : ''"
      >
        <img
          :src="flowerUserList[5].avatar"
          :class="flowerUserList[1].liveStatus ? '' : 'lose'"
          class="userAvatarImg"
          alt=""
        />
        <div class="coin-follow coin-follow5"></div>
        <div class="user-info">
          <span class="username">{{ flowerUserList[5].username }}</span>
          <div class="user-coin-box">
            <img class="coin-pocket" src="@/assets/coin-pocket.png" alt="" />
            <span class="user-coin">{{ flowerUserList[5].coin }}</span>
          </div>
        </div>
        <button
          v-if="
            flowerUserList[5].username !== userInfo.username &&
            flowerUserList[5].liveStatus &&
            flowerUserList[5].cardStatus &&
            roomInfo.status == 2
          "
          @click="
            contrast(flowerUserList[roomInfo.activeUser.id], flowerUserList[5])
          "
        >
          比牌
        </button>
      </div>
      <div
        v-if="
          flowerUserList[5].cardStatus &&
          userInfo.username == flowerUserList[5].username
        "
        class="user-card"
      >
        <div v-for="(card, index) in flowerUserList[5].card" :key="index">
          <img class="card" :src="card.path" alt="" />
        </div>
      </div>
      <div v-else>
        <div class="nosee" :class="flowerUserList[5].liveStatus ? '' : 'lose'">
          <div v-if="flowerUserList[5].cardStatus" class="see-status">
            已看牌
          </div>
        </div>
      </div>
    </div>

    <div
      class="operate"
      v-if="
        userInfo.username == roomInfo.activeUser.username &&
        roomInfo.status == 1
      "
    >
      <div class="coin-box">
        <div class="money-coin" @click="follow(1)">
          <img src="@/assets/images/coin_1.jpg" alt="" />
        </div>
        <div class="money-coin" @click="follow(2)">
          <img src="@/assets/images/coin_2.jpg" alt="" />
        </div>
        <div class="money-coin" @click="follow(5)">
          <img src="@/assets/images/coin_5.jpg" alt="" />
        </div>
        <div class="money-coin" @click="follow(10)">
          <img src="@/assets/images/coin_10.jpg" alt="" />
        </div>
        <div class="money-coin" @click="follow(20)">
          <img src="@/assets/images/coin_20.jpg" alt="" />
        </div>
      </div>
      <div class="operate-button">
        <button class="operate-btn" @click="follow()">跟注</button>
        <button class="operate-btn" @click="seeCard">看牌</button>
        <button class="operate-btn" @click="chooseOne">比牌</button>
        <button class="operate-btn" @click="loseCard">弃牌</button>
      </div>
    </div>

    <!-- 显示比牌结果框 -->
    <div v-if="winner" class="result">{{ winner.username }}赢了</div>
    <div v-if="messageTip" class="result">{{ messageTip }}</div>
  </div>
</template>

<script>
import { getCookie, setCookie, delCookie } from "../../utils/cookieUtil";
import { judge, contrastSameType } from "../../utils/business/judge";
import { randomNum } from "../../utils/otherUtils";
import {
  creatPoker,
  shufflePoker,
  orderPoker,
} from "../../utils/business/pocker";
import { sendOtherCards } from "../../network/flower";
import { getFlowerUserList, outFlowerRoom } from "../../network/room";
export default {
  data() {
    return {
      pokers: [],
      userInfo: {
        username: null,
        avatar: null,
        card: [],
        cardType: null,
        cardStatus: 0,
      },
      inOut: false,
      inOutMes: null,
      messageTip: null,
      userNumber: 0,
      aliveNumber: 0,
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
      },
      winner: null,
      flowerUserList: [
        {
          id: 0,
          avatar:
            "https://img1.baidu.com/it/u=3583591450,2292153595&fm=26&fmt=auto&gp=0.jpg",
          username: "等待玩家",
          card: [],
          cardType: null,
          coin: 0,
          isDown: 0,
          cardStatus: 0, //是否看牌 0未看,1看了
          liveStatus: 0, //是否弃牌或输 0输,1活着
        },
        {
          id: 1,
          avatar:
            "https://img1.baidu.com/it/u=3583591450,2292153595&fm=26&fmt=auto&gp=0.jpg",
          username: "等待玩家",
          card: [],
          cardType: null,
          coin: 0,
          isDown: 0,
          cardStatus: 0, //是否看牌 0未看,1看了
          liveStatus: 0, //是否弃牌或输 0输,1活着
        },
        {
          id: 2,
          avatar:
            "https://img1.baidu.com/it/u=3583591450,2292153595&fm=26&fmt=auto&gp=0.jpg",
          username: "等待玩家",
          card: [],
          cardType: null,
          coin: 0,
          isDown: 0,
          cardStatus: 0, //是否看牌 0未看,1看了
          liveStatus: 0, //是否弃牌或输 0输,1活着
        },
        {
          id: 3,
          avatar:
            "https://img1.baidu.com/it/u=3583591450,2292153595&fm=26&fmt=auto&gp=0.jpg",
          username: "等待玩家",
          card: [],
          cardType: null,
          coin: 0,
          isDown: 0,
          cardStatus: 0, //是否看牌 0未看,1看了
          liveStatus: 0, //是否弃牌或输 0输,1活着
        },
        {
          id: 4,
          avatar:
            "https://img1.baidu.com/it/u=3583591450,2292153595&fm=26&fmt=auto&gp=0.jpg",
          username: "等待玩家",
          card: [],
          cardType: null,
          coin: 0,
          isDown: 0,
          cardStatus: 0, //是否看牌 0未看,1看了
          liveStatus: 0, //是否弃牌或输 0输,1活着
        },
        {
          id: 5,
          avatar:
            "https://img1.baidu.com/it/u=3583591450,2292153595&fm=26&fmt=auto&gp=0.jpg",
          username: "等待玩家",
          card: [],
          cardType: null,
          coin: 0,
          isDown: 0,
          cardStatus: 0, //是否看牌 0未看,1看了
          liveStatus: 0, //是否弃牌或输 0输,1活着
        },
      ],
    };
  },
  computed: {
    roomId() {
      this.roomInfo.roomId = this.$route.params.roomId;
      return this.$route.params.roomId;
    },
  },
  created() {
    // window.addEventListener("beforeunload", (e) => this.beforeunloadHandler(e));
    //获取当前用户信息
    this.getUserInfo();
    console.log(this.roomId);
    let sendData = {
      userInfo: this.userInfo,
      roomId: this.roomId,
    };
    this.$socket.emit("toFlowerRoom", sendData);
    // this.distributeSet(this.flowerUserList);
    this.pokers = creatPoker();
  },
  mounted() {
    window.onbeforeunload = function (e) {
      e = e || window.event;
      // 兼容IE8和Firefox 4之前的版本
      if (e) {
        alert("22222");
        // e.returnValue = "您是否确认离开此页面-您输入的数据可能不会被保存";
      }
      alert("22222");
      // return "您是否确认离开此页面-您输入的数据可能不会被保存";
    };
    // window.onbeforeunload = this.beforeunloadHandler;
    // window.addEventListener("beforeunload", this.beforeunloadHandler);
  },
  beforeDestroy() {
    outFlowerRoom(this.roomInfo.roomId, this.userInfo.username).then(() => {
      let sendData = {
        userInfo: this.userInfo,
        roomId: this.roomId,
      };
      this.$socket.emit("outFlowerRoom", sendData);
    });
    // this.$socket.emit("outFlowerRoom", this.userInfo);
    window.removeEventListener("beforeunload", (e) =>
      this.beforeunloadHandler(e)
    );
  },
  methods: {
    //初始化一些数据
    initData() {
      // window.localStorage.setItem("roomInfo",this.roomInfo);
      var that = this;
      this.userNumber = 0;
      //计算房间内玩家的数量
      that.flowerUserList.forEach((user) => {
        if (user.username !== "等待玩家") {
          that.userNumber += 1;
        }
      });
    },

    //保存状态到localStorage
    saveStatus() {
      window.localStorage.setItem(
        "flowerUserList",
        JSON.stringify(this.flowerUserList)
      );
      window.localStorage.setItem("roomInfo", JSON.stringify(this.roomInfo));
      window.localStorage.setItem(
        "userNumber",
        JSON.stringify(this.userNumber)
      );
    },

    //获取localStorage中的信息
    getStatus() {
      let flowerUserList = JSON.parse(
        window.localStorage.getItem("flowerUserList")
      );
      let roomInfo = JSON.parse(window.localStorage.getItem("roomInfo"));
      let userNumber = JSON.parse(window.localStorage.getItem("userNumber"));
      this.flowerUserList = flowerUserList;
      this.roomInfo = roomInfo;
      this.userNumber = userNumber;
    },

    //非首局发牌
    sendNewCards() {
      //计算房间内玩家的数量
      this.initData();

      //分牌
      let pokers = creatPoker();
      var lastCards = 52;
      lastCards = lastCards - this.userNumber * 3;

      //清空每个玩家手中的牌
      for (let i = 0; i < this.userNumber; i++) {
        this.flowerUserList[i].card = [];
      }
      while (pokers.length > lastCards) {
        //只要牌堆的牌大于应该剩余牌数，玩家继续摸牌
        for (let i = 0; i < this.userNumber; i++) {
          //玩家轮流摸牌
          this.flowerUserList[i].card.push(pokers.pop());
        }
      }
      //socket通知每个用户更新状态和牌
      this.$socket.emit("sendNewCards", this.flowerUserList);
    },

    //发牌
    beginGame(pokers) {
      var that = this;

      //房间内人数
      this.initData();
      //首局随机选出先手玩家
      let activeUserId = randomNum(0, this.userNumber - 1);
      this.roomInfo.activeUser.id = activeUserId;
      this.roomInfo.activeUser.username =
        this.flowerUserList[activeUserId].username;
      this.$socket.emit("activeUser", this.roomInfo.activeUser);
      this.$socket.emit("sendPokers", pokers);
      this.userNumber = 0;
      var coinPic = document.getElementsByClassName("coin-follow");
      console.log(coinPic, "dadada");
      coinPic[0].style.transform = "scale(1) translate(200px)";
    },
    //跟注
    follow(coinNum) {
      let bottomCoin = 1;
      let activeUserId = this.roomInfo.activeUser.id;
      if (coinNum == null) {
        bottomCoin = this.roomInfo.bottomCoin;
        console.log(bottomCoin);
        //只选择了跟注,则跟注目前的底分倍数
        if (this.flowerUserList[activeUserId].cardStatus) {
          //看牌跟注
          this.flowerUserList[activeUserId].coin -= bottomCoin * 2;
          this.flowerUserList[activeUserId].isDown += bottomCoin * 2;
          this.roomInfo.coinPool += bottomCoin * 2;
        } else {
          //闷牌跟注
          this.flowerUserList[activeUserId].coin -= bottomCoin;
          this.flowerUserList[activeUserId].isDown += bottomCoin;
          this.roomInfo.coinPool += bottomCoin;
        }
      } else {
        //加倍
        if (this.flowerUserList[activeUserId].cardStatus) {
          //看牌加倍
          bottomCoin = coinNum / 2;
          this.flowerUserList[activeUserId].coin -= coinNum;
          this.flowerUserList[activeUserId].isDown += coinNum;
          this.roomInfo.coinPool += coinNum;
        } else {
          //闷牌加倍
          bottomCoin = coinNum;
          this.flowerUserList[activeUserId].coin -= coinNum;
          this.flowerUserList[activeUserId].isDown += coinNum;
          this.roomInfo.coinPool += coinNum;
        }
      }
      // let activeId = this.roomInfo.activeUser.id;
      // this.flowerUserList[activeId].coin -= 10;
      // this.flowerUserList[activeId].isDown += 10;
      // this.roomInfo.coinPool += 10;
      // console.log(bottomCoin);
      this.$socket.emit("coinPool", this.roomInfo.coinPool);
      this.$socket.emit("bottomCoin", bottomCoin);
      this.$socket.emit("follow", this.flowerUserList);
    },

    //看牌
    seeCard() {
      this.userInfo.cardStatus = 1;
      this.flowerUserList[this.roomInfo.activeUser.id].cardStatus = 1;
      console.log(this.flowerUserList[this.roomInfo.activeUser.id].card);
      this.$socket.emit("seeCard", this.roomInfo.activeUser.id);
    },

    //弃牌
    loseCard() {
      let that = this;
      if (this.aliveNumber - 1 == 1) {
        //弃牌后玩家只剩一个,本局结束

        //用户弃牌
        this.$socket.emit("loseCard", this.roomInfo.activeUser);

        this.flowerUserList.forEach((user) => {
          if (user.username != "等待玩家" && user.liveStatus) {
            //赢家
            this.roomInfo.lastWinner = user; //设为最近的赢家
          }
        });

        //使用socket更新所有用户的数据
        this.$socket.emit("nowGameEnd", this.roomInfo.lastWinner);
        //5秒后开始新的一局
        setTimeout(() => {
          that.sendNewCards();
        }, 5000);
      } else {
        this.aliveNumber -= 1;
        this.$socket.emit("loseCard", this.roomInfo.activeUser);
        this.$socket.emit("aliveNumber", this.aliveNumber);
      }
    },

    //选择一个进行比牌
    chooseOne() {
      let seeUser = 0;
      for (let i = 0; i < this.userNumber; i++) {
        if (
          this.flowerUserList[i].cardStatus &&
          this.flowerUserList[i].liveStatus
        ) {
          seeUser += 1;
        }
      }
      if (seeUser < 2) {
        this.showMessage("没有可比牌的用户");
      } else {
        this.roomInfo.status = 2;
        this.$socket.emit("chooseStatus", 2);
      }
    },

    showMessage(mes) {
      this.messageTip = mes;
      setTimeout(() => {
        this.messageTip = null;
      }, 2000);
    },

    //比牌
    contrast(user1, user2) {
      let result = null;
      if (user1.cardType < user2.cardType) {
        //用户1的牌大
        // return true;
        result = true;
      } else if (user1.cardType > user2.cardType) {
        // return false;
        result = false;
      } else {
        //同样的牌型
        // return contrastSameType(user1.card,user2.card)
        result = contrastSameType(user1.cardType, user1.card, user2.card);
      }

      if (result) {
        //当前用户赢了,被比较的用户输了
        let that = this;
        //将当前用户存活状态置为1,存活
        user1.liveStatus = 1;
        this.flowerUserList[user1.id].liveStatus = 1;

        //将被比较用户存活状态置为0,输
        user2.liveStatus = 0;
        this.flowerUserList[user2.id].liveStatus = 0;
        result = [user1, user2];
        //通知所有用户比牌结果
        this.$socket.emit("contrastResult", result);
        if (this.aliveNumber - 1 == 1) {
          this.flowerUserList.forEach((user) => {
            if (user.username != "等待玩家" && user.liveStatus) {
              //赢家
              this.roomInfo.lastWinner = user; //设为最近的赢家
            }
          });
          this.$socket.emit("nowGameEnd", this.roomInfo.lastWinner);
          setTimeout(() => {
            that.sendNewCards();
          }, 5000);
        } else {
          this.aliveNumber -= 1;
          this.$socket.emit("aliveNumber", this.aliveNumber);
        }
      } else {
        //被比较的赢了,当前用户输了
        user1.liveStatus = 0;
        this.flowerUserList[user1.id].liveStatus = 0;
        user2.liveStatus = 1;
        this.flowerUserList[user2.id].liveStatus = 1;
        result = [user1, user2];
        //通知所有用户比牌结果
        this.$socket.emit("contrastResult", result);
        if (this.aliveNumber - 1 == 1) {
          this.flowerUserList.forEach((user) => {
            if (user.username != "等待玩家" && user.liveStatus) {
              //赢家
              this.roomInfo.lastWinner = user; //设为最近的赢家
            }
          });
          this.$socket.emit("nowGameEnd", this.roomInfo.lastWinner);
          setTimeout(() => {
            this.sendNewCards();
          }, 5000);
        } else {
          this.aliveNumber -= 1;
          this.$socket.emit("aliveNumber", this.aliveNumber);
        }
      }
    },

    //显示比牌结果框
    showResult() {},

    //获取用户信息
    getUserInfo() {
      this.userInfo = JSON.parse(getCookie("userInfo"));
    },
    //浏览器或窗口关闭后的操作
    beforeunloadHandler(e) {
      // return "beforeunloadHandler被调用了";
      // outFlowerRoom(this.roomId, this.userInfo.username).then(() => {
      //   let sendData = {
      //     userInfo: this.userInfo,
      //     roomId: this.roomId,
      //   };
      //   this.$socket.emit("outFlowerRoom", sendData);
      // });
    },
  },
  sockets: {
    //用户进入斗地主房间
    inFlowerRoom: function (flowerUserList) {
      console.log(flowerUserList);
      if (flowerUserList.code == 200) {
        this.inOut = true;
        let newUsername =
          flowerUserList.data[flowerUserList.data.length - 1].username;
        this.inOutMes = newUsername + "用户加入了斗地主房间";
        setTimeout(() => {
          this.inOut = false;
        }, 3000);
        for (let i = 0; i < flowerUserList.data.length; i++) {
          this.flowerUserList[i].username = flowerUserList.data[i].username;
          this.flowerUserList[i].avatar = flowerUserList.data[i].avatar;
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
      this.inOut = true;
      let newUsername = data.username;
      this.inOutMes = newUsername + "用户退出了炸金花房间";
      setTimeout(() => {
        this.inOut = false;
      }, 3000);
    },

    //发牌
    sendPokers(pokers) {
      var that = this;
      //计算房间内玩家的数量
      console.log(this.userNumber);
      this.userNumber = 0;
      that.flowerUserList.forEach((user) => {
        if (user.username != "等待玩家") {
          that.userNumber += 1;
        }
      });
      this.aliveNumber = this.userNumber;
      var lastCards = 52;
      lastCards = lastCards - that.userNumber * 3;
      console.log(that.flowerUserList);
      while (pokers.length > lastCards) {
        //只要牌堆的牌大于应该剩余牌数，玩家继续摸牌
        for (let i = 0; i < that.userNumber; i++) {
          //玩家3人轮流摸牌
          that.flowerUserList[i].card.push(pokers.pop());
        }
      }
      this.roomInfo.status = 1;
      this.flowerUserList.forEach((user) => {
        if (user.username != "等待玩家") {
          user.liveStatus = 1;
          user.cardStatus = 0;
          user.cardType = judge(user.card);
        }
      });
    },

    //activeUser
    activeUser(activeUser) {
      this.roomInfo.activeUser.id = activeUser.id;
      this.roomInfo.activeUser.username = activeUser.username;
    },
    //跟注
    follow(flowerUserList) {
      this.initData();
      let activeId = this.roomInfo.activeUser.id;

      // let followUserImg = document.getElementsByClassName(
      //   "coin-follow" + activeId
      // );
      // var img = new Image();
      // img.src = "static/img/coin_20.a5c2309.jpg";
      // var img = document.createElement("img"); //创建一个标签
      // img.setAttribute("src", "./coin_20.jpg"); //给标签定义src链接
      // img.setAttribute("alt", "images");
      // followUserImg[0].appendChild(img); //放到指定的id里
      // followUserImg[0].style.transition = ".6s";
      // setTimeout(() => {
      //   followUserImg[0].style.transform = "scale(.5) translate(200px,200px)";
      // }, 0);

      while (!flowerUserList[(activeId + 1) % this.userNumber].liveStatus) {
        activeId += 1;
      }
      this.roomInfo.activeUser.id = (activeId + 1) % this.userNumber;
      this.roomInfo.activeUser.username =
        this.flowerUserList[(activeId + 1) % this.userNumber].username;
      console.log(this.roomInfo.activeUser.username);
      for (let i = 0; i < this.userNumber; i++) {
        this.flowerUserList[i].coin = flowerUserList[i].coin;
        this.flowerUserList[i].isDown = flowerUserList[i].isDown;
      }
    },

    //看牌
    seeCard(activeUserId) {
      this.flowerUserList[this.roomInfo.activeUser.id].cardStatus = 1;
    },

    //弃牌
    loseCard(activeUser) {
      let activeId = this.roomInfo.activeUser.id;
      this.flowerUserList[activeId].liveStatus = 0;
      while (
        !this.flowerUserList[(activeId + 1) % this.userNumber].liveStatus
      ) {
        activeId += 1;
      }
      this.roomInfo.activeUser.id = (activeId + 1) % this.userNumber;
      this.roomInfo.activeUser.username =
        this.flowerUserList[(activeId + 1) % this.userNumber].username;
    },

    //存活玩家数
    aliveNumber(aliveNumber) {
      this.aliveNumber = aliveNumber;
    },

    //等待比牌状态
    chooseStatus() {},

    //比牌结果
    contrastResult(result) {
      //发起比牌的人要减钱
      this.flowerUserList[result[0].id].coin -= this.roomInfo.bottomCoin * 2;
      //锅里加
      this.roomInfo.coinPool += this.roomInfo.bottomCoin * 2;

      if (result[0].liveStatus) {
        this.flowerUserList[result[0].id].liveStatus = 1;
        this.flowerUserList[result[1].id].liveStatus = 0;
        this.winner = this.flowerUserList[result[0].id];
      } else {
        this.flowerUserList[result[1].id].liveStatus = 1;
        this.flowerUserList[result[0].id].liveStatus = 0;
        this.winner = this.flowerUserList[result[1].id];
      }
      setTimeout(() => {
        this.roomInfo.status = 1;
        this.winner = null;
      }, 3000);
      let activeId = this.roomInfo.activeUser.id;
      while (
        !this.flowerUserList[(activeId + 1) % this.userNumber].liveStatus
      ) {
        activeId += 1;
      }
      this.roomInfo.activeUser.id = (activeId + 1) % this.userNumber;
      this.roomInfo.activeUser.username =
        this.flowerUserList[(activeId + 1) % this.userNumber].username;
      // console.log(winner);
    },

    //当前局结束
    nowGameEnd(winner) {
      console.log("nowgameend");
      this.$message({
        message: "本局已结束,5秒后自动开始下一局",
        type: "success",
      });
      this.flowerUserList[winner.id].coin += this.roomInfo.coinPool; //赢家的钱加上锅里的
      this.roomInfo.coinPool = 0; //锅里的钱置零
      this.roomInfo.lastWinner = winner; //最近的赢家
    },

    //非首局发牌
    sendNewCards(flowerUserList) {
      //局数加1
      this.roomInfo.gamesNumber += 1;
      //计算玩家数量
      this.initData();
      //设置存活玩家数量
      this.aliveNumber = this.userNumber;
      //设置为开局状态
      this.roomInfo.status = 1;
      //重置底分
      this.roomInfo.bottomCoin = 1;
      //重置用户的信息
      for (let i = 0; i < this.userNumber; i++) {
        this.flowerUserList[i].cardStatus = 0; //设置还未看牌
        this.flowerUserList[i].liveStatus = 1; //设置存活
        this.flowerUserList[i].card = [];
        this.flowerUserList[i].card.push(...flowerUserList[i].card); //设置新一局的牌
      }
      //设置上一局的赢家的下家为先手
      let activeUser =
        this.flowerUserList[
          (this.roomInfo.lastWinner.id + 1) % this.userNumber
        ];
      this.roomInfo.activeUser.username = activeUser.username;
      this.roomInfo.activeUser.id = activeUser.id;
    },

    //锅里的钱
    coinPool(coinPool) {
      this.roomInfo.coinPool = coinPool;
    },

    //底分
    bottomCoin(bottomCoin) {
      this.roomInfo.bottomCoin = bottomCoin;
    },
  },
};
</script>

<style lang="less">
@baseFont: 50;
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
.inout-msg {
  font-size: (20rem / @baseFont);
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, 0);
}
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
.userAvatar {
  width: (90rem / @baseFont);
  height: (100rem / @baseFont);
  display: flex;
  flex-wrap: wrap;
}
.userAvatarImg {
  border-radius: 50%;
  width: (55rem / @baseFont);
  height: (55rem / @baseFont);
  margin: 0 auto;
}
.user-info {
  width: (90rem / @baseFont);
  height: (60rem / @baseFont);
  line-height: (30rem / @baseFont);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: (10rem / @baseFont);
  color: white;
}
.username {
  width: (70rem / @baseFont);
  font-size: (10rem / @baseFont);
  display: flex;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-coin-box {
  width: (50rem / @baseFont);
  height: (30rem / @baseFont);
  // background-color: red;
  display: flex;
  justify-content: center;
}
.coin-pocket {
  width: 100%;
  height: 100%;
  margin-right: (10rem / @baseFont);
}
.userAvatar .coin-follow {
  position: absolute;
  display: inline-block;
}
.card-box {
  width: (170rem / @baseFont);
  height: (80rem / @baseFont);
}
.user-card {
  display: flex;
  flex-wrap: nowrap;
}
.nosee {
  width: (170rem / @baseFont);
  height: (80rem / @baseFont);
  line-height: (80rem / @baseFont);
  text-align: center;
  background-image: url("../../assets/nosee.png");
  background-size: 100% 100%;
  border-radius: (20rem / @baseFont);
}
.see-status {
  color: red;
  font-size: (20rem / @baseFont);
  font-weight: bold;
}
.card {
  width: (55rem / @baseFont);
  height: (80rem / @baseFont);
  border-radius: (5rem / @baseFont);
}
.user0-box {
  position: fixed;
  left: 2%;
  top: 38%;
  display: flex;
}
.user1-box {
  position: fixed;
  left: 20%;
  top: (20rem / @baseFont);
  display: flex;
}
.user2-box {
  position: fixed;
  left: 57%;
  top: (20rem / @baseFont);
  display: flex;
}
.user3-box {
  position: fixed;
  right: 2%;
  top: 38%;
  display: flex;
}
.user4-box {
  position: fixed;
  left: 20%;
  bottom: (70rem / @baseFont);
  display: flex;
}
.user5-box {
  position: fixed;
  left: 57%;
  bottom: (70rem / @baseFont);
  display: flex;
}
.active .user-info {
  color: red !important;
}
.result {
  height: (100rem / @baseFont);
  width: (300rem / @baseFont);
  font-size: (15rem / @baseFont);
  background-color: antiquewhite;
  border-radius: (15rem / @baseFont);
  position: fixed;
  margin: auto;
  top: (120rem / @baseFont);
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lose {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
}
.operate {
  height: (60rem / @baseFont);
  width: 100%;
  line-height: (60rem / @baseFont);
  background-color: rgb(32, 32, 32);
  position: absolute;
  left: (0rem / @baseFont);
  bottom: (0rem / @baseFont);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
}
.coin-box {
  // width: (100rem / @baseFont);
  display: flex;
}
.coin-box div {
  transition: 1s;
}
.coin-box:hover div {
  transform: scale(0.8);
}
.coin-box:hover div:hover {
  transform: scale(1.2) rotateX(360deg);
}
.operate-button {
  margin-left: (40rem / @baseFont);
  display: flex;
  justify-content: center;
  align-items: center;
}
.operate-btn {
  height: (30rem / @baseFont);
  width: (70rem / @baseFont);
  border-radius: 10%;
  margin-left: (20rem / @baseFont);
  background-color: darkgray;
  border: none;
  position: relative;
  // transform: scale(1.2);
  transition: 0.7s;
}
.operate-btn:hover {
  transform: scale(1.1);
  background-color: darkolivegreen;
}
.money-coin {
  width: (40rem / @baseFont);
  height: (40rem / @baseFont);
  font-size: (4rem / @baseFont);
  color: gold;
  font-weight: bold;
  margin-left: (20rem / @baseFont);
  img {
    width: (40rem / @baseFont);
    height: (40rem / @baseFont);
  }
}
</style>
