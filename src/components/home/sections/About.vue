<template>
  <div id="about" :has-injected-web3="hasInjectedWeb3">
    <div class="content">
      <div class="about-image"></div>
      <div class="about-content">
        <div class="title">
          It's all within the blockchain!
        </div>
        <div class="text">
          Oral Data Link database of dentists around the United States is distributed on the Ethereum public blockchain. This makes it much convenient to access any of our dentists for professional dental services that are technologically modern. Our platform is accessible to everyone, without any central authority having control over it.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  props: ['hasInjectedWeb3']
}
</script>

<style scoped>
#about {
  width: 100%;
  height: 400px;
  background: #dfe8ef;
  margin-top: 0px;
}

.content {
  height: 100%;
  width: 100%;
  max-width: 920px;
  color: #404040;
  margin: auto;
}

.about-image {
  clear: none;
  float: left;
  height: 300px;
  width: 300px;
  margin-top: 50px;
  background: url('/static/images/withinBlockChain.png') no-repeat;
  background-size: contain;
}

.about-content {
  clear: none;
  float: left;
  height: 150px;
  width: 550px;
  margin: 125px 0px 0px 70px;
  font-size: 15px;
}

.title {
  font-size: 30px;
  height: 40px;
  margin-bottom: 10px;
}

.text {
  height: 100px;
  text-align: justify;
}
</style>
