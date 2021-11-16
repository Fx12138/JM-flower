<template>
  <div class="main-login">
    <div class="login-form">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="username">
          <el-form-item label="账号" prop="username">
            <el-input
              v-model="ruleForm.username"
              autocomplete="off"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
        </div>
        <div class="password">
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="login-botton">
      <el-button type="primary" @click="login('ruleForm')">登录</el-button>
      <el-button type="primary">注册</el-button>
    </div>
  </div>
</template>
<script>
import { loginByUsername } from "@/network/login";
import { setCookie } from "../../utils/cookieUtil";
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      callback();
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码必须大于等于六位数"));
      }

      callback();
    };
    return {
      userName: null,
      password: null,
      ruleForm: {
        password: "",
        checkPass: "",
        username: "",
      },
      rules: {
        password: [{ validator: validatePassword, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }],
        // checkPass: [{ validator: validatePass2, trigger: "blur" }],
        // age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          loginByUsername(this.ruleForm).then((res) => {
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
        } else {
          return false;
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
<style>
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/index3.jpeg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.main-login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.el-form-item__label {
  color: black;
  font-weight: bold;
}
/* .el-form-item__label{

} */
.password {
  margin-top: 40px;
}
.login-botton {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
</style>