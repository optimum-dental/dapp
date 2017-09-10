import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import MainPage from '@/components/main/MainPage'
import User from '@/components/main/User'
import FAQ from '@/components/main/FAQ'

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
      path: '/main-page',
      name: 'MainPage',
      component: MainPage,
      children: [
        {
          path: 'faq',
          name: 'FAQ',
          component: FAQ
        },
        {
          path: 'users/:id/',
          name: 'User',
          component: User
        }
      ]
    }
  ]
})
