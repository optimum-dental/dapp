<template>
  <div id="menu-item-template" :class="{ 'menu-item': true, active: item.isActive }">
    <div class="container">
      <span v-if="item.isActive" class='active-indicator'/>
      <section class='content'>
        <div class="menu-icon">
          <img v-if="item.icon" src="item.icon">
        </div>
        <div class="menu-title">
          <span>{{ item.text }}</span>
        </div>
      </section>
    </div>
  </div>
</template>


<script type="text/javascript">
  export default {
    name: 'menu-item-template',
    props: ['item']
  }
</script>


<style scoped>
  .menu-item.active, .menu-item:hover {
    background-color: #296d92;
  }

  .menu-item .content {
    height: 70px;
    display: flex;
    flex=-direction: column;
    cursor: pointer;
  }

  .menu-icon {
    height: 100%;
    flex: 0.25;
    margin-right: -20px;
  }

  .menu-title {
    display: flex;
    justify-content: flex-start;
    flex: 1;
    align-items: center;
    border-bottom: 1px #296d92 solid;
    border-top: 1px transparent solid;
    height: 100%;
    width: 100%;
    font-size: 15px;
    padding-left: 35px;
    color: #efefef;
    font-weight: 400;
  }

  .menu-title:hover {
    cursor: pointer;
  }

  .active-indicator {
    display: inline-block;
    position: absolute;
    right: 0;
    margin-top: 27px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #fff;
  }

</style>
