import contract from 'truffle-contract'
import ODLLDB from '../../build/contracts/ODLLDB.json'
import ODLLUserContract from '../../build/contracts/ODLLUser.json'
import { APPROVED_BLOCKCHAIN_NETWORK_ID, NETWORKS } from '../util/constants'
import soliditySha3 from 'solidity-sha3'

let odllUser = null
class ODLLUser {
  constructor () {
    odllUser = odllUser || this
    odllUser.ODLLDBContractAddress = '0xb53d4efe7b5816c038fa116a61625fca9c6af5aa'
    return odllUser
  }

  // setBlockchain (state = null) {
  //   this.state = state
  //   this.web3Instance = state.web3.instance()
  //   this.provider = this.web3Instance.currentProvider
  // }

  getCurrentContractAddressForKey (dbContractKey, state, coinbase) {
    return new Promise((resolve, reject) => {
      const ODLLDBContract = contract(ODLLDB)
      ODLLDBContract.setProvider(state.web3.instance().currentProvider)
      ODLLDBContract.at(odllUser.ODLLDBContractAddress)
      .then((contractInstance) => {
        contractInstance.getAddressValue(soliditySha3(dbContractKey), { from: coinbase })
        .then((result) => {
          // Successful Fetch
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
      })
    })
  }

  writeUser (state = null, data = {}) {
    console.log(data)
    return new Promise((resolve, reject) => {
      odllUser.accessBlockChainWith({
        state,
        contractToUse: ODLLUserContract,
        dbContractKey: 'contract/odll-user',
        method: (contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance.writeUser(odllUser.ODLLDBContractAddress, ...(Object.values(data)), { from: coinbase })
            .then((result) => {
              // Successful Sign-up
              console.log(1111122222, result)
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
      odllUser.accessBlockChainWith({
        state,
        contractToUse: ODLLUserContract,
        dbContractKey: 'contract/odll-user',
        method: (contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance.getUserData(odllUser.ODLLDBContractAddress, coinbase, { from: coinbase })
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

  accessBlockChainWith (dataObject = {}) {
    const state = dataObject.state
    return new Promise((resolve, reject) => {
      if (!state || !state.web3 || !(state.web3.instance)) {
        reject({ error: true, warningMessage: 'Web3 is not initialised. Use a Web3 injector' })
      } else {
        if (state.web3.networkId === APPROVED_BLOCKCHAIN_NETWORK_ID) {
          const contractToUse = dataObject.contractToUse
          let odllContract = contract(contractToUse)
          odllContract.setProvider(state.web3.instance().currentProvider)
          state.web3.instance().eth.getCoinbase((error, coinbase) => {
            if (error) {
              reject({ error, warningMessage: 'Unable to get coinbase for this operation' })
            } else {
              odllUser.getCurrentContractAddressForKey(dataObject.dbContractKey, state, coinbase)
              .then((addressToUse) => {
                odllUser.runBlockchainPromise(resolve, reject, { odllContract, addressToUse, method: dataObject.method, coinbase })
              })
              .catch((error) => {
                reject({ error, isValid: true, warningMessage: "We're unable to get the current contract address from the blockchain. Please do try again in a few minutes." })
              })
            }
          })
        } else {
          reject({ error: true, warningMessage: `You're not on the same blockchain as us. Please connect to the ${NETWORKS[APPROVED_BLOCKCHAIN_NETWORK_ID]}` })
        }
      }
    })
  }

  runBlockchainPromise (resolve, reject, dataObject) {
    dataObject.odllContract.at(dataObject.addressToUse)
    .then((contractInstance) => {
      dataObject.method(contractInstance, dataObject.coinbase)
      .then((result) => {
        resolve(result)
      })
      .catch((error) => {
        reject(error)
      })
    })
    .catch((error) => {
      reject({ error, isValid: true, warningMessage: "We couldn't find Oral Data Link Smart Contracts on your detected network. This is because the Smart Contracts aren't deployed there. Contact Support to know why this is the case." })
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
        name: bytes32s && bytes32s.length > 0 ? state.web3.instance().toUtf8(bytes32s[0].toString()) : '',
        email: bytes32s && bytes32s.length > 0 ? state.web3.instance().toUtf8(bytes32s[1].toString()) : '',
        gravatar: bytes32s && bytes32s.length > 0 ? state.web3.instance().toUtf8(bytes32s[2].toString()) : '',
        street: bytes32s && bytes32s.length > 0 ? state.web3.instance().toUtf8(bytes32s[3].toString()) : '',
        city: bytes32s && bytes32s.length > 0 ? state.web3.instance().toUtf8(bytes32s[4].toString()) : '',
        state: uints && uints.length > 0 ? uints[0].toString() : '',
        zipCode: uints && uints.length > 0 ? uints[1].toString() : '',
        country: uints && uints.length > 0 ? uints[2].toString() : '',
        phoneNumber: bytes32s && bytes32s.length > 0 ? state.web3.instance().toUtf8(bytes32s[5].toString()) : '',
        socialSecurityNumber: bytes32s && bytes32s.length > 0 ? state.web3.instance().toUtf8(bytes32s[6].toString()) : '',
        birthday: bytes32s && bytes32s.length > 0 ? state.web3.instance().toUtf8(bytes32s[7].toString()) : '',
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

export default new ODLLUser()
