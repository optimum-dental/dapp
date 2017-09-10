<template>
  <div id="how-it-works" :has-injected-web3="hasInjectedWeb3">
    <div class="content">
      <div class="title">How it works?</div>
      <div class="flow-line"></div>
      <div class="flow-items">
        <div class="flow-one flow-item"></div>
        <div class="flow-two flow-item"></div>
        <div class="flow-three flow-item"></div>
        <div class="flow-four flow-item"></div>
      </div>

      <div class="flow-texts">
        <div class="text">Find Dentist</div>
        <div class="text">Request Appointment</div>
        <div class="text">Receive Medical Care</div>
        <div class="text">Leave Feedback</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'how-it-works',
  props: ['hasInjectedWeb3']
}
</script>

<style scoped>
#how-it-works {
  width: 100%;
  height: 400px;
  background: #ffffff;
  margin-top: 0px;
}

.content {
  height: 100%;
  text-align: center;
  max-width: 920px;
  margin: auto;
}

.title {
  clear: both;
  height: 50px;
  margin: 100px 0px 10px 0px;
  font-size: 30px;
}

.flow-line {
  border-bottom: 1px solid #a1a2a1;
  width: 590px;
  margin: auto;
}

.flow-items {
  width: 820px;
  margin: auto;
}

.flow-item {
  clear: none;
  display: inline-block;
  background-size: contain !important;
  width: 62px;
  height: 62px;
  border-radius: 62px;
  margin: 21px 65px;
}

.flow-texts {
  width: 820px;
  margin: auto;
}

.text {
  clear: none;
  display: inline-block;
  width: 160px;
  height: 30px;
  margin: 0px 17px;
  font-size: 15px;
}

.flow-item:before {
  content: '';
  border-right: 1px solid #a1a2a1;
  width: 1px;
  height: 55px;
  position: relative;
  top: -22px;
}

.flow-one {
  background: url('/static/images/find-dentist.png') no-repeat;
}

.flow-two {
  background: url('/static/images/request-appointment.png') no-repeat;
}

.flow-three {
  background: url('/static/images/receive-medical-care.png') no-repeat;
}

.flow-four {
  background: url('/static/images/leave-feedback.png') no-repeat;
}
</style>
