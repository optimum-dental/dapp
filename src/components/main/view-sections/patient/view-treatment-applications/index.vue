<template>
  <div id="view-treatment-applications">
    <section class="content" v-if="isDAppReady">
      <treatment-applications v-if="user && user.isValid && isValidUserBut === '0'" />

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
    name: 'view-treatment-applications',
    components: {
      TreatmentApplications,
      GuestIntroduction,
      Loading,
      Informant
    },
    props: [ 'isDAppReady', 'isValidUserBut' ]
  }

  import TreatmentApplications from './TreatmentApplications.vue'
  import GuestIntroduction from '../get-started/Guest.vue'
  import Loading from '../loading'
  import Informant from '../informant'
</script>

<style scoped>
  #view-treatment-applications {
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
