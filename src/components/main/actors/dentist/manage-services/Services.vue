<template>
  <div class="wrapper">
    <div id="services">
      <div class="title">Manage Services</div>

      <div class="query-section">
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
        <input type="button" class='submit-button' :value="actionMessage" @click="writeServiceWithFee">
      </div>

      <div class="result-section">
        <div class="trigger-section">
          <div class="trigger" :class="addClass(1, 'active')" data-open="scan-section" data-type="1" @click="switchView">Scan Services</div>
          <div class="trigger" :class="addClass(2, 'active')" data-open="treatment-section" data-type="2" @click="switchView">Treatment Services</div>
        </div>
        <div class="view-section">
          <div class="scan-section" :class="addClass(1, 'showing')" id="scan-section"></div>
          <div class="treatment-section" :class="addClass(2, 'showing')" id="treatment-section"></div>
        </div>
      </div>
      
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
      isThereMore (serviceType) {
        return this.$store.state.searchResult[serviceType === 1 ? 'fetchScanServices' : 'fetchTreatmentServices'].totalNumberAvailable > (this.pageNumber * this.perPage)
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
      writeServiceWithFee (evt) {
        if (evt) this.disableButton(evt.target)
        const serviceTypeId = Number(document.getElementById('service-type').selectedIndex)
        const serviceSubtypeId = Number(document.getElementById('service-sub-type').selectedIndex)
        const fee = this.getFee()
        let errors = [serviceTypeId === 0 ? document.getElementById('service-type') : undefined, serviceSubtypeId === 0 ? document.getElementById('service-sub-type') : undefined, fee === '' ? document.getElementById('fee') : undefined]
        errors = errors.filter(entry => entry !== undefined)
        if (errors.length > 0) {
          errors.forEach((item) => {
            item.classList.add('error')
            if (evt) this.enableButton(evt.target)
          })
        } else {
          this.beginWait(document.querySelector('.wrapper'))
          this.$root.callToWriteServiceWithFee({
            serviceObject: {
              serviceTypeId,
              serviceSubtypeId,
              fee
            },
            callback: (status) => {
              this.endWait(document.querySelector('.wrapper'))
              if (evt) this.enableButton(evt.target)
              if (status) this.fetchServices(null, this.currentOffset, this.$store.state.searchResult[serviceTypeId === 1 ? 'fetchScanServices' : 'fetchTreatmentServices'].seed, 1, serviceTypeId)
              this.notify(status ? 'Service Successfully added' : 'Unable to add Service')
            }
          })
        }
      },
      editService (evt, serviceTypeId, serviceSubtypeId) {
        console.log('edit')
      },
      deleteService (evt, serviceTypeId, serviceSubtypeId) {
        console.log('delete')
      },
      fetchServices (evt, offset = 0, seed = null, direction = 1, serviceType = 1) {
        const fetchQuery = {
          type: serviceType === 1 ? 'fetchScanServices' : 'fetchTreatmentServices',
          specials: {
            callSmartContractWith: 'fetchServicesWithFees',
            willUnshiftCoinbase: true
          },
          serviceType,
          offset,
          limit: this.perPage,
          seed: seed || Math.random()
        }

        this.$router.push({
          path: '/manage-services',
          query: {
            o: fetchQuery.offset,
            l: fetchQuery.limit,
            sd: fetchQuery.seed,
            sT: serviceType
          }
        })
        const offsetData = this.$store.state.searchResult[fetchQuery.type].data[offset]
        if (direction < 0 && offsetData && offsetData.length > 0) {
          this.populateResults(offsetData, serviceType)
        } else {
          this.getServices(evt, fetchQuery)
        }
      },
      getFee () {
        return document.getElementById('fee').value
      },
      getServices (evt, fetchQuery) {
        const serviceType = fetchQuery.serviceType
        const resultSection = document.querySelector(`.${serviceType === 1 ? 'scan-section' : 'treatment-section'}`)
        this.clearDOMElementChildren(resultSection)
        this.askUserToWaitWhileWeSearch(serviceType)
        this.$root.callToFetchDataObjects({
          fetchQuery,
          saveCallback: (results, state) => {
            const serviceTypeId = serviceType
            const serviceIds = results[1]
            const fees = results[2]
            serviceIds.forEach((serviceId, index) => {
              let result = {
                serviceName: serviceTypes[serviceTypeId].subTypes[serviceId],
                serviceFee: fees[index],
                serviceTypeId,
                serviceId
              }

              this.appendResult(result, serviceTypeId)
              state.searchResult[fetchQuery.type].data[fetchQuery.offset].push(result)
            })
            if (document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
            if (evt) this.enableButton(evt.target)
            if (serviceIds.length === 0) {
              this.informOfNoService(serviceType)
            }
          }
        })
      },
      populateResults (results, resultType = 1) {
        if (typeof resultType === 'object' && resultType.toNumber) resultType = resultType.toNumber()
        const resultSection = document.querySelector(`.${resultType === 1 ? 'scan-section' : 'treatment-section'}`)
        this.clearDOMElementChildren(resultSection)
        results.forEach((result) => {
          const resultDOMElement = this.createResultDOMElement(result)
          resultSection.appendChild(resultDOMElement)
        })
      },
      appendResult (result, resultType = 1) {
        if (typeof resultType === 'object' && resultType.toNumber) resultType = resultType.toNumber()
        const resultDOMElement = this.createResultDOMElement(result)
        const resultSection = document.querySelector(`.${Number(resultType) === 1 ? 'scan-section' : 'treatment-section'}`)
        resultSection.appendChild(resultDOMElement)
      },
      clearDOMElementChildren (DOMElement) {
        while (DOMElement.hasChildNodes()) {
          DOMElement.firstChild.remove()
        }
      },
      showNextPage () {
        const serviceType = Number(this.route.query.sT || 1)
        this.fetchServices(null, this.nextOffset, this.$store.state.searchResult[serviceType === 1 ? 'fetchScanServices' : 'fetchTreatmentServices'].seed, 1, serviceType)
      },
      showPreviousPage () {
        const serviceType = Number(this.route.query.sT || 1)
        this.fetchServices(null, this.previousOffset, this.$store.state.searchResult[serviceType === 1 ? 'fetchScanServices' : 'fetchTreatmentServices'].seed, -1, serviceType)
      },
      getPageIndex (offset = 0) {
        return offset / this.perPage
      },
      askUserToWaitWhileWeSearch (serviceType = 1) {
        if (document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
        if (document.querySelector('.no-service')) document.querySelector('.no-service').remove()
        let waitOverlayDOMElement = this.createWaitOverlayDOMElement(serviceType)
        document.querySelector('.result-section').appendChild(waitOverlayDOMElement)
      },
      informOfNoService (serviceType = 1) {
        if (document.querySelector('.no-service')) document.querySelector('.no-service').remove()
        let noServiceDOMElement = this.createNoServiceDOMElement(serviceType)
        document.querySelector('.result-section').appendChild(noServiceDOMElement)
      },
      createWaitOverlayDOMElement (serviceType = 1) {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="wait-overlay">
            <div class="wait-message">Please Wait... We're searching the blockchain for your ${serviceType === 1 ? 'Scan' : 'Treatment'} services.</div>
            <div class="spin"></div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      createNoServiceDOMElement (serviceType = 1) {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="no-service">
            <div class="no-service-message">
              It appears you have no ${serviceType === 1 ? 'Scan' : 'Treatment'} service on the blockchain.
            </div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      createResultDOMElement (result) {
        const resultDOMElement = new DOMParser().parseFromString(`          
          <div class="result">
            <div class="service-name">${result.serviceName}</div>
            <div class="service-fee">$ ${result.serviceFee}</div>
            <div class="edit" onclick="${this.editService(result.serviceTypeId, result.serviceId, result.serviceFee)}">Edit</div>
              <div class="delete" onclick="${this.deleteService(result.serviceTypeId, result.serviceId)}">Delete</div>
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
      const serviceType = Number(this.$route.query.sT || 1)
      this.populateServiceTypes()
      this.setEventListeners()
      this.getServices(null, {
        type: serviceType === 1 ? 'fetchScanServices' : 'fetchTreatmentServices',
        specials: {
          callSmartContractWith: 'fetchServicesWithFees',
          willUnshiftCoinbase: true
        },
        serviceType,
        offset: Number(this.$route.query.o || 0),
        limit: Number(this.$route.query.l || 0),
        seed: Number(this.$route.query.sd || 0)
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

  .query-section {
    width: 100%;
    height: 70px;
    margin-bottom: 30px;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .entry-item {
    height: 60px;
    display: inline-block;
    /*margin-right: 10px;*/
    margin-bottom: 30px;
    justify-content: center;
    min-width: 33%;
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
    width: 100%;
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
  
  .trigger-section {
    width: 100%;
    height: 40px;
    background: #edefef;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .trigger {
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

  .view-section {
    background: #ffffff;
    min-height: 260px;
    width: 100%;
  }

  .scan-section, .treatment-section {
    width: 100%;
    min-height: 260px;
    display: none;
  }

  .showing {
    display: block;
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
    position: absolute;
    top: 40px;
    width: 100%;
    min-height: 260px;
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

  .service-name {
    width: 50%;
    height: 40px;
    font-size: 20px;
    line-height: 40px;
  }

  .service-fee {
    width: 50%;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
  }

  .edit, .delete {
    width: 100px;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
    background: #3285b1;
    display: inline-block;
    text-decoration: none;
    font-size: 14px;
    text-align: center;
    margin-right: 10px;
    cursor: pointer;
  }
</style>

