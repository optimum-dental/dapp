<template>
  <div id="get-started">
    <div class="content" v-if="user.isValid">
      <user-form />
    </div>

    <div class="content" v-else>
      <how-it-works />
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'get-started',
    data: () => {
      return {
        approvedNetworkName: NETWORKS[NETWORKS['ODLLBlockchainNetwork']]
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    components: {
      UserForm,
      HowItWorks
    }
  }

  import { NETWORKS } from '../../../util/constants'
  import UserForm from './UserForm.vue'
  import HowItWorks from './HowItWorks.vue'
</script>

<style scoped>
  #get-started {
    width: 80%;
    height: 100vh;
    position: relative;
    left: 20%;
    padding-top: 60px;
    background: #eef0ef;
  }

  .content {
    border: none;
    border-top: 5px solid #dd5b21;
    background-color: #fff;
    /*text-align: center;*/
    width: 100%;
    min-height: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
