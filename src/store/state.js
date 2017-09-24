export default {
  currentRoute: null,
  web3: {
    address: null,
    coinbase: null,
    error: null,
    instance: null,
    isInjected: false,
    networkId: null
  },
  user: {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    type: '',
    hasWeb3InjectedBrowser: false,
    hasCoinbase: false,
    isConnectedToODLLNetwork: false,
    isValid: false
  },

  currentView: 'gettingStarted'
}
