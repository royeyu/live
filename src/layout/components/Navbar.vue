<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span style="display: inline-block;height: 40px;vertical-align: top;line-height: 40px;margin-right: 20px">
            *{{ name }}** 欢迎来到挂短名片业务自助服务平台
          </span>
          <!--          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
<!--          <i class="el-icon-caret-bottom" />-->
          <i class="el-icon-s-tools" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <div @click="ecitPwd">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </div>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改密码"
      append-to-body
      :visible.sync="dialogVisible"
      width="660px"
      @close="handleClose"
    >
      <div style="padding: 10px 30px 0px 10px">
        <el-form ref="pwdForm" label-width="100px" :model="pwdForm" :rules="rules">
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input v-model="pwdForm.oldPwd" type="password" placeholder="请输入旧密码" size="small" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="pwdForm.newPwd" type="password" placeholder="请输入新密码" size="small" />
          </el-form-item>
          <el-form-item label="确认新密码" prop="newPwd2">
            <el-input v-model="pwdForm.newPwd2" type="password" placeholder="请确认新密码" size="small" />
          </el-form-item>
          <el-form-item label="" style="margin:0">
            <p class="texttips">特殊字符仅支持 <span  style="color:#f00">!_@-#.*%?</span></p>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subData('pwdForm')">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { voidPwd } from '@/utils/validate'
import {customerUpdateUserPwd, systemUpdateUserPwd } from '@/api/system'
import JSEncrypt from "jsencrypt";
import store from "@/store";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  data() {
    const validPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!voidPwd(value)) {
        callback(new Error('密码长度8~16位，必须包含英文字母的大写、小写、数字和符号，仅支持符号!_@-#.*%?'))
      } else {
        callback()
      }
    }
    const validPwd1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (!voidPwd(value)) {
        callback(new Error('密码长度8~16位，必须包含英文字母的大写、小写、数字和符号，仅支持符号!_@-#.*%?'))
      } else {
        callback()
      }
    }
    const validPwd2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value !== this.pwdForm.newPwd) {
        callback(new Error('两次密码输入不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      pwdForm: {
        oldPwd: '',
        newPwd: '',
        newPwd2: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: '请输入旧密码' },
          { validator: validPwd }
        ],
        newPwd: [
          { required: true, message: '请输入新密码' },
          { validator: validPwd1 }
        ],
        newPwd2: [
          { required: true, message: '请确认新密码' },
          { validator: validPwd2 }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.$refs['pwdForm'].resetFields()
    },
    ecitPwd() {
      this.dialogVisible = true
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // 保存
    subData(name) {
      // console.log(this.$store.state.user.type)
      // return
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = {
            oldPwd: this.pwdForm.oldPwd,
            newPwd: this.pwdForm.newPwd,
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
          if (this.$store.state.user.type === 'system') {
            systemUpdateUserPwd(formdata).then(res => {
              this.$message.success('操作成功')
              this.$refs[name].resetFields()
              this.dialogVisible = false
            })
          }
          if (this.$store.state.user.type === 'customer') {
            customerUpdateUserPwd(formdata).then(res => {
              this.$message.success('操作成功')
              this.$refs[name].resetFields()
              this.dialogVisible = false
            })
          }
        }
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // 以防个人和企业用户重定向冲突，去除重定向
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.replace(`/login`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          //.el-icon-caret-bottom {
          .el-icon-s-tools {
            cursor: pointer;
            position: absolute;
            //right: -20px;
            //top: 25px;
            top: 13px;
            font-size: 18px;
          }
        }
      }
    }
  }
</style>
