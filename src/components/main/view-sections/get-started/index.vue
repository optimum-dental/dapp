<template>
  <div id="get-started">
    <section class="content">
      <div v-if="user.isValid">
        <user />
      </div>

      <div v-else>
        <GuestIntroduction
          :faqs="faqs"
          :set-current-view="setCurrentView"
        />
      </div>
    </section>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'get-started',
    components: {
      User,
      GuestIntroduction
    },
    data: function () {
      return {
        approvedNetworkName: NETWORKS[APPROVED_BLOCKCHAIN_NETWORK_ID],
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
    },
    props: [ 'setCurrentView' ]
  }

  import { NETWORKS, APPROVED_BLOCKCHAIN_NETWORK_ID } from '../../../../util/constants'
  import User from './User.vue'
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

  .content {
    border: none;
    border-top: 5px solid #dd5b21;
    background-color: #fff;
    /*text-align: center;*/
    width: 100%;
    min-height: 80vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
