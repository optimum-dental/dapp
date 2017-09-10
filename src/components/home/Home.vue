<template>
  <div id="home" :has-injected-web3="hasInjectedWeb3">
    <div class="sticky header">
      <div class="content">
        <div class="logo"></div>
        <div class="links">
          <router-link to="/about-us">About Us</router-link> <span class="divider"></span>
          <router-link to="/our-services">Our Services</router-link> <span class="divider"></span>
          <router-link to="/dentists">Find Dentist</router-link> <span class="divider"></span>
          <router-link to="/how-to-start">How To Get Started?</router-link>
        </div>
      </div>
    </div>
    <router-link to="/main-page">Get Started</router-link>
  </div>
</template>

<script>
export default {
  name: 'home',
  props: [ 'hasInjectedWeb3' ],
  created: function () {
    this.$store.dispatch(MUTATION_TYPES.CHANGE_CURRENT_ROUTE_TO, '/')
  }
}

import { MUTATION_TYPES } from '../../util/constants'
</script>

<style>
#home {
  width: 100%;
}

.sticky {
  position: absolute;
  padding: 5px 20px;
  top: 0px;
  height: 40px;
  background: #292836;
  width: 100%;
  max-width: 960px;
  box-sizing: border-box;
}

.content {
  height: 30px;
  line-height: 30px;
}

.logo {
  float: left;
  width: 150px;
  height: 100%;
}

.links {
  float: right;
}

.links a {
  font-size: 12px;
  color: #feffff;
  text-decoration: none;
}

.divider {
  color: #feffff;
}

.divider:before {
  content: "|"
}
</style>
