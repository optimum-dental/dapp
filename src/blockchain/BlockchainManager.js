import contract from 'truffle-contract'
import DB from '../../build/contracts/DB.json'
import { APPROVED_BLOCKCHAIN_NETWORK_ID, NETWORKS } from '../util/constants'
import soliditySha3 from 'solidity-sha3'
import UserWriterContract from '../../build/contracts/UserWriter.json'
// import ODLLUserReaderContract from '../../build/contracts/ODLLUserReader.json'

let blockchainManager = null

class BlockchainManager {
  constructor () {
    blockchainManager = blockchainManager || this
    blockchainManager.DBContractAddress = '0x3599fb7676a98ade73fc7bff96ae51cbce59e268'
    return blockchainManager
  }

  getCurrentContractAddressForKey (dbContractKey, state, coinbase) {
    return new Promise((resolve, reject) => {
      const DBContract = contract(DB)
      DBContract.setProvider(state.web3.instance().currentProvider)
      DBContract.deployed()
      .then((contractInstance) => {
        contractInstance.getAddressValue(soliditySha3(dbContractKey), { from: coinbase })
        .then((result) => {
          // Successful Fetch
          resolve(result)
        })
        .catch((error) => {
          reject({ error, isValid: true, warningMessage: "We're unable to get the current contract address from the blockchain. Please do try again in a few minutes." })
        })
      })
      .catch((error) => {
        reject({ error, isValid: true, warningMessage: "We couldn't find Oral Data Link Smart Contracts on your detected network. This is because the Smart Contracts aren't deployed there. Contact Support to know why this is the case." })
      })
    })
  }

  accessBlockChainWith (dataObject = {}) {
    const state = dataObject.state
    return new Promise((resolve, reject) => {
      if (!state || !state.web3 || !(state.web3.instance)) {
        reject({ error: true, warningMessage: 'Web3 is not initialised. Use a Web3 injector' })
      } else {
        if (state.web3.networkId === APPROVED_BLOCKCHAIN_NETWORK_ID) {
          const contractToUse = dataObject.contractToUse
          let odllContract = contract(contractToUse)
          odllContract.setProvider(state.web3.instance().currentProvider)
          state.web3.instance().eth.getCoinbase((error, coinbase) => {
            if (error) {
              reject({ error, warningMessage: 'Unable to get coinbase for this operation' })
            } else {
              blockchainManager.runBlockchainPromise(resolve, reject, { odllContract, method: dataObject.method, coinbase })
            }
          })
        } else {
          reject({ error: true, warningMessage: `You're not on the same blockchain as us. Please connect to the ${NETWORKS[APPROVED_BLOCKCHAIN_NETWORK_ID]}` })
        }
      }
    })
  }

  runBlockchainPromise (resolve, reject, dataObject) {
    // dataObject.odllContract.at(dataObject.addressToUse)
    dataObject.odllContract.deployed()
    .then((contractInstance) => {
      dataObject.method(contractInstance, dataObject.coinbase)
      .then((result) => {
        resolve(result)
      })
      .catch((error) => {
        reject(error)
      })
    })
    .catch((error) => {
      reject({ error, isValid: true, warningMessage: "We couldn't find Oral Data Link Smart Contracts on your detected network. This is because the Smart Contracts aren't deployed there. Contact Support to know why this is the case." })
    })
  }

  querySmartContract (query) {
    return new Promise((resolve, reject) => {
      blockchainManager.accessBlockChainWith({
        state: query.state,
        contractToUse: query.contractToUse || UserWriterContract,
        dbContractKey: query.dbContractKey || 'contract/odll-user',
        method: query.method || ((contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance[query.smartContractMethod](...(query.smartContractMethodParams(coinbase)))
            .then((result) => {
              // Successful Fetch
              resolve(query.smartContractResolve(result))
            })
            .catch((error) => {
              reject(query.smartContractReject(error))
            })
          })
        })
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

blockchainManager = new BlockchainManager()
export default blockchainManager
