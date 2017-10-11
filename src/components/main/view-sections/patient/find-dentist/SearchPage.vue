<template>
  <div class="wrapper">
    <div id="search-page">
      <div class="title">Find Dentists</div>
      <div class="choices">
        <div class="search-icon"></div>
      </div>

      <div class="instruction">Choose by location, appointment type, and budget</div>
      <div class="search-item">
        <div class="search-param">Locations</div>
        <div class="search-value"><select id="state" class="list"></select></div>
      </div>

      <div class="search-item">
        <div class="search-param">Appointment Type</div>
        <div class="search-value">
          <select id="appointment-type" class="list">
            <option>Choose Type</option>
            <option value="1">Scan Appointment</option>
            <option value="2">Treatment Appointment</option>
          </select>
        </div>
      </div>

      <div class="search-item">
        <div class="search-param">Budget <span class="small-text">[optional]</span></div>
        <div id="budget-range" class="noUiSlider"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  require('../../../../../../static/css/nouislider.css')

  export default {
    methods: {
      populateStates () {
        const statesElement = document.getElementById('state')
        states.forEach((state, index) => {
          const optionElement = document.createElement('option')
          optionElement.text = index === 0 ? 'Choose Location' : state.name
          if (statesElement) {
            statesElement.appendChild(optionElement)
          }
        })
      }
    },
    mounted: function () {
      var budgetRange = document.getElementById('budget-range')
      rangeSlider.create(budgetRange, {
        start: [50, 150],
        connect: true,
        range: {
          'min': [0],
          'max': [200]
        },
        pips: {
          mode: 'count',
          density: 9,
          values: 9,
          format: wnumb({
            prefix: '$'
          })
        }
      })

      this.populateStates()
    }
  }

  import wnumb from 'wnumb'
  import rangeSlider from 'nouislider'
  import states from '../../../../../../static/json/states/states.json'
</script>

<style scoped>
  .wrapper {
    background: #ffffff;
    height: 100%;
    min-height: 80vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  #search-page {
    background: #ffffff;
    min-height: 70vh;
    width: 80%;
    font-size: 12px;
    margin: 30px auto;
    color: #adadad;
    display: flex;
    flex-direction: column;
  }

  .title {
    height: 40px;
    line-height: 40px;
    width: 100%;
    text-align: left;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .choices {
    width: 80%;
    height: 40px;
    border-bottom: 1px solid #dcdede;
    margin-bottom: 50px;
    background: #ffffff;
  }

  .search-icon {
    background: url('/static/images/search.png') no-repeat;
    width: 30px;
    height: 30px;
    background-size: contain;
    display: inline-block;
    margin-top: 5px;
  }

  .choice {
    width: auto;
    height: 30px;
    background-size: contain;
    display: inline-block;
    margin-top: 5px;
  }

  .instruction {
    width: 80%;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .search-item {
    width: 80%;
    height: 60px;
    line-height: 30px;
    font-size: 18px;
    margin-bottom: 30px;
  }

  .search-param {
    color: #4d4c49;
  }

  .list {
    height: 30px;
    width: 200px;
    color: #4d4c49;
    background: #ffffff;
    outline: none;
  }

  .small-text {
    font-size: 10px;
    color: #b4b4b4;
    position: relative;
    top: -3px;
    left: 10px;
  }
</style>
