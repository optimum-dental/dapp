<template>
  <div id="use-app" :has-injected-web3="hasInjectedWeb3">
    <div class="content">
      <div class="advice">
        <div class="text">Register today. Find a Dentist. Get all the Dental Care you deserve.</div>
        <router-link to="/main-page" class="get-started-button">Get Started</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'use-app',
  props: ['hasInjectedWeb3']
}
</script>

<style scoped>
#use-app {
  width: 100%;
  height: 50px;
  background: #24bcad;
}

.content {
  height: 100%;
  text-align: center;
  max-width: 920px;
  margin: auto;
}

.advice {
  height: 100%;
}

.text {
  height: 40px;
  line-height: 40px;
  color: #ddf4f2;
  margin: 5px 0px;
  display: inline-block;
}

.get-started-button {
  background: #e79849;
  color: #feffff;
  width: 200px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #f3c89e;
  display: inline-block;
  text-decoration: none;
  margin: 5px 20px;
}
</style>
