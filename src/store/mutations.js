import ethereumBlockies from 'ethereum-blockies'
import { avatarCanvasElement } from '../util/DOMManipulator'
import { MUTATION_TYPES, APPROVED_BLOCKCHAIN_NETWORK_ID, IDENTICON_COLORS } from '../util/constants'

function resetUser (state, web3Status) {
  const user = {
    email: '',
    lastName: '',
    firstName: '',
    middleName: '',
    fullName: '',
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
    gender: '',
    type: '',
    isValid: false
  }

  Object.assign(user, web3Status)
  state.user = user
}

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

function updateUserAvatarCanvas (state, userCopy, payload = null) {
  const colorPosition = Math.abs(getHash(state.web3.coinbase) % IDENTICON_COLORS.length)
  const identiconColor = IDENTICON_COLORS[colorPosition]
  const email = payload && payload.email ? payload.email : ''

  if (email && email.trim() !== '') {
    avatarCanvasElement(email)
    .then((avatarCanvas) => {
      assignPropertyTo(userCopy, 'avatarCanvas', avatarCanvas)
      state.user = userCopy
      if (payload.callback) payload.callback(avatarCanvas)
    })
  } else {
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
}

export default {
  [MUTATION_TYPES.REGISTER_WEB3_INSTANCE] (state, payload) {
    const result = payload.result
    const web3Copy = state.web3
    web3Copy.instance = () => result.web3
    web3Copy.address = result.address ? result.address : web3Copy.address
    web3Copy.coinbase = result.coinbase ? result.coinbase : web3Copy.coinbase
    web3Copy.networkId = result.networkId ? result.networkId : web3Copy.networkId
    web3Copy.error = result.web3Error ? result.web3Error : web3Copy.error
    web3Copy.isInjected = result.hasInjectedWeb3 ? result.hasInjectedWeb3 : web3Copy.isInjected

    state.web3 = web3Copy

    if (payload.callback) payload.callback(state)
  },
  [MUTATION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS] (state) {
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

    if (hasWeb3InjectedBrowser && hasCoinbase && isConnectedToODLLNetwork) {
      const userCopy = state.user

      Object.assign(userCopy, web3Status, {
        isValid: true
      })

      state.user = userCopy
    } else {
      resetUser(state, web3Status)
    }
  },
  [MUTATION_TYPES.CHANGE_CURRENT_ROUTE_TO] (state, newRoute) {
    state.currentRoute = newRoute
  },
  [MUTATION_TYPES.UPDATE_CURRENT_VIEW] (state, newView) {
    state.currentView = newView
  },
  [MUTATION_TYPES.UPDATE_USER_AVATAR_CANVAS] (state, payload) {
    const userCopy = state.user
    updateUserAvatarCanvas(state, userCopy, payload)
  },
  [MUTATION_TYPES.UPDATE_DAPP_READINESS] (state, isReady) {
    state.isDAppReady = isReady
  }
}
