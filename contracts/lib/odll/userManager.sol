pragma solidity ^0.4.11;

import "../../odll/ODLLDB.sol";
import "../../zeppelin/math/SafeMath.sol";
import "./utilities.sol";
import "../arachnid/solidity-stringutils/strings.sol";

library userManager {
  using strings for *;

  //    status:
  //    { 0 => not regiistered, 1 => active, 2 => blocked }

  function getConfig(address dbAddress, bytes32 key) constant returns(uint) {
    return ODLLDB(dbAddress).getUIntValue(sha3("config/", key));
  }

  function getUsersCount(address dbAddress) internal returns(uint) {
    return ODLLDB(dbAddress).getUIntValue(sha3("users/count"));
  }

  function getDentistsCount(address dbAddress) internal returns(uint) {
    return ODLLDB(dbAddress).getUIntValue(sha3("dentists/count"));
  }

  function getManagersCount(address dbAddress) internal returns(uint) {
    return ODLLDB(dbAddress).getUIntValue(sha3("dentists/count"));
  }

  function getPatientsCount(address dbAddress) internal returns(uint) {
    return ODLLDB(dbAddress).getUIntValue(sha3("dentists/count"));
  }

  function userExists(address dbAddress, address userId) internal returns(bool) {
    return getStatus(dbAddress, userId) > 0;
  }

  function getAllUsers(address dbAddress) internal returns(address[]) {
    return utilities.getAddressArray(dbAddress, "user/ids", "users/count");
  }

  function getAllDentists (address dbAddress) internal returns(address[]) {
    return utilities.getAddressArray(dbAddress, "dentist/ids", "dentists/count");
  }

  function getAllManagers(address dbAddress) internal returns(address[]) {
    return utilities.getAddressArray(dbAddress, "manager/ids", "managers/count");
  }

  function getAllPatients(address dbAddress) internal returns(address[]) {
    return utilities.getAddressArray(dbAddress, "patient/ids", "patients/count");
  }

  function setUser(
    address dbAddress,
    address userId,
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
    internal
  {
    var nameLen = name.toSlice().len();
    require(nameLen <= getConfig(dbAddress, "max-user-name-length") && nameLen >= getConfig(dbAddress, "min-user-name-length"));
    require(email.toSlice().len() >= 5 && email.toSlice().len() <= 254);
    require(state != 0 && zipCode != 0 && country != 0);

    if (!userExists(dbAddress, userId)) {
      ODLLDB(dbAddress).setUIntValue(sha3("user/created-on", userId), now);
      ODLLDB(dbAddress).setUInt8Value(sha3("user/status", userId), 1);
      utilities.addArrayItem(dbAddress, "user/ids", "users/count", userId);
    }

    ODLLDB(dbAddress).setUInt8Value(sha3("user/type", userId), userType);
    ODLLDB(dbAddress).setStringValue(sha3("user/name", userId), name);
    ODLLDB(dbAddress).setStringValue(sha3("user/email", userId), email);
    ODLLDB(dbAddress).setBytes32Value(sha3("user/gravatar", userId), gravatar);
    ODLLDB(dbAddress).setBytes32Value(sha3("user/street", userId), street);
    ODLLDB(dbAddress).setBytes32Value(sha3("user/city", userId), city);
    ODLLDB(dbAddress).setUIntValue(sha3("user/state", userId), state);
    ODLLDB(dbAddress).setUIntValue(sha3("user/zip-code", userId), zipCode);
    ODLLDB(dbAddress).setUIntValue(sha3("user/country", userId), country);
  }

  function setAdmin(
    address dbAddress,
    address userId,
    bytes32 phoneNumber,
    bytes32 socialSecurityNumber,
    bytes32 birthday,
    uint8 gender
  )
    internal
  {
    require(userExists(dbAddress, userId));
    ODLLDB(dbAddress).setBooleanValue(sha3("user/is-admin?", userId), true);
    ODLLDB(dbAddress).setBytes32Value(sha3("user/phone-number", userId), phoneNumber);
    ODLLDB(dbAddress).setBytes32Value(sha3("user/social-security-number", userId), socialSecurityNumber);
    ODLLDB(dbAddress).setBytes32Value(sha3("user/birthday", userId), birthday);
    ODLLDB(dbAddress).setUInt8Value(sha3("user/gender", userId), gender);
  }

  function setPatient(
    address dbAddress,
    address userId,
    bytes32 phoneNumber,
    bytes32 socialSecurityNumber,
    bytes32 birthday,
    uint8 gender
  )
    internal
  {
    require(userExists(dbAddress, userId));
    ODLLDB(dbAddress).setBooleanValue(sha3("user/is-patient?", userId), true);
    utilities.addArrayItem(dbAddress, "patient/ids", "patients/count", userId);
    ODLLDB(dbAddress).setBytes32Value(sha3("user/phone-number", userId), phoneNumber);
    ODLLDB(dbAddress).setBytes32Value(sha3("user/social-security-number", userId), socialSecurityNumber);
    ODLLDB(dbAddress).setBytes32Value(sha3("user/birthday", userId), birthday);
    ODLLDB(dbAddress).setUInt8Value(sha3("user/gender", userId), gender);
  }

  function setDentist(
    address dbAddress,
    address userId,
    bytes32 phoneNumber,
    bytes32 socialSecurityNumber,
    bytes32 birthday,
    uint8 gender,
    bool isODLLDentist,
    bool isAvailable
  )
    internal
  {
    require(userExists(dbAddress, userId));
    ODLLDB(dbAddress).setBooleanValue(sha3("user/is-dentist?", userId), true);
    utilities.addArrayItem(dbAddress, "dentist/ids", "dentists/count", userId);
    ODLLDB(dbAddress).setBytes32Value(sha3("user/phone-number", userId), phoneNumber);
    ODLLDB(dbAddress).setBytes32Value(sha3("user/social-security-number", userId), socialSecurityNumber);
    ODLLDB(dbAddress).setBytes32Value(sha3("user/birthday", userId), birthday);
    ODLLDB(dbAddress).setUInt8Value(sha3("user/gender", userId), gender);
    ODLLDB(dbAddress).setBooleanValue(sha3("user/is-odll-dentist?", userId), isODLLDentist);
    ODLLDB(dbAddress).setBooleanValue(sha3("user/is-available?", userId), isAvailable);
  }

  function setManager(
    address dbAddress,
    address userId,
    bytes32 phoneNumber,
    bytes32 socialSecurityNumber,
    bytes32 birthday,
    uint8 gender
  )
    internal
  {
    require(userExists(dbAddress, userId));
    ODLLDB(dbAddress).setBooleanValue(sha3("user/is-manager?", userId), true);
    utilities.addArrayItem(dbAddress, "manager/ids", "managers/count", userId);
    ODLLDB(dbAddress).setBytes32Value(sha3("user/phone-number", userId), phoneNumber);
    ODLLDB(dbAddress).setBytes32Value(sha3("user/social-security-number", userId), socialSecurityNumber);
    ODLLDB(dbAddress).setBytes32Value(sha3("user/birthday", userId), birthday);
    ODLLDB(dbAddress).setUInt8Value(sha3("user/gender", userId), gender);
  }

  function isActiveDentist(address dbAddress, address userId) internal returns(bool) {
    return isUserType(dbAddress, userId, 2) && hasStatus(dbAddress, userId, 1);
  }

  function isActivePatient(address dbAddress, address userId) internal returns(bool) {
    return isUserType(dbAddress, userId, 1) && hasStatus(dbAddress, userId, 1);
  }

  function hasStatus(address dbAddress, address userId, uint8 status) internal returns(bool) {
    return status == ODLLDB(dbAddress).getUInt8Value(sha3("user/status", userId));
  }

  function getStatus(address dbAddress, address userId) internal returns(uint8) {
    return ODLLDB(dbAddress).getUInt8Value(sha3("user/status", userId));
  }

  function isUserType(address dbAddress, address userId, uint8 usserType) internal returns(bool) {
    return usserType == ODLLDB(dbAddress).getUInt8Value(sha3("user/type", userId));
  }

  function getUserType(address dbAddress, address userId) internal returns(uint8) {
    return ODLLDB(dbAddress).getUInt8Value(sha3("user/type", userId));
  }

  function setStatus(address dbAddress, address userId, uint8 status) internal {
    ODLLDB(dbAddress).setUInt8Value(sha3("user/status", userId), status);
  }

  function setUserNotifications(address dbAddress, address userId, bool[] boolNotificationSettings, uint8[] uint8NotificationSettings) internal {
    ODLLDB(dbAddress).setBooleanValue(sha3("user.notification/disabled-all?", userId), boolNotificationSettings[0]);
    ODLLDB(dbAddress).setBooleanValue(sha3("user.notification/disabled-newsletter?", userId), boolNotificationSettings[1]);
    ODLLDB(dbAddress).setBooleanValue(sha3("user.notification/disabled-on-scan-offer?", userId), boolNotificationSettings[2]);
    ODLLDB(dbAddress).setBooleanValue(sha3("user.notification/disabled-on-treatment-offer?", userId), boolNotificationSettings[3]);
    ODLLDB(dbAddress).setBooleanValue(sha3("user.notification/disabled-on-scan-request?", userId), boolNotificationSettings[4]);
    ODLLDB(dbAddress).setBooleanValue(sha3("user.notification/disabled-on-treatment-request?", userId), boolNotificationSettings[5]);
    ODLLDB(dbAddress).setBooleanValue(sha3("user.notification/disabled-on-scan-application-accepted?", userId), boolNotificationSettings[6]);
    ODLLDB(dbAddress).setBooleanValue(sha3("user.notification/disabled-on-treatment-application-accepted?", userId), boolNotificationSettings[7]);
    ODLLDB(dbAddress).setBooleanValue(sha3("user.notification/disabled-on-rated?", userId), boolNotificationSettings[8]);
    ODLLDB(dbAddress).setUInt8Value(sha3("user.notification/scan-result-advert", userId), uint8NotificationSettings[0]);
  }

  function addReceivedMessage(address dbAddress, address userId, uint messageId) internal {
    utilities.addIdArrayItem(dbAddress, userId, "user/received-messages", "user/received-messages-count", messageId);
  }

  function addSentMessage(address dbAddress, address userId, uint messageId) internal {
    utilities.addIdArrayItem(dbAddress, userId, "user/sent-messages", "user/sent-messages-count", messageId);
  }

  function addToAvgRating(address dbAddress, address userId, string countKey, string key, uint8 rating) internal {
    var ratingsCount = ODLLDB(dbAddress).getUIntValue(sha3(countKey, userId));
    var currentAvgRating = ODLLDB(dbAddress).getUInt8Value(sha3(key, userId));
    var newRatingsCount = SafeMath.add(ratingsCount, 1);
    uint newAvgRating;
    if (ratingsCount == 0) {
      newAvgRating = rating;
    } else {
      var newTotalRating = SafeMath.add(SafeMath.mul(currentAvgRating, ratingsCount), rating);
      newAvgRating = newTotalRating / newRatingsCount;
    }

    ODLLDB(dbAddress).setUIntValue(sha3(countKey, userId), newRatingsCount);
    ODLLDB(dbAddress).setUInt8Value(sha3(key, userId), uint8(newAvgRating));
  }

  function addToDentistAvgRating(address dbAddress, address userId, uint8 rating) internal {
    addToAvgRating(dbAddress, userId, "dentist/avg-rating-count", "dentist/avg-rating", rating);
  }

  function getDentistAvgRating(address dbAddress, address userId) internal returns (uint8) {
    return ODLLDB(dbAddress).getUInt8Value(sha3("dentist/avg-rating", userId));
  }

  function addToDentistTotalEarned(address dbAddress, address userId, uint amount) internal {
    ODLLDB(dbAddress).addUIntValue(sha3("dentist/total-earned", userId), amount);
  }

  function addToPatientTotalPaid(address dbAddress, address userId, uint amount) internal {
    ODLLDB(dbAddress).addUIntValue(sha3("patient/total-paid", userId), amount);
  }

  function isFromCountry(address dbAddress, address userId, uint countryId) internal returns(bool) {
    if (countryId == 0) {
      return true;
    }

    return countryId == ODLLDB(dbAddress).getUIntValue(sha3("user/country", userId));
  }

  function isFromState(address dbAddress, address userId, uint stateId) internal returns(bool) {
    if (stateId == 0) {
      return true;
    }

    return stateId == ODLLDB(dbAddress).getUIntValue(sha3("user/state", userId));
  }

  function hasMinRating(address dbAddress, address userId, uint8 minAvgRating) internal returns(bool) {
    if (minAvgRating == 0) {
      return true;
    }

    return minAvgRating <= ODLLDB(dbAddress).getUInt8Value(sha3("dentist/avg-rating", userId));
  }

  function hasDentistMinRatingsCount(address dbAddress, address userId, uint minRatingsCount) internal returns(bool) {
    if (minRatingsCount == 0) {
      return true;
    }

    return minRatingsCount <= ODLLDB(dbAddress).getUIntValue(sha3("dentist/ratings-count", userId));
  }

  function hasScanResultAdverts(address dbAddress, address userId, uint scanResultAdverts) internal returns (bool) {
      if (scanResultAdverts == 0) {
          return true;
      }
      if (ODLLDB(dbAddress).getBooleanValue(sha3("user.notification/disabled-all?", userId))) {
          return false;
      }

      uint userScanResultAdverts = ODLLDB(dbAddress).getUInt8Value(sha3("user.notification/job-recommendations", userId));
      if (userScanResultAdverts == 0 && scanResultAdverts == 1) { // default value
          return true;
      }

      return userScanResultAdverts == scanResultAdverts;
  }

  function isDentistAvailable(address dbAddress, address userId) internal returns (bool) {
    return ODLLDB(dbAddress).getBooleanValue(sha3("dentist/is-available?", userId));
  }

  // function searchDentists(
  //   address dbAddress,
  //   uint scanCategoryId,
  //   uint treatmentCategoryId,
  //   uint minBudget,
  //   uint maxBudget,
  //   uint[] uintArgs
  //   )
  //   internal returns (address[] userIds)
  //   {
  //   uint j = 0;
  //   var allDentistIds = []
  //   if (scanCategoryId != 0) {
  //     allDentistIds = utilities.intersectCategoriesAndScanServices(dbAddress, scanCategoryId, minBudget, maxBudget,
  //     scanCategoryLibrary.getDentiists, treatmentCategoryLibrary.getDentiists, getDentistsCount, getAllDentists);
  //   }

  //   userIds = new address[](allDentistIds.length);
  //   for (uint i = 0; i < allDentistIds.length ; i++) {
  //     var userId = allDentistIds[i];
  //     if (isDentistAvailable(dbAddress, userId) &&
  //       hasMinRating(dbAddress, userId, minAvgRating) &&
  //       hasDentistMinRatingsCount(dbAddress, userId, minRatingsCount) &&
  //       isFromCountry(dbAddress, userId, uintArgs[0]) &&
  //       isFromState(dbAddress, userId, uintArgs[1]) &&
  //       hasStatus(dbAddress, userId, 1)
  //     ) {
  //       userIds[j] = userId;
  //       j++;
  //     }
  //   }

  //   return utilities.take(j, userIds);
  // }

  function getUserData(address dbAddress, address userId) constant returns (
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
  ) {
    uint8 userType = ODLLDB(dbAddress).getUInt8Value(sha3("user/type", userId));
    // string name = ODLLDB(dbAddress).getStringValue(sha3("user/name", userId));
    // string email = ODLLDB(dbAddress).getStringValue(sha3("user/email", userId));
    // bytes32 gravatar = ODLLDB(dbAddress).getBytes32Value(sha3("user/gravatar", userId));
    // bytes32 street = ODLLDB(dbAddress).getBytes32Value(sha3("user/street", userId));
    // bytes32 city = ODLLDB(dbAddress).getBytes32Value(sha3("user/city", userId));
    // uint state = ODLLDB(dbAddress).getUIntValue(sha3("user/state", userId));
    // uint zipCode = ODLLDB(dbAddress).getUIntValue(sha3("user/zip-code", userId));
    // uint country = ODLLDB(dbAddress).getUIntValue(sha3("user/country", userId));
    bytes32 phoneNumber = ODLLDB(dbAddress).getBytes32Value(sha3("user/phone-number", userId));
    bytes32 socialSecurityNumber = ODLLDB(dbAddress).getBytes32Value(sha3("user/social-security-number", userId));
    bytes32 birthday = ODLLDB(dbAddress).getBytes32Value(sha3("user/birthday", userId));
    uint8 gender = ODLLDB(dbAddress).getUInt8Value(sha3("user/gender", userId));
    // bool isODLLDentist = ODLLDB(dbAddress).getBooleanValue(sha3("user/is-odll-dentist?", userId));
    // bool isAvailable = ODLLDB(dbAddress).getBooleanValue(sha3("user/is-available?", userId));
    return (userType, phoneNumber, socialSecurityNumber, birthday, gender);
    // return (userType, gravatar, street, city, state, zipCode, country, phoneNumber, socialSecurityNumber, birthday, gender, isODLLDentist, isAvailable);
  }
}
