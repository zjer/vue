<template>
  <el-container>
    <div class="signIn" v-show="toSignIn">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px">
        <el-form-item label="账号" prop="user">
          <el-input type="text" v-model="ruleForm2.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nick">
          <el-input type="text" v-model="ruleForm2.nick" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <p @click="toSign">已有账号，前往登陆</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitSignInForm('ruleForm2')">注册</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="signUp" v-show="toSignUp">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px">
        <el-form-item label="账号" prop="user">
          <el-input type="text" v-model="ruleForm2.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <p @click="toSign">没有账号，前往注册</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitSignUpForm('ruleForm2')">登录</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script>
  export default {
    name: "sign",
    data() {
      var checkUser = (rule, value, callback) => {
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
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var checkNick = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入昵称'));
        }
      };
      return {
        toSignIn: true,
        toSignUp:false,
        ruleForm2: {
          user: '',
          pass: '',
          checkPass: '',
          nick: ''
        },
        rules2: {
          user: [
            { validator: checkUser, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          nick: [
            { validator: checkNick, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      toSign() {
        setTimeout(() => {
          this.toSignIn = !this.toSignIn;
          this.toSignUp = !this.toSignUp;
        }, 1000);
      },
      submitSignInForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitSignUpForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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

<style scoped lang=less>

</style>
