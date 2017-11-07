pragma solidity 0.4.18;

import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract UserWriter is Restrictor {
  event OnAdminAdded(address userId);
  event OnDentistAdded(address userId);
  event OnManagerAdded(address userId);
  event OnPatientAdded(address userId);

  function UserWriter(address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  function writeUser(
    uint8 userType,
    bytes32 name,
    bytes32 email,
    bytes32 gravatar,
    bytes32 street,
    bytes32 city,
    uint stateId,
    bytes32 zipCode,
    uint countryId,
    bytes32 phoneNumber,
    bytes32 socialSecurityNumber,
    bytes32 birthday,
    uint8 gender
  )
    external
    onlyPermittedSmartContract
  {
    // require the last compulsories first
    require(stateId != 0 && countryId != 0);

    writeUserIdentity(userType, name, email, gravatar);
    writeUserLocation(street, city, stateId, zipCode, countryId);
    writeUserOptionalValues(phoneNumber, socialSecurityNumber, birthday, gender);
    determineEvent(userType);
  }

  function writeUserIdentity(uint8 userType, bytes32 name, bytes32 email, bytes32 gravatar) public {
    userManager.setUserIdentity(dbAddress, msg.sender, userType, name, email, gravatar);
  }

  function writeUserLocation(bytes32 street, bytes32 city, uint stateId, bytes32 zipCode, uint countryId) public {
    userManager.setUserLocation(dbAddress, msg.sender, street, city, stateId, zipCode, countryId);
  }

  function writeUserOptionalValues(bytes32 phoneNumber, bytes32 socialSecurityNumber, bytes32 birthday, uint8 gender) public {
    userManager.setUserOptionalValues(dbAddress, msg.sender, phoneNumber, socialSecurityNumber, birthday, gender);
  }

  function determineEvent(uint8 userType) public {
    if (userType == 1) {
      OnPatientAdded(msg.sender);
    } else if (userType == 3) {
      OnManagerAdded(msg.sender);
    } else if (userType == 4) {
      OnAdminAdded(msg.sender);
    }
  }

  function continueWritingDentist(
    bool isODLLDentist,
    bool isAvailable,
    bytes32 companyName
  )
    external
    onlyPermittedSmartContract
  {
    userManager.setDentist(dbAddress, msg.sender, isODLLDentist, isAvailable, companyName);
    OnDentistAdded(msg.sender);
  }

  function addODLLDentist(
    address userId
  )
    external
    onlyOwnerOrActiveAdminOrActiveManager
  {
    userManager.addODLLDentist(dbAddress, msg.sender);
  }

  function addOfficialToODLL(address officialId, uint8 userType)
    external
    onlyOwnerOrActiveAdminOrActiveManager
  {
    userManager.addOfficialToODLL(dbAddress, officialId, userType);
  }

  function blockUser(address userId)
    external
    onlyOwnerOrActiveAdminOrActiveManager
  {
    userManager.blockUser(dbAddress, userId);
  }

  function unblockUser(address userId)
    external
    onlyOwnerOrActiveAdminOrActiveManager
  {
    userManager.unblockUser(dbAddress, userId);
  }

  function writeDentistRating(address dentistId, uint8 rating)
    external
  {
    require(dentistId != 0x0 && rating > 0);
    userManager.writeDentistRating(dbAddress, dentistId, rating);
  }

  function writeUserDentistId (address dentistId) external {
    userManager.writeUserDentistId(dbAddress, msg.sender, dentistId);
  }

  function destroySelf(address callerAddress, address newContractAddress)
    external
    onlyOwnerCanCall(callerAddress)
  {
    selfdestruct(newContractAddress);
  }
}

