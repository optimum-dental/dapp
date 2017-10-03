<template>
  <div id="app">
    <router-view
      :current-view="currentView"
      :user="user"
      :avatar-canvas="avatarCanvas"
      :is-d-app-ready="isDAppReady"
      @updateAvatarCanvas="updateAvatarCanvas"
    >
    </router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    beforeCreate: function () {
      this.$store.dispatch(ACTION_TYPES.REGISTER_WEB3_INSTANCE)
      .then(() => {
        this.$store.dispatch(ACTION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS)
      })
      .then(() => {
        this.$store.dispatch(ACTION_TYPES.UPDATE_DAPP_READINESS, true)
      })
      .catch((result) => {
        if (!(this.isDAppReady)) {
          this.$store.dispatch(ACTION_TYPES.UPDATE_DAPP_READINESS, true)
        }

        console.log(result, "We've encountered problems with your Web3 connection")
      })
    },
    components: {
      Home,
      MainPage
    },
    computed: {
      ...mapState({
        hasInjectedWeb3: state => state.web3.isInjected,
        hasWeb3InjectedBrowser: state => state.user.hasWeb3InjectedBrowser,
        isConnectedToODLLNetwork: state => state.user.isConnectedToODLLNetwork,
        hasCoinbase: state => state.user.hasCoinbase,
        networkId: state => state.web3.networkId,
        coinbase: state => state.web3.coinbase,
        currentRoute: state => state.currentRoute,
        user: state => state.user,
        isDAppReady: state => state.isDAppReady
      }),
      currentView () {
        switch (this.$route.path) {
          case '/home':
            return Home
          case '/get-started':
            return GetStarted
          case '/find-dentist':
            return FindDentist
          case '/view-services':
            return ViewServices
          case '/request-appointment':
            return RequestAppointment
          case '/view-scan-applications':
            return ViewScanApplications
          case '/view-treatment-applications':
            return ViewTreatmentApplications
          default:
            return Home
        }
      }
    },
    created: function () {
      this[ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO](this.$route)
    },
    methods: {
      ...mapActions([
        ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO,
        ACTION_TYPES.UPDATE_USER_AVATAR_CANVAS
      ]),
      updateAvatarCanvas (payload = null) {
        this[ACTION_TYPES.UPDATE_USER_AVATAR_CANVAS](payload)
      }
    },
    props: [ 'avatarCanvas' ],
    watch: {
      hasInjectedWeb3 (web3ConnectionValue) {
        console.log('hasInjectedWeb3: ', web3ConnectionValue)
      },
      networkId (networkId) {
        console.log('networkId: ', networkId)
      },
      coinbase (coinbase) {
        console.log('coinbase: ', coinbase)
      },
      isDAppReady (isDAppReady) {
        console.log('isDAppReady: ', isDAppReady)
      },
      $route (newRoute) {
        this[ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO](newRoute)
      }
    }
  }

  import { mapState, mapActions } from 'vuex'
  import Home from './home/Home.vue'
  import MainPage from './main/MainPage.vue'
  import GetStarted from './main/view-sections/get-started'
  import FindDentist from './main/view-sections/find-dentist'
  import ViewServices from './main/view-sections/view-services'
  import RequestAppointment from './main/view-sections/request-appointment'
  import ViewScanApplications from './main/view-sections/view-scan-applications'
  import ViewTreatmentApplications from './main/view-sections/view-treatment-applications'
  import { ACTION_TYPES } from '../util/constants'
</script>

<style>
  html {
    background: #eef0ef;
  }

  body {
    margin: 0;
    width: 100%;
  }

  * {
    box-sizing: border-box;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    /*max-width: 960px;*/
    min-width: 1020px;
    margin: auto;
  }
</style>
