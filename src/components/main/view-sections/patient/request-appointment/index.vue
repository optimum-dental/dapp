<template>
  <div id="request-appointment">
    <section class="content" v-if="isDAppReady">
      <appointment v-if="user && user.isValid && isValidUserBut === '0'" />

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
    name: 'request-appointment',
    components: {
      Appointment,
      GuestIntroduction,
      Loading,
      Informant
    },
    props: [ 'isDAppReady', 'isValidUserBut' ]
  }

  import Appointment from './Appointment.vue'
  import GuestIntroduction from '../get-started/Guest.vue'
  import Loading from '../loading'
  import Informant from '../informant'
</script>

<style scoped>
  #request-appointment {
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
