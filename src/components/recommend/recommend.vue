<template>
    <div class="recommend">
        <div class="top">
          <div class="slider-wrapper">
            <slider>
              <div v-for='item in recommends.slider' class="test">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl">
                </a>
              </div>
            </slider> 
          </div>
        </div>
        <div class="clear"></div>
        <div class="bottom">
          <p>电台</p>
          <div class="father">
            <div v-for='item in recommends.radioList' class="child">
              <a href="javascript:;" style="text-decoration: none">
                <img :src="item.picUrl" style="width:98%">
                <p style="color: #ccc">{{item.Ftitle}}</p>
              </a>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import {getRecommend,getTopList,getSongList} from 'api/recommend';
import {ERR_OK} from 'api/config';
import slider from 'src/base/slider/slider';
import axios from 'axios';
import jsonp from 'jsonp';

export default{
  data(){
    return{
      recommends:[]
    }
  },
  components:{
    slider
  },
  created(){
    this.getslider();
    // this.getTopList();
  },
  methods:{
    getslider(){
      getRecommend().then((res)=>{
          if (res.code === ERR_OK) {
              this.recommends=res.data;
          }
      })
    },
    getTopList() {
      getSongList().then((res) =>{
        console.log(res);
      })
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .recommend
    .top
      .slider-wrapper
        width 100%
        overflow hidden
        position absolute
        .test
          float: left
          box-sizing: border-box
          overflow: hidden
          text-align: center
          a
            display: block
            width: 100%
            overflow: hidden
            text-decoration: none
          img
            display: block
            width: 100%
    .clear
      clear both
    .bottom
      overflow hidden
      padding 20px
      padding-top 160px
      -webkit-tap-highlight-color rgba(0,0,0,0)
      .father
        display flex
        .child
          flex 1
          text-align center
</style>