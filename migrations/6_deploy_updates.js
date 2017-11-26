var contract = require('truffle-contract');
var DBConfigObject = require('../build/contracts/DB.json');

var UserWriter = artifacts.require("./odll/UserWriter.sol");
var UserReader = artifacts.require("./odll/UserReader.sol");

var ServiceWriter = artifacts.require("./odll/ServiceWriter.sol");
var ServiceReader = artifacts.require("./odll/ServiceReader.sol");

var ScanRequestWriter = artifacts.require("./odll/ScanRequestWriter.sol");
var ScanRequestReader = artifacts.require("./odll/ScanRequestReader.sol");
var ScanRequestReader2 = artifacts.require("./odll/ScanRequestReader2.sol");

var ScanApplicationWriter = artifacts.require("./odll/ScanApplicationWriter.sol");
var ScanApplicationWriter2 = artifacts.require("./odll/ScanApplicationWriter2.sol");
var ScanApplicationReader = artifacts.require("./odll/ScanApplicationReader.sol");

var TreatmentRequestWriter = artifacts.require("./odll/TreatmentRequestWriter.sol");
var TreatmentRequestReader = artifacts.require("./odll/TreatmentRequestReader.sol");
var TreatmentRequestReader2 = artifacts.require("./odll/TreatmentRequestReader2.sol");

var TreatmentApplicationWriter = artifacts.require("./odll/TreatmentApplicationWriter.sol");
var TreatmentApplicationWriter2 = artifacts.require("./odll/TreatmentApplicationWriter2.sol");
var TreatmentApplicationReader = artifacts.require("./odll/TreatmentApplicationReader.sol");

var Escrow = artifacts.require("./odll/Escrow.sol");

var DBContract = contract(DBConfigObject);
DBContract.setProvider(web3.currentProvider);

var dbAddress = DBContract.deployed()
.then(function(instance) {
  return instance.address;
});

module.exports = function (deployer) {
  deployer.deploy(UserWriter, dbAddress);
  deployer.deploy(UserReader, dbAddress);

  deployer.deploy(ServiceWriter, dbAddress);
  deployer.deploy(ServiceReader, dbAddress);

  deployer.deploy(ScanRequestWriter, dbAddress);
  deployer.deploy(ScanRequestReader, dbAddress);
  deployer.deploy(ScanRequestReader2, dbAddress);

  deployer.deploy(ScanApplicationWriter, dbAddress);
  deployer.deploy(ScanApplicationWriter2, dbAddress);
  deployer.deploy(ScanApplicationReader, dbAddress);

  deployer.deploy(TreatmentRequestWriter, dbAddress);
  deployer.deploy(TreatmentRequestReader, dbAddress);
  deployer.deploy(TreatmentRequestReader2, dbAddress);

  deployer.deploy(TreatmentApplicationWriter, dbAddress);
  deployer.deploy(TreatmentApplicationWriter2, dbAddress);
  deployer.deploy(TreatmentApplicationReader, dbAddress);
  
  deployer.deploy(Escrow, dbAddress);
};
