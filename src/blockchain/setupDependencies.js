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
  // ODLLDB.at('0x6c2ed43575fdd78f6e834a1593dd1d431d95f81a').removePermittedContract("0xa55f456cea5326579970d49951eeb0c1be474710")

  // // Add permission for ODLLUser contract
  // ODLLDB.at('0x6c2ed43575fdd78f6e834a1593dd1d431d95f81a').addPermittedContract("0x99897a800f0591e211c1eb71a8f6b7c9bbfa1b0c")

  // // Check permission status
  // ODLLDB.at('0x6c2ed43575fdd78f6e834a1593dd1d431d95f81a').permissionStatusForContract("0x99897a800f0591e211c1eb71a8f6b7c9bbfa1b0c")


  // Add ODLLSetter and ODLLUser as permitted contracts
  ODLLDB.at('0x6c2ed43575fdd78f6e834a1593dd1d431d95f81a').addPermittedContracts(["0xf3c54f879cf466cb4b89f4c0e9b875f90160774d", "0x99897a800f0591e211c1eb71a8f6b7c9bbfa1b0c"], { from: web3.eth.coinbase })

  ODLLSetter.at('0xf3c54f879cf466cb4b89f4c0e9b875f90160774d').setOwner({ from: web3.eth.coinbase })
  ODLLSetter.at('0xf3c54f879cf466cb4b89f4c0e9b875f90160774d').setODLLConfig({ from: web3.eth.coinbase })
  ODLLSetter.at('0xf3c54f879cf466cb4b89f4c0e9b875f90160774d').setContract("contract/odll-user", "0x99897a800f0591e211c1eb71a8f6b7c9bbfa1b0c", { from: web3.eth.coinbase })

  ODLLDB.at('0x6c2ed43575fdd78f6e834a1593dd1d431d95f81a').getPermittedContracts()
}
