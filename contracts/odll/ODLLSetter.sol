pragma solidity ^0.4.11;

import "./ODLLRestrictor.sol";
import "./ODLLDB.sol";
import "./ODLLUser.sol";

contract ODLLSetter is ODLLRestrictor {
  event ODLLUserContractSet(address ODLLUserContractAddress, uint settingTime);

  function ODLLSetter(address dbAddress) {
    require(dbAddress != 0x0);
    dbAddress = dbAddress;
    setODLLConfig();
  }

  function setODLLConfig()
    onlyOwner
    internal
  {
    ODLLDB(dbAddress).setAddressValue(sha3('odll/owner'), owner);
    ODLLDB(dbAddress).setUIntValue(sha3('config/max-user-name-length'), 32);
    ODLLDB(dbAddress).setUIntValue(sha3('config/min-user-name-length'), 5);
  }

  function setODLLUserContract(address dbAddress, address newODLLUserContractAddress)
    onlyOwner
  {
    address oldODLLUserContractAddress = ODLLDB(dbAddress).getAddressValue(sha3('contract/odll-user', owner));
    if(oldODLLUserContractAddress != 0x0) {
      destroyODLLUserContract(oldODLLUserContractAddress, newODLLUserContractAddress);
    }

    ODLLDB(dbAddress).setAddressValue(sha3('contract/odll-user', owner), newODLLUserContractAddress);
    ODLLUserContractSet(newODLLUserContractAddress, now);
  }

  function getODLLUserContractAddress()
    onlyOwner
    constant returns (address)
  {
    ODLLDB(dbAddress).getAddressValue(sha3('contract/odll-user', owner));
  }

  function destroyODLLUserContract(address oldODLLUserContractAddress, address newODLLUserContractAddress)
    onlyOwnerCanCall(owner)
    internal
  {
    ODLLUser(oldODLLUserContractAddress).destroySelf(owner, newODLLUserContractAddress);
  }
}
