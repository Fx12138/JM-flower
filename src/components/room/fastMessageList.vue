<template>
  <div class="box">
    <audio id="myAudio">
      <source src="@/assets/audios/test.mp3" type="audio/ogg" />
      您的浏览器不支持 audio 元素。
    </audio>
    <div
      class="fast-message-item"
      v-for="(item, index) in messageList"
      :key="index"
      @click="sendFastMessage(item)"
    >
      {{ item.title }}
    </div>
  </div>
</template>
<script>
import { getCookie, delCookie } from "@/utils/cookieUtil";
export default {
  data() {
    return {
      userInfo: null,
      messageList: [
        {
          id: 0,
          title: "在座的各位都是垃圾!",
          audioSrc: "laji",
        },
        {
          id: 1,
          title: "我牌很大,我加倍!",
          audioSrc: "jiabei",
        },
        {
          id: 2,
          title: "牌小的快走吧,让你少输点!",
          audioSrc: "follow",
        },
        {
          id: 3,
          title: "我人傻了啊!",
          audioSrc: "test",
        },
      ],
      myAudio: null,
    };
  },
  props: ["roomId"],
  methods: {
    init() {
      this.userInfo = JSON.parse(getCookie("userInfo"));
      this.messageList[0].audioSrc = require("@/assets/audios/laji.mp3");
      this.messageList[1].audioSrc = require("@/assets/audios/jiabei.mp3");
      this.messageList[2].audioSrc = require("@/assets/audios/kuaizou.mp3");
      this.messageList[3].audioSrc = require("@/assets/audios/shale.mp3");
      let myAudio = document.getElementById("myAudio");
      this.myAudio = myAudio;
    },
    //发送快捷语音消息
    sendFastMessage(message) {
      this.$socket.emit("sendFastMessage", {
        user: this.userInfo,
        messageId: message.id,
        roomId: this.roomId,
        messageContent: message.title,
      });
    },
  },
  sockets: {
    sendFastMessage(data) {
      //data是user messageId

      this.myAudio.src = this.messageList[data.data.messageId].audioSrc;
      this.myAudio.load();
      this.myAudio.play();
      this.$emit("sendFastMessage", data);
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
  //   background-color: red;
  width: 100%;
  height: 100%;
  border: solid black 0.5px;
  border-radius: 10%;
  background-color: antiquewhite;
  opacity: 0.8;
  padding: (7rem / @baseFont);
}
.fast-message-item {
  width: 100%;
  border-bottom: solid black 0.5px;
  //   height: (20rem / @baseFont);
}
</style>