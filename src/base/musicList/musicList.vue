<template>
  <transition name='slider'>  
  <div class="musicList">
    <div class="info-box" :style='bgimage' ref='bgimage'>
      <div class="text">
        <i class="icon-right" @click='rollback'></i>
        <span>{{ title }}</span>
      </div>
      <div class="playbtn" @click='shufflePlay'>
        <span class="icon-music"></span>
        <span>随机播放全部</span>
      </div>
    </div>
    <div class="layer" ref='layer'></div>
    <div class="song-box">
      <songList :songList='songList' @scroll='scroll' @select='selectItem'>
      </songList>
    </div>
  </div>
  </transition>
</template>
<script>
  import songList from 'src/base/songList/songList';
  import {mapActions} from 'vuex';
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
      // console.log(this.songList);
    },
    computed:{
      bgimage(){
        return `background-image:url(${this.avater});background-repeat:no-repeat;background-size:cover`
      }
    },
    mounted(){
      this.bgimageHeight = this.$refs.bgimage.clientHeight;
    },
    components:{
      songList
    },
    methods:{
      rollback() {
        this.$router.back();
      },
      selectItem(item, index) {
        console.log(item);
        this.selectPlay({
          list:this.songList,
          index
        });
      },
      scroll(pos){
        let scrollMaxHeight = Math.max(-this.bgimageHeight + 40, pos.y);
        console.log(pos.y);
        let zIndex = 0; // 背景图的层级z-index
        let scale = 1;//背景图的放大
        this.$refs.layer.style[`transform`] = `translate3d(0,${scrollMaxHeight}px,0)`;
        this.$refs.layer.style[`-webkit-transform`] = `translate3d(0,${scrollMaxHeight}px,0)`;
        const percent = Math.abs(pos.y / this.bgimageHeight);
        if (pos.y > 0) {
          scale = 1 + percent;
        }
        if (pos.y < (-this.bgimageHeight + 40)) {
          zIndex = 10;
          this.$refs.bgimage.style.height = '40px';
        } else {
          this.$refs.bgimage.style.height = '274px';
        }
        this.$refs.bgimage.style.zIndex = zIndex;
        this.$refs.bgimage.style[`transform`] = `scale(${scale})`;
        this.$refs.bgimage.style[`-webkit-transform`] = `scale(${scale})`;
      },
      shufflePlay() {
        this.randomPlay({
          list:this.songList
        });
      },
      ...mapActions([
          'selectPlay',
          'randomPlay'
        ])
    }
  }
</script>
<style lang='stylus' scoped>
.slider-enter-active, .slider-leave-active
  transition: all 0.5s;
.slider-enter, .slider-leave-to 
  transform: translate3d(100%,0,0)
.musicList
  position:fixed
  top:0
  bottom:0
  left:0
  right 0
  z-index:100
  background:#fff
  .song-box
    position:fixed
    top:274px
    bottom:0px
    width:100%
  .layer
    background:#fff
    height:100%
    position: relative;
  .info-box
    height:274px;
    width: 100%
    background:rgba(0,0,0,.5);
    position: relative;
    .text 
      line-height:42px
      height:42px
      .icon-right
        width:22px
        height:22px
        // z-index:200
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
    .playbtn
      position:absolute
      bottom:40px
      display block
      text-align center
      width:100%
      color:#31c27c
      height:29px
      border:1px solid #31c27c
      width:200px
      line-height:29px
      margin:0 auto
      left:50%
      margin-left:-100px
      border-radius:20px
</style>