<template>
  <div id="why">
    <div class="content">
      <div class="why-image"></div>
      <div class="why-content">
        <div class="title">
          Why Us?
        </div>
        <div class="text">
          <ul class="reasons">
            <li class="reason"><strong>Security</strong>: Your personal chart on the Blockchain is 100% secure. Your HIPAA information is 100% safe and encrypted.</li>
            <li class="reason"><strong>Freedom</strong>: Your records are yours - they stay with you, not our doctors.</li>
            <li class="reason"><strong>Speed</strong>: See a doctor and receive treatment faster than ever!</li>
            <li class="reason"><strong>Cost</strong>: We offer the best prices anywhere, which gives your wallet a break.</li>
            <li class="reason"><strong>Ease</strong>: Get the nearest, very best doctors all at your fingertips.</li>
            <li class="reason"><strong>Satisfaction</strong>: We have been patients too - treating your dental needs correctly, on time, the first time is our goal. We're not happy with your smile until YOU are.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'why'
}
</script>

<style scoped>
#why {
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

.why-image {
  clear: none;
  float: left;
  height: 300px;
  width: 300px;
  margin-top: 174px;
  background: url('/static/images/OralDataLink1.png') no-repeat;
  background-size: contain;
}

.why-content {
  clear: none;
  float: left;
  height: 330px;
  width: 550px;
  margin: 169px 0px 0px 70px;
  font-size: 15px;
}

.title {
  font-size: 30px;
  height: 30px;
  width: 250px;
  margin-bottom: 10px;
}

.text {
  height: 100px;
  text-align: justify;
}

.reasons {
  list-style-type: none;
  padding: 0;
}

.reason {
  margin-bottom: 10px;
}
</style>
