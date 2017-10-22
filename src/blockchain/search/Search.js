import odllUser from '../odll/ODLLUser'
import blockchainManager from '../BlockchainManager'

let search = null

class Search {
  constructor () {
    search = search || this
    return search
  }

  getDentistDataFromFind (state = null, dataObject = {}) {
    return new Promise((resolve, reject) => {
      const userObject = {}
      odllUser.getUserIdentityData(state, dataObject.dentistId)
      .then((result) => {
        result.coinbase = dataObject.dentistId
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

  fetchDataObjects (state = null, dataObject = {}) {
    const fetchType = dataObject.type
    const callOnEach = dataObject.callOnEach
    const callOnEachParams = dataObject.callOnEachParams
    delete dataObject.type
    delete dataObject.callOnEach
    delete dataObject.callOnEachParams
    return blockchainManager.querySmartContract({
      smartContractMethod: fetchType,
      smartContractMethodParams: (coinbase) => [...(Object.values(dataObject)), {from: coinbase}],
      state,
      smartContractResolve: (resultIds) => {
        const results = resultIds[1].map((resultId) => {
          return new Promise(function (resolve, reject) {
            resolve(search[callOnEach](state, callOnEachParams(resultId)))
          })
        })

        return {totalNumberAvailable: resultIds[0], results}
      },
      smartContractReject: (error) => ({
        error,
        isValid: true,
        warningMessage: `We've encountered a problem fetching the data objects [${fetchType}] from the blockchain. Please do try again in a few minutes.`
      })
    })
  }

  getManager (state = null, dataObject = {}) {
    return new Promise((resolve, reject) => {
      const userObject = {}
      odllUser.getUserIdentityData(state, dataObject.managerId)
      .then((result) => {
        result.coinbase = dataObject.managerId
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

  getDentist (state = null, dataObject = {}) {
    return new Promise((resolve, reject) => {
      const userObject = {}
      odllUser.getUserIdentityData(state, dataObject.dentistId)
      .then((result) => {
        result.coinbase = dataObject.dentistId
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

  getService (state = null, dataObject = {}) {
    return new Promise((resolve, reject) => {
      const serviceObject = {}
      odllUser.getServiceData(state, dataObject.serviceTypeId, dataObject.serviceSubtypeId)
      .then((result) => {
        Object.assign(serviceObject, result)
        resolve(serviceObject)
      })
      .catch(error => reject(error))
    })
  }
}

search = new Search()
export default search
