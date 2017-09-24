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
    width: 250px;
  }
</style>
