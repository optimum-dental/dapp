import contract from 'truffle-contract'
import ODLLDB from '../../build/contracts/ODLLDB.json'
import ODLLUserContract from '../../build/contracts/ODLLUser.json'
import { APPROVED_BLOCKCHAIN_NETWORK_ID, NETWORKS } from '../util/constants'
import soliditySha3 from 'solidity-sha3'

let odllUser = null
class ODLLUser {
  constructor () {
    odllUser = odllUser || this
    return odllUser
  }

  // setBlockchain (state = null) {
  //   this.state = state
  //   this.web3Instance = state.web3.instance()
  //   this.provider = this.web3Instance.currentProvider
  // }

  writeUser (state = null, data = {}) {
    return new Promise((resolve, reject) => {
      this.accessODLLUserContractWith({
        state,
        method: (contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance.writeUser(...(Object.values(data)), { from: coinbase })
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

  getCurrentContractAddressForKey (dbContractKey, state, coinbase) {
    return new Promise((resolve, reject) => {
      const ODLLDBContract = contract(ODLLDB)
      ODLLDBContract.setProvider(state.web3.instance().currentProvider)
      ODLLDBContract.at('0x490bb4610192cb7d5fc343b4cdc102fbcdbc0a94')
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

  getUserDataFromTheBlockchain (state = null) {
    return new Promise((resolve, reject) => {
      this.accessBlockChainWith({
        state,
        contractToUse: ODLLUserContract,
        // addressToUse: '0x012f13282a20801f58dddd71cb949f8fb36ab9c0',
        dbContractKey: 'contract/odll-user',
        method: (contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance.getUserData({ from: coinbase })
            .then((result) => {
              console.log(result)
              // Successful Fetch
              resolve(this.getUTF8DataOfResults(state, result))
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
              this.getCurrentContractAddressForKey(dataObject.dbContractKey, state, coinbase)
              .then((addressToUse) => {
                this.runBlockchainPromise(resolve, reject, { odllContract, addressToUse, method: dataObject.method, coinbase })
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

  getUTF8DataOfResults (state, results) {
    const utf8Results = state && state.web3 && state.web3.instance ? results.map(result => state.web3.instance().toUtf8(result)) : []
    console.log(utf8Results)
    // const type = utf8Results[0]
    // switch (type) {
    //   case '1':
    //     return this.generalUserObject
    //   case '2':
    //     return Object.assign(this.generalUserObject(utf8Results), {
    //       isODLLDentist: utf8Results[13],
    //       isAvailable: utf8Results[14]
    //     })
    //   case '3':
    //     return this.generalUserObject
    //   case '4':
    //     return this.generalUserObject
    //   default:
    //     return {
    //       type: '0'
    //     }
    // }
  }

  generalUserObject (utf8Results) {
    return {
      type: utf8Results[0],
      name: utf8Results[1],
      email: utf8Results[2],
      gravatar: utf8Results[3],
      street: utf8Results[4],
      city: utf8Results[5],
      state: utf8Results[6],
      zipCode: utf8Results[7],
      country: utf8Results[8],
      phoneNumber: utf8Results[9],
      socialSecurityNumber: utf8Results[10],
      birthday: utf8Results[11],
      gender: utf8Results[12]
    }
  }
}

export default new ODLLUser()
