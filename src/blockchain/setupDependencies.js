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








// REMOVE THE FROM FIELD IF NECESSARY

  // ODLLDB.at('0x40e5ebbf98340e150fe82a11d74d85c146eb860f').then((instance) => { instance.addPermittedContracts(["0x8224758d708b1d395a2ee3af474b58045c74b532", "0xbc95bf2ecbb4ba529c05044c674dc126514678c2", "0x9e146c623f2462272482c61a834c8aae381d07a7"], { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })}).catch((error) => console.log(111111, error))

  ODLLSetter.at('0x8224758d708b1d395a2ee3af474b58045c74b532').setOwner()

  ODLLSetter.at('0x8224758d708b1d395a2ee3af474b58045c74b532').setODLLConfig()


  /* Ignore
  // ODLLSetter.at('0x8224758d708b1d395a2ee3af474b58045c74b532').setContract("contract/odll-user-writer", "0xbc95bf2ecbb4ba529c05044c674dc126514678c2", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
  // ODLLSetter.at('0x8224758d708b1d395a2ee3af474b58045c74b532').setContract("contract/odll-user-reader", "0x9e146c623f2462272482c61a834c8aae381d07a7", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
  */


  ODLLSetter.at('0x8224758d708b1d395a2ee3af474b58045c74b532').setFirstAdmin("0x95be98c570bd1748aeb33aa7d3d800d9ad91fd22")

  ODLLUserWriter.at('0xbc95bf2ecbb4ba529c05044c674dc126514678c2').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
  ODLLUserWriter.at('0xbc95bf2ecbb4ba529c05044c674dc126514678c2').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina

  ODLLUserReader.at('0x9e146c623f2462272482c61a834c8aae381d07a7').getUserIdentityData('0x95be98c570bd1748aeb33aa7d3d800d9ad91fd22')

  ODLLDB.at('0x40e5ebbf98340e150fe82a11d74d85c146eb860f').getPermittedContracts()

  ODLLDB.at('0x40e5ebbf98340e150fe82a11d74d85c146eb860f').getAddressValue('0xe901f0b43f920fc0b85fb414d10fafdf40d2a0b21a6397d54c1f5c09529e47a9') // check owner

  // ODLLDB.at('0x40e5ebbf98340e150fe82a11d74d85c146eb860f').getAddressValue('0xa2a70261844f353edc399d2fe91ce30b0e72f9cddd7ddaab87a3b0b66bc7390b') // check ODLLUserWriter Contract

  ODLLDB.at('0x40e5ebbf98340e150fe82a11d74d85c146eb860f').getAddressValue('0x0f6f723d4ae6fa8d6cb219977b9c034e21574f8183956d459a70e20897c43340') // check first admin
}
