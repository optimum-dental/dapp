import { MUTATION_TYPES } from '../util/constants'

export default {
  [MUTATION_TYPES.REGISTER_WEB3_INSTANCE] (state, payload) {
    state.web3.instance = () => payload.web3Instance
    state.web3.address = payload.address
    state.web3.coinbase = payload.coinbase
    state.web3.networkId = payload.networkId
    state.web3.error = payload.web3Error
    state.web3.isInjected = payload.hasInjectedWeb3
  },
  [MUTATION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS] (state, payload) {
    Object.assign(state.user, payload)
  },
  [MUTATION_TYPES.CHANGE_CURRENT_ROUTE_TO] (state, newRoute) {
    state.currentRoute = newRoute
  }
}
