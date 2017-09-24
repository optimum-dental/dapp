import { MUTATION_TYPES, APPROVED_BLOCKCHAIN_NETWORK_ID } from '../util/constants'

function resetUser (state) {
  state.user.firstName = ''
  state.user.lastName = ''
  state.user.email = ''
  state.user.phone = ''
  state.user.type = ''
  state.user.isValid = false
}

export default {
  [MUTATION_TYPES.REGISTER_WEB3_INSTANCE] (state, payload) {
    const result = payload.result
    state.web3.instance = () => result.web3
    state.web3.address = result.address
    state.web3.coinbase = result.coinbase
    state.web3.networkId = result.networkId
    state.web3.error = result.web3Error
    state.web3.isInjected = result.hasInjectedWeb3
    if (payload.callback) payload.callback(result)
  },
  [MUTATION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS] (state) {
    state.user.hasWeb3InjectedBrowser = state.web3.isInjected
    state.user.hasCoinbase = !!(state.web3.coinbase && state.web3.coinbase !== '')
    state.user.isConnectedToODLLNetwork = !!(state.web3.networkId && state.web3.networkId !== '' && state.web3.networkId === APPROVED_BLOCKCHAIN_NETWORK_ID)
    const user = state.user
    if (user.hasWeb3InjectedBrowser && user.hasCoinbase && user.isConnectedToODLLNetwork) {
      state.user.isValid = true
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
