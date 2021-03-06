import Vue from 'vue'
import Router from 'vue-router'
import Sign from '@/pages/sign'
import Index from '@/pages/index'
import Echart from '@/pages/echart'
import AllUser from '@/pages/user/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'sign',
      component: Sign
    }, {
      path: '/index',
      name: 'index',
      component: Index
    }, {
      path: '/echart',
      name: 'echart',
      component: Echart
    }, {
      path: '/user',
      name: 'user',
      component: AllUser
    },
  ]
})
