pragma solidity 0.4.17;

import "./ODLLRestrictor.sol";
import "../lib/odll/userManager.sol";

contract ODLLUserReader is ODLLRestrictor {

  function ODLLUserReader(address _dbAddress) public {
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
      bytes32
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

  function fetchServicesWithFees(
    address userId,
    uint serviceTypeId,
    uint offset, // starting from offset: 0-based
    uint limit, // not more than limit
    uint seed // seed value to give the illusion of randomisation
  )
    external
    view
    returns (
      uint,
      uint[],
      uint[]
    )
  {
    return userManager.fetchServicesWithFees(dbAddress, userId, serviceTypeId, offset, limit, seed);
  }

  function fetchServices(
    address userId,
    uint serviceTypeId,
    uint offset, // starting from offset: 0-based
    uint limit, // not more than limit
    uint seed // seed value to give the illusion of randomisation
  )
    external
    view
    returns (
      uint,
      uint[]
    )
  {
    return userManager.fetchServices(dbAddress, userId, serviceTypeId, offset, limit, seed);
  }

  function destroySelf(address callerAddress, address newContractAddress)
    external
    onlyOwnerCanCall(callerAddress)
  {
    selfdestruct(newContractAddress);
  }
}

