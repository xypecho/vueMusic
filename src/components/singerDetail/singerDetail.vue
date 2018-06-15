<template>
  <transition name='slider'>
    <div class="singerDetail">
      <musicList :avater='singer.avater' :title='singer.name' :songList='song' v-if='song.length'>
      </musicList>
    </div>
  </transition>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getSingerDateil} from 'api/recommend';
  import {formatterSong} from 'common/js/song';
  import musicList from 'src/base/musicList/musicList';
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
          if (res.data) {
            this.song = this.normalizeSong(res.data.list);
          }
        })
      },
      normalizeSong(songList){
        const arr = [];
        songList.forEach((item) => {
          let {musicData} = item;
          if (musicData.albumid && musicData.songid) {
            formatterSong(musicData).then((res) => {
              arr.push(res);
            });
          }
        });
        return arr;
      }
    },
    components:{
      musicList
    }
  }
</script>
<style lang='stylus' scoped>
  .slider-enter-active, .slider-leave-active
    transition: all 0.5s;
  .slider-enter, .slider-leave-to 
    transform: translate3d(100%,0,0)
</style>