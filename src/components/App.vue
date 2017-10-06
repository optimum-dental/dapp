<template>
  <div id="app">
    <router-view
      :current-view="currentView"
      :user="user"
      :avatar-canvas="avatarCanvas"
      :is-d-app-ready="isDAppReady"
      :countries="countries"
      :states="states"
      @updateAvatarCanvas="updateAvatarCanvas"
      @callToWriteUser="callToWriteUser"
    >
    </router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    beforeCreate: function () {
      this.$store.dispatch(ACTION_TYPES.REGISTER_WEB3_INSTANCE)
      .then((result) => {
        let state = result.state
        monitorWeb3(state)
        ODLLUser.getUserDataFromTheBlockchain(state)
        .then((userObject) => {
          this.$store.dispatch(ACTION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS, {
            userObject,
            callback: () => {
              this.$store.dispatch(ACTION_TYPES.UPDATE_DAPP_READINESS, true)
            }
          })
        })
        .catch((result) => {
          console.error(result)
          if (!(this.isDAppReady)) {
            this.$store.dispatch(ACTION_TYPES.UPDATE_DAPP_READINESS, true)
          }
        })
      })
      .catch((result) => {
        let state = result.state
        monitorWeb3(state)
        if (!(this.isDAppReady)) {
          this.$store.dispatch(ACTION_TYPES.UPDATE_DAPP_READINESS, true)
        }

        console.error(result)
      })
    },
    computed: {
      ...mapState({
        hasInjectedWeb3: state => state.web3.isInjected,
        hasWeb3InjectedBrowser: state => state.user.hasWeb3InjectedBrowser,
        isConnectedToODLLNetwork: state => state.user.isConnectedToODLLNetwork,
        hasCoinbase: state => state.user.hasCoinbase,
        networkId: state => state.web3.networkId,
        coinbase: state => state.web3.coinbase,
        currentRoute: state => state.currentRoute,
        user: state => state.user,
        isDAppReady: state => state.isDAppReady
      }),
      currentView () {
        if (this.user) {
          switch (this.$route.path) {
            case '/home':
              return Home
            case '/get-started':
              return GetStarted
            case '/find-dentist':
              return FindDentist
            case '/view-services':
              return ViewServices
            case '/request-appointment':
              return RequestAppointment
            case '/view-scan-applications':
              return ViewScanApplications
            case '/view-treatment-applications':
              return ViewTreatmentApplications
            default:
              return Home
          }
        } // else if (this.user.isDentist) {
        //   switch (this.$route.path) {
        //     case '/home':
        //       return DentistHome
        //     case '/view-appointments':
        //       return ViewAppointments
        //     case '/upload-scan-result':
        //       return UploadScanResults
        //     case '/view-scan-results':
        //       return ViewScanResults
        //     case '/view-accepted-applications':
        //       return ViewAcceptedApplications
        //     default:
        //       return DentistHome
        //   }
        // } else if (this.user.isODLLAdmin) {
        //   switch (this.$route.path) {
        //     case '/home':
        //       return ODLLAdminHome
        //     case '/add-odll-manager':
        //       return AddODLLManager
        //     case '/view-odll-manager':
        //       return ViewODLLManager
        //     case '/view-dentists':
        //       return ViewDentists
        //     case '/manage-odll-finances':
        //       return ManageODLLFinances
        //     default:
        //       return ODLLAdminHome
        //   }
        // } else if (this.user.isODLLManager) {
        //   switch (this.$route.path) {
        //     case '/home':
        //       return ODLLManagerHome
        //     case '/add-dentist':
        //       return AddDentist
        //     case '/view-dentists':
        //       return ViewDentists
        //     default:
        //       return ODLLManagerHome
        //   }
        // }
      }
    },
    created: function () {
      this[ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO](this.$route)
    },
    data: function () {
      return {
        countries,
        states
      }
    },
    methods: {
      ...mapActions([
        ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO,
        ACTION_TYPES.UPDATE_USER_AVATAR_CANVAS
      ]),
      updateAvatarCanvas (payload = null) {
        this[ACTION_TYPES.UPDATE_USER_AVATAR_CANVAS](payload)
      },
      callToWriteUser (payload = null) {
        ODLLUser.writeUser(this.$store.state, payload)
        .then((userData) => {
          if (payload.callback) payload.callback(userData)
        })
        .catch((err) => {
          if (payload.callback) payload.callback()
          console.error(err)
        })
      }
    },
    props: [ 'avatarCanvas' ],
    watch: {
      hasInjectedWeb3 (web3ConnectionValue) {
        console.log('hasInjectedWeb3: ', web3ConnectionValue)
      },
      networkId (networkId) {
        console.log('networkId: ', networkId)
      },
      coinbase (coinbase) {
        console.log('coinbase: ', coinbase)
      },
      isDAppReady (isDAppReady) {
        console.log('isDAppReady: ', isDAppReady)
      },
      $route (newRoute) {
        this[ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO](newRoute)
      }
    }
  }

  import { mapState, mapActions } from 'vuex'
  import { ACTION_TYPES } from '../util/constants'
  import ODLLUser from '../blockchain/ODLLUser'
  import monitorWeb3 from '../util/web3/monitorWeb3'
  import countries from '../../static/json/countries/countries.json'
  import states from '../../static/json/states/states.json'

  import Home from './home/Home.vue'
  import GetStarted from './main/view-sections/patient/get-started'
  import FindDentist from './main/view-sections/patient/find-dentist'
  import ViewServices from './main/view-sections/patient/view-services'
  import RequestAppointment from './main/view-sections/patient/request-appointment'
  import ViewScanApplications from './main/view-sections/patient/view-scan-applications'
  import ViewTreatmentApplications from './main/view-sections/patient/view-treatment-applications'

</script>

<style>
  html {
    background: #eef0ef;
  }

  body {
    margin: 0;
    width: 100%;
  }

  * {
    box-sizing: border-box;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    /*max-width: 960px;*/
    min-width: 1020px;
    margin: auto;
  }
</style>
