pragma solidity ^0.4.11;

import "../zeppelin/ownership/Ownable.sol";
import "../lib/userManager.sol";

contract ODLLSetter is Ownable {
  address public ODLLDB;
  uint8 public smartContractStatus;
  event onSmartContractStatusSet(uint8 status);

  modifier onlyPermittedSmartContract {
    require(smartContractStatus == 0);
    _;
  }

  modifier onlyActiveDentist {
    require(userManager.isActiveDentist(ODLLDB, msg.sender));
    _;
  }

  modifier onlyActivePatient {
    require(userManager.isActivePatient(ODLLDB, msg.sender));
    _;
  }

  modifier onlyActiveUser {
    require(userManager.hasStatus(ODLLDB, msg.sender, 1));
    _;
  }

  function setSmartContractStatus(
    uint8 _status
  )
    onlyOwner
  {
    smartContractStatus = _status;
    onSmartContractStatusSet(_status);
  }

  function getConfig(bytes32 key) constant returns(uint) {
    return ODLLDB(ODLLDB).getUIntValue(sha3("config/", key));
  }
}
