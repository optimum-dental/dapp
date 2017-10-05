<template>
  <component class="main-view-template"
    :is="currentView"
    :avatar-canvas="avatarCanvas"
    :user="user"
    :is-d-app-ready="isDAppReady"
    :countries="countries"
    :states="states"
    @updateAvatarCanvas="updateAvatarCanvas"
    @callToWriteUser="callToWriteUser"
  >
  </component>
</template>

<script type="text/javascript">
  export default {
    name: 'main-view-template',
    methods: {
      updateAvatarCanvas (payload = null) {
        this.$emit('updateAvatarCanvas', payload)
      },
      callToWriteUser (payload = null) {
        this.$emit('callToWriteUser', payload)
      }
    },
    props: [ 'avatarCanvas', 'currentView', 'user', 'isDAppReady', 'countries', 'states' ]
  }
</script>

<style scoped>
  .main-view-template {
    min-width: 80%;
    position: absolute;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    left: 257px;
    top: 60px;
  }
</style>
