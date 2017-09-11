<template>
  <div id="app">
    <router-view :has-injected-web3="hasInjectedWeb3"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    ...mapState({
      hasInjectedWeb3: state => state.web3.isInjected,
      isConnectedToODLLNetwork: state => state.user.isConnectedToODLLNetwork,
      hasCoinbase: state => state.user.hasCoinbase,
      networkId: state => state.web3.networkId,
      coinbase: state => state.web3.coinbase,
      currentRoute: state => state.currentRoute,
      user: state => state.user
    })
  },
  beforeCreate: function () {
    this.$store.dispatch(ACTION_TYPES.REGISTER_WEB3_INSTANCE)
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
      if (web3ConnectionValue) {
        console.log('Browser has Web3 injected.')
      } else {
        console.log('No injected Web3 on browser')
      }
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
