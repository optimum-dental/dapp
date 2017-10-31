var contract = require('truffle-contract');
var ODLLDBConfigObject = require('../build/contracts/ODLLDB.json');

var ODLLUserWriter = artifacts.require("./odll/ODLLUserWriter.sol");
var ODLLUserReader = artifacts.require("./odll/ODLLUserReader.sol");

var ODLLDBContract = contract(ODLLDBConfigObject);
ODLLDBContract.setProvider(web3.currentProvider);

var dbAddress = ODLLDBContract.deployed()
.then(function(instance) {
  return instance.address;
});

module.exports = function (deployer) {
  deployer.deploy(ODLLUserWriter, dbAddress);
  deployer.deploy(ODLLUserReader, dbAddress);
};
