<template>
  <div id="scan">
    <div class="content">
      <div class="scan-image"></div>
      <div class="scan-content">
        <div class="title">
          Schedule a quick scan consultation with a doctor of your choice<br>
        </div>
        <div class="text">
          Your savings start right here!<br>
          As easy as 1 2 3:
          <ol>
            <li>Come in for your consultation and digital scan.</li>
            <li>Your case plan is submitted to hundreds of doctors in your area.</li>
            <li>Review quotes from the dentists at your leisure.</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scan'
}
</script>

<style scoped>
#scan {
  width: 100%;
  height: 648px;
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
  margin-top: 174px;
  background: url('/static/images/scanAppointment.png') no-repeat;
  background-size: contain;
}

.scan-content {
  clear: none;
  float: left;
  height: 350px;
  width: 400px;
  margin: 149px 0px 0px 170px;
  font-size: 15px;
}

.title {
  font-size: 30px;
  height: 120px;
  width: 390px;
  margin-bottom: 10px;
}

.text {
  height: 150px;
  text-align: justify;
}

ol {
  list-style-position: inside;
  padding: 0px;
}
</style>
