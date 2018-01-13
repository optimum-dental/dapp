<template>
  <div id="manage-dentists">
    <section class="content" v-if="isDAppReady">
      <dentists v-if="user && user.isValid && user.isODLLManager && isValidUserBut === '0'" />

      <guest-introduction v-else-if="isValidUserBut === '0'" />

      <informant v-else-if="isValidUserBut !== '0'" />
    </section>

    <loading v-else />
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'manage-dentists',
    components: {
      Dentists,
      GuestIntroduction,
      Informant,
      Loading
    },
    computed: {
      user () {
        return this.$root.user
      }
    },
    props: [ 'isDAppReady', 'isValidUserBut' ]
  }

  import Dentists from './Dentists.vue'
  import GuestIntroduction from '../../../odll-user/get-started/Guest.vue'
  import Informant from '../../../utilities/informant'
  import Loading from '../../../utilities/loading'
</script>

<style scoped>
  #manage-dentists {
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
