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
          <select id="appointment-type" class="list"></select>
          <div class="tip"></div>
        </div>
      </div>

      <div class="search-item">
        <div class="search-param">Budget <span class="small-text">[optional]</span></div>
        <div id="budget-range" class="noUiSlider"></div>
      </div>

      <div class="search-item submit">
        <input type="button" class='submit-button' value="Find" @click="findDentist">
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  require('../../../../../../static/css/nouislider.css')

  export default {
    computed: {
      budgetRange () {
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

        return rangeSlider
      }
    },
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
      },
      populateAppointmentTypes () {
        const appointmentTypesElement = document.getElementById('appointment-type')
        appointmentTypes.forEach((appointmentType, index) => {
          const optionElement = document.createElement('option')
          optionElement.text = appointmentType.name
          if (appointmentTypesElement) {
            appointmentTypesElement.appendChild(optionElement)
          }
        })
      },
      setEventListeners () {
        const appointmentTypesElement = document.getElementById('appointment-type')
        if (appointmentTypesElement) {
          const _this = this
          appointmentTypesElement.addEventListener('change', function () {
            let appointmentSubtypesElement
            if (document.getElementById('appointment-sub-type')) {
              appointmentSubtypesElement = document.getElementById('appointment-sub-type')
            } else {
              appointmentSubtypesElement = _this.createAppointmentSubTypeDOMElement(appointmentTypes[this.selectedIndex].subTypes[0])
              document.querySelector('#search-page').insertBefore(appointmentSubtypesElement, this.closest('.search-item').nextElementSibling)
            }

            _this.populateAppointmentSubTypes(this.selectedIndex)
            appointmentSubtypesElement.focus()
          })
        }
      },
      createAppointmentSubTypeDOMElement (title = '') {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="search-item">
            <div class="search-param">${title}</div>
            <div class="search-value">
              <select id="appointment-sub-type" class="list"></select>
              <div class="tip"></div>
            </div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      populateAppointmentSubTypes (appointmentTypeIndex) {
        const appointmentSubtypesElement = document.getElementById('appointment-sub-type')
        if (appointmentTypeIndex === 0) {
          appointmentSubtypesElement.closest('.search-item').remove()
        } else {
          appointmentSubtypesElement.closest('.search-item').querySelector('.search-param').innerHTML = appointmentTypes[appointmentTypeIndex].subTypes[0]
          while (appointmentSubtypesElement.firstChild) {
            appointmentSubtypesElement.removeChild(appointmentSubtypesElement.firstChild)
          }

          const appointmentSubtypes = appointmentTypes[appointmentTypeIndex].subTypes
          appointmentSubtypes.forEach((appointmentSubtype) => {
            const optionElement = document.createElement('option')
            optionElement.text = appointmentSubtype
            if (appointmentSubtypesElement) {
              appointmentSubtypesElement.appendChild(optionElement)
            }
          })
        }
      },
      findDentist (evt) {
        if (document.getElementById('appointment-sub-type')) {
          let target = evt.target
          target.disabled = true
          target.style.cursor = 'not-allowed'
          target.style.background = '#adcddf'

          const appointmentType = Number(document.getElementById('appointment-type').selectedIndex)
          const appointmentSubtype = Number(document.getElementById('appointment-sub-type').selectedIndex)
          const searchQuery = {
            state: Number(document.getElementById('state').selectedIndex),
            appointmentType,
            appointmentSubtype,
            budget: this.budget,
            page: 1
          }

          let errors = [appointmentType === 0 ? document.getElementById('appointment-type') : undefined, appointmentSubtype === 0 ? document.getElementById('appointment-sub-type') : undefined]
          errors = errors.filter(entry => entry !== undefined)
          if (errors.length > 0) {
            errors.forEach((item) => {
              let tip = item.nextElementSibling
              tip.innerHTML = `Please check your ${item.id}`
              tip.classList.add('error')
            })
          } else {
            this.$root.callToFindDentists({
              searchQuery,
              callback: (searchResult = null) => {
                target.disabled = false
                target.style.cursor = 'pointer'
                target.style.background = '#296d92'
              }
            })
          }
        } else {
          console.log('Choose Appointment Type')
        }
      }
    },
    mounted: function () {
      this.budgetRange
      this.populateStates()
      this.populateAppointmentTypes()
      this.setEventListeners()
    }
  }

  import wnumb from 'wnumb'
  import rangeSlider from 'nouislider'
  import states from '../../../../../../static/json/states/states.json'
  import appointmentTypes from '../../../../../../static/json/appointment_types/appointment_types.json'
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
    height: 80px;
    line-height: 30px;
  }

  .search-item:not(.submit) {
    margin-bottom: 30px;
  }

  .search-param {
    color: #4d4c49;
    margin-bottom: 20px;
    height: 20px;
    font-size: 16px;
    line-height: 20px;
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

  .submit-button {
    background: #296d92;
    color: #ffffff;
    height: 30px;
    width: 100px;
    float: right;
    outline: 0px;
    border: 0px;
    cursor: pointer;
  }
</style>

<style>
  .search-item {
    width: 80%;
    height: 80px;
    line-height: 30px;
  }

  .search-param {
    color: #4d4c49;
    margin-bottom: 20px;
    height: 20px;
    font-size: 16px;
    line-height: 20px;
  }

  .list {
    height: 30px;
    width: 200px;
    color: #4d4c49;
    background: #ffffff;
    outline: none;
  }
</style>
