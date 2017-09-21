import { MUTATION_TYPES, NETWORKS } from '../util/constants'
import ethereumBlockies from 'ethereum-blockies'

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
    const isConnectedToODLLNetwork = !!(state.web3.networkId && state.web3.networkId !== '' && state.web3.networkId === NETWORKS['ODLLBlockchainNetwork'])
    if (hasWeb3InjectedBrowser && hasCoinbase && isConnectedToODLLNetwork) {
      const userCopy = state.user
      userCopy.hasWeb3InjectedBrowser = true
      userCopy.hasCoinbase = true
      userCopy.isConnectedToODLLNetwork = true
      userCopy.isValid = true
      userCopy.avatarCanvas = ethereumBlockies.create({
        seed: state.web3.coinbase,
        color: '#dadada',
        bgcolor: '#838383',
        size: 5,
        scale: 20,
        spotcolor: '#9f9f9f'
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
