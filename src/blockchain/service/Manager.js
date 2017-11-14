import DB from '../../../build/contracts/DB.json'
import ServiceWriter from '../../../build/contracts/ServiceWriter.json'
// import userManager from '../user/Manager'
import {getObjectFromResponse, getSlicedAddressString, getSoliditySha3ForId, getLeftPaddedNumber} from '../utilities'
import blockchainManager from '../BlockchainManager'
import serviceTypes from '../../../static/json/appointment_types/appointment_types.json'

let serviceManager = null

class Manager {
  constructor () {
    serviceManager = serviceManager || this
    return serviceManager
  }

  writeData (state = null, data = {}) {
    const blockchainData = Object.assign({}, data)
    const blockchainMethodName = blockchainData.methodName
    delete blockchainData.methodName
    return blockchainManager.querySmartContract({
      smartContractMethod: blockchainMethodName,
      contractToUse: ServiceWriter,
      smartContractMethodParams: (coinbase) => [...(Object.values(blockchainData)), {from: coinbase, gas: 4444444, gasPrice: 666000000000}],
      state,
      smartContractResolve: result => data,
      smartContractReject: error => error
    })
  }

  getServiceDetail (state = null, dataObject = {}) {
    const {serviceTypeId, serviceId} = dataObject
    return blockchainManager.querySmartContract({
      contractToUse: DB,
      smartContractMethod: 'getEntityList',
      smartContractMethodParams: (coinbase) => [serviceManager.recordFields(state, coinbase, serviceTypeId, serviceId), serviceManager.recordFieldTypes(), {from: coinbase}],
      state,
      smartContractResolve: result => {
        const dataObject = getObjectFromResponse(state, result, 1, serviceManager.keys(), serviceManager.recordFieldTypes())[0]
        Object.assign(dataObject, {
          serviceName: serviceTypes[serviceTypeId].subtypes[serviceId],
          serviceTypeId,
          serviceId
        })
        return dataObject
      },
      smartContractReject: (error) => ({
        error,
        isValid: true,
        warningMessage: "We've encountered a problem fetching your service information from the blockchain. Please do try again in a few minutes."
      })
    })
  }

  keys () {
    return [
      'serviceFee'
    ]
  }

  recordFields (state, userId, serviceTypeId, serviceId) {
    userId = getSlicedAddressString(state, userId)
    serviceId = getSlicedAddressString(state, getLeftPaddedNumber(state, serviceId, 1))

    return [
      getSoliditySha3ForId(state, `dentist/${serviceTypeId === 1 ? 'scan' : 'treatment'}-service/fee`, userId, serviceId)
    ]
  }

  recordFieldTypes () {
    // types: 1 => boolean, 2 => uint8, 3 => uint, 4 => address, 5 => bytes32, 7 => string
    return [3]
  }
}

serviceManager = new Manager()
export default serviceManager
