<template>
  <div class="main-page">
    <SideBarTemplate :setCurrentView='setCurrentView'/>
    <HeaderTemplate />
    <MainViewTemplate
      :current-view='currentView'
      :avatarCanvas="avatarCanvas"
      :user="user"
    />
  </div>
</template>

<script>
  export default {
    name: 'main-page',
    props: ['avatarCanvas', 'user', 'currentView'],
    components: {
      HeaderTemplate,
      MainViewTemplate,
      SideBarTemplate
    },
    methods: {
      setCurrentView: function (currentView) {
        this.$store.dispatch(ACTION_TYPES.UPDATE_CURRENT_VIEW, currentView)
      }
    }
  }

  import HeaderTemplate from './layout/HeaderTemplate.vue'
  import SideBarTemplate from './layout/SideBarTemplate.vue'
  import MainViewTemplate from './layout/MainViewTemplate.vue'
  import { ACTION_TYPES } from '../../util/constants'

</script>

<style scoped>
  .main-page {
    width: 100%;
    height: auto;
    margin: auto;
    position: relative;
  }
</style>
