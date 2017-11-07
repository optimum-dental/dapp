var contract = require('truffle-contract');
var ODLLDB = require('../../build/contracts/ODLLDB.json');
var ODLLSetter = require('../../build/contracts/ODLLSetter.json');
var ODLLUserWriter = require('../../build/contracts/ODLLUserWriter.json');

ODLLDB = contract(ODLLDB);
ODLLSetter = contract(ODLLSetter);
ODLLUserWriter = contract(ODLLUserWriter);

ODLLDB.setProvider(web3.currentProvider);
ODLLSetter.setProvider(web3.currentProvider);
ODLLUserWriter.setProvider(web3.currentProvider);

module.exports = function setup (err) {
  console.log('Coinbase::::' + web3.eth.coinbase);
  ODLLDB.deployed()
  .then(function (ODLLDBInstance) {
    var dbAddress = ODLLDBInstance.address;
    console.log('dbAddress:::::' + dbAddress);

    ODLLUserWriter.deployed()
    .then(function (ODLLUserWriterInstance) {
      var ODLLUserWriterAddress = ODLLUserWriterInstance.address;
      console.log('ODLLUserWriterAddress:::::' + ODLLUserWriterAddress);

      ODLLSetter.deployed()
      .then(function (ODLLSetterInstance) {
        var ODLLSetterAddress = ODLLSetterInstance.address;
        console.log('ODLLSetterAddress:::::' + ODLLSetterAddress);
        return ODLLDBInstance.addPermittedContracts([ODLLSetterAddress, ODLLUserWriterAddress], { from: web3.eth.coinbase })
        .then(function () {
          return ODLLSetterInstance.setOwner({ from: web3.eth.coinbase })
          .then(function() {
            return ODLLSetterInstance.setContract('contract/odll-user', ODLLUserWriterAddress, { from: web3.eth.coinbase })
            .then(function () {
              console.log(':::::DONE')
            })
            .catch(function(error) {
              console.log('Unable to Set ODLLUserWriter Contract:::: ' + error);
            });
          })
          .catch(function (error) {
            console.log('Unable to Set Owner:::: ' + error);
          })
        })
        .catch(function(error) {
          console.log('Unable to add Permitted Contracts: ODLLSetter and ODLLUserWriter:::: ' + error);
        })
      })
      .catch(function(error) {
        console.log('ODLLSetter is not deployed:::: ' + error);
      });
    })
    .catch(function(error) {
      console.log('ODLLUserWriter is not deployed:::: ' + error);
    });
  })
  .catch(function(error) {
    console.log('ODLLDB is not deployed:::: ' + error)
  });


  // // Add permission for ODLLSetter contract
  ODLLDB.at('0x40e5ebbf98340e150fe82a11d74d85c146eb860f').addPermittedContract("0x8224758d708b1d395a2ee3af474b58045c74b532")

  // // Add permission for ODLLUserWriter and ODLLUserReader contracts
  ODLLDB.at('0x40e5ebbf98340e150fe82a11d74d85c146eb860f').addPermittedContracts(["0xbc95bf2ecbb4ba529c05044c674dc126514678c2", "0x9e146c623f2462272482c61a834c8aae381d07a7"])

  // // Check permission status
  ODLLDB.at('0x40e5ebbf98340e150fe82a11d74d85c146eb860f').permissionStatusForContract("0xbc95bf2ecbb4ba529c05044c674dc126514678c2")
}
