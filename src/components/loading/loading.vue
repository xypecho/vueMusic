<template>
  <div class="loading">
    <img src="../../common/image/loading.png">
    <p>{{title}}</p>
  </div>
</template>
<script>
  export default{
    props:{
      title:{
        type:String,
        default: '加载中...'
      }
    }
  }
</script>
<style lang='stylus' scoped>
  .loading
    text-align center
    img
      width 80px
      animation:rotating 2.2s linear infinite
      @keyframes rotating{
      from{transform:rotate(0)}
      to{transform:rotate(360deg)}
      }
    p
      color:#31c27c
</style>