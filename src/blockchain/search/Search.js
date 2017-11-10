import UserReaderContract from '../../../build/contracts/UserReader.json'
import userManager from '../odll/UserManager'
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
      userManager.getUserIdentityData(state, dataObject.dentistId)
      .then((result) => {
        result.coinbase = dataObject.dentistId
        Object.assign(userObject, result)
        userManager.getUserContactData(state, dataObject.dentistId)
        .then((result) => {
          Object.assign(userObject, result)
          userManager.getDentistFeeData(state, dataObject)
          .then((result) => {
            Object.assign(userObject, result)
            userManager.getDentistRatingData(state, dataObject.dentistId)
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
    let fetchType = dataObject.type
    let willUnshiftCoinbase = false
    let contractToUse = null
    if (dataObject.specials) {
      fetchType = dataObject.specials.callSmartContractWith || fetchType
      willUnshiftCoinbase = dataObject.specials.willUnshiftCoinbase
      contractToUse = dataObject.specials.contractToUse
      delete dataObject.specials
    }

    const callOnEach = dataObject.callOnEach
    const callOnEachParams = dataObject.callOnEachParams
    delete dataObject.type
    if (callOnEach) delete dataObject.callOnEach
    if (callOnEachParams) delete dataObject.callOnEachParams
    let queryParams = Object.values(dataObject)
    return blockchainManager.querySmartContract({
      contractToUse: contractToUse || UserReaderContract,
      smartContractMethod: fetchType,
      smartContractMethodParams: (coinbase) => {
        if (willUnshiftCoinbase) queryParams.unshift(coinbase)
        return [...(queryParams), {from: coinbase}]
      },
      state,
      smartContractResolve: (results) => {
        if (callOnEach && callOnEachParams) {
          const resultIds = results[1].map((resultId) => {
            return new Promise(function (resolve, reject) {
              resolve(search[callOnEach](state, callOnEachParams(resultId)))
            })
          })
          return {totalNumberAvailable: results[0], results: resultIds}
        } else {
          return {totalNumberAvailable: results[0], results}
        }
      },
      smartContractReject: (error) => ({
        error,
        isValid: true,
        warningMessage: `We've encountered a problem fetching the data objects [${fetchType}] from the blockchain. Please do try again in a few minutes.`
      })
    })
  }

  getOfficial (state = null, dataObject = {}) {
    return new Promise((resolve, reject) => {
      const userObject = {}
      userManager.getUserData(state, dataObject.officialId)
      .then((result) => {
        result.coinbase = dataObject.officialId
        Object.assign(userObject, result)
        resolve(userObject)
      })
      .catch(error => reject(error))
    })
  }
}

search = new Search()
export default search
