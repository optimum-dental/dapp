<template>
  <div id="sidebar-template" class="sticky sidebar">
    <div class="content" v-if="isDAppReady">
      <section id='brand'>
        <router-link to="/" class='image-wrap'></router-link>
        <div class="brand-footer">
        </div>
      </section>
      <section id="menu">
        <MenuTemplate />
      </section>
      <section class='footer'>
        <div class='social-links'>
          <a href="http://www.facebook.com" target="_blank" class="item facebook"></a>
          <a href="https://twitter.com/OralDataLink" target="_blank" class="item twitter"></a>
          <a href="https://www.instagram.com/oraldatalink/" target="_blank" class="item instagram"></a>
        </div>
        <a href='#' class='help-link'>Help</a>
      </section>
    </div>

    <div class="content" v-else>
      <section id='brand'>
        <div class='image-wrap'></div>
        <div class="brand-footer">
        </div>
      </section>
      <section id="menu">
        <div v-for="item in 6" :key="item.key">
          <div class="pre-menu-item">
            <div class="loader pre-menu-icon"></div>
            <div class="pre-menu-title">
              <div class="loader"></div>
            </div>
          </div>
        </div>
      </section>
      <section class='footer'>
        <div class='social-links'>
          <div class='loader item'></div>
          <div class='loader item'></div>
        </div>
        <div class='loader help-link'></div>
      </section>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'sidebar-template',
    props: ['isDAppReady'],
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
    width: 257px;
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
    width: 257px;
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
    width: 257px;
    margin-bottom: 50px;
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
    margin-right: 20px;
    background-size: contain !important;
    vertical-align: middle;
  }

  .social-links .facebook {
    background: url(/static/images/Facebook.png) no-repeat;
  }

  .social-links .twitter {
    background: url(/static/images/twitter.png) no-repeat;
  }

  .social-links .instagram {
    background: url(/static/images/instagram.png) no-repeat;
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

  .pre-menu-item {
    width: 100%;
    height: 50px;
  }

  .pre-menu-icon {
    height: 30px;
    width: 30px;
    margin: 10px 10px;
    display: inline-block;
    float: left;
  }

  .pre-menu-title {
    height: 50px;
    width: 207px;
    margin: 0px;
    display: inline-block;
    float: left;
    border-bottom: 1px #296d92 solid;
  }

  .pre-menu-title .loader {
    height: 10px;
    margin: 20px 0px;
    width: 170px;
    border-radius: 5px;
  }

  .loader {
    animation: odll-loading-animation 1.2s infinite;
  }

  .loader.item {
    border-radius: 25px;
  }

  .loader.help-link {
    height: 12px;
    width: 60px;
    border-radius: 5px;
    margin: 6px 15px;
  }

  @keyframes odll-loading-animation {
    0% {
      background: #3a7ea3;
    }

    50% {
      background: #2d7297;
    }

    100% {
      background: #296d92;
    }
  }
</style>
