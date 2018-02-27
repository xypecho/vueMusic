<template>
	<div class="recommend">
		推荐
	</div>
</template>
<script>
	import {getRecommend} from 'api/recommend';
	export default{
		created(){
			getRecommend().then((res)=>{
				console.log(res);
			})
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>