var contract = require('truffle-contract');
var DBConfigObject = require('../build/contracts/DB.json');

var ScanApplicationWriter2 = artifacts.require("./odll/ScanApplicationWriter2.sol");

var TreatmentApplicationWriter2 = artifacts.require("./odll/TreatmentApplicationWriter2.sol");

var Escrow = artifacts.require("./odll/Escrow.sol");

var DBContract = contract(DBConfigObject);
DBContract.setProvider(web3.currentProvider);

var dbAddress = DBContract.deployed()
.then(function(instance) {
  return instance.address;
});

module.exports = function (deployer) {
  deployer.deploy(ScanApplicationWriter2, dbAddress);

  deployer.deploy(TreatmentApplicationWriter2, dbAddress);

  deployer.deploy(Escrow, dbAddress);
};
