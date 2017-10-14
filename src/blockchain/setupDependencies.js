var contract = require('truffle-contract');
var ODLLDB = require('../../build/contracts/ODLLDB.json');
var ODLLSetter = require('../../build/contracts/ODLLSetter.json');
var ODLLUser = require('../../build/contracts/ODLLUser.json');

ODLLDB = contract(ODLLDB);
ODLLSetter = contract(ODLLSetter);
ODLLUser = contract(ODLLUser);

ODLLDB.setProvider(web3.currentProvider);
ODLLSetter.setProvider(web3.currentProvider);
ODLLUser.setProvider(web3.currentProvider);

module.exports = function setup (err) {
  // console.log('Coinbase::::' + web3.eth.coinbase);
  // ODLLDB.deployed()
  // .then(function (ODLLDBInstance) {
  //   var dbAddress = ODLLDBInstance.address;
  //   console.log('dbAddress:::::' + dbAddress);

  //   ODLLUser.deployed()
  //   .then(function (ODLLUserInstance) {
  //     var ODLLUserAddress = ODLLUserInstance.address;
  //     console.log('ODLLUserAddress:::::' + ODLLUserAddress);

  //     ODLLSetter.deployed()
  //     .then(function (ODLLSetterInstance) {
  //       var ODLLSetterAddress = ODLLSetterInstance.address;
  //       console.log('ODLLSetterAddress:::::' + ODLLSetterAddress);
  //       return ODLLDBInstance.addPermittedContracts([ODLLSetterAddress, ODLLUserAddress], { from: web3.eth.coinbase })
  //       .then(function () {
  //         return ODLLSetterInstance.setOwner({ from: web3.eth.coinbase })
  //         .then(function() {
  //           return ODLLSetterInstance.setContract('contract/odll-user', ODLLUserAddress, { from: web3.eth.coinbase })
  //           .then(function () {
  //             console.log(':::::DONE')
  //           })
  //           .catch(function(error) {
  //             console.log('Unable to Set ODLLUser Contract:::: ' + error);
  //           });
  //         })
  //         .catch(function (error) {
  //           console.log('Unable to Set Owner:::: ' + error);
  //         })
  //       })
  //       .catch(function(error) {
  //         console.log('Unable to add Permitted Contracts: ODLLSetter and ODLLUser:::: ' + error);
  //       })
  //     })
  //     .catch(function(error) {
  //       console.log('ODLLSetter is not deployed:::: ' + error);
  //     });
  //   })
  //   .catch(function(error) {
  //     console.log('ODLLUser is not deployed:::: ' + error);
  //   });
  // })
  // .catch(function(error) {
  //   console.log('ODLLDB is not deployed:::: ' + error)
  // });


  // // Remove permission from old ODLLUser contract
  // ODLLDB.at('0xbc54d16a8e38012bcb017f6b40033ca6f27f375e').removePermittedContract("0xa55f456cea5326579970d49951eeb0c1be474710")

  // // Add permission for ODLLUser contract
  // ODLLDB.at('0xbc54d16a8e38012bcb017f6b40033ca6f27f375e').addPermittedContract("0x27fdc3b4cf18ed2ce4b20de479b4e979b2eadb69")

  // // Check permission status
  // ODLLDB.at('0xbc54d16a8e38012bcb017f6b40033ca6f27f375e').permissionStatusForContract("0x27fdc3b4cf18ed2ce4b20de479b4e979b2eadb69")


  ODLLDB.deployed()
  .then((i) => {
    console.log('ODLLDB::::::', i.address)
  })

  ODLLUser.deployed()
  .then((i) => {
    console.log('ODLLUser::::::', i.address)
  })

  ODLLSetter.deployed()
  .then((i) => {
    console.log('ODLLSetter::::::', i.address)
  })



  // Add ODLLSetter and ODLLUser as permitted contracts
  ODLLDB.at('0xbc54d16a8e38012bcb017f6b40033ca6f27f375e').addPermittedContracts([
    "0x1bf988c179c09077a69e2e3f84d794e4db81419b", // ODLLSetter
    "0x27fdc3b4cf18ed2ce4b20de479b4e979b2eadb69" // ODLLUser
  ], { from: web3.eth.coinbase })

  ODLLSetter.at('0x1bf988c179c09077a69e2e3f84d794e4db81419b').setOwner({ from: web3.eth.coinbase })
  ODLLSetter.at('0x1bf988c179c09077a69e2e3f84d794e4db81419b').setODLLConfig({ from: web3.eth.coinbase })
  ODLLSetter.at('0x1bf988c179c09077a69e2e3f84d794e4db81419b').setContract("contract/odll-user", "0x27fdc3b4cf18ed2ce4b20de479b4e979b2eadb69", { from: web3.eth.coinbase })

  ODLLDB.at('0xbc54d16a8e38012bcb017f6b40033ca6f27f375e').getPermittedContracts()
}
