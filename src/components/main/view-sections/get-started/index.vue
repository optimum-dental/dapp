<template>
  <div id="get-started">
    <section class="content" v-if="isDAppReady">
      <user v-if="user && user.isValid"
        :avatar-canvas="avatarCanvas"
        :user="user"
        @updateAvatarCanvas="updateAvatarCanvas"
      />

      <guest-introduction v-else />
    </section>

    <section class="loader content" v-else></section>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'get-started',
    components: {
      User,
      GuestIntroduction
    },
    methods: {
      updateAvatarCanvas (payload = null) {
        this.$emit('updateAvatarCanvas', payload)
      }
    },
    props: [ 'avatarCanvas', 'user', 'isDAppReady' ]
  }

  import User from './User.vue'
  import GuestIntroduction from './Guest.vue'
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

  .loader.content {
    animation: odll-loading-animation 1.2s infinite;
  }

  @keyframes odll-loading-animation {
    0% {
      border-top: 5px solid #f16f35;
      background-color: #ffffff;
    }

    50% {
      border-top: 5px solid #e56329;
      background-color: #fcfcfc;
    }

    100% {
      border-top: 5px solid #dd5b21;
      background-color: #f9f9f9;
    }
  }
</style>
