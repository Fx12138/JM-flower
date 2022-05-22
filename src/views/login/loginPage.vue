<template>
  <div class="login-page">
    <div class="box">
      <div id="main-box">
        <div class="login">
          <!-- <div class="username-box"></div> -->
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
              placeholder="请输入密码"
            />
          </div>

          <div class="log-option-button">
            <button
              type="primary"
              @click="login(ruleForm)"
              class="btn btn-primary"
            >
              登录
            </button>
          </div>
        </div>
        <div class="register">
          <div class="form-box">
            <div class="username-box">
              <span>用户名</span>
              <input
                type="text"
                v-model="registerForm.username"
                class="form-control"
                placeholder="请输入用户名"
              />
            </div>
            <div class="password-box">
              <span>密码</span>
              <input
                type="password"
                v-model="registerForm.password"
                class="form-control"
                placeholder="请输入密码"
              />
            </div>
          </div>

          <div
            class="register-button"
            @click="registerByUsername(registerForm)"
          >
            <img src="../../assets/loginButton.png" alt="" />
          </div>
        </div>
      </div>
      <div class="button-box">
        <div @click="change('login')" class="to-login">我要登录</div>
        <div @click="change('register')" class="to-register">我要注册</div>
      </div>
    </div>
  </div>
</template>
<script>
import { loginByUsername, register } from "@/network/login";
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
      registerForm: {
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
    registerByUsername(registerForm) {
      if (!registerForm.username || !registerForm.password) {
        alert("用户名或密码不能为空");
      }
      register(registerForm).then((res) => {
        if (res.data.code == 200) {
          alert("注册成功,请登录!");
          document.getElementById("main-box").style.transform =
            "perspective(900px) rotateY(0deg)";
          // setCookie("token", "zzyn", 3000);
          // setCookie("userInfo", JSON.stringify(res.data.data), 3000);
          // //用户信息存入vuex
          // this.$store.commit("setUserInfo", res.data.data);
          // this.$router.replace("/home");
          this.$parent.showNav = true;
        } else {
          alert(res.data.msg);
        }
      });
    },
    change(page) {
      switch (page) {
        case "login":
          document.getElementById("main-box").style.transform =
            "perspective(900px) rotateY(0deg)";
          break;
        case "register":
          document.getElementById("main-box").style.transform =
            "perspective(900px) rotateY(180deg)";
          document.getElementById("main-box").style.transform =
            "transform: perspective(900px) rotateY(180deg)";
          break;
      }
    },
  },
  components: {},
  created() {
    this.$parent.showNav = false;
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
@baseFont: 20;
.login-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/index3.jpeg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.box {
  width: (700rem / @baseFont);
  height: (400rem / @baseFont);
  border-radius: (50rem / @baseFont);
  position: relative;
  // background-color: red;

  #main-box {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: perspective(900px);
    transition: 2s;
    .login {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      backface-visibility: hidden;
      color: white;
      background: rgba(223, 246, 255, 0.4);
      border: 1px solid black;
      border-radius: (50rem / @baseFont);
      .username-box {
        width: 70%;
        height: (50rem / @baseFont);
        // flex: 1;
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
        width: 70%;
        height: (50rem / @baseFont);
        // flex: 1;
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
      .log-option-button {
        margin-top: (20rem / @baseFont);
        button {
          margin: (20rem / @baseFont);
          width: (100rem / @baseFont);
          font-weight: 300;
        }
      }
    }
    .register {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position: absolute;
      backface-visibility: hidden;
      color: white;
      transform: rotateY(180deg);
      background: rgba(186, 246, 255, 0.4);
      // border: 1px solid black;
      border-radius: (50rem / @baseFont);
      .register-button {
        margin-left: (50rem / @baseFont);
      }
    }
  }
  .button-box {
    padding: 0 (30rem / @baseFont);
    position: absolute;
    width: 100%;
    bottom: (10rem / @baseFont);
    text-align: center;
    display: flex;
    justify-content: space-between;
  }
}
.to-login {
  min-height: (50rem / @baseFont);
  min-width: (100rem / @baseFont);
  text-align: center;
  line-height: (50rem / @baseFont);
  background-image: url("../../assets/login-btn-blue.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
.to-register {
  height: (50rem / @baseFont);
  width: (100rem / @baseFont);
  line-height: (50rem / @baseFont);
  text-align: center;
  background-image: url("../../assets/login-btn-yellow.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}

.loginPage {
  transform: perspective(900px) rotateY(0deg);
}
.registerPage {
  transform: perspective(900px) rotateY(180deg);
}
</style>