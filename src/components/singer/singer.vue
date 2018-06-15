<template>
  <div class="singer">
    <div class="wrapper" ref='wrapper'>
      <ul @scroll='scroll'>
        <li v-for="group in singer" class="list-group" ref="listGroup">
          <h2 class="list-group-title">{{group.title}}</h2>
          <uL>
            <li v-for="item in group.items" class="list-group-item" @click='select(item)'>
              <img class="avatar" v-lazy='item.avater'>
              <span class="name">{{item.name}}</span>
            </li>
          </uL>
        </li>
      </ul>
    </div>
    <div class="shortCut" @touchstart.stop.prevent="onTouchStart">
      <ul>
        <li v-for='(item, index) in singer' :data-index='index'>{{ item.title | formatterTitle }}</li>
      </ul>
    </div>
    <div class="load-wrapper" v-show='!singer.length'>
      <loading :title='title'></loading>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import {getTopList} from 'api/recommend';
  import {getData} from 'src/common/js/dom';
  import betterScroll from 'better-scroll';
  import loading from 'src/components/loading/loading';
  import {mapMutations} from 'vuex'

  const HOT_LINE = 10;
  const HOT_NAME = '热门';
  export default{
    data(){
      return{
        singer:[],
        title: '歌手列表正在加载...'
      }
    },
    filters: {
      formatterTitle(val){
        return val.substring(0,1);
      }
    },
    components:{
      loading
    },
    mounted() {
      this.$nextTick(() => {
        const param = {
          taps: true,
          click: true
        };
        this.scroll = new betterScroll(this.$refs.wrapper, param);
      });
    },
    created(){
      this.getSingerList();
    },
    methods:{
      select(singer){
        this.$router.push({
          path:`/singer/${singer.id}`
        });
        this.setSinger(singer);
      },
      getSingerList(){
        let singer_list = {
          hot:{
            title:HOT_NAME,
            items:[]
          }
        }
        getTopList().then((res) => {
          res = res.data.list;
          res.map((item,index) => {
            if (index<HOT_LINE) {
              singer_list.hot.items.push({
                name:item.Fsinger_name,
                id:item.Fsinger_mid,
                avater:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
              })
            }
            const key = item.Findex;
            if (!singer_list[key]) {
              singer_list[key]={
                title:item.Findex,
                items:[]
              }
            }
            singer_list[key].items.push({
              name:item.Fsinger_name,
              id:item.Fsinger_mid,
              avater:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
            })
          });
          let HOT=[];
          let RET =[];
          for(let key in singer_list){
            if (singer_list[key].title.match(/[a-zA-Z]/)) {
              RET.push(singer_list[key]);
            } else if(singer_list[key].title === HOT_NAME){
              HOT.push(singer_list[key]);
            }
          }
          RET.sort((a,b) =>{
            return a.title.charCodeAt(0) - b.title.charCodeAt(0);
          });
          this.singer = HOT.concat(RET);
        })
      },
      onTouchStart(e){
        let idx = getData(e.target, 'index');
        this.scroll.scrollToElement(this.$refs.listGroup[idx], 2000); //后面的参数代表滚动时间
      },
      scroll(e){
        alert(123);
        console.log(e);
      },
      ...mapMutations({
        setSinger:'SET_SINGER'
      })
    }
  }
</script>
<style lang='stylus'>
  .singer
    position:absolute
    top:84px
    bottom:0px
    width:100%
    background:rgba(255,255,255,0.5)
    overflow hidden
    .wrapper
      height:100%
      ul
        padding:0;
        margin: 0;
        .list-group
          list-style:none
          .list-group-title
            width :100%
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: 12px;
            background #31c27c;
            color: #fff
          .list-group-item
            height 50px
            line-height 50px
            margin-bottom 20px
            padding-left 20px
            .avatar
              width:50px;
              height: 50px;
              border-radius: 50%
              display:inline-block
            .name
              height 50px
              line-height 50px
              margin-left: 20px;
              color: #ccc;
              font-size: 14px;
              display:inline-block
              vertical-align top
    .load-wrapper
      position absolute
      top:50%
      transform:translateY(-50%)
      width 100%
    .shortCut
      position absolute
      width 20px
      background rgba(0,0,0,0.3)
      z-index 99
      right 50%
      top 50%
      transform translateY(-50%)
      right 8px
      text-align center
      border-radius 20px
      ul
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 14px;
        font-weight: normal;
        vertical-align: baseline;
        li
          list-style none
          padding:3px 0
          color rgba(255,255,255,0.5)
</style>