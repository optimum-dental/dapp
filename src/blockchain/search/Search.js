// import contract from 'truffle-contract'
// import ODLLDB from '../../../build/contracts/ODLLDB.json'
import ODLLUserContract from '../../../build/contracts/ODLLUser.json'
// import { APPROVED_BLOCKCHAIN_NETWORK_ID, NETWORKS } from '../../util/constants'
// import soliditySha3 from 'solidity-sha3'
import odllUser from '../ODLLUser'

class Search {
  findDentists (state = null, dataObject = {}) {
    console.log(dataObject)
    return new Promise((resolve, reject) => {
      odllUser.accessBlockChainWith({
        state,
        contractToUse: ODLLUserContract,
        dbContractKey: 'contract/odll-user',
        method: (contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance.findDentists(...(Object.values(dataObject)), { from: coinbase })
            .then((result) => {
              // Successful Fetch
              resolve(odllUser.getUserObject(state, result))
            })
            .catch((error) => {
              reject({ error, isValid: true, warningMessage: "We've encountered a problem fetching dentists from the blockchain. Please do try again in a few minutes." })
            })
          })
        }
      })
      .then((result) => {
        resolve(result)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }
}

export default new Search()
