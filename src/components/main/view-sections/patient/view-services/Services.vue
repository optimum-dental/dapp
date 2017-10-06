<template>
  <div class="wrapper">
    <div id="services">{{totalRows}}
      <div class="title">Our Services</div>
      <div class="row" v-for="i in totalRows">
        <div class="column" v-for="j in 3">
          <div class="item" v-for="k in 4">
            <div class="item-bullet"></div>
            <div class="item-text"></div>
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
        services: [
          '',
          'Anti-Snoring Treatment',
          'Bonding',
          'Crown and Bridgework',
          'Custom Mouth Guards',
          'Dentures',
          'Fillings',
          'Fluoride Treatments',
          'Implants',
          'Oral Surgery',
          'Orthodontics',
          'Periodontics',
          'Root Canal Treatments',
          'Routine Care',
          'Sealants',
          'Sedation',
          'Veneers',
          'Whitening',
          'X-Rays'
        ]
      }
    }
  }
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
    align-items: center;
  }

  .column {
    /*width: 31%;*/
    /*display: inline-block;*/
    /*margin-right: 2%;*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 40px;
  }

  .item-bullet {
    height: 10px;
    width: 10px;
    background: #3384b2;
  }

  .item-text {
    height: 10px;
    width: 10px;
    background: #3384b2;
  }
</style>
