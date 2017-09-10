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
      networkId: state => state.web3.networkId,
      coinbase: state => state.web3.coinbase,
      currentRoute: state => state.currentRoute
    })
  },
  beforeCreate: function () {
    this.$store.dispatch(MUTATION_TYPES.REGISTER_WEB3_INSTANCE)
  },
  created: function () {
    this.$store.dispatch(MUTATION_TYPES.CHANGE_CURRENT_ROUTE_TO, this.$route)
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
      if (networkId && networkId !== '') {
        console.log(`Current Network: ${NETWORKS[networkId]}`)
      } else {
        console.log('You are not connected to the ODLL blockchain network')
      }
    },
    coinbase: function (coinbase) {
      if (coinbase && coinbase !== '') {
        console.log(`Coinbase: ${coinbase}`)
      } else {
        console.log('Unable to get your coinbase')
      }
    },
    $route: function (newRoute) {
      this.$store.dispatch(MUTATION_TYPES.CHANGE_CURRENT_ROUTE_TO, newRoute)
    }
  }
}

import { mapState } from 'vuex'
import { MUTATION_TYPES, NETWORKS } from '../util/constants'
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
