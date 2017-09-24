<template>
  <div class="main-page">
    <SideBarTemplate :set-current-view='setCurrentView'/>
    <HeaderTemplate />
    <MainViewTemplate :current-view='currentView' />
  </div>
</template>

<script>
  export default {
    name: 'main-page',
    props: ['currentView', 'setCurrentView'],
    computed: {
      user () {
        return this.$store.state.user
      }
    },
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
