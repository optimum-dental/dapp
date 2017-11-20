<template>
  <div class="wrapper">
    <div id="getstarted-guest-template">
      <div class="container">
        <section class='header-group'>
          <p class='header-1 header-main'>How to get started</p>
          <div class='header-body'>
            <p class='header-3'>Install Metamask Chrome Extension.</p>
            <div>
              <p>To get started, visit <a :href="metamaskUrl">Metamask</a> to download and install <a :href="metamaskUrl">Metamask</a> chrome extension.<br/>See videos to learn more.</p>
            </div>
          </div>
        </section>

        <section class='tutorial-list'>
          <VideoTutorial :tutorial="tutorial" v-for="tutorial in tutorials" :key="tutorial.id" />
        </section>

        <section class='faq-section'>
          <p class='header-2 faq-title'>Frequently Asked Questions</p>
          <div class='faq-list'>
            <div class='faq-container' v-for="item in faqs" :key="item.id">
              <p class='question'>{{ item.question }}</p>
              <p class='answer'>{{ item.answer }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>


<script type="text/javascript">
  export default {
    name: 'getstarted-guest-template',
    data: function () {
      return {
        metamaskUrl: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en',
        faqs: [
          {
            id: 1,
            question: 'How do I get Ether Cryptocurrency?',
            answer: ''
          },
          {
            id: 2,
            question: 'Why do I have to pay Ethereum gas fees?',
            answer: ''
          },
          {
            id: 3,
            question: 'How can I find a dentist?',
            answer: ''
          }
        ],
        tutorials: [
          {
            id: 1,
            title: 'How to install Metamask',
            link: 'https://www.youtube.com/embed/JeYlPFeLvLo'
          },
          {
            id: 2,
            title: 'Register on Oral Data Link',
            link: 'https://www.youtube.com/embed/aerf7R2KzIY'
          },
          {
            id: 3,
            title: 'View services',
            link: 'https://www.youtube.com/embed/aerf7R2KzIY'
          },
          {
            id: 4,
            title: 'Find a dentist',
            link: 'https://www.youtube.com/embed/aerf7R2KzIY'
          },
          {
            id: 5,
            title: 'Register as a patient',
            link: 'https://www.youtube.com/embed/lwRQb9t3nIM'
          }
        ]
      }
    },
    props: ['item'],
    components: {
      VideoTutorial
    }
  }

  import VideoTutorial from './VideoTutorial'
</script>

<style scoped>
  .wrapper {
    background: #ffffff;
    height: 100%;
    min-height: 80vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #getstarted-guest-template {
    width: 80%;
  }

  .header-main {
    text-align: center;
  }

  .header-1 {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .header-body {
    text-align: left;
  }

  .container {
    width: 100%;
    margin: auto;
  }
  .header-2 {
    font-size: 20px;
  }

  .faq-section, .faq-list , .tutorial-list{
    margin-top: 50px;
  }

  .faq-container {
    text-align: left;
  }

  .faq-title {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: #dd5b21;
  }
</style>
