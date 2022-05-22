<template>
  <div class="contrast-box">
    <div class="contrastinger-box" id="contrastinger-box">
      <img class="contrastinger-avatar" :src="contrastinger.avatar" alt="" />
      <div class="contrastinger-username">{{ contrastinger.username }}</div>
    </div>

    <div class="vs"><img src="../../assets/vs.png" alt="" /></div>

    <div class="contrasteder-box" id="contrasteder-box">
      <img class="contrasteder-avatar" :src="contrasteder.avatar" alt="" />
      <div class="contrasteder-username">{{ contrasteder.username }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["contrastinger", "contrasteder", "roomInfo"],
  watch: {
    roomInfo: {
      handler(newValue, oldValue) {
        if (newValue != 3) {
          let contrastingerBox = document.getElementById("contrastinger-box");
          contrastingerBox.classList.remove("loser");
          contrastingerBox.classList.remove("winner");
          let contrastederBox = document.getElementById("contrasteder-box");
          contrastederBox.classList.remove("loser");
          contrastederBox.classList.remove("winner");
        }
      },
      deep: true,
    },
    contrastinger: {
      handler(newValue, oldValue) {
        if (newValue.isLoser === true) {
          document.getElementById("contrastinger-box").classList.add("loser");
        } else if (newValue.isLoser === false) {
          document.getElementById("contrastinger-box").classList.add("winner");
        }
      },
      //   immediate: true,
      deep: true,
    },
    contrasteder: {
      handler(newValue, oldValue) {
        if (newValue.isLoser === true) {
          document.getElementById("contrasteder-box").classList.add("loser");
        } else if (newValue.isLoser === false) {
          document.getElementById("contrasteder-box").classList.add("winner");
        }
      },
      //   immediate: true,
      deep: true,
    },
  },
  methods: {
    init() {},
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
.contrast-box {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  border-top: (5rem / @baseFont) solid gold;
  border-bottom: (5rem / @baseFont) solid gold;
  .contrastinger-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .contrastinger-username {
      color: white;
      height: 40%;
      font-weight: 500;
      font-size: (30rem / @baseFont);
    }
    img {
      width: 60%;
      height: 60%;
    }
  }
  .vs {
    flex: 1;
    justify-content: center;
    align-items: center;
    img {
      width: 90%;
      height: 90%;
    }
  }
  .contrasteder-box {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    .contrasteder-username {
      color: white;
      height: 40%;
      font-weight: 500;
      font-size: (30rem / @baseFont);
    }
    img {
      width: 60%;
      height: 60%;
    }
  }
  .loser {
    filter: grayscale(100%);
    transition: 2s;
    transform: scale(0.7);
  }
  .winner {
    transition: 2s;
    transform: scale(1.2);
  }
}
</style>