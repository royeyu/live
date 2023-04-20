<template />

<script>
export default {
  name: 'Authlogin',
  data() {
    return {
      loading: '',
      encodestr: '',
      code: ''
    }
  },
  computed: {
  },
  destroyed() {
    // this.loading.close()
  },
  created() {
    this.$store.dispatch('user/authloginReset')
    this.encodestr = this.$route.query.encodeStr
    // this.encodestr = decodeURIComponent(this.encodestr)
    this.code = this.$route.query.code
    this.autologin()
    this.loading = this.$loading({
      lock: true,
      text: '登录中...',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.7)'
    })
    // console.log(this.encodestr)
  },
  methods: {
    autologin() {
      this.$store.dispatch('user/authlogin', { 'code': this.code, 'encodeStr': this.encodestr }).then(() => {
        this.$router.replace({ path: '/blank' })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
