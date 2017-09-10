<template>
  <div id="header-template" class="sticky header">
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
</template>

<script type="text/javascript">
  export default {
    name: 'header-template',
    props: [ 'hasInjectedWeb3' ]
  }
</script>

<style scoped>
  #header-template {
    width: 100%;
  }

  .sticky {
    position: fixed;
    padding: 5px 20px;
    top: 0px;
    height: 70px;
    background: #292836;
    width: 100%;
    box-sizing: border-box;
    z-index: 666;
  }

  .content {
    height: 60px;
    line-height: 60px;
  }

  .logo {
    float: left;
    width: 150px;
    height: 36px;
    background: url('/static/images/OralDataLink4.png') no-repeat;
    background-size: contain;
    margin: 15px 0px; 
  }

  .links {
    float: right;
  }

  .links a {
    font-size: 14px;
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
