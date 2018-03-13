import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'src/components/recommend/recommend'
import rank from 'src/components/rank/rank'
import search from 'src/components/search/search'

Vue.use(Router)

export default new Router({
  routes: [
  	{
	  path:'/',
	  redirect:'/recommend'
  	},
    {
      path: '/recommend',
      component: recommend
    },    
    {
      path: '/rank',
      component: rank
    },    
    {
      path: '/search',
      component: search
    }
  ]
})
