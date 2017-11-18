var contract = require('truffle-contract');
var DBConfigObject = require('../build/contracts/DB.json');

var ScanRequestWriter = artifacts.require("./odll/ScanRequestWriter.sol");

var TreatmentRequestWriter = artifacts.require("./odll/TreatmentRequestWriter.sol");

var DBContract = contract(DBConfigObject);
DBContract.setProvider(web3.currentProvider);

var dbAddress = DBContract.deployed()
.then(function(instance) {
  return instance.address;
});

module.exports = function (deployer) {
  deployer.deploy(ScanRequestWriter, dbAddress);

  deployer.deploy(TreatmentRequestWriter, dbAddress);
};
