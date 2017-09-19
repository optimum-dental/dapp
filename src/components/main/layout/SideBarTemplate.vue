<template>
  <div id="sidebar-template" class="sticky sidebar">
    <div class="content">
      <section id='brand'>
        <img class="asset" src="/static/images/odll_title_icon.png" alt="brand-image"/>
        <div class="footer">
        </div>
      </section>
      <section id="menu">
        <MenuTemplate :updateCurrentView="setCurrentView"/>
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
    height: 250px;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }


  #brand .asset{
    height: 200px;
    margin: 20px;
  }

  #brand .footer {
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
    flex: 1;
  }

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
