import Web3 from 'web3'
import store from '../../store/'
import { ACTION_TYPES, APPROVED_BLOCKCHAIN_NETWORK_ID } from '../../util/constants.js'

const monitorWeb3 = function (state) {
  const networkId = state && state.web3 ? state.web3.networkId : ''
  const coinbase = state && state.web3 ? state.web3.coinbase : ''
  let web3 = window.web3

  // Checking if browser is Web3-injected (Mist/MetaMask)
  if (typeof web3 !== 'undefined' && web3) {
    // Use Mist/MetaMask's provider
    web3 = new Web3(web3.currentProvider)
  } else {
    console.log('monitorWeb3: No web3 in browser')
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  }

  if (web3) {
    web3.eth.filter('latest', function (error, result) {
      if (!error) {
        // console.log(result)
      }
    })

    web3.eth.filter('pending', function (error, result) {
      if (!error) {
        // console.log(result)
      }
    })
  }

  setInterval(() => {
    if (web3) {
      web3.version.getNetwork((err, newNetworkId) => {
        newNetworkId = !err && newNetworkId ? newNetworkId.toString() : ''
        if (!err && networkId && networkId !== '' && newNetworkId && newNetworkId !== '' && newNetworkId !== networkId) {
          window.location.reload()
        } else {
          web3.eth.getCoinbase((err, newCoinbase) => {
            if (!err && coinbase && coinbase !== '' && newCoinbase && newCoinbase !== '' && newCoinbase !== coinbase && newNetworkId === APPROVED_BLOCKCHAIN_NETWORK_ID) {
              window.location.reload()
            }
          })
        }
      })
    } else {
      if (!(state.isDAppReady)) {
        store.dispatch(ACTION_TYPES.UPDATE_DAPP_READINESS, true)
      }
    }
  }, 666)
}

export default monitorWeb3
