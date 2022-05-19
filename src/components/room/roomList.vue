<template>
  <div class="box-1">
    <div class="search-box">
      <button class="search-button" @click="searchRoom(inputRoomId)">
        <span class="glyphicon glyphicon-search" aria-hidden="true"></span
        >搜索房间
      </button>
      <input
        type="text"
        class="form-control"
        v-model="inputRoomId"
        placeholder="请输入房间号"
      />
    </div>

    <div class="room-items-box">
      <div class="room-items">
        <div class="rooms-box"></div>
        <room-item
          class="room-item"
          v-for="room in rooms"
          :key="room.roomId"
          :room="room"
          @click.native="inRoom(room)"
        ></room-item>
      </div>
    </div>

    <div class="create-box">
      <button
        class="create-button"
        data-bs-toggle="modal"
        data-bs-target="#roomModal"
      >
        创建房间
      </button>
    </div>

    <!-- 新建房间Modal -->
    <div
      class="modal fade"
      id="roomModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <img src="../../assets/create-team.png" alt="" />

            <h4 class="modal-title" id="myModalLabel">请输入房间信息</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <div class="alert alert-danger" role="alert" v-if="showAlert">
              {{ alertMessage }}
            </div>

            <form action="">
              <div class="form-floating mb-3">
                <input
                  v-model="newRoomName"
                  type="email"
                  class="form-control"
                  id="roomNameInput"
                  placeholder="请输入房间名"
                />
                <label for="roomNameInput">房间名</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  v-model="newRoomPassword"
                  type="email"
                  class="form-control"
                  id="passwordInput"
                  placeholder="请输入房间密码"
                />
                <label for="passwordInput">房间密码</label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              关闭
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="newRoom(newRoomName)"
            >
              创建
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 密码Modal -->
    <div
      class="modal fade"
      id="passwordModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <img src="../../assets/lock.png" alt="" />

            <h4 class="modal-title" id="myModalLabel">请输入房间密码</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <div class="alert alert-danger" role="alert" v-show="showAlert">
              {{ alertMessage }}
            </div>

            <form action="">
              <div class="form-floating mb-3">
                <input
                  v-model="inRoomPassword"
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="请输入房间密码"
                />
                <label for="floatingInput">房间密码</label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              关闭
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="vertifyPassword(inRoomPassword)"
            >
              进入
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCookie, delCookie } from "@/utils/cookieUtil";
import RoomItem from "./roomItem.vue";
import { inFlowerRoom, createRoom, getRoomById } from "@/network/room";
export default {
  data() {
    return {
      inputRoomId: null,
      clickRoomId: null,
      userInfo: {},
      newRoomName: null,
      newRoomPassword: null,
      showAlert: false,
      alertMessage: "错误",
      inRoomPassword: null,
      roomModal: null,
      passwordModal: null,
    };
  },
  props: ["rooms"],
  methods: {
    init() {
      this.userInfo = JSON.parse(getCookie("userInfo"));
      //初始化roomModal
      this.roomModal = new bootstrap.Modal(
        document.getElementById("roomModal"),
        {
          keyboard: true,
        }
      );
      var myModalEl = document.getElementById("roomModal");
      myModalEl.addEventListener("hide.bs.modal", function (event) {
        this.showAlert = false;
      });

      //初始化passwordModal
      this.passwordModal = new bootstrap.Modal(
        document.getElementById("passwordModal"),
        {
          keyboard: true,
        }
      );
    },

    //搜索房间
    searchRoom(roomId) {
      getRoomById(roomId).then((res) => {
        this.clickRoomId = roomId;

        if (res.data.data) {
          let userInRoom = false;
          for (let i = 0; i < res.data.data.flowerUserList.length; i++) {
            if (
              res.data.data.flowerUserList[i].username == this.userInfo.username
            ) {
              userInRoom = true;
            }
          }
          if (userInRoom) {
            //用户已经在房间里则直接进入
            this.$router.push("/flowerRoom/" + this.clickRoomId);
          } else {
            //用户没在房间里
            if (res.data.data.password) {
              //房间有密码
              let passwordModal = this.passwordModal;
              passwordModal.toggle();
            } else {
              //房间没密码
              inFlowerRoom(
                room.roomId,
                this.userInfo,
                this.inRoomPassword
              ).then((res) => {
                if (res.data.code == 200) {
                  this.$router.push("/flowerRoom/" + this.clickRoomId);
                  let sendData = {
                    userInfo: this.userInfo,
                    roomId: this.clickRoomId,
                  };
                  this.$socket.emit("toFlowerRoom", sendData);
                } else {
                  this.alertMessage = res.data.msg;
                  this.showAlert = true;
                }
              });
            }
          }
        } else {
          alert("房间不存在");
        }
      });
    },

    //进入房间
    inRoom: function (room) {
      console.log(room.password);
      this.clickRoomId = room.roomId;

      getRoomById(this.clickRoomId).then((res) => {
        let userInRoom = false;
        for (let i = 0; i < res.data.data.flowerUserList.length; i++) {
          if (
            res.data.data.flowerUserList[i].username == this.userInfo.username
          ) {
            userInRoom = true;
          }
        }
        if (userInRoom) {
          //用户已经在房间里则直接进入
          this.$router.push("/flowerRoom/" + this.clickRoomId);
        } else {
          //用户没在房间里
          if (res.data.data.password) {
            //房间有密码
            let passwordModal = this.passwordModal;
            passwordModal.toggle();
          } else {
            //房间没密码

            inFlowerRoom(room.roomId, this.userInfo, this.inRoomPassword).then(
              (res) => {
                if (res.data.code == 200) {
                  this.$router.push("/flowerRoom/" + this.clickRoomId);
                  let sendData = {
                    userInfo: this.userInfo,
                    roomId: this.clickRoomId,
                  };
                  this.$socket.emit("toFlowerRoom", sendData);
                } else {
                  this.alertMessage = res.data.msg;
                  this.showAlert = true;
                }
              }
            );
          }
        }
      });
    },
    vertifyPassword(password) {
      inFlowerRoom(this.clickRoomId, this.userInfo, password).then((res) => {
        if (res.data.code == 200) {
          let passwordModal = this.passwordModal;
          passwordModal.toggle();
          this.$router.push("/flowerRoom/" + this.clickRoomId);
          let sendData = {
            userInfo: this.userInfo,
            roomId: this.clickRoomId,
          };
          this.$socket.emit("toFlowerRoom", sendData);
        } else {
          this.alertMessage = res.data.msg;
          this.showAlert = true;
        }
      });
    },
    //创建房间
    newRoom(newRoomName) {
      if (newRoomName == null) {
        //填的为空
        this.showAlert = true;
        this.alertMessage = "房间名不能为空";
      } else {
        createRoom(newRoomName, this.userInfo, this.newRoomPassword).then(
          (res) => {
            if (res.data.code == 200) {
              let roomModal = this.roomModal;
              roomModal.toggle();
              this.$router.push("/flowerRoom/" + res.data.data.roomId);
            } else {
              alert(res.data.msg);
            }
          }
        );
      }
    },
  },
  components: { RoomItem },
  created() {},
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
@baseFont: 20;
.box-1 {
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  // flex-wrap: wrap;
  flex-direction: column;
  border-radius: (20rem / @baseFont);
  position: relative;
  font-size: (1rem / @baseFont);
  .search-box {
    box-sizing: border-box;
    width: 100%;
    // height: 10%;
    flex: 1;

    padding-top: (3rem / @baseFont);
    overflow: hidden;
    padding-right: 7%;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row-reverse;
    input {
      height: 90%;
      width: 16%;
      max-height: (45rem / @baseFont);
      font-size: (1rem / @baseFont);
    }
    .search-button {
      margin-left: (20rem / @baseFont);
      height: 90%;
      max-height: (45rem / @baseFont);
      text-align: center;
      border-radius: 10%;
      text-align: center;
      background-color: skyblue;
      border: 0;
      transition: 0.3s;
      font-size: (1rem / @baseFont);
    }
    .search-button:hover {
      transform: scale(1.1);
      font-weight: 1000;
    }
  }
  .room-items-box {
    flex: 7;
    // padding: (3rem / @baseFont) (10rem / @baseFont);
    width: 100%;
    overflow: auto;
    display: flex;
    justify-content: center;
    // align-items: center;
    align-content: flex-start;
    .room-items {
      width: 100%;
      // background-color: aqua;
      display: flex;
      flex-wrap: wrap;

      justify-content: center;
      align-content: flex-start;
    }
  }

  .create-box {
    margin-top: auto;
    box-sizing: border-box;
    width: 100%;
    flex: 2;
    // height: 15%;
    max-height: (80rem / @baseFont);
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding-right: 5%;
    .create-button {
      height: 80%;
      max-height: (80rem / @baseFont);
      border: 0;
      color: rgba(255, 255, 255, 1);
      text-decoration: none;
      text-align: center;
      background-color: rgba(219, 87, 51, 1);
      font-weight: 700;
      font-size: (30rem / @baseFont);
      display: block;
      //   padding: (5rem / @baseFont);
      border-radius: (20rem / @baseFont);
      /* let's use box shadows to make the button look more 3-dimensional */
      box-shadow: 0px (2rem / @baseFont) 0px rgba(219, 31, 5, 1),
        0px (2rem / @baseFont) (2rem / @baseFont) rgba(0, 0, 0, 0.7);
    }
  }
}

//bootstrap
.modal-header {
  text-align: center;
  img {
    width: (80rem / @baseFont);
    height: (80rem / @baseFont);
    background-color: white;
  }
}
</style>