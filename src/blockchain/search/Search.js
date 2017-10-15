// import odllUser from '../odll/ODLLUser'
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
              resolve(result)
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

  getDentistDataFromFind (state = null, dataObject = {}) {
    return new Promise((resolve, reject) => {
      blockchainManager.accessBlockChainWith({
        state,
        contractToUse: ODLLUserContract,
        dbContractKey: 'contract/odll-user',
        method: (contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance.getDentistDataFromFind(...(Object.values(dataObject)), { from: coinbase })
            .then((result) => {
              // Successful Fetch
              resolve(result)
            })
            .catch((error) => {
              reject({ error, isValid: true, warningMessage: "We've encountered a problem fetching dentist from the blockchain. Please do try again in a few minutes." })
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

  fetchManagers (state = null, dataObject = {}) {
    return new Promise((resolve, reject) => {
      blockchainManager.accessBlockChainWith({
        state,
        contractToUse: ODLLUserContract,
        dbContractKey: 'contract/odll-user',
        method: (contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance.fetchManagers(...(Object.values(dataObject)), { from: coinbase })
            .then((result) => {
              // Successful Fetch
              resolve(result)
            })
            .catch((error) => {
              reject({ error, isValid: true, warningMessage: "We've encountered a problem fetching managers from the blockchain. Please do try again in a few minutes." })
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

  getManager (state = null, dataObject = {}) {
    return new Promise((resolve, reject) => {
      blockchainManager.accessBlockChainWith({
        state,
        contractToUse: ODLLUserContract,
        dbContractKey: 'contract/odll-user',
        method: (contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance.getManager(...(Object.values(dataObject)), { from: coinbase })
            .then((result) => {
              // Successful Fetch
              resolve(result)
            })
            .catch((error) => {
              reject({ error, isValid: true, warningMessage: "We've encountered a problem fetching manager from the blockchain. Please do try again in a few minutes." })
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

  fetchDentists (state = null, dataObject = {}) {
    return new Promise((resolve, reject) => {
      blockchainManager.accessBlockChainWith({
        state,
        contractToUse: ODLLUserContract,
        dbContractKey: 'contract/odll-user',
        method: (contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance.fetchDentists(...(Object.values(dataObject)), { from: coinbase })
            .then((result) => {
              // Successful Fetch
              resolve(result)
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

  getDentist (state = null, dataObject = {}) {
    return new Promise((resolve, reject) => {
      blockchainManager.accessBlockChainWith({
        state,
        contractToUse: ODLLUserContract,
        dbContractKey: 'contract/odll-user',
        method: (contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance.getDentist(...(Object.values(dataObject)), { from: coinbase })
            .then((result) => {
              // Successful Fetch
              resolve(result)
            })
            .catch((error) => {
              reject({ error, isValid: true, warningMessage: "We've encountered a problem fetching dentist from the blockchain. Please do try again in a few minutes." })
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
