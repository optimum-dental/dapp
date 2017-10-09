pragma solidity ^0.4.11;

import "../zeppelin/ownership/Ownable.sol";
import "./ODLLDB.sol";
import "../lib/odll/userManager.sol";

contract ODLLRestrictor is Ownable {

  address public dbAddress;
  uint8 public smartContractStatus;
  event OnSmartContractStatusSet(uint8 status);

  modifier onlyPermittedSmartContract {
    require(smartContractStatus == 0);
    _;
  }

  // Just to double-check ownership
  modifier onlyOwnerCanCall(address senderAddress)
  {
    require(senderAddress == owner && senderAddress == ODLLDB(dbAddress).getAddressValue(sha3('odll/owner')));
    _;
  }

  modifier onlyActiveDentist {
    require(userManager.isActiveDentist(dbAddress, msg.sender));
    _;
  }

  modifier onlyActivePatient {
    require(userManager.isActivePatient(dbAddress, msg.sender));
    _;
  }

  modifier onlyActiveUser {
    require(userManager.hasStatus(dbAddress, msg.sender, 1));
    _;
  }

  function setSmartContractStatus(
    uint8 _status
  )
    onlyOwner
  {
    smartContractStatus = _status;
    OnSmartContractStatusSet(_status);
  }
}
