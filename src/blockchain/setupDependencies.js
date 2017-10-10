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
}
