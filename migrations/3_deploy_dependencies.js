var contract = require('truffle-contract');
var ODLLDBConfigObject = require('../build/contracts/ODLLDB.json');

var ODLLUser = artifacts.require("./odll/ODLLUser.sol");
var ODLLSetter = artifacts.require("./odll/ODLLSetter.sol");

var ODLLDBContract = contract(ODLLDBConfigObject);
ODLLDBContract.setProvider(web3.currentProvider);

var dbAddress = ODLLDBContract.deployed()
.then(function(instance) {
  return instance.address;
});

module.exports = function (deployer) {
  deployer.deploy(ODLLUser, dbAddress);
  deployer.deploy(ODLLSetter, dbAddress);
};
