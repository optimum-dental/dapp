<template>
  <div id="home" :current-view="currentView">
    <HeaderTemplate />
    <BodyTemplate :vectors="vectors" />
    <FooterTemplate />
  </div>
</template>

<script>
export default {
  name: 'home',
  props: [ 'currentView' ],
  components: {
    HeaderTemplate,
    BodyTemplate,
    FooterTemplate
  },
  computed: {
    user () {
      return this.$root.user
    },
    vectors () {
      return vectorStyle
    }
  },
  mounted: function () {
    this.$emit('resetIsValidUserBut')
    if (['2', '3', '4'].includes(this.user.type)) this.$router.push(this.$root.defaultRoute[this.user.type])
  }
}

import HeaderTemplate from './layout/HeaderTemplate'
import BodyTemplate from './layout/BodyTemplate'
import FooterTemplate from './layout/FooterTemplate'
import vectorStyle from '../../../static/js/vectorAnimation.js'
</script>

<style scoped>
  #home {
    width: 100%;
  }
</style>
