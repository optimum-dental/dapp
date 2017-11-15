import UserReaderContract from '../../../build/contracts/UserReader.json'
import ServiceReaderContract from '../../../build/contracts/ServiceReader.json'
import userManager from '../user/Manager'
import serviceManager from '../service/Manager'
import blockchainManager from '../BlockchainManager'

let searchManager = null

class Manager {
  constructor () {
    searchManager = searchManager || this
    return searchManager
  }

  availableContracts () {
    return [
      UserReaderContract,
      ServiceReaderContract
    ]
  }

  fetchDataObjects (state = null, dataObject = {}) {
    let fetchType = dataObject.type
    let willUnshiftCoinbase = false
    let contractToUse = null
    if (dataObject.specials) {
      fetchType = dataObject.specials.callSmartContractWith || fetchType
      willUnshiftCoinbase = dataObject.specials.willUnshiftCoinbase
      contractToUse = searchManager.availableContracts()[dataObject.specials.contractIndexToUse]
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
          const resultData = results[1].map((resultId) => {
            return new Promise(function (resolve, reject) {
              resolve(searchManager[callOnEach](state, callOnEachParams(resultId)))
            })
          })
          return {totalNumberAvailable: results[0], results: resultData}
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
      userManager.getUserData(state, dataObject.officialId, dataObject)
      .then((result) => {
        result.coinbase = dataObject.officialId
        Object.assign(userObject, result)
        resolve(userObject)
      })
      .catch(error => reject(error))
    })
  }

  getServiceDetail (state = null, requestObject = {}) {
    return new Promise((resolve, reject) => {
      const dataObject = {}
      serviceManager.getServiceDetail(state, requestObject)
      .then((result) => {
        Object.assign(dataObject, result)
        resolve(dataObject)
      })
      .catch(error => reject(error))
    })
  }
}

searchManager = new Manager()
export default searchManager
