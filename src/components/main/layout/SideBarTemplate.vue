<template>
  <div id="sidebar-template" class="sticky sidebar">
    <div class="content"></div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'sidebar-template'
  }
</script>

<style scoped>
  #sidebar-template {
    width: 250px;
  }

  .sticky {
    position: absolute;
    left: 0px;
    top: 0px;
    height: 620px;
    background: #f9f9f9;
    width: 100%;
    box-sizing: border-box;
    z-index: 666;
  }

  .content {
    height: 100%;
    border: 1px solid #dcdede;
  }
</style>