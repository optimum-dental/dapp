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
  // ODLLDB.at('0x806eb0832bb16d0c408510c3515ccf15ef91481d').removePermittedContract("0xa55f456cea5326579970d49951eeb0c1be474710")

  // // Add permission for ODLLUser contract
  // ODLLDB.at('0x806eb0832bb16d0c408510c3515ccf15ef91481d').addPermittedContract("0x715472a2430bb4c34f35a6e6927c12d78ab7b0f0")

  // // Check permission status
  // ODLLDB.at('0x806eb0832bb16d0c408510c3515ccf15ef91481d').permissionStatusForContract("0x715472a2430bb4c34f35a6e6927c12d78ab7b0f0")


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
  // ODLLDB.at('0x806eb0832bb16d0c408510c3515ccf15ef91481d').addPermittedContracts([
  //   "0x44910cf5537770f7653fd76642f4ba9c39d583d1", // ODLLSetter
  //   "0x715472a2430bb4c34f35a6e6927c12d78ab7b0f0" // ODLLUser
  // ], { from: web3.eth.coinbase })

ODLLDB.at('0x806eb0832bb16d0c408510c3515ccf15ef91481d').addPermittedContracts(["0x44910cf5537770f7653fd76642f4ba9c39d583d1", "0x715472a2430bb4c34f35a6e6927c12d78ab7b0f0"], { from: web3.eth.coinbase })

  ODLLSetter.at('0x44910cf5537770f7653fd76642f4ba9c39d583d1').setOwner({ from: web3.eth.coinbase })
  ODLLSetter.at('0x44910cf5537770f7653fd76642f4ba9c39d583d1').setODLLConfig({ from: web3.eth.coinbase })
  ODLLSetter.at('0x44910cf5537770f7653fd76642f4ba9c39d583d1').setContract("contract/odll-user", "0x715472a2430bb4c34f35a6e6927c12d78ab7b0f0", { from: web3.eth.coinbase })
  ODLLSetter.at('0x44910cf5537770f7653fd76642f4ba9c39d583d1').setFirstAdmin("0x3b26a28666a28e5037613947ac09dcf5d6caf7b9", { from: web3.eth.coinbase })


  ODLLDB.at('0x806eb0832bb16d0c408510c3515ccf15ef91481d').getPermittedContracts()

  ODLLDB.at('0x806eb0832bb16d0c408510c3515ccf15ef91481d').getAddressValue('0xe901f0b43f920fc0b85fb414d10fafdf40d2a0b21a6397d54c1f5c09529e47a9') // check owner

  ODLLDB.at('0x806eb0832bb16d0c408510c3515ccf15ef91481d').getAddressValue('0xa2a70261844f353edc399d2fe91ce30b0e72f9cddd7ddaab87a3b0b66bc7390b') // check ODLLUser Contract

  ODLLDB.at('0x806eb0832bb16d0c408510c3515ccf15ef91481d').getBooleanValue('0x9da5783d5fac595f2274074850e2937662a474b36847045d68ab208b0c23e9dc') // if 0x3b26a28666a28e5037613947ac09dcf5d6caf7b9 is admin
}
