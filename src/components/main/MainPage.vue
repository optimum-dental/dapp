<template>
  <div class="main-page">
    <SideBarTemplate :set-current-view='setCurrentView'/>
    <HeaderTemplate />
    <MainViewTemplate
      :avatar-canvas="avatarCanvas"
      :current-view='currentView'
      :user="user"
    />
  </div>
</template>

<script>
  export default {
    name: 'main-page',
    props: ['avatarCanvas', 'currentView', 'setCurrentView', 'user'],
    components: {
      HeaderTemplate,
      MainViewTemplate,
      SideBarTemplate
    }
  }

  import HeaderTemplate from './layout/HeaderTemplate.vue'
  import SideBarTemplate from './layout/SideBarTemplate.vue'
  import MainViewTemplate from './layout/MainViewTemplate.vue'
</script>

<style scoped>
  .main-page {
    width: 100%;
    height: auto;
    margin: auto;
    position: relative;
  }
</style>
