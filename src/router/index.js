import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home.vue'
import MainPage from '@/components/main/MainPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      mode: 'history',
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      mode: 'history',
      path: '/home',
      component: Home
    },
    {
      mode: 'history',
      path: '/get-started',
      name: 'GetStarted',
      component: MainPage
    },
    {
      mode: 'history',
      path: '/faq',
      name: 'FAQ',
      component: MainPage
    }
  ]
})
