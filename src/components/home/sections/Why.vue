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
            <li class="reason"><strong>Security</strong>: Your dental record is 100% safe. It exists on the blockchain.</li>
            <li class="reason"><strong>Speed</strong>: Get your Dental issues treated faster than usual.</li>
            <li class="reason"><strong>Cost</strong>: We offer the best prices, allowing you save more.</li>
            <li class="reason"><strong>Freedom</strong>: Your health records are yours indeed.</li>
            <li class="reason"><strong>Ease</strong>: Get the best doctors closest to you and pay unbelievably low for their quality services with a user friendly dApp.</li>
            <li class="reason"><strong>Satisfaction</strong>: We have been patients too, and we know exactly how it is to be treated right and in time. Satisfaction is 100% guaranteed.</li>
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
