pragma solidity ^0.4.11;

import "./ODLLSetter.sol";
import "../lib/odll/userManager.sol";
import "../lib/arachnid/solidity-stringutils/strings.sol";

contract ODLLUser is ODLLSetter {
  using strings for *;

  event OnAdminAdded(address userId);
  event OnDentistAdded(address userId);
  event OnManagerAdded(address userId);
  event OnPatientAdded(address userId);

  function ODLLUser(address _ODLLDB) {
    require(_ODLLDB != 0x0);
    ODLLDB = _ODLLDB;
  }

  function setUser(
    uint8 userType,
    string lastName,
    string firstName,
    string middleName,
    string email,
    bytes32 gravatar,
    string street,
    string city,
    uint state,
    uint zipCode,
    uint country,
    bytes32 phoneNumber,
    uint areaNumber,
    uint groupNumber,
    uint sequenceNumber,
    uint32 day,
    uint32 month,
    uint32 year,
    uint8 gender
  )
    onlyPermittedSmartContract
  {
    userManager.setUser(ODLLDB, msg.sender, userType, lastName, firstName, middleName, email, gravatar, street, city, state, zipCode, country, phoneNumber, areaNumber, groupNumber, sequenceNumber, gender);
  }

  function writeUser(
    uint8 userType,
    string lastName,
    string firstName,
    string middleName,
    string email,
    bytes32 gravatar,
    string street,
    string city,
    uint state,
    uint zipCode,
    uint country,
    bytes32 phoneNumber,
    uint areaNumber,
    uint groupNumber,
    uint sequenceNumber,
    uint32 day,
    uint32 month,
    uint32 year,
    uint8 gender
  )
    onlyPermittedSmartContract
  {
    // userType: { 1 => 'patient', 2 => 'dentist', 3 => 'odll manager', 4 => 'odll admin' }
    setUser(userType, lastName, firstName, middleName, email, gravatar, street, city, state, zipCode, country, phoneNumber, areaNumber, groupNumber, sequenceNumber, gender);
    if(userType == 1) {
      setPatient();
      OnPatientAdded(msg.sender);
    } else if (userType == 2) {
      setDentist();
      OnDentistAdded(msg.sender);
    } else if (userType == 3) {
      setManager();
      OnManagerAdded(msg.sender);
    } else if (userType == 4) {
      setAdmin();
      OnAdminAdded(msg.sender);
    }
  }

  function setPatient()
    onlyPermittedSmartContract
    onlyActiveUser
  {
    userManager.setPatient(ODLLDB, msg.sender);
  }

  function setDentist(bool isODLLDentist, bool isAvailable)
    onlyPermittedSmartContract
    onlyActiveUser
  {
    userManager.setDentist(ODLLDB, msg.sender, isODLLDentist, isAvailable);
  }

  function setManager()
    onlyPermittedSmartContract
    onlyActiveUser
  {
    userManager.setManager(ODLLDB, msg.sender);
  }

  function setAdmin()
    onlyPermittedSmartContract
    onlyActiveUser
  {
    userManager.setAdmin(ODLLDB, msg.sender);
  }

  function getUserData()
    onlyPermittedSmartContract
    onlyActiveUser
  {
    return UserManager.getUserData()
  }
}
