<template>
  <div class="wrapper">
    <div id="services">
      <div class="title">Applications</div>

      <div class="result-section">
        <div class="trigger-section">
          <div class="trigger" :class="addClass(1, 'active')" data-open="scan-section" data-type="1" @click="switchView">Scan Applications</div>
          <div class="trigger" :class="addClass(2, 'active')" data-open="treatment-section" data-type="2" @click="switchView">Treatment Applications</div>
        </div>
        <div class="view-section">
          <div class="query-section">
            <div class="entry-item">
              <div class="entry-param">Application Type</div>
              <div class="entry-value">
                <select id="application-type" class="list">
                  <option>Unaccepted Applications</option>
                  <option>Accepted Applications</option>
                </select>
              </div>
            </div>
          </div>

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
  var BigNumber = require('bignumber.js')
  export default {
    computed: {
      user () {
        return this.$root.user
      },
      isThereMore () {
        return this.$store.state.searchResult[Number(this.$route.query.aTI || 1) === 1 ? 'fetchScanApplications' : 'fetchTreatmentApplications'].totalNumberAvailable > (this.pageNumber * this.perPage)
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
        return Number(this.$route.query.aTI) === check || (!this.$route.query.aTI && check === 1) ? value : ''
      },
      switchView (evt) {
        const target = evt.target
        const whichApplication = document.querySelector('#application-type').selectedIndex
        if (!(target.classList.contains('active'))) {
          document.querySelector('.showing').classList.remove('showing')
          document.querySelector('.active').classList.remove('active')
          target.classList.add('active')
          document.querySelector(`.${target.dataset.open}`).classList.add('showing')
          const serviceType = Number(target.dataset.type)
          if (whichApplication === 0) {
            this.fetchApplications(null, this.currentOffset, this.$store.state.searchResult[serviceType === 1 ? 'fetchScanApplications' : 'fetchTreatmentApplications'].seed, 1, serviceType)
          } else if (whichApplication === 1) {
            this.fetchPostApplications(null, this.currentOffset, this.$store.state.searchResult[serviceType === 1 ? 'fetchCases' : 'fetchTreatments'].seed, 1, serviceType)
          }
        }
      },
      setEventListeners () {
        const _this = this
        const servicesPage = document.querySelector('#services')

        servicesPage.addEventListener('change', function (evt) {
          let target = evt.target
          const applicationTypeId = Number(_this.$route.query.aTI || 1)
          switch (target.id) {
            case 'application-type':
              if (Number(evt.target.selectedIndex) === 0) {
                _this.fetchApplications(evt, 0, null, 1, applicationTypeId)
              } else {
                _this.fetchPostApplications(evt, 0, null, 1, applicationTypeId)
              }

              break
          }
        })

        servicesPage.addEventListener('click', function (evt) {
          let target = evt.target
          switch (true) {
            case (target.classList.contains('accept-application')):
              _this.acceptApplication(evt)
              break
            case (target.classList.contains('release-fund')):
              _this.releaseFund(evt)
              break
            case target.classList.contains('only-patient'):
              const dentistId = _this.$store.state.searchResult.fetchCases.data[_this.currentOffset][target.dataset.sn].userObject.coinbase
              if (_this.user.isPatient && dentistId) {
                const rating = target.dataset.rating
                _this.writeDentistRating(evt, dentistId, rating)
              } else {
                console.log(':::You have to be a patient of a doctor before you can rate them.')
              }

              break
          }
        })
      },
      writeDentistRating (evt, dentistId, rating) {
        const applicationTypeId = Number(this.$route.query.aTI || 1)
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
            this.notify(status ? 'Rating Successfully added' : 'Unable to add Rating')
            this.fetchPostApplications(evt, 0, null, 1, applicationTypeId)
          }
        })
      },
      acceptApplication (evt) {
        const sn = evt.target.dataset.params
        const applicationTypeId = Number(this.$route.query.aTI || 1)
        const application = this.$store.state.searchResult[applicationTypeId === 1 ? 'fetchScanApplications' : 'fetchTreatmentApplications'].data[this.currentOffset][sn]

        fetch(EXCHANGE_RATE_API)
        .then(response => response.json())
        .then((JSONResponse) => {
          const USDExchange = JSONResponse[0].price_usd
          const quoteInEther = application.quote / USDExchange
          const quoteInWei = this.$store.state.web3.instance().toWei(quoteInEther, 'ether')

          this.scrollToTop()
          this.disableNecessaryButtons(evt)
          this.beginWait(document.querySelector('.wrapper'))
          this.$root.callToWriteData({
            requestParams: {
              dentistId: application.userId,
              applicationId: application.applicationId,
              quote: quoteInWei
            },
            managerIndex: 2, // which of the contract managers to use
            contractIndexToUse: applicationTypeId === 1 ? 6 : 12,
            value: this.$store.state.web3.instance().toWei(Math.ceil(quoteInEther), 'ether'),
            methodName: applicationTypeId === 1 ? 'acceptScanApplication' : 'acceptTreatmentApplication',
            callback: (status) => {
              this.endWait(document.querySelector('.wrapper'))
              this.enableNecessaryButtons(evt)
              if (status) this.fetchApplications(null, this.currentOffset, this.$store.state.searchResult[applicationTypeId === 1 ? 'fetchScanApplications' : 'fetchTreatmentApplications'].seed, 1, Number(this.$route.query.aTI || 1))
              this.notify(status ? 'Application Successfully accepted' : 'Unable to accept Application')
            }
          })
        })
        .catch((e) => console.error(e))
      },
      fetchApplications (evt, offset = 0, seed = null, direction = 1, applicationTypeId = 1) {
        const fetchQuery = {
          type: applicationTypeId === 1 ? 'fetchScanApplications' : 'fetchTreatmentApplications',
          requestParams: {
            userId: this.user.coinbase,
            offset,
            limit: this.perPage,
            seed: seed || Math.random()
          },
          managerIndex: 1, // which of the contract managers to use
          contractIndexToUse: applicationTypeId === 1 ? 4 : 7,
          methodName: applicationTypeId === 1 ? 'fetchScanApplicationsForPatient' : 'fetchTreatmentApplicationsForPatient',
          callOnEach: 'getApplicationDetail',
          callOnEachParams: applicationId => ({applicationTypeId, applicationId: applicationId.toNumber()})
        }

        this.$router.push({
          path: '/view-applications',
          query: {
            o: fetchQuery.offset,
            l: fetchQuery.limit,
            sd: fetchQuery.seed,
            aTI: applicationTypeId
          }
        })
        const offsetData = this.$store.state.searchResult[fetchQuery.type].data[offset]
        if (direction < 0 && offsetData && offsetData.length > 0) {
          this.populateResults(offsetData, applicationTypeId)
        } else {
          this.getApplications(evt, fetchQuery)
        }
      },
      getApplications (evt, fetchQuery) {
        const applicationTypeId = Number(this.$route.query.aTI || 1)
        const resultSection = document.querySelector(`.${applicationTypeId === 1 ? 'scan-section' : 'treatment-section'}`)
        this.clearDOMElementChildren(resultSection)
        this.askUserToWaitWhileWeSearch(applicationTypeId)
        this.disableNecessaryButtons()
        this.$root.callToFetchDataObjects({
          fetchQuery,
          callback: (result = null, isCompleted = false) => {
            // update result view
            if (isCompleted) {
              if (document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
              this.enableNecessaryButtons()
            }

            if (result) {
              if (result.status === 1) this.appendResult(result, applicationTypeId)
            } else {
              this.informOfNoApplication(applicationTypeId)
            }
          }
        })
      },
      fetchPostApplications (evt, offset = 0, seed = null, direction = 1, applicationTypeId = 1) {
        const fetchQuery = {
          type: applicationTypeId === 1 ? 'fetchCases' : 'fetchTreatments',
          requestParams: {
            userId: this.user.coinbase,
            offset,
            limit: this.perPage,
            seed: seed || Math.random()
          },
          managerIndex: 1, // which of the contract managers to use
          contractIndexToUse: 8,
          methodName: applicationTypeId === 1 ? 'fetchCasesForPatient' : 'fetchTreatmentsForPatient',
          callOnEach: applicationTypeId === 1 ? 'getCaseDetail' : 'getTreatmentDetail',
          callOnEachParams: caseId => ({applicationTypeId, caseId: caseId.toNumber()})
        }

        this.$router.push({
          path: '/view-applications',
          query: {
            o: fetchQuery.offset,
            l: fetchQuery.limit,
            sd: fetchQuery.seed,
            aTI: applicationTypeId
          }
        })
        const offsetData = this.$store.state.searchResult[fetchQuery.type].data[offset]
        if (direction < 0 && offsetData && offsetData.length > 0) {
          this.populatePostApplicationResults(offsetData, applicationTypeId)
        } else {
          this.getPostApplications(evt, fetchQuery)
        }
      },
      getPostApplications (evt, fetchQuery) {
        const applicationTypeId = Number(this.$route.query.aTI || 1)
        const resultSection = document.querySelector(`.${applicationTypeId === 1 ? 'scan-section' : 'treatment-section'}`)
        this.clearDOMElementChildren(resultSection)
        this.askUserToWaitWhileWeSearch(applicationTypeId)
        this.disableNecessaryButtons()
        this.$root.callToFetchDataObjects({
          fetchQuery,
          callback: (result = null, isCompleted = false) => {
            // update result view
            if (isCompleted) {
              if (document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
              this.enableNecessaryButtons()
            }

            if (result) {
              result.applicationObject.SN = result.SN
              result.paymentObject.SN = result.SN
              this.appendPostApplicationResult(result, applicationTypeId)
            } else {
              this.informOfNoPostApplication(applicationTypeId)
            }
          }
        })
      },
      releaseFund (evt) {
        const sn = evt.target.dataset.params
        const applicationTypeId = Number(this.$route.query.aTI || 1)
        const postApplication = this.$store.state.searchResult[applicationTypeId === 1 ? 'fetchCases' : 'fetchTreatments'].data[this.currentOffset][sn]

        const percentage = new BigNumber(applicationTypeId === 1 ? (postApplication.ODLLSPP / 100) : (postApplication.ODLLTPP / 100))
        const totalFee = new BigNumber(postApplication.amount)
        const ODLLFee = totalFee.times(percentage)
        const dentistFee = totalFee.minus(ODLLFee)
        console.log(ODLLFee, dentistFee, totalFee, ODLLFee.plus(dentistFee))
        this.scrollToTop()
        this.disableNecessaryButtons(evt)
        this.beginWait(document.querySelector('.wrapper'))
        this.$root.callToWriteData({
          requestParams: {
            userId: this.user.coinbase,
            dentistId: postApplication.userObject.coinbase,
            paymentId: postApplication.paymentId,
            ODLLFee,
            dentistFee,
            totalFee
          },
          managerIndex: 2, // which of the contract managers to use
          contractIndexToUse: 16,
          methodName: applicationTypeId === 1 ? 'releaseFundForScan' : 'releaseFundForTreatment',
          callback: (status) => {
            this.endWait(document.querySelector('.wrapper'))
            this.enableNecessaryButtons(evt)
            if (status) this.fetchPostApplications(null, this.currentOffset, this.$store.state.searchResult[applicationTypeId === 1 ? 'fetchScanApplications' : 'fetchTreatmentApplications'].seed, 1, Number(this.$route.query.aTI || 1))
            this.notify(status ? 'Fund Successfully released' : 'Unable to release Fund')
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
          resultDOMElement.querySelector('.gravatar-section').appendChild(result.userObject.avatarCanvas)
        })
      },
      populatePostApplicationResults (results, resultType = 1) {
        if (typeof resultType === 'object' && resultType.toNumber) resultType = resultType.toNumber()
        const resultSection = document.querySelector(`.${resultType === 1 ? 'scan-section' : 'treatment-section'}`)
        this.clearDOMElementChildren(resultSection)
        results.forEach((result) => {
          const resultDOMElement = this.createPostApplicationResultDOMElement(result)
          resultSection.appendChild(resultDOMElement)
          resultDOMElement.querySelector('.gravatar-section').appendChild(result.userObject.avatarCanvas)
        })
      },
      appendResult (result, resultType = 1) {
        if (typeof resultType === 'object' && resultType.toNumber) resultType = resultType.toNumber()
        const resultDOMElement = this.createResultDOMElement(result)
        const resultSection = document.querySelector(`.${Number(resultType) === 1 ? 'scan-section' : 'treatment-section'}`)
        resultSection.appendChild(resultDOMElement)
        if (resultDOMElement.querySelector('.gravatar-section')) resultDOMElement.querySelector('.gravatar-section').appendChild(result.userObject.avatarCanvas)
      },
      appendPostApplicationResult (result, resultType = 1) {
        if (typeof resultType === 'object' && resultType.toNumber) resultType = resultType.toNumber()
        const resultDOMElement = this.createPostApplicationResultDOMElement(result)
        const resultSection = document.querySelector(`.${Number(resultType) === 1 ? 'scan-section' : 'treatment-section'}`)
        resultSection.appendChild(resultDOMElement)
        if (resultDOMElement.querySelector('.gravatar-section')) resultDOMElement.querySelector('.gravatar-section').appendChild(result.userObject.avatarCanvas)
      },
      clearDOMElementChildren (DOMElement) {
        while (DOMElement.hasChildNodes()) {
          DOMElement.firstChild.remove()
        }
      },
      showNextPage () {
        const applicationTypeId = Number(this.$route.query.aTI || 1)
        this.fetchApplications(null, this.nextOffset, this.$store.state.searchResult[applicationTypeId === 1 ? 'fetchScanApplications' : 'fetchTreatmentApplications'].seed, 1, applicationTypeId)
      },
      showPreviousPage () {
        const applicationTypeId = Number(this.$route.query.aTI || 1)
        this.fetchApplications(null, this.previousOffset, this.$store.state.searchResult[applicationTypeId === 1 ? 'fetchScanApplications' : 'fetchTreatmentApplications'].seed, -1, applicationTypeId)
      },
      getPageIndex (offset = 0) {
        return offset / this.perPage
      },
      askUserToWaitWhileWeSearch (applicationTypeId = 1) {
        if (document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
        if (document.querySelector('.no-service')) document.querySelector('.no-service').remove()
        let waitOverlayDOMElement = this.createWaitOverlayDOMElement(applicationTypeId)
        document.querySelector('.result-section').appendChild(waitOverlayDOMElement)
      },
      informOfNoApplication (applicationTypeId = 1) {
        if (document.querySelector('.no-service')) document.querySelector('.no-service').remove()
        let noServiceDOMElement = this.createNoApplicationDOMElement(applicationTypeId)
        if (document.querySelector('.result-section')) document.querySelector('.result-section').appendChild(noServiceDOMElement)
      },
      informOfNoPostApplication (applicationTypeId = 1) {
        if (document.querySelector('.no-service')) document.querySelector('.no-service').remove()
        let noServiceDOMElement = this.createNoPostApplicationDOMElement(applicationTypeId)
        if (document.querySelector('.result-section')) document.querySelector('.result-section').appendChild(noServiceDOMElement)
      },
      createWaitOverlayDOMElement (applicationTypeId = 1) {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="wait-overlay">
            <div class="wait-message">Please Wait... We're searching the blockchain for your ${applicationTypeId === 1 ? 'Scan' : 'Treatment'} applications.</div>
            <div class="spin"></div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      createNoApplicationDOMElement (applicationTypeId = 1) {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="no-service">
            <div class="no-service-message">
              It appears you have no ${applicationTypeId === 1 ? 'Scan' : 'Treatment'} application on the blockchain.
            </div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      createNoPostApplicationDOMElement (applicationTypeId = 1) {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="no-service">
            <div class="no-service-message">
              It appears you have no ${applicationTypeId === 1 ? 'Case' : 'Treatment'} on the blockchain.
            </div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      createResultDOMElement (result) {
        const userObject = result.userObject
        const resultDOMElement = new DOMParser().parseFromString(`
          <div class="applications-result">
            <div class="gravatar-section"></div>
            <div class="application-about-section">
              <div class="service-name">Application for: <span>${result.serviceName}</span></div>
              <div class="name">Dentist: <span>${userObject.name || 'Name: Not Supplied'}</span></div>
              <div class="company-name">Company: <span>${userObject.companyName || 'Not Supplied'}</span></div>
              <div class="address">Address: <span>${userObject.address || 'Not Supplied'}</span></div>
              <div class="quote">Quote: <span>$${result.quote}</span></div>
              <div class="comment">Comment: <span>${result.comment}</span></div>
              <input type="button" value="Accept" class="button accept-application" data-params="${result.SN}">
            </div>
          </div>
        `, 'text/html').body.firstChild
        return resultDOMElement
      },
      createPostApplicationResultDOMElement (result) {
        const userObject = result.userObject
        const resultDOMElement = new DOMParser().parseFromString(`
          <div class="applications-result">
            <div class="gravatar-section"></div>
            <div class="application-about-section">
              <div class="service-name">Application for: <span>${result.serviceName}</span></div>
              <div class="name">Dentist: <span>${userObject.name || 'Name: Not Supplied'}</span></div>
              <div class="company-name">Company: <span>${userObject.companyName || 'Not Supplied'}</span></div>
              <div class="address">Address: <span>${userObject.address || 'Not Supplied'}</span></div>
              <div class="quote">Amount: <span>$${result.quote}</span></div>
              <div class="status">Status: <span>${result.paymentObject.status === 3 ? 'Paid Dentist In Full' : 'Paid into Escrow'}</span></div>
              ${this.createAverageRatingDOMElement(userObject.averageRating, result.SN).outerHTML}
              ${result.paymentObject.status === 2 ? '<input type="button" value="Release Fund" class="button release-fund" data-params="' + result.SN + '">' : ''}
            </div>
          </div>
        `, 'text/html').body.firstChild
        return resultDOMElement
      },
      createAverageRatingDOMElement (averageRating, SN) {
        const ratingsArray = []
        for (let i = 0; i < 5; i++) {
          ratingsArray.push(`
            <div data-rating="${i + 1}" data-sn="${SN}" class="rating ${i < averageRating ? 'filled' : ''} ${this.user.isPatient ? 'only-patient' : ''}"></div>
          `)
        }

        return new DOMParser().parseFromString(`
          <div class="average-rating">${ratingsArray.join(' ')}</div>
        `, 'text/html').body.firstChild
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
      const applicationTypeId = Number(this.$route.query.aTI || 1)
      this.setEventListeners()
      this.getApplications(null, {
        type: applicationTypeId === 1 ? 'fetchScanApplications' : 'fetchTreatmentApplications',
        requestParams: {
          userId: this.user.coinbase,
          offset: Number(this.$route.query.o || 0),
          limit: Number(this.$route.query.l || this.perPage),
          seed: Number(this.$route.query.sd || Math.random())
        },
        managerIndex: 1, // which of the contract managers to use
        contractIndexToUse: applicationTypeId === 1 ? 4 : 7,
        methodName: applicationTypeId === 1 ? 'fetchScanApplicationsForPatient' : 'fetchTreatmentApplicationsForPatient',
        callOnEach: 'getApplicationDetail',
        callOnEachParams: applicationId => ({applicationTypeId, applicationId: applicationId.toNumber()})
      })
    }
  }

  import $ from 'jquery'
  import {EXCHANGE_RATE_API} from '../../../../../util/constants'
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
    border: 1px solid #f18787 !important;
  }

  .submit {
    position: relative;
    top: -35px;
    width: 100%;
    height: 30px;
    text-align: right;
  }

  .button {
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
    top: 100px;
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

  .applications-result {
    width: 95%;
    border-bottom: 1px solid #a7a7a7;
    min-height: 180px;
    padding: 10px 0px;
    display: block;
    float: left;
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

  .application-about-section {
    width: 80%;
    display: inline-block;
    float: left;
  }

  .application-about-section > div {
    display: block;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    text-align: left;
    width: 100%;
    font-weight: bold;
  }

  .application-about-section > div span {
    font-weight: normal;
  }

  .application-about-section > .comment {
    height: auto;
  }

  .profile-link {
    font-size: 10px !important;
    color: #bfced9;
    cursor: pointer;
  }

  .service-name {
    width: 50%;
    height: 40px;
    font-size: 20px;
    line-height: 40px;
  }

  .service-name span {
    color: #115588;
  }

  .quote {
    width: 50%;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
  }

  .average-rating {
    width: 100% !important;
    margin: 20px 0px;
  }

  .average-rating > div {
    background: url(/static/images/star_line.png) no-repeat;
    background-size: contain;
    height: 20px;
    width: 20px;
    display: inline-block;
    float: left;
  }

  .average-rating > div.only-patient {
    cursor: pointer;
  }

  .average-rating:hover > div.only-patient {
    background: url(/static/images/star.png) no-repeat;
    background-size: contain;
  }

  .average-rating > div.only-patient:hover {
    background: url(/static/images/star.png) no-repeat;
    background-size: contain;
  }

  .average-rating > div.only-patient:hover ~ div.only-patient {
    background: url(/static/images/star_line.png) no-repeat;
    background-size: contain;
  }

  .average-rating > .filled {
    background: url(/static/images/star.png) no-repeat;
    background-size: contain;
  }

  .button {
    padding: 0px 2px;
    text-align: center;
    outline: 0px;
    border: 0px;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    width: 100px;
    background: #29aae1;
    color: #ffffff;
    /*margin-left: 10px;*/
    display: inline-block;
  }

  .accept-application {
    background: #3285b1 !important;
    text-decoration: none;
    margin: 20px 10px 0px 0px !important;
  }
</style>
