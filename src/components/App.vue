<template>
  <div id="app">
    <router-view :is-web3-active='isWeb3Active'></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  props: ['isWeb3Active']
}
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
