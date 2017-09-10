<template>
  <div id="home" :has-injected-web3="hasInjectedWeb3">
    <HeaderTemplate />
    <BodyTemplate />
    <FooterTemplate />
  </div>
</template>

<script>
export default {
  name: 'home',
  props: [ 'hasInjectedWeb3' ],
  components: {
    HeaderTemplate,
    BodyTemplate,
    FooterTemplate
  }
}

import HeaderTemplate from './layout/HeaderTemplate'
import BodyTemplate from './layout/BodyTemplate'
import FooterTemplate from './layout/FooterTemplate'
</script>

<style scoped>
  #home {
    width: 100%;
  }
</style>
