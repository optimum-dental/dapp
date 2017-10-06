<template>
  <div class="main-page">
    <SideBarTemplate
      :is-d-app-ready="isDAppReady"
    />
    <HeaderTemplate
      :is-d-app-ready="isDAppReady"
    />
    <MainViewTemplate
      :current-view="currentView"
      :is-d-app-ready="isDAppReady"
      :is-valid-user-but="isValidUserBut"
    />
  </div>
</template>

<script>
  export default {
    computed: {
      user () {
        return this.$root.user
      }
    },
    name: 'main-page',
    props: [ 'currentView', 'isDAppReady', 'isValidUserBut' ],
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
