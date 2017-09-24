<template>
  <div id="get-started">
    <div class="blockchain-message">
      <div v-if="user.hasWeb3InjectedBrowser">
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
            But it seems you don't have an account with ODLL on the blockchain.<br>Or you do but the account is currently inaccessible.<br>Create an account on the blockchain and register with us to begin experiencing the awesome services we offer, or make your existing account accessible.
          </div>
        </div>
        <div v-else>
          But you are not connected to the ODLL network on the blockchain [{{ approvedNetworkName }}].<br>
            Connect to the {{ approvedNetworkName }}.
        </div>
      </div>
      <div v-else>Your browser is not Web3-injected. To use the ODLL dApp, you can install <a href='https://metamask.io/'>Metamask</a>.</div>
    </div>
    <section class="content">
      <div v-if="!user.hasCoinbase">
        <GuestIntroduction :faqs="faqs"/>
      </div>
      <div v-else>
      </div>
    </section>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'get-started',
    components: {
      GuestIntroduction
    },
    data: function () {
      return {
        approvedNetworkName: NETWORKS[NETWORKS['ODLLBlockchainNetwork']],
        faqs: [
          {
            id: 1,
            question: 'How do I get Ether Cryptocurrency?',
            answer: ''
          },
          {
            id: 2,
            question: 'Why do I have to pay Ethereum gas fees?',
            answer: ''
          },
          {
            id: 3,
            question: 'How can I find a dentist?',
            answer: ''
          }
        ]
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    }
  }

  import { NETWORKS } from '../../../../util/constants'
  import GuestIntroduction from './Guest.vue'
</script>

<style scoped>
  #get-started {
    width: 80%;
    height: 100%;
    min-height: 100vh;
    position: relative;
    left: 20%;
    padding: 60px 50px 20px 50px;
    background: #eef0ef;
  }

  .blockchain-message {
    margin-top: 20px;
    border: 1px solid #dcdede;
    color: #4d4c49;
    padding: 10px;
    width: 100%;
    display: inline-block;
  }

  .content {
    text-align: center;
    margin: auto;
    padding: 160px;
    padding-top: 20px;
    min-height: 600px;
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

  .content {
    border: none;
    border-top: 5px solid #dd5b21;
    background-color: #fff;
  }
</style>
