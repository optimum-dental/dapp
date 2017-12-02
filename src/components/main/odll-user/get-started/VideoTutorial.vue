<template>
  <div id='video-tutorial-template'>
    <div class="container">
      <section class='title'>
        <p class='header-3 text'>{{ tutorial.title }}</p>
      </section>
      <section class='video-player'>
        <iframe width="560" height="350" :src="tutorial.link" frameborder="0" allowfullscreen>
        </iframe>
      </section>
    </div>
  </div>
</template>


<script type="text/javascript">
  export default {
    name: 'video-tutorial-template',
    props: ['tutorial']
  }
</script>


<style scoped>
  #video-tutorial-template {
    text-align: center;
  }
  .container {
    width: 560px;
    position: relative;
    margin: auto;
    margin-bottom: 30px;
  }

  .title {
    text-align: left;
    margin-bottom: 10px;
  }

  .title .text {
    margin: 0;
  }

  .header-3 {
    font-size: 16px;
  }
</style>
