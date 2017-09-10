<template>
  <div id="main-page" :has-injected-web3="hasInjectedWeb3">
    <router-link to="/">Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'main-page',
  props: ['hasInjectedWeb3'],
  created: function () {
    this.$store.dispatch(MUTATION_TYPES.CHANGE_CURRENT_ROUTE_TO, '/main-page')
  }
}

import { MUTATION_TYPES } from '../../util/constants'
</script>

<style>
#main-page {
  
}
</style>
