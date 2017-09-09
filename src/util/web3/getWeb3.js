import Web3 from 'web3'
// import { NETWORKS } from '../constants'

let getWeb3 = new Promise(function (resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function () {
    var web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)
      console.log('web3-injected environment detected.')
    }

    resolve({
      web3Instance: web3,
      isConnectedToWeb3: web3 !== undefined
    })
  })
})

export default getWeb3
