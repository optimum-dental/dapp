<template>
  <div id="sidebar-template" class="sticky sidebar">
    <div class="content">
      <section id='brand'>
        <div class='image-wrap'>
          <div class='image'></div>
        </div>
        <div class="footer">
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
    width: 20%;
  }

  #brand {
    background-color: #282735;
    flex: 0.3;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }


  #brand .image-wrap{
    box-sizing: border-box;
    display: block;
    width: 100%;
    text-align: center;
    flex: 0.95;
    margin: 25px auto;
  }

  #brand .image {
    background: url(/static/images/odll_title_icon.png) no-repeat;
    background-size: contain;
    width: 100%;
    height: 100%;
  }

  #brand .asset {
    display: flex;
    flex: 1;
    width: 100%;
  }

  #brand .footer {
  flex: 0.05;
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
    flex: 0.63;
  }

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .footer {
    flex: 0.07;
    display: flex;
    justify-content: space-between;
    background-color: #3285b1;
    align-items: center;
  }

  .social-links {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex: 0.4;
    margin-left: 10px;
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
  }
</style>
