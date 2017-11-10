import DB from '../../../build/contracts/DB.json'
import UserReaderContract from '../../../build/contracts/UserReader.json'
import blockchainManager from '../BlockchainManager'
import {getObjectFromResponse, getSlicedAddressString, getSoliditySha3ForId} from '../utilities'
import {EXCHANGE_RATE_API} from '../../util/constants'

let userManager = null

class UserManager {
  constructor () {
    userManager = userManager || this
    return userManager
  }

  writeData (state = null, data = {}) {
    const blockchainData = Object.assign({}, data)
    const blockchainMethodName = blockchainData.methodName
    delete blockchainData.methodName
    return blockchainManager.querySmartContract({
      smartContractMethod: blockchainMethodName,
      smartContractMethodParams: (coinbase) => [...(Object.values(blockchainData)), {from: coinbase, gas: 4444444, gasPrice: 666000000000}],
      state,
      smartContractResolve: result => data,
      smartContractReject: error => error
    })
  }

  deleteService (state = null, data = {}) {
    return blockchainManager.querySmartContract({
      smartContractMethod: 'removeDentistFromService',
      smartContractMethodParams: (coinbase) => [...(Object.values(data.serviceObject)), {from: coinbase, gas: 4444444, gasPrice: 666000000000}],
      state,
      smartContractResolve: result => data,
      smartContractReject: error => error
    })
  }

  writeUser (state = null, data = {}) {
    return blockchainManager.querySmartContract({
      smartContractMethod: 'writeUser',
      smartContractMethodParams: (coinbase) => [...(Object.values(data.userObject)), {from: coinbase, gas: 4444444, gasPrice: 666000000000}],
      state,
      smartContractResolve: result => data,
      smartContractReject: error => error
    })
  }

  acceptScanApplication (state = null, data = {}) {
    const quoteInEther = fetch(EXCHANGE_RATE_API)
    .then(response => response.json())
    .then((JSONResponse) => {
      const USDExchange = JSONResponse[0].price_usd
      return (data.requestObject.quote / USDExchange)
    })
    .catch((e) => console.error(e))

    return blockchainManager.querySmartContract({
      smartContractMethod: 'acceptScanApplication',
      smartContractMethodParams: (coinbase) => [...(Object.values(data.requestObject)), {from: coinbase, gas: 4444444, gasPrice: 666000000000, value: state.web3.instance().toWei(quoteInEther, 'ether')}],
      state,
      smartContractResolve: result => data,
      smartContractReject: error => error
    })
  }

  getUserDataFromTheBlockchain (state = null, userObject = {}) {
    return new Promise((resolve, reject) => {
      const userObject = {}
      userManager.getUserData(state, null, userObject)
      .then((result) => {
        Object.assign(userObject, result)
        resolve(userObject)
      })
      .catch(error => reject(error))
    })
  }

  getUserData (state = null, userId = null, userObject = {}) {
    return blockchainManager.querySmartContract({
      contractToUse: DB,
      smartContractMethod: 'getEntityList',
      smartContractMethodParams: (coinbase) => [userObject.userRecordFields || userManager.userRecordFields(state, userId || coinbase), userObject.userRecordFieldTypes || userManager.userRecordFieldTypes(), {from: coinbase}],
      state,
      smartContractResolve: result => {
        const userData = getObjectFromResponse(state, result, 1, userObject.keys || userManager.userKeys(), userObject.userRecordFieldTypes || userManager.userRecordFieldTypes())[0]
        return userData
      },
      smartContractReject: (error) => ({
        error,
        isValid: true,
        warningMessage: "We've encountered a problem fetching your identity information from the blockchain. Please do try again in a few minutes."
      })
    })
  }

  getUserDentistsIds (state = null, userId = null) {
    return blockchainManager.querySmartContract({
      contractToUse: UserReaderContract,
      smartContractMethod: 'getUserDentistsIds',
      smartContractMethodParams: (coinbase) => [userId || coinbase, {from: coinbase}],
      state,
      smartContractResolve: result => getObjectFromResponse(state, result, ['dentistsIds']),
      smartContractReject: (error) => ({
        error,
        isValid: true,
        warningMessage: "We've encountered a problem fetching your dentists from the blockchain. Please do try again in a few minutes."
      })
    })
  }

  getDentistFeeData (state = null, dataObject = {}) {
    const userId = dataObject.dentistId
    return blockchainManager.querySmartContract({
      contractToUse: UserReaderContract,
      smartContractMethod: 'getDentistFeeData',
      smartContractMethodParams: (coinbase) => [dataObject.serviceTypeId, dataObject.serviceId, userId || coinbase, {from: coinbase}],
      state,
      smartContractResolve: result => ({fee: result}),
      smartContractReject: (error) => ({
        error,
        isValid: true,
        warningMessage: "We've encountered a problem getting dentist fee from the blockchain. Please do try again in a few minutes."
      })
    })
  }

  getDentistRatingData (state = null, userId = null) {
    return blockchainManager.querySmartContract({
      contractToUse: UserReaderContract,
      smartContractMethod: 'getDentistRatingData',
      smartContractMethodParams: (coinbase) => [userId || coinbase, {from: coinbase}],
      state,
      smartContractResolve: result => ({rating: result}),
      smartContractReject: (error) => ({
        error,
        isValid: true,
        warningMessage: "We've encountered a problem getting dentist ratings from the blockchain. Please do try again in a few minutes."
      })
    })
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
      dentistsIds: [],
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

  userKeys () {
    return [
      'type',
      'name',
      'email',
      'gravatar',
      'street',
      'city',
      'state',
      'zipCode',
      'country',
      'phoneNumber',
      'socialSecurityNumber',
      'birthday',
      'gender'
    ]
  }

  userRecordFields (state, userId) {
    userId = getSlicedAddressString(state, userId)

    return [
      getSoliditySha3ForId(state, 'user/type', userId),
      getSoliditySha3ForId(state, 'user/name', userId),
      getSoliditySha3ForId(state, 'user/email', userId),
      getSoliditySha3ForId(state, 'user/gravatar', userId),
      getSoliditySha3ForId(state, 'user/street', userId),
      getSoliditySha3ForId(state, 'user/city', userId),
      getSoliditySha3ForId(state, 'user/state', userId),
      getSoliditySha3ForId(state, 'user/zip-code', userId),
      getSoliditySha3ForId(state, 'user/country', userId),
      getSoliditySha3ForId(state, 'user/phone-number', userId),
      getSoliditySha3ForId(state, 'user/social-security-number', userId),
      getSoliditySha3ForId(state, 'user/birthday', userId),
      getSoliditySha3ForId(state, 'user/gender', userId)
    ]
  }

  userRecordFieldTypes () {
    // types: 1 => boolean, 2 => uint8, 3 => uint, 4 => address, 5 => bytes32, 7 => string
    return [2, 7, 7, 5, 5, 5, 3, 5, 3, 5, 5, 5, 2]
  }
}

userManager = new UserManager()
export default userManager
