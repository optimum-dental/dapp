import odllUser from '../odll/ODLLUser'
import ODLLUserContract from '../../../build/contracts/ODLLUser.json'
import blockchainManager from '../BlockchainManager'

let search = null

class Search {
  constructor () {
    search = search || this
    return search
  }

  findDentists (state = null, dataObject = {}) {
    return new Promise((resolve, reject) => {
      blockchainManager.accessBlockChainWith({
        state,
        contractToUse: ODLLUserContract,
        dbContractKey: 'contract/odll-user',
        method: (contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance.findDentists(...(Object.values(dataObject)), { from: coinbase })
            .then((result) => {
              // Successful Fetch
              resolve(odllUser.getUserObject(state, result))
              console.log(result)
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

search = new Search()
export default search
