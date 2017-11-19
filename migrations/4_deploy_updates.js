var contract = require('truffle-contract');
var DBConfigObject = require('../build/contracts/DB.json');

var ScanApplicationWriter = artifacts.require("./odll/ScanApplicationWriter.sol");

var TreatmentApplicationWriter = artifacts.require("./odll/TreatmentApplicationWriter.sol");

var DBContract = contract(DBConfigObject);
DBContract.setProvider(web3.currentProvider);

var dbAddress = DBContract.deployed()
.then(function(instance) {
  return instance.address;
});

module.exports = function (deployer) {
  deployer.deploy(ScanApplicationWriter, dbAddress);

  deployer.deploy(TreatmentApplicationWriter, dbAddress);
};
