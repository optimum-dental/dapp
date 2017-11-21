<template>
  <div class="wrapper">
    <div id="managers">
      <div class="title">Manage Managers</div>

      <div class="data-entry-section">
        <input type="text" id="entry" class="entry" placeholder="Enter the Ethereum address of a Manager you want to add to the platform" @input="clearError">
        <input type="button" class="add button" value="Add Manager" @click="addManager">
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
      isThereMore () {
        return this.$store.state.searchResult.fetchManagers.totalNumberAvailable > (this.pageNumber * this.perPage)
      },
      fetchResults () {
        return this.$store.state.searchResult.fetchManagers.data[this.getPageIndex(this.currentOffset)] || []
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
        return isBlocked ? 'Unblock Manager' : 'Block Manager'
      },
      setEventListeners () {
        const _this = this
        document.querySelector('#managers').addEventListener('click', function (evt) {
          const target = evt.target
          switch (true) {
            case (target.classList.contains('block')):
              let userId = _this.$store.state.searchResult.fetchManagers.data[_this.currentOffset][Number(target.dataset.sn)].coinbase
              _this.manageBlocking(userId, 'blockUser')
              target.classList.remove('block')
              target.classList.add('unblock')
              break

            case (target.classList.contains('unblock')):
              userId = _this.$store.state.searchResult.fetchManagers.data[_this.currentOffset][Number(target.dataset.sn)].coinbase
              _this.manageBlocking(userId, 'unblockUser')
              target.classList.remove('unblock')
              target.classList.add('block')
              break
          }
        })
      },
      fetchManagers (evt = null, offset = 0, seed = undefined, direction = 1) {
        const fetchQuery = {
          type: 'fetchManagers',
          requestParams: {
            offset,
            limit: this.perPage,
            seed: seed || Math.random()
          },
          managerIndex: 1, // which of the contract managers to use
          methodName: 'fetchManagers',
          contractIndexToUse: 0,
          callOnEach: 'getOfficial',
          callOnEachParams: officialId => ({officialId})
        }

        this.$router.push({
          path: '/managers',
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
          this.getManagers(evt, fetchQuery)
        }
      },
      clearError (evt) {
        const target = evt.target
        if (target.classList.contains('error')) target.classList.remove('error')
      },
      addManager (evt) {
        const addressDOMElement = document.getElementById('entry')
        const addressPattern = /0x[0-9a-fA-F]{40}/
        if (addressDOMElement.value.trim() !== '' && addressPattern.test(addressDOMElement.value.trim())) {
          this.disableNecessaryButtons()
          this.scrollToTop()
          this.beginWait(document.querySelector('.wrapper'))
          this.$root.callToWriteData({
            requestParams: {
              address: addressDOMElement.value.toLowerCase(),
              userType: 3
            },
            methodName: 'addOfficialToODLL',
            contractIndexToUse: 0,
            managerIndex: 0,
            callback: (status = false) => {
              this.fetchManagers(evt, this.currentOffset, this.$store.state.searchResult['fetchManagers'].seed, 1)
              this.notify(status ? 'Manager Successfully added' : 'Unable to add Manager')
            }
          })
        } else {
          addressDOMElement.classList.add('error')
        }
      },
      getManagers (evt, fetchQuery) {
        const resultSection = document.querySelector('.result-section')
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
            this.fetchManagers(null, this.currentOffset, this.$store.state.searchResult.fetchManagers.seed)
            this.notify(status ? `${action} successful for Manager` : `${action} unsuccessful for Manager`)
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
        this.fetchManagers(null, this.nextOffset, this.$store.state.searchResult.fetchManagers.seed)
      },
      showPreviousPage () {
        this.fetchManagers(null, this.previousOffset, this.$store.state.searchResult.fetchManagers.seed, -1)
      },
      getPageIndex (offset = 0) {
        return offset / this.perPage
      },
      askUserToWaitWhileWeSearch () {
        if (document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
        if (document.querySelector('.no-official')) document.querySelector('.no-official').remove()
        let waitOverlayDOMElement = this.createWaitOverlayDOMElement()
        document.querySelector('.result-section').insertBefore(waitOverlayDOMElement, document.querySelector('.managers-result'))
      },
      informOfNoOfficial () {
        if (document.querySelector('.no-official')) document.querySelector('.no-official').remove()
        let noDentistDOMElement = this.createNoOfficialDOMElement()
        document.querySelector('.result-section').insertBefore(noDentistDOMElement, document.querySelector('.managers-result'))
      },
      createWaitOverlayDOMElement () {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="wait-overlay">
            <div class="wait-message">Please Wait... We're searching the blockchain for Managers.</div>
            <div class="spin"></div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      createNoOfficialDOMElement () {
        const DOMELement = new DOMParser().parseFromString(`
          <div class="no-official">
            <div class="no-official-message">
              No Manager found. You can add some with the input tools above.
            </div>
          </div>
        `, 'text/html')

        return DOMELement.body.firstChild
      },
      createResultDOMElement (result) {
        const resultDOMElement = new DOMParser().parseFromString(`
          <div class="managers-result">
            <div class="gravatar-section"></div>
            <div class="about-section">
              <div class="name">${result.name || 'Name: Not Supplied'}</div>
              <div class="email">${result.email || 'Email: Not Supplied'}</div>
              <div class="address">${result.address || 'Address: Not Supplied'}</div>
            </div>
            <div class="action-section">
              <input type="button" value="${Number(result.status) === 2 ? 'Unblock Manager' : 'Block Manager'}" class="action-button ${Number(result.status) === 2 ? 'unblock' : 'block'} button" data-sn="${result.SN}">
            </div>
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
      this.getManagers(null, {
        type: 'fetchManagers',
        requestParams: {
          offset: Number(this.$route.query.o || 0),
          limit: Number(this.$route.query.l || this.perPage),
          seed: Number(this.$route.query.sd || Math.random())
        },
        managerIndex: 1, // which of the contract managers to use
        methodName: 'fetchManagers',
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

  #managers {
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

  .data-entry-section {
    width: 100%;
    height: 70px;
    margin-bottom: 30px;
    background: #ffffff;
    display: flex;
    flex-direction: row;
  }

  .entry {
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

  .entry::placeholder {
    color: #bababa;
  }

  .entry.error {
    border: 1px solid #f18787;
  }

  .add {
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

  .result-section {
    position: relative;
    min-height: 300px;
    margin-top: 20px;
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
    font-size: 14px
  }

  .fetch-next:hover, .fetch-previous:hover {
    background: #dae3e8;
  }
</style>

<style>
  .no-official {
    position: relative;
    width: 100%;
    min-height: 300px;
    text-align: center;
    font-size: 16px;
  }

  .no-official-message {
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

  .managers-result {
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
    margin-top: 10px;
    margin-right: 20px;
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
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    text-align: left;
    width: 100%;
  }

  .profile-link {
    font-size: 10px !important;
    color: #bfced9;
    cursor: pointer;
  }

  .action-section {
    width: auto;
    height: 150px;
    line-height: 150px;
    display: inline-block;
    float: right;
  }

  .action-button {
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
</style>
