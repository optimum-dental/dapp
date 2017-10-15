<template>
  <div id="manage-managers">
    <section class="content" v-if="isDAppReady">
      <managers v-if="user && user.isValid && isValidUserBut === '0'" />

      <guest-introduction v-else-if="isValidUserBut === '0'" />

      <informant v-else-if="isValidUserBut !== '0'" />
    </section>

    <loading v-else />
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'manage-managers',
    components: {
      Managers,
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

  import Managers from './Managers.vue'
  import GuestIntroduction from '../../../odll-user/get-started/Guest.vue'
  import Informant from '../../../utilities/informant'
  import Loading from '../../../utilities/loading'
</script>

<style scoped>
  #manage-managers {
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
