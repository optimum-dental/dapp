<template>
  <div id="find-dentist">
    <section class="content" v-if="isDAppReady">
      <dentists v-if="user && user.isValid"
        :user="user"
      />

      <guest-introduction v-else />
    </section>

    <loading v-else />
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'find-dentist',
    components: {
      Dentists,
      GuestIntroduction,
      Loading
    },
    props: [ 'user', 'isDAppReady' ]
  }

  import Dentists from './Dentists.vue'
  import GuestIntroduction from '../get-started/Guest.vue'
  import Loading from '../loading'
</script>

<style scoped>
  #find-dentist {
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
