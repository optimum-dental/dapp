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
  console.log('Coinbase::::' + web3.eth.coinbase);
  ODLLDB.deployed()
  .then(function (ODLLDBInstance) {
    var dbAddress = ODLLDBInstance.address;
    console.log('dbAddress:::::' + dbAddress);

    ODLLUser.deployed()
    .then(function (ODLLUserInstance) {
      var ODLLUserAddress = ODLLUserInstance.address;
      console.log('ODLLUserAddress:::::' + ODLLUserAddress);

      ODLLSetter.deployed()
      .then(function (ODLLSetterInstance) {
        var ODLLSetterAddress = ODLLSetterInstance.address;
        console.log('ODLLSetterAddress:::::' + ODLLSetterAddress);
        return ODLLDBInstance.addPermittedContracts([ODLLSetterAddress, ODLLUserAddress], { from: web3.eth.coinbase })
        .then(function () {
          return ODLLSetterInstance.setOwner({ from: web3.eth.coinbase })
          .then(function() {
            return ODLLSetterInstance.setContract('contract/odll-user', ODLLUserAddress, { from: web3.eth.coinbase })
            .then(function () {
              console.log(':::::DONE')
            })
            .catch(function(error) {
              console.log('Unable to Set ODLLUser Contract:::: ' + error);
            });
          })
          .catch(function (error) {
            console.log('Unable to Set Owner:::: ' + error);
          })
        })
        .catch(function(error) {
          console.log('Unable to add Permitted Contracts: ODLLSetter and ODLLUser:::: ' + error);
        })
      })
      .catch(function(error) {
        console.log('ODLLSetter is not deployed:::: ' + error);
      });
    })
    .catch(function(error) {
      console.log('ODLLUser is not deployed:::: ' + error);
    });
  })
  .catch(function(error) {
    console.log('ODLLDB is not deployed:::: ' + error)
  });


  // // Remove permission from old ODLLUser contract
  // ODLLDB.at('0x3bea13179705cdab071e59cc3689f9eef4c81d39').removePermittedContract("0xa55f456cea5326579970d49951eeb0c1be474710")

  // // Add permission for ODLLUser contract
  // ODLLDB.at('0x3bea13179705cdab071e59cc3689f9eef4c81d39').addPermittedContract("0x0x69bd9d8d4b4b930e56ca77460554b4b7e7af481d")

  // // Check permission status
  // ODLLDB.at('0x3bea13179705cdab071e59cc3689f9eef4c81d39').permissionStatusForContract("0x0x69bd9d8d4b4b930e56ca77460554b4b7e7af481d")



  // ODLLDB.at('0x3bea13179705cdab071e59cc3689f9eef4c81d39').addPermittedContracts(["0x43877f21f1b344f0a18bbda4a32bc87ae2efc607", "0x0x69bd9d8d4b4b930e56ca77460554b4b7e7af481d"], { from: web3.eth.coinbase })

  // ODLLSetter.at('0x43877f21f1b344f0a18bbda4a32bc87ae2efc607').setOwner({ from: web3.eth.coinbase })

  // ODLLSetter.at('0x43877f21f1b344f0a18bbda4a32bc87ae2efc607').setODLLConfig({ from: web3.eth.coinbase })

  // ODLLSetter.at('0x43877f21f1b344f0a18bbda4a32bc87ae2efc607').setContract("contract/odll-user", "0x0x69bd9d8d4b4b930e56ca77460554b4b7e7af481d", { from: web3.eth.coinbase })

  // ODLLSetter.at('0x43877f21f1b344f0a18bbda4a32bc87ae2efc607').setFirstAdmin("0x3b26a28666a28e5037613947ac09dcf5d6caf7b9", { from: web3.eth.coinbase })


  // ODLLDB.at('0x3bea13179705cdab071e59cc3689f9eef4c81d39').getPermittedContracts()

  // ODLLDB.at('0x3bea13179705cdab071e59cc3689f9eef4c81d39').getAddressValue('0xe901f0b43f920fc0b85fb414d10fafdf40d2a0b21a6397d54c1f5c09529e47a9') // check owner

  // ODLLDB.at('0x3bea13179705cdab071e59cc3689f9eef4c81d39').getAddressValue('0xa2a70261844f353edc399d2fe91ce30b0e72f9cddd7ddaab87a3b0b66bc7390b') // check ODLLUser Contract

  // ODLLDB.at('0x3bea13179705cdab071e59cc3689f9eef4c81d39').getAddressValue('0x0f6f723d4ae6fa8d6cb219977b9c034e21574f8183956d459a70e20897c43340') // check first admin
}
