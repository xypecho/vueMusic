import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'
import './common/stylus/index.styl'
import './common/extra_stylus/style.styl'
import './common/other_stylus/style.styl'
import axios from 'axios';


Vue.use(VueLazyload, {
	loading:require('common/image/timg.jpg')
})

fastclick.attach(document.body);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
