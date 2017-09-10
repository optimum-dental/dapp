<template>
  <div id="intro" :has-injected-web3="hasInjectedWeb3">
    <div class="content">
      <div class="texts">
        <div class="text-item">Find That</div>
        <div class="text-item"><span class='odll-blue'>Dental</span> <span class='odll-orange'>Care</span> Designed Around</div>
        <div class="text-item third-text">Your Needs</div>
      </div>
      <router-link to="/main-page" class="get-started-button">Get Started</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'intro',
  props: ['hasInjectedWeb3']
}
</script>

<style scoped>
#intro {
  width: 100%;
  height: 420px;
  background: #282735;
  background: linear-gradient(90deg, #595053 15%, #3d3a43 30%, #282735 60%, #282735 75%, #282735 100%);
  margin-top: 70px;
}
.content {
  height: 100%;
  text-align: center;
}

.texts {
  clear: both;
  height: 150px;
  margin-bottom: 30px;
  padding-top: 100px;
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
  color: #ffffff;
  width: 120px;
  height: 40px;
  border: 1px solid #f3c89e;
  display: inline-block;
  clear: both;
  line-height: 40px;
  text-decoration: none;
}
</style>
