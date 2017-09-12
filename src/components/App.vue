<template>
  <div id="app">
    <router-view :current-view="currentView"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  beforeCreate: function () {
    this.$store.dispatch(ACTION_TYPES.REGISTER_WEB3_INSTANCE)
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
      user: state => state.user
    }),
    currentView () {
      switch (this.$route.path) {
        case '/home':
          return Home
        case '/get-started':
          return GetStarted
        case '/faq':
          return FAQ
        case '/how-it-works':
          return HowItWorks
        case '/profile':
          return Profile
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
      ACTION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS
    ])
  },
  watch: {
    hasInjectedWeb3: function (web3ConnectionValue) {
      web3ConnectionValue
      ? this[ACTION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS]({ hasWeb3InjectedBrowser: true })
      : this[ACTION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS]({ hasWeb3InjectedBrowser: false })
    },
    networkId: function (networkId) {
      networkId && networkId !== '' && networkId === NETWORKS['ODLLBlockchainNetwork']
      ? this[ACTION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS]({ isConnectedToODLLNetwork: true })
      : this[ACTION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS]({ isConnectedToODLLNetwork: false })
    },
    coinbase: function (coinbase) {
      coinbase && coinbase !== ''
      ? this[ACTION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS]({ hasCoinbase: true })
      : this[ACTION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS]({ hasCoinbase: false })
    },
    $route: function (newRoute) {
      this[ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO](newRoute)
    }
  }
}

import { mapState, mapActions } from 'vuex'
import Home from './home/Home.vue'
import MainPage from './main/MainPage.vue'
import GetStarted from './main/view-sections/GetStarted.vue'
import FAQ from './main/view-sections/FAQ.vue'
import HowItWorks from './main/view-sections/HowItWorks.vue'
import Profile from './main/view-sections/Profile.vue'
import { ACTION_TYPES, NETWORKS } from '../util/constants'
</script>

<style>
html {}

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
