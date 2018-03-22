<template>
	<div class="tab">
		<router-link tag='div' to='/recommend' class='tab_item'>
			<span class="tab_link">推荐</span>
		</router-link>
		<router-link tag='div' to='/singer' class='tab_item'>
			<span class="tab_link">歌手</span>
		</router-link>
		<router-link tag='div' to='/rank' class='tab_item'>
			<span class="tab_link">排行榜</span>
		</router-link>
		<router-link tag='div' to='/search' class='tab_item'>
			<span class="tab_link">搜索</span>
		</router-link>
	</div>
</template>
<script>
	export default{

	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/base'
	.tab
		height:40px
		line-height:40px
		display:flex
		.tab_item
			flex:1
			text-align:center
			font-size:$font-size-medium-x
			&.router-link-active
				color:$font-color-active
				border-bottom:2px solid $font-color-active
</style>