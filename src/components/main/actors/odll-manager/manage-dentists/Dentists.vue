<template>
  <div class="wrapper">
    <div id="dentists">
      <div class="title">Manage Dentists</div>

      <div class="data-entry-section">
        <input type="text" id="entry" class="entry" placeholder="Enter the Ethereum address of a Dentist you want to add to the platform">
        <input type="button" class="add" value="Add Dentist" @click="addDentist">
      </div>

      <div class="result-section"></div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
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
      action (isBlocked) {
        return isBlocked ? 'Unblock Dentist' : 'Block Dentist'
      },
      fetchDentists (evt, offset = 0, seed = null) {
        const fetchQuery = {
          type: 'fetchDentists',
          offset,
          limit: this.perPage,
          seed: seed || Math.random()
        }

        this.$router.push({
          path: '/dentists',
          query: {
            o: fetchQuery.offset,
            l: fetchQuery.limit,
            sd: fetchQuery.seed
          }
        })

        this.getDentists(evt, fetchQuery)
      },
      addDentist (evt) {
        const target = evt.target
        this.disableButton(target)
        const addressDOMElement = document.getElementById('entry')
        const addressPattern = /0x[0-9a-fA-F]{40}/
        if (addressDOMElement.value.trim() !== '' && addressPattern.test(addressDOMElement.value.trim())) {
          this.$root.callToAddOfficialToODLL({
            userObject: {
              address: addressDOMElement.value.toLowerCase(),
              userType: 2
            },
            callback: (status = false) => {
              this.enableButton(target)
              this.notify(status ? 'Dentist Successfully added' : 'Unable to add Dentist')
            }
          })
        } else {
          this.enableButton(target)
          addressDOMElement.classList.add('error')
        }
      },
      getDentists (evt, fetchQuery) {
        this.askUserToWaitWhileWeSearch()
        this.$root.callToFetchDentists({
          fetchQuery,
          callback: (fetchResults = []) => {
            const totalNumberAvailable = fetchResults[0]
            const ids = fetchResults[1]
            this.$root.callToSaveTotalNumberAvailable(fetchQuery.type, totalNumberAvailable)
            // update result view
            if (ids && ids.length > 0) {
              ids.forEach((result) => {
                this.$root.callToGetDentist({
                  type: fetchQuery.type,
                  offset: fetchQuery.offset,
                  dentistId: result,
                  callback: (searchResult, numberRetrieved) => {
                    console.log(1111, numberRetrieved, ids.length, ids)
                    if (numberRetrieved === ids.length && document.querySelector('.wait-overlay')) {
                      document.querySelector('.wait-overlay').remove()
                      this.populateResults(fetchQuery.type, fetchQuery.offset)
                      if (evt) this.enableButton(evt.target)
                    }
                  }
                })
              })
            } else {
              if (document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
              this.informOfNoOfficial()
              if (evt) this.enableButton(evt.target)
            }
          }
        })
      },
      populateResults (resultType, offset) {
        const results = this.$store.state.searchResult[resultType].data[offset]
        const resultSection = document.querySelector('.result-section')
        this.clearDOMElementChildren(resultSection)
        results.forEach((result) => {
          const resultDOMElement = this.createResultDOMElement(result)
          resultSection.appendChild(resultDOMElement)
          resultDOMElement.querySelector('.gravatar-section').appendChild(result.avatarCanvas)
        })
      },
      clearDOMElementChildren (DOMElement) {
        while (DOMElement.hasChildNodes()) {
          DOMElement.firstChild.remove()
        }
      },
      showNextPage (evt) {
        this.fetchDentists(evt, this.nextOffset, this.$store.state.searchResult.fetchDentists.seed)
      },
      showPreviousPage (evt) {
        const offsetData = this.$store.state.searchResult.fetchDentists.data[this.getPageIndex(this.previousOffset)]
        if (offsetData && offsetData.length > 0) {
          this.populateResults('fetchDentists', this.previousOffset)
        } else {
          this.fetchDentists(evt, this.previousOffset, this.$store.state.searchResult.fetchDentists.seed)
        }
      },
      getPageIndex (offset = 0) {
        return offset / this.perPage
      },
      askUserToWaitWhileWeSearch () {
        if (document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
        if (document.querySelector('.no-official')) document.querySelector('.no-official').remove()
        let waitOverlayDOMElement = this.createWaitOverlayDOMElement()
        document.querySelector('.result-section').insertBefore(waitOverlayDOMElement, document.querySelector('.result'))
      },
      informOfNoOfficial () {
        if (document.querySelector('.no-official')) document.querySelector('.no-official').remove()
        let noDentistDOMElement = this.createNoOfficialDOMElement()
        document.querySelector('.result-section').insertBefore(noDentistDOMElement, document.querySelector('.result'))
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
          <div class="no-official">
            <div class="no-official-message">
              No Dentist found. You can add some with the input tools above.
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
              ${averageRatingDOMElement.outerHTML}
              <div class="address">${result.address || 'Address: Not Supplied'}</div>
            </div>
            <div class="action-section">
              <input type="button" value="${result.isBlocked ? 'Unblock Dentist' : 'Block Dentist'}" class="action-button">
            </div>
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
      }
    },
    mounted: function () {
      this.getDentists(null, {
        type: 'fetchDentists',
        offset: this.$route.query.o ? Number(this.$route.query.o) : 0,
        limit: this.$route.query.l ? Number(this.$route.query.l) : this.perPage,
        seed: this.$route.query.sd ? Math.ceil(Number(this.$route.query.sd) * 113) : Math.ceil(Math.random() * 113)
      })
    }
  }
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
    width: 80%;
    display: inline-block;
    font-size: 14px;
    color: #9a9a9a;
    outline: none;
    border: 1px solid #dcdede;
  }

  .add {
    margin-right: 7px;
    padding: 2px;
    text-align: center;
    float: right;
    outline: 0px;
    border: 0px;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    width: 100px;
    background: #29aae1;
    color: #ffffff;
    font-size: 14px;
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
    margin-top: 10px;
    margin-right: 20px;
    border: 1px solid #c3c3c3;
    border-radius: 6px;
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
  
  .average-rating > div {
    background: #ffffff;
    border: 1px solid #f9af3b;
  }

  .average-rating > .filled {
    background: #f9af3b;
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
    width: 200px;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    background: #3285b1;
    display: inline-block;
    outline: none;
    border: 0px;
    cursor: pointer;
    font-size: 14px;
    text-align: center;
  }
</style>
