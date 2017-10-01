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
    lastName: '',
    firstName: '',
    middleName: '',
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phoneNumber: '+1',
    socialSecurityNumber: '',
    areaNumber: '',
    groupNumber: '',
    sequenceNumber: '',
    day: '',
    month: '',
    year: '',
    gender: '',
    type: '',
    hasWeb3InjectedBrowser: false,
    hasCoinbase: false,
    isConnectedToODLLNetwork: false,
    isValid: false,
    coinbase: null
  },

  currentView: 'gettingStarted'
}
