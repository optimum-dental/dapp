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
    width: 80%;
  }

  .sticky {
    position: absolute;
    left: 20%;
    top: 0px;
    height: 60px;
    background: #fff;
    width: 100%;
    box-sizing: border-box;
    z-index: 666;
    border: none;
    border-bottom: 2px solid #c4c4c4;
  }

  .content {
    height: 30px;
    line-height: 30px;
    margin-top: 5px
  }
</style>
