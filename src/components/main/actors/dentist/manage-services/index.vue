<template>
  <div id="manage-services">
    <section class="content" v-if="isDAppReady">
      <services v-if="user && user.isValid && isValidUserBut === '0' && user.isDentist" />

      <guest-introduction v-else-if="isValidUserBut === '0'" />

      <informant v-else-if="isValidUserBut !== '0'" />
    </section>

    <loading v-else />
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'manage-services',
    components: {
      Services,
      GuestIntroduction,
      Loading,
      Informant
    },
    computed: {
      user () {
        return this.$root.user
      }
    },
    props: [ 'isDAppReady', 'isValidUserBut' ]
  }

  import Services from './Services.vue'
  import GuestIntroduction from '../../../odll-user/get-started/Guest.vue'
  import Loading from '../../../utilities/loading'
  import Informant from '../../../utilities/informant'
</script>

<style scoped>
  #manage-services {
    padding: 20px 50px;
    background: #eef0ef;
  }

  .content {
    border: none;
    width: 100%;
    min-height: 80vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #eef0ef;
  }
</style>
