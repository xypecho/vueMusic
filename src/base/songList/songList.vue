<template>
  <div class="songList">
    <div class="wrapper" ref='wrapper'>
      <ul>
        <li v-for='(item, index) in songList' @click='select(item, index)'>
          <div class="rank" style="display: none"></div>
          <div class="content">
            <div class="nam">{{ item.name }}</div>
            <div class="desc">{{ formatterSong(item) }}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="load-wrapper" v-show='!songList.length'>
      <loading :title='title'></loading>
    </div>
  </div>
</template>
<script>
  import loading from 'src/components/loading/loading';
  import betterScroll from 'better-scroll';
  export default{
    data() {
      return {
        title: '歌曲列表正在加载中...'
      }
    },
    props:{
      songList:{
        type: Array,
        default: []
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (this.scroll) {
          this.scroll.refresh();
        } else {
          this.scroll = new betterScroll(this.$refs.wrapper, {
            probeType: 3,
            click: true,
            taps: true
          });
        }
        this.scroll.on('scroll',(pos) => {
          this.$emit('scroll', pos);
        })
      });
    },
    components:{
      loading
    },
    methods:{
      formatterSong(song){
        return `${song.name}-${song.album}`;
      },
      select(item, index) {
        this.$emit('select', item, index);
      }
    }
  };
</script>
<style lang='stylus' scoped>
.songList
  .wrapper
    height:600px
    // overflow:hidden
    width:100%
    background:#fff;
    ul
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font-weight: normal;
      vertical-align: baseline;
      li
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 64px;
        font-size: 14px;
        padding: 20px 30px;
        .content
          flex:1
          line-height:20px
          .name
            font-size: 16px;
            color: #000;
          .desc
            color: #777;
  .load-wrapper
    position absolute
    top:50%
    transform:translateY(-50%)
    width 100%
</style>