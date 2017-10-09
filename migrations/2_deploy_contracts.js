var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var SafeMath = artifacts.require("./zeppelin/math/SafeMath.sol");
// var PullPayment = artifacts.require("./zeppelin/payment/PullPayment.sol");
var strings = artifacts.require("./lib/arachnid/solidity-stringutils/strings.sol");
var ODLLDB = artifacts.require("./odll/ODLLDB.sol");
var utilities = artifacts.require("./lib/odll/utilities.sol");
var userManager = artifacts.require("./lib/odll/userManager.sol");
var ODLLRestrictor = artifacts.require("./odll/ODLLRestrictor.sol");
var ODLLUser = artifacts.require("./odll/ODLLUser.sol");
var ODLLSetter = artifacts.require("./odll/ODLLSetter.sol");


module.exports = function (deployer) {
  deployer.deploy(Ownable);
  deployer.deploy(SafeMath);
  deployer.deploy(strings);

  deployer.link(Ownable, ODLLDB);
  deployer.link(SafeMath, ODLLDB);
  deployer.link(strings, ODLLDB);
  deployer.deploy(ODLLDB)
  .then(function () {
    console.log('Outside return')
    return function () {
      console.log('Inside return')
      deployer.link(ODLLDB, utilities);
      deployer.deploy(utilities);

      deployer.link(ODLLDB, userManager);
      deployer.link(SafeMath, userManager);
      deployer.link(utilities, userManager);
      deployer.link(strings, userManager);
      deployer.deploy(userManager);

      deployer.link(Ownable, ODLLRestrictor);
      deployer.link(ODLLDB, ODLLRestrictor);
      deployer.link(userManager, ODLLRestrictor);
      ODLLDB.deployed()
      .then(function (instance) {
        return function () {
          var dbAddress = instance.address;
          console.log(12345, dbAddress)
          deployer.deploy(ODLLRestrictor, dbAddress)

          deployer.link(ODLLRestrictor, ODLLUser);
          deployer.link(userManager, ODLLUser);
          deployer.link(strings, ODLLUser);
          deployer.deploy(ODLLUser);

          deployer.link(ODLLRestrictor, ODLLSetter);
          deployer.link(ODLLDB, ODLLSetter);
          deployer.link(ODLLUser, ODLLSetter);
          deployer.deploy(ODLLSetter);
        }
      })
      .catch(function (error) {
        console.log(':::ODLLDB has not been deployed!')
      });
    }
  }).catch(function (error) {
    console.log(':::Unable to deploy ODLLDB!')
  });
};
