<template>
    <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
        <slot>
        </slot>
      </div>
      <div class="dots">
        <span class="dot"></span>
      </div>
    </div>
</template>
<script>
  import BScroll from 'better-scroll';
  export default{
    data(){
      return{

      }
    },
    props:{
      loop:{
        default:false,
        type:Boolean
      },
      autoPlay:{
        default:false,
        type:Boolean
      },
      interval:{
        default:0,
        type:Number
      }
    },
    mounted(){
      setTimeout(()=>{
        this.setSliderWidth();
        this.initBScroll();
      },50)
    },
    methods:{
      setSliderWidth(){
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      initBScroll(){
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        })
      }
    }
  }
</script>
<style lang='stylus'>
    .slider
      min-height: 1px
      .slider-group
        position: relative
        overflow: hidden
        white-space: nowrap
        .slider-item
          float: left
          box-sizing: border-box
          overflow: hidden
          text-align: center
          a
            display: block
            width: 100%
            overflow: hidden
            text-decoration: none
          img
            display: block
            width: 100%
      .dots
        position: absolute
        right: 0
        left: 0
        bottom: 12px
        text-align: center
        font-size: 0
        .dot
          display: inline-block
          margin: 0 4px
          width: 8px
          height: 8px
          border-radius: 50%
          // background: $color-text-l
          &.active
            width: 20px
            border-radius: 5px
            // background: $color-text-ll
</style>