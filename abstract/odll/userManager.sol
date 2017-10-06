pragma solidity 0.4.11;

import "../strings.sol";

contract userManager {

  //    status:
  //    { 0 => not regiistered, 1 => active, 2 => blocked }

  function getConfig(address dbAddress, bytes32 key) constant returns(uint);
  function getUsersCount(address dbAddress) internal returns(uint);
  function getDentistsCount(address dbAddress) internal returns(uint);
  function getManagersCount(address dbAddress) internal returns(uint);
  function getPatientsCount(address dbAddress) internal returns(uint);
  function userExists(address dbAddress, address userId) internal returns(bool);
  function getAllUsers(address dbAddress) internal returns(address[]);
  function getAllDentists (address dbAddress) internal returns(address[]);
  function getAllManagers(address dbAddress) internal returns(address[]);
  function getAllPatients(address dbAddress) internal returns(address[]);
  function setUser(
    address dbAddress,
    address userId,
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
    uint day,
    uint month,
    uint year,
    uint8 gender
  ) internal;
  function setAdmin(address dbAddress, address userId) internal;
  function setPatient(address dbAddress, address userId) internal;
  function setDentist(
    address dbAddress,
    address userId,
    bool isODLLDentist,
    bool isAvailable
  ) internal;
  function setManager(
    address dbAddress,
    address userId
  ) internal;
  function isActiveDentist(address dbAddress, address userId) internal returns(bool);
  function isActivePatient(address dbAddress, address userId) internal returns(bool);
  function hasStatus(address dbAddress, address userId, uint8 status) internal returns(bool);
  function getStatus(address dbAddress, address userId) internal returns(uint8);
  function isUserType(address dbAddress, address userId, uint8 usserType) internal returns(bool);
  function getUserType(address dbAddress, address userId) internal returns(uint8);
  function setStatus(address dbAddress, address userId, uint8 status) internal;
  function setUserNotifications(address dbAddress, address userId, bool[] boolNotificationSettings, uint8[] uint8NotificationSettings) internal;
  function addReceivedMessage(address dbAddress, address userId, uint messageId) internal;
  function addSentMessage(address dbAddress, address userId, uint messageId) internal;
  function addToAvgRating(address dbAddress, address userId, string countKey, string key, uint8 rating) internal;
  function addToDentistAvgRating(address dbAddress, address userId, uint8 rating) internal;
  function getDentistAvgRating(address dbAddress, address userId) internal returns (uint8);
  function addToDentistTotalEarned(address dbAddress, address userId, uint amount) internal;
  function addToPatientTotalPaid(address dbAddress, address userId, uint amount) internal;
  function isFromCountry(address dbAddress, address userId, uint countryId) internal returns(bool);
  function isFromState(address dbAddress, address userId, uint stateId) internal returns(bool);
  function hasMinRating(address dbAddress, address userId, uint8 minAvgRating) internal returns(bool);
  function hasDentistMinRatingsCount(address dbAddress, address userId, uint minRatingsCount) internal returns(bool);
  function hasScanResultAdverts(address dbAddress, address userId, uint scanResultAdverts) internal returns (bool);
  function isDentistAvailable(address dbAddress, address userId) internal returns (bool);
  // function searchDentists(
  //   address dbAddress,
  //   uint scanCategoryId,
  //   uint treatmentCategoryId,
  //   uint minBudget,
  //   uint maxBudget,
  //   uint[] uintArgs
  //   ) internal returns (address[] userIds);
  function getUserData(address dbAddress, address userId) constant returns (
    uint8,
    string,
    string,
    string,
    string,
    bytes32,
    string,
    string,
    uint,
    uint,
    uint,
    bytes32,
    uint,
    uint,
    uint,
    uint,
    uint,
    uint,
    uint8
  );
}
