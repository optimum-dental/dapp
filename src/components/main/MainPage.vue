<template>
  <div id="main-page" :is-web3-active="isWeb3Active">
    <div> Web3 Active in MainPage? {{ isWeb3Active }} </div>
    <div v-if="isWeb3Active">Main Page::::Web3 is Active</div>
    <div v-else>Main Page::::Web3 is Active</div>
    <router-link to="/">Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'main-page',
  props: ['isWeb3Active']
}
</script>

<style>
#main-page {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
