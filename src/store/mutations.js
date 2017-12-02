import ethereumBlockies from 'ethereum-blockies'
import { avatarCanvasElement } from '../util/DOMManipulator'
import { MUTATION_TYPES, APPROVED_BLOCKCHAIN_NETWORK_ID, IDENTICON_COLORS, NETWORKS } from '../util/constants'

function getHash (stringValue) {
  let hash = 0
  let characterCode

  if (stringValue.length === 0) return hash

  for (let i = 0; i < stringValue.length; i++) {
    characterCode = stringValue.charCodeAt(i)
    hash = ((hash << 5) - hash) + characterCode
    hash |= 0 // Convert to 32-bit integer
  }

  return hash
}

function assignPropertyTo (hashObject, key, value) {
  Object.assign(hashObject, {
    [key]: value
  })
}

function getUserBalance (state, userCopy) {
  return new Promise(function (resolve, reject) {
    state.web3.instance().eth.getBalance(state.user.coinbase, (err, res) => {
      if (!err) {
        resolve(state.web3.instance().fromWei(res.toNumber()))
      } else {
        console.error(err)
      }
    })
  })
}

// function stringifyBytesData (state, dataObject, datakeys) {
//   // Remove the guard in front of the bytes32 encoding strings
//   let result = []
//   for (var i = datakeys.length - 1; i >= 0; i--) {
//     try {
//       let data = dataObject[datakeys[i]]
//       result[i] = data ? state.web3.instance().toUtf8(data).toString().slice(1) : ''
//     } catch (e) {
//       result[i] = ''
//     }
//   }

//   return result
// }

// function getRawData (dataObject, datakeys) {
//   let result = []
//   for (var i = datakeys.length - 1; i >= 0; i--) {
//     result[i] = dataObject[datakeys[i]]
//   }

//   return result
// }

function updateUserGravatar (state, userCopy, payload = null) {
  if (payload.email && payload.email.trim() !== '') {
    setGravatarFromEmail(state, userCopy, payload)
  } else {
    prepareGravatarFromCoinbase(state, userCopy, payload)
  }
}

function setGravatarFromEmail (state, userCopy, payload = null) {
  avatarCanvasElement(payload.email)
  .then((avatarCanvas, gravatar) => {
    assignPropertyTo(userCopy, 'gravatar', gravatar)
    assignPropertyTo(userCopy, 'avatarCanvas', avatarCanvas)
    state.user = userCopy
    if (payload.callback) payload.callback(avatarCanvas)
  })
}

function prepareGravatarFromCoinbase (state, userCopy, payload = null) {
  const colorPosition = Math.abs(getHash(state.web3.coinbase) % IDENTICON_COLORS.length)
  const identiconColor = IDENTICON_COLORS[colorPosition]
  const avatarCanvas = ethereumBlockies.create({
    seed: state.web3.coinbase,
    color: identiconColor.color,
    bgcolor: identiconColor.bgColor,
    size: 8,
    scale: 13,
    spotcolor: identiconColor.spotColor
  })
  assignPropertyTo(userCopy, 'avatarCanvas', avatarCanvas)
  state.user = userCopy
  if (payload.callback) payload.callback(avatarCanvas)
}

export default {
  [MUTATION_TYPES.REGISTER_WEB3_INSTANCE] (state, payload) {
    const result = payload.result
    const web3Copy = state.web3
    web3Copy.instance = () => result.web3
    web3Copy.address = result.address ? result.address.toString() : web3Copy.address
    web3Copy.coinbase = result.coinbase ? result.coinbase.toString() : web3Copy.coinbase
    web3Copy.networkId = result.networkId ? result.networkId.toString() : web3Copy.networkId
    web3Copy.error = result.web3Error ? result.web3Error : web3Copy.error
    web3Copy.isInjected = result.hasInjectedWeb3 ? result.hasInjectedWeb3 : web3Copy.isInjected

    state.web3 = web3Copy
    if (payload.callback) payload.callback(state)
  },
  [MUTATION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS] (state, payload) {
    const hasWeb3InjectedBrowser = state.web3.isInjected
    const hasCoinbase = !!(state.web3.coinbase && state.web3.coinbase !== '')
    const coinbase = state.web3.coinbase
    const isConnectedToODLLNetwork = !!(state.web3.networkId && state.web3.networkId !== '' && state.web3.networkId === APPROVED_BLOCKCHAIN_NETWORK_ID)
    const web3Status = {
      hasWeb3InjectedBrowser,
      hasCoinbase,
      isConnectedToODLLNetwork,
      coinbase
    }

    let warningMessage = null
    if (hasWeb3InjectedBrowser) {
      if (hasCoinbase) {
        if (!isConnectedToODLLNetwork) {
          warningMessage = `You're not on the same blockchain as us. Please connect to the ${NETWORKS[APPROVED_BLOCKCHAIN_NETWORK_ID]}`
        }
      } else {
        warningMessage = "Looks like you haven't logged into your Web3 injector. If you're using Metamask, please log in."
      }
    } else {
      warningMessage = 'Your browser is not Web3-enabled. Click the link below to see how to use the ODLL dApp.'
    }
    const userCopy = state.user

    Object.assign(userCopy, web3Status)
    state.user = userCopy
    if (payload.callback) payload.callback({status: !warningMessage, warningMessage})
  },
  [MUTATION_TYPES.UPDATE_USER_STATE] (state, payload) {
    const userObject = payload.userObject
    const userCopy = state.user
    const [lastName, firstName, middleName] = userObject.name.split(' ')
    const [areaNumber, groupNumber, sequenceNumber] = userObject.socialSecurityNumber.split('-')
    const [year, month, day] = userObject.birthday.split('/')

    Object.assign(userCopy, userObject, {
      type: userObject.type.toString(),
      isValid: true,
      patientable: Number(userObject.type) === 0 || Number(userObject.type) === 1,
      canBeNewPatient: Number(userObject.type) === 0,
      isPatient: Number(userObject.type) === 1,
      isDentist: Number(userObject.type) === 2,
      isODLLManager: Number(userObject.type) === 3,
      isODLLAdmin: Number(userObject.type) === 4,
      name: userObject.name || '',
      lastName: lastName || '',
      firstName: firstName || '',
      middleName: middleName || '',
      email: userObject.email || '',
      gravatar: userObject.gravatar || '',
      street: userObject.street || '',
      city: userObject.city || '',
      state: userObject.state.toString(),
      zipCode: userObject.zipCode || '',
      country: userObject.country && userObject.country.toString() === '0' ? '' : userObject.country.toString(),
      phoneNumber: userObject.phoneNumber && userObject.phoneNumber.toString().trim() === '' ? '' : userObject.phoneNumber,
      socialSecurityNumber: userObject.socialSecurityNumber || '',
      areaNumber: areaNumber || '',
      groupNumber: groupNumber || '',
      sequenceNumber: sequenceNumber || '',
      birthday: userObject.birthday || '',
      day: day || '',
      month: month || '',
      year: year || '',
      gender: Number(userObject.gender) === 0 ? '' : userObject.gender,
      dentistsIds: userObject.dentistsIds || []
    })

    getUserBalance(state)
    .then((balance) => {
      userCopy.balance = balance
      state.user = userCopy
      if (payload.callback) payload.callback(true)
    })
  },
  [MUTATION_TYPES.CHANGE_CURRENT_ROUTE_TO] (state, newRoute) {
    state.currentRoute = newRoute
  },
  [MUTATION_TYPES.SET_CURRENT_VIEW] (state, newRoute) {
    state.currentView = newRoute.meta.view
  },
  [MUTATION_TYPES.UPDATE_USER_GRAVATAR] (state, payload) {
    const userCopy = state.user
    updateUserGravatar(state, userCopy, payload)
  },
  [MUTATION_TYPES.UPDATE_DAPP_READINESS] (state, isReady) {
    state.isDAppReady = isReady
  },
  [MUTATION_TYPES.INITIALISE_IS_VALID_USER_BUT] (state, payload) {
    state.isValidUserBut = payload.value ? '1' : '0'
    state.originalIsValidUserBut = payload.value ? '1' : '0'
    const userCopy = state.user
    userCopy.warningMessage = payload.value ? payload.value : ''
    state.user = userCopy
    if (payload.callback) payload.callback()
  },
  [MUTATION_TYPES.SET_IS_VALID_USER_BUT] (state, newValue) {
    state.isValidUserBut = newValue
  },
  [MUTATION_TYPES.RESET_IS_VALID_USER_BUT] (state) {
    state.isValidUserBut = state.originalIsValidUserBut
  },
  [MUTATION_TYPES.UPDATE_WEB3_PROPERTIES] (state, payload) {
    for (var i = payload.properties.length - 1; i >= 0; i--) {
      state.web3[payload.properties[i]] = payload.values[i]
      if (state.user[payload.properties[i]]) state.user[payload.properties[i]] = payload.values[i]
    }
  },
  [MUTATION_TYPES.SAVE_SEARCH_RESULT] (state, payload) {
    const results = payload.results || []
    const searchResultCopy = state.searchResult
    searchResultCopy[payload.type].data[payload.offset] = []
    searchResultCopy[payload.type].seed = payload.seed
    searchResultCopy[payload.type].totalNumberAvailable = payload.totalNumberAvailable.toNumber()
    if (results.length > 0) {
      Promise.all(results)
      .then((values) => {
        values.forEach((value, index) => {
          if (payload.preSaveCallback) payload.preSaveCallback(value)
          Object.assign(value, { SN: index })
          searchResultCopy[payload.type].data[payload.offset].push(value)
          state.searchResult = searchResultCopy
          if (payload.callback) payload.callback(value, results.length === index + 1)
        })
      })
    } else {
      if (payload.callback) payload.callback(null, true)
    }
  }
}
