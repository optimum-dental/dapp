import { MUTATION_TYPES } from '../util/constants'

export default {
  [MUTATION_TYPES.REGISTER_WEB3_INSTANCE] (state, payload) {
    // state.web3.instance = payload.web3Instance
    state.web3.error = payload.web3Error
    state.web3.isConnected = payload.isConnectedToWeb3
  }
}
