<template>
  <div id="home" :is-connected-to-web3="isConnectedToWeb3">
    <div> Web3 Active in Home? {{ isConnectedToWeb3 }} </div>
    <div v-if="isConnectedToWeb3">Home::::Web3 is Active</div>
    <div v-else>Home::::Web3 is NOT Active</div>
    <router-link to="/main-page">Get Started</router-link>
  </div>
</template>

<script>
export default {
  name: 'home',
  props: [ 'isConnectedToWeb3' ]
}
</script>

<style>
#home {
  
}
</style>
