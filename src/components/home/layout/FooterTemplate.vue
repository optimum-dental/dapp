<template>
  <div id="footer-template">
    <div class="content">
      <div class="links">
        <router-link to="/about-us">About Us</router-link> <span class="divider"></span>
        <router-link to="/our-services">Our Services</router-link> <span class="divider"></span>
        <router-link to="/dentists">Find Dentist</router-link> <span class="divider"></span>
        <router-link to="/dentists">FAQs</router-link> <span class="divider"></span>
        <router-link to="/how-to-start">How it works?</router-link>
      </div>

      <div class="copyright">
        <div class="text">Copyright &copy; 2017 Oraldatalink.com. All rights reserved.</div>
      </div>

      <div class="social">
        <a href="https://facebook.com/oral-data-link" target="_blank" class="facebook"></a>
        <a href="https://twitter.com/OralDataLink" target="_blank" class="twitter"></a>
        <a href="https://www.instagram.com/oraldatalink/" target="_blank" class="instagram"></a>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'footer-template'
  }
</script>

<style scoped>
  #footer-template {
    width: 100%;
    background: #dfe8ef;
    color: #1d1e1f;
    height: 150px;
  }

  .content {
    height: 100%;
    max-width: 920px;
    margin: auto;
    text-align: center;
    padding: 50px 0px 10px 0px;
  }

  .links {
    clear: both;
    height: 20px;
    margin-bottom: 30px;
  }

  .links a {
    color: inherit;
    text-decoration: none;
  }

  .divider {
    color: inherit;
  }

  .divider:before {
    content: "|"
  }

  .copyright {
    clear: both;
    height: 20px;
    font-size: 14px;
  }

  .social {
    clear: both;
    height: 20px;
    float: right;
    position: relative;
    top: -39px;
  }

  .facebook {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('/static/images/Facebook.png') no-repeat;
    background-size: contain;
  }

  .twitter {
    display: inline-block;
    width: 20px;
    margin: 0px 0px 0px 30px;
    height: 20px;
    background: url('/static/images/twitter.png') no-repeat;
    background-size: contain;
  }

  .instagram {
    display: inline-block;
    width: 20px;
    margin: 0px 0px 0px 30px;
    height: 20px;
    background: url('/static/images/instagram.png') no-repeat;
    background-size: contain;
  }
</style>
