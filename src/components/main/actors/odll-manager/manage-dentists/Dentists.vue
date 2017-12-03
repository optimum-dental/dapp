<template>
  <div class="wrapper">
    <div id="dentists">
      <div class="title">Manage Dentists</div>

      <div class="dentists-data-entry-section">
        <input type="text" id="dentists-entry" class="dentists-entry" placeholder="Enter the Ethereum address of a Dentist you want to add to the platform" @input="clearError">
        <input type="button" class="dentists-add-official dentists-button" value="Add Dentist" @click="addDentist">
      </div>

      <div class="dentists-result-section"></div>

      <div class="dentists-navigation">
        <div v-if="isThereMore" @click="showNextPage" class="dentists-fetch-next">Next ></div>
        <div v-if="pageNumber !== 1" @click="showPreviousPage" class="dentists-fetch-previous">< Previous</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      isThereMore () {
        return this.$store.state.searchResult.fetchDentists.totalNumberAvailable > (this.pageNumber * this.perPage)
      },
      fetchResults () {
        return this.$store.state.searchResult.fetchDentists.data[this.getPageIndex(this.currentOffset)] || []
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
      action (isBlocked) {
        return isBlocked ? 'Unblock Dentist' : 'Block Dentist'
      },
      setEventListeners () {
        const _this = this
        document.querySelector('#dentists').addEventListener('click', function (evt) {
          const target = evt.target
          switch (true) {
            case (target.classList.contains('dentists-block')):
              let userId = _this.$store.state.searchResult.fetchDentists.data[_this.currentOffset][Number(target.dataset.sn)].coinbase
              _this.manageBlocking(userId, 'blockUser')
              target.classList.remove('dentists-block')
              target.classList.add('dentists-unblock')
              break

            case (target.classList.contains('dentists-unblock')):
              userId = _this.$store.state.searchResult.fetchDentists.data[_this.currentOffset][Number(target.dataset.sn)].coinbase
              _this.manageBlocking(userId, 'unblockUser')
              target.classList.remove('dentists-unblock')
              target.classList.add('dentists-block')
              break

            case (target.classList.contains('dentists-add')):
              userId = _this.$store.state.searchResult.fetchDentists.data[_this.currentOffset][Number(target.dataset.sn)].coinbase
              _this.manageODLLDentist(userId, 'dentists-add')
              target.classList.remove('dentists-add')
              target.classList.add('remove')
              break

            case (target.classList.contains('remove')):
              userId = _this.$store.state.searchResult.fetchDentists.data[_this.currentOffset][Number(target.dataset.sn)].coinbase
              _this.manageODLLDentist(userId, 'remove')
              target.classList.remove('remove')
              target.classList.add('dentists-add')
              break
          }
        })
      },
      fetchDentists (evt, offset = 0, seed = null, direction = 1) {
        const fetchQuery = {
          type: 'fetchDentists',
          requestParams: {
            offset,
            limit: this.perPage,
            seed: seed || Math.random()
          },
          managerIndex: 1, // which of the contract managers to use
          methodName: 'fetchDentists',
          contractIndexToUse: 0,
          callOnEach: 'getOfficial',
          callOnEachParams: officialId => ({officialId})
        }

        this.$router.push({
          path: '/manage-dentists',
          query: {
            o: fetchQuery.requestParams.offset,
            l: fetchQuery.requestParams.limit,
            sd: fetchQuery.requestParams.seed
          }
        })
        const offsetData = this.$store.state.searchResult[fetchQuery.type].data[offset]
        if (direction < 0 && offsetData && offsetData.length > 0) {
          this.populateResults(offsetData)
        } else {
          this.getDentists(evt, fetchQuery)
        }
      },
      clearError (evt) {
        const target = evt.target
        if (target.classList.contains('error')) target.classList.remove('error')
      },
      addDentist (evt) {
        const addressDOMElement = document.getElementById('dentists-entry')
        const addressPattern = /0x[0-9a-fA-F]{40}/
        if (addressDOMElement.value.trim() !== '' && addressPattern.test(addressDOMElement.value.trim())) {
          this.disableNecessaryButtons()
          this.beginWait(document.querySelector('.wrapper'))
          this.$root.callToWriteData({
            requestParams: {
              address: addressDOMElement.value.toLowerCase(),
              userType: 2
            },
            methodName: 'addOfficialToODLL',
            contractIndexToUse: 0,
            managerIndex: 0,
            callback: (status = false) => {
              this.fetchDentists(evt, this.currentOffset, this.$store.state.searchResult['fetchDentists'].seed, 1)
              this.notify(status ? 'Dentist Successfully added' : 'Unable to add Dentist')
            }
          })
        } else {
          addressDOMElement.classList.add('error')
        }
      },
      getDentists (evt, fetchQuery) {
        const resultSection = document.querySelector('.dentists-result-section')
        this.clearDOMElementChildren(resultSection)
        this.askUserToWaitWhileWeSearch()
        this.disableNecessaryButtons()
        this.$root.callToFetchDataObjects({
          fetchQuery,
          callback: (result = null, isCompleted = false) => {
            // update result view
            if (result) {
              this.appendResult(result)
            } else {
              this.informOfNoOfficial()
            }

            if (isCompleted) {
              if (document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()

              this.endWait(document.querySelector('.wrapper'))
              this.enableNecessaryButtons()
            }
          }
        })
      },
      manageBlocking (userId, action) {
        this.scrollToTop()
        this.beginWait(document.querySelector('.wrapper'))
        this.disableNecessaryButtons()
        this.$root.callToWriteData({
          requestParams: {
            address: userId
          },
          methodName: action,
          callback: (status = false) => {
            this.endWait(document.querySelector('.wrapper'))
            this.enableNecessaryButtons()
            this.fetchDentists(null, this.currentOffset, this.$store.state.searchResult.fetchDentists.seed)
            this.notify(status ? `${action} successful for Dentist` : `${action} unsuccessful for Dentist`)
          }
        })
      },
      manageODLLDentist (userId, action) {
        console.log(userId, action)
        this.scrollToTop()
        this.beginWait(document.querySelector('.wrapper'))
        this.disableNecessaryButtons()
        this.$root.callToWriteData({
          requestParams: {
            address: userId,
            ODLLDentistValue: action === 'dentists-add'
          },
          methodName: 'setODLLDentist',
          callback: (status = false) => {
            this.endWait(document.querySelector('.wrapper'))
            this.enableNecessaryButtons()
            this.fetchDentists(null, this.currentOffset, this.$store.state.searchResult.fetchDentists.seed)
            this.notify(status ? `${action} successful for Dentist` : `${action} unsuccessful for Dentist`)
          }
        })
      },
      populateResults (results) {
        const resultSection = document.querySelector('.dentists-result-section')
        this.clearDOMElementChildren(resultSection)
        results.forEach((result) => {
          const resultDOMElement = this.createResultDOMElement(result)
          resultSection.appendChild(resultDOMElement)
          resultDOMElement.querySelector('.dentists-gravatar-section').appendChild(result.avatarCanvas)
        })
      },
      appendResult (result) {
        const resultDOMElement = this.createResultDOMElement(result)
        const resultSection = document.querySelector('.dentists-result-section')
        resultSection.appendChild(resultDOMElement)
        resultDOMElement.querySelector('.dentists-gravatar-section').appendChild(result.avatarCanvas)
      },
      clearDOMElementChildren (DOMElement) {
        while (DOMElement.hasChildNodes()) {
          DOMElement.firstChild.remove()
        }
      },
      showNextPage () {
        this.fetchDentists(null, this.nextOffset, this.$store.state.searchResult.fetchDentists.seed)
      },
      showPreviousPage () {
        this.fetchDentists(null, this.previousOffset, this.$store.state.searchResult.fetchDentists.seed, -1)
      },
      getPageIndex (offset = 0) {
        return offset / this.perPage
      },
      askUserToWaitWhileWeSearch () {
        if (document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
        if (document.querySelector('.dentists-no-official')) document.querySelector('.dentists-no-official').remove()
        let waitOverlayDOMElement = this.createWaitOverlayDOMElement()
        document.querySelector('.dentists-result-section').appendChild(waitOverlayDOMElement)
      },
      informOfNoOfficial () {
        if (document.querySelector('.dentists-no-official')) document.querySelector('.dentists-no-official').remove()
        let noDentistDOMElement = this.createNoOfficialDOMElement()
        document.querySelector('.dentists-result-section').insertBefore(noDentistDOMElement, document.querySelector('.dentists-result'))
      },
      createWaitOverlayDOMElement () {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="wait-overlay">
            <div class="wait-message">Please Wait... We're searching the blockchain for Dentists.</div>
            <div class="spin"></div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      createNoOfficialDOMElement () {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="dentists-no-official">
            <div class="dentists-no-official-message">
              No Dentist found. You can add some with the input tools above.
            </div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      createResultDOMElement (result) {
        const averageRatingDOMElement = this.createAverageRatingDOMElement(result.averageRating)
        const resultDOMElement = new DOMParser().parseFromString(`
          <div class="dentists-result">
            <div class="dentists-gravatar-section"></div>
            <div class="dentists-about-section">
              <div class="dentists-name">${result.name || 'Name: Not Supplied'}</div>
              <div class="dentists-company-name">${result.companyName || 'Company Name: Not Supplied'}</div>
              ${averageRatingDOMElement.outerHTML}
              <div class="dentists-address">${result.address || 'Address: Not Supplied'}</div>
            </div>
            <div class="dentists-action-section">
              <input type="button" value="${Number(result.status) === 2 ? 'Unblock Dentist' : 'Block Dentist'}" class="dentists-action-button ${Number(result.status) === 2 ? 'dentists-unblock' : 'dentists-block'} dentists-button" data-sn="${result.SN}">
              <input type="button" value="${Number(result.isODLLDentist) ? 'Unmake ODLL Dentist' : 'Make ODLL Dentist'}" class="dentists-action-button ${Number(result.isODLLDentist) ? 'remove' : 'dentists-add'} dentists-button" data-sn="${result.SN}">
            </div>
          </div>
        `, 'text/html').body.firstChild
        return resultDOMElement
      },
      createAverageRatingDOMElement (averageRating) {
        const ratingsArray = []
        for (let i = 0; i < 5; i++) {
          ratingsArray.push(`
            <div class="dentists-rating ${i < averageRating ? 'filled' : ''}"></div>
          `)
        }

        return new DOMParser().parseFromString(`
          <div class="dentists-average-rating">${ratingsArray.join(' ')}</div>
        `, 'text/html').body.firstChild
      },
      disableNecessaryButtons (evt = null) {
        Array.from(document.querySelectorAll('.dentists-button')).forEach(button => this.disableButton(button))
      },
      enableNecessaryButtons (evt = null) {
        Array.from(document.querySelectorAll('.dentists-button')).forEach(button => this.enableButton(button))
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
        if (target.classList) target.classList.add('wait')
      },
      endWait (target) {
        if (target.classList) target.classList.remove('wait')
      },
      scrollToTop () {
        $('html, body').animate({scrollTop: '0px'}, 500)
      }
    },
    mounted: function () {
      this.setEventListeners()
      this.getDentists(null, {
        type: 'fetchDentists',
        requestParams: {
          offset: Number(this.$route.query.o || 0),
          limit: Number(this.$route.query.l || this.perPage),
          seed: Number(this.$route.query.sd || Math.random())
        },
        managerIndex: 1, // which of the contract managers to use
        methodName: 'fetchDentists',
        contractIndexToUse: 0,
        callOnEach: 'getOfficial',
        callOnEachParams: officialId => ({officialId})
      })
    }
  }

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

  .dentists-data-entry-section {
    width: 100%;
    height: 70px;
    margin-bottom: 30px;
    background: #ffffff;
    display: flex;
    flex-direction: row;
  }

  .dentists-entry {
    height: 40px;
    line-height: 40px;
    width: 85%;
    display: inline-block;
    font-size: 14px;
    color: #7a7a7a;
    outline: none;
    border: 1px solid #dcdede;
    padding: 0px 10px;
  }

  .dentists-entry.error {
    border: 1px solid #f18787;
  }

  .dentists-entry::placeholder {
    color: #bababa;
  }

  .dentists-add, .dentists-add-official {
    padding: 2px;
    text-align: center;
    float: right;
    outline: 0px;
    border: 0px;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    width: 15%;
    min-width: 100px;
    background: #29aae1;
    color: #ffffff;
    font-size: 14px;
  }

  .dentists-result-section {
    position: relative;
    min-height: 300px;
    margin-top: 20px;
  }

  .dentists-navigation {
    width: 100%;
    float: right;
  }

  .dentists-fetch-next, .dentists-fetch-previous {
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

  .dentists-fetch-next:hover, .dentists-fetch-previous:hover {
    background: #dae3e8;
  }
</style>

<style>
  .dentists-no-official {
    position: relative;
    width: 100%;
    min-height: 300px;
    text-align: center;
    font-size: 16px;
  }

  .dentists-no-official-message {
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

  .dentists-result {
    width: 95%;
    border-bottom: 1px solid #a7a7a7;
    min-height: 180px;
    padding: 10px 0px;
  }

  .dentists-gravatar-section {
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

  .dentists-gravatar-section > canvas {
    height: 100%;
    width: 100%;
    border-radius: 6px;
  }

  .dentists-about-section {
    width: 250px;
    height: 150px;
    display: inline-block;
    float: left;
  }

  .dentists-about-section > div {
    display: block;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    text-align: left;
    width: 100%;
  }

  .dentists-average-rating {
    width: 100% !important;
  }

  .dentists-average-rating > div {
    background: url(/static/images/star_line.png) no-repeat;
    background-size: contain;
    height: 20px;
    width: 20px;
    display: inline-block;
    float: left;
    margin: 7px 5px;
  }

  .dentists-average-rating > .filled {
    background: url(/static/images/star.png) no-repeat;
    background-size: contain;
  }

  .dentists-profile-link {
    font-size: 10px !important;
    color: #bfced9;
    cursor: pointer;
  }

  .dentists-action-section {
    width: 260px;
    height: 150px;
    line-height: 150px;
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    float: right;
  }

  .dentists-action-button {
    width: 125px;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
    background: #3285b1 !important;
    display: inline-block;
    outline: none;
    border: 0px;
    cursor: pointer;
    font-size: 12px;
    text-align: center;
  }
</style>
