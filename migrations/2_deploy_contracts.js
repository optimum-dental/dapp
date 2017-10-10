var ODLLDB = artifacts.require("./odll/ODLLDB.sol");

module.exports = function (deployer) {
  deployer.deploy(ODLLDB);
};
