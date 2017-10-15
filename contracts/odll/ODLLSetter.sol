pragma solidity ^0.4.11;

import "./ODLLRestrictor.sol";
import "./ODLLUser.sol";

contract ODLLSetter is ODLLRestrictor {
  event ContractSet(address ContractAddress, bytes32 record, uint settingTime);

  function ODLLSetter(address _dbAddress) {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  function setODLLConfig()
    onlyOwner
  {
    ODLLDB(dbAddress).setUIntValue(sha3('config/max-user-name-length'), 32);
    ODLLDB(dbAddress).setUIntValue(sha3('config/min-user-name-length'), 5);
  }

  function setOwner()
    onlyOwner
  {
    ODLLDB(dbAddress).setAddressValue(sha3('odll/owner'), owner);
  }

  function setFirstAdmin(address firstAdminAdress)
    onlyOwnerCanCall(msg.sender)
  {
    ODLLDB(dbAddress).setAddressValue(sha3('odll/first-admin'), firstAdminAdress);
    ODLLDB(dbAddress).setUInt8Value(sha3("user/type", firstAdminAdress), 4);
    ODLLDB(dbAddress).setBooleanValue(sha3('user/is-admin?', firstAdminAdress), true);
    ODLLDB(dbAddress).setUIntValue(sha3("user/created-on", firstAdminAdress), now);
    ODLLDB(dbAddress).setUInt8Value(sha3("user/status", firstAdminAdress), 1);
    utilities.addArrayItem(dbAddress, "users/ids", "users/count", firstAdminAdress);
    utilities.addArrayItem(dbAddress, "admins/ids", "admins/count", firstAdminAdress);
  }

  function setContract(string dbKey, address newContractAddress)
    onlyOwnerCanCall(msg.sender)
  {
    // record: { ODLLUser: sha3('contract/odll-user') }
    bytes32 record = sha3(dbKey);
    setNewContractAddressToKey(record, newContractAddress);
    ContractSet(newContractAddress, record, now);
  }

  function setNewContractAddressToKey(bytes32 record, address newContractAddress)
    internal
    onlyOwnerCanCall(msg.sender)
  {
    require(newContractAddress != 0x0);
    ODLLDB(dbAddress).setAddressValue(record, newContractAddress);
  }

  function selfDestructOldContractToNewContract(bytes32 record, address oldContractAddress, address newContractAddress)
    onlyOwnerCanCall(msg.sender)
  {
    if (oldContractAddress != 0x0 && ODLLDB(dbAddress).permissionStatusForContract(oldContractAddress) && ODLLDB(dbAddress).permissionStatusForContract(newContractAddress)) {
      destroyOldContract(record, oldContractAddress, newContractAddress);
    }
  }

  function getContractAddress(bytes32 record)
    onlyOwnerCanCall(msg.sender)
    constant returns (address)
  {
    ODLLDB(dbAddress).getAddressValue(record);
  }

  function destroyOldContract(bytes32 record, address oldContractAddress, address newContractAddress)
    onlyOwnerCanCall(msg.sender)
    internal
  {
    if (record == sha3('contract/odll-user')) {
      ODLLUser(oldContractAddress).destroySelf(msg.sender, newContractAddress);
    }
  }
}
