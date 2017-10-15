<template>
  <div id="get-started">
    <section class="content" v-if="isDAppReady">
      <user v-if="user && user.isValid && isValidUserBut === '0'" />

      <guest-introduction v-else-if="isValidUserBut === '0'" />

      <informant v-else-if="isValidUserBut !== '0'" />
    </section>

    <loading v-else />
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'get-started',
    components: {
      User,
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

  import User from './User.vue'
  import GuestIntroduction from './Guest.vue'
  import Loading from '../loading'
  import Informant from '../informant'
</script>

<style scoped>
  #get-started {
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
