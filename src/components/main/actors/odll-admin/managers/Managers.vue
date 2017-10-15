<template>
  <div class="wrapper">
    <div id="managers">
      <div class="title">Manage Managers</div>

      <div class="data-entry-section">
        <input type="text" class="entry" placeholder="Enter the Ethereum address of a Manager to add to the platform">
        <input type="button" class="add" value="Add Manager">
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
        return this.$store.state.searchResult.findDentist
      },
      pageNumber () {
        return (Number(this.$route.query.o) / this.perPage) + 1
      },
      nextOffset () {
        return (this.pageNumber - 1) * this.perPage
      },
      perPage () {
        return 5
      },
      action (isBlocked) {
        return isBlocked ? 'Unblock Manager' : 'Block Manager'
      }
    },
    methods: {
      fetchManagers (evt, offset = 0, seed = null) {
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
      getManagers (fetchQuery) {
        this.askUserToWaitWhileWeSearch()
        this.$root.callToFetchManagers({
          fetchQuery,
          callback: (fetchResults = []) => {
            const totalNumber = fetchResults[0]
            const ids = fetchResults[1]
            console.log(totalNumber)
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
