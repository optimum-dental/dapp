import odllUser from '../odll/ODLLUser'
import blockchainManager from '../BlockchainManager'

let search = null

class Search {
  constructor () {
    search = search || this
    return search
  }

  findDentists (state = null, dataObject = {}) {
    return blockchainManager.querySmartContract({
      smartContractMethod: 'findDentists',
      smartContractMethodParams: (coinbase) => [...(Object.values(dataObject)), {from: coinbase}],
      state,
      smartContractResolve: result => result,
      smartContractReject: (error) => ({
        error,
        isValid: true,
        warningMessage: "We've encountered a problem finding dentists on the blockchain. Please do try again in a few minutes."
      })
    })
  }

  getDentistDataFromFind (state = null, dataObject = {}) {
    return new Promise((resolve, reject) => {
      const userObject = {}
      odllUser.getUserIdentityData(state, dataObject.dentistId)
      .then((result) => {
        Object.assign(userObject, result)
        odllUser.getUserContactData(state, dataObject.dentistId)
        .then((result) => {
          Object.assign(userObject, result)
          odllUser.getDentistFeeData(state, dataObject)
          .then((result) => {
            Object.assign(userObject, result)
            odllUser.getDentistRatingData(state, dataObject.dentistId)
            .then((result) => {
              Object.assign(userObject, result)
              resolve(userObject)
            })
            .catch(error => reject(error))
          })
          .catch(error => reject(error))
        })
        .catch(error => reject(error))
      })
      .catch(error => reject(error))
    })
  }

  fetchManagers (state = null, dataObject = {}) {
    return blockchainManager.querySmartContract({
      smartContractMethod: 'fetchManagers',
      smartContractMethodParams: (coinbase) => [...(Object.values(dataObject)), {from: coinbase}],
      state,
      smartContractResolve: result => result,
      smartContractReject: (error) => ({
        error,
        isValid: true,
        warningMessage: "We've encountered a problem fetching managers from the blockchain. Please do try again in a few minutes."
      })
    })
  }

  getManager (state = null, dataObject = {}) {
    return new Promise((resolve, reject) => {
      const userObject = {}
      odllUser.getUserIdentityData(state, dataObject.managerId)
      .then((result) => {
        Object.assign(userObject, result)
        odllUser.getUserContactData(state, dataObject.managerId)
        .then((result) => {
          Object.assign(userObject, result)
          resolve(userObject)
        })
        .catch(error => reject(error))
      })
      .catch(error => reject(error))
    })
  }

  fetchDentists (state = null, dataObject = {}) {
    return blockchainManager.querySmartContract({
      smartContractMethod: 'fetchDentists',
      smartContractMethodParams: (coinbase) => [...(Object.values(dataObject)), {from: coinbase}],
      state,
      smartContractResolve: result => result,
      smartContractReject: (error) => ({
        error,
        isValid: true,
        warningMessage: "We've encountered a problem fetching dentists from the blockchain. Please do try again in a few minutes."
      })
    })
  }

  getDentist (state = null, dataObject = {}) {
    return new Promise((resolve, reject) => {
      const userObject = {}
      odllUser.getUserIdentityData(state, dataObject.dentistId)
      .then((result) => {
        Object.assign(userObject, result)
        odllUser.getUserContactData(state, dataObject.dentistId)
        .then((result) => {
          Object.assign(userObject, result)
          resolve(userObject)
        })
        .catch(error => reject(error))
      })
      .catch(error => reject(error))
    })
  }
}

search = new Search()
export default search
