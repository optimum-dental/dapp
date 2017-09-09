<template>
  <div id="app">
    <router-view :is-connected-to-web3="isConnectedToWeb3" :user="user"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  props: ['user'],
  computed: {
    ...mapState({
      isConnectedToWeb3: state => state.web3.isConnected
    })
  },
  watch: {
    isConnectedToWeb3: function (web3ConnectionValue) {
      if (web3ConnectionValue) {
        console.log('ODLL dApp has successfully connected to Web3')
      } else {
        console.log('Unable to connect ODLL dApp to Web3', web3ConnectionValue, this.web3Error)
      }
    }
  }
}

import { mapState } from 'vuex'
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
