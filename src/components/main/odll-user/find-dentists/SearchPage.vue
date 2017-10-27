<template>
  <div class="wrapper">
    <div id="search-page">
      <div class="title">Find Dentists</div>
      <div class="choices" id="search-query">
        <div class="search-icon"></div>
      </div>

      <div class="instruction">Choose by location, appointment type, and budget</div>
      <div class="search-item">
        <div class="search-param">Locations</div>
        <div class="search-value"><select id="state" class="list" @input="addToSearchQuery"></select></div>
      </div>

      <div class="search-item">
        <div class="search-param">Appointment Type</div>
        <div class="search-value">
          <select id="appointment-type" class="list" @input="addToSearchQuery"></select>
          <div class="tip"></div>
        </div>
      </div>

      <div class="search-item">
        <div class="search-param budget">Budget <span class="small-text">[optional]</span></div>
        <div id="budget-range" class="noUiSlider"></div>
      </div>

      <div class="search-item submit">
        <input type="button" class='submit-button' value="Find" @click="findDentists">
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  require('../../../../../static/css/nouislider.css')
  const budgetMin = 0
  const budgetMax = 2000
  let budgetRangeArray = [budgetMin, budgetMax]

  export default {
    computed: {
      budgetRange () {
        var budgetRangeElement = document.getElementById('budget-range')
        rangeSlider.create(budgetRangeElement, {
          start: [this.budgetMin, this.budgetMax],
          connect: true,
          range: {
            'min': [this.budgetMin],
            'max': [this.budgetMax]
          },
          pips: {
            mode: 'count',
            density: 9,
            values: 9,
            format: wnumb({
              prefix: '$'
            })
          },
          tooltips: true
        })

        return budgetRangeElement.noUiSlider
      },
      budget () {
        return budgetRangeArray
      },
      budgetMin () {
        return budgetMin
      },
      budgetMax () {
        return budgetMax
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
        const _this = this
        const searchPage = document.querySelector('#search-page')
        searchPage.addEventListener('change', function (evt) {
          let target = evt.target
          switch (target.id) {
            case 'appointment-type':
              _this.clearError(target.nextElementSibling)
              _this.hideDOMElement(target.nextElementSibling)
              let appointmentSubtypesElement
              if (document.getElementById('appointment-sub-type')) {
                appointmentSubtypesElement = document.getElementById('appointment-sub-type')
              } else {
                appointmentSubtypesElement = _this.createAppointmentSubTypeDOMElement(appointmentTypes[target.selectedIndex].subTypes[0])
                document.querySelector('#search-page').insertBefore(appointmentSubtypesElement, target.closest('.search-item').nextElementSibling)
              }

              _this.populateAppointmentSubTypes(target.selectedIndex)
              let eventObject = document.createEvent('HTMLEvents')
              eventObject.initEvent('change', true, true)
              appointmentSubtypesElement.dispatchEvent(eventObject)
              appointmentSubtypesElement.focus()
              break
            case 'appointment-sub-type':
              _this.clearError(target.nextElementSibling)
              _this.hideDOMElement(target.nextElementSibling)
              _this.addToSearchQuery(evt)
              break
          }
        })

        this.budgetRange.on('change', function (values, handle, unencodedValues) {
          const tooltips = [searchPage.querySelector('.noUi-handle-lower'), searchPage.querySelector('.noUi-handle-upper')]
          $(tooltips[handle]).find('.noUi-tooltip').slideUp(100)
          budgetRangeArray = values.map(value => Math.ceil(Number(value)))
          let range = budgetRangeArray[0] === _this.budgetMin && budgetRangeArray[1] === _this.budgetMax ? undefined : budgetRangeArray.map(value => '$' + value).join(' - ')
          _this.addToSearchQuery({
            target: {
              id: 'budget-range',
              tagName: 'budgetRangeElement',
              range
            }
          })
        })

        this.budgetRange.on('slide', function (values, handle, unencodedValues) {
          const tooltips = [searchPage.querySelector('.noUi-handle-lower'), searchPage.querySelector('.noUi-handle-upper')]
          $(tooltips[handle]).find('.noUi-tooltip').slideDown(100)
        })
      },
      clearError (target) {
        target.classList.remove('error')
      },
      hideDOMElement (target) {
        target.style.display = 'none'
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
          $(appointmentSubtypesElement).fadeOut(500, function () {
            appointmentSubtypesElement.closest('.search-item').remove()
          })
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
      addToSearchQuery (evt) {
        let target = evt.target
        let id, value, queryItem
        let idToWatch = target.id === 'appointment-type' ? 'appointment-sub-type' : target.id
        if (target.tagName === 'SELECT') {
          if (target.selectedIndex === 0) {
            if (document.getElementById(`query-${idToWatch}`)) {
              $(`#query-${idToWatch}`).fadeOut(500, function () {
                $(this).remove()
              })

              queryItem = null
            }
          } else {
            switch (target.id) {
              case 'appointment-sub-type':
                id = `query-${target.id}`
                let appointmentTypeIndex = document.getElementById('appointment-type').selectedIndex
                value = appointmentTypes[appointmentTypeIndex].subTypes[target.selectedIndex]
                queryItem = document.getElementById(id) || this.createQueryItemElement(id)
                queryItem.innerHTML = value

                break
              case 'state':
                value = states[target.selectedIndex].name
                id = `query-${target.id}`
                queryItem = document.getElementById(id) || this.createQueryItemElement(id)
                queryItem.innerHTML = value
                break
            }
          }
        } else {
          [ id, value, queryItem ] = target.range ? [ `query-${target.id}`, target.range, document.getElementById(`query-${target.id}`) || this.createQueryItemElement(`query-${target.id}`) ] : [ undefined, undefined, undefined ]
          if (!queryItem) {
            if ($(`#query-${idToWatch}`)) {
              $(`#query-${idToWatch}`).fadeOut(500, function () {
                $(this).remove()
              })
            }
          } else {
            queryItem.innerHTML = value
          }
        }

        let searchQueryElement = document.getElementById('search-query')
        if (queryItem && !searchQueryElement.querySelector(`#${id}`)) {
          $(queryItem).hide()
          searchQueryElement.appendChild(queryItem)
          $(queryItem).fadeIn(500)
        }
      },
      createQueryItemElement (id) {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="query-item" id='${id}'></div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      findDentists (evt) {
        if (document.getElementById('appointment-sub-type')) {
          let target = evt.target
          target.disabled = true
          target.style.cursor = 'not-allowed'
          target.style.background = '#adcddf'

          const appointmentTypeId = Number(document.getElementById('appointment-type').selectedIndex)
          const appointmentSubtypeId = Number(document.getElementById('appointment-sub-type').selectedIndex)
          const searchQuery = {
            type: 'findDentists',
            state: Number(document.getElementById('state').selectedIndex),
            appointmentTypeId,
            appointmentSubtypeId,
            budget: this.budget
          }

          let errors = [appointmentTypeId === 0 ? document.getElementById('appointment-type') : undefined, appointmentSubtypeId === 0 ? document.getElementById('appointment-sub-type') : undefined]
          errors = errors.filter(entry => entry !== undefined)
          if (errors.length > 0) {
            errors.forEach((item) => {
              let tip = item.nextElementSibling
              tip.innerHTML = `Please check your ${item.id}`
              tip.classList.add('error')
              target.disabled = false
              target.style.cursor = 'pointer'
              target.style.background = '#29aae1'
            })
          } else {
            target.disabled = false
            target.style.cursor = 'pointer'
            target.style.background = '#29aae1'
            this.$router.push({
              path: '/find-dentists',
              query: {
                o: 0,
                l: 5,
                sd: Math.random(),
                st: searchQuery.state,
                aTI: searchQuery.appointmentTypeId,
                aSI: searchQuery.appointmentSubtypeId,
                bl: searchQuery.budget[0],
                br: searchQuery.budget[1]
              }
            })
          }
        } else {
          let tip = document.getElementById('appointment-type').nextElementSibling
          tip.innerHTML = 'Please check your appointment type'
          tip.classList.add('error')
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
  import states from '../../../../../static/json/states/states.json'
  import appointmentTypes from '../../../../../static/json/appointment_types/appointment_types.json'
  import $ from 'jquery'
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
    margin: 40px auto 0px auto;
    color: #7a7a7a;
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
    float: left;
  }

  .instruction {
    width: 80%;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    margin-bottom: 30px;
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
    color: #7a7a7a;
    margin-bottom: 15px;
    height: 20px;
    font-size: 16px;
    line-height: 20px;
  }

  .budget {
    margin-bottom: 20px;
  }

  .list {
    height: 30px;
    width: 200px;
    background: #ffffff;
    outline: none;
    border: 1px solid #d3d3d3;
    color: #7a7a7a;
  }

  .error {
    color: #f18787;
  }

  .small-text {
    font-size: 10px;
    color: #b4b4b4;
    position: relative;
    top: -3px;
    left: 10px;
  }

  .submit-button {
    background: #29aae1;
    color: #ffffff;
    height: 30px;
    width: 100px;
    float: right;
    outline: 0px;
    border: 0px;
    cursor: pointer;
    position: relative;
    top: 25px;
  }
</style>

<style>
  .search-item {
    width: 80%;
    height: 80px;
    margin-bottom: 25px;
    line-height: 25px;
  }

  .search-param {
    color: #7a7a7a;
    margin-bottom: 15px;
    height: 20px;
    font-size: 16px;
    line-height: 20px;
  }

  .list {
    height: 30px;
    width: 200px;
    color: #7a7a7a;
    background: #ffffff;
    outline: none;
    border: 1px solid #d3d3d3;
  }

  .error {
    color: #f18787;
  }

  .query-item {
    display: inline-block;
    background: #29aae3;
    color: #ffffff;
    height: 30px;
    line-height: 30px;
    float: left;
    margin-right: 10px;
    padding: 0px 10px;
  }
</style>
