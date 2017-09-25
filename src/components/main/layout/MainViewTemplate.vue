<template>
  <component class="main-view-template"
    :is="currentView"
    :avatar-canvas="avatarCanvas"
    :user="user">
  </component>
</template>

<script type="text/javascript">
  export default {
    name: 'main-view-template',
    props: [ 'avatarCanvas', 'currentView', 'user' ]
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
