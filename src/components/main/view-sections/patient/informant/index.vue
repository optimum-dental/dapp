<template>
  <section id="informant">
    <div class="message">
      {{  user.warningMessage }}
    </div>
    <router-link :to="{ path: 'get-started', query: { 'isValidUserBut': '0' } }" class="how-it-works"s
    >How To Get Started
    </router-link>
  </section>
</template>

<script type="text/javascript">
  export default {
    computed: {
      user () {
        return this.$root.user
      }
    },
    name: 'informant',
    methods: {
      callSetIsValidUserBut () {
        this.$root.$children[0].callSetIsValidUserBut('0')
      }
    },
    props: [ 'isDAppReady' ]
  }
</script>

<style scoped>
  #informant {
    border: none;
    width: 100%;
    min-height: 80vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #ffffff;
  }

  .message {
    width: 80%;
    margin-bottom: 40px;
    line-height: 24px;
    text-align: center;
  }

  .how-it-works {
    background: #3285b1;
    height: 40px;
    line-height: 40px;
    width: 150px;
    text-decoration: none;
    text-align: center;
    color: #efefef;
    border: 1px solid #2a7197;
    cursor: pointer;
  }
</style>
