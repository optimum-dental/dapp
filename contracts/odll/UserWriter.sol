pragma solidity 0.4.18;

import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract UserWriter is Restrictor {
  event OnAdminAdded(address userId);
  event OnDentistCompanySet(address userId);
  event OnManagerAdded(address userId);
  event OnPatientAdded(address userId);

  function UserWriter(address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  function writeUser(
    uint8 userType,
    string name,
    string email,
    bytes32 gravatar,
    bytes32 street,
    bytes32 city,
    uint stateId,
    bytes32 zipCode,
    uint countryId,
    bytes32 phoneNumber,
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
    writeUserOptionalValues(phoneNumber, birthday, gender);
    determineEvent(userType);
  }

  function writeUserIdentity(uint8 userType, string name, string email, bytes32 gravatar) public {
    userManager.setUserIdentity(dbAddress, msg.sender, userType, name, email, gravatar);
  }

  function writeUserLocation(bytes32 street, bytes32 city, uint stateId, bytes32 zipCode, uint countryId) public {
    userManager.setUserLocation(dbAddress, msg.sender, street, city, stateId, zipCode, countryId);
  }

  function writeUserOptionalValues(bytes32 phoneNumber, bytes32 birthday, uint8 gender) public {
    userManager.setUserOptionalValues(dbAddress, msg.sender, phoneNumber, birthday, gender);
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

  function setDentistCompany (
    string companyName
  )
    external
    onlyPermittedSmartContract
  {
    userManager.setDentistCompanyData(dbAddress, msg.sender, companyName);
    OnDentistCompanySet(msg.sender);
  }

  function setODLLDentist (
    address userId,
    bool odllDentistValue
  )
    external
  {
    userManager.setODLLDentistData(dbAddress, userId, odllDentistValue);
  }

  function setODLLDentists (
    address[] userIds,
    bool odllDentistValue
  )
    external
  {
    userManager.setODLLDentistsData(dbAddress, userIds, odllDentistValue);
  }

  function addOfficialToODLL (address officialId, uint8 userType)
    external
    onlyOwnerOrActiveAdminOrActiveManager
  {
    userManager.addOfficialDataToODLL(dbAddress, officialId, userType);
  }

  function blockUser (address userId)
    external
    onlyOwnerOrActiveAdminOrActiveManager
  {
    userManager.blockUserEntity(dbAddress, userId);
  }

  function unblockUser (address userId)
    external
    onlyOwnerOrActiveAdminOrActiveManager
  {
    userManager.unblockUserEntity(dbAddress, userId);
  }

  function writeDentistRating (address dentistId, uint8 rating)
    external
  {
    require(dentistId != 0x0 && rating > 0);
    userManager.writeDentistEntityRating(dbAddress, dentistId, rating);
  }
}
