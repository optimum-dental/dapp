var contract = require('truffle-contract');
var DBConfigObject = require('../build/contracts/DB.json');

var ScanRequestReader2 = artifacts.require("./odll/ScanRequestReader2.sol");

var TreatmentRequestReader2 = artifacts.require("./odll/TreatmentRequestReader2.sol");

var DBContract = contract(DBConfigObject);
DBContract.setProvider(web3.currentProvider);

var dbAddress = DBContract.deployed()
.then(function(instance) {
  return instance.address;
});

module.exports = function (deployer) {
  deployer.deploy(ScanRequestReader2, dbAddress);

  deployer.deploy(TreatmentRequestReader2, dbAddress);
};
