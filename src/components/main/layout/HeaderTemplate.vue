<template>
  <div id="header-template" class="sticky header">
    <div class="content"></div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'header-template'
  }
</script>

<style scoped>
  #header-template {
    width: 770px;
  }

  .sticky {
    position: absolute;
    left: 250px;
    top: 0px;
    height: 40px;
    background: #f9f9f9;
    width: 100%;
    box-sizing: border-box;
    z-index: 666;
    border: 1px solid #dcdede;
  }

  .content {
    height: 30px;
    line-height: 30px;
    margin-top: 5px
  }
</style>
