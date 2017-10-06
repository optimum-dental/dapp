<template>
  <component class="main-view-template"
    :is="currentView"
    :is-d-app-ready="isDAppReady"
    :is-valid-user-but="isValidUserBut"
  >
  </component>
</template>

<script type="text/javascript">
  export default {
    computed: {
      user () {
        return this.$root.user
      }
    },
    name: 'main-view-template',
    props: [ 'currentView', 'isDAppReady', 'isValidUserBut' ]
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
