<template>
  <div class="progressBar" @click='progressclick'>
    <div class="bar-wrapper">
      <div class="progress" ref='progress'></div>
      <div class="btn-wrapper" 
        @touchstart.prevent='progresstouchstart'
        @touchmove.prevent='progresstouchmove'
        @touchend.prevent='progresstouchend'
        ref='progressbtn'>
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
      this.touch = {};
    },
    methods: {
      progresstouchstart(e) {
        this.touch.initiated = true; //来判断是否拖动结束的标志
        this.touch.startX = e.touches[0].pageX;
        this.touch.left = this.$refs.progress.clientWidth;
      },
      progresstouchmove(e) {
        if (!this.touch.initiated) {
          return;
        }
        this.touch.moveX = e.touches[0].pageX - this.touch.startX;
        const offsetWidth = Math.min(Math.max(0, this.touch.left + this.touch.moveX), this.$refs.progressbtn.clientWidth);
        this.$refs.progress.style.width = `${offsetWidth}px`;
        this.$refs.progressbtn.style['transform'] = `translate3d(${offsetWidth}px, 0 ,0)`;
      },
      progresstouchend(e) {
        this.touch.initiated = false;
        const percent = this.$refs.progress.clientWidth / this.$refs.progressbtn.clientWidth;
        this.$emit('percentChange', percent);
      },
      progressclick(e) {
        //点击来改变进度条
        const warp_padding = this.$refs.progressbtn.getBoundingClientRect().left;
        this.$refs.progress.style.width = `${e.offsetX}px`;
        this.$refs.progressbtn.style['transform'] = `translate3d(${e.offsetX}px, 0 ,0)`;
        const percent = e.offsetX / this.$refs.progressbtn.clientWidth;
        this.$emit('percentChange', percent);
      }
    },
    watch: {
      percent(data) {
        if (data >=0 && !this.touch.initiated) {
          this.$refs.progress.style.width = `${data * 100}%`;
          this.$refs.progressbtn.style['transform'] = `translate3d(${data * 100}%, 0 ,0)`;
        }
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
        width:0%;
        height:3px;
        background:#31c27c;
      .btn-wrapper
        position:absolute;
        left: -8px;
        top: -8px;
        width: 30px;
        height: 30px;
        width: 100%;
        .btn
          // position: relative;
          // top: 7px;
          // left: 70px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid #fff;
          border-radius: 50%;
          background: #31c27c;
          transform:translate3d(0%, 0 ,0);
</style>