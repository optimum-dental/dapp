var contract = require('truffle-contract');
var DBConfigObject = require('../build/contracts/DB.json');

var Escrow = artifacts.require("./odll/Escrow.sol");

var DBContract = contract(DBConfigObject);
DBContract.setProvider(web3.currentProvider);

var dbAddress = DBContract.deployed()
.then(function(instance) {
  return instance.address;
});

module.exports = function (deployer) {
  deployer.deploy(Escrow, dbAddress);
};
