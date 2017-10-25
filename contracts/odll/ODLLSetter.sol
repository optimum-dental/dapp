pragma solidity 0.4.17;

import "./ODLLRestrictor.sol";

contract ODLLSetter is ODLLRestrictor {
  event ContractSet(address ContractAddress, bytes32 record, uint settingTime);

  function ODLLSetter(address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  function setODLLConfig()
    external
    onlyOwner
  {
    ODLLDB(dbAddress).setUIntValue(keccak256('config/max-user-name-length'), 32);
    ODLLDB(dbAddress).setUIntValue(keccak256('config/min-user-name-length'), 5);
  }

  function setOwner()
    external
    onlyOwner
  {
    ODLLDB(dbAddress).setAddressValue(keccak256('odll/owner'), owner);
  }

  function setFirstAdmin(address firstAdminAddress)
    external
    onlyOwnerCanCall(msg.sender)
  {
    require(ODLLDB(dbAddress).getUInt8Value(keccak256("user/type", firstAdminAddress)) == 0);
    ODLLDB(dbAddress).setAddressValue(keccak256('odll/first-admin'), firstAdminAddress);
    addAdmin(firstAdminAddress);
  }

  function addAdmin(address adminAddress)
    public
    onlyOwnerCanCall(msg.sender)
  {
    require(ODLLDB(dbAddress).getUInt8Value(keccak256("user/type", adminAddress)) == 0);
    ODLLDB(dbAddress).setUInt8Value(keccak256("user/type", adminAddress), 4);
    ODLLDB(dbAddress).setBooleanValue(keccak256('user/is-admin?', adminAddress), true);
    ODLLDB(dbAddress).setUIntValue(keccak256("user/created-on", adminAddress), now);
    ODLLDB(dbAddress).setUInt8Value(keccak256("user/status", adminAddress), 1);
    addArrayItem("users/ids", "users/count", adminAddress);
    addArrayItem("admins/ids", "admins/count", adminAddress);
  }

  function addArrayItem(string key, string countKey, address val) internal {
    var idx = ODLLDB(dbAddress).getUIntValue(keccak256(countKey));
    ODLLDB(dbAddress).setAddressValue(keccak256(key, idx), val);
    ODLLDB(dbAddress).setUIntValue(keccak256(countKey), idx + 1);
  }

  function setContract(string dbKey, address newContractAddress)
    external
    onlyOwnerCanCall(msg.sender)
  {
    bytes32 record = keccak256(dbKey);
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

  function getContractAddress(bytes32 record)
    external
    onlyOwnerCanCall(msg.sender)
    view returns (address)
  {
    ODLLDB(dbAddress).getAddressValue(record);
  }
}

