var contract = require('truffle-contract');
var DBConfigObject = require('../build/contracts/DB.json');

var Setter = artifacts.require("./odll/Setter.sol");

var UserWriter = artifacts.require("./odll/UserWriter.sol");
var UserReader = artifacts.require("./odll/UserReader.sol");

var ServiceWriter = artifacts.require("./odll/ServiceWriter.sol");
var ServiceReader = artifacts.require("./odll/ServiceReader.sol");

var ScanAppointmentWriter = artifacts.require("./odll/ScanAppointmentWriter.sol");
var ScanApplicationWriter = artifacts.require("./odll/ScanApplicationWriter.sol");
var TreatmentRequestWriter = artifacts.require("./odll/TreatmentRequestWriter.sol");

var DBContract = contract(DBConfigObject);
DBContract.setProvider(web3.currentProvider);

var dbAddress = DBContract.deployed()
.then(function(instance) {
  return instance.address;
});

module.exports = function (deployer) {
  deployer.deploy(Setter, dbAddress);

  deployer.deploy(UserWriter, dbAddress);
  deployer.deploy(UserReader, dbAddress);

  deployer.deploy(ServiceWriter, dbAddress);
  deployer.deploy(ServiceReader, dbAddress);

  deployer.deploy(ScanAppointmentWriter, dbAddress);
  deployer.deploy(ScanApplicationWriter, dbAddress);
  deployer.deploy(TreatmentRequestWriter, dbAddress);
};
