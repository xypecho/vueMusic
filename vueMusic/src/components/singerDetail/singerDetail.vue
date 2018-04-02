<template>
  <transition name='slider'>
    <div class="singerDetail">
      
    </div>
  </transition>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getSingerDateil} from 'api/recommend';
  import {formatterSong} from 'common/js/song';
  export default{
    data(){
      return{
        song:[]
      }
    },
    computed:{
      ...mapGetters([
        'singer'
        ])
    },
    created(){
      this.getSinger(this.singer.id);
    },
    methods:{
      getSinger(id){
        if (!id) {
          this.$router.push('/singer');
        }
        getSingerDateil(id).then((res) => {
          this.song = this.normalizeSong(res.data.list);
          console.log(this.song);
        })
      },
      normalizeSong(songList){
        const arr = [];
        songList.forEach((item) => {
          let {musicData} = item;
          if (musicData.albumid && musicData.songid) {
            arr.push(formatterSong(musicData));
          }
        });
        return arr;
      }
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
  .slider-enter-active, .slider-leave-active
    transition: all .5s;
  .slider-enter, .slider-leave-to 
    transform: translate3d(100%,0,0)
</style>