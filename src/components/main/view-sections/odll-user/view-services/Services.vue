<template>
  <div class="wrapper">
    <div id="services">
      <div class="title">Our Services</div>
      <div class="row" v-for="i in totalRows">
        <div class="column" v-for="j in 3">
          <div class="item" v-for="k in 4" v-if="services[(k - 1) + (4 * (j - 1)) + (12 * (i - 1))]">
            <div class="item-bullet"></div>
            <div class="item-text">{{services[(k - 1) + (4 * (j - 1)) + (12 * (i - 1))]}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    computed: {
      totalRows () {
        return Math.ceil(this.services.length / 12)
      }
    },
    data: function () {
      return {
        services: services
      }
    }
  }

  import services from '../../../../../../static/json/services/services.json'
</script>

<style scoped>
  .wrapper {
    background: #ffffff;
    height: 100%;
    min-height: 80vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #services {
    background: #ffffff;
    min-height: 70vh;
    width: 80%;
    font-size: 12px;
    margin: 30px auto;
    color: #adadad;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    height: 40px;
    line-height: 40px;
    width: 100%;
    text-align: left;
    font-size: 20px;
    margin-bottom: 20px;
  }

  .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 40px;
  }

  .column {
    width: 31%;
    display: inline-block;
    margin-right: 2%;
    display: inline-block;
  }

  .item {
    display: block;
    height: 30px;
    line-height: 30px;
  }

  .item-bullet {
    height: 7px;
    width: 7px;
    background: #3384b2;
    display: inline-block;
  }

  .item-text {
    display: inline-block;
    margin-left: 5px;
    font-size: 14px;
  }
</style>
