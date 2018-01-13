<template>
  <div class="wrapper">
    <div id="find-dentists">
      <div class="title">Find Dentists</div>

      <div class="find-dentists-query-section">
        <div class="find-dentists-search-icon"></div>
        <div class="find-dentists-search-item">
          <div class="find-dentists-search-param">Locations</div>
          <div class="find-dentists-search-value">
            <select id="find-dentists-state" class="find-dentists-list"></select>
          </div>
        </div>

        <div class="find-dentists-search-item">
          <div class="find-dentists-search-param">Appointment Type</div>
          <div class="find-dentists-search-value">
            <select id="find-dentists-appointment-type" class="find-dentists-list"></select>
          </div>
        </div>

        <div class="find-dentists-search-item">
          <div class="find-dentists-search-param"></div>
          <div class="find-dentists-search-value">
            <select id="find-dentists-appointment-sub-type" class="find-dentists-list"></select>
          </div>
        </div>

        <div class="find-dentists-search-item">
          <div class="find-dentists-search-param">Budget</div>
          <div class="find-dentists-search-value">
            <select id="find-dentists-budget-range" class="find-dentists-list"></select>
          </div>
        </div>
      </div>

      <div class="find-dentists-submit">
        <input type="button" class='find-dentists-submit-button find-dentists-button' value="Find" @click="findDentists">
      </div>

      <div class="find-dentists-result-section"></div>

      <div class="find-dentists-navigation">
        <div v-if="isThereMore" @click="showNextPage" class="find-dentists-fetch-next">Next ></div>
        <div v-if="pageNumber !== 1" @click="showPreviousPage" class="find-dentists-fetch-previous">< Previous</div>
      </div>
    </div>
  </div>
</template>

<script>
  const budgetMin = 0
  const budgetMax = 5000
  const budgetPivot = 500
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
        const statesElement = document.getElementById('find-dentists-state')
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
        const appointmentTypesElement = document.getElementById('find-dentists-appointment-type')
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
        const searchPage = document.querySelector('#find-dentists')
        searchPage.addEventListener('change', function (evt) {
          let target = evt.target
          switch (target.id) {
            case 'find-dentists-appointment-type':
              _this.clearError(target)
              let appointmentSubtypesElement
              appointmentSubtypesElement = document.getElementById('find-dentists-appointment-sub-type')
              _this.populateAppointmentSubTypes(target.selectedIndex)
              let eventObject = document.createEvent('HTMLEvents')
              eventObject.initEvent('change', true, true)
              appointmentSubtypesElement.dispatchEvent(eventObject)
              appointmentSubtypesElement.focus()
              break
            case 'find-dentists-appointment-sub-type':
              _this.clearError(target)
              break
          }
        })

        searchPage.addEventListener('click', function (evt) {
          let target = evt.target
          switch (true) {
            case target.classList.contains('find-dentists-only-patient'):
              const dentistId = _this.$store.state.searchResult.findDentists.data[_this.currentOffset][target.dataset.sn].coinbase
              if (_this.user.isPatient && _this.user.dentistsIds.includes(dentistId)) {
                const rating = target.dataset.rating
                _this.writeDentistRating(evt, dentistId, rating)
              } else {
                console.log(':::You have to be a patient of a doctor before you can rate them.')
              }

              break
            case target.classList.contains('find-dentists-link-to-appointment'):
              _this.$router.push({
                path: '/request-appointment',
                query: {
                  o: _this.currentOffset,
                  sn: target.dataset.sn
                }
              })
              break
          }
        })
      },
      writeDentistRating (evt, dentistId, rating) {
        const target = evt.target
        this.disableNecessaryButtons(evt)
        this.beginWait(document.querySelector('.wrapper'))
        this.$root.callToWriteData({
          requestParams: {
            dentistId,
            rating
          },
          methodName: 'writeDentistRating',
          contractIndexToUse: 0,
          managerIndex: 0,
          callback: (status) => {
            this.endWait(document.querySelector('.wrapper'))
            this.enableNecessaryButtons(evt)
            this.updateRating(rating, target)
            this.notify(status ? 'Rating Successfully added' : 'Unable to add Rating')
          }
        })
      },
      updateRating (rating, target) {
        const averageRatingDOMElement = this.createAverageRatingDOMElement(rating, target.dataset.sn)
        document.querySelector('.find-dentist-about-section').replaceChild(averageRatingDOMElement, document.querySelector('.find-dentists-average-rating'))
      },
      clearError (target) {
        target.classList.remove('error')
      },
      populateAppointmentSubTypes (appointmentTypeIndex) {
        const appointmentSubtypesElement = document.getElementById('find-dentists-appointment-sub-type')
        if (appointmentTypeIndex === 0) {
          appointmentSubtypesElement.options[0].selected = true
        } else {
          appointmentSubtypesElement.closest('.find-dentists-search-item').querySelector('.find-dentists-search-param').innerHTML = appointmentTypes[appointmentTypeIndex].subtypes[0]
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
        const budgetRangeElement = document.getElementById('find-dentists-budget-range')
        const budgetRange = [Number(this.$route.query.bl), Number(this.$route.query.br)]
        const numberOfOptions = budgetMax / 500
        let budgetRangeText = `All Prices [$${budgetMin} - $${budgetMax}]`
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
        if (document.getElementById('find-dentists-appointment-sub-type')) {
          const appointmentTypeId = Number(document.getElementById('find-dentists-appointment-type').selectedIndex)
          const appointmentSubtypeId = Number(document.getElementById('find-dentists-appointment-sub-type').selectedIndex)
          const searchQuery = {
            type: 'findDentists',
            requestParams: {
              state: Number(document.getElementById('find-dentists-state').selectedIndex),
              appointmentTypeId,
              appointmentSubtypeId,
              budget: this.getBudget(),
              offset,
              limit: this.perPage,
              seed: seed || Math.random()
            },
            managerIndex: 1, // which of the contract managers to use
            methodName: 'findDentists',
            contractIndexToUse: 0,
            callOnEach: 'getOfficial',
            callOnEachParams: dentistId => ({
              officialId: dentistId,
              serviceTypeId: appointmentTypeId,
              serviceId: appointmentSubtypeId,
              keys: this.officialKeys(),
              recordFields: this.officialRecordFields(this.$store.state, dentistId, appointmentTypeId, appointmentSubtypeId),
              recordFieldTypes: this.officialRecordFieldTypes()
            })
          }

          let errors = [appointmentTypeId === 0 ? document.getElementById('find-dentists-appointment-type') : undefined, appointmentSubtypeId === 0 ? document.getElementById('find-dentists-appointment-sub-type') : undefined]
          errors = errors.filter(entry => entry !== undefined)
          if (errors.length > 0) {
            errors.forEach((item) => {
              item.classList.add('error')
            })
          } else {
            this.disableNecessaryButtons()
            this.$router.push({
              path: '/find-dentists',
              query: {
                o: searchQuery.requestParams.offset,
                l: searchQuery.requestParams.limit,
                sd: searchQuery.requestParams.seed,
                st: searchQuery.requestParams.state,
                aTI: searchQuery.requestParams.appointmentTypeId,
                aSI: searchQuery.requestParams.appointmentSubtypeId,
                bl: searchQuery.requestParams.budget[0],
                br: searchQuery.requestParams.budget[1]
              }
            })
            const offsetData = this.$store.state.searchResult[searchQuery.type].data[offset]
            this.scrollToTop()
            if (direction < 0 && offsetData && offsetData.length > 0) {
              this.populateResults(offsetData)
              this.enableNecessaryButtons()
            } else {
              this.getDentists(evt, searchQuery)
            }
          }
        } else {
          document.getElementById('find-dentists-appointment-type').classList.add('error')
        }
      },
      officialKeys () {
        return [
          'type',
          'status',
          'name',
          'email',
          'gravatar',
          'street',
          'city',
          'state',
          'zipCode',
          'country',
          'phoneNumber',
          'socialSecurityNumber',
          'birthday',
          'gender',
          'fee',
          'rating'
        ]
      },
      officialRecordFields (state, userId, serviceTypeId, serviceId) {
        userId = getSlicedAddressString(state, userId)
        serviceId = getSlicedAddressString(state, getLeftPaddedNumber(state, serviceId, 1))
        return [
          getSoliditySha3ForId(state, 'user/type', userId),
          getSoliditySha3ForId(state, 'user/status', userId),
          getSoliditySha3ForId(state, 'user/name', userId),
          getSoliditySha3ForId(state, 'user/email', userId),
          getSoliditySha3ForId(state, 'user/gravatar', userId),
          getSoliditySha3ForId(state, 'user/street', userId),
          getSoliditySha3ForId(state, 'user/city', userId),
          getSoliditySha3ForId(state, 'user/state', userId),
          getSoliditySha3ForId(state, 'user/zip-code', userId),
          getSoliditySha3ForId(state, 'user/country', userId),
          getSoliditySha3ForId(state, 'user/phone-number', userId),
          getSoliditySha3ForId(state, 'user/social-security-number', userId),
          getSoliditySha3ForId(state, 'user/birthday', userId),
          getSoliditySha3ForId(state, 'user/gender', userId),
          getSoliditySha3ForId(state, `dentist/${serviceTypeId === 1 ? 'scan' : 'treatment'}-service/fee`, userId, serviceId),
          getSoliditySha3ForId(state, 'dentist/average-rating', userId)
        ]
      },
      officialRecordFieldTypes () {
        // types: 1 => boolean, 2 => uint8, 3 => uint, 4 => address, 5 => bytes32, 7 => string
        return [2, 2, 7, 7, 5, 5, 5, 3, 5, 3, 5, 5, 5, 2, 3, 2]
      },
      getBudget () {
        const index = document.getElementById('find-dentists-budget-range').selectedIndex - 1
        return index >= 0 ? [(index * budgetPivot), ((index + 1) * budgetPivot)] : [budgetMin, budgetMax]
      },
      getDentists (evt, fetchQuery) {
        const resultSection = document.querySelector('.find-dentists-result-section')
        this.clearDOMElementChildren(resultSection)
        this.askUserToWaitWhileWeSearch()
        this.disableNecessaryButtons()
        this.$root.callToFetchDataObjects({
          fetchQuery,
          preSaveCallback: (result) => {
            Object.assign(result, {
              serviceTypeId: fetchQuery.requestParams.appointmentTypeId,
              serviceId: fetchQuery.requestParams.appointmentSubtypeId,
              fee: result.fee,
              averageRating: result.rating,
              rating: result.rating
            })
          },
          callback: (result = null, isCompleted = false) => {
            // update result view
            if (isCompleted) {
              if (document.querySelector('.find-dentists-wait-overlay')) document.querySelector('.find-dentists-wait-overlay').remove()
              this.enableNecessaryButtons()
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
        const resultSection = document.querySelector('.find-dentists-result-section')
        this.clearDOMElementChildren(resultSection)
        results.forEach((result) => {
          const resultDOMElement = this.createResultDOMElement(result)
          resultSection.appendChild(resultDOMElement)
          resultDOMElement.querySelector('.find-dentists-gravatar-section').appendChild(result.avatarCanvas)
        })
      },
      appendResult (result) {
        const resultDOMElement = this.createResultDOMElement(result)
        const resultSection = document.querySelector('.find-dentists-result-section')
        resultSection.appendChild(resultDOMElement)
        resultDOMElement.querySelector('.find-dentists-gravatar-section').appendChild(result.avatarCanvas)
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
        if (document.querySelector('.find-dentists-wait-overlay')) document.querySelector('.find-dentists-wait-overlay').remove()
        if (document.querySelector('.find-dentists-no-dentist')) document.querySelector('.find-dentists-no-dentist').remove()
        let waitOverlayDOMElement = this.createWaitOverlayDOMElement()
        document.querySelector('.find-dentists-result-section').insertBefore(waitOverlayDOMElement, document.querySelector('.find-dentists-result'))
      },
      informOfNoOfficial () {
        if (document.querySelector('.find-dentists-no-dentist')) document.querySelector('.find-dentists-no-dentist').remove()
        let noDentistDOMElement = this.createNoDentistDOMElement()
        document.querySelector('.find-dentists-result-section').insertBefore(noDentistDOMElement, document.querySelector('.find-dentists-result'))
      },
      createWaitOverlayDOMElement () {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="find-dentists-wait-overlay">
            <div class="find-dentists-wait-message">Please Wait... We're searching the blockchain for dentists matching your choices.</div>
            <div class="spin"></div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      createNoDentistDOMElement () {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="find-dentists-no-dentist">
            <div class="find-dentists-no-dentist-message">
              No Dentist matching your choices was found. Modify your search parameters above and try again.
            </div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      createResultDOMElement (result) {
        const averageRatingDOMElement = this.createAverageRatingDOMElement(result.averageRating, result.SN)
        const resultDOMElement = new DOMParser().parseFromString(`
          <div class="find-dentists-result">
            <div class="find-dentists-gravatar-section"></div>
            <div class="find-dentist-about-section">
              <div class="find-dentists-name">${result.name || 'Name: Not Supplied'}</div>
              <div class="find-dentists-company-name">${result.companyName || 'Company Name: Not Supplied'}</div>
              <div class="find-dentists-service">${appointmentTypes[result.serviceTypeId].subtypes[result.serviceId]}</div>
              <div class="find-dentists-fee">$ ${result.fee}</div>
              ${averageRatingDOMElement.outerHTML}
              <div class="find-dentists-address">${result.address || 'Address: Not Supplied'}</div>
            </div>
            ${this.user.isPatient && result.serviceTypeId !== 2 ? '<div class="find-dentists-request-appointment-section"><div class="find-dentists-link-to-appointment" data-sn="' + result.SN + '">Request Appointment</div></div>' : ''}
          </div>
        `, 'text/html').body.firstChild
        return resultDOMElement
      },
      createAverageRatingDOMElement (averageRating, SN) {
        const ratingsArray = []
        for (let i = 0; i < 5; i++) {
          ratingsArray.push(`
            <div data-rating="${i + 1}" data-sn="${SN}" class="find-dentists-rating ${i < averageRating ? 'filled' : ''} ${this.user.isPatient ? 'find-dentists-only-patient' : ''}"></div>
          `)
        }

        return new DOMParser().parseFromString(`
          <div class="find-dentists-average-rating">${ratingsArray.join(' ')}</div>
        `, 'text/html').body.firstChild
      },
      disableNecessaryButtons (evt = null) {
        Array.from(document.querySelectorAll('.find-dentists-button')).forEach(button => this.disableButton(button))
      },
      enableNecessaryButtons (evt = null) {
        Array.from(document.querySelectorAll('.find-dentists-button')).forEach(button => this.enableButton(button))
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
        requestParams: {
          state: Number(this.$route.query.st),
          appointmentTypeId: Number(this.$route.query.aTI),
          appointmentSubtypeId: Number(this.$route.query.aSI),
          budget: [Number(this.$route.query.bl), Number(this.$route.query.br)],
          offset: Number(this.$route.query.o),
          limit: Number(this.$route.query.l),
          seed: Number(this.$route.query.sd)
        },
        managerIndex: 1, // which of the contract managers to use
        methodName: 'findDentists',
        contractIndexToUse: 0,
        callOnEach: 'getOfficial',
        callOnEachParams: dentistId => ({
          officialId: dentistId,
          serviceTypeId: Number(this.$route.query.aTI),
          serviceId: Number(this.$route.query.aSI),
          keys: this.officialKeys(),
          recordFields: this.officialRecordFields(this.$store.state, dentistId, Number(this.$route.query.aTI), Number(this.$route.query.aSI)),
          recordFieldTypes: this.officialRecordFieldTypes()
        })
      })
    }
  }

  import states from '../../../../../static/json/states/states.json'
  import appointmentTypes from '../../../../../static/json/appointment_types/appointment_types.json'
  import $ from 'jquery'
  import {getSlicedAddressString, getSoliditySha3ForId, getLeftPaddedNumber} from '../../../../blockchain/utilities'
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

  #find-dentists {
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

  .find-dentists-query-section {
    width: 100%;
    height: 65px;
    background: #ffffff;
    display: flex;
    flex-direction: row;
  }

  .find-dentists-search-icon {
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

  .find-dentists-search-item {
    height: 60px;
    display: inline-block;
    /*margin-right: 10px;*/
    margin-bottom: 0px;
    margin-top: 0px;
    justify-content: center;
    min-width: 24%;
  }

  .find-dentists-search-param {
    color: #7f7f7f;
    margin-bottom: 5px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
  }

  .find-dentists-list {
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

  .find-dentists-submit {
    position: relative;
    top: 0px;
    width: 100%;
    height: 30px;
  }

  .find-dentists-submit-button {
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

  .find-dentists-result-section {
    position: relative;
    min-height: 300px;
    margin-top: 20px;
  }

  .find-dentists-navigation {
    width: 100%;
    float: right;
  }

  .find-dentists-fetch-next, .find-dentists-fetch-previous {
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

  .find-dentists-fetch-next:hover, .find-dentists-fetch-previous:hover {
    background: #dae3e8;
  }
</style>

<style>
  .find-dentists-no-dentist {
    position: relative;
    width: 100%;
    min-height: 300px;
    text-align: center;
    font-size: 16px;
  }

  .find-dentists-no-dentist-message {
    height: 30px;
    position: relative;
    top: 110px;
  }

  .find-dentists-wait-overlay {
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

  .find-dentists-wait-message {
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

  .find-dentists-result {
    width: 95%;
    border-bottom: 1px solid #a7a7a7;
    min-height: 180px;
    padding: 10px 0px;
  }

  .find-dentists-gravatar-section {
    width: 60px;
    height: 60px;
    float: left;
    display: inline-block;
    margin-right: 10px;
    border: 1px solid #c3c3c3;
    border-radius: 6px;
    padding: 3px;
  }

  .find-dentists-gravatar-section > canvas {
    height: 100%;
    width: 100%;
    border-radius: 6px;
  }

  .find-dentist-about-section {
    width: 250px;
    height: 150px;
    display: inline-block;
    float: left;
  }

  .find-dentist-about-section > div {
    display: block;
    height: 20px !important;
    line-height: 20px !important;
    font-size: 14px;
    text-align: left;
    width: 100%;
  }

  .profile-link {
    font-size: 10px !important;
    color: #bfced9;
    cursor: pointer;
  }

  .find-dentists-average-rating {
    width: 100% !important;
  }

  .find-dentists-average-rating > div {
    background: url(/static/images/star_line.png) no-repeat;
    background-size: contain;
    height: 20px;
    width: 20px;
    display: inline-block;
    float: left;
  }

  .find-dentists-average-rating > div.find-dentists-only-patient {
    cursor: pointer;
  }

  .find-dentists-average-rating:hover > div.find-dentists-only-patient {
    background: url(/static/images/star.png) no-repeat;
    background-size: contain;
  }

  .find-dentists-average-rating > div.find-dentists-only-patient:hover {
    background: url(/static/images/star.png) no-repeat;
    background-size: contain;
  }

  .find-dentists-average-rating > div.find-dentists-only-patient:hover ~ div.find-dentists-only-patient {
    background: url(/static/images/star_line.png) no-repeat;
    background-size: contain;
  }

  .find-dentists-average-rating > .filled {
    background: url(/static/images/star.png) no-repeat;
    background-size: contain;
  }

  .find-dentists-request-appointment-section {
    width: auto;
    height: 150px;
    line-height: 150px;
    display: inline-block;
    float: right;
  }

  .find-dentists-link-to-appointment {
    width: 200px;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    background: #3285b1 !important;
    display: inline-block;
    text-decoration: none;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
  }
</style>
