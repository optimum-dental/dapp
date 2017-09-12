<template>
  <div id="header-template" class="sticky header">
    <div class="content">
      <router-link to="/" class="logo"></router-link>
      <div class="links">
        <router-link to="/about-us" class="link1">About Us</router-link> <span class="divider"></span>
        <router-link to="/our-services" class="link2">Our Services</router-link> <span class="divider"></span>
        <router-link to="/dentists" class="link3">Find Dentist</router-link> <span class="divider"></span>
        <router-link to="/how-to-start" class="link4">How To Get Started?</router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'header-template'
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
    height: 60px;
  }

  .links:before {
    content: '|||||';
    color: #dcdede;
    position: absolute;
    right: 20px;
    height: 20px;
    line-height: 20px;
    top: 40px;
  }

  .links:hover a {
    display: block;
  }

  .links a {
    display: none;
    width: 150px;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #282735;
    text-decoration: none;
    text-align: center;
    border-bottom: 1px solid #dcdede;
    background: #efefef;
    position: absolute;
    right: 20px;
  }

  .links a:last-child {
    border: none;
  }

  .links a:hover {
    background: #dcdede;
    color: #feffff;
  }

  .link1 {
    top: 60px;
  }

  .link2 {
    top: 110px;
  }

  .link3 {
    top: 160px;
  }

  .link4 {
    top: 210px;
  }

  .divider {
    display: none;
  }

  @media only screen and (min-width: 780px) {
    .links:before {
      display: none;
    }

    .links:hover a {
      display: inline-block;
    }

    .links a:hover {
      background: transparent;
      color: #feffff;
    }

    .links a {
      display: inline-block;
      width: auto;
      margin-top: 5px;
      color: #feffff;
      border: none;
      position: relative;
      top: 0px;
      background: transparent;
      right: 0px;
    }

    .divider {
      color: #feffff;
      display: inline-block;
    }

    .divider:before {
      content: "|";
    }
  }
</style>
