<template>
  <div id="view-services">
    <section class="content" v-if="isDAppReady">
      <services
        :user="user"
      />
    </section>

    <loading v-else />
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'view-services',
    components: {
      Services,
      Loading
    },
    props: [ 'user', 'isDAppReady' ]
  }

  import Services from './Services.vue'
  import Loading from '../loading'
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
</style>
