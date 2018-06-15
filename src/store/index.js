import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions' //异步操作或者对mutations进行封装，写在这个文件
import * as getters from './getters' //获取state
import state from './state' //所有的数据状态存储在这个文件
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
//mutations-types 用来存储mutations相关的常量

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})