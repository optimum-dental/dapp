<template>
  <div id="header-template" class="sticky header">
    <div class="content">
      <div>
        <div class="user-icon"></div>
        <div class="address" :title="coinbase">{{ truncatedCoinbase }}</div>
        <div class="question-icon"></div>
        <div class="menu-icon"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    computed: {
      coinbase () {
        return this.user.coinbase
      },
      truncatedCoinbase () {
        return truncate(this.user.coinbase, 22)
      }
    },
    name: 'header-template',
    props: [ 'user', 'isDAppReady' ]
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
    margin-top: 15px;
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
</style>
