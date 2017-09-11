<template>
  <div id="main-page" :has-injected-web3="hasInjectedWeb3">
    <div class="blockchain-message">
      <div v-if="hasInjectedWeb3">
        Your browser is Web3-injected.
        <br>
        <div v-if="user.isConnectedToODLLNetwork">
          You are also connected to the ODLL network on the blockchain.
          <br>
          <div v-if="user.hasCoinbase">
            And you have an account on the blockchain.<br>
            You're all set to use the ODLL dApp. All you need to do now is register your account with ODLL.
          </div>
          <div v-else>
            But you don't have an account on the blockchain. Create an account on the blockchain and register it with the ODLL dApp to experience the awesome services we offer.
          </div>
        </div>
        <div v-else>
          But you are not connected to the ODLL network on the blockchain. Change your connection.
        </div>
      </div>
      <div v-else>Your browser is not Web3-injected. To use the ODLL dApp, you can install <a href='https://metamask.io/'>Metamask</a>.</div>
    </div>
    <div class="content">
      <div class="message">
        <div class="text">We're currently working on this ODLL Main Page</div>
        <router-link to="/" class="return-home-button">Return Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main-page',
  props: ['hasInjectedWeb3'],
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style scoped>
#main-page {
  width: 100%;
  height: 420px;
}

.blockchain-message {
  float: left;
  margin-top: 20px;
  font-size: 14px;
  border: 1px solid #dcdede;
  color: #4d4c49;
  width: auto;
  padding: 10px;
}

.content {
  height: 100%;
  text-align: center;
  max-width: 920px;
  margin: auto;
  padding: 160px;
}

.message {
  height: 80px;
  line-height: 40px;
}

.text {
  height: 40px;
}

.return-home-button {
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
