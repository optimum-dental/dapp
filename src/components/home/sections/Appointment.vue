<template>
  <div id="appointment" :has-injected-web3="hasInjectedWeb3">
    <div class="content">
      <div class="appointment-content">
        <div class="title">
          Book appointment on demand with Dentist easily.
        </div>
        <div class="text">
          Oral Data Link makes fast access to the very best dentists an easy reality.
        </div>
      </div>
      <div class="appointment-image"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appointment',
  props: ['hasInjectedWeb3']
}
</script>

<style scoped>
#appointment {
  width: 100%;
  height: 400px;
  background: #ffffff;
  margin-top: 0px;
}

.content {
  height: 100%;
  width: 100%;
  max-width: 920px;
  color: #404040;
  margin: auto;
}

.appointment-content {
  clear: none;
  float: left;
  height: 200px;
  width: 550px;
  margin: 100px 0px 0px 0px;
  font-size: 15px;
}

.title {
  font-size: 30px;
  height: 110px;
  width: 270px;
  margin-bottom: 10px;
}

.text {
  height: 80px;
  text-align: justify;
}

.appointment-image {
  clear: none;
  float: left;
  height: 300px;
  width: 300px;
  margin: 50px 0px 0px 70px;
  background: url('/static/images/bookAppointment.png') no-repeat;
  background-size: contain;
}
</style>
