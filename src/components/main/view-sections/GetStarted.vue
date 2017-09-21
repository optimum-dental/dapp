<template>
  <div id="get-started">
    <div class="content" v-if="user.isValid">
      <user-form
        :avatarCanvas="avatarCanvas"
        :user="user"
      />
    </div>

    <div class="content" v-else>
      <how-it-works />
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'get-started',
    props: [ 'avatarCanvas', 'user' ],
    components: {
      UserForm,
      HowItWorks
    }
  }

  import UserForm from './UserForm.vue'
  import HowItWorks from './HowItWorks.vue'
</script>

<style scoped>
  #get-started {
    width: 80%;
    height: 100%;
    min-height: 100vh;
    position: relative;
    left: 20%;
    padding: 60px 50px 20px 50px;
    background: #eef0ef;
  }

  .content {
    border: none;
    border-top: 5px solid #dd5b21;
    width: 100%;
    min-height: 80vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
