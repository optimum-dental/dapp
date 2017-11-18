import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home.vue'
import MainPage from '@/components/main/MainPage.vue'
import GetStarted from '@/components/main/odll-user/get-started'
import FindDentists from '@/components/main/odll-user/find-dentists'
import ViewServices from '@/components/main/odll-user/view-services'
import RequestAppointment from '@/components/main/actors/patient/request-appointment'
import ViewApplications from '@/components/main/actors/patient/view-applications'

import Managers from '@/components/main/actors/odll-admin/managers'
import Dentists from '@/components/main/actors/odll-manager/manage-dentists'
import ManageServices from '@/components/main/actors/dentist/manage-services'
import ManageScanResults from '@/components/main/actors/dentist/manage-scan-results'
import ViewAppointmentRequests from '@/components/main/actors/dentist/view-appointment-requests'
import ViewPatients from '@/components/main/actors/dentist/view-patients'
import ViewScanResults from '@/components/main/actors/dentist/view-scan-results'

Vue.use(Router)

export default new Router({
  routes: [
    {
      mode: 'history',
      path: '/',
      name: 'Root',
      component: Home,
      meta: { view: Home }
    },
    {
      mode: 'history',
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { view: Home }
    },
    {
      mode: 'history',
      path: '/profile',
      name: 'Profile',
      component: MainPage,
      meta: { view: GetStarted }
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
      path: '/view-applications',
      name: 'ViewApplications',
      component: MainPage,
      meta: { view: ViewApplications }
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
    },
    {
      mode: 'history',
      path: '/manage-services',
      name: 'ManageServices',
      component: MainPage,
      meta: { view: ManageServices }
    },
    {
      mode: 'history',
      path: '/manage-scan-results',
      name: 'ManageScanResults',
      component: MainPage,
      meta: { view: ManageScanResults }
    },
    {
      mode: 'history',
      path: '/view-appointment-requests',
      name: 'ViewAppointmentRequests',
      component: MainPage,
      meta: { view: ViewAppointmentRequests }
    },
    {
      mode: 'history',
      path: '/view-patients',
      name: 'ViewPatients',
      component: MainPage,
      meta: { view: ViewPatients }
    },
    {
      mode: 'history',
      path: '/view-scan-results',
      name: 'ViewScanResults',
      component: MainPage,
      meta: { view: ViewScanResults }
    }
  ]
})
