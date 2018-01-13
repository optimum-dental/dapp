<template>
  <div id="find-dentist">
    <section class="content" v-if="isDAppReady">
      <dentists v-if="user && user.isValid && isValidUserBut === '0' && isSearching" />

      <search-page v-else-if="user && user.isValid && isValidUserBut === '0'  && !isSearching" />

      <guest-introduction v-else-if="isValidUserBut === '0'" />

      <informant v-else-if="isValidUserBut !== '0'" />
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
      Loading,
      Informant,
      SearchPage
    },
    computed: {
      user () {
        return this.$root.user
      },
      isSearching () {
        if (this.$route.query.o !== undefined) {
          return true
        } else {
          return false
        }
      }
    },
    props: [ 'isDAppReady', 'isValidUserBut' ]
  }

  import Dentists from './Dentists.vue'
  import GuestIntroduction from '../get-started/Guest.vue'
  import Loading from '../../utilities/loading'
  import Informant from '../../utilities/informant'
  import SearchPage from './SearchPage'
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
