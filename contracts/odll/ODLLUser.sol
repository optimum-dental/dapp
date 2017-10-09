pragma solidity ^0.4.11;

import "./ODLLRestrictor.sol";

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
    // require the last compulsories first
    require(state != 0 && zipCode != 0 && country != 0);

    writeUserIdentity(userType, name, email, gravatar);
    writeUserLocation(street, city, state, zipCode, country);
    writeUserOptionalValues(phoneNumber, socialSecurityNumber, birthday, gender);
    determineEvent(userType);
  }

  function writeUserIdentity(uint8 userType, bytes32 name, bytes32 email, bytes32 gravatar) {
    userManager.setUserIdentity(dbAddress, msg.sender, userType, name, email, gravatar);
  }

  function writeUserLocation(bytes32 street, bytes32 city, uint state, uint zipCode, uint country) {
    userManager.setUserLocation(dbAddress, msg.sender, street, city, state, zipCode, country);
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

  function getUserData(address userId) constant returns (
    bool[] bools,
    bytes32[] bytes32s,
    uint[] uints,
    uint8[] uint8s
  ) {
    bools = new bool[](2);
    bytes32s = new bytes32[](8);
    uints = new uint[](3);
    uint8s = new uint8[](2);

    uint8s[0] = ODLLDB(dbAddress).getUInt8Value(sha3("user/type", userId));
    uint8s[1] = ODLLDB(dbAddress).getUInt8Value(sha3("user/gender", userId));
    bytes32s[0] = ODLLDB(dbAddress).getBytes32Value(sha3("user/name", userId));
    bytes32s[1] = ODLLDB(dbAddress).getBytes32Value(sha3("user/email", userId));
    bytes32s[2] = ODLLDB(dbAddress).getBytes32Value(sha3("user/city", userId));
    bytes32s[3] = ODLLDB(dbAddress).getBytes32Value(sha3("user/street", userId));
    bytes32s[4] = ODLLDB(dbAddress).getBytes32Value(sha3("user/phone-number", userId));
    bytes32s[5] = ODLLDB(dbAddress).getBytes32Value(sha3("user/social-security-number", userId));
    bytes32s[6] = ODLLDB(dbAddress).getBytes32Value(sha3("user/gravatar", userId));
    bytes32s[7] = ODLLDB(dbAddress).getBytes32Value(sha3("user/birthday", userId));
    uints[0] = ODLLDB(dbAddress).getUIntValue(sha3("user/state", userId));
    uints[1] = ODLLDB(dbAddress).getUIntValue(sha3("user/zip-code", userId));
    uints[2] = ODLLDB(dbAddress).getUIntValue(sha3("user/country", userId));
    bools[0] = ODLLDB(dbAddress).getBooleanValue(sha3("user/is-odll-dentist?", userId));
    bools[1] = ODLLDB(dbAddress).getBooleanValue(sha3("user/is-available?", userId));
  }

  function destroySelf(address callerAddress, address newContractAddress)
    onlyOwnerCanCall(callerAddress)
  {
    selfdestruct(newContractAddress);
  }
}
