<template>
  <div class="singer">
    <div class="wrapper" ref='wrapper'>
      <ul>
        <li v-for="group in singers" class="list-group" ref="listGroup">
          <h2 class="list-group-title">{{group.title}}</h2>
          <uL>
            <li v-for="item in group.items" class="list-group-item">
              <img class="avatar" :src='item.avater'>
              <span class="name">{{item.name}}</span>
            </li>
          </uL>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {getTopList} from 'api/recommend';
  import betterScroll from 'better-scroll';

  const HOT_LINE = 10;
  const HOT_NAME = '热门';
  export default{
    data(){
      return{
        singers:[]
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.scroll = new betterScroll(this.$refs.wrapper, {});
      });
    },
    created(){
      this.getSingerList();
    },
    methods:{
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
                avater:`https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
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
              avater:`https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
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
          this.singers = HOT.concat(RET);
          console.log(this.singers);
        })
      }
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
            // background: #333;
</style>