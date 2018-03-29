<template>
  <transition name='slider'>
    <div class="singerDetail">
      
    </div>
  </transition>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    computed:{
      ...mapGetters([
        'singer'
        ])
    },
    created(){
      console.log(this.singer);
    }
  }
</script>
<style lang='stylus'>
  .singerDetail
    position:fixed
    top:0
    bottom:0
    left:0
    right 0
    z-index:999
    background :red
  .slider-enter-active, .slider-leave-active {
    transition: all .5s;
  }
  .slider-enter, .slider-leave-to /* .slider-leave-active below version 2.1.8 */ {
    transform: translate3d(100%,0,0)
  }
</style>