import ODLLUserContract from '../../../build/contracts/ODLLUser.json'
import blockchainManager from '../BlockchainManager'

let odllUser = null

class ODLLUser {
  constructor () {
    odllUser = odllUser || this
    return odllUser
  }

  writeUser (state = null, data = {}) {
    return new Promise((resolve, reject) => {
      blockchainManager.accessBlockChainWith({
        state,
        contractToUse: ODLLUserContract,
        dbContractKey: 'contract/odll-user',
        method: (contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance.writeUser(...(Object.values(data.userObject)), { from: coinbase })
            .then((result) => {
              // Successful Sign-up
              resolve(data)
            })
            .catch((e) => {
              reject(e)
            })
          })
        }
      })
      .then((result) => {
        resolve(result)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

  getUserDataFromTheBlockchain (state = null) {
    return new Promise((resolve, reject) => {
      blockchainManager.accessBlockChainWith({
        state,
        contractToUse: ODLLUserContract,
        dbContractKey: 'contract/odll-user',
        method: (contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance.getUserData({ from: coinbase })
            .then((result) => {
              // Successful Fetch
              resolve(odllUser.getUserObject(state, result))
            })
            .catch((error) => {
              reject({ error, isValid: true, warningMessage: "We've encountered a problem fetching your information from the blockchain. Please do try again in a few minutes." })
            })
          })
        }
      })
      .then((result) => {
        resolve(result)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

  getUserObject (state, results) {
    const arrayResult = state && state.web3 && state.web3.instance && results && results.length > 0 ? results : []
    const userObject = odllUser.getGeneralUserObject(state, arrayResult)
    const bools = arrayResult[0]

    const type = userObject.type
    switch (type) {
      case '1':
        return userObject
      case '2':
        return Object.assign(userObject, {
          isODLLDentist: bools && bools.length > 0 ? bools[0] : false,
          isAvailable: bools && bools.length > 0 ? bools[1] : false
        })
      case '3':
        return userObject
      case '4':
        return userObject
      default:
        return userObject
    }
  }

  getGeneralUserObject (state, arrayResult) {
    const bytes32s = arrayResult[1]
    const uints = arrayResult[2]
    const uint8s = arrayResult[3]
    let userObject
    if (arrayResult.length > 0) {
      userObject = {
        type: uint8s && uint8s.length > 0 ? uint8s[0].toString() : '0',
        name: bytes32s && bytes32s.length > 0 ? bytes32s[0] : '',
        email: bytes32s && bytes32s.length > 0 ? bytes32s[1] : '',
        gravatar: bytes32s && bytes32s.length > 0 ? bytes32s[2] : '',
        street: bytes32s && bytes32s.length > 0 ? bytes32s[3] : '',
        city: bytes32s && bytes32s.length > 0 ? bytes32s[4] : '',
        state: uints && uints.length > 0 ? uints[0].toString() : 0,
        zipCode: uints && uints.length > 0 ? uints[1].toString() : '',
        country: uints && uints.length > 0 ? uints[2].toString() : 0,
        phoneNumber: bytes32s && bytes32s.length > 0 ? bytes32s[5] : '',
        socialSecurityNumber: bytes32s && bytes32s.length > 0 ? bytes32s[6] : '',
        birthday: bytes32s && bytes32s.length > 0 ? bytes32s[7] : '',
        gender: uint8s && uint8s.length > 0 ? uint8s[1].toString() : '0'
      }
    } else {
      userObject = odllUser.defaultUserObject()
    }

    return userObject
  }

  defaultUserObject () {
    return {
      type: '0',
      lastName: '',
      firstName: '',
      middleName: '',
      name: '',
      email: '',
      gravatar: '',
      street: '',
      city: '',
      state: 0,
      zipCode: '',
      country: 0,
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
    }
  }
}

odllUser = new ODLLUser()
export default odllUser
