import UserReader from '../../../build/contracts/UserReader.json'
import ServiceReader from '../../../build/contracts/ServiceReader.json'
import ScanRequestReader from '../../../build/contracts/ScanRequestReader.json'
import ScanRequestReader2 from '../../../build/contracts/ScanRequestReader2.json'
import ScanApplicationReader from '../../../build/contracts/ScanApplicationReader.json'
import TreatmentRequestReader from '../../../build/contracts/TreatmentRequestReader.json'
import TreatmentRequestReader2 from '../../../build/contracts/TreatmentRequestReader2.json'
import TreatmentApplicationReader from '../../../build/contracts/TreatmentApplicationReader.json'
import userManager from '../user/Manager'
import serviceManager from '../service/Manager'
import blockchainManager from '../BlockchainManager'

let searchManager = null

class Manager {
  constructor () {
    searchManager = searchManager || this
    return searchManager
  }

  getContractToUse () {
    return [
      UserReader,
      ServiceReader,
      ScanRequestReader,
      ScanRequestReader2,
      ScanApplicationReader,
      TreatmentRequestReader,
      TreatmentRequestReader2,
      TreatmentApplicationReader
    ]
  }

  fetchDataObjects (state = null, dataObject = {}) {
    const fetchType = dataObject.methodName || dataObject.type
    const willUnshiftCoinbase = dataObject.willUnshiftCoinbase
    const contractToUse = dataObject.contractIndexToUse ? searchManager.getContractToUse()[dataObject.contractIndexToUse] : null

    delete dataObject.methodName
    delete dataObject.willUnshiftCoinbase
    delete dataObject.contractIndexToUse

    const callOnEach = dataObject.callOnEach
    const callOnEachParams = dataObject.callOnEachParams
    delete dataObject.type
    if (callOnEach) delete dataObject.callOnEach
    if (callOnEachParams) delete dataObject.callOnEachParams
    let queryParams = Object.values(dataObject)
    return blockchainManager.querySmartContract({
      contractToUse: contractToUse || UserReader,
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
      dataObject.userId = dataObject.officialId
      delete dataObject.officialId
      userManager.getUserDataFromTheBlockchain(state, dataObject)
      .then((result) => {
        result.coinbase = dataObject.userId
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

  getRequestDetail (state = null, requestObject = {}) {
    return new Promise((resolve, reject) => {
      const dataObject = {}
      serviceManager.getRequestDetail(state, requestObject)
      .then((result) => {
        Object.assign(dataObject, result)
        serviceManager.getServiceFee(state, dataObject)
        .then((result) => {
          Object.assign(dataObject, result)
          resolve(dataObject)
        })
      })
      .catch(error => reject(error))
    })
  }

  getApplicationDetail (state = null, applicationObject = {}) {
    return new Promise((resolve, reject) => {
      const dataObject = {}
      serviceManager.getApplicationDetail(state, applicationObject)
      .then((result) => {
        Object.assign(dataObject, result)
        userManager.getUserDataFromTheBlockchain(state, dataObject)
        .then((result) => {
          result.coinbase = dataObject.userId
          dataObject.userObject = result
          resolve(dataObject)
        })
        .catch(error => reject(error))
      })
      .catch(error => reject(error))
    })
  }
}

searchManager = new Manager()
export default searchManager
