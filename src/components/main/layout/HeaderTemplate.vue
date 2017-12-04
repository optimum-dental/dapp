<template>
  <div id="header-template" class="sticky header">
    <div class="content">
      <div v-if="isDAppReady">
        <div class="user-icon"></div>
        <div class="address" :title="coinbase">{{ truncatedCoinbase }}</div>
        <!-- <div class="question-icon"></div> -->
        <!-- <div class="menu-icon" ></div> -->
        <div class="balance" :title="balance">ETH {{ balance }}</div>
      </div>

      <div v-else>
        <div class="loader user-icon"></div>
        <div class="loader address"></div>
        <!-- <div class="loader question-icon"></div> -->
        <!-- <div class="loader menu-icon"></div> -->
        <div class="loader balance"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    computed: {
      coinbase () {
        return this.$root.coinbase
      },
      truncatedCoinbase () {
        return this.user.hasCoinbase ? truncate(this.$root.coinbase, 22) : 'No account connected'
      },
      balance () {
        return this.user.hasCoinbase ? Number(this.user.balance).toFixed(2) : '0.00'
      },
      user () {
        return this.$root.user
      }
    },
    name: 'header-template',
    props: [ 'isDAppReady' ]
  }

  import { truncate } from '../../../util/StringManager'
</script>

<style scoped>
  #header-template {
    min-width: 80%;
  }

  .sticky {
    position: fixed;
    left: 257px;
    top: 0px;
    height: 60px;
    background: #fff;
    width: 100%;
    box-sizing: border-box;
    z-index: 666;
    border: none;
    border-bottom: 2px solid #c4c4c4;
  }

  .content {
    height: 20px;
    line-height: 20px;
    margin-top: 20px;
    margin-right: 257px;
  }

  .content > div {
    display: inline-block;
    float: right;
  }

  .content > div > div {
    display: inline-block;
    margin-right: 10px;
  }

  .content > div > div:not(.address) {
    cursor: pointer
  }

  .user-icon {
    background: url('/static/images/person-dark.png') no-repeat;
    background-size: contain;
    width: 20px;
    height: 20px;
  }

  .address {
    width: auto;
    height: 20px;
    cursor: default;
    font-size: 14px;
    position: relative;
    top: -3px;
    color: #555555;
  }

  .question-icon {
    background: url('/static/images/question.png') no-repeat;
    background-size: contain;
    width: 20px;
    height: 20px;
  }

  .menu-icon {
    background: url('/static/images/menu.png') no-repeat;
    background-size: contain;
    width: 20px;
    height: 15px;
  }

  .balance {
    width: 140px;
    height: 20px;
    cursor: default;
    font-size: 14px;
    position: relative;
    top: -3px;
    color: #555555;
  }

  .loader {
    height: 20px;
    animation: odll-loading-animation 1.2s infinite;
  }

  .loader.address {
    width: 180px;
    height: 10px;
    border-radius: 5px;
    margin-bottom: 2px;
  }

  .loader.question-icon {
    border-radius: 20px;
  }

  @keyframes odll-loading-animation {
    0% {
      background: #fafafa;
    }

    50% {
      background: #f0f0f0;
    }

    100% {
      background: #ececec;
    }
  }
</style>
