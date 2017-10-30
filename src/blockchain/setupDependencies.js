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
  ODLLDB.at('0x7ea2b2c510b047ad8ad8b1863fcfd9e9487a23c9').addPermittedContract("0x10d3df40d6a10a68753f7164305c72ea03a6657f")

  // // Add permission for ODLLUserWriter and ODLLUserReader contracts
  ODLLDB.at('0x7ea2b2c510b047ad8ad8b1863fcfd9e9487a23c9').addPermittedContracts(["0x7e41c59700908cf55131b35cee646cbc7984b851", "0xfeb09c3bfea120bbf7cf03c1d13359502e7caad2"])

  // // Check permission status
  ODLLDB.at('0x7ea2b2c510b047ad8ad8b1863fcfd9e9487a23c9').permissionStatusForContract("0x7e41c59700908cf55131b35cee646cbc7984b851")








// REMOVE THE FROM FIELD IF NECESSARY

  // ODLLDB.at('0x7ea2b2c510b047ad8ad8b1863fcfd9e9487a23c9').then((instance) => { instance.addPermittedContracts(["0x10d3df40d6a10a68753f7164305c72ea03a6657f", "0x7e41c59700908cf55131b35cee646cbc7984b851", "0xfeb09c3bfea120bbf7cf03c1d13359502e7caad2"], { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })}).catch((error) => console.log(111111, error))

  ODLLSetter.at('0x10d3df40d6a10a68753f7164305c72ea03a6657f').setOwner()

  ODLLSetter.at('0x10d3df40d6a10a68753f7164305c72ea03a6657f').setODLLConfig()


  /* Ignore
  // ODLLSetter.at('0x10d3df40d6a10a68753f7164305c72ea03a6657f').setContract("contract/odll-user-writer", "0x7e41c59700908cf55131b35cee646cbc7984b851", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
  // ODLLSetter.at('0x10d3df40d6a10a68753f7164305c72ea03a6657f').setContract("contract/odll-user-reader", "0xfeb09c3bfea120bbf7cf03c1d13359502e7caad2", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
  */


  ODLLSetter.at('0x10d3df40d6a10a68753f7164305c72ea03a6657f').setFirstAdmin("0x95be98c570bd1748aeb33aa7d3d800d9ad91fd22")

  ODLLUserWriter.at('0x7e41c59700908cf55131b35cee646cbc7984b851').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
  ODLLUserWriter.at('0x7e41c59700908cf55131b35cee646cbc7984b851').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina

  ODLLDB.at('0x7ea2b2c510b047ad8ad8b1863fcfd9e9487a23c9').getPermittedContracts()

  ODLLDB.at('0x7ea2b2c510b047ad8ad8b1863fcfd9e9487a23c9').getAddressValue('0xe901f0b43f920fc0b85fb414d10fafdf40d2a0b21a6397d54c1f5c09529e47a9') // check owner

  // ODLLDB.at('0x7ea2b2c510b047ad8ad8b1863fcfd9e9487a23c9').getAddressValue('0xa2a70261844f353edc399d2fe91ce30b0e72f9cddd7ddaab87a3b0b66bc7390b') // check ODLLUserWriter Contract

  ODLLDB.at('0x7ea2b2c510b047ad8ad8b1863fcfd9e9487a23c9').getAddressValue('0x0f6f723d4ae6fa8d6cb219977b9c034e21574f8183956d459a70e20897c43340') // check first admin
}
