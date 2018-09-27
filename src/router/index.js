import Vue from 'vue'
import Router from 'vue-router'
import Echart from '@/pages/echart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'echart',
      component: Echart
    }
  ]
})
