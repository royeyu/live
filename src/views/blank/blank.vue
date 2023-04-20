<template />

<script>
import { mapGetters } from 'vuex'

export default {
  name: '',
  computed: {
    ...mapGetters([
      'addUrl'
    ])
  },
  watch: {
    addUrl() {
      if (this.addUrl != '') {
        this.loading.close()
        this.$router.replace(this.addUrl)
      }
    }
  },
  data() {
    return {
      loading: ''
    }
  },
  destroyed() {
    this.loading.close()
  },
  created() {
    this.loading = this.$loading({
      lock: true,
      text: '加载中！',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.7)'
    })
    // if (this.addUrl) {
    //   this.loading.close()
    //   this.$router.push(this.addUrl)
    // }
    // console.log(this.$route)
    // const timer = setInterval(() => {
    //   const firstNodeUrl = localStorage.getItem('firstNodeUrl')
    //   console.log(this.$route)
    //   console.log(firstNodeUrl)
    //   if (firstNodeUrl) {
    //     clearInterval(timer)
    //     this.$router.replace(firstNodeUrl)
    //   }
    // }, 5000)

    // console.log(firstNodeUrl)
    // this.$route.replace('basicsSet/productManagement')
    // if (firstNodeUrl) {
    //   this.$router.push(firstNodeUrl)
    // }
    /*     const data = JSON.parse(localStorage.getItem('mentList'))
      for (let i = 0; i < data.length; i++) {
        if (data[i].path) {
          this.$router.push(data[i].path)
          break
        }
      }*/
  }
}
</script>

<style scoped>

</style>
