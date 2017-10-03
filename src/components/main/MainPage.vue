<template>
  <div class="main-page">
    <SideBarTemplate
      :is-d-app-ready="isDAppReady"
    />
    <HeaderTemplate
      :user="user"
      :is-d-app-ready="isDAppReady"
    />
    <MainViewTemplate
      :avatar-canvas="avatarCanvas"
      :current-view='currentView'
      :user="user"
      :is-d-app-ready="isDAppReady"
      @updateAvatarCanvas="updateAvatarCanvas"
    />
  </div>
</template>

<script>
  export default {
    name: 'main-page',
    props: [ 'avatarCanvas', 'currentView', 'user', 'isDAppReady' ],
    components: {
      HeaderTemplate,
      MainViewTemplate,
      SideBarTemplate
    },
    methods: {
      updateAvatarCanvas (payload = null) {
        this.$emit('updateAvatarCanvas', payload)
      }
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
