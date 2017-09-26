<template>
  <div id="sidebar-template" class="sticky sidebar">
    <div class="content">
      <section id='brand'>
        <router-link to="/" class='image-wrap'></router-link>
        <div class="brand-footer">
        </div>
      </section>
      <section id="menu">
        <MenuTemplate :updateCurrentView="setCurrentView"/>
      </section>
      <section class='footer'>
        <div class='social-links'>
          <a href='http://www.facebook.com' class='item facebook'></a>
          <a href='http://www.twitter.com' class='item twitter'></a>
        </div>
        <a href='#' class='help-link'>Help</a>
      </section>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'sidebar-template',
    props: ['setCurrentView'],
    components: {
      MenuTemplate
    }
  }

  import MenuTemplate from './MenuTemplate.vue'
</script>

<style scoped>
  #sidebar-template {
    width: 257px;
    position: fixed;
    height: 100%;
    left: 0px;
    top: 0px;
    background: #3285b1;
    overflow-y: auto;
    overflow-x: hidden;
    margin-left: 0px;
    margin-right: 0px;
    height: 100%;
  }

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #brand {
    background-color: #282735;
    width: 100%;
    height: 257px;
  }


  #brand .image-wrap {
    box-sizing: border-box;
    display: block;
    height: 201px;
    width: 201px;
    margin: 25px 28px ;
    background: url('/static/images/odll_title_icon.png') no-repeat;
    background-size: contain;
    background-position-x: 21px;
  }


  #brand .brand-footer {
    height: 7px;
    width: 100%;
    background-image: linear-gradient(
      to right,
      #dd5b22,
      #dd5b22 20%,
      #e89849 20%,
      #e89849 40%,
      #24bcad 40%
    );
  }

  .sticky {
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100vh;
    background: #f9f9f9;
    width: 100%;
    box-sizing: border-box;
    z-index: 666;
  }

  #menu {
    background-color: #3285b1;
    width: 100%;
  }

  .footer {
    background-color: #3285b1;
    width: 257px;
    bottom: 0px;
    position: fixed;
    z-index: 666;
  }

  .social-links {
    display: inline-block;
    margin-left: 10px;
    margin-bottom: 10px;
    float: left;
  }

  .social-links .item {
    display: inline-block;
    width: 25px;
    height: 25px;
    background-size: contain !important;
    vertical-align: middle;
  }

  .social-links .facebook {
    background: url(/static/images/Facebook.png) no-repeat;
  }

  .social-links .twitter {
    background: url(/static/images/twitter.png) no-repeat;
  }

  .help-link {
    display: inline-block;
    margin-right: 15px;
    color: #fff;
    vertical-align: middle;
    text-decoration: none;
    cursor: pointer;
    float: right;
  }
</style>
