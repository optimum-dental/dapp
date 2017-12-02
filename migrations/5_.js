var contract = require('truffle-contract');
var DBConfigObject = require('../build/contracts/DB.json');

var Escrow = artifacts.require("./odll/Escrow.sol");

var ScanApplicationWriter2 = artifacts.require("./odll/ScanApplicationWriter2.sol");

var TreatmentApplicationWriter2 = artifacts.require("./odll/TreatmentApplicationWriter2.sol");

var DBContract = contract(DBConfigObject);
DBContract.setProvider(web3.currentProvider);

var dbAddress = DBContract.deployed()
.then(function(instance) {
  return instance.address;
})
.catch(function(error) {
  console.log(':::::::Unable to get deployed DB')
});

module.exports = function (deployer) {
  deployer.deploy(Escrow, dbAddress);

  deployer.deploy(ScanApplicationWriter2, dbAddress);

  deployer.deploy(TreatmentApplicationWriter2, dbAddress);
};
