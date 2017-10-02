<template>
  <div id="get-started">
    <section class="content">
      <div v-if="isDAppReady">
        <div v-if="user && user.isValid">
          <user
            :avatar-canvas="avatarCanvas"
            :user="user"
            @updateAvatarCanvas="updateAvatarCanvas"
          />
        </div>

        <div v-else>
          <guest-introduction
            :set-current-view="setCurrentView"
          />
        </div>
      </div>

      <div v-else></div>
    </section>
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
    props: [ 'avatarCanvas', 'setCurrentView', 'user', 'isDAppReady' ]
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
    border-top: 5px solid #dd5b21;
    background-color: #fff;
    /*text-align: center;*/
    width: 100%;
    min-height: 80vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
