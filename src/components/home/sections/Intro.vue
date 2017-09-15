<template>
  <div id="intro">
    <div class="content">
      <div class="texts">
        <div class="text-item">Know</div>
        <div class="text-item"><span class='odll-blue'>Dental</span> <span class='odll-orange'>Care</span> Designed Around</div>
        <div class="text-item third-text">Your Needs</div>
      </div>
      <router-link to="/get-started" class="get-started-button">Get Started</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'intro'
}
</script>

<style scoped>
#intro {
  width: 100%;
  height: 662px;
  /*background: linear-gradient(90deg, #595053 15%, #3d3a43 30%, #282735 60%, #282735 75%, #282735 100%);*/
  background: url('/static/images/header-img.jpg') no-repeat;
  background-size: cover;
}

.content {
  height: 100%;
  text-align: center;
  max-width: 920px;
  margin: auto;
}

.texts {
  clear: both;
  height: 250px;
  margin-bottom: 200px;
  padding-top: 270px;
}

.text-item {
  margin-bottom: 10px;
  height: 40px;
  font-size: 40px;
  color: #ffffff;
}

.odll-blue {
  color: #59c2e2;
}

.odll-orange {
  color: #f4a75f;
}

.get-started-button {
  background: #e79849;
  color: #feffff;
  width: 200px;
  height: 40px;
  border: 1px solid #f3c89e;
  display: inline-block;
  clear: both;
  line-height: 40px;
  text-decoration: none;
}
</style>
