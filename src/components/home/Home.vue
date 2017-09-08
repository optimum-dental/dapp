<template>
  <div id="home" :is-web3-active="isWeb3Active">
    <div> Web3 Active in Home? {{ isWeb3Active }} </div>
    <div v-if="isWeb3Active">Home::::Web3 is Active</div>
    <div v-else>Home::::Web3 is Active</div>
    <router-link to="/main-page">Get Started</router-link>
  </div>
</template>

<script>
export default {
  name: 'home',
  props: [ 'isWeb3Active' ]
}
</script>

<style>
#home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
