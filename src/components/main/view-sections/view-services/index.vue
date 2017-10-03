<template>
  <div id="view-services">
    <section class="content" v-if="isDAppReady">
      <services
        :user="user"
      />
    </section>

    <section class="loader content" v-else></section>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'view-services',
    components: {
      Services
    },
    props: [ 'user', 'isDAppReady' ]
  }

  import Services from './Services.vue'
</script>

<style scoped>
  #view-services {
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
