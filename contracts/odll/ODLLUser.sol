pragma solidity ^0.4.11;

import "./ODLLRestrictor.sol";
import "../lib/odll/servicesLibrary.sol";

contract ODLLUser is ODLLRestrictor {
  event OnAdminAdded(address userId);
  event OnDentistAdded(address userId);
  event OnManagerAdded(address userId);
  event OnPatientAdded(address userId);

  function ODLLUser(address _dbAddress) {
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
    uint zipCode,
    uint countryId,
    bytes32 phoneNumber,
    bytes32 socialSecurityNumber,
    bytes32 birthday,
    uint8 gender
  )
    onlyPermittedSmartContract
  {
    // require the last compulsories first
    require(stateId != 0 && zipCode != 0 && countryId != 0);

    writeUserIdentity(userType, name, email, gravatar);
    writeUserLocation(street, city, stateId, zipCode, countryId);
    writeUserOptionalValues(phoneNumber, socialSecurityNumber, birthday, gender);
    determineEvent(userType);
  }

  function writeUserIdentity(uint8 userType, bytes32 name, bytes32 email, bytes32 gravatar) {
    userManager.setUserIdentity(dbAddress, msg.sender, userType, name, email, gravatar);
  }

  function writeUserLocation(bytes32 street, bytes32 city, uint stateId, uint zipCode, uint countryId) {
    userManager.setUserLocation(dbAddress, msg.sender, street, city, stateId, zipCode, countryId);
  }

  function writeUserOptionalValues(bytes32 phoneNumber, bytes32 socialSecurityNumber, bytes32 birthday, uint8 gender) {
    userManager.setUserOptionalValues(dbAddress, msg.sender, phoneNumber, socialSecurityNumber, birthday, gender);
  }

  function determineEvent(uint8 userType) internal {
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
    onlyPermittedSmartContract
  {
    userManager.setDentist(dbAddress, msg.sender, isODLLDentist, isAvailable, companyName);
    OnDentistAdded(msg.sender);
  }

  function getUserIdentityData(address userId)
  constant
  returns (
    uint8 userType,
    bytes32 name,
    bytes32 email,
    bytes32 gravatar
  ) {
    userType = ODLLDB(dbAddress).getUInt8Value(sha3("user/type", userId));
    name = ODLLDB(dbAddress).getBytes32Value(sha3("user/name", userId));
    email = ODLLDB(dbAddress).getBytes32Value(sha3("user/email", userId));
    gravatar = ODLLDB(dbAddress).getBytes32Value(sha3("user/gravatar", userId));
  }

  function getUserContactData(address userId)
  constant
  returns (
    bytes32 street,
    bytes32 city,
    bytes32 phoneNumber,
    uint state,
    uint zipCode,
    uint country
  ) {
    street = ODLLDB(dbAddress).getBytes32Value(sha3("user/street", userId));
    city = ODLLDB(dbAddress).getBytes32Value(sha3("user/city", userId));
    phoneNumber = ODLLDB(dbAddress).getBytes32Value(sha3("user/phone-number", userId));
    state = ODLLDB(dbAddress).getUIntValue(sha3("user/state", userId));
    zipCode = ODLLDB(dbAddress).getUIntValue(sha3("user/zip-code", userId));
    country = ODLLDB(dbAddress).getUIntValue(sha3("user/country", userId));
  }

  function getUserPersonalData(address userId)
  constant
  returns (
    uint8 gender,
    bytes32 socialSecurityNumber,
    bytes32 birthday
  ) {
    gender = ODLLDB(dbAddress).getUInt8Value(sha3("user/gender", userId));
    socialSecurityNumber = ODLLDB(dbAddress).getBytes32Value(sha3("user/social-security-number", userId));
    birthday = ODLLDB(dbAddress).getBytes32Value(sha3("user/birthday", userId));
  }

  function findDentists(
    uint stateId,
    uint serviceTypeId,
    uint serviceId,
    uint[] budget, // within budget range
    uint offset, // starting from offset: 0-based
    uint limit, // not more than limit
    uint seed // seed value to give the illusion of randomisation
    )
      constant
      returns (
        uint totalNumberFound,
        address[] foundDentistsIds
      )
  {
    var budgetBasedDentistsIds = searchLibrary.getServiceDentistsByBudget(dbAddress, serviceTypeId, serviceId, budget);
    var stateBasedDentistsIds = searchLibrary.getServiceDentistsByState(dbAddress, serviceTypeId, serviceId, stateId);
    foundDentistsIds = utilities.intersectBudgetAndStateBasedDentists(dbAddress, budgetBasedDentistsIds, stateBasedDentistsIds);

    (totalNumberFound, foundDentistsIds) = getSlicedArray(foundDentistsIds, offset, limit, seed);
  }

  function getDentistIdentityData(address dentistId)
    constant
    returns (
      bool isODLLDentist,
      bool isAvailable,
      bytes32 companyName
    ) {
    isODLLDentist = ODLLDB(dbAddress).getBooleanValue(sha3("user/is-odll-dentist?", dentistId));
    isAvailable = ODLLDB(dbAddress).getBooleanValue(sha3("user/is-available?", dentistId));
    companyName = ODLLDB(dbAddress).getBytes32Value(sha3("dentist/company-name", dentistId));
  }

  function getDentistFeeData(uint serviceTypeId, uint serviceId, address dentistId)
    constant
    returns (
      uint fee
    ) {
    fee = searchLibrary.getServiceDentistFee(dbAddress, serviceTypeId, serviceId, dentistId);
  }

  function getDentistRatingData(address dentistId)
    constant
    returns (
      uint rating
    ) {
    rating = userManager.getDentistAverageRating(dbAddress, dentistId);
  }

  function addOfficialToODLL(address officialId, uint8 userType)
    onlyOwnerOrActiveAdminOrActiveManager
  {
    userManager.setUserIdentity(dbAddress, officialId, userType, "", "", "");
  }

  function blockUser(address userId)
    onlyOwnerOrActiveAdmin
  {
    ODLLDB(dbAddress).setUInt8Value(sha3("user/status", userId), 1);
  }

  function fetchDentists(
    uint offset, // starting from offset: 0-based
    uint limit, // not more than limit
    uint seed // seed value to give the illusion of randomisation
  )
    constant
    returns (
      uint totalNumberFound,
      address[] foundDentistsIds
    )
  {
    foundDentistsIds = searchLibrary.getDentists(dbAddress);
    (totalNumberFound, foundDentistsIds) = getSlicedArray(foundDentistsIds, offset, limit, seed);
  }

  function fetchManagers(
    uint offset, // starting from offset: 0-based
    uint limit, // not more than limit
    uint seed // seed value to give the illusion of randomisation
  )
    constant
    returns (
      uint totalNumberFound,
      address[] foundManagersIds
    )
  {
    foundManagersIds = searchLibrary.getManagers(dbAddress);
    (totalNumberFound, foundManagersIds) = getSlicedArray(foundManagersIds, offset, limit, seed);
  }

  function getSlicedArray(address[] arrayObject, uint offset, uint limit, uint seed)
    constant
    returns (uint totalSize, address[] slicedArray)
  {
    totalSize = arrayObject.length;

    if (arrayObject.length > 0) {
      if (offset > arrayObject.length) {
        return (totalSize, utilities.take(0, arrayObject));
      } else if (offset + limit > arrayObject.length) {
        limit = arrayObject.length - offset;
      }

      slicedArray = utilities.getPage(arrayObject, (seed + offset) % arrayObject.length, limit, true);
    }
  }

  function destroySelf(address callerAddress, address newContractAddress)
    onlyOwnerCanCall(callerAddress)
  {
    selfdestruct(newContractAddress);
  }
}
