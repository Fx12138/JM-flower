<template>
  <div class="main-login">
    <div class="username-box">
      <span>用户名</span>
      <input
        type="text"
        v-model="ruleForm.username"
        class="form-control"
        placeholder="请输入用户名"
      />
    </div>
    <div class="password-box">
      <span>密码</span>
      <input
        type="password"
        v-model="ruleForm.password"
        class="form-control"
        placeholder="请输入用户名"
      />
    </div>
    <div class="log-option-button">
      <button type="primary" @click="login(ruleForm)" class="btn btn-primary">
        登录
      </button>
      <button type="primary" class="btn btn-primary">注册</button>
    </div>
  </div>
</template>
<script>
import { loginByUsername } from "@/network/login";
import { setCookie } from "../../utils/cookieUtil";
export default {
  data() {
    return {
      userName: null,
      password: null,
      ruleForm: {
        password: "",
        checkPass: "",
        username: "",
      },
    };
  },
  methods: {
    login(ruleForm) {
      loginByUsername(ruleForm).then((res) => {
        if (res.data.code == 200) {
          alert("submit!");
          setCookie("token", "zzyn", 3000);
          setCookie("userInfo", JSON.stringify(res.data.data), 3000);
          //用户信息存入vuex
          this.$store.commit("setUserInfo", res.data.data);
          this.$router.replace("/home");
          this.$parent.showNav = true;
        } else {
          alert(res.data.msg);
        }
      });
    },
  },
  components: {},
  created() {
    this.$parent.showNav = false;
  },
  mounted() {},
};
</script>
<style lang="less">
@baseFont: 50;
body {
  margin: 0 auto;
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

.main-login {
  margin-top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .username-box {
    display: flex;
    justify-content: center;
    span {
      width: (150rem / @baseFont);
      font-size: (20rem / @baseFont);
      text-align: justify;
      text-align-last: justify;
      margin-right: (20rem / @baseFont);
      color: aliceblue;
    }
    margin: (20rem / @baseFont);
  }

  .password-box {
    display: flex;
    justify-content: center;
    span {
      width: (150rem / @baseFont);
      font-size: (20rem / @baseFont);
      text-align: justify;
      text-align-last: justify;
      margin-right: (20rem / @baseFont);
      color: aliceblue;
    }
  }
}
.log-option-button {
  margin-top: (20rem / @baseFont);
  button {
    margin: (20rem / @baseFont);
    width: (100rem / @baseFont);
    font-weight: 300;
  }
}
</style>