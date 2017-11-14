pragma solidity 0.4.18;

import "./Restrictor.sol";

contract Setter is Restrictor {
  event ContractSet(address ContractAddress, bytes32 record, uint settingTime);

  function Setter(address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  function setConfig()
    external
    onlyOwner
  {
    DB(dbAddress).setUIntValue(keccak256('config/max-user-name-length'), 50);
    DB(dbAddress).setUIntValue(keccak256('config/min-user-name-length'), 5);
    DB(dbAddress).setUIntValue(keccak256('config/max-user-email-length'), 80);
    DB(dbAddress).setUIntValue(keccak256('config/min-user-email-length'), 0);
    DB(dbAddress).setUIntValue(keccak256('config/max-company-name-length'), 50);
    DB(dbAddress).setUIntValue(keccak256('config/min-company-name-length'), 5);
  }

  function setOwner()
    external
    onlyOwner
  {
    DB(dbAddress).setAddressValue(keccak256('odll/owner'), owner);
  }

  function setPaymentAddress(address paymentAddress)
    external
    onlyOwnerCanCall(msg.sender)
  {
    DB(dbAddress).setAddressValue(keccak256('odll/payment-address'), paymentAddress);
  }

  function setScanPaymentPercentage(uint paymentPercentage)
    external
    onlyOwnerCanCall(msg.sender)
  {
    DB(dbAddress).setUIntValue(keccak256('odll/scan-payment-percentage'), paymentPercentage);
  }

  function setTreatmentPaymentPercentage(uint paymentPercentage)
    external
    onlyOwnerCanCall(msg.sender)
  {
    DB(dbAddress).setUIntValue(keccak256('odll/treatment-payment-percentage'), paymentPercentage);
  }

  function setFirstAdmin(address firstAdminAddress)
    external
    onlyOwnerCanCall(msg.sender)
  {
    require(DB(dbAddress).getUInt8Value(keccak256("user/type", firstAdminAddress)) == 0);
    DB(dbAddress).setAddressValue(keccak256('odll/first-admin'), firstAdminAddress);
    addAdmin(firstAdminAddress);
  }

  function addAdmin(address adminAddress)
    public
    onlyOwnerCanCall(msg.sender)
  {
    require(DB(dbAddress).getUInt8Value(keccak256("user/type", adminAddress)) == 0);
    DB(dbAddress).setUInt8Value(keccak256("user/type", adminAddress), 4);
    DB(dbAddress).setBooleanValue(keccak256('user/is-admin?', adminAddress), true);
    DB(dbAddress).setUIntValue(keccak256("user/created-on", adminAddress), now);
    DB(dbAddress).setUInt8Value(keccak256("user/status", adminAddress), 1);
    addArrayItem("users/ids", "users/count", adminAddress);
    addArrayItem("admins/ids", "admins/count", adminAddress);
  }

  function addArrayItem(string key, string countKey, address val) internal {
    var idx = DB(dbAddress).getUIntValue(keccak256(countKey));
    DB(dbAddress).setAddressValue(keccak256(key, idx), val);
    DB(dbAddress).setUIntValue(keccak256(countKey), idx + 1);
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
    DB(dbAddress).setAddressValue(record, newContractAddress);
  }

  function getContractAddress(bytes32 record)
    external
    onlyOwnerCanCall(msg.sender)
    view returns (address)
  {
    DB(dbAddress).getAddressValue(record);
  }
}

