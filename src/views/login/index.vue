<template>
  <div class="login-container">
    <div class="login-form">
      <div class="d1">
        <img class="tip-img" src="../../assets/image/login/l_bg.png" alt="">
      </div>
      <div class="d1 d3">
        <el-form
          ref="loginForm"
          class="d2"
          :model="loginForm"
          :rules="loginRules"
          auto-complete="on"
          label-position="left"
        >
          <div class="loginT1">欢迎光临</div>
          <p>
            <span class="loginP1">联通助理</span>
            <span class="loginP2">挂短名片业务自助服务平台</span>
          </p>
          <template v-if="status">
            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="yhm" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="请输入用户名"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="off"
                @keyup.enter.native="handleLogin"
              />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="mima" />
              </span>
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
            </el-form-item>
            <el-form-item prop="phoneCode" style="position: relative">
              <span class="svg-container">
                <svg-icon icon-class="yanzm" />
              </span>
              <el-input
                v-model="loginForm.phoneCode"
                placeholder="请输入手机验证码"
                type="text"
              />
              <div class="verify-code">
                <el-button
                  :disabled="!codeStatus"
                  :style="{'background-color':codeStatus ?'#409EFF':'#bbb'}"
                  style="border-radius: 40px;color:#fff;width:100%"
                  @click.native.prevent="getphonecode"
                >{{ codeTip }}</el-button>
              </div>
            </el-form-item>

            <el-form-item prop="code">
              <span class="svg-container">
                <svg-icon icon-class="yanzm" />
              </span>
              <el-input
                v-model="loginForm.code"
                placeholder="请输入验证码"
                tabindex="2"
                @keyup.enter.native="handleLogin"
              />
              <div class="show-pwd">
                <img class="code" :src="loginForm.img" alt="" @click="codeData">
              </div>
            </el-form-item>
            <el-button
              round
              :loading="loading"
              type="primary"
              style="width:100%;"
              @click.native.prevent="handleLogin"
            >确定
            </el-button>
          </template>

          <template v-if="!status">
            <el-form-item prop="bingusername">
              <span class="svg-container">
                <svg-icon icon-class="yhm" />
              </span>
              <el-input
                v-model="loginForm.bingusername"
                placeholder="请输入用户名"
                name="bingusername"
                type="text"
                tabindex="1"
                auto-complete="off"
              />
            </el-form-item>

            <el-form-item prop="bingpassword">
              <span class="svg-container">
                <svg-icon icon-class="mima" />
              </span>
              <el-input
                v-model="loginForm.bingpassword"
                type="password"
                placeholder="请输入密码"
                tabindex="2"
                auto-complete="on"
              />
            </el-form-item>
            <el-form-item prop="bingphone">
              <span class="svg-container">
                <svg-icon icon-class="shouji" />
              </span>
              <el-input
                v-model="loginForm.bingphone"
                type="bingphone"
                placeholder="请输入手机号码"
                tabindex="2"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="bingphoneCode" style="position: relative">
              <span class="svg-container">
                <svg-icon icon-class="yanzm" />
              </span>
              <el-input
                v-model="loginForm.bingphoneCode"
                placeholder="请输入手机验证码"
                type="text"
              />
              <div class="verify-code">
                <el-button
                  :disabled="!bingcodeStatus"
                  :style="{'background-color':bingcodeStatus ?'#409EFF':'#bbb'}"
                  style="border-radius: 40px;color:#fff;width:100%"
                  @click.native.prevent="getbingphonecode"
                >{{ bingcodeTip }}</el-button>
              </div>
            </el-form-item>
            <el-button
              round
              :loading="loading"
              type="primary"
              style="width:100%;background-color: #8BC34A;border-color: #8BC34A;"
              @click.native.prevent="handleBing"
            >绑定
            </el-button>
          </template>

          <div class="texttips">
            <span class="ss" :style="{'color': !status ? '#5BABDE':'#8BC34A'}" @click="statusChanged">{{ btnText }}</span>
          </div>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
import { bindPhone, code, getBindPhoneCode, getPhoneCode } from '@/api/user'
import JSEncrypt from 'jsencrypt'
import { isvalidCode, voidPwd } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateCode = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('请输入验证码'))
      } else if (!isvalidCode(value)) {
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    const validPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!voidPwd(value)) {
        callback(new Error('请输入正确的密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        phoneCode: '',
        code: '',
        uuid: '',
        bingusername: '',
        bingpassword: '',
        bingphone: '',
        bingphoneCode: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        phoneCode: [{ required: true, trigger: 'blur', message: '请输入手机验证码' }],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ],
        code: [{ required: true, validator: validateCode }],
        bingusername: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        bingpassword: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        bingphone: [{ required: true, trigger: 'blur', message: '请输入手机号码' }],
        bingphoneCode: [{ required: true, trigger: 'blur', message: '请输入手机验证码' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      verifyKey: '',
      btnStatus: true,
      codeTip: '获取手机验证码',
      codeCount: -1,
      bingbtnStatus: true,
      bingcodeTip: '获取手机验证码',
      bingcodeCount: -1,
      status: true
    }
  },
  computed: {
    btnText() {
      return this.status ? '固话绑定手机号' : '返回登录'
    },
    codeStatus() {
      return this.loginForm.username.trim().length > 2 && this.codeCount < 0 && this.btnStatus
    },
    bingcodeStatus() {
      return this.loginForm.bingusername.trim().length > 2 && this.loginForm.bingphone.trim().length > 10 && this.bingcodeCount < 0 && this.bingbtnStatus
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
    // 获取验证码
    this.codeData()
  },
  methods: {
    getphonecode() {
      if (this.loginForm.username.trim().length == 0) {
        this.$message({ type: 'error', message: '请先输入用户名!' })
        return
      }
      const data = {
        username: this.loginForm.username,
        time: Math.round(new Date().getTime())
      }
      const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCoy8SopanzrBamVfCTi7wVTWh9TFmnVZdYnDf1gnVc597p7gs/qDr7DPqhleuKOb4p9lxD/HLpEfASLr7SIRCgOYSlhZgL6x80wAc3jJAixFsCBj3N2yrSsHc8u8NJ2/0s4pYX3lULsCyvf4tq0tzgES/VCyNErz06SHrl5aziwIDAQAB' // 从后台获取公钥，这里省略，直接赋值
      const encryptor = new JSEncrypt()
      encryptor.setPublicKey(publicKey)

      // 对数据进行加密
      const rsaPassWord = encryptor.encrypt(JSON.stringify(data))
      // 设置接口参数
      const params = {
        encodeStr: rsaPassWord
      }
      this.btnStatus = false
      getPhoneCode(params).then((res) => {
        this.codeCount = 60
        const timer = setInterval(() => {
          this.codeTip = `重新发送(${this.codeCount}s)`
          this.codeCount--
          if (this.codeCount < 0) {
            this.codeTip = '获取手机验证码'
            this.btnStatus = true
            clearInterval(timer)
          }
        }, 1000)
      }).catch(error => {
        this.btnStatus = true
      })
    },
    getbingphonecode() {
      if (this.loginForm.bingusername.trim().length == 0) {
        this.$message({ type: 'error', message: '请先输入用户名!' })
        return
      }
      if (this.loginForm.bingphone.trim().length == 0) {
        this.$message({ type: 'error', message: '请先输入手机号码!' })
        return
      }
      const data = {
        username: this.loginForm.bingusername,
        phone: this.loginForm.bingphone,
        time: Math.round(new Date().getTime())
      }
      const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCoy8SopanzrBamVfCTi7wVTWh9TFmnVZdYnDf1gnVc597p7gs/qDr7DPqhleuKOb4p9lxD/HLpEfASLr7SIRCgOYSlhZgL6x80wAc3jJAixFsCBj3N2yrSsHc8u8NJ2/0s4pYX3lULsCyvf4tq0tzgES/VCyNErz06SHrl5aziwIDAQAB' // 从后台获取公钥，这里省略，直接赋值
      const encryptor = new JSEncrypt()
      encryptor.setPublicKey(publicKey)

      // 对数据进行加密
      const rsaPassWord = encryptor.encrypt(JSON.stringify(data))
      // 设置接口参数
      const params = {
        encodeStr: rsaPassWord
      }
      this.bingbtnStatus = false
      getBindPhoneCode(params).then((res) => {
        this.bingcodeCount = 60
        const timer = setInterval(() => {
          this.bingcodeTip = `重新发送(${this.bingcodeCount}s)`
          this.bingcodeCount--
          if (this.bingcodeCount < 0) {
            this.bingcodeTip = '获取手机验证码'
            this.bingbtnStatus = true
            clearInterval(timer)
          }
        }, 1000)
      }).catch(error => {
        this.bingbtnStatus = true
      })
    },

    randomString(e) {
      e = e || 32
      var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      var a = t.length
      var n = ''
      for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
      return n
    },
    codeData() {
      code().then(res => {
        const data = res
        this.loginForm.img = 'data:image/jpeg;base64,' + data.img
        this.loginForm.uuid = data.uuid
        this.$forceUpdate()
      })
      this.verifyKey = this.randomString(16)
    },
    statusChanged() {
      this.status = !this.status
      this.loginForm = {
        username: '',
        password: '',
        phoneCode: '',
        code: '',
        bingusername: '',
        bingphone: '',
        bingpassword: '',
        bingphoneCode: ''
      }
      this.$refs.loginForm.clearValidate()
      this.codeData()
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    handleBing() {
      // console.log(this.loginForm)
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const data = {
            username: this.loginForm.bingusername,
            password: this.loginForm.bingpassword,
            phone: this.loginForm.bingphone,
            code: this.loginForm.bingphoneCode,
            time: Math.round(new Date().getTime())
          }
          const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCoy8SopanzrBamVfCTi7wVTWh9TFmnVZdYnDf1gnVc597p7gs/qDr7DPqhleuKOb4p9lxD/HLpEfASLr7SIRCgOYSlhZgL6x80wAc3jJAixFsCBj3N2yrSsHc8u8NJ2/0s4pYX3lULsCyvf4tq0tzgES/VCyNErz06SHrl5aziwIDAQAB' // 从后台获取公钥，这里省略，直接赋值
          const encryptor = new JSEncrypt()
          encryptor.setPublicKey(publicKey)
          // 对数据进行加密
          const rsaPassWord = encryptor.encrypt(JSON.stringify(data))
          // 设置接口参数
          const formdata = {
            encodeStr: rsaPassWord
          }
          bindPhone(formdata).then(res => {
            this.loading = false
            this.statusChanged()
            this.$message.success('绑定成功')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    handleLogin() {
      // console.log(this.loginForm)
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const data = {
            username: this.loginForm.username,
            password: this.loginForm.password,
            time: Math.round(new Date().getTime())
          }
          const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCoy8SopanzrBamVfCTi7wVTWh9TFmnVZdYnDf1gnVc597p7gs/qDr7DPqhleuKOb4p9lxD/HLpEfASLr7SIRCgOYSlhZgL6x80wAc3jJAixFsCBj3N2yrSsHc8u8NJ2/0s4pYX3lULsCyvf4tq0tzgES/VCyNErz06SHrl5aziwIDAQAB' // 从后台获取公钥，这里省略，直接赋值
          const encryptor = new JSEncrypt()
          encryptor.setPublicKey(publicKey)
          // 对数据进行加密
          const rsaPassWord = encryptor.encrypt(JSON.stringify(data))
          // 设置接口参数
          const formdata = {
            encodeStr: rsaPassWord,
            uuid: this.loginForm.uuid,
            phoneCode: this.loginForm.phoneCode,
            code: this.loginForm.code ? this.loginForm.code : ''
          }
          this.$store.dispatch('user/login', formdata).then(() => {
            // 动态路由，先跳中转页
            this.$router.replace({ path: '/blank' })
            this.loading = false
          }).catch(() => {
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
  }

  .ss {
    float: right;
    color: #5babde;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
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
      height: 500px;
      max-width: 100%;
      margin: 0 auto;
      overflow: hidden;
      display: flex;

      .d1 {
        flex: 1;
        display: flex;
        align-items: center;
        img.tip-img {
          width: 100%;
          height: 100%;
        }
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
      .code{
        width: 100px;
        //height: 20px;
        img{
          width: 100%;
          height: auto;
        }
      }
    }
    .verify-code{
      position: absolute;
      right: 0;
      top: 0;
      display: inline-block;
      width: 139px;
      vertical-align:middle;
      margin-left:8px;
      //background-color: #2571b5;
      border-radius: 5px;
      color: #fff;
      text-align: center;
      cursor: pointer;
      font-weight: bold;
    }
  }
</style>
