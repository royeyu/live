<template>
  <div :ref="`operation+${customRef}`" class="operation-container">
    <div :ref="`operation+${customRef}_button`">
      <slot />
    </div>
    <el-popover
      popper-class="btns-container"
      :placement="placement"
      width="auto"
      trigger="hover"
    >
      <slot />
<!--      <el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top-end">-->
<!--        <el-button>上右</el-button>-->
<!--      </el-tooltip>-->
      <i v-show="isFold" slot="reference" class="el-icon-more fold-icon" />
    </el-popover>
  </div>
</template>
<script>
export default {
  name: 'ColumnOperation',
  props: {
    customRef: {
      type: [Number, String],
      default: 0
    },
    len: {
      type: Number,
      default: 3 // len=0：根据宽度计算显示个数；len>0:则表示默认显示len个按钮
    },
    placement: {
      type: String,
      default: 'top-end'
    }
  },
  data() {
    return {
      width: '',
      isFold: false
    }
  },
  mounted() {
    this.domInit()
  },
  methods: {
    domInit() {
      const children = this.$refs[`operation+${this.customRef}_button`].children // type: Array
      // console.log(children)
      this.$nextTick(() => {
        if (this.len) {
          this.isFold = children.length > this.len
          const isLen = children.length === this.len ? this.len : this.len - 1
          for (var i = 0; i < children.length; i++) {
            children[i].style.display = i > isLen ? 'none' : 'inline-block'
          }
          // children.forEach((child, ins) => {
          //   child.style.display = ins >= isLen ? 'none' : 'inline-block'
          // })
        } else {
          // 获取父容器宽度（包含边线）
          const offsetWidth = this.$refs[`operation+${this.customRef}`]
            .offsetWidth
          // 获取本Dom下内容的宽度
          const scrollWidth = this.$refs[`operation+${this.customRef}`]
            .scrollWidth
          this.isFold = offsetWidth < scrollWidth
          if (this.isFold) {
            // const childrenWidth = children.map(item => item.offsetWidth) // Array.isArray(children)===false
            const childrenWidth = []
            for (let i = 0; i < children.length; i++) {
              childrenWidth.push(children[i].offsetWidth)
            }
            let maxCount = 0
            const showMaxIndex = childrenWidth.findIndex((item, ins) => {
              maxCount = item + maxCount + (ins ? 10 : 0)
              return maxCount > offsetWidth
            })
            for (var j = 0; j < children.length; j++) {
              children[j].style.display = j >= showMaxIndex ? 'none' : 'inline-block'
            }
            // children.forEach((item, index) => {
            //   item.style.display =
            //     index >= showMaxIndex ? 'none' : 'inline-block'
            // })
            maxCount = null // 空变量，释放
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.operation-container {
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  min-width: 60px;
  display: flex;
  align-items: center;
  //justify-content: start;
  justify-content: center;
  .fold-icon {
    // position: absolute;
    // right: 12px;
    // top: calc(50% - 5px);
    color: #409EFF;
    cursor: pointer;
    margin-left: 1px;
    padding: 10px;
  }
}
.btns-container {
  min-width: 60px;
     & > * {
       margin-right: 0px;
     }
}
</style>
