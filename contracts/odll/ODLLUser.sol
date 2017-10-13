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
    bool isAvailable
  )
    onlyPermittedSmartContract
  {
    userManager.setDentist(dbAddress, msg.sender, isODLLDentist, isAvailable);
    OnDentistAdded(msg.sender);
  }

  function getUserData() constant returns (
    bool[] bools,
    bytes32[] bytes32s,
    uint[] uints,
    uint8[] uint8s
  ) {
    bools = new bool[](2);
    bytes32s = new bytes32[](8);
    uints = new uint[](3);
    uint8s = new uint8[](2);

    address userId = msg.sender;
    uint8s[0] = ODLLDB(dbAddress).getUInt8Value(sha3("user/type", userId));
    uint8s[1] = ODLLDB(dbAddress).getUInt8Value(sha3("user/gender", userId));
    bytes32s[0] = ODLLDB(dbAddress).getBytes32Value(sha3("user/name", userId));
    bytes32s[1] = ODLLDB(dbAddress).getBytes32Value(sha3("user/email", userId));
    bytes32s[2] = ODLLDB(dbAddress).getBytes32Value(sha3("user/gravatar", userId));
    bytes32s[3] = ODLLDB(dbAddress).getBytes32Value(sha3("user/street", userId));
    bytes32s[4] = ODLLDB(dbAddress).getBytes32Value(sha3("user/city", userId));
    bytes32s[5] = ODLLDB(dbAddress).getBytes32Value(sha3("user/phone-number", userId));
    bytes32s[6] = ODLLDB(dbAddress).getBytes32Value(sha3("user/social-security-number", userId));
    bytes32s[7] = ODLLDB(dbAddress).getBytes32Value(sha3("user/birthday", userId));
    uints[0] = ODLLDB(dbAddress).getUIntValue(sha3("user/state", userId));
    uints[1] = ODLLDB(dbAddress).getUIntValue(sha3("user/zip-code", userId));
    uints[2] = ODLLDB(dbAddress).getUIntValue(sha3("user/country", userId));
    bools[0] = ODLLDB(dbAddress).getBooleanValue(sha3("user/is-odll-dentist?", userId));
    bools[1] = ODLLDB(dbAddress).getBooleanValue(sha3("user/is-available?", userId));
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
      returns (
        address[] foundDentistsIds
      )
  {
    address[] memory budgetBasedDentistsIds = searchLibrary.getServiceDentistsByBudget(dbAddress, serviceTypeId, serviceId, budget);
    address[] memory stateBasedDentistsIds = searchLibrary.getServiceDentistsByState(dbAddress, serviceTypeId, serviceId, stateId);
    foundDentistsIds = utilities.intersectBudgetAndStateBasedDentists(dbAddress, budgetBasedDentistsIds, stateBasedDentistsIds);

    if (foundDentistsIds.length > 0) {
      if (offset > foundDentistsIds.length) {
        return utilities.take(0, foundDentistsIds);
      } else if (offset + limit > foundDentistsIds.length) {
        limit = foundDentistsIds.length - offset;
      }

      foundDentistsIds = utilities.getPage(foundDentistsIds, (seed + offset) % foundDentistsIds.length, limit, true);
    }
  }

  function getDentistDataFromFind(uint serviceTypeId, uint serviceId, address dentistId) returns (
    bytes32[] bytes32s,
    uint[] uints
  ) {
    bytes32s = new bytes32[](8);
    uints = new uint[](3);

    address userId = msg.sender;
    bytes32s[0] = ODLLDB(dbAddress).getBytes32Value(sha3("user/name", dentistId));
    bytes32s[1] = ODLLDB(dbAddress).getBytes32Value(sha3("user/email", userId));
    bytes32s[2] = ODLLDB(dbAddress).getBytes32Value(sha3("user/gravatar", dentistId));
    bytes32s[3] = ODLLDB(dbAddress).getBytes32Value(sha3("user/street", dentistId));
    bytes32s[4] = ODLLDB(dbAddress).getBytes32Value(sha3("user/city", dentistId));
    uints[0] = searchLibrary.getServiceDentistFee(dbAddress, serviceTypeId, serviceId, dentistId);
    uints[1] = ODLLDB(dbAddress).getUIntValue(sha3("user/state", dentistId));
    uints[2] = userManager.getDentistAverageRating(dbAddress, dentistId);
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

  function destroySelf(address callerAddress, address newContractAddress)
    onlyOwnerCanCall(callerAddress)
  {
    selfdestruct(newContractAddress);
  }
}
