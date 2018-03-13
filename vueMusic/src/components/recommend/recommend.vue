<template>
    <div class="recommend">
        <div class="top">
          <div class="slider-wrapper">
            <slider>
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
  created(){
    this.getslider();
  },
  methods:{
    getslider(){
      getRecommend().then((res)=>{
          if (res.code === ERR_OK) {
              this.recommends=res.data;
              console.log(this.recommends);
          }
      })
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    
</style>