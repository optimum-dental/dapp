export default {
  currentRoute: null,
  currentView: null,
  defaultRoute: {
    '0': '/get-started',
    '1': 'find-dentists',
    '2': 'manage-services',
    '3': 'manage-dentists',
    '4': 'managers'
  },
  web3: {
    address: '',
    coinbase: '',
    error: null,
    instance: null,
    isInjected: false,
    networkId: ''
  },
  user: {
    type: '0',
    lastName: '',
    firstName: '',
    middleName: '',
    name: '',
    email: '',
    gravatar: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: '',
    socialSecurityNumber: '',
    areaNumber: '',
    groupNumber: '',
    sequenceNumber: '',
    day: '',
    month: '',
    year: '',
    birthday: '',
    gender: '',
    dentistsIds: [],
    hasWeb3InjectedBrowser: false,
    hasCoinbase: false,
    isConnectedToODLLNetwork: false,
    coinbase: '',
    isValid: false,
    isPatient: false,
    canBeNewPatient: false,
    patientable: false,
    isDentist: false,
    isODLLAdmin: false,
    isODLLManager: false,
    warningMessage: ''
  },
  isDAppReady: false,
  isValidUserBut: '0',
  originalIsValidUserBut: '0',
  searchResult: {
    findDentists: {
      data: {},
      seed: null,
      totalNumberAvailable: 0
    },
    fetchDentists: {
      data: {},
      seed: null,
      totalNumberAvailable: 0
    },
    fetchManagers: {
      data: {},
      seed: null,
      totalNumberAvailable: 0
    },
    fetchScanServices: {
      data: {},
      seed: null,
      totalNumberAvailable: 0
    },
    fetchTreatmentServices: {
      data: {},
      seed: null,
      totalNumberAvailable: 0
    },
    fetchScanApplications: {
      data: {},
      seed: null,
      totalNumberAvailable: 0
    },
    fetchTreatmentApplications: {
      data: {},
      seed: null,
      totalNumberAvailable: 0
    },
    fetchScanRequests: {
      data: {},
      seed: null,
      totalNumberAvailable: 0
    },
    fetchTreatmentRequests: {
      data: {},
      seed: null,
      totalNumberAvailable: 0
    },
    fetchCases: {
      data: {},
      seed: null,
      totalNumberAvailable: 0
    },
    fetchTreatments: {
      data: {},
      seed: null,
      totalNumberAvailable: 0
    }
  }
}
