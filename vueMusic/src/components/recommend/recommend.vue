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
        <div class="bottom">
          
        </div>
    </div>
</template>
<script>
import {getRecommend} from 'api/recommend';
import {ERR_OK} from 'api/config';
import slider from 'src/base/slider/slider'
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
  },
  methods:{
    getslider(){
      getRecommend().then((res)=>{
          if (res.code === ERR_OK) {
              this.recommends=res.data;
          }
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
</style>