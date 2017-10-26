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


  // // Remove permission from old ODLLUserWriter contract
  // ODLLDB.at('0x4c1f2c100ee52d874aa6cf22c22b3a75e998cd30').removePermittedContract("0xa55f456cea5326579970d49951eeb0c1be474710")

  // // Add permission for ODLLUserWriter contract
  // ODLLDB.at('0x4c1f2c100ee52d874aa6cf22c22b3a75e998cd30').addPermittedContract("0xf1272928fbd783c6f81f9a6917e3b1eff4259b03")

  // // Check permission status
  // ODLLDB.at('0x4c1f2c100ee52d874aa6cf22c22b3a75e998cd30').permissionStatusForContract("0xf1272928fbd783c6f81f9a6917e3b1eff4259b03")








// REMOVE THE FROM FIELD IF NECESSARY

  // ODLLDB.at('0x4c1f2c100ee52d874aa6cf22c22b3a75e998cd30').then((instance) => { instance.addPermittedContracts(["0xf4e1d91c665d03a032877f89ca8f8bf9925dda32", "0xf1272928fbd783c6f81f9a6917e3b1eff4259b03", "0x4aa6e72bf0e88816c27abe80617cbec36986d629"], { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })}).catch((error) => console.log(111111, error))

  // ODLLSetter.at('0xf4e1d91c665d03a032877f89ca8f8bf9925dda32').setOwner({ from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })

  // ODLLSetter.at('0xf4e1d91c665d03a032877f89ca8f8bf9925dda32').setODLLConfig({ from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })


  /* Ignore
  // ODLLSetter.at('0xf4e1d91c665d03a032877f89ca8f8bf9925dda32').setContract("contract/odll-user-writer", "0xf1272928fbd783c6f81f9a6917e3b1eff4259b03", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
  // ODLLSetter.at('0xf4e1d91c665d03a032877f89ca8f8bf9925dda32').setContract("contract/odll-user-reader", "0x4aa6e72bf0e88816c27abe80617cbec36986d629", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
  */


  // ODLLSetter.at('0xf4e1d91c665d03a032877f89ca8f8bf9925dda32').setFirstAdmin("0x95be98c570bd1748aeb33aa7d3d800d9ad91fd22", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })

  // ODLLUserWriter.at('0xf1272928fbd783c6f81f9a6917e3b1eff4259b03').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) -- Quadri
  // ODLLUserWriter.at('0xf1272928fbd783c6f81f9a6917e3b1eff4259b03').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) -- Tina

  // ODLLDB.at('0x4c1f2c100ee52d874aa6cf22c22b3a75e998cd30').getPermittedContracts()

  // ODLLDB.at('0x4c1f2c100ee52d874aa6cf22c22b3a75e998cd30').getAddressValue('0xe901f0b43f920fc0b85fb414d10fafdf40d2a0b21a6397d54c1f5c09529e47a9') // check owner

  // ODLLDB.at('0x4c1f2c100ee52d874aa6cf22c22b3a75e998cd30').getAddressValue('0xa2a70261844f353edc399d2fe91ce30b0e72f9cddd7ddaab87a3b0b66bc7390b') // check ODLLUserWriter Contract

  // ODLLDB.at('0x4c1f2c100ee52d874aa6cf22c22b3a75e998cd30').getAddressValue('0x0f6f723d4ae6fa8d6cb219977b9c034e21574f8183956d459a70e20897c43340') // check first admin
}
