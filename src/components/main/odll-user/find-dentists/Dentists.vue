<template>
  <div class="wrapper">
    <div id="dentists">
      <div class="title">Find Dentists</div>

      <div class="query-section">
        <div class="search-icon"></div>
        <div class="search-item">
          <div class="search-param">Locations</div>
          <div class="search-value">
            <select id="state" class="list"></select>
          </div>
        </div>

        <div class="search-item">
          <div class="search-param">Appointment Type</div>
          <div class="search-value">
            <select id="appointment-type" class="list"></select>
            <div class="tip"></div>
          </div>
        </div>

        <div class="search-item">
          <div class="search-param"></div>
          <div class="search-value">
            <select id="appointment-sub-type" class="list"></select>
            <div class="tip"></div>
          </div>
        </div>

        <div class="search-item">
          <div class="search-param">Budget</div>
          <div class="search-value">
            <select id="budget-range" class="list"></select>
          </div>
        </div>
      </div>

      <div class="submit">
        <input type="button" class='submit-button' value="Find" @click="findDentists">
      </div>

      <div class="result-section">
        <div class="result" v-for="dentist in searchResults">
          <div class="gravatar-section"></div>
          <div class="about-section">
            <div class="name">{{ dentist.name }}</div>
            <div class="company-name">{{ dentist.companyName }}</div>
            <div class="service">{{ dentist.service }}</div>
            <div class="fee">{{ dentist.fee }}</div>
            <div class="average-rating">{{ dentist.averageRating }}</div>
            <div class="address">{{ dentist.address }}</div>
            <div class="profile-link">See more</div>
          </div>
          <div class="request-appointment-section">
            <router-link :to="request-appointment" class="link-to-appointment">Request Appointment</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    computed: {
      searchResults () {
        return this.$store.state.searchResult.findDentist
      },
      pageNumber () {
        return (Number(this.$route.query.o) / this.perPage) + 1
      },
      nextOffset () {
        return (this.pageNumber - 1) * this.perPage
      },
      perPage () {
        return 5
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
            if (index === Number(this.$route.query.sd)) optionElement.selected = true
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
            if (index === Number(this.$route.query.aTI)) optionElement.selected = true
          }
        })
      },
      setEventListeners () {
        const _this = this
        const searchPage = document.querySelector('#dentists')
        searchPage.addEventListener('change', function (evt) {
          let target = evt.target
          switch (target.id) {
            case 'appointment-type':
              let appointmentSubtypesElement
              appointmentSubtypesElement = document.getElementById('appointment-sub-type')
              _this.populateAppointmentSubTypes(target.selectedIndex)
              let eventObject = document.createEvent('HTMLEvents')
              eventObject.initEvent('change', true, true)
              appointmentSubtypesElement.dispatchEvent(eventObject)
              appointmentSubtypesElement.focus()
              break
          }
        })
      },
      populateAppointmentSubTypes (appointmentTypeIndex) {
        const appointmentSubtypesElement = document.getElementById('appointment-sub-type')
        if (appointmentTypeIndex === 0) {
          appointmentSubtypesElement.options[0].selected = true
        } else {
          appointmentSubtypesElement.closest('.search-item').querySelector('.search-param').innerHTML = appointmentTypes[appointmentTypeIndex].subTypes[0]
          while (appointmentSubtypesElement.firstChild) {
            appointmentSubtypesElement.removeChild(appointmentSubtypesElement.firstChild)
          }

          const appointmentSubtypes = appointmentTypes[appointmentTypeIndex].subTypes
          appointmentSubtypes.forEach((appointmentSubtype, index) => {
            const optionElement = document.createElement('option')
            optionElement.text = appointmentSubtype
            if (appointmentSubtypesElement) {
              appointmentSubtypesElement.appendChild(optionElement)
              if (index === Number(this.$route.query.aSI)) optionElement.selected = true
            }
          })
        }
      },
      populateBudgets () {
        const budgetRangeElement = document.getElementById('budget-range')
        const budgetRange = [Number(this.$route.query.bl), Number(this.$route.query.br)]
        for (let i = 0; i < 4; i++) {
          let budgetRangeText = '$' + (i * 50) + ' - $' + ((i + 1) * 50)
          const optionElement = document.createElement('option')
          optionElement.text = budgetRangeText
          if (budgetRangeElement) {
            budgetRangeElement.appendChild(optionElement)
            if ((i * 50) <= budgetRange[0] && (((i + 1) * 50) - 1) >= budgetRange[1]) optionElement.selected = true
          }
        }
      },
      findDentists (evt, offset = 0, seed = null) {
        const target = evt.target
        if (document.getElementById('appointment-sub-type')) {
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
            budget: this.getBudget(),
            offset,
            limit: this.perPage,
            seed: seed || Math.random()
            // seed: this.$store.state.searchSeed.findDentists || Math.ceil(Number(this.$route.query.sd) * 113)
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
            this.$router.push({
              path: '/find-dentists',
              query: {
                o: searchQuery.offset,
                l: searchQuery.limit,
                sd: searchQuery.seed,
                st: searchQuery.state,
                aTI: searchQuery.appointmentTypeId,
                aSI: searchQuery.appointmentSubtypeId,
                bl: searchQuery.budget[0],
                br: searchQuery.budget[1]
              }
            })

            this.getDentists(searchQuery)
          }
        } else {
          console.log('Choose Appointment Type')
        }
      },
      getBudget () {
        const index = document.getElementById('budget-range').selectedIndex
        return [(index * 50), ((index + 1) * 50)]
      },
      getDentists (searchQuery) {
        const target = document.querySelector('.submit-button')
        this.askUserToWaitWhileWeSearch()
        this.$root.callToFindDentists({
          searchQuery,
          callback: (searchResults = []) => {
            const totalNumber = searchResults[0]
            const ids = searchResults[1]
            console.log(totalNumber)
            // update result view
            if (ids && ids.length > 0) {
              ids.forEach((result) => {
                this.$root.callToGetDentistDataFromFind({
                  type: searchQuery.type,
                  serviceTypeId: searchQuery.appointmentTypeId,
                  serviceId: searchQuery.appointmentSubtypeId,
                  dentistId: result,
                  callback: (searchResult, numberRetrieved) => {
                    console.log(searchResult, numberRetrieved)
                    if (numberRetrieved === ids.length && document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
                    target.disabled = false
                    target.style.cursor = 'pointer'
                    target.style.background = '#29aae1'
                  }
                })
              })
            } else {
              if (document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
              target.disabled = false
              target.style.cursor = 'pointer'
              target.style.background = '#29aae1'
              this.informOfNoDentist()
            }
          }
        })
      },
      askUserToWaitWhileWeSearch () {
        if (document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
        if (document.querySelector('.no-dentist')) document.querySelector('.no-dentist').remove()
        let waitOverlayDOMElement = this.createWaitOverlayDOMElement()
        document.querySelector('.result-section').insertBefore(waitOverlayDOMElement, document.querySelector('.result'))
      },
      informOfNoDentist () {
        if (document.querySelector('.no-dentist')) document.querySelector('.no-dentist').remove()
        let noDentistDOMElement = this.createNoDentistDOMElement()
        document.querySelector('.result-section').insertBefore(noDentistDOMElement, document.querySelector('.result'))
      },
      createWaitOverlayDOMElement () {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="wait-overlay">
            <div class="wait-message">Please Wait... We're searching the blockchain for dentists matching your choices.</div>
            <div class="spin"></div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      createNoDentistDOMElement () {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="no-dentist">
            <div class="no-dentist-message">
              No Dentist matching your choices was found. Modify your search parameters above and try again.
            </div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      }
    },
    mounted: function () {
      this.populateStates()
      this.populateAppointmentTypes()
      this.populateAppointmentSubTypes(Number(this.$route.query.aTI))
      this.populateBudgets(Number(this.$route.query.bl), Number(this.$route.query.br))
      this.setEventListeners()
      this.getDentists({
        state: Number(this.$route.query.st),
        appointmentTypeId: Number(this.$route.query.aTI),
        appointmentSubtypeId: Number(this.$route.query.aSI),
        budget: [Number(this.$route.query.bl), Number(this.$route.query.br)],
        offset: Number(this.$route.query.o),
        limit: Number(this.$route.query.l),
        seed: Math.ceil(Number(this.$route.query.sd) * 113)
      })
    }
  }

  import states from '../../../../../static/json/states/states.json'
  import appointmentTypes from '../../../../../static/json/appointment_types/appointment_types.json'
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

  #dentists {
    background: #ffffff;
    min-height: 70vh;
    width: 90%;
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

  .query-section {
    width: 100%;
    height: 70px;
    margin-bottom: 30px;
    background: #ffffff;
    display: flex;
    flex-direction: row;
  }

  .search-icon {
    background: url('/static/images/search.png') no-repeat;
    min-width: 4%;
    height: 30px;
    background-size: contain;
    display: inline-block;
    margin-top: 5px;
    float: left;
    position: relative;
    top: 20px;
  }

  .search-item {
    height: 60px;
    display: inline-block;
    /*margin-right: 10px;*/
    margin-bottom: 30px;
    justify-content: center;
    min-width: 24%;
  }

  .search-param {
    color: #7f7f7f;
    margin-bottom: 5px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
  }

  .list {
    height: 30px;
    width: 95%;
    background: #ffffff;
    outline: none;
    border: 1px solid #d3d3d3;
    color: #7f7f7f;
  }

  .result {
    width: 100%;
    border-bottom: 1px solid #dcdede;
    min-height: 300px;
  }

  .gravatar-section {
    width: 120px;
    height: 100%;
  }

  .about-section {
    width: 350px;
    height: 100%;
  }

  .request-appointment-section {
    width: 200px;
    height: 100%;
  }

  .link-to-appointment {
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    background: #29aae3;
  }

  .submit {
    position: relative;
    top: -35px;
    width: 100%;
    height: 30px;
  }

  .submit-button {
    margin-right: 7px;
    padding: 2px;
    text-align: center;
    float: right;
    outline: 0px;
    border: 0px;
    cursor: pointer;
    height: 30px;
    width: 100px;
    background: #29aae1;
    color: #ffffff;
  }
</style>

<style>
  .no-dentist {
    position: relative;
    width: 100%;
    min-height: 300px;
    text-align: center;
    font-size: 16px;
  }

  .no-dentist-message {
    height: 30px;
    position: relative;
    top: 110px;
  }

  .wait-overlay {
    position: relative;
    width: 100%;
    min-height: 300px;
    text-align: center;
    font-size: 16px;
  }

  .wait-message {
    height: 30px;
    position: relative;
    top: 110px;
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
    position: relative;
    top: 110px;
    left: 50%;
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
