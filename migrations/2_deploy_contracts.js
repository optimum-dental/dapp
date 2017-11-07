var DB = artifacts.require("./odll/DB.sol");

module.exports = function (deployer) {
  deployer.deploy(DB);
};
