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
          </div>
        </div>

        <div class="search-item">
          <div class="search-param"></div>
          <div class="search-value">
            <select id="appointment-sub-type" class="list"></select>
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

      <div class="result-section"></div>

      <div class="navigation">
        <div v-if="isThereMore" @click="showNextPage" class="fetch-next">Next ></div>
        <div v-if="pageNumber !== 1" @click="showPreviousPage" class="fetch-previous">< Previous</div>
      </div>
    </div>
  </div>
</template>

<script>
  const budgetMin = 0
  const budgetMax = 2000
  const budgetPivot = 200
  export default {
    computed: {
      user () {
        return this.$root.user
      },
      isThereMore () {
        return this.$store.state.searchResult.findDentists.totalNumberAvailable > (this.pageNumber * this.perPage)
      },
      fetchResults () {
        return this.$store.state.searchResult.findDentists.data[this.getPageIndex(this.currentOffset)] || []
      },
      pageNumber () {
        return (Number(this.$route.query.o || 0) / this.perPage) + 1
      },
      nextOffset () {
        return (this.pageNumber * this.perPage)
      },
      currentOffset () {
        return (this.nextOffset - this.perPage)
      },
      previousOffset () {
        return (this.currentOffset - this.perPage)
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
            if (index === Number(this.$route.query.st)) optionElement.selected = true
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
              _this.clearError(target)
              let appointmentSubtypesElement
              appointmentSubtypesElement = document.getElementById('appointment-sub-type')
              _this.populateAppointmentSubTypes(target.selectedIndex)
              let eventObject = document.createEvent('HTMLEvents')
              eventObject.initEvent('change', true, true)
              appointmentSubtypesElement.dispatchEvent(eventObject)
              appointmentSubtypesElement.focus()
              break
            case 'appointment-sub-type':
              _this.clearError(target)
              break
          }
        })
      },
      clearError (target) {
        target.classList.remove('error')
      },
      populateAppointmentSubTypes (appointmentTypeIndex) {
        const appointmentSubtypesElement = document.getElementById('appointment-sub-type')
        if (appointmentTypeIndex === 0) {
          appointmentSubtypesElement.options[0].selected = true
        } else {
          appointmentSubtypesElement.closest('.search-item').querySelector('.search-param').innerHTML = appointmentTypes[appointmentTypeIndex].subtypes[0]
          while (appointmentSubtypesElement.firstChild) {
            appointmentSubtypesElement.removeChild(appointmentSubtypesElement.firstChild)
          }

          const appointmentSubtypes = appointmentTypes[appointmentTypeIndex].subtypes
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
        const numberOfOptions = 10
        let budgetRangeText = 'All Prices [$0 - $2000]'
        let optionElement = document.createElement('option')
        optionElement.text = budgetRangeText
        if (budgetRangeElement) budgetRangeElement.appendChild(optionElement)

        for (let i = 0; i < numberOfOptions; i++) {
          budgetRangeText = '$' + (i * budgetPivot) + ' - $' + ((i + 1) * budgetPivot)
          optionElement = document.createElement('option')
          optionElement.text = budgetRangeText
          if (budgetRangeElement) {
            budgetRangeElement.appendChild(optionElement)
            if ((i * budgetPivot) <= budgetRange[0] && (((i + 1) * budgetPivot)) >= budgetRange[1]) optionElement.selected = true
          }
        }
      },
      findDentists (evt, offset = 0, seed = null, direction = 1) {
        if (document.getElementById('appointment-sub-type')) {
          if (evt) this.disableButton(evt.target)
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
            seed: seed || Math.random(),
            callOnEach: 'getDentistDataFromFind',
            callOnEachParams: dentistId => ({dentistId, serviceTypeId: appointmentTypeId, serviceId: appointmentSubtypeId})
          }

          let errors = [appointmentTypeId === 0 ? document.getElementById('appointment-type') : undefined, appointmentSubtypeId === 0 ? document.getElementById('appointment-sub-type') : undefined]
          errors = errors.filter(entry => entry !== undefined)
          if (errors.length > 0) {
            errors.forEach((item) => {
              item.classList.add('error')
              if (evt) this.enableButton(evt.target)
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
            const offsetData = this.$store.state.searchResult[searchQuery.type].data[offset]
            this.scrollToTop()
            if (direction < 0 && offsetData && offsetData.length > 0) {
              this.populateResults(offsetData)
            } else {
              this.getDentists(evt, searchQuery)
            }
          }
        } else {
          document.getElementById('appointment-type').classList.add('error')
        }
      },
      getBudget () {
        const index = document.getElementById('budget-range').selectedIndex - 1
        return index >= 0 ? [(index * budgetPivot), ((index + 1) * budgetPivot)] : [budgetMin, budgetMax]
      },
      getDentists (evt, fetchQuery) {
        const resultSection = document.querySelector('.result-section')
        this.clearDOMElementChildren(resultSection)
        this.askUserToWaitWhileWeSearch()
        this.$root.callToFetchDataObjects({
          fetchQuery,
          preSaveCallback: (result) => {
            Object.assign(result, {
              serviceTypeId: fetchQuery.appointmentTypeId,
              serviceId: fetchQuery.appointmentSubtypeId,
              fee: result.fee.toNumber(),
              averageRating: result.rating.toNumber(),
              rating: result.rating.toNumber()
            })
          },
          callback: (result = null, isCompleted = false) => {
            // update result view
            if (isCompleted) {
              if (document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
              if (evt) this.enableButton(evt.target)
            }

            if (result) {
              this.appendResult(result)
            } else {
              this.informOfNoOfficial()
            }
          }
        })
      },
      populateResults (results) {
        const resultSection = document.querySelector('.result-section')
        this.clearDOMElementChildren(resultSection)
        results.forEach((result) => {
          const resultDOMElement = this.createResultDOMElement(result)
          resultSection.appendChild(resultDOMElement)
          resultDOMElement.querySelector('.gravatar-section').appendChild(result.avatarCanvas)
        })
      },
      appendResult (result) {
        const resultDOMElement = this.createResultDOMElement(result)
        const resultSection = document.querySelector('.result-section')
        resultSection.appendChild(resultDOMElement)
        resultDOMElement.querySelector('.gravatar-section').appendChild(result.avatarCanvas)
      },
      clearDOMElementChildren (DOMElement) {
        while (DOMElement.hasChildNodes()) {
          DOMElement.firstChild.remove()
        }
      },
      showNextPage () {
        this.findDentists(null, this.nextOffset, this.$store.state.searchResult.findDentists.seed)
      },
      showPreviousPage () {
        this.findDentists(null, this.previousOffset, this.$store.state.searchResult.findDentists.seed, -1)
      },
      getPageIndex (offset = 0) {
        return offset / this.perPage
      },
      askUserToWaitWhileWeSearch () {
        if (document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
        if (document.querySelector('.no-dentist')) document.querySelector('.no-dentist').remove()
        let waitOverlayDOMElement = this.createWaitOverlayDOMElement()
        document.querySelector('.result-section').insertBefore(waitOverlayDOMElement, document.querySelector('.result'))
      },
      informOfNoOfficial () {
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
      },
      createResultDOMElement (result) {
        const averageRatingDOMElement = this.createAverageRatingDOMElement(result.averageRating)
        const resultDOMElement = new DOMParser().parseFromString(`
          <div class="result">
            <div class="gravatar-section"></div>
            <div class="about-section">
              <div class="name">${result.name || 'Name: Not Supplied'}</div>
              <div class="company-name">${result.companyName || 'Company Name: Not Supplied'}</div>
              <div class="service">${appointmentTypes[result.serviceTypeId].subtypes[result.serviceId]}</div>
              <div class="fee">$ ${result.fee}</div>
              ${averageRatingDOMElement.outerHTML}
              <div class="address">${result.address || 'Address: Not Supplied'}</div>
            </div>
            ${this.user.isPatient ? '<div class="request-appointment-section"><a href="/#/request-appointment?sn=' + result.SN + '" class="link-to-appointment">Request Appointment</a></div>' : ''}
          </div>
        `, 'text/html').body.firstChild
        return resultDOMElement
      },
      createAverageRatingDOMElement (averageRating) {
        const ratingsArray = []
        for (let i = 0; i < 5; i++) {
          ratingsArray.push(`
            <div class="rating ${i < averageRating ? 'filled' : ''}"></div>
          `)
        }

        return new DOMParser().parseFromString(`
          <div class="average-rating">${ratingsArray.join(' ')}</div>
        `, 'text/html').body.firstChild
      },
      disableButton (target) {
        target.disabled = true
        target.style.cursor = 'not-allowed'
        target.style.background = '#adcddf'
      },
      enableButton (target) {
        target.disabled = false
        target.style.cursor = 'pointer'
        target.style.background = '#29aae1'
      },
      notify (message) {
        console.log(message)
      },
      scrollToTop () {
        $('html, body').animate({scrollTop: '0px'}, 500)
      }
    },
    mounted: function () {
      this.populateStates()
      this.populateAppointmentTypes()
      this.populateAppointmentSubTypes(Number(this.$route.query.aTI))
      this.populateBudgets(Number(this.$route.query.bl), Number(this.$route.query.br))
      this.setEventListeners()
      this.getDentists(null, {
        type: 'findDentists',
        state: Number(this.$route.query.st),
        appointmentTypeId: Number(this.$route.query.aTI),
        appointmentSubtypeId: Number(this.$route.query.aSI),
        budget: [Number(this.$route.query.bl), Number(this.$route.query.br)],
        offset: Number(this.$route.query.o),
        limit: Number(this.$route.query.l),
        seed: Number(this.$route.query.sd),
        callOnEach: 'getDentistDataFromFind',
        callOnEachParams: dentistId => ({dentistId, serviceTypeId: Number(this.$route.query.aTI), serviceId: Number(this.$route.query.aSI)})
      })
    }
  }

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

  #dentists {
    background: #ffffff;
    min-height: 70vh;
    width: 90%;
    font-size: 12px;
    margin: 30px auto;
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

  .error {
    border: 1px solid #f18787;
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

  .result-section {
    position: relative;
    min-height: 300px;
  }

  .navigation {
    width: 100%;
    float: right;
  }

  .fetch-next, .fetch-previous {
    cursor: pointer;
    color: #6592ad;
    background: #ffffff;
    height: 30px;
    line-height: 30px;
    width: 120px;
    display: inline-block;
    float: right;
    text-align: center;
    margin-right: 5px;
    font-size: 14px;
  }

  .fetch-next:hover, .fetch-previous:hover {
    background: #dae3e8;
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
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.9);
  }

  .wait-message {
    height: 30px;
    line-height: 30px;
    position: relative;
    font-size: 16px;
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
  }

  @keyframes odll-spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .result {
    width: 95%;
    border-bottom: 1px solid #a7a7a7;
    min-height: 180px;
    padding: 10px 0px;
  }

  .gravatar-section {
    width: 60px;
    height: 60px;
    float: left;
    display: inline-block;
    margin-right: 10px;
    border: 1px solid #c3c3c3;
    border-radius: 6px;
    padding: 3px;
  }

  .gravatar-section > canvas {
    height: 100%;
    width: 100%;
    border-radius: 6px;
  }

  .about-section {
    width: 250px;
    height: 150px;
    display: inline-block;
    float: left;
  }

  .about-section > div {
    display: block;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    text-align: left;
    width: 100%;
  }

  .profile-link {
    font-size: 10px !important;
    color: #bfced9;
    cursor: pointer;
  }

  .average-rating > div {
    background: url(/static/images/star_line.png) no-repeat;
    background-size: contain;
    height: 20px;
    width: 20px;
    display: inline-block;
    float: left;
    margin: 0px 5px;
  }

  .average-rating > .filled {
    background: url(/static/images/star.png) no-repeat;
    background-size: contain;
  }

  .request-appointment-section {
    width: auto;
    height: 150px;
    line-height: 150px;
    display: inline-block;
    float: right;
  }

  .link-to-appointment {
    width: 200px;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    background: #3285b1;
    display: inline-block;
    text-decoration: none;
    font-size: 14px;
    text-align: center;
  }
</style>

