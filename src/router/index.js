import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/main_page/MainPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    }
  ]
})
