import DB from '../../../build/contracts/DB.json'
import ServiceWriter from '../../../build/contracts/ServiceWriter.json'
import ServiceReader from '../../../build/contracts/ServiceReader.json'
import ScanRequestWriter from '../../../build/contracts/ScanRequestWriter.json'
import ScanRequestReader from '../../../build/contracts/ScanRequestReader.json'
import ScanRequestReader2 from '../../../build/contracts/ScanRequestReader2.json'
import ScanApplicationWriter from '../../../build/contracts/ScanApplicationWriter.json'
import ScanApplicationWriter2 from '../../../build/contracts/ScanApplicationWriter2.json'
import ScanApplicationReader from '../../../build/contracts/ScanApplicationReader.json'
import TreatmentRequestWriter from '../../../build/contracts/TreatmentRequestWriter.json'
import TreatmentRequestReader from '../../../build/contracts/TreatmentRequestReader.json'
import TreatmentRequestReader2 from '../../../build/contracts/TreatmentRequestReader2.json'
import TreatmentApplicationWriter from '../../../build/contracts/TreatmentApplicationWriter.json'
import TreatmentApplicationWriter2 from '../../../build/contracts/TreatmentApplicationWriter2.json'
import TreatmentApplicationReader from '../../../build/contracts/TreatmentApplicationReader.json'
import PostApplicationReader from '../../../build/contracts/PostApplicationReader.json'
import PostApplicationReader2 from '../../../build/contracts/PostApplicationReader2.json'
import Escrow from '../../../build/contracts/Escrow.json'
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

  getContractToUse () {
    return [
      ServiceWriter,
      ServiceReader,
      ScanRequestWriter,
      ScanRequestReader,
      ScanRequestReader2,
      ScanApplicationWriter,
      ScanApplicationWriter2,
      ScanApplicationReader,
      TreatmentRequestWriter,
      TreatmentRequestReader,
      TreatmentRequestReader2,
      TreatmentApplicationWriter,
      TreatmentApplicationWriter2,
      TreatmentApplicationReader,
      PostApplicationReader,
      PostApplicationReader2,
      Escrow
    ]
  }

  writeData (state = null, data = {}, value = null) {
    const blockchainData = Object.assign({}, data)
    const blockchainMethodName = blockchainData.methodName
    const contractToUse = blockchainData.contractIndexToUse ? serviceManager.getContractToUse()[blockchainData.contractIndexToUse] : ServiceWriter
    delete blockchainData.managerId
    delete blockchainData.methodName
    delete blockchainData.contractIndexToUse
    delete blockchainData.value
    const blockchainParams = (coinbase) => {
      return value ? {from: coinbase, value} : {from: coinbase}
    }
    return blockchainManager.querySmartContract({
      smartContractMethod: blockchainMethodName,
      contractToUse,
      smartContractMethodParams: (coinbase) => [...(Object.values(blockchainData)), blockchainParams(coinbase)],
      state,
      smartContractResolve: result => data,
      smartContractReject: error => error
    })
  }

  deleteService (state = null, data = {}) {
    return blockchainManager.querySmartContract({
      contractToUse: ServiceWriter,
      smartContractMethod: 'removeDentistFromService',
      smartContractMethodParams: (coinbase) => [...(Object.values(data.serviceObject)), {from: coinbase}],
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

  getRequestDetail (state = null, dataObject = {}) {
    const {requestTypeId, requestId, dentistId} = dataObject
    return blockchainManager.querySmartContract({
      contractToUse: DB,
      smartContractMethod: 'getEntityList',
      smartContractMethodParams: (coinbase) => [serviceManager.requestRecordFields(state, dentistId, requestId), serviceManager.requestRecordFieldTypes(), {from: coinbase}],
      state,
      smartContractResolve: result => {
        const dataObject = getObjectFromResponse(state, result, 1, serviceManager.requestKeys(), serviceManager.requestRecordFieldTypes())[0]
        Object.assign(dataObject, {
          serviceName: serviceTypes[requestTypeId].subtypes[dataObject.serviceId],
          requestTypeId,
          requestId,
          dentistId
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

  getServiceFee (state = null, dataObject = {}) {
    let {dentistId, serviceId} = dataObject
    dentistId = getSlicedAddressString(state, dentistId)
    serviceId = getSlicedAddressString(state, getLeftPaddedNumber(state, serviceId, 1))
    return blockchainManager.querySmartContract({
      contractToUse: DB,
      smartContractMethod: 'getEntityList',
      smartContractMethodParams: (coinbase) => [[getSoliditySha3ForId(state, 'dentist/scan-service/fee', dentistId, serviceId)], [3], {from: coinbase}],
      state,
      smartContractResolve: result => {
        return getObjectFromResponse(state, result, 1, ['fee'], [3])[0]
      },
      smartContractReject: (error) => ({
        error,
        isValid: true,
        warningMessage: "We've encountered a problem fetching your service information from the blockchain. Please do try again in a few minutes."
      })
    })
  }

  getApplicationDetail (state = null, dataObject = {}) {
    const {applicationTypeId, applicationId} = dataObject
    return blockchainManager.querySmartContract({
      contractToUse: DB,
      smartContractMethod: 'getEntityList',
      smartContractMethodParams: (coinbase) => [serviceManager.applicationRecordFields(state, applicationId), serviceManager.applicationRecordFieldTypes(), {from: coinbase}],
      state,
      smartContractResolve: result => {
        const dataObject = getObjectFromResponse(state, result, 1, serviceManager.applicationKeys(), serviceManager.applicationRecordFieldTypes())[0]
        Object.assign(dataObject, {
          serviceName: serviceTypes[applicationTypeId].subtypes[dataObject.serviceId],
          applicationTypeId,
          applicationId
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

  getCaseDetail (state = null, dataObject = {}) {
    const {applicationTypeId, caseId} = dataObject
    return blockchainManager.querySmartContract({
      contractToUse: DB,
      smartContractMethod: 'getEntityList',
      smartContractMethodParams: (coinbase) => [serviceManager.caseRecordFields(state, caseId), serviceManager.caseRecordFieldTypes(), {from: coinbase}],
      state,
      smartContractResolve: result => {
        const dataObject = getObjectFromResponse(state, result, 1, serviceManager.caseKeys(), serviceManager.caseRecordFieldTypes())[0]
        Object.assign(dataObject, {
          serviceName: serviceTypes[applicationTypeId].subtypes[dataObject.serviceId],
          applicationTypeId,
          applicationId: dataObject.scanApplicationId,
          caseId
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

  getPaymentDetail (state = null, dataObject = {}) {
    const {applicationTypeId, applicationId, paymentId} = dataObject
    return blockchainManager.querySmartContract({
      contractToUse: DB,
      smartContractMethod: 'getEntityList',
      smartContractMethodParams: (coinbase) => [serviceManager.paymentRecordFields(state, paymentId), serviceManager.paymentRecordFieldTypes(), {from: coinbase}],
      state,
      smartContractResolve: result => {
        const dataObject = getObjectFromResponse(state, result, 1, serviceManager.paymentKeys(), serviceManager.paymentRecordFieldTypes())[0]
        Object.assign(dataObject, {
          applicationTypeId,
          applicationId,
          paymentId
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

  requestKeys () {
    return [
      'hasDentistApplied',
      'status',
      'patientId',
      'serviceId',
      'date',
      'time',
      'insurance',
      'comment'
    ]
  }

  requestRecordFields (state, dentistId, scanRequestId) {
    dentistId = getSlicedAddressString(state, dentistId)
    scanRequestId = getSlicedAddressString(state, getLeftPaddedNumber(state, scanRequestId, 1))
    return [
      getSoliditySha3ForId(state, 'dentist/scan-request', dentistId, scanRequestId),
      getSoliditySha3ForId(state, 'scan-request/status', scanRequestId),
      getSoliditySha3ForId(state, 'scan-request/patient', scanRequestId),
      getSoliditySha3ForId(state, 'scan-request/scan-service', scanRequestId),
      getSoliditySha3ForId(state, 'scan-request/appointment-date', scanRequestId),
      getSoliditySha3ForId(state, 'scan-request/appointment-time', scanRequestId),
      getSoliditySha3ForId(state, 'scan-request/appointment-insurance', scanRequestId),
      getSoliditySha3ForId(state, 'scan-request/appointment-comment', scanRequestId)
    ]
  }

  requestRecordFieldTypes () {
    // types: 1 => boolean, 2 => uint8, 3 => uint, 4 => address, 5 => bytes32, 7 => string
    return [1, 2, 4, 3, 5, 5, 7, 7]
  }

  applicationKeys () {
    return [
      'status',
      'requestId',
      'userId',
      'serviceId',
      'quote',
      'comment',
      'hasCase',
      'caseId'
    ]
  }

  applicationRecordFields (state, scanApplicationId) {
    scanApplicationId = getSlicedAddressString(state, getLeftPaddedNumber(state, scanApplicationId, 1))
    return [
      getSoliditySha3ForId(state, 'scan-application/status', scanApplicationId),
      getSoliditySha3ForId(state, 'scan-application/scan-request', scanApplicationId),
      getSoliditySha3ForId(state, 'scan-application/dentist', scanApplicationId),
      getSoliditySha3ForId(state, 'scan-application/scan-service', scanApplicationId),
      getSoliditySha3ForId(state, 'scan-application/quote', scanApplicationId),
      getSoliditySha3ForId(state, 'scan-application/comment', scanApplicationId),
      getSoliditySha3ForId(state, 'scan-application/has-case?', scanApplicationId),
      getSoliditySha3ForId(state, 'scan-application/case', scanApplicationId)
    ]
  }

  applicationRecordFieldTypes () {
    // types: 1 => boolean, 2 => uint8, 3 => uint, 4 => address, 5 => bytes32, 7 => string
    return [2, 3, 4, 3, 3, 7, 1, 3]
  }

  caseKeys () {
    return [
      'status',
      'requestId',
      'scanApplicationId',
      'paymentId',
      'userId',
      'serviceId',
      'quote',
      'amount',
      'ODLLSPP',
      'ODLLTPP'
    ]
  }

  caseRecordFields (state, caseId) {
    caseId = getSlicedAddressString(state, getLeftPaddedNumber(state, caseId, 1))
    return [
      getSoliditySha3ForId(state, 'case/status', caseId),
      getSoliditySha3ForId(state, 'case/scan-request', caseId),
      getSoliditySha3ForId(state, 'case/scan-application', caseId),
      getSoliditySha3ForId(state, 'case/payment', caseId),
      getSoliditySha3ForId(state, 'case/dentist', caseId),
      getSoliditySha3ForId(state, 'case/scan-service', caseId),
      getSoliditySha3ForId(state, 'case/quote', caseId),
      getSoliditySha3ForId(state, 'case/amount', caseId),
      getSoliditySha3ForId(state, 'odll/scan-payment-percentage'),
      getSoliditySha3ForId(state, 'odll/treatment-payment-percentage')
    ]
  }

  caseRecordFieldTypes () {
    // types: 1 => boolean, 2 => uint8, 3 => uint, 4 => address, 5 => bytes32, 7 => string
    return [2, 3, 3, 3, 4, 3, 3, 3, 3, 3]
  }

  paymentKeys () {
    return [
      'status',
      'caseId',
      'treatmentId',
      'quote',
      'amount',
      'ODLLSPP',
      'ODLLTPP'
    ]
  }

  paymentRecordFields (state, paymentId) {
    paymentId = getSlicedAddressString(state, getLeftPaddedNumber(state, paymentId, 1))
    return [
      getSoliditySha3ForId(state, 'payment/state', paymentId),
      getSoliditySha3ForId(state, 'payment/case', paymentId),
      getSoliditySha3ForId(state, 'payment/treatment', paymentId),
      getSoliditySha3ForId(state, 'payment/quote', paymentId),
      getSoliditySha3ForId(state, 'payment/amount', paymentId),
      getSoliditySha3ForId(state, 'odll/scan-payment-percentage'),
      getSoliditySha3ForId(state, 'odll/treatment-payment-percentage')
    ]
  }

  paymentRecordFieldTypes () {
    // types: 1 => boolean, 2 => uint8, 3 => uint, 4 => address, 5 => bytes32, 7 => string
    return [2, 3, 3, 3, 3, 3, 3]
  }
}

serviceManager = new Manager()
export default serviceManager
