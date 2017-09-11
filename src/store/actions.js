import { ACTION_TYPES, MUTATION_TYPES } from '../util/constants'
import getWeb3 from '../util/web3/getWeb3'

export default {
  [ACTION_TYPES.REGISTER_WEB3_INSTANCE] ({ commit, dispatch }) {
    // Try to initialize web3
    getWeb3
    .then((result) => {
      commit(MUTATION_TYPES.REGISTER_WEB3_INSTANCE, result)
    })
    .catch((e) => {
      if (e.result) {
        const result = e.result
        commit(MUTATION_TYPES.REGISTER_WEB3_INSTANCE, {
          web3Instance: (result.hasInjectedWeb3 ? () => result.web3 : null),
          hasInjectedWeb3: (result.hasInjectedWeb3 ? result.hasInjectedWeb3 : false),
          web3Error: e.err
        })
      }
    })
  },
  [ACTION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS] ({ commit }, result) {
    commit(MUTATION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS, result)
  },
  [ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO] ({ commit }, newRoute) {
    commit(MUTATION_TYPES.CHANGE_CURRENT_ROUTE_TO, newRoute)
  }
}
