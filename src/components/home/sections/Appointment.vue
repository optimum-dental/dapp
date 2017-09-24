<template>
  <div id="appointment">
    <div class="content">
      <div class="appointment-content">
        <div class="title">
          Book appointments with Dentists easily, right from home.
        </div>
        <div class="text">
          ODL connects you with the best dentists around you. No more office waiting rooms.
        </div>
      </div>
      <div class="appointment-image"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appointment'
}
</script>

<style scoped>
#appointment {
  width: 100%;
  height: 648px;
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
  margin: 224px 0px 0px 0px;
  font-size: 15px;
}

.title {
  font-size: 30px;
  height: 75px;
  width: 450px;
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
  margin: 174px 0px 0px 70px;
  background: url('/static/images/bookAppointment.png') no-repeat;
  background-size: contain;
}
</style>
