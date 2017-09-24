import ethereumBlockies from 'ethereum-blockies'
import { MUTATION_TYPES, APPROVED_BLOCKCHAIN_NETWORK_ID, IDENTICON_COLORS } from '../util/constants'

function resetUser (state) {
  const user = {
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    residentialAddress: '',
    day: '',
    month: '',
    year: '',
    gender: '',
    type: '',
    isValid: false
  }

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

export default {
  [MUTATION_TYPES.REGISTER_WEB3_INSTANCE] (state, payload) {
    const result = payload.result
    const web3Copy = state.web3
    web3Copy.instance = () => result.web3
    web3Copy.address = result.address
    web3Copy.coinbase = result.coinbase
    web3Copy.networkId = result.networkId
    web3Copy.error = result.web3Error
    web3Copy.isInjected = result.hasInjectedWeb3

    state.web3 = web3Copy

    if (payload.callback) payload.callback(result)
  },
  [MUTATION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS] (state) {
    const hasWeb3InjectedBrowser = state.web3.isInjected
    const hasCoinbase = !!(state.web3.coinbase && state.web3.coinbase !== '')
    const isConnectedToODLLNetwork = !!(state.web3.networkId && state.web3.networkId !== '' && state.web3.networkId === APPROVED_BLOCKCHAIN_NETWORK_ID)
    if (hasWeb3InjectedBrowser && hasCoinbase && isConnectedToODLLNetwork) {
      const userCopy = state.user
      const colorPosition = Math.abs(getHash(state.web3.coinbase) % IDENTICON_COLORS.length)
      const identiconColor = IDENTICON_COLORS[colorPosition]

      Object.assign(userCopy, {
        hasWeb3InjectedBrowser,
        hasCoinbase,
        isConnectedToODLLNetwork,
        isValid: true,
        avatarCanvas: ethereumBlockies.create({
          seed: state.web3.coinbase,
          color: identiconColor.color,
          bgcolor: identiconColor.bgColor,
          size: 8,
          scale: 13,
          spotcolor: identiconColor.spotColor
        })
      })

      state.user = userCopy
    } else {
      resetUser(state)
    }
  },
  [MUTATION_TYPES.CHANGE_CURRENT_ROUTE_TO] (state, newRoute) {
    state.currentRoute = newRoute
  },

  [MUTATION_TYPES.UPDATE_CURRENT_VIEW] (state, newView) {
    state.currentView = newView
  }
}
