<template>
<!--  <div class="login-container">-->
<!--    <div class="login-form">-->
<!--      <div class="d1">-->
<!--        <img src="../../assets/image/login/bg_m2.png" alt="">-->
<!--      </div>-->
<!--      <div class="d1 d3">-->
<!--        <el-form class="d2" ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="on"-->
<!--                 label-position="left"-->
<!--        >-->
<!--          <div class="loginT1">找回密码</div>-->
<!--          <p>-->
<!--            <span class="loginP1">联通助理</span>-->
<!--            <span class="loginP2">挂短名片业务自助服务平台</span>-->
<!--          </p>-->
<!--          <el-form-item prop="account">-->
<!--        <span class="svg-container">-->
<!--          <svg-icon icon-class="yhm"/>-->
<!--        </span>-->
<!--            <el-input-->
<!--              ref="username"-->
<!--              v-model="loginForm.account"-->
<!--              placeholder="请输入用户名或者手机号"-->
<!--              name="username"-->
<!--              type="text"-->
<!--              tabindex="1"-->
<!--              auto-complete="off"-->
<!--            />-->
<!--          </el-form-item>-->

<!--          <el-form-item prop="validCode">-->
<!--        <span class="svg-container">-->
<!--          <svg-icon icon-class="shouji"/>-->
<!--        </span>-->
<!--            <el-input-->
<!--              ref="password"-->
<!--              v-model="loginForm.validCode"-->
<!--              placeholder="请输入短信验证码"-->
<!--              tabindex="2"-->
<!--              auto-complete="off"-->
<!--            />-->
<!--            <span class="show-pwd">-->
<!--              <div v-if="codeTime <= 0" @click="forgetPwdData" class="hqyzm">获取验证码</div>-->
<!--              <div v-else class="hqyzm">{{ codeTime }} 秒后重试</div>-->
<!--            </span>-->
<!--          </el-form-item>-->
<!--          <div class="texttips">-->
<!--            <svg-icon icon-class="yiwen"/>-->
<!--            短信验证码收不到? <span class="ss" @click="voiceValid">试试语音验证码</span>-->
<!--          </div>-->
<!--          <el-form-item prop="code">-->
<!--        <span class="svg-container">-->
<!--          <svg-icon icon-class="yanzm"/>-->
<!--        </span>-->
<!--            <el-input-->
<!--              ref="password"-->
<!--              v-model="loginForm.code"-->
<!--              placeholder="请输入验证码"-->
<!--              name="password"-->
<!--              tabindex="2"-->
<!--              auto-complete="off"-->
<!--              @keyup.enter.native="handleLogin"-->
<!--            />-->
<!--            <div class="show-pwd">-->
<!--              <img @click="codeData" class="code" :src="loginForm.img" alt="">-->
<!--            </div>-->
<!--          </el-form-item>-->

<!--          <div class="footerBut">-->
<!--            <el-button round :loading="loading" type="primary"-->
<!--                       @click.native.prevent="handleLogin"-->
<!--            >确定-->
<!--            </el-button>-->

<!--            <el-button round :loading="loading" type="primary"-->
<!--                       plain-->
<!--                       @click="handleReturn"-->
<!--            >取消-->
<!--            </el-button>-->
<!--          </div>-->
<!--        </el-form>-->
<!--      </div>-->
<!--    </div>-->
<!--    <el-dialog title="请输入新密码"-->
<!--               :visible.sync="newPwdForm.open"-->
<!--               append-to-body-->
<!--               :close-on-click-modal="false"-->
<!--               :close-on-press-escape="false"-->
<!--               :show-close="false"-->
<!--    >-->
<!--      <el-form size="small" :model="newPwdForm" ref="newPwdForm" :rules="rules" label-width="90px">-->
<!--        <el-form-item label="新密码" prop="pwd">-->
<!--          <el-input type="password" v-model="newPwdForm.pwd" placeholder="请输入新密码"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="确认密码" prop="confirmPwd">-->
<!--          <el-input type="password" v-model="newPwdForm.confirmPwd" placeholder="请再次输入新密码"></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button size="small" type="primary" @click="subData('newPwdForm')">修 改</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
<!--  </div>-->
</template>

<script>
import { voidPwd } from '@/utils/validate'
import { code, forgetPwd, resetPwdByCode } from '@/api/user'
import { getResetSafeCode, resetLoginPwd } from '@/api/system'

export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (!voidPwd(value)) {
        callback(new Error('密码长度要求6-18位，必要由字母、字符及数字组成!'))
      } else {
        callback()
      }
    }
    const resetPassword = (rule, value, callback) => {
      if (value === '' || value === null) {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.newPwdForm.pwd) {
        callback(new Error('两次密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      codeTime: 0,
      loginForm: {
        account: '',
        validCode: '',
        code: ''
      },
      newPwdForm: {
        open: false,
        pwd: '',
        safeCode: '',
        confirmPwd: ''
      },
      rules: {
        pwd: [
          { required: true, message: '请输入新密码' },
          { validator: validatePassword }
        ],
        confirmPwd: [
          { required: true, message: '请再次输入新密码' },
          { validator: resetPassword }
        ]
      },
      loginRules: {
        account: [{ required: true, trigger: 'blur', message: '请输入账号' }],
        validCode: [{ required: true, trigger: 'blur', message: '请输入短信验证码' }],
        code: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      },
      loading: false,
      redirect: undefined,
      timeIn: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    const codeTime = localStorage.getItem('codeTime')
    if (codeTime > 0) {
      this.codeTime = codeTime
      this.interTime()
    }
    // 获取验证码
    this.codeData()
  },
  methods: {
    subData(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const params = {
            'confirmPwd': this.newPwdForm.confirmPwd,
            'pwd': this.newPwdForm.pwd,
            'safeCode': this.newPwdForm.safeCode
          }
          resetLoginPwd(params).then(res => {
            this.newPwdForm.open = false
            this.$message.success('修改成功！')
            // this.handleReturn()
          })
        }
      })
    },
    voiceValid() {
      const data = {
        account: this.loginForm.account,
        validType: 2
      }
      if (!data.account) {
        this.$message.warning('请输入用户名或者手机号！')
        return
      }
      if (this.codeTime >= 1) {
        this.$message.warning('请勿重复点击！')
        return
      }
      forgetPwd(data).then(res => {
        this.$message.success(res.message)
        this.loginForm.safeCode = res.data.safeCode
        this.codeTime = 60
        this.interTime()
      })
    },
    forgetPwdData() {
      const data = {
        account: this.loginForm.account,
        validType: 1
      }
      if (!data.account) {
        this.$message.warning('请输入用户名或者手机号！')
        return
      }
      forgetPwd(data).then(res => {
        this.$message.success(res.message)
        this.loginForm.safeCode = res.data.safeCode
        this.codeTime = 60
        this.interTime()
      })
    },
    interTime() {
      this.timeIn = setInterval(() => {
        this.codeTime--
        localStorage.setItem('codeTime', this.codeTime)
        if (this.codeTime <= 0) {
          clearInterval(this.timeIn)
        }
      }, 1000)
    },
    handleReturn() {
      this.$router.replace('/login')
    },
    codeData() {
      code().then(res => {
        const data = res
        this.loginForm.img = 'data:image/jpeg;base64,' + data.img
        this.loginForm.uuid = data.uuid
        this.$forceUpdate()
      })
    },
    handleLogin() {
      console.log(this.loginForm.safeCode)
      if (!this.loginForm.safeCode) {
        this.$message.warning('验证码已失效，请重新发送！')
        return
      }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const params = {
            'account': this.loginForm.account,
            'safeCode': this.loginForm.safeCode,
            'validCode': this.loginForm.validCode
          }
          getResetSafeCode(params).then(res => {
            this.loading = false
            this.$message.success(res.message)
            this.newPwdForm.safeCode = res.data
            this.newPwdForm.open = true
          }).catch(e => {
            this.loading = false
            this.codeData()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #e9f3ff;
  $light_gray: #333;
  $cursor: #333;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 40px;
      width: 85%;

      input {
        background: #e9f3ff;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 40px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: #e9f3ff;
      border-radius: 30px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $dark_gray: #999;
  $light_gray: #333;
  .hqyzm {
    background: #ffd300;
    color: #000000;
    border-radius: 20px;
    padding: 0 12px;
    height: 38px;
  }

  .ss {
    color: #bea042;
    cursor: pointer;
  }

  .loginT1 {
    color: #5babde;
    font-weight: bold;
    font-size: 30px;
    padding-left: 8px;
    border-left: 3px solid #5babde;
  }

  .loginP1 {
    font-size: 28px;
  }

  .loginP2 {
    font-size: 26px;
  }

  .login-container {
    min-height: 100%;
    width: 100%;
    height: 100%;
    background: url("../../assets/image/login/loginbg.jpg") no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    display: flex;
    align-items: center;

    .login-form {
      position: relative;
      background: #ffffff;
      border-radius: 30px;
      box-sizing: border-box;
      width: 1000px;
      height: 460px;
      max-width: 100%;
      margin: 0 auto;
      overflow: hidden;
      display: flex;

      img {
        width: 100%;
      }

      .d1 {
        flex: 1;
        display: flex;
        align-items: center;
      }

      .d2 {
        width: 100%;
        box-sizing: border-box;
        padding: 80px 32px 100px 0;
      }

      .d3 {
        min-width: 300px;
      }
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 0 5px 0 15px;
      color: $dark_gray;
      vertical-align: middle;
      font-size: 20px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 2px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;

      .code {
        width: 100px;
        //height: 20px;
      }
    }

    .footerBut {
      display: flex;

      > button {
        flex: 1;
      }
    }
  }
</style>
