<template>
  <section id="loading">
    <div class="logo"></div>
    <div class="tip-title" v-if="message.title">{{ message.title }}</div>
    <div class="tip-body" v-if="message.main || message.cite">
      <div class="tip-main" v-if="message.main">{{ message.main }}</div>
      <div class="tip-cite" v-if="message.cite">{{ message.cite }}</div>
    </div>
    <div class="spin"></div>
  </section>
</template>

<script type="text/javascript">
  export default {
    computed: {
      message () {
        return this.tips[Math.ceil(Math.random() * 113) % this.tips.length]
      }
    },
    data: function () {
      return {
        tips: [
          {
            title: 'How do I keep my teeth healthy?',
            main: 'Regular dental check-ups.',
            cite: '- Oral Data Link'
          },
          {
            main: 'Have you visited your dentist today?'
          },
          {
            main: 'Do you know a smile affects your day positively?'
          },
          {
            main: 'All people smile in the same language.',
            cite: '- Proverb'
          },
          {
            title: 'The secret to a cute smile is with a great dentist.',
            main: 'Visit us today to see how.'
          },
          {
            main: 'We make you confident of your smile.',
            cite: '- Your friends at Oral Data Link'
          },
          {
            main: 'Be true to your teeth and they won’t be false to you.',
            cite: '- Your friends at Oral Data Link'
          },
          {
            title: 'Connect with the best dentists around you.',
            main: 'No more office waiting rooms.'
          },
          {
            main: 'We\'re not happy with your smile until YOU are.',
            cite: '- Your friends at Oral Data Link'
          },
          {
            title: 'Oral Data Link',
            main: 'Dentistry for the modern world...'
          }
        ]
      }
    },
    name: 'loading'
  }
</script>

<style scoped>
  #loading {
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

  .logo {
    height: 72px;
    width: 72px;
    background: url('/static/images/loading-logo.png') no-repeat;
    background-size: contain;
    margin-bottom: 10px;
  }

  .tip-title {
    font-size: 20px;
    margin-top: 10px;
  }

  .tip-body {
    margin-top: 10px;
  }

  .tip-main {
    font-size: 20px;
  }

  .tip-cite {
    font-style: italic;
    text-align: right;
    font-size: 16px;
    margin-top: 5px;
  }

  .spin {
    height: 45px;
    width: 45px;
    border-radius: 45px;
    border-top: 3px solid #3286b0;
    border-right: 3px solid #3286b0;
    border-bottom: 3px solid #ffffff;
    border-left: transparent;
    animation: odll-spin 1.2s cubic-bezier(0.2, 0.92, 0.94, 0.9) infinite;
    margin-top: 30px;
  }

  @keyframes odll-spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
