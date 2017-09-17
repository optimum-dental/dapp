<template>
  <div id="sidebar-template" class="sticky sidebar">
    <div class="content">
      <section id='brand-home'>
        <img class="asset" src="/static/images/odll_title_icon.png" alt="brand-image"/>
        <div class="footer">
        </div>
      </section>
      <section id="menu-list">
        <MenuItemTemplate/>
      </section>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'sidebar-template',
    components: {
      MenuItemTemplate
    }
  }

  import MenuItemTemplate from './MenuItemTemplate.vue'
</script>

<style scoped>
  #sidebar-template {
    width: 20%;
  }

  #brand-home {
    background-color: #36303e;
    height: 300px;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }


  #brand-home .asset{
    margin-top: 40px;
    height: 220px;
    height: 220px;
  }

  #brand-home .footer {
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

  #menu-list {
    background-color: #3285b1;
    flex: 1;
  }

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
