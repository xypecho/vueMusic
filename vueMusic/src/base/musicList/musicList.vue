<template>
  <div class="musicList">
    <div class="info-box" :style='bgimage'>
      <div class="text">
        <i class="icon-right" @click='$router.back()'></i>
        <span>{{ title }}</span>
      </div>
    </div>
    <div class="song-box">
      
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      title:{
        type: String,
        default: ''
      },
      avater:{
        type:String,
        default: ''
      },
      songList:{
        type:Array,
        default:[]
      }
    },
    created(){
      console.log(this.songList);
    },
    computed:{
      bgimage(){
        return `background-image:url(${this.avater});background-repeat:no-repeat;background-size:cover`
      }
    }
  }
</script>
<style lang='stylus'>
.musicList
  position:fixed
  top:0
  bottom:0
  left:0
  right 0
  z-index:100
  background:#fff
  .info-box
    height:274px;
    width: 100%
    background:rgba(0,0,0,.5);
    .text 
      line-height:42px
      height:42px
      .icon-right
        width:22px
        height:22px
        z-index:200
        display:inline-block
        padding:10px
        font-size:22px
        transform:rotate(180deg)
        color:#31c27c
      span
        display:block
        text-align:center
        color:#fff
        font-size:18px
        margin:-40px
        padding:0
        vertical-align: top;
</style>