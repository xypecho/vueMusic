<template>
  <div id="app">
    <mheader></mheader>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import mheader from 'components/m-header/m-header'
import tab from 'components/tab/tab'
export default {
  name: 'App',
  components:{
    mheader,
    tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
