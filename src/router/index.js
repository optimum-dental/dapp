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
      path: '/find-dentist',
      name: 'FindDentist',
      component: MainPage
    },
    {
      mode: 'history',
      path: '/view-services',
      name: 'ViewServices',
      component: MainPage
    },
    {
      mode: 'history',
      path: '/request-appointment',
      name: 'RequestAppointment',
      component: MainPage
    },
    {
      mode: 'history',
      path: '/view-scan-applications',
      name: 'ViewScanApplications',
      component: MainPage
    },
    {
      mode: 'history',
      path: '/view-treatment-applications',
      name: 'ViewTreatmentApplications',
      component: MainPage
    }
  ]
})
