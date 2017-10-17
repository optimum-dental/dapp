<template>
  <div class="wrapper">
    <div id="managers">
      <div class="title">Manage Managers</div>

      <div class="data-entry-section">
        <input type="text" id="entry" class="entry" placeholder="Enter the Ethereum address of a Manager to add to the platform" @input="clearError">
        <input type="button" class="add" value="Add Manager" @click="addManager">
      </div>

      <div class="result-section">
        <div class="result" v-for="manager in fetchResults">
          <div class="gravatar-section"></div>
          <div class="about-section">
            <div class="name">{{ manager.name }}</div>
            <div class="company-name">{{ manager.companyName }}</div>
            <div class="address">{{ manager.address }}</div>
            <div class="profile-link">See more</div>
          </div>
          <div class="action">{{ action(manager.isBlocked) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    computed: {
      fetchResults () {
        return this.$store.state.searchResult.fetchManagers
      },
      pageNumber () {
        return (Number(this.$route.query.o || 0) / this.perPage) + 1
      },
      nextOffset () {
        return this.pageNumber * this.perPage
      },
      perPage () {
        return 5
      }
    },
    methods: {
      action (isBlocked) {
        return isBlocked ? 'Unblock Manager' : 'Block Manager'
      },
      fetchManagers (offset = 0, seed = undefined) {
        const fetchQuery = {
          type: 'fetchManagers',
          offset,
          limit: this.perPage,
          seed: seed || Math.random()
        }

        this.$router.push({
          path: '/managers',
          query: {
            o: fetchQuery.offset,
            l: fetchQuery.limit,
            sd: fetchQuery.seed
          }
        })

        this.getManagers(fetchQuery)
      },
      clearError (evt) {
        const target = evt.target
        if (target.classList.contains('error')) target.classList.remove('error')
      },
      addManager (evt) {
        const target = evt.target
        this.disableButton(target)
        const addressDOMElement = document.getElementById('entry')
        const addressPattern = /0x[0-9a-fA-F]{40}/
        if (addressDOMElement.value.trim() !== '' && addressPattern.test(addressDOMElement.value.trim())) {
          this.$root.callToAddOfficialToODLL({
            userObject: {
              address: addressDOMElement.value,
              userType: 3
            },
            callback: (status = false) => {
              this.enableButton(target)
              this.notify(status ? 'Manager Successfully added' : 'Unable to add Manager')
            }
          })
        } else {
          this.enableButton(target)
          addressDOMElement.classList.add('error')
        }
      },
      getManagers (fetchQuery) {
        this.askUserToWaitWhileWeSearch()
        this.$root.callToFetchManagers({
          fetchQuery,
          callback: (fetchResults = []) => {
            const totalNumber = fetchResults[0]
            if (totalNumber > (fetchResults.length + fetchQuery.offset)) this.showNextPageButton()
            const ids = fetchResults[1]
            // update result view
            if (ids && ids.length > 0) {
              ids.forEach((result) => {
                this.$root.callToGetManager({
                  type: fetchQuery.type,
                  managerId: result,
                  callback: (searchResult, numberRetrieved) => {
                    console.log(searchResult, numberRetrieved)
                    if (numberRetrieved === ids.length && document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
                  }
                })
              })
            } else {
              if (document.querySelector('.wait-overlay')) document.querySelector('.wait-overlay').remove()
              this.informOfNoOfficial()
            }
          }
        })
      },
      showNextPageButton () {
        const nextPageButton = this.createNextPageButton()
        nextPageButton.addEventListener('click', () => {
          this.fetchManagers(this.nextOffset, this.$store.state.searchSeed.fetchManagers)
        })
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
      this.getManagers({
        type: 'fetchManagers',
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

  #managers {
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
    padding: 0px 5px;
  }

  .entry.error {
    border: 1px solid #f18787;
  }

  .result {
    width: 100%;
    border-bottom: 1px solid #dcdede;
    min-height: 300px;
  }

  .gravatar-section {
    width: 120px;
    height: 100%;
  }

  .about-section {
    width: 350px;
    height: 100%;
  }

  .action {
    width: 120px;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    background: #29aae3;
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
</style>
