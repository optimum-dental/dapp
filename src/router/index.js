import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home.vue'
import MainPage from '@/components/main/MainPage.vue'
import GetStarted from '@/components/main/odll-user/get-started'
import FindDentists from '@/components/main/odll-user/find-dentists'
import ViewServices from '@/components/main/odll-user/view-services'
import RequestAppointment from '@/components/main/actors/patient/request-appointment'
import ViewScanApplications from '@/components/main/actors/patient/view-scan-applications'
import ViewTreatmentApplications from '@/components/main/actors/patient/view-treatment-applications'

import Managers from '@/components/main/actors/odll-admin/managers'
import Dentists from '@/components/main/actors/odll-manager/manage-dentists'

Vue.use(Router)

export default new Router({
  routes: [
    {
      mode: 'history',
      path: '/',
      name: 'Home',
      component: Home,
      meta: { view: Home }
    },
    {
      mode: 'history',
      path: '/home',
      component: Home,
      meta: { view: Home }
    },
    {
      mode: 'history',
      path: '/get-started',
      name: 'GetStarted',
      component: MainPage,
      meta: { view: GetStarted }
    },
    {
      mode: 'history',
      path: '/find-dentists',
      name: 'FindDentists',
      component: MainPage,
      meta: { view: FindDentists }
    },
    {
      mode: 'history',
      path: '/view-services',
      name: 'ViewServices',
      component: MainPage,
      meta: { view: ViewServices }
    },
    {
      mode: 'history',
      path: '/request-appointment',
      name: 'RequestAppointment',
      component: MainPage,
      meta: { view: RequestAppointment }
    },
    {
      mode: 'history',
      path: '/view-scan-applications',
      name: 'ViewScanApplications',
      component: MainPage,
      meta: { view: ViewScanApplications }
    },
    {
      mode: 'history',
      path: '/view-treatment-applications',
      name: 'ViewTreatmentApplications',
      component: MainPage,
      meta: { view: ViewTreatmentApplications }
    },
    {
      mode: 'history',
      path: '/managers',
      name: 'Managers',
      component: MainPage,
      meta: { view: Managers }
    },
    {
      mode: 'history',
      path: '/manage-dentists',
      name: 'Dentists',
      component: MainPage,
      meta: { view: Dentists }
    }
  ]
})
