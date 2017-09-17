<template>
  <div id="menu-item-template" class="menu-item">
    <div class="container">
      <div class='active-indicator'>
      </div>
      <section class='content'>
        <div class="menu-icon">

        </div>
        <div class="menu-title">
          <span>Get Started</span>
        </div>
      </section>
    </div>
  </div>
</template>


<script type="text/javascript">
  export default {
    name: 'menu-item-template'
  }
</script>


<style scoped>
  .menu-item .content {
    height: 70px;
    display: flex;
    flex=-direction: column;
  }


  .menu-icon {
    height: 100%;
    flex: 0.25;
    margin-right: -20px;
    background: url('/static/images/find-dentist.png') no-repeat;
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
    font-size: 1.4em;
    padding-left: 35px;
    color: #efefef;
    font-weight: 400;
  }

</style>
