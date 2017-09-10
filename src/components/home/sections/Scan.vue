<template>
  <div id="scan" :has-injected-web3="hasInjectedWeb3">
    <div class="content">
      <div class="scan-image"></div>
      <div class="scan-content">
        <div class="title">
          Get quick <br>scan appointment <br>with Dentist
        </div>
        <div class="text">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scan',
  props: ['hasInjectedWeb3']
}
</script>

<style scoped>
#scan {
  width: 100%;
  height: 400px;
  background: #f4a763;
  margin-top: 0px;
}

.content {
  height: 100%;
  width: 100%;
  max-width: 920px;
  color: #404040;
  margin: auto;
}

.scan-image {
  clear: none;
  float: left;
  height: 300px;
  width: 300px;
  margin-top: 50px;
  background: url('/static/images/scanAppointment.png') no-repeat;
  background-size: contain;
}

.scan-content {
  clear: none;
  float: left;
  height: 150px;
  width: 350px;
  margin: 125px 0px 0px 270px;
  font-size: 15px;
}

.title {
  font-size: 30px;
  height: 110px;
  width: 250px;
  margin-bottom: 10px;
}

.text {
  height: 100px;
  text-align: justify;
}
</style>
