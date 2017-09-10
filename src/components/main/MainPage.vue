<template>
  <div id="main-page" :has-injected-web3="hasInjectedWeb3">
    <router-link to="/">Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'main-page',
  props: ['hasInjectedWeb3']
}

</script>

<style>
#main-page {
  
}
</style>
