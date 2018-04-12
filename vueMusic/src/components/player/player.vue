<template>
  <div class="player" v-show='playList.length > 0'>
    <div class="normal-player" v-show='fullScreen'>
      <p>{{ playList.name }}</p>
    </div>
    <div class="mini-player" v-show='!fullScreen'>
      
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default{
    computed:{
      ...mapGetters([
        'fullScreen',
        'playList'
        ])
    },
    created() {
      console.log(this.playList);
    }
  };
</script>
<style lang='stylus' scoped>
  .player
    .normal-player
      position: fixed
      top:0
      bottom:0
      lefy:0
      right:0
      width:100%
      height:100%
      background: red
      z-index:100
</style>