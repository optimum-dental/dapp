pragma solidity 0.4.18;

import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract UserReader is Restrictor {

  function UserReader(address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  function getUserIdentityData(address userId)
    external
    view
    returns (
      uint8,
      bytes32,
      bytes32,
      bytes32,
      uint8
    )
  {
    return userManager.getUserIdentityData(dbAddress, userId);
  }

  function getUserContactData(address userId)
    external
    view
    returns (
      bytes32,
      bytes32,
      bytes32,
      uint,
      bytes32,
      uint
    )
  {
    return userManager.getUserContactData(dbAddress, userId);
  }

  function getUserPersonalData(address userId)
    external
    view
    returns (
      uint8 gender,
      bytes32 socialSecurityNumber,
      bytes32 birthday
    )
  {
    (gender, socialSecurityNumber, birthday) = userManager.getUserPersonalData(dbAddress, userId);
  }

  function getUserDentistsIds(address userId)
    external
    view
    returns (
      address[] dentistsIds
    )
  {
    dentistsIds = userManager.getUserDentistsIds(dbAddress, userId);
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
      external
      view
      returns (
        uint,
        address[]
      )
  {
    return userManager.findDentists(dbAddress, stateId, serviceTypeId, serviceId, budget, offset, limit, seed);
  }

  function getDentistIdentityData(address dentistId)
    external
    view
    returns (
      bool,
      bool,
      bytes32
    ) {
    return userManager.getDentistIdentityData(dbAddress, dentistId);
  }

  function getDentistFeeData(uint serviceTypeId, uint serviceId, address dentistId)
    external
    view
    returns (
      uint fee
    ) {
    fee = userManager.getDentistFeeData(dbAddress, serviceTypeId, serviceId, dentistId);
  }

  function getDentistRatingData(address dentistId)
    external
    view
    returns (
      uint rating
    ) {
    rating = userManager.getDentistAverageRating(dbAddress, dentistId);
  }

  function fetchDentists(
    uint offset, // starting from offset: 0-based
    uint limit, // not more than limit
    uint seed // seed value to give the illusion of randomisation
  )
    external
    view
    returns (
      uint,
      address[]
    )
  {
    return userManager.fetchDentists(dbAddress, offset, limit, seed);
  }

  function fetchManagers(
    uint offset, // starting from offset: 0-based
    uint limit, // not more than limit
    uint seed // seed value to give the illusion of randomisation
  )
    external
    view
    returns (
      uint,
      address[]
    )
  {
    return userManager.fetchManagers(dbAddress, offset, limit, seed);
  }

  function destroySelf(address callerAddress, address newContractAddress)
    external
    onlyOwnerCanCall(callerAddress)
  {
    selfdestruct(newContractAddress);
  }
}

