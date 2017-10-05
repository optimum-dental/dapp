import contract from 'truffle-contract'
import ODLLUserContract from '../../build/contracts/ODLLUser.json'
import { APPROVED_BLOCKCHAIN_NETWORK_ID, NETWORKS } from '../util/constants'

let odllUser = null
class ODLLUser {
  constructor () {
    odllUser = odllUser || this
    return odllUser
  }

  writeUser (state = null, data = {}) {
    return new Promise((resolve, reject) => {
      this.accessODLLUserContractWith({
        state,
        method: (contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance.writeUser(...(Object.values(data)), { from: coinbase })
            .then((result) => {
              // Successful Sign-up
              resolve(data)
            })
            .catch((e) => {
              reject(e)
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

  getUserDataFromTheBlockchain (state = null) {
    return new Promise((resolve, reject) => {
      this.accessODLLUserContractWith({
        state,
        method: (contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance.getUserData({ from: coinbase })
            .then((result) => {
              // Successful Fetch
              resolve(this.getUTF8DataOfResults(state, result))
            })
            .catch((error) => {
              reject(error)
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

  accessODLLUserContractWith (dataObject = {}) {
    const state = dataObject.state
    return new Promise((resolve, reject) => {
      if (!state || !state.web3 || !(state.web3.instance)) {
        reject('Web3 is not initialised. Use a Web3 injector')
      } else {
        if (state.web3.networkId === APPROVED_BLOCKCHAIN_NETWORK_ID) {
          let odllUserContract = contract(ODLLUserContract)
          odllUserContract.setProvider(state.web3.instance().currentProvider)
          state.web3.instance().eth.getCoinbase((error, coinbase) => {
            if (error) {
              console.error(':::Unable to get coinbase for this operation')
              reject(error)
            } else {
              odllUserContract.deployed()
              .then((contractInstance) => {
                dataObject.method(contractInstance, coinbase)
                .then((result) => {
                  resolve(result)
                })
                .catch((error) => {
                  reject(error)
                })
              })
              .catch((error) => {
                reject(error)
              })
            }
          })
        } else {
          reject(`You are NOT connected to the ${NETWORKS[APPROVED_BLOCKCHAIN_NETWORK_ID]} on which this dApp runs.`)
        }
      }
    })
  }

  getUTF8DataOfResults (state, results) {
    const utf8Results = state && state.web3 && state.web3.instance ? results.map(result => state.web3.instance().toUtf8(result)) : []
    const type = utf8Results[0]
    switch (type) {
      case '1':
        return {
          type: type,
          lastName: utf8Results[1],
          firstName: utf8Results[2],
          middleName: utf8Results[3],
          email: utf8Results[4],
          fullName: `${utf8Results[1]} ${utf8Results[2]} ${utf8Results[3]}`,
          street: utf8Results[5],
          city: utf8Results[6],
          state: utf8Results[7],
          zipCode: utf8Results[8],
          country: utf8Results[9],
          phoneNumber: utf8Results[10],
          areaNumber: utf8Results[11],
          groupNumber: utf8Results[12],
          sequenceNumber: utf8Results[13],
          socialSecurityNumber: `${utf8Results[11]}-${utf8Results[12]}-${utf8Results[13]}`,
          day: utf8Results[14],
          month: utf8Results[15],
          year: utf8Results[16],
          gender: utf8Results[17]
        }
      case '2':
        return {
          type: type,
          firstName: utf8Results[1],
          lastName: utf8Results[2],
          email: utf8Results[3]
        }
      case '3':
        return {
          type: type,
          firstName: utf8Results[1],
          lastName: utf8Results[2],
          email: utf8Results[3]
        }
      case '4':
        return {
          type: type,
          firstName: utf8Results[1],
          lastName: utf8Results[2],
          email: utf8Results[3]
        }
      default:
        return {
          type: '0'
        }
    }
  }
}

export default new ODLLUser()
