<template>
  <div class="box-1">
    <div class="search-box">
      <button class="search-button" @click="inRoom">
        <span class="glyphicon glyphicon-search" aria-hidden="true"></span
        >搜索房间
      </button>
      <input type="text" v-model="roomId" placeholder="请输入房间号" />
    </div>

    <div class="room-items">
      <room-item
        class="room-item"
        v-for="room in rooms"
        :key="room.id"
        :room="room"
      ></room-item>
    </div>
    <div class="create-box">
      <button class="create-button" data-toggle="modal" data-target="#myModal">
        创建房间
      </button>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="myModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="myModalLabel">请输入房间信息</h4>
            <img src="../../assets/create-team.png" alt="" />
          </div>
          <div class="modal-body">
            <div
              class="alert alert-danger alert-dismissible fade in"
              id="nullRoomNameAlert"
              v-if="showAlert"
            >
              房间名不能为空
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form action="">
              <div class="form-floating mb-3">
                <label for="">房间名</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="请输入房间名"
                  v-model="newRoomName"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">
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
  </div>
</template>
<script>
import { getCookie, delCookie } from "@/utils/cookieUtil";
import RoomItem from "./roomItem.vue";
import { inFlowerRoom, createRoom } from "@/network/room";
export default {
  data() {
    return {
      roomId: null,
      userInfo: {},
      newRoomName: null,
      showAlert: false,
    };
  },
  props: ["rooms"],
  methods: {
    init() {
      this.userInfo = JSON.parse(getCookie("userInfo"));
    },
    //进入房间
    inRoom: function () {
      inFlowerRoom(this.roomId, this.userInfo).then((res) => {
        if (res.data.code == 200) {
          this.$router.push("/flowerRoom/" + this.room.roomId);
        } else {
          alert(res.data.msg);
        }
      });
    },
    //创建房间
    newRoom(newRoomName) {
      if (newRoomName == null) {
        //填的为空
        this.showAlert = true;
      } else {
        createRoom(newRoomName, this.userInfo).then((res) => {
          if (res.data.code == 200) {
            // console.log(res.data.data);
            $("#myModal").modal("toggle");
            this.$router.push("/flowerRoom/" + res.data.data.roomId);
          } else {
            alert(res.data.msg);
          }
        });
      }
      //   $("#myModal").modal("toggle");
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
@baseFont: 50;
.box-1 {
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border-radius: (20rem / @baseFont);
  position: relative;
  .search-box {
    box-sizing: border-box;
    width: 100%;
    height: (60rem / @baseFont);
    line-height: (60rem / @baseFont);
    padding-top: (20rem / @baseFont);
    padding-right: (35rem / @baseFont);
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row-reverse;
    font-size: (15rem / @baseFont);
    input {
      height: (25rem / @baseFont);
    }
    .search-button {
      margin-left: (20rem / @baseFont);
      height: (30rem / @baseFont);
      //   width: (80rem / @baseFont);
      line-height: (30rem / @baseFont);
      border-radius: 10%;
      text-align: center;
      background-color: skyblue;
      border: 0;
      transition: 0.3s;
      font-size: (15rem / @baseFont);
    }
    .search-button:hover {
      transform: scale(1.1);
      font-weight: 1000;
    }
  }
  .room-items {
    // padding-bottom: (30rem / @baseFont);
    width: 100%;
    height: (420rem / @baseFont);
    // background-color: red;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    overflow: auto;
  }
  .create-box {
    margin-top: (15rem / @baseFont);
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    padding-right: (30rem / @baseFont);
    margin-bottom: (30rem / @baseFont);
    .create-button {
      height: (50rem / @baseFont);
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
      box-shadow: 0px (5rem / @baseFont) 0px rgba(219, 31, 5, 1),
        0px (5rem / @baseFont) (5rem / @baseFont) rgba(0, 0, 0, 0.7);
    }
  }
}

//bootstrap
.modal-header {
  text-align: center;
  img {
    width: (200rem / @baseFont);
    height: (200rem / @baseFont);
    background-color: white;
  }
}
</style>