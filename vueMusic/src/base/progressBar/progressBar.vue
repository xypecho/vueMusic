<template>
  <div class="progressBar">
    <div class="bar-wrapper">
      <div class="progress" ref='progress'></div>
      <div class="btn-wrapper">
        <div class="btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      percent: {
        default: 0,
        type: Number
      }
    },
    created() {
      console.log(this.percent);
    },
    watch: {
      percent(data) {
        this.$refs.progress.style.width = `${data}px`;
      }
    }
  };
</script>
<style lang='stylus' scoped>
  .progressBar
    height:30px;
    flex:1;
    padding: 0 10px;
    border-radius: 100px;
    .bar-wrapper
      margin: 0;
      padding: 0;
      border: 0;
      position: relative;
      height:4px;
      background: rgba(0,0,0,.3);
      top:14px;
      .progress
        height:3px;
        background:#31c27c;
      .btn-wrapper
        position:absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
        .btn
          position: relative;
          top: 7px;
          left: 70px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid #fff;
          border-radius: 50%;
          background: #31c27c;
</style>