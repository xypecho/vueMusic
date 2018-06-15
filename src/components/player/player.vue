<template>
  <div class="player" v-if='playList.length > 0'>
    <transition name='normal-player'>
    <div class="normal-player" v-show='fullScreen'>
      <div class="background">
        <img :src="currentSong.image" width="100%" height="100%">
      </div>
      <div class="top">
        <i class="icon-right" @click='close'></i>
        <p v-html='currentSong.name' class="songName"></p>
        <p v-html='currentSong.singer' class="songSinger"></p>
      </div>
      <div class="middle">
        <div :class="['middle-img',imgcircle]">
          <img :src="currentSong.image">
        </div>
      </div>
      <div class="progress-wrapper">
        <span class="progress-text">{{formateUpdateTime(currentTime)}}</span>
        <progressBar :percent='percent' @percentChange='percentChange'></progressBar>
        <span class="progress-text">{{formateUpdateTime(totalTime)}}</span>
      </div>
      <div class="bottom">
        <div class="icon">
          <i :class="modeICON" @click='changeMode'></i>
          <i class="icon-backward" @click='prev'></i>
          <i :class="playIcon" @click='toggleSong'></i>
          <i class="icon-forward2" @click='next'></i>
          <i class="icon-喜欢"></i>
        </div>
      </div>
    </div>
    </transition>
    <transition name='mini-player'>
    <div class="mini-player" v-show='!fullScreen' @click='open'>
      <div :class="['img', imgcircle]">
        <img :src="currentSong.image" width="40" height="40">
      </div>
      <div class="songInfo">
        <span v-html='currentSong.name'></span>
        <span v-html='currentSong.singer'></span>
      </div>
      <div class="control" @click.stop='toggleSong'>
<!--         <progressCircle> -->
          <i :class="playIcon"></i>
<!--         </progressCircle> -->
      </div>
      <div class="icon">
        <i class="icon-list2"></i>
      </div>
    </div>
    </transition>
    <audio ref='audio' :src='currentSong.url' @play='ready' @timeupdate='updateTime' @ended='endCallBack'></audio>
  </div>
</template>
<script>
  import {mapGetters,mapMutations} from 'vuex';
  import progressBar from 'src/base/progressBar/progressBar';
  import {playMode} from 'common/js/config.js';
  import {shuffle} from 'common/js/tool.js';
  // import progressCircle from 'src/base/progressCircle/progressCircle';
  export default{
    components: {
      // progressCircle
      progressBar
    },
    data() {
      return {
        songReady: false,
        currentTime: 0,
        totalTime: 0
      };
    },
    computed:{
      playIcon() {
        return !this.playing ? 'icon-play2' : 'icon-pause';
      },
      modeICON() {
        return this.mode === playMode.sequence ? 'icon-loop' : (this.mode === playMode.loop ? 'icon-singleLoop' : 'icon-shuffle');
      },
      imgcircle() {
        return this.playing ? 'play' : 'pause';
      },
      percent() {
        return this.currentTime / this.currentSong.duration;
      },
      ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong',
        'playing',
        'currentIndex',
        'mode',
        'sequenceList'
        ])
    },
    methods:{
      percentChange(percent) {
        //改变歌曲进度
        this.$refs.audio.currentTime = percent * this.currentSong.duration;
        if (!this.playing) {
          this.toggleSong();
        }
      },
      close() {
        this.changeFullScreen(false);
      },
      open() {
        this.changeFullScreen(true);
      },
      toggleSong() {
        this.changePlayingState(!this.playing);
      },
      prev() {
        if (!this.songReady) {
          return;
        }
        let index = this.currentIndex - 1;
        if (index === -1) {
          index = this.playList.length - 1;
        }
        this.SET_CURRENTINDEX(index);
        if (!this.playing) {
          this.toggleSong();
        }
      },
      next() {
        if (!this.songReady) {
          return;
        }
        let index = this.currentIndex + 1;
        if (index === this.playList.length) {
          index = 0;
        }
        this.SET_CURRENTINDEX(index);
        if (!this.playing) {
          this.toggleSong();
        }
      },
      loop() {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
      },
      ready() {
        this.songReady = true;
      },
      updateTime(e) {
        this.currentTime = e.target.currentTime;
        this.totalTime = e.target.duration;
        // console.log(e);
      },
      endCallBack() {
        if (this.mode === playMode.loop) {
          this.loop();
        } else {
          this.next();
        }
      },
      formateUpdateTime(time) {
        time = Math.floor(time);
        const minutes = Math.floor(time / 60);
        const seconds = this.pad(Math.floor(time % 60));
        return `${minutes}:${seconds}`;
      },
      pad(num, n = 2) {
        //数字前面补0
        let len = num.toString().length;
        if (len < n) {
          num = '0' + num;
          len ++ ;
        }
        return num;
      },
      changeMode() {
        const mode = (this.mode + 1) % 3;
        this.CHANGE_MODE(mode);
        let list = null;
        if (mode === playMode.random) {
          list = shuffle(this.sequenceList);
        } else {
          list = this.sequenceList;
        }
        console.log(mode);
        this.CHANGE_LIST(list);
        this.resetCurrentSong(list);
      },
      resetCurrentSong(list) {
        let index = list.findIndex((item) => item.id === this.currentSong.id);
        this.SET_CURRENTINDEX(index);
      },
      ...mapMutations({
        changeFullScreen:'SET_FULLSCREEN',
        changePlayingState:'SET_PLAYING',
        SET_CURRENTINDEX:'SET_CURRENTINDEX',
        CHANGE_MODE:'SET_MODE',
        CHANGE_LIST:'SET_SEQUENCELIST'
      })
    },
    watch: {
      currentSong(newSong, oldSong) {
        this.currentSong.receiveLyric();
        this.$nextTick(() => {
          if (!newSong.id) {
            return
          }
          if (newSong.id === oldSong.id) {
            return
          }
          this.$refs.audio.play();
        });
      },
      playing() {
        this.$nextTick(() => {
          this.playing ? this.$refs.audio.play() : this.$refs.audio.pause();
        });
      }
    }
  };
</script>
<style lang='stylus' scoped>
  .player
    position:relative;
    .normal-player
      position: fixed
      top:0
      bottom:0
      lefy:0
      right:0
      width:100%
      height:100%
      z-index:100
      background:#222
      .background
        width:100%
        height:100%
        position absolute
        left 0px
        right 0px
        top:0
        bottom 0px
        z-index:-1
        opacity:0.6
        filter:blur(20px)
      .top
        position:relative
        margin-top:10px
        i
          position:absolute
          top:0
          left :10px
          color:#31c27c
          font-size:27px
          transform:rotate(90deg)
        p
          width:100%
          text-align center
          color:#31c27c
        .songName
          font-size:18px
        .songSinger
          font-size:14px
      .middle
        width:100%
        text-align center
        .middle-img
          border-radius:50%
          width:300px;
          height: 300px
          margin 0 auto
          overflow hidden
          border :10px solid rgba(255,255,255,0.1)
          &.play
            animation: rotate 20s linear infinite
          &.pause
            animation-play-state:paused
      .progress-wrapper
        display:flex;
        align-items:center;
        padding: 0 30px;
        padding-top: 120px;
        .progress-text
          color:#fff;
          flex: 0 0 30px;
          display: inline-block;
          height:30px;
          line-height: 30px;
      .bottom
        position: absolute;
        bottom: 50px;
        width: 100%;
        .icon
          display:flex
          align-items: center
          display:-webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
          display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
          display: -ms-flexbox;      /* TWEENER - IE 10 */
          display: -webkit-flex;  
          i
            flex:1;
            -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */
            -moz-box-flex: 1;         /* OLD - Firefox 19- */
            width: 20%;               /* For old syntax, otherwise collapses. */
            -webkit-flex: 1;          /* Chrome */
            -ms-flex: 1;              /* IE 10 */
            text-align center
            font-size:30px
            color:#31c27c
    .mini-player
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 180;
      width: 100%;
      height: 60px;
      background:#31c27c;
      color:#fff;
      .img
        flex: 0 0 40px
        border-radius:50%
        overflow hidden
        margin-left:20px
        &.play
          animation: rotate 20s linear infinite
        &.pause
          animation-play-state:paused
      .songInfo
        flex:1
        display:flex
        flex-direction: column;
        justify-content: center;
        margin-left:20px
        span
          display:block
          line-height: 20px
      .control
        flex:0 0 40px
        font-size:30px
      .icon
        flex:0 0 40px
        font-size:25px
  // .mini-player-enter-active,.mini-player-leave-active
    
  // .mini-player-enter,.mini-player-leave-to
  .normal-player-enter-active, .normal-player-leave-active
    transition: all .5s;
    .top,.bottom
      transition: all .5s cubic-bezier(0.86,0.18,0.82,1.32)
  .normal-player-enter, .normal-player-leave-to
    opacity: 0;
    .top
      transform: translate3d(0,-100px,0)
    .bottom
      transform: translate3d(0,100px,0)
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>