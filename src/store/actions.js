import { MUTATION_TYPES } from '../util/constants'
import getWeb3 from '../util/web3/getWeb3'

export default {
  registerWeb3Instance ({ commit }) {
    // Try to initialize web3
    getWeb3
    .then(result => {
      commit(MUTATION_TYPES.REGISTER_WEB3_INSTANCE, result)
    })
    .catch((e) => {
      console.log(e)
      commit(MUTATION_TYPES.REGISTER_WEB3_INSTANCE, {
        web3Instance: null,
        isConnectedToWeb3: false,
        web3Error: e
      })
    })
  }
}
