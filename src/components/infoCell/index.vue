<template>
  <div class="infoCell">
    <div class="title" :style="{'width':twidth}">{{ title }} <slot name="title" /></div>
    <div class="value" :style="{'color':vcolor}">
      {{ value }}
      <slot />
    </div>
    <div class="desc" v-if="desc"  :style="{'color':dcolor,'flex':dflex}">{{desc}}</div>
  </div>
</template>

<script>
export default {
  name: 'InfoCell',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: null,
    desc: null,
    dcolor: {
      type: String,
      default: ''
    },
    vcolor: {
      type: String,
      default: ''
    },
    twidth: {
      type: String,
      default: ''
    },
    dflex: {
      type: String,
      default: ''
    }

  }
}
</script>

<style scoped lang="scss">
.infoCell{
  padding: 10px 3px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .title{
    font-size: 14px;
    color: #333;
    width: 100px;
    text-align: right;
  }
  .value{
    flex: 1;
    font-size: 14px;
    color: #666;
    margin-left: 8px;
    word-break: break-all;
  }
  .desc{
    font-size:13px;
    color: #333;
    text-align: left;
  }
}
</style>
