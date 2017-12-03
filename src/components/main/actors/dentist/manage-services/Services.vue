<template>
  <div class="wrapper">
    <div id="services">
      <div class="title">Manage Services</div>

      <div class="services-query-section">
        <div class="services-entry-item">
          <div class="services-entry-param">Service Type</div>
          <div class="services-entry-value">
            <select id="services-service-type" class="services-list"></select>
          </div>
        </div>

        <div class="services-entry-item">
          <div class="services-entry-param"></div>
          <div class="services-entry-value">
            <select id="services-service-subtype" class="services-list"></select>
          </div>
        </div>

        <div class="services-entry-item">
          <div class="services-entry-param">Fee [USD]</div>
          <div class="services-entry-value">
            <input type="number" id="services-fee"></select>
          </div>
        </div>
      </div>

      <div class="submit">
        <input type="button" class='services-post services-button' value="Add Service" @click="writeServiceWithFee">
      </div>

      <div class="services-result-section">
        <div class="services-trigger-section">
          <div class="services-trigger" :class="addClass(1, 'active')" data-open="services-scan-section" data-type="1" @click="switchView">Scan Services</div>
          <div class="services-trigger" :class="addClass(2, 'active')" data-open="services-treatment-section" data-type="2" @click="switchView">Treatment Services</div>
        </div>
        <div class="services-view-section">
          <div class="services-scan-section" :class="addClass(1, 'showing')" id="services-scan-section"></div>
          <div class="services-treatment-section" :class="addClass(2, 'showing')" id="services-treatment-section"></div>
        </div>
      </div>

      <div class="services-navigation">
        <div v-if="isThereMore" @click="showNextPage" class="services-fetch-next">Next ></div>
        <div v-if="pageNumber !== 1" @click="showPreviousPage" class="services-fetch-previous">< Previous</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      user () {
        return this.$root.user
      },
      isThereMore () {
        return this.$store.state.searchResult[Number(this.$route.query.sT || 1) === 1 ? 'fetchScanServices' : 'fetchTreatmentServices'].totalNumberAvailable > (this.pageNumber * this.perPage)
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
      addClass (check, value) {
        return Number(this.$route.query.sT) === check || (!this.$route.query.sT && check === 1) ? value : ''
      },
      switchView (evt) {
        const target = evt.target
        if (!(target.classList.contains('active'))) {
          document.querySelector('.showing').classList.remove('showing')
          document.querySelector('.active').classList.remove('active')
          target.classList.add('active')
          document.querySelector(`.${target.dataset.open}`).classList.add('showing')
          const serviceType = Number(target.dataset.type)
          this.fetchServices(null, this.currentOffset, this.$store.state.searchResult[serviceType === 1 ? 'fetchScanServices' : 'fetchTreatmentServices'].seed, 1, serviceType)
        }
      },
      populateServiceTypes () {
        const serviceTypesElement = document.getElementById('services-service-type')
        serviceTypes.forEach((serviceType, index) => {
          const optionElement = document.createElement('option')
          optionElement.text = serviceType.name
          if (serviceTypesElement) {
            serviceTypesElement.appendChild(optionElement)
            if (index === Number(this.$route.query.sTI)) optionElement.selected = true
          }
        })
      },
      setEventListeners () {
        const _this = this
        const servicesPage = document.querySelector('#services')
        servicesPage.addEventListener('change', function (evt) {
          let target = evt.target
          switch (target.id) {
            case 'services-service-type':
              _this.clearError(target)
              let serviceSubtypesElement
              serviceSubtypesElement = document.getElementById('services-service-subtype')
              _this.populateServiceSubTypes(target.selectedIndex)
              _this.dispatchEventFrom(serviceSubtypesElement, 'change')
              serviceSubtypesElement.focus()
              break
            case 'services-service-subtype':
              _this.clearError(target)
              break
            case 'services-fee':
              _this.clearError(target)
              break
          }
        })

        servicesPage.addEventListener('keyup', function (evt) {
          let target = evt.target
          switch (target.id) {
            case 'services-fee':
              _this.clearError(target)
              break
          }
        })

        servicesPage.addEventListener('click', function (evt) {
          let target = evt.target
          switch (true) {
            case (target.classList.contains('services-edit-service')):
              _this.scrollToTop()
              let [serviceType, serviceSubtype, serviceFee] = target.dataset.params.split('%').map(param => Number(param))
              let [serviceTypeDOMElement, serviceSubtypeDOMElement, serviceFeeDOMElement] = [document.getElementById('services-service-type'), document.getElementById('services-service-subtype'), document.getElementById('services-fee')]
              serviceTypeDOMElement.options[serviceType].selected = true
              _this.dispatchEventFrom(serviceTypeDOMElement, 'change')
              serviceSubtypeDOMElement.options[serviceSubtype].selected = true
              serviceFeeDOMElement.value = serviceFee
              let updateButton = document.querySelector('.services-post')
              updateButton.value = 'Update Service'
              if (document.querySelector('.services-cancel')) document.querySelector('.services-cancel').remove()
              document.querySelector('.submit').insertBefore(_this.cancelButton(), updateButton)
              serviceTypeDOMElement.disabled = true
              serviceSubtypeDOMElement.disabled = true
              break

            case (target.classList.contains('services-cancel')):
              [serviceTypeDOMElement, serviceSubtypeDOMElement, serviceFeeDOMElement] = [document.getElementById('services-service-type'), document.getElementById('services-service-subtype'), document.getElementById('services-fee')]
              serviceTypeDOMElement.options[0].selected = true
              _this.dispatchEventFrom(serviceTypeDOMElement, 'change')
              serviceFeeDOMElement.value = ''
              let insertButton = document.querySelector('.services-post')
              insertButton.value = 'Add Service'
              document.querySelector('.services-cancel').remove()
              serviceTypeDOMElement.disabled = false
              serviceSubtypeDOMElement.disabled = false
              break

            case (target.classList.contains('services-delete-service')):
              [serviceType, serviceSubtype, serviceFee] = target.dataset.params.split('%').map(param => Number(param))
              _this.deleteService(evt, serviceType, serviceSubtype)
              break
          }
        })
      },
      dispatchEventFrom (DOMElement, eventType) {
        const eventObject = document.createEvent('HTMLEvents')
        eventObject.initEvent(eventType, true, true)
        DOMElement.dispatchEvent(eventObject)
      },
      cancelButton () {
        const DOMELement = new DOMParser().parseFromString(`<input type="button" class="services-button services-cancel" value="Cancel">`, 'text/html')
        return DOMELement.body.firstChild
      },
      clearError (target) {
        target.classList.remove('error')
      },
      populateServiceSubTypes (serviceTypeIndex) {
        const serviceSubtypesElement = document.getElementById('services-service-subtype')
        if (serviceTypeIndex === 0) {
          while (serviceSubtypesElement.hasChildNodes()) serviceSubtypesElement.firstChild.remove()
          serviceSubtypesElement.closest('.services-entry-item').querySelector('.services-entry-param').innerHTML = ''
        } else {
          serviceSubtypesElement.closest('.services-entry-item').querySelector('.services-entry-param').innerHTML = serviceTypes[serviceTypeIndex].subtypes[0]
          while (serviceSubtypesElement.firstChild) {
            serviceSubtypesElement.removeChild(serviceSubtypesElement.firstChild)
          }

          const serviceSubtypes = serviceTypes[serviceTypeIndex].subtypes
          serviceSubtypes.forEach((serviceSubtype, index) => {
            const optionElement = document.createElement('option')
            optionElement.text = serviceSubtype
            if (serviceSubtypesElement) {
              serviceSubtypesElement.appendChild(optionElement)
              if (index === Number(this.$route.query.sSI)) optionElement.selected = true
            }
          })
        }
      },
      writeServiceWithFee (evt) {
        const serviceTypeId = Number(document.getElementById('services-service-type').selectedIndex)
        const serviceSubtypeId = Number(document.getElementById('services-service-subtype').selectedIndex)
        const fee = this.getFee()
        let errors = [serviceTypeId === 0 ? document.getElementById('services-service-type') : undefined, serviceSubtypeId === 0 ? document.getElementById('services-service-subtype') : undefined, fee === '' ? document.getElementById('services-fee') : undefined]
        errors = errors.filter(entry => entry !== undefined)
        if (errors.length > 0) {
          errors.forEach((item) => {
            item.classList.add('error')
          })
        } else {
          this.scrollToTop()
          this.disableNecessaryButtons(evt)
          this.beginWait(document.querySelector('.wrapper'))
          this.$root.callToWriteData({
            requestParams: {
              serviceTypeId,
              serviceSubtypeId,
              fee
            },
            managerIndex: 2, // which of the contract managers to use
            contractIndexToUse: 0,
            methodName: 'writeServiceWithFee',
            callback: (status) => {
              this.endWait(document.querySelector('.wrapper'))
              this.enableNecessaryButtons(evt)
              if (status) this.fetchServices(null, this.currentOffset, this.$store.state.searchResult[serviceTypeId === 1 ? 'fetchScanServices' : 'fetchTreatmentServices'].seed, 1, serviceTypeId)
              this.notify(status ? 'Service Successfully added' : 'Unable to add Service')
            }
          })
        }
      },
      deleteService (evt, serviceTypeId, serviceSubtypeId) {
        this.scrollToTop()
        this.beginWait(document.querySelector('.wrapper'))
        this.disableNecessaryButtons(evt)
        this.$root.callToDeleteService({
          serviceObject: {
            serviceTypeId,
            serviceSubtypeId
          },
          callback: (status) => {
            this.endWait(document.querySelector('.wrapper'))
            this.enableNecessaryButtons(evt)
            if (status) this.fetchServices(null, this.currentOffset, this.$store.state.searchResult[serviceTypeId === 1 ? 'fetchScanServices' : 'fetchTreatmentServices'].seed, 1, serviceTypeId)
            this.notify(status ? 'Service Successfully deleted' : 'Unable to delete Service')
          }
        })
      },
      fetchServices (evt, offset = 0, seed = null, direction = 1, serviceTypeId = 1) {
        const fetchQuery = {
          type: serviceTypeId === 1 ? 'fetchScanServices' : 'fetchTreatmentServices',
          requestParams: {
            userId: this.user.coinbase,
            serviceTypeId,
            offset,
            limit: this.perPage,
            seed: seed || Math.random()
          },
          managerIndex: 1, // which of the contract managers to use
          methodName: 'fetchServices',
          contractIndexToUse: 1,
          callOnEach: 'getServiceDetail',
          callOnEachParams: serviceId => ({serviceTypeId, serviceId: serviceId.toNumber()})
        }

        this.$router.push({
          path: '/manage-services',
          query: {
            o: fetchQuery.requestParams.offset,
            l: fetchQuery.requestParams.limit,
            sd: fetchQuery.requestParams.seed,
            sT: serviceTypeId
          }
        })
        const offsetData = this.$store.state.searchResult[fetchQuery.type].data[offset]
        if (direction < 0 && offsetData && offsetData.length > 0) {
          this.populateResults(offsetData, serviceTypeId)
        } else {
          this.getServices(evt, fetchQuery)
        }
      },
      getFee () {
        return document.getElementById('services-fee').value
      },
      getServices (evt, fetchQuery) {
        const serviceTypeId = fetchQuery.requestParams.serviceTypeId
        const resultSection = document.querySelector(`.${serviceTypeId === 1 ? 'services-scan-section' : 'services-treatment-section'}`)
        this.clearDOMElementChildren(resultSection)
        this.askUserToWaitWhileWeSearch(serviceTypeId)
        this.disableNecessaryButtons()
        this.$root.callToFetchDataObjects({
          fetchQuery,
          callback: (result = null, isCompleted = false) => {
            // update result view
            if (isCompleted) {
              if (document.querySelector('.services-wait-overlay')) document.querySelector('.services-wait-overlay').remove()
              this.enableNecessaryButtons()
            }

            if (result) {
              this.appendResult(result, serviceTypeId)
            } else {
              this.informOfNoService(serviceTypeId)
            }
          }
        })
      },
      populateResults (results, resultType = 1) {
        if (typeof resultType === 'object' && resultType.toNumber) resultType = resultType.toNumber()
        const resultSection = document.querySelector(`.${resultType === 1 ? 'services-scan-section' : 'services-treatment-section'}`)
        this.clearDOMElementChildren(resultSection)
        results.forEach((result) => {
          const resultDOMElement = this.createResultDOMElement(result)
          resultSection.appendChild(resultDOMElement)
        })
      },
      appendResult (result, resultType = 1) {
        if (typeof resultType === 'object' && resultType.toNumber) resultType = resultType.toNumber()
        const resultDOMElement = this.createResultDOMElement(result)
        const resultSection = document.querySelector(`.${Number(resultType) === 1 ? 'services-scan-section' : 'services-treatment-section'}`)
        resultSection.appendChild(resultDOMElement)
      },
      clearDOMElementChildren (DOMElement) {
        while (DOMElement.hasChildNodes()) {
          DOMElement.firstChild.remove()
        }
      },
      showNextPage () {
        const serviceTypeId = Number(this.$route.query.sT || 1)
        this.fetchServices(null, this.nextOffset, this.$store.state.searchResult[serviceTypeId === 1 ? 'fetchScanServices' : 'fetchTreatmentServices'].seed, 1, serviceTypeId)
      },
      showPreviousPage () {
        const serviceTypeId = Number(this.$route.query.sT || 1)
        this.fetchServices(null, this.previousOffset, this.$store.state.searchResult[serviceTypeId === 1 ? 'fetchScanServices' : 'fetchTreatmentServices'].seed, -1, serviceTypeId)
      },
      getPageIndex (offset = 0) {
        return offset / this.perPage
      },
      askUserToWaitWhileWeSearch (serviceTypeId = 1) {
        if (document.querySelector('.services-wait-overlay')) document.querySelector('.services-wait-overlay').remove()
        if (document.querySelector('.services-no-service')) document.querySelector('.services-no-service').remove()
        let waitOverlayDOMElement = this.createWaitOverlayDOMElement(serviceTypeId)
        document.querySelector('.services-result-section').appendChild(waitOverlayDOMElement)
      },
      informOfNoService (serviceTypeId = 1) {
        if (document.querySelector('.services-no-service')) document.querySelector('.services-no-service').remove()
        let noServiceDOMElement = this.createNoServiceDOMElement(serviceTypeId)
        document.querySelector('.services-result-section').appendChild(noServiceDOMElement)
      },
      createWaitOverlayDOMElement (serviceTypeId = 1) {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="services-wait-overlay">
            <div class="services-wait-message">Please Wait... We're searching the blockchain for your ${serviceTypeId === 1 ? 'Scan' : 'Treatment'} services.</div>
            <div class="spin"></div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      createNoServiceDOMElement (serviceTypeId = 1) {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="services-no-service">
            <div class="services-no-service-message">
              It appears you have no ${serviceTypeId === 1 ? 'Scan' : 'Treatment'} service on the blockchain.
            </div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      createResultDOMElement (result) {
        const resultDOMElement = new DOMParser().parseFromString(`
          <div class="services-result">
            <div class="services-service-name">${result.serviceName}</div>
            <div class="services-service-fee">$ ${result.serviceFee}</div>
            <div class="services-action-buttons">
              <input type="button" value="Edit" class="services-button services-edit-service" data-params="${result.serviceTypeId}%${result.serviceId}%${result.serviceFee}">
              <input type="button" value="Delete" class="services-button services-delete-service" data-params="${result.serviceTypeId}%${result.serviceId}%${result.serviceFee}">
            </div>
          </div>
        `, 'text/html').body.firstChild
        return resultDOMElement
      },
      disableNecessaryButtons (evt = null) {
        Array.from(document.querySelectorAll('.services-button')).forEach(button => this.disableButton(button))
      },
      enableNecessaryButtons (evt = null) {
        Array.from(document.querySelectorAll('.services-button')).forEach(button => this.enableButton(button))
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
      beginWait (target) {
        target.classList.add('wait')
      },
      endWait (target) {
        target.classList.remove('wait')
      },
      scrollToTop () {
        $('html, body').animate({scrollTop: '0px'}, 500)
      }
    },
    mounted: function () {
      const serviceTypeId = Number(this.$route.query.sT || 1)
      this.populateServiceTypes()
      this.setEventListeners()
      this.getServices(null, {
        type: serviceTypeId === 1 ? 'fetchScanServices' : 'fetchTreatmentServices',
        requestParams: {
          userId: this.user.coinbase,
          serviceTypeId,
          offset: Number(this.$route.query.o || 0),
          limit: Number(this.$route.query.l || this.perPage),
          seed: Number(this.$route.query.sd || Math.random())
        },
        managerIndex: 1, // which of the contract managers to use
        methodName: 'fetchServices',
        contractIndexToUse: 1,
        callOnEach: 'getServiceDetail',
        callOnEachParams: serviceId => ({serviceTypeId, serviceId: serviceId.toNumber()})
      })
    }
  }

  import serviceTypes from '../../../../../../static/json/appointment_types/appointment_types.json'
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

  .wait:before {
    content: '';
    display: block;
    position: relative;
    width: 200px;
    margin: auto;
    height: 4px;
    background-color: #f4903e;
    animation: wait-keyframe 4.2s infinite
  }

  @keyframes wait-keyframe {
    0% {width: 20%;}
    25% {width: 40%;}
    50% {width: 60%;}
    75% {width: 80%;}
    100% {width: 100%;}
  }

  #services {
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

  .services-query-section {
    width: 100%;
    height: 65px;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .services-entry-item {
    height: 60px;
    display: inline-block;
    /*margin-right: 10px;*/
    margin-bottom: 0px;
    margin-top: 0px;
    justify-content: center;
    min-width: 33%;
  }

  .services-entry-param {
    color: #7f7f7f;
    margin-bottom: 5px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
  }

  .services-list, #services-fee {
    height: 30px;
    width: 100%;
    background: #ffffff;
    outline: none;
    border: 1px solid #d3d3d3;
    color: #7f7f7f;
  }

  .error {
    border: 1px solid #f18787 !important;
  }

  .submit {
    position: relative;
    top: 0px;
    width: 100%;
    height: 30px;
    text-align: right;
  }

  .services-button {
    padding: 2px;
    text-align: center;
    outline: 0px;
    border: 0px;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    width: 100px;
    background: #29aae1;
    color: #ffffff;
    display: inline-block;
  }

  .services-result-section {
    position: relative;
    min-height: 300px;
    margin-top: 20px;
  }

  .services-trigger-section {
    width: 100%;
    height: 40px;
    background: #edefef;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .services-trigger {
    height: 35px;
    width: 50%;
    margin-top: 5px;
    cursor: pointer;
    font-size: 16px;
    line-height: 35px;
    text-align: center;
  }

  .active {
    background: #ffffff;
    cursor: auto;
  }

  .services-view-section {
    background: #ffffff;
    min-height: 260px;
    width: 100%;
  }

  .services-scan-section, .services-treatment-section {
    width: 100%;
    min-height: 260px;
    display: none;
  }

  .showing {
    display: block;
  }

  .services-navigation {
    width: 100%;
    float: right;
  }

  .services-fetch-next, .services-fetch-previous {
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

  .services-fetch-next:hover, .services-fetch-previous:hover {
    background: #dae3e8;
  }
</style>

<style>
  .services-no-service {
    position: absolute;
    top: 40px;
    width: 100%;
    min-height: 260px;
    text-align: center;
    font-size: 16px;
  }

  .services-no-service-message {
    height: 30px;
    position: relative;
    top: 110px;
  }

  .services-wait-overlay {
    position: absolute;
    top: 40px;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 16px;
    height: 260px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.9);
  }

  .services-wait-message {
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

  .services-result {
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

  .request-service-section {
    width: auto;
    height: 150px;
    line-height: 150px;
    display: inline-block;
    float: right;
  }

  .link-to-service {
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

  .services-service-name {
    width: 90%;
    height: 40px;
    font-size: 20px;
    line-height: 40px;
  }

  .services-service-fee {
    width: 90%;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
  }

  .services-button {
    padding: 2px;
    text-align: center;
    outline: 0px;
    border: 0px;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    width: 100px;
    background: #29aae1;
    color: #ffffff;
    margin-left: 10px;
    display: inline-block;
  }

  .services-edit-service, .services-delete-service {
    background: #3285b1 !important;
    text-decoration: none;
    margin: 0px 10px 0px 0px !important;
  }
</style>
