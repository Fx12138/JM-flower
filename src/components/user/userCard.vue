<template>
  <div class="usercard-box">
    <div
      class="card-item"
      v-for="(card, index) in cardList"
      :key="index"
      :class="'card-item' + index"
    >
      <div class="card-top">
        <div class="card-number">{{ card.number }}</div>
        <div class="card-color">{{ card.color }}</div>
      </div>
      <div class="card-bottom">
        <div class="card-number">{{ card.number }}</div>
        <div class="card-color">{{ card.color }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["cardList"],
  data() {
    return {};
  },
  watch: {
    cardList: {
      handler(newValue, oldValue) {
        let cardElement = null;
        for (let i = 0; i < newValue.length; i++) {
          if (newValue[i].color == ("♥" || "♦"))
            cardElement = document.getElementsByClassName("card-item" + i)[0];
          if (cardElement) {
            cardElement.style.color = "red";
          }
        }
      },
      immediate: true,
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
.usercard-box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  .card-item {
    flex: 1;
    height: 100%;
    background-color: white;
    border-radius: (15rem / @baseFont);
    display: flex;
    flex-direction: column;

    margin-right: (2rem / @baseFont);
    div {
      flex: 1;
      margin-left: (2rem / @baseFont);
      .card-number {
        margin-top: (5rem / @baseFont);
        line-height: (15rem / @baseFont);
      }
      .card-color {
        line-height: (10rem / @baseFont);
        line-height: (15rem / @baseFont);
      }
    }

    .card-bottom {
      transform: rotate(180deg);
    }
  }
}
</style>