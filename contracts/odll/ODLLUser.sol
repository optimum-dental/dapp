pragma solidity ^0.4.11;

import "./ODLLRestrictor.sol";
import "../lib/odll/userManager.sol";
import "../lib/arachnid/solidity-stringutils/strings.sol";
// import "../abstract/odll/userManager.sol";
// import "../abstract/strings.sol";

contract ODLLUser is ODLLRestrictor {
  event OnAdminAdded(address userId);
  event OnDentistAdded(address userId);
  event OnManagerAdded(address userId);
  event OnPatientAdded(address userId);

  function ODLLUser(address dbAddress) {
    require(dbAddress != 0x0);
    dbAddress = dbAddress;
  }

  function setUser(
    uint8 userType,
    string name,
    string email,
    bytes32 gravatar,
    bytes32 street,
    bytes32 city,
    uint state,
    uint zipCode,
    uint country
  )
    onlyPermittedSmartContract
  {
    // userType: { 1 => 'patient', 2 => 'dentist', 3 => 'odll manager', 4 => 'odll admin' }
    userManager.setUser(dbAddress, msg.sender, userType, name, email, gravatar, street, city, state, zipCode, country);
  }

  function writePatient(
    uint8 userType,
    string name,
    string email,
    bytes32 gravatar,
    bytes32 street,
    bytes32 city,
    uint state,
    uint zipCode,
    uint country,
    bytes32 phoneNumber,
    bytes32 socialSecurityNumber,
    bytes32 birthday,
    uint8 gender
  )
    onlyPermittedSmartContract
  {
    setUser(userType, name, email, gravatar, street, city, state, zipCode, country);
    setPatient(phoneNumber, socialSecurityNumber, birthday, gender);
  }

  function setPatient(
    bytes32 phoneNumber,
    bytes32 socialSecurityNumber,
    bytes32 birthday,
    uint8 gender
  )
    onlyPermittedSmartContract
    onlyActiveUser
  {
    userManager.setPatient(dbAddress, msg.sender, phoneNumber, socialSecurityNumber, birthday, gender);
  }

  function writeDentist(
    uint8 userType,
    string name,
    string email,
    bytes32 gravatar,
    bytes32 street,
    bytes32 city,
    uint state,
    uint zipCode,
    uint country,
    bytes32 phoneNumber,
    bytes32 socialSecurityNumber,
    bytes32 birthday,
    uint8 gender,
    bool isODLLDentist,
    bool isAvailable
  )
    onlyPermittedSmartContract
  {
    setUser(userType, name, email, gravatar, street, city, state, zipCode, country);
    setDentist(phoneNumber, socialSecurityNumber, birthday, gender, isODLLDentist, isAvailable);
  }

  function setDentist(
    bytes32 phoneNumber,
    bytes32 socialSecurityNumber,
    bytes32 birthday,
    uint8 gender,
    bool isODLLDentist,
    bool isAvailable
  )
    onlyPermittedSmartContract
    onlyActiveUser
  {
    userManager.setDentist(dbAddress, msg.sender, phoneNumber, socialSecurityNumber, birthday, gender, isODLLDentist, isAvailable);
  }

  function writeManager(
    uint8 userType,
    string name,
    string email,
    bytes32 gravatar,
    bytes32 street,
    bytes32 city,
    uint state,
    uint zipCode,
    uint country,
    bytes32 phoneNumber,
    bytes32 socialSecurityNumber,
    bytes32 birthday,
    uint8 gender
  )
    onlyPermittedSmartContract
  {
    setUser(userType, name, email, gravatar, street, city, state, zipCode, country);
    setManager(phoneNumber, socialSecurityNumber, birthday, gender);
  }

  function setManager(
    bytes32 phoneNumber,
    bytes32 socialSecurityNumber,
    bytes32 birthday,
    uint8 gender
  )
    onlyPermittedSmartContract
    onlyActiveUser
  {
    userManager.setManager(dbAddress, msg.sender, phoneNumber, socialSecurityNumber, birthday, gender);
  }

  function writeAdmin(
    uint8 userType,
    string name,
    string email,
    bytes32 gravatar,
    bytes32 street,
    bytes32 city,
    uint state,
    uint zipCode,
    uint country,
    bytes32 phoneNumber,
    bytes32 socialSecurityNumber,
    bytes32 birthday,
    uint8 gender
  )
    onlyPermittedSmartContract
  {
    setUser(userType, name, email, gravatar, street, city, state, zipCode, country);
    setAdmin(phoneNumber, socialSecurityNumber, birthday, gender);
  }

  function setAdmin(
    bytes32 phoneNumber,
    bytes32 socialSecurityNumber,
    bytes32 birthday,
    uint8 gender
  )
    onlyPermittedSmartContract
    onlyActiveUser
  {
    userManager.setAdmin(dbAddress, msg.sender, phoneNumber, socialSecurityNumber, birthday, gender);
  }

  function getUserData()
    onlyPermittedSmartContract
    onlyActiveUser
    returns (
      uint8,
      // string,
      // string,
      // bytes32,
      // bytes32,
      // bytes32,
      // uint,
      // uint,
      // uint,
      bytes32,
      bytes32,
      bytes32,
      uint8
      // bool,
      // bool
    )
  {
    return userManager.getUserData(dbAddress, msg.sender);
  }

  function destroySelf(address callerAddress, address newContractAddress)
    onlyOwnerCanCall(callerAddress)
  {
    selfdestruct(newContractAddress);
  }
}
