pragma solidity 0.4.18;

import "./DB.sol";

contract Restrictor is Ownable {

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
    require(senderAddress == owner && senderAddress == DB(dbAddress).getAddressValue(keccak256('odll/owner')));
    _;
  }

  modifier onlyActiveAdmin {
    require(isActiveAdmin(msg.sender));
    _;
  }

  modifier onlyActiveManager {
    require(isActiveManager(msg.sender));
    _;
  }

  modifier onlyOwnerOrActiveAdminOrActiveManager {
    require(msg.sender == owner || isActiveAdmin(msg.sender) || isActiveManager(msg.sender));
    _;
  }

  modifier onlyOwnerOrActiveAdmin {
    require(msg.sender == owner || isActiveAdmin(msg.sender));
    _;
  }

  modifier onlyActiveDentist {
    require(isActiveDentist(msg.sender));
    _;
  }

  modifier onlyActivePatient {
    require(isActivePatient(msg.sender));
    _;
  }

  modifier onlyActiveUser {
    require(hasStatus(msg.sender, 1));
    _;
  }
  
  modifier onlyActiveAdminId(address userId) {
    require(isActiveAdmin(userId));
    _;
  }

  modifier onlyActiveManagerId(address userId) {
    require(isActiveManager(userId));
    _;
  }

  modifier onlyOwnerOrActiveAdminOrActiveManagerId(address userId) {
    require(userId == owner || isActiveAdmin(userId) || isActiveManager(userId));
    _;
  }

  modifier onlyOwnerOrActiveAdminId(address userId) {
    require(userId == owner || isActiveAdmin(userId));
    _;
  }

  modifier onlyActiveDentistId(address userId) {
    require(isActiveDentist(userId));
    _;
  }

  modifier onlyActivePatientId(address userId) {
    require(isActivePatient(userId));
    _;
  }

  modifier onlyActiveUserId(address userId) {
    require(hasStatus(userId, 1));
    _;
  }

  function setSmartContractStatus(
    uint8 _status
  )
    internal
    onlyOwner
  {
    smartContractStatus = _status;
    OnSmartContractStatusSet(_status);
  }

  function isActiveAdmin(address userId) internal view returns(bool) {
    return isUserType(userId, 4) && hasStatus(userId, 1);
  }

  function isActiveManager(address userId) internal view returns(bool) {
    return isUserType(userId, 3) && hasStatus(userId, 1);
  }

  function isActiveDentist(address userId) internal view returns(bool) {
    return isUserType(userId, 2) && hasStatus(userId, 1);
  }

  function isActivePatient(address userId) internal view returns(bool) {
    return isUserType(userId, 1) && hasStatus(userId, 1);
  }

  function hasStatus(address userId, uint8 status) internal view returns(bool) {
    return status == getStatus(userId);
  }

  function getStatus(address userId) internal view returns(uint8) {
    return DB(dbAddress).getUInt8Value(keccak256("user/status", userId));
  }

  function isUserType(address userId, uint8 userType) internal view returns(bool) {
    return userType == getUserType(userId);
  }

  function getUserType(address userId) internal view returns(uint8) {
    return DB(dbAddress).getUInt8Value(keccak256("user/type", userId));
  }
}
