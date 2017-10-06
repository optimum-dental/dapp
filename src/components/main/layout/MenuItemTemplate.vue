<template>
  <router-link :to="item.key" id="menu-item-template" class="menu-item">
    <div class="menu-icon" :style="{ background: 'url(' + item.icon + ') no-repeat' }"></div>
    <div class="menu-title">{{ item.text }}</div>
  </router-link>
</template>


<script type="text/javascript">
  export default {
    name: 'menu-item-template',
    props: [ 'item' ]
  }
</script>


<style scoped>
  .menu-item.router-link-active, .menu-item:hover {
    background-color: #296d92;
  }

  .menu-item.router-link-active:after {
    content: '';
    display: inline-block;
    position: absolute;
    right: 0;
    margin-top: 17px;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-right: 10px solid  #eef0ef;
  }

  .menu-item {
    width: 100%;
    height: 50px;
    cursor: pointer;
    display: block;
  }

  .menu-icon {
    height: 30px;
    width: 30px;
    margin: 10px 10px;
    display: inline-block;
    background-size: contain !important;
    float: left;
  }

  .menu-title {
    height: 50px;
    line-height: 50px;
    width: 207px;
    margin: 0px;
    display: inline-block;
    font-size: 13px;
    color: #f5f9f8;
    font-weight: 400;
    float: left;
    border-bottom: 1px #2a7197 solid;
  }

</style>
