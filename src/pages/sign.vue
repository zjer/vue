<template>
  <el-container class="sign">
    <el-header></el-header>
    <el-main>
      <div class="signIn" v-show="toSignIn">
        <h2 class="sign-title">用户注册</h2>
        <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="80px">
          <el-form-item label="账号" prop="user">
            <el-input type="text" v-model="ruleForm1.user" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm1.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm1.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <span @click="toSign">已有账号，前往登陆</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitSignInForm('ruleForm1')">注册</el-button>
            <el-button @click="resetForm('ruleForm1')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="signUp" v-show="toSignUp">
        <h2 class="sign-title">用户登录</h2>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px">
          <el-form-item label="账号" prop="user">
            <el-input type="text" v-model="ruleForm2.user" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass" ref="clearPassValidate">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <span @click="toSign">没有账号，前往注册</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitSignUpForm('ruleForm2')">登录</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import { setStore } from "../config/mUtils";

  export default {
    name: "sign",
    data() {
      var validateUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入账号'));
        } else if (value.length < 3) {
          return callback(new Error('账号为3-10位字母或者数字'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 3) {
          return callback(new Error('密码为3-10位字母或者数字'));
        } else {
          if (this.ruleForm1.checkPass !== '') {
            this.$refs.ruleForm1.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm1.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        toSignIn: true,
        toSignUp: false,
        ruleForm1: {
          user: '',
          pass: '',
          checkPass: ''
        },
        ruleForm2: {
          user: '',
          pass: ''
        },
        rules1: {
          user: [
            { validator: validateUser, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        rules2: {
          user: [
            { validator: validateUser, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      if (!this.adminInfo.id) {
        this.getAdminData();
      }
    },
    computed: {
      ...mapState(['adminInfo'])
    },
    methods: {
      ...mapActions(["getAdminData"]),
      async toSign() {
        this.toSignIn = !this.toSignIn;
        this.toSignUp = !this.toSignUp;
      },
      async submitSignInForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = new URLSearchParams();
            params.append('uName', this.ruleForm1.user);
            params.append('uPass', this.ruleForm1.pass);
            this.$http.post('api/user/regist.do', params).then((res) => {
              console.log(res.data);
              if (res.data.state == 0) {
                this.$message({
                  type: 'success',
                  message: res.data.msg,
                  duration: 1000
                });
                setTimeout(() => {
                  this.toSign();
                }, 1000);
              } else if (res.data.state == 1) {
                this.$message({
                  type: 'error',
                  message: res.data.msg,
                  duration: 1000
                });
                setTimeout(() => {
                  this.resetForm('ruleForm1');
                }, 1000);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async submitSignUpForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = new URLSearchParams();
            params.append('uName', this.ruleForm2.user);
            params.append('uPass', this.ruleForm2.pass);
            this.$http.post(baseUrl, params).then((res) => {
              // console.log(res.data);
              if (res.data.state == 0) {
                this.$message({
                  type: 'success',
                  message: res.data.msg,
                  duration: 1000
                });
                setStore('user', res.data.data.name);
                setTimeout(() => {
                  this.$router.push('/index');
                }, 1000);
              } else if (res.data.state == 1) {
                this.$message({
                  type: 'error',
                  message: res.data.msg,
                  duration: 1000
                });
                setTimeout(() => {
                  this.toSign();
                }, 1000);
              } else if (res.data.state == 2) {
                this.$message({
                  type: 'error',
                  message: res.data.msg,
                  duration: 1000
                });
                setTimeout(() => {
                  this.ruleForm2.pass = '';
                }, 1000);
              }
            }).catch((res) => {
              console.log(res.data.msg);
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
