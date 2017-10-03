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

    <loading v-else />
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'get-started',
    components: {
      User,
      GuestIntroduction,
      Loading
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
  import Loading from '../loading'
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
