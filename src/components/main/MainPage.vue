<template>
  <div id="main-page" :is-connected-to-web3="isConnectedToWeb3">
    <div> Web3 Active in MainPage? {{ isConnectedToWeb3 }} </div>
    <div v-if="isConnectedToWeb3">Main Page::::Web3 is Active</div>
    <div v-else>Main Page::::Web3 is NOT Active</div>
    <router-link to="/">Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'main-page',
  props: ['isConnectedToWeb3']
}
</script>

<style>
#main-page {
  
}
</style>
