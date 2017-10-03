<template>
  <div id="view-treatment-applications">
    <section class="content" v-if="isDAppReady">
      <treatment-applications v-if="user && user.isValid"
        :user="user"
      />

      <guest-introduction v-else />
    </section>

    <loading v-else />
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'view-treatment-applications',
    components: {
      TreatmentApplications,
      GuestIntroduction,
      Loading
    },
    props: [ 'user', 'isDAppReady' ]
  }

  import TreatmentApplications from './TreatmentApplications.vue'
  import GuestIntroduction from '../get-started/Guest.vue'
  import Loading from '../loading'
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
