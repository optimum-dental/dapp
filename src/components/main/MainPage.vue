<template>
  <div class="main-page">
    <HeaderTemplate />
    <SideBarTemplate />
    <MainViewTemplate :is="currentView" />
  </div>
</template>

<script>
  export default {
    name: 'main-page',
    props: ['currentView'],
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
    width: 1020px;
    height: auto;
    margin: auto;
    position: relative;
  }
</style>
