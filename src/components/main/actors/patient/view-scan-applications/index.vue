<template>
  <div id="view-scan-applications">
    <section class="content" v-if="isDAppReady">
      <scan-applications v-if="user && user.isValid && user.patientable && isValidUserBut === '0'" />

      <guest-introduction v-else-if="isValidUserBut === '0'" />

      <informant v-else-if="isValidUserBut !== '0'" />
    </section>

    <loading v-else />
  </div>
</template>

<script type="text/javascript">
  export default {
    computed: {
      user () {
        return this.$root.user
      }
    },
    name: 'view-scan-applications',
    components: {
      ScanApplications,
      GuestIntroduction,
      Loading,
      Informant
    },
    props: [ 'isDAppReady', 'isValidUserBut' ]
  }

  import ScanApplications from './ScanApplications.vue'
  import GuestIntroduction from '../../../odll-user/get-started/Guest.vue'
  import Loading from '../../../utilities/loading'
  import Informant from '../../../utilities/informant'
</script>

<style scoped>
  #view-scan-applications {
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
