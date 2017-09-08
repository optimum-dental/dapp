import getWeb3 from '../util/web3/getWeb3'
import { runVue } from '../main'

export default {
  registerWeb3Instance ({ commit }) {
    // Initialize web3
    getWeb3
    .then(web3Instance => {
      console.log('Web3 initialized! Address: ')
      runVue(true)
      commit('registerWeb3Instance')
    })
    .catch((e) => {
      runVue(false)
      console.log('Error in web3 initialization.' + e)
    })
  }
}
