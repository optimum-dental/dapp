<template>
  <div class="wrapper">
    <div id="services">
      <div class="title">Manage Services</div>

      <div class="query-section">
        <div class="entry-icon"></div>
        <div class="entry-item">
          <div class="entry-param">Location</div>
          <div class="entry-value">
            <select id="state" class="list"></select>
          </div>
        </div>

        <div class="entry-item">
          <div class="entry-param">Service Type</div>
          <div class="entry-value">
            <select id="service-type" class="list"></select>
          </div>
        </div>

        <div class="entry-item">
          <div class="entry-param"></div>
          <div class="entry-value">
            <select id="service-sub-type" class="list"></select>
          </div>
        </div>

        <div class="entry-item">
          <div class="entry-param">Fee [USD]</div>
          <div class="entry-value">
            <input type="number" id="fee"></select>
          </div>
        </div>
      </div>

      <div class="submit">
        <input type="button" class='submit-button' :value="actionMessage" @click="writeServicesWithFees">
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
  export default {
    computed: {
      user () {
        return this.$root.user
      },
      isThereMore () {
        return this.$store.state.searchResult.fetchServices.totalNumberAvailable > (this.pageNumber * this.perPage)
      },
      fetchResults () {
        return this.$store.state.searchResult.fetchServices.data[this.getPageIndex(this.currentOffset)] || []
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
      },
      actionMessage () {
        return this.isEditing ? 'Update Service' : 'Add Service'
      },
      isEditing () {
        return Number(this.$route.query.e || 0) === 1
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
      populateServiceTypes () {
        const serviceTypesElement = document.getElementById('service-type')
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
            case 'service-type':
              _this.clearError(target)
              let serviceSubtypesElement
              serviceSubtypesElement = document.getElementById('service-sub-type')
              _this.populateServiceSubTypes(target.selectedIndex)
              let eventObject = document.createEvent('HTMLEvents')
              eventObject.initEvent('change', true, true)
              serviceSubtypesElement.dispatchEvent(eventObject)
              serviceSubtypesElement.focus()
              break
            case 'service-sub-type':
              _this.clearError(target)
              break
          }
        })
      },
      clearError (target) {
        target.classList.remove('error')
      },
      populateServiceSubTypes (serviceTypeIndex) {
        const serviceSubtypesElement = document.getElementById('service-sub-type')
        if (serviceTypeIndex === 0) {
          serviceSubtypesElement.options[0].selected = true
        } else {
          serviceSubtypesElement.closest('.entry-item').querySelector('.entry-param').innerHTML = serviceTypes[serviceTypeIndex].subTypes[0]
          while (serviceSubtypesElement.firstChild) {
            serviceSubtypesElement.removeChild(serviceSubtypesElement.firstChild)
          }

          const serviceSubtypes = serviceTypes[serviceTypeIndex].subTypes
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
      writeServicesWithFees (evt) {
        if (evt) this.disableButton(evt.target)
        const serviceTypeId = Number(document.getElementById('service-type').selectedIndex)
        const serviceSubtypeId = Number(document.getElementById('service-sub-type').selectedIndex)
        const state = Number(document.getElementById('state').selectedIndex)
        const fee = this.getFee()
        let errors = [serviceTypeId === 0 ? document.getElementById('service-type') : undefined, serviceSubtypeId === 0 ? document.getElementById('service-sub-type') : undefined, fee === '' ? document.getElementById('fee') : undefined]
        errors = errors.filter(entry => entry !== undefined)
        if (errors.length > 0) {
          errors.forEach((item) => {
            item.classList.add('error')
            if (evt) this.enableButton(evt.target)
          })
        } else {
          this.$root.callToWriteServicesWithFees({
            serviceTypeId,
            serviceSubtypeId,
            serviceState: state,
            fee,
            callback: (status) => {
              if (evt) this.enableButton(evt.target)
              if (status) this.fetchServices(null, this.currentOffset, this.searchResult.fetchServices.seed)
              this.notify(status ? 'Service Successfully added' : 'Unable to add Service')
            }
          })
        }
      },
      fetchServices (evt, offset = 0, seed = null, direction = 1) {
        if (document.getElementById('service-sub-type')) {
          if (evt) this.disableButton(evt.target)
          const serviceTypeId = Number(document.getElementById('service-type').selectedIndex)
          const serviceSubtypeId = Number(document.getElementById('service-sub-type').selectedIndex)
          const searchQuery = {
            type: 'fetchServices',
            state: Number(document.getElementById('state').selectedIndex),
            serviceTypeId,
            serviceSubtypeId,
            fee: this.getFee(),
            offset,
            limit: this.perPage,
            seed: seed || Math.random(),
            callOnEach: 'getService',
            callOnEachParams: (serviceTypeId, serviceSubtypeId) => ({serviceTypeId, serviceSubtypeId})
          }

          let errors = [serviceTypeId === 0 ? document.getElementById('service-type') : undefined, serviceSubtypeId === 0 ? document.getElementById('service-sub-type') : undefined]
          errors = errors.filter(entry => entry !== undefined)
          if (errors.length > 0) {
            errors.forEach((item) => {
              item.classList.add('error')
              if (evt) this.enableButton(evt.target)
            })
          } else {
            this.$router.push({
              path: '/manage-services',
              query: {
                o: searchQuery.offset,
                l: searchQuery.limit,
                sd: searchQuery.seed,
                st: searchQuery.state,
                sTI: searchQuery.serviceTypeId,
                sSI: searchQuery.serviceSubtypeId,
                f: searchQuery.fee
              }
            })
            const offsetData = this.$store.state.searchResult[searchQuery.type].data[offset]
            if (direction < 0 && offsetData && offsetData.length > 0) {
              this.populateResults(offsetData)
            } else {
              this.getServices(evt, searchQuery)
            }
          }
        } else {
          document.getElementById('service-type').classList.add('error')
        }
      },
      getFee () {
        return document.getElementById('fee').value
      },
      getServices (evt, fetchQuery) {
        const resultSection = document.querySelector('.result-section')
        this.clearDOMElementChildren(resultSection)
        this.askUserToWaitWhileWeSearch()
        this.$root.callToFetchDataObjects({
          fetchQuery,
          callback: (result = null, isCompleted = false) => {
            // update result view
            if (isCompleted) {
              if (document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
              if (evt) this.enableButton(evt.target)
            }

            if (result) {
              this.appendResult(result)
            } else {
              this.informOfNoService()
              if (document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
              if (evt) this.enableButton(evt.target)
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
        this.fetchServices(null, this.nextOffset, this.$store.state.searchResult.fetchServices.seed)
      },
      showPreviousPage () {
        this.fetchServices(null, this.previousOffset, this.$store.state.searchResult.fetchServices.seed, -1)
      },
      getPageIndex (offset = 0) {
        return offset / this.perPage
      },
      askUserToWaitWhileWeSearch () {
        if (document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
        if (document.querySelector('.no-service')) document.querySelector('.no-service').remove()
        let waitOverlayDOMElement = this.createWaitOverlayDOMElement()
        document.querySelector('.result-section').insertBefore(waitOverlayDOMElement, document.querySelector('.result'))
      },
      informOfNoService () {
        if (document.querySelector('.no-service')) document.querySelector('.no-service').remove()
        let noDentistDOMElement = this.createNoDentistDOMElement()
        document.querySelector('.result-section').insertBefore(noDentistDOMElement, document.querySelector('.result'))
      },
      createWaitOverlayDOMElement () {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="wait-overlay">
            <div class="wait-message">Please Wait... We're searching the blockchain for your services.</div>
            <div class="spin"></div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      createNoDentistDOMElement () {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="no-service">
            <div class="no-service-message">
              It appears you have no service on the blockchain.
            </div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      createResultDOMElement (result) {
        const resultDOMElement = new DOMParser().parseFromString(`          
          <div class="result">
            <div class="about-section">
              <div class="service-type">${result.serviceType || 'Service Type: Not Supplied'}</div>
              <div class="service-subtype">${result.serviceSubtype || 'Service Subtype: Not Supplied'}</div>
              <div class="state">${result.state || 'Service State: Not Supplied'}</div>
              <div class="fee">${result.fee || 'Service Fee: Not Supplied'}</div>
            </div>
          </div>
        `, 'text/html').body.firstChild
        return resultDOMElement
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
      }
    },
    mounted: function () {
      this.populateStates()
      this.populateServiceTypes()
      this.setEventListeners()
      this.getServices(null, {
        type: 'fetchServices',
        state: Number(this.$route.query.st || 0),
        serviceTypeId: Number(this.$route.query.sTI || 0),
        serviceSubtypeId: Number(this.$route.query.sSI || 0),
        fee: Number(this.$route.query.f || 0),
        offset: Number(this.$route.query.o || 0),
        limit: Number(this.$route.query.l || 0),
        seed: Number(this.$route.query.sd || 0),
        callOnEach: 'getService',
        callOnEachParams: serviceId => ({serviceTypeId: Number(this.$route.query.sTI), serviceSubtypeId: Number(this.$route.query.sSI)})
      })
    }
  }

  import states from '../../../../../../static/json/states/states.json'
  import serviceTypes from '../../../../../../static/json/appointment_types/appointment_types.json'
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

  .query-section {
    width: 100%;
    height: 70px;
    margin-bottom: 30px;
    background: #ffffff;
    display: flex;
    flex-direction: row;
  }

  .entry-icon {
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

  .entry-item {
    height: 60px;
    display: inline-block;
    /*margin-right: 10px;*/
    margin-bottom: 30px;
    justify-content: center;
    min-width: 24%;
  }

  .entry-param {
    color: #7f7f7f;
    margin-bottom: 5px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
  }

  .list, #fee {
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
  .no-service {
    position: relative;
    width: 100%;
    min-height: 300px;
    text-align: center;
    font-size: 16px;
  }

  .no-service-message {
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
</style>

