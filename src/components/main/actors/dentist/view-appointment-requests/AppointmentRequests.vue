<template>
  <div class="wrapper">
    <div id="appointment-requests">
      <div class="title">Appointment Requests</div>

      <div class="appointment-requests-query-section">
        <div class="appointment-requests-entry-item">
          <div class="appointment-requests-entry-param">Request Type</div>
          <div class="appointment-requests-entry-value">
            <select id="appointment-requests-request-type" class="appointment-requests-list">
              <option>General Scan Requests</option>
              <option>Direct Scan Request</option>
              <option>Accepted Scan Request</option>
            </select>
          </div>
        </div>
      </div>

      <div class="appointment-requests-result-section"></div>

      <div class="appointment-requests-navigation">
        <div v-if="isThereMore" @click="showNextPage" class="appointment-requests-fetch-next">Next ></div>
        <div v-if="pageNumber !== 1" @click="showPreviousPage" class="appointment-requests-fetch-previous">< Previous</div>
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
        return this.$store.state.searchResult[Number(this.$route.query.rTI || 0) === 1 ? 'fetchScanRequests' : 'fetchTreatmentRequests'].totalNumberAvailable > (this.pageNumber * this.perPage)
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
      populateRequestTypes () {
        const requestTypeIndex = Number(this.$route.query.rTI || 0)
        const requestTypeDOMElement = document.getElementById('appointment-requests-request-type')
        requestTypeDOMElement.options[requestTypeIndex].selected = true
      },
      setEventListeners () {
        const _this = this
        const appointmentRequestsPage = document.querySelector('#appointment-requests')
        appointmentRequestsPage.addEventListener('change', function (evt) {
          let target = evt.target
          switch (target.id) {
            case 'appointment-requests-request-type':
              _this.fetchRequests(evt, 0, null, 1, evt.target.selectedIndex)
              break
          }
        })

        // appointmentRequestsPage.addEventListener('click', function (evt) {
        //   let target = evt.target
        //   switch (true) {
        //     case (target.classList.contains('apply-to-scan')):
        //       _this.showApplicationForm(evt)
        //       break
        //   }
        // })

        document.body.addEventListener('click', function (evt) {
          let target = evt.target
          switch (true) {
            case (target.classList.contains('apply-to-scan')):
              _this.showApplicationForm(evt)
              break
            case (target.classList.contains('apply-button')):
              _this.applyToScan(evt)
              break
            case (target.classList.contains('cancel-apply-button')):
              const applicationForm = document.querySelector('.appointment-requests-modal')
              if (applicationForm) {
                applicationForm.remove()
                document.body.style.overflow = 'visible'
              }
              break
          }
        })
      },
      showApplicationForm (evt) {
        const sn = evt.target.dataset.params
        const scanRequest = this.$store.state.searchResult['fetchScanRequests'].data[this.currentOffset][sn]
        const applicationForm = this.getApplicationFormDOMElement(scanRequest)
        document.body.appendChild(applicationForm)
        applicationForm.style.top = `${window.pageYOffset}px`
        document.body.style.overflow = 'hidden'
      },
      getApplicationFormDOMElement (scanRequest = {}) {
        return new DOMParser().parseFromString(`
          <div class='appointment-requests-modal'>
            <div class='appointment-requests-application-form'>
              <div class='appointment-requests-modal-entry'>
                <label>Application for: ${scanRequest.serviceName}</label>
              </div>

              <div class='appointment-requests-modal-entry'>
                <label for='appointment-requests-quote'>Quote [USD]</label>
                <input type='number' id='appointment-requests-quote' placeholder='Quote in USD' value='${scanRequest.fee}'>
              </div>

              <div class='appointment-requests-modal-entry'>
                <label for='appointment-requests-comment'>Comment</label>
                <textarea id='appointment-requests-comment'></textarea>
              </div>

              <div class='appointment-requests-modal-entry'>
                <input type='button' class='cancel-apply-button' value='Cancel'>
                <input type='button' class='apply-button' value='Send' data-params='${scanRequest.SN}'>
              </div>
            </div>
          </div>
        `, 'text/html').body.firstChild
      },
      applyToScan (evt) {
        const sn = evt.target.dataset.params
        const scanRequest = this.$store.state.searchResult['fetchScanRequests'].data[this.currentOffset][sn]
        const patientId = scanRequest.patientId
        const requestId = scanRequest.requestId
        const quote = Number(document.getElementById('appointment-requests-quote').value) || 0
        const comment = `b${document.getElementById('appointment-requests-comment').value}`

        this.scrollToTop()
        const applicationForm = document.querySelector('.appointment-requests-modal')
        if (applicationForm) applicationForm.style.top = '0px'
        this.disableNecessaryButtons(evt)
        this.beginWait(document.querySelector('.wrapper'))
        this.$root.callToWriteData({
          requestParams: {
            patientId,
            requestId,
            quote,
            comment
          },
          managerIndex: 2, // which of the contract managers to use
          contractIndexToUse: 5,
          methodName: 'applyToScan',
          callback: (status) => {
            this.endWait(document.querySelector('.wrapper'))
            this.enableNecessaryButtons(evt)
            if (status) this.fetchRequests(null, this.currentOffset, this.$store.state.searchResult['fetchScanRequests'].seed, 1, this.$route.query.rTI)
            this.notify(status ? 'Application Successfully added' : 'Unable to add Application')
            if (applicationForm) {
              applicationForm.remove()
              document.body.style.overflow = 'visible'
            }
          }
        })
      },
      fetchRequests (evt, offset = 0, seed = null, direction = 1, requestTypeIndex = 0) {
        const fetchQuery = {
          type: 'fetchScanRequests',
          requestParams: this.getSmartContractMethodParams(offset, this.perPage, seed || Math.random())[requestTypeIndex],
          managerIndex: 1, // which of the contract managers to use
          contractIndexToUse: requestTypeIndex === 0 ? 3 : 2,
          methodName: this.getSmartContractMethodName()[requestTypeIndex],
          callOnEach: 'getRequestDetail',
          callOnEachParams: requestId => ({requestTypeId: 1, requestId: requestId.toNumber(), dentistId: this.user.coinbase})
        }

        this.$router.push({
          path: '/view-appointment-requests',
          query: {
            o: fetchQuery.requestParams.offset,
            l: fetchQuery.requestParams.limit,
            sd: fetchQuery.requestParams.seed,
            rTI: requestTypeIndex
          }
        })
        const offsetData = this.$store.state.searchResult[fetchQuery.type].data[offset]
        if (direction < 0 && offsetData && offsetData.length > 0) {
          this.populateResults(offsetData)
        } else {
          this.getRequests(evt, fetchQuery)
        }
      },
      getSmartContractMethodName () {
        return [
          'fetchAllScanRequests',
          'fetchDirectScanRequestsForDentist',
          'fetchAcceptedScanRequestsForDentist'
        ]
      },
      getSmartContractMethodParams (offset, limit, seed) {
        return [
          {
            offset,
            limit,
            seed
          },
          {
            userId: this.user.coinbase,
            offset,
            limit,
            seed
          },
          {
            userId: this.user.coinbase,
            offset,
            limit,
            seed
          }
        ]
      },
      getRequests (evt, fetchQuery) {
        const resultSection = document.querySelector('.appointment-requests-result-section')
        this.clearDOMElementChildren(resultSection)
        this.askUserToWaitWhileWeSearch()
        this.disableNecessaryButtons()
        this.$root.callToFetchDataObjects({
          fetchQuery,
          callback: (result = null, isCompleted = false) => {
            // update result view
            if (isCompleted) {
              if (document.querySelector('.appointment-requests-wait-overlay')) document.querySelector('.appointment-requests-wait-overlay').remove()
              this.enableNecessaryButtons()
            }

            if (result) {
              if (!result.hasDentistApplied) this.appendResult(result)
            } else {
              this.informOfNoRequest()
            }
          }
        })
      },
      populateResults (results) {
        const resultSection = document.querySelector('.appointment-requests-result-section')
        this.clearDOMElementChildren(resultSection)
        results.forEach((result) => {
          const resultDOMElement = this.createResultDOMElement(result)
          resultSection.appendChild(resultDOMElement)
        })
      },
      appendResult (result) {
        const resultDOMElement = this.createResultDOMElement(result)
        const resultSection = document.querySelector('.appointment-requests-result-section')
        resultSection.appendChild(resultDOMElement)
      },
      clearDOMElementChildren (DOMElement) {
        while (DOMElement.hasChildNodes()) {
          DOMElement.firstChild.remove()
        }
      },
      showNextPage () {
        const requestTypeIndex = Number(this.$route.query.rTI || 0)
        this.fetchRequests(null, this.nextOffset, this.$store.state.searchResult['fetchScanRequests'].seed, 1, requestTypeIndex)
      },
      showPreviousPage () {
        const requestTypeIndex = Number(this.$route.query.rTI || 0)
        this.fetchRequests(null, this.previousOffset, this.$store.state.searchResult['fetchScanRequests'].seed, -1, requestTypeIndex)
      },
      getPageIndex (offset = 0) {
        return offset / this.perPage
      },
      askUserToWaitWhileWeSearch () {
        if (document.querySelector('.appointment-requests-wait-overlay')) document.querySelector('.appointment-requests-wait-overlay').remove()
        if (document.querySelector('.no-appointment-request')) document.querySelector('.no-appointment-request').remove()
        let waitOverlayDOMElement = this.createWaitOverlayDOMElement()
        document.querySelector('.appointment-requests-result-section').appendChild(waitOverlayDOMElement)
      },
      informOfNoRequest () {
        if (document.querySelector('.no-appointment-request')) document.querySelector('.no-appointment-request').remove()
        let noRequestDOMElement = this.createNoRequestDOMElement()
        document.querySelector('.appointment-requests-result-section').appendChild(noRequestDOMElement)
      },
      createWaitOverlayDOMElement () {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="appointment-requests-wait-overlay">
            <div class="appointment-requests-wait-message">Please Wait... We're searching the blockchain for Scan requests.</div>
            <div class="spin"></div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      createNoRequestDOMElement () {
        const requestTypeIndex = Number(this.$route.query.rTI || 0)
        const message = [
          'It appears patients have not made any Scan request for now.',
          'It appears you have no direct Scan request from any patient for now.',
          'It appears you haven\'t accepted any Scan request for now.'
        ]
        const DOMELement = new DOMParser().parseFromString(`
          <div class="no-request">
            <div class="no-request-message">
              ${message[requestTypeIndex]}
            </div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      createResultDOMElement (result) {
        const resultDOMElement = new DOMParser().parseFromString(`
          <div class="appointment-requests-result">
            <div class="appointment-requests-appointment-for appointment-requests-appointment-data">Request for: <span>${serviceTypes[1].subtypes[result.serviceId]}</span></div>
            <div class="appointment-requests-appointment-for appointment-requests-appointment-data">Original Quote: <span>$${result.fee}</span></div>
            <div class="appointment-requests-appointment-date appointment-requests-appointment-data">Date: <span>${formatDate(new Date(Number(result.date)))}</span></div>
            <div class="appointment-requests-appointment-time appointment-requests-appointment-data">Time: <span>${result.time}</span></div>
            <div class="appointment-requests-appointment-insurance appointment-requests-appointment-data">Insurance: <span>${result.insurance}</span></div>
            <div class="appointment-requests-appointment-comment appointment-requests-appointment-data">Comment: <span>${result.comment}</span></div>
            <input type="button" value="Apply" class="button apply-to-scan" data-params="${result.SN}">
          </div>
        `, 'text/html').body.firstChild
        return resultDOMElement
      },
      disableNecessaryButtons (evt = null) {
        Array.from(document.querySelectorAll('.button')).forEach(button => this.disableButton(button))
      },
      enableNecessaryButtons (evt = null) {
        Array.from(document.querySelectorAll('.button')).forEach(button => this.enableButton(button))
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
      const requestTypeIndex = Number(this.$route.query.rTI || 0)
      this.setEventListeners()
      this.populateRequestTypes()
      this.getRequests(null, {
        type: 'fetchScanRequests',
        requestParams: this.getSmartContractMethodParams(Number(this.$route.query.o || 0), Number(this.$route.query.l || this.perPage), Number(this.$route.query.sd || Math.random()))[requestTypeIndex],
        managerIndex: 1, // which of the contract managers to use
        contractIndexToUse: requestTypeIndex === 0 ? 3 : 2,
        methodName: this.getSmartContractMethodName()[requestTypeIndex],
        callOnEach: 'getRequestDetail',
        callOnEachParams: requestId => ({requestTypeId: 1, requestId: requestId.toNumber(), dentistId: this.user.coinbase})
      })
    }
  }

  import serviceTypes from '../../../../../../static/json/appointment_types/appointment_types.json'
  import {formatDate} from '../../../../../util/others'
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

  .wait {
    border-top: 3px solid #fbfbfb;
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

  #appointment-requests {
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

  .appointment-requests-list {
    height: 30px;
    width: 300px;
    background: #ffffff;
    outline: none;
    border: 1px solid #d3d3d3;
    color: #7f7f7f;
  }

  .appointment-requests-result-section {
    position: relative;
    min-height: 300px;
    margin-top: 20px;
  }

  .appointment-requests-navigation {
    width: 100%;
    float: right;
  }

  .appointment-requests-fetch-next, .appointment-requests-fetch-previous {
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
    font-size: 14px
  }

  .appointment-requests-fetch-next:hover, .appointment-requests-fetch-previous:hover {
    background: #dae3e8;
  }
</style>

<style>
  .no-request {
    position: relative;
    width: 100%;
    min-height: 300px;
    text-align: center;
    font-size: 16px;
  }

  .no-request-message {
    height: 30px;
    position: relative;
    top: 110px;
  }

  .appointment-requests-wait-overlay {
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

  .appointment-requests-wait-message {
    height: 30px;
    line-height: 30px;
    position: relative;
    font-size: 18px;
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

  .appointment-requests-result {
    width: 95%;
    border-bottom: 1px solid #a7a7a7;
    min-height: 180px;
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .appointment-requests-gravatar-section {
    width: 60px;
    height: 60px;
    float: left;
    display: inline-block;
    margin-top: 10px;
    margin-right: 20px;
    border: 1px solid #c3c3c3;
    border-radius: 6px;
    padding: 3px;
  }

  .appointment-requests-gravatar-section > canvas {
    height: 100%;
    width: 100%;
    border-radius: 6px;
  }

  .appointment-requests-about-section {
    width: 250px;
    height: 150px;
    display: inline-block;
    float: left;
  }

  .appointment-requests-about-section > div {
    display: block;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    text-align: left;
    width: 100%;
  }

  .appointment-requests-profile-link {
    font-size: 10px !important;
    color: #bfced9;
    cursor: pointer;
  }

  .appointment-requests-action-section {
    width: auto;
    height: 150px;
    line-height: 150px;
    display: inline-block;
    float: right;
  }

  .appointment-requests-action-button {
    width: 130px;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    background: #3285b1 !important;
    display: inline-block;
    outline: none;
    border: 0px;
    cursor: pointer;
    font-size: 14px;
    text-align: center;
  }

  .appointment-requests-appointment-data {
    font-weight: bold;
  }

  .appointment-requests-appointment-data span {
    font-weight: normal;
    color: #115588;
  }

  .apply-to-scan, .cancel-apply-button, .apply-button {
    background: #29aae1;
    cursor: pointer;
    width: 80px;
    margin-left: 0px;
    margin-top: 10px;
    height: 20px;
    line-height: 0px;
    outline: none;
    color: #ffffff;
  }

  .appointment-requests-modal {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.56);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 999999
  }

  .appointment-requests-application-form {
    width: 500px;
    height: 500px;
    background: #ffffff;
    position: relative;
    margin: auto;
    left: 128px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .appointment-requests-application-form .appointment-requests-modal-entry {
    display: block;
    margin-bottom: 30px;
    width: 80%;
  }

  .appointment-requests-application-form label {
    display: block;
    margin-bottom: 10px;
  }

  .appointment-requests-application-form input[type='number'], .appointment-requests-application-form textarea {
    display: block;
    width: 100%;
    outline: none;
  }

  .appointment-requests-application-form textarea {
    display: block;
    max-width: 100%;
    min-width: 100%;
    max-height: 200px;
    min-height: 200px;
  }
</style>
