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
  // ODLLDB.at('0x4ed9487872aa168fbeb6ec8549f2bf79c9016add').removePermittedContract("0xa55f456cea5326579970d49951eeb0c1be474710")

  // // Add permission for ODLLUser contract
  // ODLLDB.at('0x4ed9487872aa168fbeb6ec8549f2bf79c9016add').addPermittedContract("0xed4b2724a6afef5c40d0a646346f8a9e7eba338f")

  // // Check permission status
  // ODLLDB.at('0x4ed9487872aa168fbeb6ec8549f2bf79c9016add').permissionStatusForContract("0xed4b2724a6afef5c40d0a646346f8a9e7eba338f")






  // ODLLDB.at('0x4ed9487872aa168fbeb6ec8549f2bf79c9016add').then((instance) => { instance.addPermittedContracts(["0x6ada7ab35b468c416d0b60465403c0b9baceb719", "0xed4b2724a6afef5c40d0a646346f8a9e7eba338f"], { from: "0x3b26a28666a28e5037613947ac09dcf5d6caf7b9" })}).catch((error) => console.log(111111, error))

  // ODLLSetter.at('0x6ada7ab35b468c416d0b60465403c0b9baceb719').setOwner({ from: "0x3b26a28666a28e5037613947ac09dcf5d6caf7b9" })

  // ODLLSetter.at('0x6ada7ab35b468c416d0b60465403c0b9baceb719').setODLLConfig({ from: "0x3b26a28666a28e5037613947ac09dcf5d6caf7b9" })

  // ODLLSetter.at('0x6ada7ab35b468c416d0b60465403c0b9baceb719').setContract("contract/odll-user", "0xed4b2724a6afef5c40d0a646346f8a9e7eba338f", { from: "0x3b26a28666a28e5037613947ac09dcf5d6caf7b9" })

  // ODLLSetter.at('0x6ada7ab35b468c416d0b60465403c0b9baceb719').setFirstAdmin("0x3b26a28666a28e5037613947ac09dcf5d6caf7b9", { from: "0x3b26a28666a28e5037613947ac09dcf5d6caf7b9" })


  // ODLLDB.at('0x4ed9487872aa168fbeb6ec8549f2bf79c9016add').getPermittedContracts()

  // ODLLDB.at('0x4ed9487872aa168fbeb6ec8549f2bf79c9016add').getAddressValue('0xe901f0b43f920fc0b85fb414d10fafdf40d2a0b21a6397d54c1f5c09529e47a9') // check owner

  // ODLLDB.at('0x4ed9487872aa168fbeb6ec8549f2bf79c9016add').getAddressValue('0xa2a70261844f353edc399d2fe91ce30b0e72f9cddd7ddaab87a3b0b66bc7390b') // check ODLLUser Contract

  // ODLLDB.at('0x4ed9487872aa168fbeb6ec8549f2bf79c9016add').getAddressValue('0x0f6f723d4ae6fa8d6cb219977b9c034e21574f8183956d459a70e20897c43340') // check first admin
}
