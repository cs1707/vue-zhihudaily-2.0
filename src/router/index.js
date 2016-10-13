import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import List from '../views/List.vue'
import Detail from '../views/Detail.vue'

export default new Router({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }

    let position = {
      x: 0,
      y: 0
    }
    if (to.path === '/') {
      position.y = +sessionStorage.getItem('scrollTop') || 0
    }
    return position
  },
  routes: [
    {
      path: '/',
      component: List
    },
    {
      path: '/detail/:id',
      component: Detail
    }
  ]
})
