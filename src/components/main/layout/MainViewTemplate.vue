<template>
  <component class="main-view-template" :is="currentView"></component>
</template>

<script type="text/javascript">
  export default {
    name: 'main-view-template',
    props: [ 'currentView' ]
  }
</script>

<style scoped>
  .main-view-template {
    width: 250px;
  }
</style>
